/** select columns of table "apiKey" */
export const ApiKeySelectColumn = {
  /** column name */
  key: 'key'
} as const;

export type ApiKeySelectColumn = typeof ApiKeySelectColumn[keyof typeof ApiKeySelectColumn];
/** ordering argument of a cursor */
export const AuthCursorOrdering = {
  /** ascending ordering of the cursor */
  ASC: 'ASC',
  /** descending ordering of the cursor */
  DESC: 'DESC'
} as const;

export type AuthCursorOrdering = typeof AuthCursorOrdering[keyof typeof AuthCursorOrdering];
/** select columns of table "invitation" */
export const AuthInvitationSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  email: 'email',
  /** column name */
  group: 'group',
  /** column name */
  id: 'id',
  /** column name */
  invitedById: 'invitedById',
  /** column name */
  role: 'role',
  /** column name */
  userData: 'userData',
  /** column name */
  validTo: 'validTo'
} as const;

export type AuthInvitationSelectColumn = typeof AuthInvitationSelectColumn[keyof typeof AuthInvitationSelectColumn];
/** column ordering options */
export const AuthOrderBy = {
  /** in ascending order, nulls last */
  ASC: 'ASC',
  /** in ascending order, nulls first */
  ASC_NULLS_FIRST: 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  ASC_NULLS_LAST: 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  DESC: 'DESC',
  /** in descending order, nulls first */
  DESC_NULLS_FIRST: 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DESC_NULLS_LAST: 'DESC_NULLS_LAST'
} as const;

export type AuthOrderBy = typeof AuthOrderBy[keyof typeof AuthOrderBy];
/** unique or primary key constraints on table "projectTemplate" */
export const AuthProjectTemplateConstraint = {
  /** unique or primary key constraint on columns "template", "projectId" */
  projectTemplate_pkey: 'projectTemplate_pkey'
} as const;

export type AuthProjectTemplateConstraint = typeof AuthProjectTemplateConstraint[keyof typeof AuthProjectTemplateConstraint];
/** select columns of table "projectTemplate" */
export const AuthProjectTemplateSelectColumn = {
  /** column name */
  template: 'template',
  /** column name */
  value: 'value'
} as const;

export type AuthProjectTemplateSelectColumn = typeof AuthProjectTemplateSelectColumn[keyof typeof AuthProjectTemplateSelectColumn];
/** update columns of table "projectTemplate" */
export const AuthProjectTemplateUpdateColumn = {
  /** column name */
  value: 'value'
} as const;

export type AuthProjectTemplateUpdateColumn = typeof AuthProjectTemplateUpdateColumn[keyof typeof AuthProjectTemplateUpdateColumn];
/** select columns of table "session" */
export const AuthSessionSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  device: 'device',
  /** column name */
  expireAt: 'expireAt',
  /** column name */
  forceRefresh: 'forceRefresh',
  /** column name */
  id: 'id',
  /** column name */
  ip: 'ip',
  /** column name */
  refreshCount: 'refreshCount',
  /** column name */
  refreshedAt: 'refreshedAt',
  /** column name */
  userId: 'userId'
} as const;

export type AuthSessionSelectColumn = typeof AuthSessionSelectColumn[keyof typeof AuthSessionSelectColumn];
export const AuthTemplateEnum = {
  EMAIL_CHANGE_EMAIL: 'EMAIL_CHANGE_EMAIL',
  EMAIL_CONFIRM_EMAIL: 'EMAIL_CONFIRM_EMAIL',
  EMAIL_INVITATION: 'EMAIL_INVITATION',
  EMAIL_RESET_PASSWORD: 'EMAIL_RESET_PASSWORD',
  SMS_CONFIRM_NUMBER: 'SMS_CONFIRM_NUMBER'
} as const;

export type AuthTemplateEnum = typeof AuthTemplateEnum[keyof typeof AuthTemplateEnum];
/** unique or primary key constraints on table "userRole" */
export const AuthUserRoleConstraint = {
  /** unique or primary key constraint on columns "id" */
  userRole_pkey: 'userRole_pkey',
  /** unique or primary key constraint on columns "userId", "group" */
  user_gorup: 'user_gorup'
} as const;

export type AuthUserRoleConstraint = typeof AuthUserRoleConstraint[keyof typeof AuthUserRoleConstraint];
/** select columns of table "userRole" */
export const AuthUserRoleSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  group: 'group',
  /** column name */
  id: 'id',
  /** column name */
  role: 'role',
  /** column name */
  userId: 'userId'
} as const;

export type AuthUserRoleSelectColumn = typeof AuthUserRoleSelectColumn[keyof typeof AuthUserRoleSelectColumn];
/** update columns of table "userRole" */
export const AuthUserRoleUpdateColumn = {
  /** column name */
  role: 'role'
} as const;

export type AuthUserRoleUpdateColumn = typeof AuthUserRoleUpdateColumn[keyof typeof AuthUserRoleUpdateColumn];
/** select columns of table "user" */
export const AuthUserSelectColumn = {
  /** column name */
  claims: 'claims',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  deprecatedEmailVerifyToken: 'deprecatedEmailVerifyToken',
  /** column name */
  email: 'email',
  /** column name */
  emailVerified: 'emailVerified',
  /** column name */
  facebookId: 'facebookId',
  /** column name */
  firstName: 'firstName',
  /** column name */
  googleId: 'googleId',
  /** column name */
  id: 'id',
  /** column name */
  isBlocked: 'isBlocked',
  /** column name */
  isGuest: 'isGuest',
  /** column name */
  lastName: 'lastName',
  /** column name */
  marketingConsent: 'marketingConsent',
  /** column name */
  password: 'password',
  /** column name */
  phone: 'phone',
  /** column name */
  phoneVerified: 'phoneVerified',
  /** column name */
  poolId: 'poolId',
  /** column name */
  registerIp: 'registerIp',
  /** column name */
  role: 'role',
  /** column name */
  setPasswordToken: 'setPasswordToken',
  /** column name */
  updatedAt: 'updatedAt',
  /** column name */
  username: 'username'
} as const;

export type AuthUserSelectColumn = typeof AuthUserSelectColumn[keyof typeof AuthUserSelectColumn];
/** select columns of table "card" */
export const CardSelectColumn = {
  /** column name */
  first6digits: 'first6digits',
  /** column name */
  id: 'id',
  /** column name */
  last4digits: 'last4digits'
} as const;

export type CardSelectColumn = typeof CardSelectColumn[keyof typeof CardSelectColumn];
/** unique or primary key constraints on table "chargeback" */
export const ChargebackConstraint = {
  /** unique or primary key constraint on columns "id" */
  chargeback_pkey: 'chargeback_pkey',
  /** unique or primary key constraint on columns "providerChargebackId" */
  chargeback_providerChargebackId_key: 'chargeback_providerChargebackId_key'
} as const;

