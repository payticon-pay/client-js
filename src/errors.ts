import type { PaycadooErrorCode } from "./errorCodes.js";

/** Shape of one entry in a GraphQL `errors[]` array. */
export interface PaycadooGraphQLErrorEntry {
  readonly message: string;
  readonly path?: ReadonlyArray<string | number>;
  readonly extensions?: {
    readonly code?: string;
    readonly [key: string]: unknown;
  };
}

export interface PaycadooErrorContext {
  /** Value of `x-request-id` sent with the request; correlates client and server logs. */
  readonly requestId?: string;
  /** Name of the GraphQL operation, when the document carried one. */
  readonly operationName?: string;
  /** How many HTTP attempts were made before this error was raised. */
  readonly attempts?: number;
  readonly cause?: unknown;
}

/** Base class for everything this package throws. */
export class PaycadooError extends Error {
  readonly requestId: string | undefined;
  readonly operationName: string | undefined;
  readonly attempts: number | undefined;

  constructor(message: string, context: PaycadooErrorContext = {}) {
    super(message, context.cause === undefined ? undefined : { cause: context.cause });
    this.name = new.target.name;
    this.requestId = context.requestId;
    this.operationName = context.operationName;
    this.attempts = context.attempts;
  }

  /** Without this, logging the error yields `{}`. */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      requestId: this.requestId,
      operationName: this.operationName,
      attempts: this.attempts,
    };
  }
}

/**
 * The server answered `200` and put `errors[]` in the body. This is the API
 * rejecting the operation, not a transport failure — it is never retried.
 */
export class PaycadooGraphQLError extends PaycadooError {
  /** `extensions.code` of the first error, kept as a typed but open union. */
  readonly code: PaycadooErrorCode | undefined;
  readonly errors: ReadonlyArray<PaycadooGraphQLErrorEntry>;

  constructor(
    errors: ReadonlyArray<PaycadooGraphQLErrorEntry>,
    context: PaycadooErrorContext = {},
  ) {
    const first = errors[0];
    super(first?.message ?? "GraphQL request failed", context);
    this.errors = errors;
    this.code = first?.extensions?.code;
  }

  override toJSON(): Record<string, unknown> {
    return { ...super.toJSON(), code: this.code, errors: this.errors };
  }
}

/** A non-2xx response. `status` decides whether it was worth retrying. */
export class PaycadooHttpError extends PaycadooError {
  readonly status: number;
  readonly statusText: string;
  /** Response body, truncated — enough to debug, small enough to log. */
  readonly body: string | undefined;

  constructor(
    status: number,
    statusText: string,
    body: string | undefined,
    context: PaycadooErrorContext = {},
  ) {
    super(`Paycadoo responded with HTTP ${status} ${statusText}`.trim(), context);
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }

  override toJSON(): Record<string, unknown> {
    return { ...super.toJSON(), status: this.status, body: this.body };
  }
}

/** `fetch` itself failed: DNS, TLS, connection reset. */
export class PaycadooNetworkError extends PaycadooError {}

/**
 * One of *our* deadlines fired. An `AbortSignal` supplied by the caller is not
 * turned into this — that error is rethrown untouched.
 */
export class PaycadooTimeoutError extends PaycadooError {
  /** `attempt` when a single try ran out, `total` when the whole call did. */
  readonly scope: "attempt" | "total";
  readonly timeoutMs: number;

  constructor(
    scope: "attempt" | "total",
    timeoutMs: number,
    context: PaycadooErrorContext = {},
  ) {
    super(
      scope === "attempt"
        ? `Paycadoo request attempt timed out after ${timeoutMs}ms`
        : `Paycadoo request timed out after ${timeoutMs}ms including retries`,
      context,
    );
    this.scope = scope;
    this.timeoutMs = timeoutMs;
  }

  override toJSON(): Record<string, unknown> {
    return { ...super.toJSON(), scope: this.scope, timeoutMs: this.timeoutMs };
  }
}

/** Thrown before any I/O when the client is configured with something unusable. */
export class PaycadooConfigError extends PaycadooError {}

export const isPaycadooError = (error: unknown): error is PaycadooError =>
  error instanceof PaycadooError;

export const isPaycadooGraphQLError = (
  error: unknown,
): error is PaycadooGraphQLError => error instanceof PaycadooGraphQLError;

export const isPaycadooHttpError = (error: unknown): error is PaycadooHttpError =>
  error instanceof PaycadooHttpError;

export const isPaycadooTimeoutError = (
  error: unknown,
): error is PaycadooTimeoutError => error instanceof PaycadooTimeoutError;

export const isPaycadooNetworkError = (
  error: unknown,
): error is PaycadooNetworkError => error instanceof PaycadooNetworkError;

/**
 * Narrows both the class and the literal code, so a `catch` block can branch on
 * `ORDER_ALREADY_EXISTS` without re-reading `.code` as a plain string.
 */
export const isPaycadooErrorCode = <const TCode extends PaycadooErrorCode>(
  error: unknown,
  code: TCode,
): error is PaycadooGraphQLError & { code: TCode } =>
  error instanceof PaycadooGraphQLError && error.code === code;
