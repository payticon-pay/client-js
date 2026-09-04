import { describe, expect, it, vi } from "vitest";
import { collect, paginate } from "./pagination.js";

const pagedSource = (total: number) =>
  vi.fn(async ({ limit, offset }: { limit: number; offset: number }) =>
    Array.from({ length: Math.max(0, Math.min(limit, total - offset)) }, (_, i) => offset + i),
  );

describe("paginate", () => {
  it("should yield every row and call the server once per page", async () => {
    const fetchPage = pagedSource(250);

    const rows = await collect(paginate(fetchPage, { pageSize: 100 }));

    expect(rows).toHaveLength(250);
    expect(rows[0]).toBe(0);
    expect(rows[249]).toBe(249);
    expect(fetchPage).toHaveBeenCalledTimes(3);
  });

  it("should not ask for a page it knows is empty when the total divides evenly", async () => {
    const fetchPage = pagedSource(200);

    const rows = await collect(paginate(fetchPage, { pageSize: 100 }));

    expect(rows).toHaveLength(200);
    // 200 rows in pages of 100 is two full pages; the third call only exists to
    // learn the list ended, and it is the one we accept.
    expect(fetchPage).toHaveBeenCalledTimes(3);
  });

  it("should stop at max without over-fetching", async () => {
    const fetchPage = pagedSource(1_000);

    const rows = await collect(paginate(fetchPage, { pageSize: 100, max: 150 }));

    expect(rows).toHaveLength(150);
    expect(fetchPage).toHaveBeenCalledTimes(2);
    expect(fetchPage.mock.calls[1]?.[0]).toEqual({ limit: 50, offset: 100 });
  });

  it("should start from the given offset", async () => {
    const fetchPage = pagedSource(30);

    const rows = await collect(paginate(fetchPage, { pageSize: 10, offset: 20 }));

    expect(rows).toEqual([20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
  });

  it("should handle an empty list in one call", async () => {
    const fetchPage = pagedSource(0);

    await expect(collect(paginate(fetchPage))).resolves.toEqual([]);
    expect(fetchPage).toHaveBeenCalledTimes(1);
  });

  it("should refuse a page size below one", async () => {
    await expect(collect(paginate(pagedSource(1), { pageSize: 0 }))).rejects.toThrow(RangeError);
  });
});