export type ChargebackConstraint = typeof ChargebackConstraint[keyof typeof ChargebackConstraint];
/** select columns of table "chargeback" */
export const ChargebackSelectColumn = {
  /** column name */
  arn: 'arn',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  delivery: 'delivery',
  /** column name */
  deliveryType: 'deliveryType',
  /** column name */
  id: 'id',
  /** column name */
  paymentId: 'paymentId',
  /** column name */
  providerChargebackId: 'providerChargebackId',
  /** column name */
  reason: 'reason',
  /** column name */
  rrn: 'rrn',
  /** column name */
  terms: 'terms',
  /** column name */
  tripleDes: 'tripleDes',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type ChargebackSelectColumn = typeof ChargebackSelectColumn[keyof typeof ChargebackSelectColumn];
export const ChargebackStatusEnum = {
  ACTION_REQUIRED: 'ACTION_REQUIRED',
  APPEALABLE: 'APPEALABLE',
  AWAITING_RESPONSE: 'AWAITING_RESPONSE',
  CREATED: 'CREATED',
  LOST: 'LOST',
  REVIEW: 'REVIEW',
  WON: 'WON'
} as const;

export type ChargebackStatusEnum = typeof ChargebackStatusEnum[keyof typeof ChargebackStatusEnum];
/** unique or primary key constraints on table "chargebackStatusHistory" */
export const ChargebackStatusHistoryConstraint = {
  /** unique or primary key constraint on columns "id" */
  chargebackStatusHistory_pkey: 'chargebackStatusHistory_pkey'
} as const;

export type ChargebackStatusHistoryConstraint = typeof ChargebackStatusHistoryConstraint[keyof typeof ChargebackStatusHistoryConstraint];
/** select columns of table "chargebackStatusHistory" */
export const ChargebackStatusHistorySelectColumn = {
  /** column name */
  chargebackId: 'chargebackId',
  /** column name */
  date: 'date',
  /** column name */
  email: 'email',
  /** column name */
  emailSender: 'emailSender',
  /** column name */
  id: 'id',
  /** column name */
  status: 'status'
} as const;

export type ChargebackStatusHistorySelectColumn = typeof ChargebackStatusHistorySelectColumn[keyof typeof ChargebackStatusHistorySelectColumn];
/** update columns of table "chargebackStatusHistory" */
export const ChargebackStatusHistoryUpdateColumn = {
  /** column name */
  date: 'date',
  /** column name */
  email: 'email',
  /** column name */
  emailSender: 'emailSender',
  /** column name */
  status: 'status'
} as const;

export type ChargebackStatusHistoryUpdateColumn = typeof ChargebackStatusHistoryUpdateColumn[keyof typeof ChargebackStatusHistoryUpdateColumn];
/** select columns of table "chargebackSummary" */
export const ChargebackSummarySelectColumn = {
  /** column name */
  count: 'count',
  /** column name */
  currency: 'currency',
  /** column name */
  date: 'date',
  /** column name */
  status: 'status',
  /** column name */
  sum: 'sum'
} as const;

export type ChargebackSummarySelectColumn = typeof ChargebackSummarySelectColumn[keyof typeof ChargebackSummarySelectColumn];
/** update columns of table "chargeback" */
export const ChargebackUpdateColumn = {
  /** column name */
  delivery: 'delivery',
  /** column name */
  deliveryType: 'deliveryType',
  /** column name */
  terms: 'terms',
  /** column name */
  tripleDes: 'tripleDes'
} as const;

export type ChargebackUpdateColumn = typeof ChargebackUpdateColumn[keyof typeof ChargebackUpdateColumn];
export const CurrencyEnum = {
  DKK: 'DKK',
  EUR: 'EUR',
  GBP: 'GBP',
  NOK: 'NOK',
  PLN: 'PLN',
  USD: 'USD'
} as const;

export type CurrencyEnum = typeof CurrencyEnum[keyof typeof CurrencyEnum];
/** select columns of table "currencyProfit" */
export const CurrencyProfitSelectColumn = {
  /** column name */
  date: 'date',
  /** column name */
  from: 'from',
  /** column name */
  profit: 'profit',
  /** column name */
  to: 'to'
} as const;

export type CurrencyProfitSelectColumn = typeof CurrencyProfitSelectColumn[keyof typeof CurrencyProfitSelectColumn];
/** ordering argument of a cursor */
export const CursorOrdering = {
  /** ascending ordering of the cursor */
  ASC: 'ASC',
  /** descending ordering of the cursor */
  DESC: 'DESC'
} as const;

export type CursorOrdering = typeof CursorOrdering[keyof typeof CursorOrdering];
/** select columns of table "customerCards" */
export const CustomerCardsSelectColumn = {
  /** column name */
  cardId: 'cardId',
  /** column name */
  customerId: 'customerId',
  /** column name */
  projectId: 'projectId',
  /** column name */
  transactionCount: 'transactionCount'
} as const;

export type CustomerCardsSelectColumn = typeof CustomerCardsSelectColumn[keyof typeof CustomerCardsSelectColumn];
/** unique or primary key constraints on table "customer" */
export const CustomerConstraint = {
  /** unique or primary key constraint on columns "id", "projectId" */
  customer_pkey: 'customer_pkey'
} as const;

export type CustomerConstraint = typeof CustomerConstraint[keyof typeof CustomerConstraint];
/** select columns of table "customerDevices" */
export const CustomerDevicesSelectColumn = {
  /** column name */
  customerId: 'customerId',
  /** column name */
  projectId: 'projectId',
  /** column name */
  transactionCount: 'transactionCount',
  /** column name */
  userAgentHeader: 'userAgentHeader',
  /** column name */
  userAgentResults: 'userAgentResults'
} as const;

export type CustomerDevicesSelectColumn = typeof CustomerDevicesSelectColumn[keyof typeof CustomerDevicesSelectColumn];
/** select columns of table "customerFingerprints" */
export const CustomerFingerprintsSelectColumn = {
  /** column name */
  customerId: 'customerId',
  /** column name */
  fingerprintId: 'fingerprintId',
  /** column name */
  projectId: 'projectId',
  /** column name */
  transactionCount: 'transactionCount'
} as const;

export type CustomerFingerprintsSelectColumn = typeof CustomerFingerprintsSelectColumn[keyof typeof CustomerFingerprintsSelectColumn];
/** select columns of table "customerFraudScoreLog" */
export const CustomerFraudScoreLogSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  customerId: 'customerId',
  /** column name */
  description: 'description',
  /** column name */
  fraudScore: 'fraudScore',
  /** column name */
  id: 'id',
  /** column name */
  oldFraudScore: 'oldFraudScore',
  /** column name */
  projectId: 'projectId',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type CustomerFraudScoreLogSelectColumn = typeof CustomerFraudScoreLogSelectColumn[keyof typeof CustomerFraudScoreLogSelectColumn];
/** select columns of table "customerIps" */
export const CustomerIpsSelectColumn = {
  /** column name */
  customerId: 'customerId',
  /** column name */
  ip: 'ip',
  /** column name */
  projectId: 'projectId',
  /** column name */
  transactionCount: 'transactionCount'
} as const;

export type CustomerIpsSelectColumn = typeof CustomerIpsSelectColumn[keyof typeof CustomerIpsSelectColumn];
/** select columns of table "customer" */
export const CustomerSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  email: 'email',
  /** column name */
  firstName: 'firstName',
  /** column name */
  fraudScore: 'fraudScore',
  /** column name */
  id: 'id',
  /** column name */
  lastName: 'lastName',
  /** column name */
  projectId: 'projectId',
  /** column name */
  stripeVerificationSessionId: 'stripeVerificationSessionId'
} as const;

export type CustomerSelectColumn = typeof CustomerSelectColumn[keyof typeof CustomerSelectColumn];
/** update columns of table "customer" */
export const CustomerUpdateColumn = {
  /** column name */
  email: 'email',
  /** column name */
  firstName: 'firstName',
  /** column name */
  lastName: 'lastName'
} as const;

export type CustomerUpdateColumn = typeof CustomerUpdateColumn[keyof typeof CustomerUpdateColumn];
/** select columns of table "fingerprint" */
export const FingerprintSelectColumn = {
  /** column name */
  fraudScore: 'fraudScore',
  /** column name */
  id: 'id'
} as const;

export type FingerprintSelectColumn = typeof FingerprintSelectColumn[keyof typeof FingerprintSelectColumn];
/** select columns of table "geo.country" */
export const GeoCountrySelectColumn = {
  /** column name */
  capital: 'capital',
  /** column name */
  continent: 'continent',
  /** column name */
  currencies: 'currencies',
  /** column name */
  id: 'id',
  /** column name */
  languages: 'languages',
  /** column name */
  name: 'name',
  /** column name */
  nativeName: 'nativeName',
  /** column name */
  phonePrefixes: 'phonePrefixes'
} as const;

