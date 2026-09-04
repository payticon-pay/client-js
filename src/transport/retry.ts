import { RETRYABLE_STATUS_CODES } from "../constants.js";

export const isRetryableStatus = (status: number): boolean =>
  RETRYABLE_STATUS_CODES.has(status);

/**
 * Full jitter: a uniform draw from `[0, cap]` where the cap doubles per attempt.
 * Picking the cap itself would make every client in a fleet retry in lockstep,
 * which is how a recovering server gets knocked over a second time.
 */
export const computeRetryDelay = (
  attempt: number,
  baseDelayMs: number,
  maxDelayMs: number,
  random: () => number = Math.random,
): number => {
  const cap = Math.min(maxDelayMs, baseDelayMs * 2 ** Math.max(0, attempt - 1));
  return Math.round(random() * cap);
};

/**
 * `Retry-After` in seconds or as an HTTP date. The server knows when it will be
 * ready and we do not, so this wins over the computed backoff.
 */
export const parseRetryAfter = (
  header: string | null,
  now: number = Date.now(),
): number | undefined => {
  if (!header) return undefined;

  const seconds = Number(header.trim());
  if (Number.isFinite(seconds) && seconds >= 0) return Math.round(seconds * 1000);

  const date = Date.parse(header);
  if (Number.isNaN(date)) return undefined;

  return Math.max(0, date - now);
};

/** Resolves after `ms`, or rejects with the signal's reason if it aborts first. */
export const sleep = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timer);
      reject(signal?.reason);
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
