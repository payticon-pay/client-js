import { describe, expect, it } from "vitest";
import { createExecutorSpy } from "../testing/executorSpy.js";
import { createSubscriptionsResource } from "./subscriptions.js";

const ITEM_ID = "11112222-3333-4444-8555-666677778888";

const anItem = (overrides: Record<string, unknown> = {}) => ({
  id: ITEM_ID,
  externalId: "device-1",
  startsAt: "2026-01-01T00:00:00Z",
  endsAt: null,
  pauses: [],
  ...overrides,
});

describe("subscriptions", () => {
  describe("items.findActive", () => {
    it("should ask for an item started in the past and not yet ended, with its future pauses", async () => {
      const spy = createExecutorSpy(() => ({
        subscriptionItem: [anItem({ pauses: [{ id: "p1" }] })],
      }));

      const item = await createSubscriptionsResource(spy.execute).items.findActive({
        externalId: "device-1",
      });

      const [call] = spy.callTo("FindActiveSubscriptionItem");
      expect(call?.document).toContain('startsAt: {_lt: "now()"}');
      expect(call?.document).toContain('_or: [{endsAt: {_isNull: true}}, {endsAt: {_gt: "now()"}}]');
      expect(call?.document).toContain('pauses(where: {startsAt: {_gt: "now()"}}');
      expect(call?.variables).toEqual({ and: [{ externalId: { _eq: "device-1" } }] });
      expect(item?.pauses).toEqual([{ id: "p1" }]);
    });

    it("should return null when only a future item exists", async () => {
      const spy = createExecutorSpy(() => ({ subscriptionItem: [] }));

      await expect(
        createSubscriptionsResource(spy.execute).items.findActive({ externalId: "device-1" }),
      ).resolves.toBeNull();
    });

    it("should close the caller's own filter last", async () => {
      const spy = createExecutorSpy(() => ({ subscriptionItem: [] }));

      await createSubscriptionsResource(spy.execute).items.findActive({
        externalId: "device-1",
        subscriptionId: "sub-1",
        where: { externalProductId: { _neq: "gsm" } } as never,
      });

      expect(spy.callTo("FindActiveSubscriptionItem")[0]?.variables).toEqual({
        and: [
          { externalId: { _eq: "device-1" } },
          { subscriptionId: { _eq: "sub-1" } },
          { externalProductId: { _neq: "gsm" } },
        ],
      });
    });
  });

  describe("items.findScheduled", () => {
    it("should ask for an item that has not started yet", async () => {
      const spy = createExecutorSpy(() => ({ subscriptionItem: [anItem()] }));

      await createSubscriptionsResource(spy.execute).items.findScheduled({
        externalId: "device-1",
      });

      expect(spy.callTo("FindScheduledSubscriptionItem")[0]?.document).toContain(
        'startsAt: {_gt: "now()"}',
      );
    });
  });

  describe("items.endMany", () => {
    it("should fall back to the document's own now() literal and report affected rows", async () => {
      const spy = createExecutorSpy(() => ({ updateSubscriptionItem: { affectedRows: 3 } }));

      const affected = await createSubscriptionsResource(spy.execute).items.endMany({
        externalId: { _eq: "device-1" },
      } as never);

      const [call] = spy.callTo("EndSubscriptionItems");
      expect(call?.document).toContain('$endsAt: timestamptz = "now()"');
      expect(call?.variables).toEqual({ where: { externalId: { _eq: "device-1" } } });
      expect(call?.variables).not.toHaveProperty("endsAt");
      expect(affected).toBe(3);
    });

    it("should use an explicit date when one is given", async () => {
      const spy = createExecutorSpy(() => ({ updateSubscriptionItem: { affectedRows: 1 } }));

      await createSubscriptionsResource(spy.execute).items.endMany(
        { id: { _eq: ITEM_ID } } as never,
        "2026-12-31T23:59:59Z",
      );

      expect(spy.callTo("EndSubscriptionItems")[0]?.variables).toMatchObject({
        endsAt: "2026-12-31T23:59:59Z",
      });
    });

    it("should be an UPDATE of endsAt, never a DELETE", async () => {
      const spy = createExecutorSpy(() => ({ updateSubscriptionItem: { affectedRows: 0 } }));

      await createSubscriptionsResource(spy.execute).items.endMany({} as never);

      const [call] = spy.callTo("EndSubscriptionItems");
      expect(call?.document).toContain("updateSubscriptionItem");
      expect(call?.document).not.toContain("deleteSubscriptionItem");
    });
  });

  describe("calculatePrice", () => {
    it("should return the per-item breakdown alongside the sum", async () => {
      const spy = createExecutorSpy(() => ({
        calculateSubscriptionPrice: { sum: 4_900, items: [{ id: ITEM_ID, price: 4_900 }] },
      }));

      const price = await createSubscriptionsResource(spy.execute).calculatePrice({
        interval: "MONTH",
      } as never);

      expect(price).toEqual({ sum: 4_900, items: [{ id: ITEM_ID, price: 4_900 }] });
    });
  });

  describe("retry stance", () => {
    it("should allow retrying the two writes that only set a date", async () => {
      const spy = createExecutorSpy(() => ({
        updateSubscriptionItemByPk: anItem(),
        updateSubscriptionItem: { affectedRows: 1 },
      }));
      const items = createSubscriptionsResource(spy.execute).items;

      await items.setEndsAt(ITEM_ID, "2026-12-31T00:00:00Z");
      await items.endMany({} as never);

      expect(spy.callTo("SetSubscriptionItemEndsAt")[0]?.options).toMatchObject({
        idempotent: true,
      });
      expect(spy.callTo("EndSubscriptionItems")[0]?.options).toMatchObject({ idempotent: true });
    });

    it("should never retry an insert", async () => {
      const spy = createExecutorSpy(() => ({ insertSubscriptionItemOne: anItem() }));

      await createSubscriptionsResource(spy.execute).items.insert({} as never);

      expect(spy.callTo("InsertSubscriptionItem")[0]?.options).toMatchObject({
        idempotent: false,
      });
    });
  });
});
