export { createPaycadooClient } from "./client.js";
export type { PaycadooClient } from "./client.js";

export {
  DEFAULT_ENDPOINT,
  DEFAULT_GRAPHQL_PATH,
  DEFAULT_MAX_ATTEMPTS,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_TOTAL_TIMEOUT_MS,
} from "./constants.js";

export {
  PaycadooConfigError,
  PaycadooError,
  PaycadooGraphQLError,
  PaycadooHttpError,
  PaycadooNetworkError,
  PaycadooTimeoutError,
  isPaycadooError,
  isPaycadooErrorCode,
  isPaycadooGraphQLError,
  isPaycadooHttpError,
  isPaycadooNetworkError,
  isPaycadooTimeoutError,
} from "./errors.js";
export type { PaycadooGraphQLErrorEntry } from "./errors.js";

export {
  PAYCADOO_ERROR_CODES,
  isKnownPaycadooErrorCode,
} from "./errorCodes.js";
export type {
  KnownPaycadooErrorCode,
  PaycadooErrorCode,
} from "./errorCodes.js";

export type {
  CreateOrderResult,
  IdempotentOrderResult,
  ListAllOrdersOptions,
  ListOrdersOptions,
  OrdersResource,
} from "./resources/orders.js";
export type {
  CreatePaymentResult,
  ListPaymentsOptions,
  PaymentsResource,
} from "./resources/payments.js";
export type { ListRefundsOptions, RefundsResource } from "./resources/refunds.js";
export type { ListAllOptions, ListOptions } from "./resources/shared.js";

export { collect, paginate } from "./pagination.js";
export type { PageParams, PaginateOptions } from "./pagination.js";

export { TypedDocumentString } from "./graphql/TypedDocumentString.js";
export type { PaycadooDocument } from "./graphql/TypedDocumentString.js";

export type {
  GraphqlExecutor,
  GraphqlResponseBody,
  PaycadooClientOptions,
  PaycadooLogger,
  RequestOptions,
  RetryOptions,
} from "./types.js";

export * from "./generated/enums.js";
