import type { WebhookOrderFragment } from "../generated/graphql.js";

/**
 * The order as the producer sends it — derived from a fragment that mirrors the
 * producer's own, not written by hand. The type this replaces in `novipay/core`
 * declared four fields the producer never sends and omitted the ones it does.
 */
export type WebhookOrder = WebhookOrderFragment;

export type WebhookPayment = WebhookOrder["payments"][number];
export type WebhookRefund = WebhookPayment["refunds"][number];
export type WebhookCustomer = NonNullable<WebhookOrder["customer"]>;

/** The whole body Paycadoo POSTs to your webhook URL. */
export interface WebhookEvent {
  type: "order";
  order: WebhookOrder;
  /** `HMAC_SHA256` over five fields of the order, hex-encoded. */
  signature: string;
}

export type WebhookParseFailureReason =
  /** The body was not JSON at all. */
  | "invalid_json"
  /** JSON, but not a webhook event: no `order`, or no `signature`. */
  | "malformed"
  /** Well-formed, but the signature does not match the secret. */
  | "bad_signature";

export type WebhookParseResult =
  | { ok: true; event: WebhookEvent }
  | { ok: false; reason: WebhookParseFailureReason; message: string };

/**
 * What hookticon POSTs to `${webhookUrl}/fail` once it has given up delivering.
 *
 * **Unsigned.** Never act on it — observe it. For projects on the `NO_TIMEOUT`
 * strategy there is exactly one delivery attempt, which makes this the only
 * failure signal that exists at all.
 */
export interface WebhookFailNotification {
  webhookId: string | undefined;
  url: string | undefined;
  status: string | undefined;
  tries: number | undefined;
  timeoutStrategy: string | undefined;
  /** Recovered from the hex-encoded original body, when it can be read. */
  orderId: string | undefined;
  /** The original event, when the hex body decoded into one. */
  event: WebhookEvent | undefined;
}

export type FailNotificationParseResult =
  | { ok: true; notification: WebhookFailNotification }
  | { ok: false; reason: "invalid_json" | "malformed"; message: string };
