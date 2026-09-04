import { describe, expect, it, vi } from "vitest";
import { createPaycadooClient } from "../client.js";
import {
  PaycadooConfigError,
  PaycadooGraphQLError,
  PaycadooHttpError,
  PaycadooTimeoutError,
  isPaycadooErrorCode,
} from "../errors.js";
import { TypedDocumentString } from "../graphql/TypedDocumentString.js";
import {
  createFetchStub,
  graphqlError,
  hangs,
  jsonResponse,
  type ScriptedResponse,
} from "../testing/fetchStub.js";
import type { PaycadooClientOptions } from "../types.js";

const QUERY = new TypedDocumentString<{ orderByPk: { id: string } }, { id: string }>(
  "query GetOrder($id: uuid!) { orderByPk(id: $id) { id } }",
);

const MUTATION = new TypedDocumentString<{ createOrder: { orderId: string } }, never>(
  "mutation CreateOrder($input: CreateOrderInput!) { createOrder(input: $input) { orderId } }",
);

const clientWith = (
  responses: ScriptedResponse[],
  options: Partial<PaycadooClientOptions> = {},
) => {
  const stub = createFetchStub(responses);
  const client = createPaycadooClient({
    apiKey: "test-key",
    endpoint: "https://api.example.test",
    fetch: stub.fetch,
    retry: { baseDelayMs: 0, maxDelayMs: 0 },
    ...options,
  });
  return { client, stub };
};

