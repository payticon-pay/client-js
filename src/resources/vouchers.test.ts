import { describe, expect, it } from "vitest";
import { createExecutorSpy } from "../testing/executorSpy.js";
import { createVouchersResource } from "./vouchers.js";

describe("vouchers", () => {
  it("should return null for an unknown code", async () => {
    const spy = createExecutorSpy(() => ({ voucherByCode: null }));

    await expect(createVouchersResource(spy.execute).getByCode("NOPE")).resolves.toBeNull();
  });

  it("should never retry generation, which mints real balance", async () => {
    const spy = createExecutorSpy(() => ({
      generateVoucher: { voucherId: "v1" },
      generateVouchers: { generationId: "g1", vouchers: [] },
    }));
    const vouchers = createVouchersResource(spy.execute);

    await vouchers.generateOne({ groupId: "g1", startBalance: 5_000 });
    await vouchers.generateMany({ groupId: "g1", count: 10, startBalance: 5_000 });

    expect(spy.callTo("GenerateVoucher")[0]?.options).toMatchObject({ idempotent: false });
    expect(spy.callTo("GenerateVouchers")[0]?.options).toMatchObject({ idempotent: false });
  });

  it("should never retry creating a group", async () => {
    const spy = createExecutorSpy(() => ({ insertVoucherGroupOne: { id: "g1" } }));

    await createVouchersResource(spy.execute).groups.create({ name: "Winter" } as never);

    expect(spy.callTo("CreateVoucherGroup")[0]?.options).toMatchObject({ idempotent: false });
  });
});
