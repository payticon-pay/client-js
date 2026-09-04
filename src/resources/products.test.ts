import { describe, expect, it } from "vitest";
import { createExecutorSpy } from "../testing/executorSpy.js";
import { createProductsResource } from "./products.js";

describe("products", () => {
  describe("list", () => {
    it("should carry the exclusion as _nin and close the caller's filter last", async () => {
      const spy = createExecutorSpy(() => ({ product: [] }));

      await createProductsResource(spy.execute).list({
        excludeExternalIds: ["gsm"],
        where: { currency: { _eq: "PLN" } } as never,
      });

      const [call] = spy.callTo("ListProducts");
      expect(call?.document).toContain("_nin: $excludeExternalIds");
      expect(call?.document).toContain("{_and: $and}");
      expect(call?.variables).toMatchObject({
        excludeExternalIds: ["gsm"],
        and: [{ currency: { _eq: "PLN" } }],
      });
    });

    it("should filter out soft-deleted products by default", async () => {
      const spy = createExecutorSpy(() => ({ product: [] }));

      await createProductsResource(spy.execute).list();

      const [call] = spy.callTo("ListProducts");
      expect(call?.document).toContain("deletedAt: {_isNull: $notDeleted}");
      expect(call?.variables).toMatchObject({ notDeleted: true, and: [] });
    });

    it("should drop the deletedAt condition when asked to include deleted", async () => {
      const spy = createExecutorSpy(() => ({ product: [] }));

      await createProductsResource(spy.execute).list({ includeDeleted: true });

      // `null` rather than `false`: Hasura drops a null comparison, and
      // `_isNull: false` would mean "only deleted".
      expect(spy.callTo("ListProducts")[0]?.variables).toMatchObject({ notDeleted: null });
    });

    it("should pass an inclusion list as _in", async () => {
      const spy = createExecutorSpy(() => ({ product: [] }));

      await createProductsResource(spy.execute).list({ externalIds: ["0", "1"] });

      expect(spy.callTo("ListProducts")[0]?.variables).toMatchObject({
        externalIds: ["0", "1"],
      });
    });
  });

  describe("getByExternalId", () => {
    it("should return null for an empty list rather than throwing", async () => {
      const spy = createExecutorSpy(() => ({ product: [] }));

      await expect(
        createProductsResource(spy.execute).getByExternalId("gsm"),
      ).resolves.toBeNull();
    });
  });

  describe("get", () => {
    it("should return null when the product does not exist", async () => {
      const spy = createExecutorSpy(() => ({ productByPk: null }));

      await expect(createProductsResource(spy.execute).get("p1")).resolves.toBeNull();
    });
  });
});

describe("ProductFilter", () => {
  it("should accept a caller filter without the caller reaching for generated types", async () => {
    const spy = createExecutorSpy(() => ({ product: [] }));

    // The regression this pins: `where` was derived through a conditional type
    // over the generated variables, and codegen types a list variable as
    // `Array<T> | T` — so the conditional collapsed to `undefined` and every
    // caller filter was a type error.
    await createProductsResource(spy.execute).list({ where: { id: { _eq: "p1" } } });

    expect(spy.callTo("ListProducts")[0]?.variables).toMatchObject({
      and: [{ id: { _eq: "p1" } }],
    });
  });
});
