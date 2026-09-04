import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  computeWebhookSignature,
  signedFields,
  verifyWebhookSignature,
} from "./signature.js";

const SECRET = "project-secret";
const ORDER = {
  id: "3f2b8c1e-4d5a-4f8b-9c2d-1a2b3c4d5e6f",
  status: "PAID",
  price: 12_900,
  currency: "PLN",
};

describe("signedFields", () => {
  it("should join exactly the five fields the producer joins", () => {
    expect(signedFields("order", ORDER)).toBe(
      "order|3f2b8c1e-4d5a-4f8b-9c2d-1a2b3c4d5e6f|PAID|12900|PLN",
    );
  });

  it("should keep a zero price as a zero, not drop it", () => {
    expect(signedFields("order", { ...ORDER, price: 0 })).toContain("|0|PLN");
  });
});

describe("computeWebhookSignature", () => {
  it("should match a signature computed the way the producer computes it", () => {
    const expected = createHmac("sha256", SECRET)
      .update("order|3f2b8c1e-4d5a-4f8b-9c2d-1a2b3c4d5e6f|PAID|12900|PLN")
      .digest("hex");

    expect(computeWebhookSignature(SECRET, "order", ORDER)).toBe(expected);
  });
});

describe("verifyWebhookSignature", () => {
  it("should accept the signature it computes", () => {
    const signature = computeWebhookSignature(SECRET, "order", ORDER);

    expect(verifyWebhookSignature(SECRET, "order", ORDER, signature)).toBe(true);
  });

  it("should reject a signature of the wrong length instead of throwing", () => {
    expect(verifyWebhookSignature(SECRET, "order", ORDER, "short")).toBe(false);
    expect(verifyWebhookSignature(SECRET, "order", ORDER, "")).toBe(false);
  });

  it("should reject a signature over different field values", () => {
    const signature = computeWebhookSignature(SECRET, "order", ORDER);

    expect(
      verifyWebhookSignature(SECRET, "order", { ...ORDER, status: "REFUNDED" }, signature),
    ).toBe(false);
  });
});
