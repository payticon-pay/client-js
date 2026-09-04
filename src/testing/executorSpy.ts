import { vi } from "vitest";
import { parseOperation } from "../transport/operation.js";
import type { GraphqlExecutor, RequestOptions } from "../types.js";

export interface ExecutorCall {
  operationName: string | undefined;
  document: string;
  variables: unknown;
  options: RequestOptions | undefined;
}

/**
 * Resources take exactly one dependency — the executor — so their double is a
 * single `vi.fn`. Nothing here knows about `fetch` or about generated code.
 */
export const createExecutorSpy = (
  handler: (call: ExecutorCall) => unknown = () => ({}),
) => {
  const calls: ExecutorCall[] = [];

  const execute = vi.fn(
    async (
      document: unknown,
      variables?: unknown,
      options?: RequestOptions,
    ): Promise<unknown> => {
      const text = String(document);
      const call: ExecutorCall = {
        operationName: parseOperation(text).name,
        document: text,
        variables,
        options,
      };
      calls.push(call);

      const result = handler(call);
      if (result instanceof Error) throw result;
      return result;
    },
  ) as unknown as GraphqlExecutor & { mock: { calls: unknown[] } };

  return {
    execute,
    calls,
    /** Names of the operations executed, in order. */
    operations: () => calls.map((call) => call.operationName),
    callTo: (operationName: string) =>
      calls.filter((call) => call.operationName === operationName),
  };
};
