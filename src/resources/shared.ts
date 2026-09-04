import type { RequestOptions } from "../types.js";

/**
 * A mutation the SDK will never repeat on its own. Everything that moves money
 * carries this: a `500` may still have been applied server-side, and a second
 * attempt is a second charge.
 */
export const NEVER_RETRY: RequestOptions = { idempotent: false };

/**
 * A mutation that is safe to repeat: it writes a value rather than appending an
 * effect, so applying it twice lands in the same state as applying it once.
 */
export const SAFE_TO_RETRY: RequestOptions = { idempotent: true };

/** Merges caller options over a resource's retry stance without losing either. */
export const withRetryStance = (
  stance: RequestOptions,
  options: RequestOptions | undefined,
): RequestOptions => ({ ...stance, ...options });

/** Paging arguments every `list` method accepts. */
export interface ListOptions extends RequestOptions {
  limit?: number;
  offset?: number;
}

/** `listAll` walks pages itself, so it takes a page size rather than a limit. */
export interface ListAllOptions extends RequestOptions {
  /** Rows per request. Defaults to 100. */
  pageSize?: number;
  /** Stop after this many rows in total. */
  max?: number;
}

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isUuid = (value: string): boolean => UUID.test(value);
