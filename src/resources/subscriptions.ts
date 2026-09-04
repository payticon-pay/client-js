import {
  CalculateSubscriptionPriceDocument,
  CreateSubscriptionDocument,
  DeleteSubscriptionItemPauseDocument,
  EditSubscriptionItemDocument,
  EndSubscriptionItemsDocument,
  FindActiveSubscriptionItemDocument,
  FindScheduledSubscriptionItemDocument,
  GetSubscriptionDocument,
  GetSubscriptionItemDocument,
  GetSubscriptionUrlDocument,
  InsertSubscriptionItemDocument,
  InsertSubscriptionItemPauseDocument,
  ListSubscriptionItemPausesDocument,
  ListSubscriptionItemsDocument,
  ListSubscriptionsDocument,
  SetSubscriptionItemEndsAtDocument,
  UpdateSubscriptionItemPricesByProductDocument,
  type CalculateSubscriptionPriceInput,
  type CalculateSubscriptionPriceQuery,
  type FindActiveSubscriptionItemQuery,
  type GetSubscriptionItemQuery,
  type GetSubscriptionQuery,
  type ListSubscriptionItemPausesQueryVariables,
  type ListSubscriptionItemsQueryVariables,
  type ListSubscriptionsQueryVariables,
  type SubscriptionFieldsFragment,
  type SubscriptionInsertInput,
  type SubscriptionItemFieldsFragment,
  type SubscriptionItemInsertInput,
  type SubscriptionItemPauseFieldsFragment,
  type SubscriptionItemPauseInsertInput,
  type UpdateSubscriptionItemSubscriptionitemsetinput,
} from "../generated/graphql.js";
import { paginate } from "../pagination.js";
import type { GraphqlExecutor, RequestOptions } from "../types.js";
import {
  NEVER_RETRY,
  SAFE_TO_RETRY,
  withRetryStance,
  type ListAllOptions,
  type ListOptions,
} from "./shared.js";

type SubscriptionItemBoolExp = ListSubscriptionItemsQueryVariables["where"];

export type SubscriptionItemWithPauses = NonNullable<
  FindActiveSubscriptionItemQuery["subscriptionItem"][number]
>;
export type SubscriptionItemDetail = NonNullable<
  GetSubscriptionItemQuery["subscriptionItemByPk"]
>;
export type SubscriptionDetail = NonNullable<GetSubscriptionQuery["SubscriptionByPk"]>;
export type SubscriptionPrice = CalculateSubscriptionPriceQuery["calculateSubscriptionPrice"];

export interface ListSubscriptionsOptions extends ListOptions {
  where?: ListSubscriptionsQueryVariables["where"];
  orderBy?: ListSubscriptionsQueryVariables["orderBy"];
}

export interface ListSubscriptionItemsOptions extends ListOptions {
  where?: SubscriptionItemBoolExp;
  orderBy?: ListSubscriptionItemsQueryVariables["orderBy"];
}

export interface ListAllSubscriptionItemsOptions extends ListAllOptions {
  where?: SubscriptionItemBoolExp;
  orderBy?: ListSubscriptionItemsQueryVariables["orderBy"];
}

/** Which item to find. `externalId` is your own key on the item. */
export interface FindSubscriptionItemOptions extends RequestOptions {
  externalId?: string;
  subscriptionId?: string;
  /** Extra Hasura filter, applied last. */
  where?: SubscriptionItemBoolExp;
}

export interface ListPausesOptions extends ListOptions {
  where?: ListSubscriptionItemPausesQueryVariables["where"];
  orderBy?: ListSubscriptionItemPausesQueryVariables["orderBy"];
}

const toFilters = (options: FindSubscriptionItemOptions) => {
  const filters: NonNullable<SubscriptionItemBoolExp>[] = [];
  if (options.externalId !== undefined) {
    filters.push({ externalId: { _eq: options.externalId } });
  }
  if (options.subscriptionId !== undefined) {
    filters.push({ subscriptionId: { _eq: options.subscriptionId } });
  }
  if (options.where) filters.push(options.where);
  return filters;
};

