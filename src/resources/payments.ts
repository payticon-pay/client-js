import {
  CreateManualPaymentDocument,
  CreatePaymentDocument,
  ForceRefreshPaymentDocument,
  GetPaymentDocument,
  GetPaymentParametersDocument,
  ListPaymentsByOrderDocument,
  ListPaymentsDocument,
  RefundPaymentDocument,
  type CreateManualPaymentInput,
  type CreatePaymentInput,
  type GetPaymentParametersInput,
  type ListPaymentsQueryVariables,
  type PaymentFieldsFragment,
  type PaymentWithRefundsFragment,
  type RefundFieldsFragment,
  type RefundPaymentInput,
} from "../generated/graphql.js";
import type { GraphqlExecutor, RequestOptions } from "../types.js";
import {
  NEVER_RETRY,
  SAFE_TO_RETRY,
  withRetryStance,
  type ListOptions,
} from "./shared.js";

export interface ListPaymentsOptions extends ListOptions {
  where?: ListPaymentsQueryVariables["where"];
  orderBy?: ListPaymentsQueryVariables["orderBy"];
}

export interface CreatePaymentResult {
  paymentId: string;
  redirectUrl?: string | null;
  redirectIframeAllowed?: boolean | null;
  payment?: PaymentFieldsFragment | null;
}

export const createPaymentsResource = (execute: GraphqlExecutor) => ({
  get: async (
    id: string,
    options?: RequestOptions,
  ): Promise<PaymentWithRefundsFragment | null> => {
    const { paymentByPk } = await execute(GetPaymentDocument, { id }, options);
    return paymentByPk ?? null;
  },

  list: async (
    options: ListPaymentsOptions = {},
  ): Promise<PaymentFieldsFragment[]> => {
    const { where, orderBy, limit, offset, ...request } = options;
    const { payment } = await execute(
      ListPaymentsDocument,
      { where, orderBy, limit, offset },
      request,
    );
    return payment;
  },

  /**
   * Every payment attempt on one order, oldest first. This is also how you
   * reconcile after a timed-out `create`: look here before retrying by hand.
   */
  listByOrder: async (
    orderId: string,
    options: ListOptions = {},
  ): Promise<PaymentWithRefundsFragment[]> => {
    const { limit, offset, ...request } = options;
    const { payment } = await execute(
      ListPaymentsByOrderDocument,
      { orderId, limit, offset },
      request,
    );
    return payment;
  },

  /**
   * Takes a payment.
   *
   * **This mutation is never retried by the SDK.** If it times out, the charge
   * may still have gone through — reconcile with `payments.listByOrder(orderId)`
   * before you attempt it again.
   */
  create: async (
    input: CreatePaymentInput,
    options?: RequestOptions,
  ): Promise<CreatePaymentResult> => {
    const { createPayment } = await execute(
      CreatePaymentDocument,
      { input },
      withRetryStance(NEVER_RETRY, options),
    );
    return createPayment;
  },

  /**
   * Records a payment taken outside Paycadoo — a bank transfer that landed on
   * your own account, say. Never retried, for the same reason as `create`:
   * repeating it books the money twice.
   */
  createManual: async (
    input: CreateManualPaymentInput,
    options?: RequestOptions,
  ): Promise<{ paymentId: string; payment?: PaymentFieldsFragment | null }> => {
    const { createManualPayment } = await execute(
      CreateManualPaymentDocument,
      { input },
      withRetryStance(NEVER_RETRY, options),
    );
    return createManualPayment;
  },

  /** Asks Paycadoo to re-read the payment from the provider. Read-only, so retryable. */
  forceRefresh: async (
    paymentId: string,
    options?: RequestOptions,
  ): Promise<string> => {
    const { forceRefreshPayment } = await execute(
      ForceRefreshPaymentDocument,
      { paymentId },
      withRetryStance(SAFE_TO_RETRY, options),
    );
    return forceRefreshPayment.paymentId;
  },

  /** Never retried: each call moves money back to the customer. */
  refund: async (
    input: RefundPaymentInput,
    options?: RequestOptions,
  ): Promise<{ refundId: string; refund?: RefundFieldsFragment | null }> => {
    const { refundPayment } = await execute(
      RefundPaymentDocument,
      { input },
      withRetryStance(NEVER_RETRY, options),
    );
    return refundPayment;
  },

  /**
   * Provider-specific parameters for a payment method — shape depends on the
   * method, so it arrives as `unknown` rather than `any`. Narrow it yourself.
   */
  parameters: async (
    input: GetPaymentParametersInput,
    options?: RequestOptions,
  ): Promise<unknown> => {
    const { getPaymentParameters } = await execute(
      GetPaymentParametersDocument,
      { input },
      options,
    );
    return getPaymentParameters.parameters;
  },
});

export type PaymentsResource = ReturnType<typeof createPaymentsResource>;
