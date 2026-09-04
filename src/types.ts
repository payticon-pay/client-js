import type { PaycadooDocument } from "./graphql/TypedDocumentString.js";

/**
 * Structural logger. A pino instance satisfies it as-is, so the package depends
 * on neither `pino` nor `@types/pino`.
 */
export interface PaycadooLogger {
  debug(obj: unknown, msg?: string): void;
  info(obj: unknown, msg?: string): void;
  warn(obj: unknown, msg?: string): void;
  error(obj: unknown, msg?: string): void;
  child(bindings: Record<string, unknown>): PaycadooLogger;
}

export interface RetryOptions {
  /** Attempts for a retryable call, the first one included. `1` disables retrying. */
  attempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
}

export interface PaycadooClientOptions {
  /** Project API key. Sent as `x-api-key`; maps onto the Hasura `project` role. */
  apiKey: string;
  /** API origin. Defaults to `https://api.paycadoo.com`. */
  endpoint?: string;
  /** Path the GraphQL API is served under. Defaults to `/v1/graphql`. */
  graphqlPath?: string;
  /** Deadline for a single HTTP attempt, in ms. Defaults to `10000`. */
  timeoutMs?: number;
  /** Deadline for the whole call including retries, in ms. Defaults to `30000`. */
  totalTimeoutMs?: number;
  retry?: Partial<RetryOptions>;
  /** Extra headers merged into every request. `x-api-key` cannot be overridden. */
  headers?: Record<string, string>;
  /** Injected `fetch`, for tests and proxies. Defaults to the global one. */
  fetch?: typeof globalThis.fetch;
  logger?: PaycadooLogger;
  /**
   * Include operation variables in log output. Off by default: variables carry
   * customer data and amounts, and logs outlive the request.
   */
  logVariables?: boolean;
}

export interface RequestOptions {
  /** Caller's cancellation. Its abort reason is rethrown untouched, never retried. */
  signal?: AbortSignal;
  /**
   * Whether repeating this request is safe. Defaults to `true` for queries and
   * `false` for mutations, decided from the document itself.
   */
  idempotent?: boolean;
  timeoutMs?: number;
  totalTimeoutMs?: number;
  headers?: Record<string, string>;
  /** Sent as `x-request-id` and attached to every error raised for this call. */
  requestId?: string;
}

/**
 * The one seam every resource is built on: resource factories take this and
 * nothing else, so their tests never touch `fetch` or generated code.
 */
export type GraphqlExecutor = <TResult, TVariables>(
  document: PaycadooDocument<TResult, TVariables>,
  variables?: TVariables,
  options?: RequestOptions,
) => Promise<TResult>;

/** Body Paycadoo returns for a GraphQL request. */
export interface GraphqlResponseBody<TResult> {
  data?: TResult | null;
  errors?: Array<{
    message: string;
    path?: Array<string | number>;
    extensions?: { code?: string; [key: string]: unknown };
  }>;
}
