import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  createWebhookVerifier,
  eventKey,
  parseFailNotification,
  parseWebhookEvent,
} from "./parse.js";

const SECRET = "project-secret";
const ORDER_ID = "3f2b8c1e-4d5a-4f8b-9c2d-1a2b3c4d5e6f";

const sign = (order: { id: string; status: string; price: unknown; currency: string }) =>
  createHmac("sha256", SECRET)
    .update(["order", order.id, order.status, order.price, order.currency].join("|"))
    .digest("hex");

const anEvent = (overrides: Record<string, unknown> = {}) => {
  const order = {
    id: ORDER_ID,
    status: "PAID",
    price: 12_900,
    currency: "PLN",
    projectId: "p1",
    customerId: "c1",
    payments: [],
    ...overrides,
  };
  return { type: "order", order, signature: sign(order) };
};

describe("parseWebhookEvent", () => {
  it("should accept a delivery signed with the project secret", () => {
    const result = parseWebhookEvent(JSON.stringify(anEvent()), { secret: SECRET });

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.event.order.id).toBe(ORDER_ID);
  });

  it("should reject a signature with one character flipped, without throwing", () => {
    const event = anEvent();
    const tampered = {
      ...event,
      signature: `${event.signature.slice(0, -1)}${event.signature.at(-1) === "a" ? "b" : "a"}`,
    };

    const result = parseWebhookEvent(JSON.stringify(tampered), { secret: SECRET });

    expect(result).toEqual({
      ok: false,
      reason: "bad_signature",
      message: "Signature does not match",
    });
  });

  it("should give the same answer for a string, a Buffer and an already-parsed object", () => {
    const event = anEvent();
    const asString = parseWebhookEvent(JSON.stringify(event), { secret: SECRET });
    const asBuffer = parseWebhookEvent(Buffer.from(JSON.stringify(event)), { secret: SECRET });
    const asObject = parseWebhookEvent(event, { secret: SECRET });

    expect(asString).toEqual(asBuffer);
    expect(asString).toEqual(asObject);
    expect(asString.ok).toBe(true);
  });

  it("should report invalid_json for a body that is not JSON", () => {
    const result = parseWebhookEvent("<html>502 Bad Gateway</html>", { secret: SECRET });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("invalid_json");
  });

  it.each([
    ["no order", { signature: "abc" }],
    ["no signature", { order: { id: ORDER_ID, status: "PAID" } }],
    ["order without id", { order: { status: "PAID" }, signature: "abc" }],
    ["not an object", []],
  ])("should report malformed for %s", (_name, body) => {
    const result = parseWebhookEvent(JSON.stringify(body), { secret: SECRET });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("malformed");
  });

  it.each([
    ["zero", 0],
    ["a large integer", 9_007_199_254_740_991],
    ["a value the producer sent as a string", "12900"],
  ])("should sign %s exactly as the producer does", (_name, price) => {
    const result = parseWebhookEvent(JSON.stringify(anEvent({ price })), { secret: SECRET });

    expect(result.ok).toBe(true);
  });

  it("should reject a delivery signed with a different secret", () => {
    const result = parseWebhookEvent(JSON.stringify(anEvent()), { secret: "wrong" });

    expect(result.ok).toBe(false);
  });
});

describe("createWebhookVerifier", () => {
  it("should carry the secret so the handler does not", () => {
    const verifier = createWebhookVerifier({ secret: SECRET });

    expect(verifier.parse(anEvent()).ok).toBe(true);
  });
});

describe("eventKey", () => {
  it("should give both deliveries of one transition the same key", () => {
    const first = anEvent();
    const second = anEvent();

    expect(eventKey(first)).toBe(eventKey(second));
    expect(eventKey(first)).toBe(`${ORDER_ID}:PAID`);
  });

  it("should give a different key to a different transition", () => {
    expect(eventKey(anEvent())).not.toBe(eventKey(anEvent({ status: "REFUNDED" })));
  });
});

describe("parseFailNotification", () => {
  const notification = (body: string | null) => ({
    webhook: {
      id: "wh-1",
      status: "FAIL",
      url: "https://merchant.test/hook",
      tries: 7,
      timeoutStrategy: "NO_TIMEOUT",
      body,
    },
  });

  it("should recover the order id from the hex body", () => {
    const hex = Buffer.from(JSON.stringify(anEvent())).toString("hex");

    const result = parseFailNotification(JSON.stringify(notification(hex)));

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.notification.orderId).toBe(ORDER_ID);
      expect(result.notification.webhookId).toBe("wh-1");
      expect(result.notification.tries).toBe(7);
    }
  });

  it.each([
    ["a truncated hex body", Buffer.from(JSON.stringify(anEvent())).toString("hex").slice(0, 40)],
    ["a body that is not hex", "not-hex-at-all"],
    ["a null body", null],
  ])("should stay correct without an order id for %s", (_name, body) => {
    const result = parseFailNotification(JSON.stringify(notification(body)));

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.notification.orderId).toBeUndefined();
      expect(result.notification.webhookId).toBe("wh-1");
    }
  });

  it("should report malformed when there is no webhook object", () => {
    const result = parseFailNotification(JSON.stringify({ nope: true }));

    expect(result).toMatchObject({ ok: false, reason: "malformed" });
  });

  it("should report invalid_json for a body that is not JSON", () => {
    expect(parseFailNotification("nope")).toMatchObject({
      ok: false,
      reason: "invalid_json",
    });
  });
});
