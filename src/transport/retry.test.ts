import { describe, expect, it } from "vitest";
import { computeRetryDelay, isRetryableStatus, parseRetryAfter } from "./retry.js";

describe("isRetryableStatus", () => {
  it("should accept the transient statuses and refuse the rest", () => {
    for (const status of [408, 425, 429, 500, 502, 503, 504]) {
      expect(isRetryableStatus(status)).toBe(true);
    }
    for (const status of [200, 400, 401, 403, 404, 409, 422, 501]) {
      expect(isRetryableStatus(status)).toBe(false);
    }
  });
});

describe("computeRetryDelay", () => {
  it("should double the cap per attempt", () => {
    const atMax = () => 1;
    expect(computeRetryDelay(1, 200, 5_000, atMax)).toBe(200);
    expect(computeRetryDelay(2, 200, 5_000, atMax)).toBe(400);
    expect(computeRetryDelay(3, 200, 5_000, atMax)).toBe(800);
  });

  it("should clamp the cap", () => {
    expect(computeRetryDelay(10, 200, 1_000, () => 1)).toBe(1_000);
  });

  it("should draw from the whole range, not just the cap", () => {
    expect(computeRetryDelay(3, 200, 5_000, () => 0)).toBe(0);
    expect(computeRetryDelay(3, 200, 5_000, () => 0.5)).toBe(400);
  });
});

describe("parseRetryAfter", () => {
  it("should read a delay in seconds", () => {
    expect(parseRetryAfter("2")).toBe(2_000);
    expect(parseRetryAfter("0")).toBe(0);
  });

  it("should read an http date relative to now", () => {
    const now = Date.parse("2026-01-01T00:00:00Z");
    expect(parseRetryAfter("Thu, 01 Jan 2026 00:00:30 GMT", now)).toBe(30_000);
  });

  it("should never go negative for a date in the past", () => {
    const now = Date.parse("2026-01-01T00:01:00Z");
    expect(parseRetryAfter("Thu, 01 Jan 2026 00:00:00 GMT", now)).toBe(0);
  });

  it("should ignore a missing or unparseable header", () => {
    expect(parseRetryAfter(null)).toBeUndefined();
    expect(parseRetryAfter("soon")).toBeUndefined();
  });
});
