import {
  ForceRefreshRefundDocument,
  GetRefundDocument,
  ListRefundsByPaymentDocument,
  ListRefundsDocument,
  type ListRefundsQueryVariables,
  type RefundFieldsFragment,
} from "../generated/graphql.js";
import type { GraphqlExecutor, RequestOptions } from "../types.js";
import { SAFE_TO_RETRY, withRetryStance, type ListOptions } from "./shared.js";

export interface ListRefundsOptions extends ListOptions {
  where?: ListRefundsQueryVariables["where"];
  orderBy?: ListRefundsQueryVariables["orderBy"];
}

export const createRefundsResource = (execute: GraphqlExecutor) => ({
  get: async (
    id: string,
    options?: RequestOptions,
  ): Promise<RefundFieldsFragment | null> => {
    const { refundByPk } = await execute(GetRefundDocument, { id }, options);
    return refundByPk ?? null;
  },

  list: async (
    options: ListRefundsOptions = {},
  ): Promise<RefundFieldsFragment[]> => {
    const { where, orderBy, limit, offset, ...request } = options;
    const { refund } = await execute(
      ListRefundsDocument,
      { where, orderBy, limit, offset },
      request,
    );
    return refund;
  },

  listByPayment: async (
    paymentId: string,
    options: ListOptions = {},
  ): Promise<RefundFieldsFragment[]> => {
    const { limit, offset, ...request } = options;
    const { refund } = await execute(
      ListRefundsByPaymentDocument,
      { paymentId, limit, offset },
      request,
    );
    return refund;
  },

  /** Asks Paycadoo to re-read the refund from the provider. Read-only, so retryable. */
  forceRefresh: async (
    refundId: string,
    options?: RequestOptions,
  ): Promise<string> => {
    const { forceRefreshRefund } = await execute(
      ForceRefreshRefundDocument,
      { refundId },
      withRetryStance(SAFE_TO_RETRY, options),
    );
    return forceRefreshRefund.refundId;
  },
});

export type RefundsResource = ReturnType<typeof createRefundsResource>;
