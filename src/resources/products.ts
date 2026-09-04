import {
  GetProductByExternalIdDocument,
  GetProductDocument,
  ListProductsDocument,
  type ListProductsQueryVariables,
  type ProductBoolExp,
  type ProductFieldsFragment,
} from "../generated/graphql.js";
import { paginate } from "../pagination.js";
import type { GraphqlExecutor, RequestOptions } from "../types.js";
import type { ListAllOptions, ListOptions } from "./shared.js";

export interface ProductFilter {
  /** Keep only these external ids. */
  externalIds?: string[];
  /** Drop these external ids. */
  excludeExternalIds?: string[];
  /** Include soft-deleted products. Off by default. */
  includeDeleted?: boolean;
  /** Extra Hasura filter, applied last. */
  where?: ProductBoolExp;
  orderBy?: ListProductsQueryVariables["orderBy"];
}

export interface ListProductsOptions extends ListOptions, ProductFilter {}
export interface ListAllProductsOptions extends ListAllOptions, ProductFilter {}

const toVariables = (filter: ProductFilter) => ({
  externalIds: filter.externalIds,
  excludeExternalIds: filter.excludeExternalIds,
  // `null` removes the condition; `true` keeps only rows with no `deletedAt`.
  notDeleted: filter.includeDeleted ? null : true,
  and: filter.where ? [filter.where] : [],
  orderBy: filter.orderBy,
});

export const createProductsResource = (execute: GraphqlExecutor) => {
  const list = async (
    options: ListProductsOptions = {},
  ): Promise<ProductFieldsFragment[]> => {
    const {
      externalIds,
      excludeExternalIds,
      includeDeleted,
      where,
      orderBy,
      limit,
      offset,
      ...request
    } = options;
    const { product } = await execute(
      ListProductsDocument,
      {
        ...toVariables({ externalIds, excludeExternalIds, includeDeleted, where, orderBy }),
        limit,
        offset,
      },
      request,
    );
    return product;
  };

  return {
    get: async (
      id: string,
      options?: RequestOptions,
    ): Promise<ProductFieldsFragment | null> => {
      const { productByPk } = await execute(GetProductDocument, { id }, options);
      return productByPk ?? null;
    },

    /** `null` rather than a throw when nothing matches — absence is not an error. */
    getByExternalId: async (
      externalId: string,
      options: RequestOptions & { includeDeleted?: boolean } = {},
    ): Promise<ProductFieldsFragment | null> => {
      const { includeDeleted, ...request } = options;
      const { product } = await execute(
        GetProductByExternalIdDocument,
        { externalId, notDeleted: includeDeleted ? null : true },
        request,
      );
      return product[0] ?? null;
    },

    list,

    listAll: (options: ListAllProductsOptions = {}) => {
      const { pageSize, max, ...rest } = options;
      return paginate<ProductFieldsFragment>(
        ({ limit, offset }) => list({ ...rest, limit, offset }),
        { pageSize, max },
      );
    },
  };
};

export type ProductsResource = ReturnType<typeof createProductsResource>;
