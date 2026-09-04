import { describe, expect, it } from "vitest";
import { createPaymentsResource } from "./payments.js";
import { createExecutorSpy } from "../testing/executorSpy.js";

const ORDER_ID = "3f2b8c1e-4d5a-4f8b-9c2d-1a2b3c4d5e6f";
const PAYMENT_ID = "aa11bb22-cc33-4d44-8e55-ff6677889900";

describe("payments", () => {
  describe("get", () => {
    it("should return null when the payment does not exist", async () => {
      const spy = createExecutorSpy(() => ({ paymentByPk: null }));

      await expect(createPaymentsResource(spy.execute).get(PAYMENT_ID)).resolves.toBeNull();
    });
  });

  describe("listByOrder", () => {
    it("should filter by order and page with the caller's window", async () => {
      const spy = createExecutorSpy(() => ({ payment: [] }));

      await createPaymentsResource(spy.execute).listByOrder(ORDER_ID, {
        limit: 50,
        offset: 100,
      });

      expect(spy.callTo("ListPaymentsByOrder")[0]?.variables).toEqual({
        orderId: ORDER_ID,
        limit: 50,
        offset: 100,
      });
    });
  });

  describe("parameters", () => {
    it("should hand back the provider payload as unknown, not any", async () => {
      const spy = createExecutorSpy(() => ({
        getPaymentParameters: { parameters: { blikCodeRequired: true } },
      }));

      const parameters = await createPaymentsResource(spy.execute).parameters({
        amount: 100,
        currency: "PLN",
        paymentMethodId: "blik",
      });

      expect(parameters).toEqual({ blikCodeRequired: true });
    });
  });

  describe("retry stance", () => {
    it("should never retry the mutations that move money", async () => {
      const spy = createExecutorSpy(() => ({
        createPayment: { paymentId: PAYMENT_ID },
        createManualPayment: { paymentId: PAYMENT_ID },
        refundPayment: { refundId: "r1" },
      }));
      const payments = createPaymentsResource(spy.execute);

      await payments.create({ orderId: ORDER_ID } as never);
      await payments.createManual({ orderId: ORDER_ID } as never);
      await payments.refund({ paymentId: PAYMENT_ID } as never);

      expect(spy.callTo("CreatePayment")[0]?.options).toMatchObject({ idempotent: false });
      expect(spy.callTo("CreateManualPayment")[0]?.options).toMatchObject({ idempotent: false });
      expect(spy.callTo("RefundPayment")[0]?.options).toMatchObject({ idempotent: false });
    });

    it("should allow retrying a refresh, which only re-reads the provider", async () => {
      const spy = createExecutorSpy(() => ({ forceRefreshPayment: { paymentId: PAYMENT_ID } }));

      await createPaymentsResource(spy.execute).forceRefresh(PAYMENT_ID);

      expect(spy.callTo("ForceRefreshPayment")[0]?.options).toMatchObject({ idempotent: true });
    });
  });
});