export type GeoCountrySelectColumn = typeof GeoCountrySelectColumn[keyof typeof GeoCountrySelectColumn];
export const IntegrationTypeEnum = {
  FINGERPRINT: 'FINGERPRINT',
  STRIPE: 'STRIPE'
} as const;

export type IntegrationTypeEnum = typeof IntegrationTypeEnum[keyof typeof IntegrationTypeEnum];
/** select columns of table "money.card" */
export const MoneyCardSelectColumn = {
  /** column name */
  countryCode: 'countryCode',
  /** column name */
  issuer: 'issuer',
  /** column name */
  organization: 'organization',
  /** column name */
  prefix: 'prefix',
  /** column name */
  product: 'product',
  /** column name */
  segment: 'segment',
  /** column name */
  type: 'type'
} as const;

export type MoneyCardSelectColumn = typeof MoneyCardSelectColumn[keyof typeof MoneyCardSelectColumn];
export const MoneyCurrencyEnum = {
  AUD: 'AUD',
  BGN: 'BGN',
  CAD: 'CAD',
  CHF: 'CHF',
  CZK: 'CZK',
  DKK: 'DKK',
  EUR: 'EUR',
  GBP: 'GBP',
  HRK: 'HRK',
  HUF: 'HUF',
  JPY: 'JPY',
  LTL: 'LTL',
  NOK: 'NOK',
  PLN: 'PLN',
  ROL: 'ROL',
  RUR: 'RUR',
  SEK: 'SEK',
  TRL: 'TRL',
  UAH: 'UAH',
  USD: 'USD'
} as const;

export type MoneyCurrencyEnum = typeof MoneyCurrencyEnum[keyof typeof MoneyCurrencyEnum];
/** select columns of table "money.currency" */
export const MoneyCurrencySelectColumn = {
  /** column name */
  code: 'code'
} as const;

export type MoneyCurrencySelectColumn = typeof MoneyCurrencySelectColumn[keyof typeof MoneyCurrencySelectColumn];
/** select columns of table "money.exchangeRate" */
export const MoneyExchangeRateSelectColumn = {
  /** column name */
  from: 'from',
  /** column name */
  rate: 'rate',
  /** column name */
  to: 'to'
} as const;

export type MoneyExchangeRateSelectColumn = typeof MoneyExchangeRateSelectColumn[keyof typeof MoneyExchangeRateSelectColumn];
/** column ordering options */
export const OrderBy = {
  /** in ascending order, nulls last */
  ASC: 'ASC',
  /** in ascending order, nulls first */
  ASC_NULLS_FIRST: 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  ASC_NULLS_LAST: 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  DESC: 'DESC',
  /** in descending order, nulls first */
  DESC_NULLS_FIRST: 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DESC_NULLS_LAST: 'DESC_NULLS_LAST'
} as const;

export type OrderBy = typeof OrderBy[keyof typeof OrderBy];
/** unique or primary key constraints on table "order" */
export const OrderConstraint = {
  /** unique or primary key constraint on columns "merchantId", "projectId" */
  order_merchantId: 'order_merchantId',
  /** unique or primary key constraint on columns "id" */
  order_pkey: 'order_pkey'
} as const;

export type OrderConstraint = typeof OrderConstraint[keyof typeof OrderConstraint];
/** unique or primary key constraints on table "orderItem" */
export const OrderItemConstraint = {
  /** unique or primary key constraint on columns "id" */
  orderItem_pkey: 'orderItem_pkey'
} as const;

export type OrderItemConstraint = typeof OrderItemConstraint[keyof typeof OrderItemConstraint];
/** select columns of table "orderItem" */
export const OrderItemSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  details: 'details',
  /** column name */
  id: 'id',
  /** column name */
  name: 'name',
  /** column name */
  orderId: 'orderId',
  /** column name */
  price: 'price',
  /** column name */
  productId: 'productId',
  /** column name */
  qty: 'qty',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type OrderItemSelectColumn = typeof OrderItemSelectColumn[keyof typeof OrderItemSelectColumn];
/** placeholder for update columns of table "orderItem" (current role has no relevant permissions) */
export const OrderItemUpdateColumn = {
  /** placeholder (do not use) */
  _PLACEHOLDER: '_PLACEHOLDER'
} as const;

export type OrderItemUpdateColumn = typeof OrderItemUpdateColumn[keyof typeof OrderItemUpdateColumn];
/** unique or primary key constraints on table "orderPriceModification" */
export const OrderPriceModificationConstraint = {
  /** unique or primary key constraint on columns "id" */
  orderPriceModyfikator_pkey: 'orderPriceModyfikator_pkey'
} as const;

export type OrderPriceModificationConstraint = typeof OrderPriceModificationConstraint[keyof typeof OrderPriceModificationConstraint];
/** select columns of table "orderPriceModification" */
export const OrderPriceModificationSelectColumn = {
  /** column name */
  amount: 'amount',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  description: 'description',
  /** column name */
  id: 'id',
  /** column name */
  orderId: 'orderId'
} as const;

export type OrderPriceModificationSelectColumn = typeof OrderPriceModificationSelectColumn[keyof typeof OrderPriceModificationSelectColumn];
/** placeholder for update columns of table "orderPriceModification" (current role has no relevant permissions) */
export const OrderPriceModificationUpdateColumn = {
  /** placeholder (do not use) */
  _PLACEHOLDER: '_PLACEHOLDER'
} as const;

export type OrderPriceModificationUpdateColumn = typeof OrderPriceModificationUpdateColumn[keyof typeof OrderPriceModificationUpdateColumn];
/** select columns of table "order" */
export const OrderSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  currency: 'currency',
  /** column name */
  customerId: 'customerId',
  /** column name */
  id: 'id',
  /** column name */
  ip: 'ip',
  /** column name */
  merchantId: 'merchantId',
  /** column name */
  metadata: 'metadata',
  /** column name */
  price: 'price',
  /** column name */
  projectId: 'projectId',
  /** column name */
  returnUrl: 'returnUrl',
  /** column name */
  status: 'status',
  /** column name */
  subscriptionId: 'subscriptionId',
  /** column name */
  title: 'title',
  /** column name */
  updatedAt: 'updatedAt',
  /** column name */
  webhookUrl: 'webhookUrl'
} as const;

export type OrderSelectColumn = typeof OrderSelectColumn[keyof typeof OrderSelectColumn];
export const OrderStatusEnum = {
  CREATED: 'CREATED',
  EXPIRED: 'EXPIRED',
  PAID: 'PAID',
  PENDING: 'PENDING',
  REFUNDED: 'REFUNDED',
  REJECTED: 'REJECTED',
  SUSPICIOUS: 'SUSPICIOUS'
} as const;

export type OrderStatusEnum = typeof OrderStatusEnum[keyof typeof OrderStatusEnum];
/** select columns of table "orderSummary" */
export const OrderSummarySelectColumn = {
  /** column name */
  count: 'count',
  /** column name */
  currency: 'currency',
  /** column name */
  dailyAverageSum: 'dailyAverageSum',
  /** column name */
  date: 'date',
  /** column name */
  status: 'status',
  /** column name */
  sum: 'sum'
} as const;

export type OrderSummarySelectColumn = typeof OrderSummarySelectColumn[keyof typeof OrderSummarySelectColumn];
/** update columns of table "order" */
export const OrderUpdateColumn = {
  /** column name */
  merchantId: 'merchantId',
  /** column name */
  metadata: 'metadata',
  /** column name */
  status: 'status',
  /** column name */
  title: 'title'
} as const;

