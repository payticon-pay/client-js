import { verifyWebhookSignature } from "./signature.js";
import type {
  FailNotificationParseResult,
  WebhookEvent,
  WebhookFailNotification,
  WebhookParseResult,
} from "./types.js";

/** Anything a framework might hand you as the request body. */
export type WebhookBody = string | Buffer | Uint8Array | object;

export interface WebhookVerifierOptions {
  /** The project's secret key, as configured in Paycadoo. */
  secret: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toJson = (
  body: WebhookBody,
): { ok: true; value: unknown } | { ok: false; message: string } => {
  if (typeof body === "string" || body instanceof Uint8Array) {
    const text = typeof body === "string" ? body : Buffer.from(body).toString("utf8");
    try {
      return { ok: true, value: JSON.parse(text) };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof Error ? error.message : "Body is not JSON",
      };
    }
  }
  return { ok: true, value: body };
};

/**
 * Verifies and parses a webhook delivery.
 *
 * Returns a result rather than throwing, unlike the rest of this package: a
 * broken webhook is an expected outcome, and the receiver has to answer `200`
 * either way. A `5xx` makes hookticon redeliver a permanently broken payload
 * for days.
 *
 * The signature covers **field values**, not the raw bytes, so an already-parsed
 * body is just as valid as the raw string — you do not need raw-body plumbing in
 * your framework.
 */
export const parseWebhookEvent = (
  body: WebhookBody,
  { secret }: WebhookVerifierOptions,
): WebhookParseResult => {
  const parsed = toJson(body);
  if (!parsed.ok) return { ok: false, reason: "invalid_json", message: parsed.message };

  const payload = parsed.value;
  if (!isRecord(payload)) {
    return { ok: false, reason: "malformed", message: "Body is not an object" };
  }

  const { order, signature, type } = payload;
  if (!isRecord(order)) {
    return { ok: false, reason: "malformed", message: "Missing `order`" };
  }
  if (typeof signature !== "string" || signature === "") {
    return { ok: false, reason: "malformed", message: "Missing `signature`" };
  }
  if (typeof order["id"] !== "string" || typeof order["status"] !== "string") {
    return { ok: false, reason: "malformed", message: "Order is missing `id` or `status`" };
  }

  const eventType = typeof type === "string" ? type : "order";
  const signable = order as unknown as WebhookEvent["order"];

  if (!verifyWebhookSignature(secret, eventType, signable, signature)) {
    return { ok: false, reason: "bad_signature", message: "Signature does not match" };
  }

  return {
    ok: true,
    event: { type: "order", order: signable, signature },
  };
};

/** Closes over the secret so a route handler carries it once. */
export const createWebhookVerifier = (options: WebhookVerifierOptions) => ({
  parse: (body: WebhookBody): WebhookParseResult => parseWebhookEvent(body, options),
});

export type WebhookVerifier = ReturnType<typeof createWebhookVerifier>;

/**
 * The only stable identity a delivery has.
 *
 * One state transition is delivered **at least twice** — three Hasura triggers
 * (`payment`, `order`, `refund`) all call the same `sendOrderWebhook(orderId)`,
 * which re-reads the order and signs the same five fields. The two deliveries
 * are byte-for-byte identical: no nonce, no timestamp, no delivery id. So the
 * SDK cannot deduplicate for you; it can only hand you the key to deduplicate
 * on. Claim it with one atomic write of your own before doing anything with
 * side effects.
 */
export const eventKey = (event: {
  order: { id: string; status: string };
}): string => `${event.order.id}:${event.order.status}`;

const decodeHexBody = (value: unknown): unknown => {
  if (typeof value !== "string" || value === "") return undefined;
  try {
    const text = Buffer.from(value, "hex").toString("utf8");
    return text === "" ? undefined : JSON.parse(text);
  } catch {
    // Truncated or non-hex bodies are expected here; the notification is still
    // worth surfacing without the order it referred to.
    return undefined;
  }
};

const asString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

/**
 * Parses hookticon's give-up notification, POSTed to `${webhookUrl}/fail`.
 *
 * **It is not signed** — treat it as an observation, never as an instruction.
 * `webhook.body` is the hex of the original delivery, so the order it referred
 * to can usually be recovered; when it cannot, the rest is still returned.
 */
export const parseFailNotification = (
  body: WebhookBody,
): FailNotificationParseResult => {
  const parsed = toJson(body);
  if (!parsed.ok) return { ok: false, reason: "invalid_json", message: parsed.message };

  const payload = parsed.value;
  if (!isRecord(payload) || !isRecord(payload["webhook"])) {
    return { ok: false, reason: "malformed", message: "Missing `webhook`" };
  }

  const webhook = payload["webhook"];
  const original = decodeHexBody(webhook["body"]);
  const order = isRecord(original) && isRecord(original["order"]) ? original["order"] : undefined;

  const notification: WebhookFailNotification = {
    webhookId: asString(webhook["id"]),
    url: asString(webhook["url"]),
    status: asString(webhook["status"]),
    tries: typeof webhook["tries"] === "number" ? webhook["tries"] : undefined,
    timeoutStrategy: asString(webhook["timeoutStrategy"]),
    orderId: order ? asString(order["id"]) : undefined,
    event: order ? (original as WebhookEvent) : undefined,
  };

  return { ok: true, notification };
};
