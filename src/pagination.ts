import { DEFAULT_PAGE_SIZE } from "./constants.js";

/** Hasura's paging arguments, as every `list` document takes them. */
export interface PageParams {
  limit: number;
  offset: number;
}

export interface PaginateOptions {
  /** Rows per request. Defaults to `100`. */
  pageSize?: number;
  /** Row to start from. Defaults to `0`. */
  offset?: number;
  /** Stop after this many rows in total. Unlimited by default. */
  max?: number;
}

/**
 * Walks an offset-paged list one page at a time.
 *
 * Stops as soon as a page comes back shorter than the page size, so a list of
 * `n` rows costs `ceil(n / pageSize)` requests and not one more.
 */
export async function* paginate<T>(
  fetchPage: (page: PageParams) => Promise<T[]>,
  options: PaginateOptions = {},
): AsyncGenerator<T, void, undefined> {
  const pageSize = options.pageSize ?? DEFAULT_PAGE_SIZE;
  if (pageSize < 1) throw new RangeError("`pageSize` must be at least 1");

  let offset = options.offset ?? 0;
  let yielded = 0;

  for (;;) {
    const remaining = options.max === undefined ? pageSize : options.max - yielded;
    if (remaining <= 0) return;

    const limit = Math.min(pageSize, remaining);
    const rows = await fetchPage({ limit, offset });

    for (const row of rows) {
      yield row;
      yielded += 1;
      if (options.max !== undefined && yielded >= options.max) return;
    }

    if (rows.length < limit) return;
    offset += rows.length;
  }
}

/** Drains an async iterable into an array. */
export const collect = async <T>(source: AsyncIterable<T>): Promise<T[]> => {
  const items: T[] = [];
  for await (const item of source) items.push(item);
  return items;
};