export type OrderUpdateColumn = typeof OrderUpdateColumn[keyof typeof OrderUpdateColumn];
/** select columns of table "paymentByError" */
export const PaymentByErrorSelectColumn = {
  /** column name */
  count: 'count',
  /** column name */
  currency: 'currency',
  /** column name */
  date: 'date',
  /** column name */
  error: 'error',
  /** column name */
  errorMessage: 'errorMessage',
  /** column name */
  projectId: 'projectId',
  /** column name */
  projectProviderId: 'projectProviderId'
} as const;

export type PaymentByErrorSelectColumn = typeof PaymentByErrorSelectColumn[keyof typeof PaymentByErrorSelectColumn];
/** select columns of table "paymentByMethod" */
export const PaymentByMethodSelectColumn = {
  /** column name */
  amount: 'amount',
  /** column name */
  count: 'count',
  /** column name */
  currency: 'currency',
  /** column name */
  date: 'date',
  /** column name */
  paymentMethodId: 'paymentMethodId',
  /** column name */
  projectId: 'projectId',
  /** column name */
  status: 'status'
} as const;

export type PaymentByMethodSelectColumn = typeof PaymentByMethodSelectColumn[keyof typeof PaymentByMethodSelectColumn];
/** select columns of table "payment" */
export const PaymentSelectColumn = {
  /** column name */
  acceptHeader: 'acceptHeader',
  /** column name */
  amount: 'amount',
  /** column name */
  amountWithoutMargin: 'amountWithoutMargin',
  /** column name */
  cardId: 'cardId',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  currency: 'currency',
  /** column name */
  error: 'error',
  /** column name */
  errorMessage: 'errorMessage',
  /** column name */
  exchangeMargin: 'exchangeMargin',
  /** column name */
  exchangeRate: 'exchangeRate',
  /** column name */
  exchangeRateWithoutMargin: 'exchangeRateWithoutMargin',
  /** column name */
  externalId: 'externalId',
  /** column name */
  fingerprintId: 'fingerprintId',
  /** column name */
  id: 'id',
  /** column name */
  ip: 'ip',
  /** column name */
  isManual: 'isManual',
  /** column name */
  merchantId: 'merchantId',
  /** column name */
  metadata: 'metadata',
  /** column name */
  orderCurrencyAmount: 'orderCurrencyAmount',
  /** column name */
  orderId: 'orderId',
  /** column name */
  paymentMethodId: 'paymentMethodId',
  /** column name */
  paymentTokenId: 'paymentTokenId',
  /** column name */
  projectProviderId: 'projectProviderId',
  /** column name */
  redirectUrl: 'redirectUrl',
  /** column name */
  rejectReason: 'rejectReason',
  /** column name */
  status: 'status',
  /** column name */
  updatedAt: 'updatedAt',
  /** column name */
  userAgentHeader: 'userAgentHeader',
  /** column name */
  userAgentResults: 'userAgentResults',
  /** column name */
  voucherId: 'voucherId'
} as const;

export type PaymentSelectColumn = typeof PaymentSelectColumn[keyof typeof PaymentSelectColumn];
export const PaymentStatusEnum = {
  PAID: 'PAID',
  PENDING: 'PENDING',
  REFUNDED: 'REFUNDED',
  REJECTED: 'REJECTED'
} as const;

export type PaymentStatusEnum = typeof PaymentStatusEnum[keyof typeof PaymentStatusEnum];
/** select columns of table "paymentSummary" */
export const PaymentSummarySelectColumn = {
  /** column name */
  count: 'count',
  /** column name */
  currency: 'currency',
  /** column name */
  date: 'date',
  /** column name */
  projectProviderId: 'projectProviderId',
  /** column name */
  status: 'status'
} as const;