const createPausesResource = (execute: GraphqlExecutor) => ({
  list: async (
    options: ListPausesOptions = {},
  ): Promise<SubscriptionItemPauseFieldsFragment[]> => {
    const { where, orderBy, limit, offset, ...request } = options;
    const { subscriptionItemPause } = await execute(
      ListSubscriptionItemPausesDocument,
      { where, orderBy, limit, offset },
      request,
    );
    return subscriptionItemPause;
  },

  /** Never retried: a repeated insert is a second pause on the same window. */
  insert: async (
    object: SubscriptionItemPauseInsertInput,
    options?: RequestOptions,
  ): Promise<SubscriptionItemPauseFieldsFragment | null> => {
    const { insertSubscriptionItemPauseOne } = await execute(
      InsertSubscriptionItemPauseDocument,
      { object },
      withRetryStance(NEVER_RETRY, options),
    );
    return insertSubscriptionItemPauseOne ?? null;
  },

  /** Deleting an already deleted pause is a no-op, so this may be retried. */
  delete: async (
    id: string,
    options?: RequestOptions,
  ): Promise<SubscriptionItemPauseFieldsFragment | null> => {
    const { deleteSubscriptionItemPauseByPk } = await execute(
      DeleteSubscriptionItemPauseDocument,
      { id },
      withRetryStance(SAFE_TO_RETRY, options),
    );
    return deleteSubscriptionItemPauseByPk ?? null;
  },
});

const createItemsResource = (execute: GraphqlExecutor) => {
  const list = async (
    options: ListSubscriptionItemsOptions = {},
  ): Promise<SubscriptionItemFieldsFragment[]> => {
    const { where, orderBy, limit, offset, ...request } = options;
    const { subscriptionItem } = await execute(
      ListSubscriptionItemsDocument,
      { where, orderBy, limit, offset },
      request,
    );
    return subscriptionItem;
  };

  return {
    get: async (
      id: string,
      options?: RequestOptions,
    ): Promise<SubscriptionItemDetail | null> => {
      const { subscriptionItemByPk } = await execute(
        GetSubscriptionItemDocument,
        { id },
        options,
      );
      return subscriptionItemByPk ?? null;
    },

    list,

    listAll: (options: ListAllSubscriptionItemsOptions = {}) => {
      const { pageSize, max, ...rest } = options;
      return paginate<SubscriptionItemFieldsFragment>(
        ({ limit, offset }) => list({ ...rest, limit, offset }),
        { pageSize, max },
      );
    },

    /**
     * The item running right now — started in the past, not yet ended — together
     * with its future pauses. `null` when there is none.
     *
     * "Now" is Postgres's, not the caller's: the document compares against the
     * literal `"now()"`, so a client with a skewed clock cannot disagree with
     * the server about whether a subscription is running.
     */
    findActive: async (
      options: FindSubscriptionItemOptions = {},
    ): Promise<SubscriptionItemWithPauses | null> => {
      const { externalId, subscriptionId, where, ...request } = options;
      const { subscriptionItem } = await execute(
        FindActiveSubscriptionItemDocument,
        { and: toFilters({ externalId, subscriptionId, where }) },
        request,
      );
      return subscriptionItem[0] ?? null;
    },

    /** The item that has not started yet. `null` when there is none. */
    findScheduled: async (
      options: FindSubscriptionItemOptions = {},
    ): Promise<SubscriptionItemWithPauses | null> => {
      const { externalId, subscriptionId, where, ...request } = options;
      const { subscriptionItem } = await execute(
        FindScheduledSubscriptionItemDocument,
        { and: toFilters({ externalId, subscriptionId, where }) },
        request,
      );
      return subscriptionItem[0] ?? null;
    },

    /** Never retried: a repeated insert is a second billable item. */
    insert: async (
      object: SubscriptionItemInsertInput,
      options?: RequestOptions,
    ): Promise<SubscriptionItemDetail | null> => {
      const { insertSubscriptionItemOne } = await execute(
        InsertSubscriptionItemDocument,
        { object },
        withRetryStance(NEVER_RETRY, options),
      );
      return insertSubscriptionItemOne ?? null;
    },

    /**
     * Sets one item's end date. Writing the same value twice lands in the same
     * state, so this may be retried.
     */
    setEndsAt: async (
      id: string,
      endsAt: string | null,
      options?: RequestOptions,
    ): Promise<SubscriptionItemDetail | null> => {
      const { updateSubscriptionItemByPk } = await execute(
        SetSubscriptionItemEndsAtDocument,
        { id, endsAt },
        withRetryStance(SAFE_TO_RETRY, options),
      );
      return updateSubscriptionItemByPk ?? null;
    },

    /**
     * Ends every item matching the filter, defaulting to "as of now".
     *
     * This is an `UPDATE` of `endsAt`, not a `DELETE` — the rows stay, and past
     * billing keeps its history. Retryable for the same reason as `setEndsAt`.
     */
    endMany: async (
      where: NonNullable<SubscriptionItemBoolExp>,
      endsAt?: string,
      options?: RequestOptions,
    ): Promise<number> => {
      const { updateSubscriptionItem } = await execute(
        EndSubscriptionItemsDocument,
        // `endsAt` left out entirely so the document's own `"now()"` default
        // applies: the server decides when "now" is.
        endsAt === undefined ? { where } : { where, endsAt },
        withRetryStance(SAFE_TO_RETRY, options),
      );
      return updateSubscriptionItem?.affectedRows ?? 0;
    },

    /** Never retried: it rewrites the item's price, and a partial repeat is worse than a failure. */
    edit: async (
      id: string,
      input: UpdateSubscriptionItemSubscriptionitemsetinput,
      options?: RequestOptions,
    ): Promise<string | null> => {
      const { editSubscriptionItem } = await execute(
        EditSubscriptionItemDocument,
        { id, input },
        withRetryStance(NEVER_RETRY, options),
      );
      return editSubscriptionItem?.id ?? null;
    },

    /** Repricing every item of one product from a date. Never retried. */
    updatePricesByProduct: async (
      input: { productId: string; price: number; startsAt: string },
      options?: RequestOptions,
    ): Promise<string[]> => {
      const { updateSubscriptionItemPricesByProductId } = await execute(
        UpdateSubscriptionItemPricesByProductDocument,
        input,
        withRetryStance(NEVER_RETRY, options),
      );
      return updateSubscriptionItemPricesByProductId.ids;
    },

    pauses: createPausesResource(execute),
  };
};

