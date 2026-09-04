import { describe, expect, it } from "vitest";
import { createRefundsResource } from "./refunds.js";
import { createExecutorSpy } from "../testing/executorSpy.js";

const PAYMENT_ID = "aa11bb22-cc33-4d44-8e55-ff6677889900";
const REFUND_ID = "bb22cc33-dd44-4e55-9f66-001122334455";

describe("refunds", () => {
  it("should return null when the refund does not exist", async () => {
    const spy = createExecutorSpy(() => ({ refundByPk: null }));

    await expect(createRefundsResource(spy.execute).get(REFUND_ID)).resolves.toBeNull();
  });

  it("should list the refunds of one payment oldest first", async () => {
    const spy = createExecutorSpy(() => ({ refund: [] }));

    await createRefundsResource(spy.execute).listByPayment(PAYMENT_ID);

    const [call] = spy.callTo("ListRefundsByPayment");
    expect(call?.variables).toMatchObject({ paymentId: PAYMENT_ID });
    expect(call?.document).toContain("orderBy: {createdAt: ASC}");
  });

  it("should allow retrying a refresh", async () => {
    const spy = createExecutorSpy(() => ({ forceRefreshRefund: { refundId: REFUND_ID } }));

    await createRefundsResource(spy.execute).forceRefresh(REFUND_ID);

    expect(spy.callTo("ForceRefreshRefund")[0]?.options).toMatchObject({ idempotent: true });
  });
});