export type PaymentSummarySelectColumn = typeof PaymentSummarySelectColumn[keyof typeof PaymentSummarySelectColumn];
/** select columns of table "paymentToken" */
export const PaymentTokenSelectColumn = {
  /** column name */
  cardId: 'cardId',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  customerId: 'customerId',
  /** column name */
  id: 'id',
  /** column name */
  name: 'name',
  /** column name */
  type: 'type',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type PaymentTokenSelectColumn = typeof PaymentTokenSelectColumn[keyof typeof PaymentTokenSelectColumn];
export const PaymentTokenTypeEnum = {
  BLIK: 'BLIK',
  CARD: 'CARD'
} as const;

export type PaymentTokenTypeEnum = typeof PaymentTokenTypeEnum[keyof typeof PaymentTokenTypeEnum];
/** unique or primary key constraints on table "product" */
export const ProductConstraint = {
  /** unique or primary key constraint on columns "id" */
  subscriptionProduct_pkey1: 'subscriptionProduct_pkey1'
} as const;

export type ProductConstraint = typeof ProductConstraint[keyof typeof ProductConstraint];
/** select columns of table "product" */
export const ProductSelectColumn = {
  /** column name */
  additionalParameters: 'additionalParameters',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  currency: 'currency',
  /** column name */
  customInterval: 'customInterval',
  /** column name */
  deletedAt: 'deletedAt',
  /** column name */
  externalId: 'externalId',
  /** column name */
  id: 'id',
  /** column name */
  imageUrl: 'imageUrl',
  /** column name */
  name: 'name',
  /** column name */
  price: 'price',
  /** column name */
  projectId: 'projectId',
  /** column name */
  subscriptionInterval: 'subscriptionInterval'
} as const;

export type ProductSelectColumn = typeof ProductSelectColumn[keyof typeof ProductSelectColumn];
/** update columns of table "product" */
export const ProductUpdateColumn = {
  /** column name */
  additionalParameters: 'additionalParameters',
  /** column name */
  deletedAt: 'deletedAt',
  /** column name */
  imageUrl: 'imageUrl',
  /** column name */
  name: 'name',
  /** column name */
  price: 'price'
} as const;

export type ProductUpdateColumn = typeof ProductUpdateColumn[keyof typeof ProductUpdateColumn];
/** unique or primary key constraints on table "projectCurrencyExchangeMargin" */
export const ProjectCurrencyExchangeMarginConstraint = {
  /** unique or primary key constraint on columns "from", "to", "projectId" */
  projectCurrencyExchangeMagin_pkey: 'projectCurrencyExchangeMagin_pkey'
} as const;

export type ProjectCurrencyExchangeMarginConstraint = typeof ProjectCurrencyExchangeMarginConstraint[keyof typeof ProjectCurrencyExchangeMarginConstraint];
/** select columns of table "projectCurrencyExchangeMargin" */
export const ProjectCurrencyExchangeMarginSelectColumn = {
  /** column name */
  from: 'from',
  /** column name */
  margin: 'margin',
  /** column name */
  projectId: 'projectId',
  /** column name */
  to: 'to'
} as const;

export type ProjectCurrencyExchangeMarginSelectColumn = typeof ProjectCurrencyExchangeMarginSelectColumn[keyof typeof ProjectCurrencyExchangeMarginSelectColumn];
/** update columns of table "projectCurrencyExchangeMargin" */
export const ProjectCurrencyExchangeMarginUpdateColumn = {
  /** column name */
  margin: 'margin'
} as const;

export type ProjectCurrencyExchangeMarginUpdateColumn = typeof ProjectCurrencyExchangeMarginUpdateColumn[keyof typeof ProjectCurrencyExchangeMarginUpdateColumn];
/** unique or primary key constraints on table "projectIntegration" */
export const ProjectIntegrationConstraint = {
  /** unique or primary key constraint on columns "id" */
  projectIntegration_pkey: 'projectIntegration_pkey',
  /** unique or primary key constraint on columns "type", "projectId" */
  projectIntegration_type_projectId_key: 'projectIntegration_type_projectId_key'
} as const;

export type ProjectIntegrationConstraint = typeof ProjectIntegrationConstraint[keyof typeof ProjectIntegrationConstraint];
/** select columns of table "projectIntegration" */
export const ProjectIntegrationSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  id: 'id',
  /** column name */
  parameters: 'parameters',
  /** column name */
  projectId: 'projectId',
  /** column name */
  provider: 'provider',
  /** column name */
  type: 'type',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type ProjectIntegrationSelectColumn = typeof ProjectIntegrationSelectColumn[keyof typeof ProjectIntegrationSelectColumn];
/** update columns of table "projectIntegration" */
export const ProjectIntegrationUpdateColumn = {
  /** column name */
  parameters: 'parameters',
  /** column name */
  provider: 'provider'
} as const;

export type ProjectIntegrationUpdateColumn = typeof ProjectIntegrationUpdateColumn[keyof typeof ProjectIntegrationUpdateColumn];
/** unique or primary key constraints on table "projectProvider" */
export const ProjectProviderConstraint = {
  /** unique or primary key constraint on columns "providersApiId" */
  projectProvider_pkey: 'projectProvider_pkey',
  /** unique or primary key constraint on columns "projectId", "name" */
  projectProvider_projectId_name_key: 'projectProvider_projectId_name_key'
} as const;

export type ProjectProviderConstraint = typeof ProjectProviderConstraint[keyof typeof ProjectProviderConstraint];
/** unique or primary key constraints on table "projectProviderPaymentMethod" */
export const ProjectProviderPaymentMethodConstraint = {
  /** unique or primary key constraint on columns "paymentMethodId", "projectId", "projectProviderId" */
  projectProviderPaymentMethodVariant_pkey: 'projectProviderPaymentMethodVariant_pkey'
} as const;

export type ProjectProviderPaymentMethodConstraint = typeof ProjectProviderPaymentMethodConstraint[keyof typeof ProjectProviderPaymentMethodConstraint];
/** select columns of table "projectProviderPaymentMethod" */
export const ProjectProviderPaymentMethodSelectColumn = {
  /** column name */
  categoryId: 'categoryId',
  /** column name */
  depositPercent: 'depositPercent',
  /** column name */
  depositStatic: 'depositStatic',
  /** column name */
  enabled: 'enabled',
  /** column name */
  feePercent: 'feePercent',
  /** column name */
  feeStatic: 'feeStatic',
  /** column name */
  paymentMethodId: 'paymentMethodId',
  /** column name */
  projectProviderId: 'projectProviderId',
  /** column name */
  surchargePercent: 'surchargePercent',
  /** column name */
  surchargeStatic: 'surchargeStatic'
} as const;

export type ProjectProviderPaymentMethodSelectColumn = typeof ProjectProviderPaymentMethodSelectColumn[keyof typeof ProjectProviderPaymentMethodSelectColumn];
/** update columns of table "projectProviderPaymentMethod" */
export const ProjectProviderPaymentMethodUpdateColumn = {
  /** column name */
  categoryId: 'categoryId',
  /** column name */
  depositPercent: 'depositPercent',
  /** column name */
  depositStatic: 'depositStatic',
  /** column name */
  enabled: 'enabled',
  /** column name */
  feePercent: 'feePercent',
  /** column name */
  feeStatic: 'feeStatic',
  /** column name */
  paymentMethodId: 'paymentMethodId',
  /** column name */
  projectProviderId: 'projectProviderId',
  /** column name */
  surchargePercent: 'surchargePercent',
  /** column name */
  surchargeStatic: 'surchargeStatic'
} as const;

export type ProjectProviderPaymentMethodUpdateColumn = typeof ProjectProviderPaymentMethodUpdateColumn[keyof typeof ProjectProviderPaymentMethodUpdateColumn];
/** select columns of table "projectProvider" */
export const ProjectProviderSelectColumn = {
  /** column name */
  isArchived: 'isArchived',
  /** column name */
  name: 'name',
  /** column name */
  providerType: 'providerType',
  /** column name */
  providersApiId: 'providersApiId'
} as const;

export type ProjectProviderSelectColumn = typeof ProjectProviderSelectColumn[keyof typeof ProjectProviderSelectColumn];
/** unique or primary key constraints on table "projectProviderTransactionLog" */
export const ProjectProviderTransactionLogConstraint = {
  /** unique or primary key constraint on columns "id" */
  projectProviderTransactionLog_pkey: 'projectProviderTransactionLog_pkey'
} as const;

export type ProjectProviderTransactionLogConstraint = typeof ProjectProviderTransactionLogConstraint[keyof typeof ProjectProviderTransactionLogConstraint];
/** select columns of table "projectProviderTransactionLog" */
export const ProjectProviderTransactionLogSelectColumn = {
  /** column name */
  amount: 'amount',
  /** column name */
  chargebackId: 'chargebackId',
  /** column name */
  confirmed: 'confirmed',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  currency: 'currency',
  /** column name */
  date: 'date',
  /** column name */
  deposit: 'deposit',
  /** column name */
  description: 'description',
  /** column name */
  fee: 'fee',
  /** column name */
  id: 'id',
  /** column name */
  paymentId: 'paymentId',
  /** column name */
  projectId: 'projectId',
  /** column name */
  projectProviderId: 'projectProviderId',
  /** column name */
  refundId: 'refundId',
  /** column name */
  type: 'type',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type ProjectProviderTransactionLogSelectColumn = typeof ProjectProviderTransactionLogSelectColumn[keyof typeof ProjectProviderTransactionLogSelectColumn];
/** select "projectProviderTransactionLogAggregateBoolExpBool_andArgumentsColumns" columns of table "projectProviderTransactionLog" */
export const ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_andArgumentsColumns = {
  /** column name */
  confirmed: 'confirmed'
} as const;

export type ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_andArgumentsColumns = typeof ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_andArgumentsColumns[keyof typeof ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_andArgumentsColumns];
/** select "projectProviderTransactionLogAggregateBoolExpBool_orArgumentsColumns" columns of table "projectProviderTransactionLog" */
export const ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_orArgumentsColumns = {
  /** column name */
  confirmed: 'confirmed'
} as const;

export type ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_orArgumentsColumns = typeof ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_orArgumentsColumns[keyof typeof ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_orArgumentsColumns];
/** update columns of table "projectProviderTransactionLog" */
export const ProjectProviderTransactionLogUpdateColumn = {
  /** column name */
  amount: 'amount',
  /** column name */
  confirmed: 'confirmed',
  /** column name */
  currency: 'currency',
  /** column name */
  date: 'date',
  /** column name */
  deposit: 'deposit',
  /** column name */
  description: 'description',
  /** column name */
  fee: 'fee'
} as const;

export type ProjectProviderTransactionLogUpdateColumn = typeof ProjectProviderTransactionLogUpdateColumn[keyof typeof ProjectProviderTransactionLogUpdateColumn];
/** update columns of table "projectProvider" */
export const ProjectProviderUpdateColumn = {
  /** column name */
  isArchived: 'isArchived',
  /** column name */
  name: 'name',
  /** column name */
  projectId: 'projectId'
} as const;

export type ProjectProviderUpdateColumn = typeof ProjectProviderUpdateColumn[keyof typeof ProjectProviderUpdateColumn];
/** unique or primary key constraints on table "projectScript" */
export const ProjectScriptConstraint = {
  /** unique or primary key constraint on columns "id" */
  projectScript_pkey: 'projectScript_pkey',
  /** unique or primary key constraint on columns "projectId" */
  projectScript_projectId_key: 'projectScript_projectId_key'
} as const;

export type ProjectScriptConstraint = typeof ProjectScriptConstraint[keyof typeof ProjectScriptConstraint];
/** select columns of table "projectScript" */
export const ProjectScriptSelectColumn = {
  /** column name */
  code: 'code',
  /** column name */
  id: 'id'
} as const;

export type ProjectScriptSelectColumn = typeof ProjectScriptSelectColumn[keyof typeof ProjectScriptSelectColumn];
/** update columns of table "projectScript" */
export const ProjectScriptUpdateColumn = {
  /** column name */
  code: 'code',
  /** column name */
  functions: 'functions'
} as const;

export type ProjectScriptUpdateColumn = typeof ProjectScriptUpdateColumn[keyof typeof ProjectScriptUpdateColumn];
/** select columns of table "project" */
export const ProjectSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  defaultCurrency: 'defaultCurrency',
  /** column name */
  defaultReturnUrl: 'defaultReturnUrl',
  /** column name */
  defaultWebhookUrl: 'defaultWebhookUrl',
  /** column name */
  discordNotificationWebhook: 'discordNotificationWebhook',
  /** column name */
  enabledModules: 'enabledModules',
  /** column name */
  fullLogoUrl: 'fullLogoUrl',
  /** column name */
  googlePayMerchantId: 'googlePayMerchantId',
  /** column name */
  id: 'id',
  /** column name */
  logoUrl: 'logoUrl',
  /** column name */
  name: 'name',
  /** column name */
  paywallOptions: 'paywallOptions',
  /** column name */
  secretKey: 'secretKey',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type ProjectSelectColumn = typeof ProjectSelectColumn[keyof typeof ProjectSelectColumn];
export const ProvidersPaymentMethodId = {
  applepay: 'applepay',
  bank_transfer: 'bank_transfer',
  blik: 'blik',
  card: 'card',
  direct_carrier_billing: 'direct_carrier_billing',
  googlepay: 'googlepay',
  pay_by_link_alior: 'pay_by_link_alior',
  pay_by_link_alior_installments: 'pay_by_link_alior_installments',
  pay_by_link_allianz: 'pay_by_link_allianz',
  pay_by_link_applepay: 'pay_by_link_applepay',
  pay_by_link_bancontact: 'pay_by_link_bancontact',
  pay_by_link_blik: 'pay_by_link_blik',
  pay_by_link_blikpaylater: 'pay_by_link_blikpaylater',
  pay_by_link_bnpparibas: 'pay_by_link_bnpparibas',
  pay_by_link_bos: 'pay_by_link_bos',
  pay_by_link_card: 'pay_by_link_card',
  pay_by_link_city: 'pay_by_link_city',
  pay_by_link_creditagricole: 'pay_by_link_creditagricole',
  pay_by_link_crypto: 'pay_by_link_crypto',
  pay_by_link_getinbank: 'pay_by_link_getinbank',
  pay_by_link_googlepay: 'pay_by_link_googlepay',
  pay_by_link_idea: 'pay_by_link_idea',
  pay_by_link_ideal: 'pay_by_link_ideal',
  pay_by_link_ing: 'pay_by_link_ing',
  pay_by_link_inteligo: 'pay_by_link_inteligo',
  pay_by_link_klarna: 'pay_by_link_klarna',
  pay_by_link_mbank: 'pay_by_link_mbank',
  pay_by_link_mbank_installments: 'pay_by_link_mbank_installments',
  pay_by_link_milenium: 'pay_by_link_milenium',
  pay_by_link_neosurf: 'pay_by_link_neosurf',
  pay_by_link_nest: 'pay_by_link_nest',
  pay_by_link_neteller: 'pay_by_link_neteller',
  pay_by_link_noble: 'pay_by_link_noble',
  pay_by_link_nowy: 'pay_by_link_nowy',
  pay_by_link_paypal: 'pay_by_link_paypal',
  pay_by_link_paypo: 'pay_by_link_paypo',
  pay_by_link_paysafecard: 'pay_by_link_paysafecard',
  pay_by_link_paysafecash: 'pay_by_link_paysafecash',
  pay_by_link_payu_installments: 'pay_by_link_payu_installments',
  pay_by_link_pekao: 'pay_by_link_pekao',
  pay_by_link_pko: 'pay_by_link_pko',
  pay_by_link_plus: 'pay_by_link_plus',
  pay_by_link_pocztowy: 'pay_by_link_pocztowy',
  pay_by_link_pragmago: 'pay_by_link_pragmago',
  pay_by_link_przekaz: 'pay_by_link_przekaz',
  pay_by_link_revolut: 'pay_by_link_revolut',
  pay_by_link_santander: 'pay_by_link_santander',
  pay_by_link_skrill: 'pay_by_link_skrill',
  pay_by_link_skycash: 'pay_by_link_skycash',
  pay_by_link_spoldzielczy: 'pay_by_link_spoldzielczy',
  pay_by_link_toyota: 'pay_by_link_toyota',
  pay_by_link_twisto: 'pay_by_link_twisto',
  pay_by_link_unionpay: 'pay_by_link_unionpay',
  pay_by_link_velo: 'pay_by_link_velo',
  pay_by_link_volkswagen: 'pay_by_link_volkswagen',
  pay_by_link_webmoney: 'pay_by_link_webmoney',
  pay_by_link_wechat: 'pay_by_link_wechat',
  pay_by_link_zabka: 'pay_by_link_zabka',
  pay_by_link_zen: 'pay_by_link_zen',
  paywall: 'paywall',
  voucher: 'voucher'
} as const;

export type ProvidersPaymentMethodId = typeof ProvidersPaymentMethodId[keyof typeof ProvidersPaymentMethodId];
export const ProvidersPaymentProviderErrorReason = {
  AMOUNT_LIMIT_EXCEEDED: 'AMOUNT_LIMIT_EXCEEDED',
  BLIK_INVALID_CODE: 'BLIK_INVALID_CODE',
  CARD_THREE_DS_FAILED: 'CARD_THREE_DS_FAILED',
  DCB_DISABLED_PREMIUM_SERVICES: 'DCB_DISABLED_PREMIUM_SERVICES',
  DCB_INVALID_PHONE_NUMBER: 'DCB_INVALID_PHONE_NUMBER',
  DCB_INVALID_PIN: 'DCB_INVALID_PIN',
  DCB_UNSUPPORTED_BILLING_MODEL: 'DCB_UNSUPPORTED_BILLING_MODEL',
  DCB_UNSUPPORTED_OPERATOR: 'DCB_UNSUPPORTED_OPERATOR',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  INVALID_CONFIGURATION: 'INVALID_CONFIGURATION',
  TRANSACTION_TIMEOUT: 'TRANSACTION_TIMEOUT',
  UNKNOWN: 'UNKNOWN',
  UNSUPPORTED: 'UNSUPPORTED'
} as const;

export type ProvidersPaymentProviderErrorReason = typeof ProvidersPaymentProviderErrorReason[keyof typeof ProvidersPaymentProviderErrorReason];
export const ProvidersPaymentProviderType = {
  adyen: 'adyen',
  autopay: 'autopay',
  cashbill: 'cashbill',
  coinbase: 'coinbase',
  coingate: 'coingate',
  dpay: 'dpay',
  dvpass: 'dvpass',
  espago: 'espago',
  fenige: 'fenige',
  igoriaPay: 'igoriaPay',
  imoje: 'imoje',
  mock: 'mock',
  montonio: 'montonio',
  p24: 'p24',
  paycadoo: 'paycadoo',
  paymenterio: 'paymenterio',
  paymentsos: 'paymentsos',
  paynow: 'paynow',
  paytel: 'paytel',
  payu: 'payu',
  tpay: 'tpay',
  vimoni: 'vimoni',
  zen: 'zen'
} as const;

export type ProvidersPaymentProviderType = typeof ProvidersPaymentProviderType[keyof typeof ProvidersPaymentProviderType];
export const ProvidersPaymentStatus = {
  PAID: 'PAID',
  PENDING: 'PENDING',
  REFUNDED: 'REFUNDED',
  REJECTED: 'REJECTED'
} as const;

export type ProvidersPaymentStatus = typeof ProvidersPaymentStatus[keyof typeof ProvidersPaymentStatus];
export const ProvidersRecurringProcessingModel = {
  CARD_ON_FILE: 'CARD_ON_FILE',
  SUBSCRIPTION: 'SUBSCRIPTION',
  UNSCHEDULED_CARD_ON_FILE: 'UNSCHEDULED_CARD_ON_FILE'
} as const;

export type ProvidersRecurringProcessingModel = typeof ProvidersRecurringProcessingModel[keyof typeof ProvidersRecurringProcessingModel];
export const ProvidersRefundStatus = {
  ACCEPTED: 'ACCEPTED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED'
} as const;

export type ProvidersRefundStatus = typeof ProvidersRefundStatus[keyof typeof ProvidersRefundStatus];
/** select columns of table "reconciliation" */
export const ReconciliationSelectColumn = {
  /** column name */
  checked: 'checked',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  errors: 'errors',
  /** column name */
  id: 'id',
  /** column name */
  invalid: 'invalid',
  /** column name */
  path: 'path',
  /** column name */
  projectId: 'projectId',
  /** column name */
  total: 'total',
  /** column name */
  updated: 'updated',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type ReconciliationSelectColumn = typeof ReconciliationSelectColumn[keyof typeof ReconciliationSelectColumn];
/** select columns of table "refund" */
export const RefundSelectColumn = {
  /** column name */
  amount: 'amount',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  externalId: 'externalId',
  /** column name */
  id: 'id',
  /** column name */
  merchantId: 'merchantId',
  /** column name */
  orderCurrencyAmount: 'orderCurrencyAmount',
  /** column name */
  paymentId: 'paymentId',
  /** column name */
  reason: 'reason',
  /** column name */
  status: 'status',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type RefundSelectColumn = typeof RefundSelectColumn[keyof typeof RefundSelectColumn];
export const RefundStatusEnum = {
  ACCEPTED: 'ACCEPTED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED'
} as const;

export type RefundStatusEnum = typeof RefundStatusEnum[keyof typeof RefundStatusEnum];
/** select columns of table "relatedCustomers" */
export const RelatedCustomersSelectColumn = {
  /** column name */
  customerId: 'customerId',
  /** column name */
  projectId: 'projectId',
  /** column name */
  relatedCustomerId: 'relatedCustomerId'
} as const;

export type RelatedCustomersSelectColumn = typeof RelatedCustomersSelectColumn[keyof typeof RelatedCustomersSelectColumn];
/** unique or primary key constraints on table "subscription" */
export const SubscriptionConstraint = {
  /** unique or primary key constraint on columns "id" */
  subscription_pkey: 'subscription_pkey'
} as const;

export type SubscriptionConstraint = typeof SubscriptionConstraint[keyof typeof SubscriptionConstraint];
export const SubscriptionIntervalEnum = {
  CUSTOM: 'CUSTOM',
  MINUTELY: 'MINUTELY',
  MONTHLY: 'MONTHLY',
  WEEKLY: 'WEEKLY'
} as const;

export type SubscriptionIntervalEnum = typeof SubscriptionIntervalEnum[keyof typeof SubscriptionIntervalEnum];
/** unique or primary key constraints on table "subscriptionItem" */
export const SubscriptionItemConstraint = {
  /** unique or primary key constraint on columns "id" */
  subscriptionProduct_pkey: 'subscriptionProduct_pkey'
} as const;

export type SubscriptionItemConstraint = typeof SubscriptionItemConstraint[keyof typeof SubscriptionItemConstraint];
/** unique or primary key constraints on table "subscriptionItemPause" */
export const SubscriptionItemPauseConstraint = {
  /** unique or primary key constraint on columns "id" */
  subscriptionProductPause_pkey: 'subscriptionProductPause_pkey'
} as const;

export type SubscriptionItemPauseConstraint = typeof SubscriptionItemPauseConstraint[keyof typeof SubscriptionItemPauseConstraint];
/** select columns of table "subscriptionItemPause" */
export const SubscriptionItemPauseSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  endsAt: 'endsAt',
  /** column name */
  id: 'id',
  /** column name */
  startsAt: 'startsAt',
  /** column name */
  subscriptionItemId: 'subscriptionItemId'
} as const;

export type SubscriptionItemPauseSelectColumn = typeof SubscriptionItemPauseSelectColumn[keyof typeof SubscriptionItemPauseSelectColumn];
/** update columns of table "subscriptionItemPause" */
export const SubscriptionItemPauseUpdateColumn = {
  /** column name */
  deletedAt: 'deletedAt'
} as const;

export type SubscriptionItemPauseUpdateColumn = typeof SubscriptionItemPauseUpdateColumn[keyof typeof SubscriptionItemPauseUpdateColumn];
/** unique or primary key constraints on table "subscriptionItemPrice" */
export const SubscriptionItemPriceConstraint = {
  /** unique or primary key constraint on columns "id" */
  subscriptionItemPrice_pkey: 'subscriptionItemPrice_pkey'
} as const;

export type SubscriptionItemPriceConstraint = typeof SubscriptionItemPriceConstraint[keyof typeof SubscriptionItemPriceConstraint];
/** select columns of table "subscriptionItemPrice" */
export const SubscriptionItemPriceSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  id: 'id',
  /** column name */
  price: 'price',
  /** column name */
  qty: 'qty',
  /** column name */
  startsAt: 'startsAt',
  /** column name */
  subscriptionItemId: 'subscriptionItemId'
} as const;

export type SubscriptionItemPriceSelectColumn = typeof SubscriptionItemPriceSelectColumn[keyof typeof SubscriptionItemPriceSelectColumn];
/** placeholder for update columns of table "subscriptionItemPrice" (current role has no relevant permissions) */
export const SubscriptionItemPriceUpdateColumn = {
  /** placeholder (do not use) */
  _PLACEHOLDER: '_PLACEHOLDER'
} as const;

export type SubscriptionItemPriceUpdateColumn = typeof SubscriptionItemPriceUpdateColumn[keyof typeof SubscriptionItemPriceUpdateColumn];
/** select columns of table "subscriptionItem" */
export const SubscriptionItemSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  details: 'details',
  /** column name */
  endsAt: 'endsAt',
  /** column name */
  externalId: 'externalId',
  /** column name */
  externalProductId: 'externalProductId',
  /** column name */
  id: 'id',
  /** column name */
  imageUrl: 'imageUrl',
  /** column name */
  name: 'name',
  /** column name */
  productId: 'productId',
  /** column name */
  startsAt: 'startsAt',
  /** column name */
  subscriptionId: 'subscriptionId',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type SubscriptionItemSelectColumn = typeof SubscriptionItemSelectColumn[keyof typeof SubscriptionItemSelectColumn];
/** update columns of table "subscriptionItem" */
export const SubscriptionItemUpdateColumn = {
  /** column name */
  details: 'details',
  /** column name */
  endsAt: 'endsAt',
  /** column name */
  externalId: 'externalId',
  /** column name */
  externalProductId: 'externalProductId',
  /** column name */
  imageUrl: 'imageUrl',
  /** column name */
  name: 'name',
  /** column name */
  productId: 'productId'
} as const;

export type SubscriptionItemUpdateColumn = typeof SubscriptionItemUpdateColumn[keyof typeof SubscriptionItemUpdateColumn];
/** select columns of table "subscription" */
export const SubscriptionSelectColumn = {
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  currency: 'currency',
  /** column name */
  currentBillingDate: 'currentBillingDate',
  /** column name */
  customInterval: 'customInterval',
  /** column name */
  customerId: 'customerId',
  /** column name */
  deletedAt: 'deletedAt',
  /** column name */
  eventId: 'eventId',
  /** column name */
  firstBillingDate: 'firstBillingDate',
  /** column name */
  id: 'id',
  /** column name */
  interval: 'interval',
  /** column name */
  lastBillingDate: 'lastBillingDate',
  /** column name */
  paymentInAdvance: 'paymentInAdvance',
  /** column name */
  paymentMethod: 'paymentMethod',
  /** column name */
  paymentTokenId: 'paymentTokenId',
  /** column name */
  title: 'title',
  /** column name */
  updatedAt: 'updatedAt',
  /** column name */
  webhookUrl: 'webhookUrl'
} as const;

export type SubscriptionSelectColumn = typeof SubscriptionSelectColumn[keyof typeof SubscriptionSelectColumn];
/** select "SubscriptionAggregateBoolExpBool_andArgumentsColumns" columns of table "subscription" */
export const SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_andArgumentsColumns = {
  /** column name */
  paymentInAdvance: 'paymentInAdvance'
} as const;

export type SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_andArgumentsColumns = typeof SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_andArgumentsColumns[keyof typeof SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_andArgumentsColumns];
/** select "SubscriptionAggregateBoolExpBool_orArgumentsColumns" columns of table "subscription" */
export const SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_orArgumentsColumns = {
  /** column name */
  paymentInAdvance: 'paymentInAdvance'
} as const;

export type SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_orArgumentsColumns = typeof SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_orArgumentsColumns[keyof typeof SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_orArgumentsColumns];
/** update columns of table "subscription" */
export const SubscriptionUpdateColumn = {
  /** column name */
  deletedAt: 'deletedAt',
  /** column name */
  paymentInAdvance: 'paymentInAdvance',
  /** column name */
  paymentMethod: 'paymentMethod',
  /** column name */
  paymentTokenId: 'paymentTokenId',
  /** column name */
  webhookUrl: 'webhookUrl'
} as const;

export type SubscriptionUpdateColumn = typeof SubscriptionUpdateColumn[keyof typeof SubscriptionUpdateColumn];
/** select columns of table "suspectCustomer" */
export const SuspectCustomerSelectColumn = {
  /** column name */
  cardsCount: 'cardsCount',
  /** column name */
  customerId: 'customerId',
  /** column name */
  fingerprintsCount: 'fingerprintsCount',
  /** column name */
  ipsCount: 'ipsCount',
  /** column name */
  maxCreatedAt: 'maxCreatedAt',
  /** column name */
  projectId: 'projectId',
  /** column name */
  rejectedPaymentsCount: 'rejectedPaymentsCount'
} as const;

export type SuspectCustomerSelectColumn = typeof SuspectCustomerSelectColumn[keyof typeof SuspectCustomerSelectColumn];
/** select columns of table "suspectFingerprint" */
export const SuspectFingerprintSelectColumn = {
  /** column name */
  customerCount: 'customerCount',
  /** column name */
  fingerprintId: 'fingerprintId',
  /** column name */
  maxCreatedAt: 'maxCreatedAt',
  /** column name */
  projectId: 'projectId'
} as const;

export type SuspectFingerprintSelectColumn = typeof SuspectFingerprintSelectColumn[keyof typeof SuspectFingerprintSelectColumn];
/** select columns of table "suspectIp" */
export const SuspectIpSelectColumn = {
  /** column name */
  customerCount: 'customerCount',
  /** column name */
  ip: 'ip',
  /** column name */
  maxCreatedAt: 'maxCreatedAt'
} as const;

export type SuspectIpSelectColumn = typeof SuspectIpSelectColumn[keyof typeof SuspectIpSelectColumn];
/** select columns of table "transactionLogSummary" */
export const TransactionLogSummarySelectColumn = {
  /** column name */
  amount: 'amount',
  /** column name */
  currency: 'currency',
  /** column name */
  date: 'date',
  /** column name */
  deposit: 'deposit',
  /** column name */
  fee: 'fee',
  /** column name */
  projectId: 'projectId',
  /** column name */
  projectProviderId: 'projectProviderId',
  /** column name */
  type: 'type'
} as const;

export type TransactionLogSummarySelectColumn = typeof TransactionLogSummarySelectColumn[keyof typeof TransactionLogSummarySelectColumn];
export const TransactionTypeEnum = {
  CHARGEBACK: 'CHARGEBACK',
  OTHER: 'OTHER',
  PAYMENT: 'PAYMENT',
  REFUND: 'REFUND',
  WITHDRAW: 'WITHDRAW'
} as const;

export type TransactionTypeEnum = typeof TransactionTypeEnum[keyof typeof TransactionTypeEnum];
/** unique or primary key constraints on table "voucherGroup" */
export const VoucherGroupConstraint = {
  /** unique or primary key constraint on columns "id" */
  voucherGroup_pkey: 'voucherGroup_pkey'
} as const;

export type VoucherGroupConstraint = typeof VoucherGroupConstraint[keyof typeof VoucherGroupConstraint];
/** select columns of table "voucherGroupMeta" */
export const VoucherGroupMetaSelectColumn = {
  /** column name */
  balanceSum: 'balanceSum',
  /** column name */
  count: 'count',
  /** column name */
  id: 'id',
  /** column name */
  startBalanceSum: 'startBalanceSum'
} as const;

export type VoucherGroupMetaSelectColumn = typeof VoucherGroupMetaSelectColumn[keyof typeof VoucherGroupMetaSelectColumn];
/** select columns of table "voucherGroup" */
export const VoucherGroupSelectColumn = {
  /** column name */
  codeLength: 'codeLength',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  currency: 'currency',
  /** column name */
  endsAt: 'endsAt',
  /** column name */
  id: 'id',
  /** column name */
  name: 'name',
  /** column name */
  startsAt: 'startsAt',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type VoucherGroupSelectColumn = typeof VoucherGroupSelectColumn[keyof typeof VoucherGroupSelectColumn];
/** update columns of table "voucherGroup" */
export const VoucherGroupUpdateColumn = {
  /** column name */
  codeLength: 'codeLength',
  /** column name */
  currency: 'currency',
  /** column name */
  endsAt: 'endsAt',
  /** column name */
  id: 'id',
  /** column name */
  name: 'name',
  /** column name */
  projectId: 'projectId',
  /** column name */
  startsAt: 'startsAt'
} as const;

export type VoucherGroupUpdateColumn = typeof VoucherGroupUpdateColumn[keyof typeof VoucherGroupUpdateColumn];
/** select columns of table "voucher" */
export const VoucherSelectColumn = {
  /** column name */
  code: 'code',
  /** column name */
  createdAt: 'createdAt',
  /** column name */
  generationId: 'generationId',
  /** column name */
  groupId: 'groupId',
  /** column name */
  id: 'id',
  /** column name */
  isArchived: 'isArchived',
  /** column name */
  projectId: 'projectId',
  /** column name */
  startBalance: 'startBalance',
  /** column name */
  updatedAt: 'updatedAt'
} as const;

export type VoucherSelectColumn = typeof VoucherSelectColumn[keyof typeof VoucherSelectColumn];
/** select "voucherAggregateBoolExpBool_andArgumentsColumns" columns of table "voucher" */
export const VoucherSelectColumnVoucherAggregateBoolExpBool_andArgumentsColumns = {
  /** column name */
  isArchived: 'isArchived'
} as const;

export type VoucherSelectColumnVoucherAggregateBoolExpBool_andArgumentsColumns = typeof VoucherSelectColumnVoucherAggregateBoolExpBool_andArgumentsColumns[keyof typeof VoucherSelectColumnVoucherAggregateBoolExpBool_andArgumentsColumns];
/** select "voucherAggregateBoolExpBool_orArgumentsColumns" columns of table "voucher" */
export const VoucherSelectColumnVoucherAggregateBoolExpBool_orArgumentsColumns = {
  /** column name */
  isArchived: 'isArchived'
} as const;

export type VoucherSelectColumnVoucherAggregateBoolExpBool_orArgumentsColumns = typeof VoucherSelectColumnVoucherAggregateBoolExpBool_orArgumentsColumns[keyof typeof VoucherSelectColumnVoucherAggregateBoolExpBool_orArgumentsColumns];