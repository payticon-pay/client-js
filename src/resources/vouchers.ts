import {
  CreateVoucherGroupDocument,
  GenerateVoucherDocument,
  GenerateVouchersDocument,
  GetVoucherByCodeDocument,
  GetVoucherDocument,
  GetVoucherGroupDocument,
  ListVoucherGroupsDocument,
  ListVouchersDocument,
  type GenerateOneVoucherInput,
  type GetVoucherByCodeQuery,
  type ListVoucherGroupsQueryVariables,
  type ListVouchersQueryVariables,
  type VoucherFieldsFragment,
  type VoucherGroupFieldsFragment,
  type VoucherGroupInsertInput,
} from "../generated/graphql.js";
import type { GraphqlExecutor, RequestOptions } from "../types.js";
import { NEVER_RETRY, withRetryStance, type ListOptions } from "./shared.js";

export type VoucherBalance = NonNullable<GetVoucherByCodeQuery["voucherByCode"]>;

export interface ListVouchersOptions extends ListOptions {
  where?: ListVouchersQueryVariables["where"];
  orderBy?: ListVouchersQueryVariables["orderBy"];
}

export interface ListVoucherGroupsOptions extends ListOptions {
  where?: ListVoucherGroupsQueryVariables["where"];
  orderBy?: ListVoucherGroupsQueryVariables["orderBy"];
}

export const createVouchersResource = (execute: GraphqlExecutor) => ({
  /** Balance behind a code the customer typed in. `null` when the code is unknown. */
  getByCode: async (
    code: string,
    options?: RequestOptions,
  ): Promise<VoucherBalance | null> => {
    const { voucherByCode } = await execute(GetVoucherByCodeDocument, { code }, options);
    return voucherByCode ?? null;
  },

  get: async (
    id: string,
    options?: RequestOptions,
  ): Promise<VoucherFieldsFragment | null> => {
    const { voucherByPk } = await execute(GetVoucherDocument, { id }, options);
    return voucherByPk ?? null;
  },

  list: async (
    options: ListVouchersOptions = {},
  ): Promise<VoucherFieldsFragment[]> => {
    const { where, orderBy, limit, offset, ...request } = options;
    const { voucher } = await execute(
      ListVouchersDocument,
      { where, orderBy, limit, offset },
      request,
    );
    return voucher;
  },

  /**
   * Never retried: each call mints a voucher carrying real balance, and a
   * repeat after a timeout mints a second one nobody asked for.
   */
  generateOne: async (
    input: GenerateOneVoucherInput,
    options?: RequestOptions,
  ): Promise<{ voucherId: string; voucher?: VoucherFieldsFragment | null }> => {
    const { generateVoucher } = await execute(
      GenerateVoucherDocument,
      { input },
      withRetryStance(NEVER_RETRY, options),
    );
    return generateVoucher;
  },

  /** Never retried, for the same reason as `generateOne` — multiplied by `count`. */
  generateMany: async (
    input: { groupId: string; count: number; startBalance: number },
    options?: RequestOptions,
  ): Promise<{ generationId: string; vouchers: VoucherFieldsFragment[] }> => {
    const { generateVouchers } = await execute(
      GenerateVouchersDocument,
      input,
      withRetryStance(NEVER_RETRY, options),
    );
    return generateVouchers;
  },

  groups: {
    get: async (
      id: string,
      options?: RequestOptions,
    ): Promise<VoucherGroupFieldsFragment | null> => {
      const { voucherGroupByPk } = await execute(
        GetVoucherGroupDocument,
        { id },
        options,
      );
      return voucherGroupByPk ?? null;
    },

    list: async (
      options: ListVoucherGroupsOptions = {},
    ): Promise<VoucherGroupFieldsFragment[]> => {
      const { where, orderBy, limit, offset, ...request } = options;
      const { voucherGroup } = await execute(
        ListVoucherGroupsDocument,
        { where, orderBy, limit, offset },
        request,
      );
      return voucherGroup;
    },

    /** Never retried: a repeat creates a second group with the same name. */
    create: async (
      object: VoucherGroupInsertInput,
      options?: RequestOptions,
    ): Promise<VoucherGroupFieldsFragment | null> => {
      const { insertVoucherGroupOne } = await execute(
        CreateVoucherGroupDocument,
        { object },
        withRetryStance(NEVER_RETRY, options),
      );
      return insertVoucherGroupOne ?? null;
    },
  },
});

export type VouchersResource = ReturnType<typeof createVouchersResource>;
