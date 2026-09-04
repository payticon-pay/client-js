import {
  DEFAULT_ENDPOINT,
  DEFAULT_GRAPHQL_PATH,
  DEFAULT_MAX_ATTEMPTS,
  DEFAULT_RETRY_BASE_DELAY_MS,
  DEFAULT_RETRY_MAX_DELAY_MS,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_TOTAL_TIMEOUT_MS,
} from "../constants.js";
import {
  PaycadooConfigError,
  PaycadooError,
  PaycadooGraphQLError,
  PaycadooHttpError,
  PaycadooNetworkError,
  PaycadooTimeoutError,
} from "../errors.js";
import type {
  GraphqlExecutor,
  GraphqlResponseBody,
  PaycadooClientOptions,
  RequestOptions,
} from "../types.js";
import { parseOperation } from "./operation.js";
import {
  computeRetryDelay,
  isRetryableStatus,
  parseRetryAfter,
  sleep,
} from "./retry.js";

/** Response bodies are logged on failure, so they are capped rather than whole. */
const MAX_LOGGED_BODY = 2_048;

const readBody = async (response: Response): Promise<string | undefined> => {
  try {
    const text = await response.text();
    return text.length > MAX_LOGGED_BODY
      ? `${text.slice(0, MAX_LOGGED_BODY)}…`
      : text;
  } catch {
    return undefined;
  }
};

const buildUrl = (endpoint: string, graphqlPath: string): string => {
  try {
    return new URL(graphqlPath, endpoint).toString();
  } catch (cause) {
    throw new PaycadooConfigError(
      `Invalid Paycadoo endpoint: ${endpoint}${graphqlPath}`,
      { cause },
    );
  }
};

export const createExecutor = (options: PaycadooClientOptions): GraphqlExecutor => {
  if (!options.apiKey) {
    throw new PaycadooConfigError("Paycadoo client requires an `apiKey`");
  }

  const url = buildUrl(
    options.endpoint ?? DEFAULT_ENDPOINT,
    options.graphqlPath ?? DEFAULT_GRAPHQL_PATH,
  );
  const doFetch = options.fetch ?? globalThis.fetch;
  const logger = options.logger;
  const logVariables = options.logVariables ?? false;
  const retry = {
    attempts: options.retry?.attempts ?? DEFAULT_MAX_ATTEMPTS,
    baseDelayMs: options.retry?.baseDelayMs ?? DEFAULT_RETRY_BASE_DELAY_MS,
    maxDelayMs: options.retry?.maxDelayMs ?? DEFAULT_RETRY_MAX_DELAY_MS,
  };

  const baseHeaders: Record<string, string> = {
    ...options.headers,
    "content-type": "application/json",
    accept: "application/json",
    "x-api-key": options.apiKey,
  };

  return async <TResult, TVariables>(
    document: { toString(): string } | string,
    variables?: TVariables,
    requestOptions: RequestOptions = {},
  ): Promise<TResult> => {
    const query = String(document);
    const operation = parseOperation(query);
    const idempotent = requestOptions.idempotent ?? operation.type !== "mutation";
    const attempts = idempotent ? retry.attempts : 1;
    const timeoutMs = requestOptions.timeoutMs ?? options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const totalTimeoutMs =
      requestOptions.totalTimeoutMs ??
      options.totalTimeoutMs ??
      DEFAULT_TOTAL_TIMEOUT_MS;
    const requestId = requestOptions.requestId ?? crypto.randomUUID();
    const callerSignal = requestOptions.signal;

    const context = { requestId, operationName: operation.name };
    const body = JSON.stringify({
      query,
      variables: variables ?? undefined,
      operationName: operation.name,
    });
    const headers: Record<string, string> = {
      ...baseHeaders,
      ...requestOptions.headers,
      "x-request-id": requestId,
    };

    // One budget for the whole call: retries and backoff spend from it too.
    const totalSignal = AbortSignal.timeout(totalTimeoutMs);

    function fail(error: PaycadooError, attempt: number): never {
      logger?.error(
        {
          err: error,
          requestId,
          operationName: operation.name,
          attempt,
          ...(logVariables ? { variables } : {}),
        },
        "Paycadoo request failed",
      );
      throw error;
    }

    let attempt = 0;
    for (;;) {
      attempt += 1;
      const attemptSignal = AbortSignal.timeout(timeoutMs);
      const signals = [attemptSignal, totalSignal];
      if (callerSignal) signals.unshift(callerSignal);

      let response: Response;
      try {
        response = await doFetch(url, {
          method: "POST",
          headers,
          body,
          signal: AbortSignal.any(signals),
        });
      } catch (cause) {
        // The caller's own cancellation is theirs: pass it through untouched
        // and never retry it.
        if (callerSignal?.aborted) throw callerSignal.reason;

        if (totalSignal.aborted) {
          fail(
            new PaycadooTimeoutError("total", totalTimeoutMs, {
              ...context,
              attempts: attempt,
              cause,
            }),
            attempt,
          );
        }

        const error = attemptSignal.aborted
          ? new PaycadooTimeoutError("attempt", timeoutMs, {
              ...context,
              attempts: attempt,
              cause,
            })
          : new PaycadooNetworkError(
              `Paycadoo request failed: ${cause instanceof Error ? cause.message : String(cause)}`,
              { ...context, attempts: attempt, cause },
            );

        if (attempt >= attempts) fail(error, attempt);
        await backoff(attempt, undefined);
        continue;
      }

      if (!response.ok) {
        const text = await readBody(response);
        const error = new PaycadooHttpError(
          response.status,
          response.statusText,
          text,
          { ...context, attempts: attempt },
        );

        if (attempt >= attempts || !isRetryableStatus(response.status)) {
          fail(error, attempt);
        }

        await backoff(attempt, response.headers.get("retry-after"));
        continue;
      }

      let payload: GraphqlResponseBody<TResult>;
      try {
        payload = (await response.json()) as GraphqlResponseBody<TResult>;
      } catch (cause) {
        fail(
          new PaycadooError("Paycadoo returned a body that is not JSON", {
            ...context,
            attempts: attempt,
            cause,
          }),
          attempt,
        );
      }

      // A `200` carrying `errors[]` is the application answering, not the
      // transport failing. Repeating it is how you charge a customer twice.
      if (payload.errors && payload.errors.length > 0) {
        fail(
          new PaycadooGraphQLError(payload.errors, {
            ...context,
            attempts: attempt,
          }),
          attempt,
        );
      }

      if (payload.data === undefined || payload.data === null) {
        fail(
          new PaycadooError("Paycadoo returned no data and no errors", {
            ...context,
            attempts: attempt,
          }),
          attempt,
        );
      }

      logger?.debug(
        { requestId, operationName: operation.name, attempt },
        "Paycadoo request succeeded",
      );

      return payload.data as TResult;
    }

    async function backoff(attemptNumber: number, retryAfter: string | null | undefined) {
      const delay =
        parseRetryAfter(retryAfter ?? null) ??
        computeRetryDelay(attemptNumber, retry.baseDelayMs, retry.maxDelayMs);

      logger?.warn(
        { requestId, operationName: operation.name, attempt: attemptNumber, delay },
        "Retrying Paycadoo request",
      );

      try {
        await sleep(delay, AbortSignal.any(callerSignal ? [callerSignal, totalSignal] : [totalSignal]));
      } catch {
        if (callerSignal?.aborted) throw callerSignal.reason;
        throw new PaycadooTimeoutError("total", totalTimeoutMs, {
          ...context,
          attempts: attemptNumber,
        });
      }
    }
  };
};
