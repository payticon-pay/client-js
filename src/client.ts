import { PaycadooPingDocument } from "./generated/graphql.js";
import { createOrdersResource, type OrdersResource } from "./resources/orders.js";
import {
  createExchangeResource,
  createPaywallResource,
  type ExchangeResource,
  type PaywallResource,
} from "./resources/paywall.js";
import { createPaymentsResource, type PaymentsResource } from "./resources/payments.js";
import { createProductsResource, type ProductsResource } from "./resources/products.js";
import { createRefundsResource, type RefundsResource } from "./resources/refunds.js";
import {
  createSubscriptionsResource,
  type SubscriptionsResource,
} from "./resources/subscriptions.js";
import { createVouchersResource, type VouchersResource } from "./resources/vouchers.js";
import { createExecutor } from "./transport/execute.js";
import type { TypedDocumentString } from "./graphql/TypedDocumentString.js";
import type {
  GraphqlExecutor,
  PaycadooClientOptions,
  RequestOptions,
} from "./types.js";

export interface PaycadooClient {
  readonly orders: OrdersResource;
  readonly payments: PaymentsResource;
  readonly refunds: RefundsResource;
  readonly subscriptions: SubscriptionsResource;
  readonly products: ProductsResource;
  readonly vouchers: VouchersResource;
  readonly paywall: PaywallResource;
  readonly exchange: ExchangeResource;

  /**
   * Executes any GraphQL document against Paycadoo.
   *
   * The operator surface — projects, scripts, chargebacks, reconciliation,
   * antifraud — is reachable only through here, on purpose: it is a console,
   * not a merchant SDK, and wrapping it would imply a stability promise this
   * package does not make.
   */
  raw<TResult, TVariables>(
    document: TypedDocumentString<TResult, TVariables>,
    variables?: TVariables,
    options?: RequestOptions,
  ): Promise<TResult>;
  raw<TResult = unknown, TVariables = Record<string, unknown>>(
    document: string,
    variables?: TVariables,
    options?: RequestOptions,
  ): Promise<TResult>;

  /**
   * One round-trip that touches no table. Resolves when the endpoint answers
   * and accepts the API key; throws the same typed errors as any other call.
   */
  ping(options?: RequestOptions): Promise<true>;

  /** The executor the resources are built on. Handy for custom resources. */
  readonly execute: GraphqlExecutor;
}

export const createPaycadooClient = (
  options: PaycadooClientOptions,
): PaycadooClient => {
  const execute = createExecutor(options);

  return {
    orders: createOrdersResource(execute),
    payments: createPaymentsResource(execute),
    refunds: createRefundsResource(execute),
    subscriptions: createSubscriptionsResource(execute),
    products: createProductsResource(execute),
    vouchers: createVouchersResource(execute),
    paywall: createPaywallResource(execute),
    exchange: createExchangeResource(execute),
    raw: execute as PaycadooClient["raw"],
    ping: async (options?: RequestOptions) => {
      await execute(PaycadooPingDocument, undefined, options);
      return true as const;
    },
    execute,
  };
};
