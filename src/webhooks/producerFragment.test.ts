import { describe, expect, it } from "vitest";
import { WebhookOrderFragmentDoc } from "../generated/graphql.js";

/**
 * A verbatim copy of the producer's fragment
 * (`paycadoo/backend`, `src/data/db/graphql/webhooks.graphql`, `OrderForWebhook`).
 *
 * The webhook payload type in this package is generated from our own mirror of
 * it. This test is the tripwire between the two: when the producer adds or drops
 * a field, this is the assertion that fails, and updating it is the deliberate
 * act of accepting the change — rather than discovering it as a wrong type in a
 * consumer months later.
 */
const PRODUCER_FRAGMENT = `
fragment OrderForWebhook on Order {
  id
  status
  projectId
  createdAt
  customerId
  currentPrice
  paidAmount
  remainingAmount
  refundedAmount
  currency
  title
  webhookUrl
  price
  merchantId
  metadata
  returnUrl
  customer {
    id
    email
    firstName
    lastName
  }
  payments {
    id
    status
    createdAt
    amount
    currency
    rejectReason
    externalId
    paymentMethodId
    redirectUrl
    error
    errorMessage
    ip
    userAgentHeader
    acceptHeader
    refunds {
      id
      status
      merchantId
      externalId
      amount
      createdAt
      reason
    }
  }
}
`;

/** Dotted paths of every field a fragment selects, ignoring formatting. */
const fieldPaths = (document: string): string[] => {
  const paths: string[] = [];
  const stack: string[] = [];

  for (const raw of document.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#") || line.startsWith("fragment")) continue;

    if (line === "}") {
      stack.pop();
      continue;
    }

    const [name] = line.split(/[\s({]/, 1);
    if (!name) continue;

    if (line.endsWith("{")) {
      stack.push(name);
      paths.push([...stack].join("."));
    } else {
      paths.push([...stack, name].join("."));
    }
  }

  return paths.sort();
};

describe("webhook payload type", () => {
  it("should select exactly the fields the producer sends", () => {
    expect(fieldPaths(String(WebhookOrderFragmentDoc))).toEqual(
      fieldPaths(PRODUCER_FRAGMENT),
    );
  });

  it("should not carry the four fields the old novipay type invented", () => {
    const document = String(WebhookOrderFragmentDoc);

    for (const invented of [
      "defaultReturnUrl",
      "kycConfirmationOrderId",
      "fraudScore",
      "stripeVerificationSessionId",
    ]) {
      expect(document).not.toContain(invented);
    }
  });

  it("should carry the fields the old novipay type omitted", () => {
    const paths = fieldPaths(String(WebhookOrderFragmentDoc));

    expect(paths).toContain("payments");
    expect(paths).toContain("payments.refunds");
    expect(paths).toContain("customer.email");
  });
});
