import { describe, expect, it } from "vitest";
import { createPaycadooClient } from "../client.js";
import { createFetchStub, jsonResponse } from "../testing/fetchStub.js";

const ORDER_ID = "3f2b8c1e-4d5a-4f8b-9c2d-1a2b3c4d5e6f";
const PAYMENT_ID = "aa11bb22-cc33-4d44-8e55-ff6677889900";

/**
 * The end of the chain: a real client over a stubbed `fetch`. What the resource
 * declares about retrying only matters if the transport honours it, and a
 * second HTTP attempt on any of these is a second charge.
 */
const clientOver500 = () => {
  const stub = createFetchStub([new Response("boom", { status: 500 })]);
  const client = createPaycadooClient({
    apiKey: "test-key",
    endpoint: "https://api.example.test",
    fetch: stub.fetch,
    retry: { baseDelayMs: 0, maxDelayMs: 0 },
  });
  return { client, stub };
};

describe("retry contract over the real transport", () => {
  it.each([
    ["orders.create", (c: ReturnType<typeof createPaycadooClient>) =>
      c.orders.create({ merchantId: "m" } as never)],
    ["orders.refund", (c: ReturnType<typeof createPaycadooClient>) =>
      c.orders.refund({ orderId: ORDER_ID } as never)],
    ["payments.create", (c: ReturnType<typeof createPaycadooClient>) =>
      c.payments.create({ orderId: ORDER_ID } as never)],
    ["payments.createManual", (c: ReturnType<typeof createPaycadooClient>) =>
      c.payments.createManual({ orderId: ORDER_ID } as never)],
    ["payments.refund", (c: ReturnType<typeof createPaycadooClient>) =>
      c.payments.refund({ paymentId: PAYMENT_ID } as never)],
    ["subscriptions.create", (c: ReturnType<typeof createPaycadooClient>) =>
      c.subscriptions.create({} as never)],
    ["subscriptions.items.insert", (c: ReturnType<typeof createPaycadooClient>) =>
      c.subscriptions.items.insert({} as never)],
    ["vouchers.generateOne", (c: ReturnType<typeof createPaycadooClient>) =>
      c.vouchers.generateOne({ groupId: "g1", startBalance: 100 })],
    ["vouchers.generateMany", (c: ReturnType<typeof createPaycadooClient>) =>
      c.vouchers.generateMany({ groupId: "g1", count: 10, startBalance: 100 })],
  ])("should make exactly one HTTP attempt for %s on a 500", async (_name, call) => {
    const { client, stub } = clientOver500();

    await call(client).catch(() => undefined);

    expect(stub.calls).toHaveLength(1);
  });

  it.each([
    ["subscriptions.items.setEndsAt", (c: ReturnType<typeof createPaycadooClient>) =>
      c.subscriptions.items.setEndsAt("i1", null)],
    ["subscriptions.items.endMany", (c: ReturnType<typeof createPaycadooClient>) =>
      c.subscriptions.items.endMany({} as never)],
  ])("should allow retrying %s, which only writes a date", async (_name, call) => {
    const { client, stub } = clientOver500();

    await call(client).catch(() => undefined);

    expect(stub.calls).toHaveLength(3);
  });

  it("should retry a read three times on a 500", async () => {
    const { client, stub } = clientOver500();

    await client.orders.get(ORDER_ID).catch(() => undefined);

    expect(stub.calls).toHaveLength(3);
  });

  it("should recover an existing order without a second createOrder", async () => {
    const stub = createFetchStub([
      jsonResponse({ errors: [{ message: "exists", extensions: { code: "ORDER_ALREADY_EXISTS" } }] }),
      jsonResponse({ data: { order: [{ id: ORDER_ID, merchantId: "invoice-1" }] } }),
      jsonResponse({ data: { generateOrderPaywallUrl: { url: "https://pay.test/existing" } } }),
    ]);
    const client = createPaycadooClient({
      apiKey: "test-key",
      endpoint: "https://api.example.test",
      fetch: stub.fetch,
      retry: { baseDelayMs: 0, maxDelayMs: 0 },
    });

    const result = await client.orders.createIdempotent({ merchantId: "invoice-1" } as never);

    expect(result).toMatchObject({ reused: true, orderId: ORDER_ID });
    expect(stub.calls.filter((c) => c.body.operationName === "CreateOrder")).toHaveLength(1);
    expect(stub.calls).toHaveLength(3);
  });
});