export const createSubscriptionsResource = (execute: GraphqlExecutor) => ({
  get: async (
    id: string,
    options?: RequestOptions,
  ): Promise<SubscriptionDetail | null> => {
    const { SubscriptionByPk } = await execute(GetSubscriptionDocument, { id }, options);
    return SubscriptionByPk ?? null;
  },

  list: async (
    options: ListSubscriptionsOptions = {},
  ): Promise<SubscriptionFieldsFragment[]> => {
    const { where, orderBy, limit, offset, ...request } = options;
    const { Subscription } = await execute(
      ListSubscriptionsDocument,
      { where, orderBy, limit, offset },
      request,
    );
    return Subscription;
  },

  /** Never retried: a repeated insert is a second subscription for the customer. */
  create: async (
    object: SubscriptionInsertInput,
    options?: RequestOptions,
  ): Promise<SubscriptionFieldsFragment | null> => {
    const { insertSubscriptionOne } = await execute(
      CreateSubscriptionDocument,
      { object },
      withRetryStance(NEVER_RETRY, options),
    );
    return insertSubscriptionOne ?? null;
  },

  /** Hosted page where the customer sets up the payment method. */
  url: async (
    subscriptionId: string,
    returnUrl?: string,
    options?: RequestOptions,
  ): Promise<string> => {
    const result = await execute(
      GetSubscriptionUrlDocument,
      { subscriptionId, returnUrl },
      options,
    );
    return result.generateSubscriptionUrl.url;
  },

  /**
   * What the next billing would cost. Returns the per-item breakdown alongside
   * the sum — the sum alone cannot tell you which item moved.
   */
  calculatePrice: async (
    input: CalculateSubscriptionPriceInput,
    options?: RequestOptions,
  ): Promise<SubscriptionPrice> => {
    const { calculateSubscriptionPrice } = await execute(
      CalculateSubscriptionPriceDocument,
      { input },
      options,
    );
    return calculateSubscriptionPrice;
  },

  items: createItemsResource(execute),
});

export type SubscriptionsResource = ReturnType<typeof createSubscriptionsResource>;