describe("createExecutor", () => {
  describe("configuration", () => {
    it("should refuse to build a client without an api key", () => {
      expect(() => createPaycadooClient({ apiKey: "" })).toThrow(PaycadooConfigError);
    });

    it("should post to the graphql path with the api key and a request id", async () => {
      const { client, stub } = clientWith([jsonResponse({ data: { orderByPk: { id: "o1" } } })]);

      await client.raw(QUERY, { id: "o1" });

      expect(stub.calls).toHaveLength(1);
      const [call] = stub.calls;
      expect(call?.url).toBe("https://api.example.test/v1/graphql");
      expect(call?.init.method).toBe("POST");
      expect(call?.headers["x-api-key"]).toBe("test-key");
      expect(call?.headers["x-request-id"]).toMatch(/^[0-9a-f-]{36}$/);
      expect(call?.body.operationName).toBe("GetOrder");
      expect(call?.body.variables).toEqual({ id: "o1" });
    });

    it("should not let extra headers override the api key", async () => {
      const { client, stub } = clientWith([jsonResponse({ data: { orderByPk: { id: "o1" } } })], {
        headers: { "x-api-key": "smuggled", "x-tenant": "acme" },
      });

      await client.raw(QUERY, { id: "o1" });

      expect(stub.calls[0]?.headers["x-api-key"]).toBe("test-key");
      expect(stub.calls[0]?.headers["x-tenant"]).toBe("acme");
    });
  });

  describe("graphql errors", () => {
    it("should raise a typed error and make exactly one attempt for a 200 with errors", async () => {
      const { client, stub } = clientWith([graphqlError("ORDER_ALREADY_EXISTS")]);

      const error = await client
        .raw(QUERY, { id: "o1" }, { idempotent: true })
        .catch((e: unknown) => e);

      expect(stub.calls).toHaveLength(1);
      expect(error).toBeInstanceOf(PaycadooGraphQLError);
      expect((error as PaycadooGraphQLError).code).toBe("ORDER_ALREADY_EXISTS");
      expect(isPaycadooErrorCode(error, "ORDER_ALREADY_EXISTS")).toBe(true);
      expect(isPaycadooErrorCode(error, "ORDER_NOT_FOUND")).toBe(false);
    });

    it("should carry the request id and operation name on the error", async () => {
      const { client } = clientWith([graphqlError("INVALID_API_KEY")]);

      const error = (await client
        .raw(QUERY, { id: "o1" }, { requestId: "req-42" })
        .catch((e: unknown) => e)) as PaycadooGraphQLError;

      expect(error.requestId).toBe("req-42");
      expect(error.operationName).toBe("GetOrder");
      expect(error.toJSON()).toMatchObject({ code: "INVALID_API_KEY", requestId: "req-42" });
    });
  });

  describe("retries", () => {
    it("should retry a query three times on 500", async () => {
      const { client, stub } = clientWith([new Response("boom", { status: 500 })]);

      const error = await client.raw(QUERY, { id: "o1" }).catch((e: unknown) => e);

      expect(stub.calls).toHaveLength(3);
      expect(error).toBeInstanceOf(PaycadooHttpError);
      expect((error as PaycadooHttpError).status).toBe(500);
      expect((error as PaycadooHttpError).attempts).toBe(3);
    });

    it("should make exactly one attempt for a mutation on 500", async () => {
      const { client, stub } = clientWith([new Response("boom", { status: 500 })]);

      await client.raw(MUTATION, undefined).catch(() => undefined);

      expect(stub.calls).toHaveLength(1);
    });

    it("should not retry a 400", async () => {
      const { client, stub } = clientWith([new Response("nope", { status: 400 })]);

      await client.raw(QUERY, { id: "o1" }).catch(() => undefined);

      expect(stub.calls).toHaveLength(1);
    });

    it("should recover when a later attempt succeeds", async () => {
      const { client, stub } = clientWith([
        new Response("boom", { status: 503 }),
        jsonResponse({ data: { orderByPk: { id: "o1" } } }),
      ]);

      await expect(client.raw(QUERY, { id: "o1" })).resolves.toEqual({
        orderByPk: { id: "o1" },
      });
      expect(stub.calls).toHaveLength(2);
    });

    it("should retry a network failure", async () => {
      const { client, stub } = clientWith([new TypeError("fetch failed")]);

      await client.raw(QUERY, { id: "o1" }).catch(() => undefined);

      expect(stub.calls).toHaveLength(3);
    });
  });

  describe("timeouts", () => {
    it("should raise an attempt timeout and retry it", async () => {
      const { client, stub } = clientWith([hangs], { timeoutMs: 20 });

      const error = await client.raw(QUERY, { id: "o1" }).catch((e: unknown) => e);

      expect(error).toBeInstanceOf(PaycadooTimeoutError);
      expect((error as PaycadooTimeoutError).scope).toBe("attempt");
      expect(stub.calls).toHaveLength(3);
    });

    it("should stop at the total budget", async () => {
      const { client } = clientWith([hangs], { timeoutMs: 50, totalTimeoutMs: 30 });

      const error = await client.raw(QUERY, { id: "o1" }).catch((e: unknown) => e);

      expect(error).toBeInstanceOf(PaycadooTimeoutError);
      expect((error as PaycadooTimeoutError).scope).toBe("total");
    });

    it("should rethrow the caller's abort reason untouched and not retry", async () => {
      const controller = new AbortController();
      const reason = new Error("caller gave up");
      const { client, stub } = clientWith([hangs], { timeoutMs: 1_000 });

      const promise = client.raw(QUERY, { id: "o1" }, { signal: controller.signal });
      setTimeout(() => controller.abort(reason), 10);

      await expect(promise).rejects.toBe(reason);
      expect(stub.calls).toHaveLength(1);
    });
  });

  describe("logging", () => {
    const makeLogger = () => {
      const logger = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        child: vi.fn(() => logger),
      };
      return logger;
    };

    it("should keep variables out of the log by default", async () => {
      const logger = makeLogger();
      const { client } = clientWith([graphqlError("BAD_USER_INPUT")], { logger });

      await client.raw(QUERY, { id: "secret-order" }).catch(() => undefined);

      expect(logger.error).toHaveBeenCalledTimes(1);
      const [payload] = logger.error.mock.calls[0] ?? [];
      expect(payload).not.toHaveProperty("variables");
      expect(JSON.stringify(payload)).not.toContain("secret-order");
    });

    it("should include variables when explicitly asked to", async () => {
      const logger = makeLogger();
      const { client } = clientWith([graphqlError("BAD_USER_INPUT")], {
        logger,
        logVariables: true,
      });

      await client.raw(QUERY, { id: "secret-order" }).catch(() => undefined);

      const [payload] = logger.error.mock.calls[0] ?? [];
      expect(payload).toMatchObject({ variables: { id: "secret-order" } });
    });
  });

  describe("raw", () => {
    it("should accept a bare string document", async () => {
      const { client, stub } = clientWith([jsonResponse({ data: { __typename: "query_root" } })]);

      const result = await client.raw<{ __typename: string }>("query Ping { __typename }");

      expect(result).toEqual({ __typename: "query_root" });
      expect(stub.calls[0]?.body.operationName).toBe("Ping");
    });
  });

  describe("ping", () => {
    it("should resolve when the endpoint answers", async () => {
      const { client } = clientWith([jsonResponse({ data: { __typename: "query_root" } })]);

      await expect(client.ping()).resolves.toBe(true);
    });
  });
});
