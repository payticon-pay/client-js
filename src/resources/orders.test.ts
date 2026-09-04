import { describe, expect, it } from "vitest";
import { PaycadooGraphQLError, PaycadooTimeoutError } from "../errors.js";
import { collect } from "../pagination.js";
import { createOrdersResource } from "./orders.js";
import { createExecutorSpy, type ExecutorCall } from "../testing/executorSpy.js";

const ORDER_ID = "3f2b8c1e-4d5a-4f8b-9c2d-1a2b3c4d5e6f";

const anOrder = (overrides: Record<string, unknown> = {}) => ({
  id: ORDER_ID,
  status: "CREATED",
  merchantId: "invoice-1",
  ...overrides,
});

const orderAlreadyExists = () =>
  new PaycadooGraphQLError([
    { message: "Order already exists", extensions: { code: "ORDER_ALREADY_EXISTS" } },
  ]);

describe("orders", () => {
  describe("get", () => {
    it("should return null when the order does not exist", async () => {
      const spy = createExecutorSpy(() => ({ orderByPk: null }));
      const orders = createOrdersResource(spy.execute);

      await expect(orders.get(ORDER_ID)).resolves.toBeNull();
    });
  });

  describe("findByIdOrMerchantId", () => {
    it("should send the identifier in both branches of the _or when it is a uuid", async () => {
      const spy = createExecutorSpy(() => ({ order: [anOrder()] }));
      const orders = createOrdersResource(spy.execute);

      await orders.findByIdOrMerchantId(ORDER_ID);

      const [call] = spy.callTo("FindOrderByIdOrMerchantId");
      expect(call?.variables).toEqual({ ids: [ORDER_ID], merchantId: ORDER_ID });
      expect(call?.document).toContain("_or: [{id: {_in: $ids}}, {merchantId: {_eq: $merchantId}}]");
    });

    it("should send an empty id list for an identifier that is not a uuid", async () => {
      const spy = createExecutorSpy(() => ({ order: [] }));
      const orders = createOrdersResource(spy.execute);

      await orders.findByIdOrMerchantId("invoice-1");

      expect(spy.callTo("FindOrderByIdOrMerchantId")[0]?.variables).toEqual({
        ids: [],
        merchantId: "invoice-1",
      });
    });

    it("should return null for an empty list rather than throwing", async () => {
      const spy = createExecutorSpy(() => ({ order: [] }));
      const orders = createOrdersResource(spy.execute);

      await expect(orders.findByIdOrMerchantId(ORDER_ID)).resolves.toBeNull();
    });
  });

  describe("createIdempotent", () => {
    const input = { merchantId: "invoice-1" } as never;

    const recoveringExecutor = (createError: Error) =>
      createExecutorSpy((call: ExecutorCall) => {
        if (call.operationName === "CreateOrder") return createError;
        if (call.operationName === "FindOrderByMerchantId") return { order: [anOrder()] };
        if (call.operationName === "GetOrderPaywallUrl") {
          return { generateOrderPaywallUrl: { url: "https://pay.test/existing" } };
        }
        return {};
      });

    it("should recover the existing order after ORDER_ALREADY_EXISTS", async () => {
      const spy = recoveringExecutor(orderAlreadyExists());
      const orders = createOrdersResource(spy.execute);

      const result = await orders.createIdempotent(input);

      expect(result).toMatchObject({
        reused: true,
        orderId: ORDER_ID,
        paywallUrl: "https://pay.test/existing",
      });
      expect(spy.callTo("CreateOrder")).toHaveLength(1);
    });

    it("should recover after a timeout, which carries no domain code at all", async () => {
      const spy = recoveringExecutor(new PaycadooTimeoutError("attempt", 10_000));
      const orders = createOrdersResource(spy.execute);

      const result = await orders.createIdempotent(input);

      expect(result.reused).toBe(true);
      expect(spy.callTo("CreateOrder")).toHaveLength(1);
    });

    it("should rethrow the original error when no such order exists", async () => {
      const original = new PaycadooTimeoutError("attempt", 10_000);
      const spy = createExecutorSpy((call) => {
        if (call.operationName === "CreateOrder") return original;
        if (call.operationName === "FindOrderByMerchantId") return { order: [] };
        return {};
      });
      const orders = createOrdersResource(spy.execute);

      await expect(orders.createIdempotent(input)).rejects.toBe(original);
    });

    it("should rethrow the original error when the recovery lookup itself fails", async () => {
      const original = orderAlreadyExists();
      const spy = createExecutorSpy((call) => {
        if (call.operationName === "CreateOrder") return original;
        return new Error("lookup exploded");
      });
      const orders = createOrdersResource(spy.execute);

      await expect(orders.createIdempotent(input)).rejects.toBe(original);
    });

    it("should report reused: false on the happy path", async () => {
      const spy = createExecutorSpy(() => ({
        createOrder: { orderId: ORDER_ID, paywallUrl: "https://pay.test/new" },
      }));
      const orders = createOrdersResource(spy.execute);

      await expect(orders.createIdempotent(input)).resolves.toEqual({
        reused: false,
        orderId: ORDER_ID,
        paywallUrl: "https://pay.test/new",
      });
      expect(spy.operations()).toEqual(["CreateOrder"]);
    });
  });

  describe("listAll", () => {
    it("should walk every page and call the server once per page", async () => {
      const total = 250;
      const spy = createExecutorSpy((call) => {
        const { limit, offset } = call.variables as { limit: number; offset: number };
        return {
          order: Array.from({ length: Math.max(0, Math.min(limit, total - offset)) }, (_, i) =>
            anOrder({ merchantId: `invoice-${offset + i}` }),
          ),
        };
      });
      const orders = createOrdersResource(spy.execute);

      const all = await collect(orders.listAll({ pageSize: 100 }));

      expect(all).toHaveLength(total);
      expect(spy.callTo("ListOrders")).toHaveLength(3);
      expect(spy.callTo("ListOrders").map((c) => (c.variables as { offset: number }).offset)).toEqual(
        [0, 100, 200],
      );
    });

    it("should pass the caller's filter through to every page", async () => {
      const spy = createExecutorSpy(() => ({ order: [] }));
      const orders = createOrdersResource(spy.execute);

      await collect(orders.listAll({ where: { status: { _eq: "PAID" } } as never }));

      expect(spy.callTo("ListOrders")[0]?.variables).toMatchObject({
        where: { status: { _eq: "PAID" } },
      });
    });
  });

  describe("retry stance", () => {
    it("should mark the money-moving mutations as never retryable", async () => {
      const spy = createExecutorSpy(() => ({
        createOrder: { orderId: ORDER_ID, paywallUrl: "u" },
        refundOrder: [],
      }));
      const orders = createOrdersResource(spy.execute);

      await orders.create({ merchantId: "m" } as never);
      await orders.refund({ orderId: ORDER_ID } as never);

      expect(spy.callTo("CreateOrder")[0]?.options).toMatchObject({ idempotent: false });
      expect(spy.callTo("RefundOrder")[0]?.options).toMatchObject({ idempotent: false });
    });

    it("should allow retrying the mutations that only write a value", async () => {
      const spy = createExecutorSpy(() => ({
        cancelOrder: { void: true },
        resendOrderWebhook: { orderId: ORDER_ID },
      }));
      const orders = createOrdersResource(spy.execute);

      await orders.cancel(ORDER_ID);
      await orders.resendWebhook(ORDER_ID);

      expect(spy.callTo("CancelOrder")[0]?.options).toMatchObject({ idempotent: true });
      expect(spy.callTo("ResendOrderWebhook")[0]?.options).toMatchObject({ idempotent: true });
    });
  });
});
