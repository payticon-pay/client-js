import {
  CancelOrderDocument,
  CreateOrderDocument,
  FindOrderByIdOrMerchantIdDocument,
  FindOrderByMerchantIdDocument,
  GetOrderDocument,
  GetOrderPaywallUrlDocument,
  ListOrdersDocument,
  RefundOrderDocument,
  ResendOrderWebhookDocument,
  type CreateOrderInput,
  type ListOrdersQueryVariables,
  type OrderDetailFragment,
  type OrderFieldsFragment,
  type PaywallOptions,
  type RefundFieldsFragment,
  type RefundOrderInput,
} from "../generated/graphql.js";
import { paginate } from "../pagination.js";
import type { GraphqlExecutor, RequestOptions } from "../types.js";
import {
  NEVER_RETRY,
  SAFE_TO_RETRY,
  isUuid,
  withRetryStance,
  type ListAllOptions,
  type ListOptions,
} from "./shared.js";

export interface CreateOrderResult {
  orderId: string;
  paywallUrl: string;
}

export interface IdempotentOrderResult extends CreateOrderResult {
  /** `true` when the order already existed and this call recovered it. */
  reused: boolean;
  /** The recovered order. Absent when the order was created by this call. */
  order?: OrderDetailFragment;
}

export interface ListOrdersOptions extends ListOptions {
  where?: ListOrdersQueryVariables["where"];
  orderBy?: ListOrdersQueryVariables["orderBy"];
}

export interface ListAllOrdersOptions extends ListAllOptions {
  where?: ListOrdersQueryVariables["where"];
  orderBy?: ListOrdersQueryVariables["orderBy"];
}

export const createOrdersResource = (execute: GraphqlExecutor) => {
  const get = async (
    id: string,
    options?: RequestOptions,
  ): Promise<OrderDetailFragment | null> => {
    const { orderByPk } = await execute(GetOrderDocument, { id }, options);
    return orderByPk ?? null;
  };

  const list = async (
    options: ListOrdersOptions = {},
  ): Promise<OrderFieldsFragment[]> => {
    const { where, orderBy, limit, offset, ...request } = options;
    const { order } = await execute(
      ListOrdersDocument,
      { where, orderBy, limit, offset },
      request,
    );
    return order;
  };

  const findByMerchantId = async (
    merchantId: string,
    options?: RequestOptions,
  ): Promise<OrderDetailFragment | null> => {
    const { order } = await execute(
      FindOrderByMerchantIdDocument,
      { merchantId },
      options,
    );
    return order[0] ?? null;
  };

  const paywallUrl = async (
    orderId: string,
    paywall?: PaywallOptions,
    options?: RequestOptions,
  ): Promise<string> => {
    const result = await execute(
      GetOrderPaywallUrlDocument,
      { orderId, paywall },
      options,
    );
    return result.generateOrderPaywallUrl.url;
  };

  const create = async (
    input: CreateOrderInput,
    options?: RequestOptions,
  ): Promise<CreateOrderResult> => {
    const { createOrder } = await execute(
      CreateOrderDocument,
      { input },
      withRetryStance(NEVER_RETRY, options),
    );
    return { orderId: createOrder.orderId, paywallUrl: createOrder.paywallUrl };
  };

  return {
    get,
    list,

    /** Walks every page of the list, one request per page. */
    listAll: (options: ListAllOrdersOptions = {}) => {
      const { pageSize, max, ...rest } = options;
      return paginate<OrderFieldsFragment>(
        ({ limit, offset }) => list({ ...rest, limit, offset }),
        { pageSize, max },
      );
    },

    findByMerchantId,

    /**
     * One order looked up under either identifier. Merchants that started out
     * keying orders by their own record id and later moved to `merchantId` have
     * both conventions in their data, and this answers for both in one query.
     */
    findByIdOrMerchantId: async (
      identifier: string,
      options?: RequestOptions,
    ): Promise<OrderDetailFragment | null> => {
      const { order } = await execute(
        FindOrderByIdOrMerchantIdDocument,
        {
          ids: isUuid(identifier) ? [identifier] : [],
          merchantId: identifier,
        },
        options,
      );
      return order[0] ?? null;
    },

    /**
     * Creates an order. Never retried: a timeout here can mean the order was
     * created and the response was lost, and a second attempt would be a second
     * order. Reach for `createIdempotent` instead of retrying by hand.
     */
    create,

    /**
     * Creates an order, or recovers the one that already exists under this
     * `merchantId`.
     *
     * Recovery runs after **any** failure, not just `ORDER_ALREADY_EXISTS`: a
     * timeout that lands after the server has written the order gives a
     * transport error, never a domain code. If no such order exists the original
     * error is rethrown untouched.
     */
    createIdempotent: async (
      input: CreateOrderInput,
      options?: RequestOptions,
    ): Promise<IdempotentOrderResult> => {
      try {
        const created = await create(input, options);
        return { ...created, reused: false };
      } catch (error) {
        let existing: OrderDetailFragment | null;
        try {
          existing = await findByMerchantId(input.merchantId, options);
        } catch {
          throw error;
        }

        if (!existing) throw error;

        return {
          orderId: existing.id,
          paywallUrl: await paywallUrl(existing.id, undefined, options),
          order: existing,
          reused: true,
        };
      }
    },

    paywallUrl,

    /** Cancelling an already cancelled order is a no-op, so this may be retried. */
    cancel: async (id: string, options?: RequestOptions): Promise<void> => {
      await execute(
        CancelOrderDocument,
        { id },
        withRetryStance(SAFE_TO_RETRY, options),
      );
    },

    /** Never retried: each call moves money back to the customer. */
    refund: async (
      input: RefundOrderInput,
      options?: RequestOptions,
    ): Promise<Array<{ refundId: string; refund?: RefundFieldsFragment | null }>> => {
      const { refundOrder } = await execute(
        RefundOrderDocument,
        { input },
        withRetryStance(NEVER_RETRY, options),
      );
      return refundOrder;
    },

    /** Re-delivers the order webhook. Safe to repeat — the receiver must be idempotent anyway. */
    resendWebhook: async (
      orderId: string,
      options?: RequestOptions,
    ): Promise<string> => {
      const { resendOrderWebhook } = await execute(
        ResendOrderWebhookDocument,
        { orderId },
        withRetryStance(SAFE_TO_RETRY, options),
      );
      return resendOrderWebhook.orderId;
    },
  };
};

export type OrdersResource = ReturnType<typeof createOrdersResource>;
