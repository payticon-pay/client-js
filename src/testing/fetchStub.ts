/**
 * A `fetch` double that answers from a scripted queue and records what it was
 * asked for. Tests assert on the number of calls as much as on the result —
 * "exactly one HTTP attempt" is the retry contract for money-moving mutations.
 */
export interface FetchCall {
  url: string;
  init: RequestInit;
  body: { query: string; variables?: unknown; operationName?: string };
  headers: Record<string, string>;
  at: number;
}

export type ScriptedResponse =
  | Response
  | Error
  | ((init: RequestInit) => Response | Error | Promise<Response>);

export interface FetchStub {
  fetch: typeof globalThis.fetch;
  calls: FetchCall[];
}

export const jsonResponse = (body: unknown, init: ResponseInit = {}): Response =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });

export const graphqlError = (code: string, message = code): Response =>
  jsonResponse({ errors: [{ message, extensions: { code } }] });

/** A request that never answers, and rejects the way `fetch` does when aborted. */
export const hangs: ScriptedResponse = (init) =>
  new Promise<Response>((_resolve, reject) => {
    init.signal?.addEventListener("abort", () => reject(init.signal?.reason), {
      once: true,
    });
  });

export const createFetchStub = (responses: ScriptedResponse[]): FetchStub => {
  const calls: FetchCall[] = [];
  let index = 0;

  const fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    calls.push({
      url: String(input),
      init,
      body: JSON.parse(String(init.body ?? "{}")),
      headers: { ...((init.headers ?? {}) as Record<string, string>) },
      at: Date.now(),
    });

    // The last scripted response repeats, so a test that only cares about the
    // failure mode does not have to script every attempt.
    const scripted = responses[Math.min(index, responses.length - 1)];
    index += 1;

    if (scripted instanceof Error) throw scripted;
    if (scripted instanceof Response) return scripted.clone();
    if (!scripted) throw new Error("fetch stub ran out of responses");

    const resolved = await scripted(init);
    if (resolved instanceof Error) throw resolved;
    return resolved;
  }) as typeof globalThis.fetch;

  return { fetch, calls };
};
