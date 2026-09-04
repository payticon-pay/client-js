import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * The part of an order the signature covers. Deliberately wider than
 * `WebhookOrder`: the producer joins these values into a string, so anything
 * that stringifies the same way signs the same way — and a caller checking a
 * fixture should not have to construct a whole order to do it.
 */
export interface SignableOrder {
  id: string;
  status: string;
  price: number | string;
  currency: string;
}

/** The five fields the producer signs, in the order it joins them. */
export const signedFields = (type: string, order: SignableOrder): string =>
  [type, order.id, order.status, order.price, order.currency].join("|");

export const computeWebhookSignature = (
  secret: string,
  type: string,
  order: SignableOrder,
): string =>
  createHmac("sha256", secret).update(signedFields(type, order)).digest("hex");

/**
 * Constant-time comparison. A `===` here leaks, through timing, how many
 * leading characters of a forged signature were right.
 */
export const verifyWebhookSignature = (
  secret: string,
  type: string,
  order: SignableOrder,
  signature: string,
): boolean => {
  const expected = Buffer.from(computeWebhookSignature(secret, type, order), "utf8");
  const actual = Buffer.from(signature, "utf8");

  // `timingSafeEqual` throws on a length mismatch, which would leak the length
  // through an exception instead of through timing.
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
};
