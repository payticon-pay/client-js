/** Public API host. Override per environment through `endpoint`. */
export const DEFAULT_ENDPOINT = "https://api.paycadoo.com";

/** Path the GraphQL API is served under; `x-api-key` maps onto the `project` role. */
export const DEFAULT_GRAPHQL_PATH = "/v1/graphql";

/** Deadline for a single HTTP attempt. */
export const DEFAULT_TIMEOUT_MS = 10_000;

/** Deadline for a call as a whole, retries and backoff included. */
export const DEFAULT_TOTAL_TIMEOUT_MS = 30_000;

/** Attempts for a retryable call, the first one included. */
export const DEFAULT_MAX_ATTEMPTS = 3;

export const DEFAULT_RETRY_BASE_DELAY_MS = 200;
export const DEFAULT_RETRY_MAX_DELAY_MS = 5_000;

/**
 * Statuses worth another attempt. Everything else is the server telling us the
 * request itself is wrong, and repeating it changes nothing.
 */
export const RETRYABLE_STATUS_CODES: ReadonlySet<number> = new Set([
  408, 425, 429, 500, 502, 503, 504,
]);

/** Rows per page for the `listAll` generators. */
export const DEFAULT_PAGE_SIZE = 100;
