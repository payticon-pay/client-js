import {
  ExchangeCurrencyDocument,
  GetApplePaySessionDocument,
  GetCustomPaywallMessageDocument,
  GetProjectPaymentMethodsDocument,
  VerifyPaywallTokenDocument,
  type ExchangeCurrencyQuery,
  type GetApplePaySessionInput,
  type GetCustomPaywallMessageQuery,
  type GetProjectPaymentMethodsQuery,
  type VerifyPaywallTokenMutation,
} from "../generated/graphql.js";
import type { GraphqlExecutor, RequestOptions } from "../types.js";
import { SAFE_TO_RETRY, withRetryStance } from "./shared.js";

export type PaywallToken = VerifyPaywallTokenMutation["verifyPaywallToken"];
export type ProjectPaymentMethod =
  GetProjectPaymentMethodsQuery["getProjectPaymentMethod"][number];
export type CustomPaywallMessage = NonNullable<
  GetCustomPaywallMessageQuery["getCustomPaywallMessage"]
>;
export type CurrencyExchange = NonNullable<ExchangeCurrencyQuery["exchangeCurrency"]>;

export const createPaywallResource = (execute: GraphqlExecutor) => ({
  /**
   * Exchanges a paywall token for the order behind it. Declared as a mutation
   * upstream but it only reads, so retrying it is safe.
   */
  verifyToken: async (
    paymentToken: string,
    options?: RequestOptions,
  ): Promise<PaywallToken> => {
    const { verifyPaywallToken } = await execute(
      VerifyPaywallTokenDocument,
      { paymentToken },
      withRetryStance(SAFE_TO_RETRY, options),
    );
    return verifyPaywallToken;
  },

  /** Methods available to this project for a currency. */
  paymentMethods: async (
    paymentCurrency: string,
    options?: RequestOptions,
  ): Promise<ProjectPaymentMethod[]> => {
    const { getProjectPaymentMethod } = await execute(
      GetProjectPaymentMethodsDocument,
      { paymentCurrency },
      options,
    );
    return getProjectPaymentMethod;
  },

  customMessage: async (
    paymentCurrency: string,
    options?: RequestOptions,
  ): Promise<CustomPaywallMessage | null> => {
    const { getCustomPaywallMessage } = await execute(
      GetCustomPaywallMessageDocument,
      { paymentCurrency },
      options,
    );
    return getCustomPaywallMessage ?? null;
  },

  /** Apple's merchant-validation payload; its shape is Apple's, so `unknown`. */
  applePaySession: async (
    input: GetApplePaySessionInput,
    options?: RequestOptions,
  ): Promise<unknown> => {
    const { getApplePaySession } = await execute(
      GetApplePaySessionDocument,
      { input },
      options,
    );
    return getApplePaySession.session;
  },
});

export const createExchangeResource = (execute: GraphqlExecutor) => ({
  /** Converts an amount, with the project's margin applied. */
  currency: async (
    input: { amount: number; from: string; to: string },
    options?: RequestOptions,
  ): Promise<CurrencyExchange | null> => {
    const { exchangeCurrency } = await execute(ExchangeCurrencyDocument, input, options);
    return exchangeCurrency ?? null;
  },
});

export type PaywallResource = ReturnType<typeof createPaywallResource>;
export type ExchangeResource = ReturnType<typeof createExchangeResource>;
