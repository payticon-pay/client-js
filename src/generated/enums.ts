/** select columns of table "apiKey" */
export enum ApiKeySelectColumn {
  /** column name */
  key = 'key'
}

/** ordering argument of a cursor */
export enum AuthCursorOrdering {
  /** ascending ordering of the cursor */
  ASC = 'ASC',
  /** descending ordering of the cursor */
  DESC = 'DESC'
}

/** select columns of table "invitation" */
export enum AuthInvitationSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  email = 'email',
  /** column name */
  group = 'group',
  /** column name */
  id = 'id',
  /** column name */
  invitedById = 'invitedById',
  /** column name */
  role = 'role',
  /** column name */
  userData = 'userData',
  /** column name */
  validTo = 'validTo'
}

/** column ordering options */
export enum AuthOrderBy {
  /** in ascending order, nulls last */
  ASC = 'ASC',
  /** in ascending order, nulls first */
  ASC_NULLS_FIRST = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  ASC_NULLS_LAST = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  DESC = 'DESC',
  /** in descending order, nulls first */
  DESC_NULLS_FIRST = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DESC_NULLS_LAST = 'DESC_NULLS_LAST'
}

/** unique or primary key constraints on table "projectTemplate" */
export enum AuthProjectTemplateConstraint {
  /** unique or primary key constraint on columns "template", "projectId" */
  projectTemplate_pkey = 'projectTemplate_pkey'
}

/** select columns of table "projectTemplate" */
export enum AuthProjectTemplateSelectColumn {
  /** column name */
  template = 'template',
  /** column name */
  value = 'value'
}

/** update columns of table "projectTemplate" */
export enum AuthProjectTemplateUpdateColumn {
  /** column name */
  value = 'value'
}

/** select columns of table "session" */
export enum AuthSessionSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  device = 'device',
  /** column name */
  expireAt = 'expireAt',
  /** column name */
  forceRefresh = 'forceRefresh',
  /** column name */
  id = 'id',
  /** column name */
  ip = 'ip',
  /** column name */
  refreshCount = 'refreshCount',
  /** column name */
  refreshedAt = 'refreshedAt',
  /** column name */
  userId = 'userId'
}

export enum AuthTemplateEnum {
  EMAIL_CHANGE_EMAIL = 'EMAIL_CHANGE_EMAIL',
  EMAIL_CONFIRM_EMAIL = 'EMAIL_CONFIRM_EMAIL',
  EMAIL_INVITATION = 'EMAIL_INVITATION',
  EMAIL_RESET_PASSWORD = 'EMAIL_RESET_PASSWORD',
  SMS_CONFIRM_NUMBER = 'SMS_CONFIRM_NUMBER'
}

/** unique or primary key constraints on table "userRole" */
export enum AuthUserRoleConstraint {
  /** unique or primary key constraint on columns "id" */
  userRole_pkey = 'userRole_pkey',
  /** unique or primary key constraint on columns "userId", "group" */
  user_gorup = 'user_gorup'
}

/** select columns of table "userRole" */
export enum AuthUserRoleSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  group = 'group',
  /** column name */
  id = 'id',
  /** column name */
  role = 'role',
  /** column name */
  userId = 'userId'
}

/** update columns of table "userRole" */
export enum AuthUserRoleUpdateColumn {
  /** column name */
  role = 'role'
}

/** select columns of table "user" */
export enum AuthUserSelectColumn {
  /** column name */
  claims = 'claims',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  deprecatedEmailVerifyToken = 'deprecatedEmailVerifyToken',
  /** column name */
  email = 'email',
  /** column name */
  emailVerified = 'emailVerified',
  /** column name */
  facebookId = 'facebookId',
  /** column name */
  firstName = 'firstName',
  /** column name */
  googleId = 'googleId',
  /** column name */
  id = 'id',
  /** column name */
  isBlocked = 'isBlocked',
  /** column name */
  isGuest = 'isGuest',
  /** column name */
  lastName = 'lastName',
  /** column name */
  marketingConsent = 'marketingConsent',
  /** column name */
  password = 'password',
  /** column name */
  phone = 'phone',
  /** column name */
  phoneVerified = 'phoneVerified',
  /** column name */
  poolId = 'poolId',
  /** column name */
  registerIp = 'registerIp',
  /** column name */
  role = 'role',
  /** column name */
  setPasswordToken = 'setPasswordToken',
  /** column name */
  updatedAt = 'updatedAt',
  /** column name */
  username = 'username'
}

/** select columns of table "card" */
export enum CardSelectColumn {
  /** column name */
  first6digits = 'first6digits',
  /** column name */
  id = 'id',
  /** column name */
  last4digits = 'last4digits'
}

/** unique or primary key constraints on table "chargeback" */
export enum ChargebackConstraint {
  /** unique or primary key constraint on columns "id" */
  chargeback_pkey = 'chargeback_pkey',
  /** unique or primary key constraint on columns "providerChargebackId" */
  chargeback_providerChargebackId_key = 'chargeback_providerChargebackId_key'
}

/** select columns of table "chargeback" */
export enum ChargebackSelectColumn {
  /** column name */
  arn = 'arn',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  delivery = 'delivery',
  /** column name */
  deliveryType = 'deliveryType',
  /** column name */
  id = 'id',
  /** column name */
  paymentId = 'paymentId',
  /** column name */
  providerChargebackId = 'providerChargebackId',
  /** column name */
  reason = 'reason',
  /** column name */
  rrn = 'rrn',
  /** column name */
  terms = 'terms',
  /** column name */
  tripleDes = 'tripleDes',
  /** column name */
  updatedAt = 'updatedAt'
}

export enum ChargebackStatusEnum {
  ACTION_REQUIRED = 'ACTION_REQUIRED',
  APPEALABLE = 'APPEALABLE',
  AWAITING_RESPONSE = 'AWAITING_RESPONSE',
  CREATED = 'CREATED',
  LOST = 'LOST',
  REVIEW = 'REVIEW',
  WON = 'WON'
}

/** unique or primary key constraints on table "chargebackStatusHistory" */
export enum ChargebackStatusHistoryConstraint {
  /** unique or primary key constraint on columns "id" */
  chargebackStatusHistory_pkey = 'chargebackStatusHistory_pkey'
}

/** select columns of table "chargebackStatusHistory" */
export enum ChargebackStatusHistorySelectColumn {
  /** column name */
  chargebackId = 'chargebackId',
  /** column name */
  date = 'date',
  /** column name */
  email = 'email',
  /** column name */
  emailSender = 'emailSender',
  /** column name */
  id = 'id',
  /** column name */
  status = 'status'
}

/** update columns of table "chargebackStatusHistory" */
export enum ChargebackStatusHistoryUpdateColumn {
  /** column name */
  date = 'date',
  /** column name */
  email = 'email',
  /** column name */
  emailSender = 'emailSender',
  /** column name */
  status = 'status'
}

/** select columns of table "chargebackSummary" */
export enum ChargebackSummarySelectColumn {
  /** column name */
  count = 'count',
  /** column name */
  currency = 'currency',
  /** column name */
  date = 'date',
  /** column name */
  status = 'status',
  /** column name */
  sum = 'sum'
}

/** update columns of table "chargeback" */
export enum ChargebackUpdateColumn {
  /** column name */
  delivery = 'delivery',
  /** column name */
  deliveryType = 'deliveryType',
  /** column name */
  terms = 'terms',
  /** column name */
  tripleDes = 'tripleDes'
}

export enum CurrencyEnum {
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NOK = 'NOK',
  PLN = 'PLN',
  USD = 'USD'
}

/** select columns of table "currencyProfit" */
export enum CurrencyProfitSelectColumn {
  /** column name */
  date = 'date',
  /** column name */
  from = 'from',
  /** column name */
  profit = 'profit',
  /** column name */
  to = 'to'
}

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  ASC = 'ASC',
  /** descending ordering of the cursor */
  DESC = 'DESC'
}

/** select columns of table "customerCards" */
export enum CustomerCardsSelectColumn {
  /** column name */
  cardId = 'cardId',
  /** column name */
  customerId = 'customerId',
  /** column name */
  projectId = 'projectId',
  /** column name */
  transactionCount = 'transactionCount'
}

/** unique or primary key constraints on table "customer" */
export enum CustomerConstraint {
  /** unique or primary key constraint on columns "id", "projectId" */
  customer_pkey = 'customer_pkey'
}

/** select columns of table "customerDevices" */
export enum CustomerDevicesSelectColumn {
  /** column name */
  customerId = 'customerId',
  /** column name */
  projectId = 'projectId',
  /** column name */
  transactionCount = 'transactionCount',
  /** column name */
  userAgentHeader = 'userAgentHeader',
  /** column name */
  userAgentResults = 'userAgentResults'
}

/** select columns of table "customerFingerprints" */
export enum CustomerFingerprintsSelectColumn {
  /** column name */
  customerId = 'customerId',
  /** column name */
  fingerprintId = 'fingerprintId',
  /** column name */
  projectId = 'projectId',
  /** column name */
  transactionCount = 'transactionCount'
}

/** select columns of table "customerFraudScoreLog" */
export enum CustomerFraudScoreLogSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  customerId = 'customerId',
  /** column name */
  description = 'description',
  /** column name */
  fraudScore = 'fraudScore',
  /** column name */
  id = 'id',
  /** column name */
  oldFraudScore = 'oldFraudScore',
  /** column name */
  projectId = 'projectId',
  /** column name */
  updatedAt = 'updatedAt'
}

/** select columns of table "customerIps" */
export enum CustomerIpsSelectColumn {
  /** column name */
  customerId = 'customerId',
  /** column name */
  ip = 'ip',
  /** column name */
  projectId = 'projectId',
  /** column name */
  transactionCount = 'transactionCount'
}

/** select columns of table "customer" */
export enum CustomerSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  email = 'email',
  /** column name */
  firstName = 'firstName',
  /** column name */
  fraudScore = 'fraudScore',
  /** column name */
  id = 'id',
  /** column name */
  lastName = 'lastName',
  /** column name */
  projectId = 'projectId',
  /** column name */
  stripeVerificationSessionId = 'stripeVerificationSessionId'
}

/** update columns of table "customer" */
export enum CustomerUpdateColumn {
  /** column name */
  email = 'email',
  /** column name */
  firstName = 'firstName',
  /** column name */
  lastName = 'lastName'
}

/** select columns of table "fingerprint" */
export enum FingerprintSelectColumn {
  /** column name */
  fraudScore = 'fraudScore',
  /** column name */
  id = 'id'
}

/** select columns of table "geo.country" */
export enum GeoCountrySelectColumn {
  /** column name */
  capital = 'capital',
  /** column name */
  continent = 'continent',
  /** column name */
  currencies = 'currencies',
  /** column name */
  id = 'id',
  /** column name */
  languages = 'languages',
  /** column name */
  name = 'name',
  /** column name */
  nativeName = 'nativeName',
  /** column name */
  phonePrefixes = 'phonePrefixes'
}

export enum IntegrationTypeEnum {
  FINGERPRINT = 'FINGERPRINT',
  STRIPE = 'STRIPE'
}

/** select columns of table "money.card" */
export enum MoneyCardSelectColumn {
  /** column name */
  countryCode = 'countryCode',
  /** column name */
  issuer = 'issuer',
  /** column name */
  organization = 'organization',
  /** column name */
  prefix = 'prefix',
  /** column name */
  product = 'product',
  /** column name */
  segment = 'segment',
  /** column name */
  type = 'type'
}

export enum MoneyCurrencyEnum {
  AUD = 'AUD',
  BGN = 'BGN',
  CAD = 'CAD',
  CHF = 'CHF',
  CZK = 'CZK',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  HRK = 'HRK',
  HUF = 'HUF',
  JPY = 'JPY',
  LTL = 'LTL',
  NOK = 'NOK',
  PLN = 'PLN',
  ROL = 'ROL',
  RUR = 'RUR',
  SEK = 'SEK',
  TRL = 'TRL',
  UAH = 'UAH',
  USD = 'USD'
}

/** select columns of table "money.currency" */
export enum MoneyCurrencySelectColumn {
  /** column name */
  code = 'code'
}

/** select columns of table "money.exchangeRate" */
export enum MoneyExchangeRateSelectColumn {
  /** column name */
  from = 'from',
  /** column name */
  rate = 'rate',
  /** column name */
  to = 'to'
}

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  ASC = 'ASC',
  /** in ascending order, nulls first */
  ASC_NULLS_FIRST = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  ASC_NULLS_LAST = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  DESC = 'DESC',
  /** in descending order, nulls first */
  DESC_NULLS_FIRST = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DESC_NULLS_LAST = 'DESC_NULLS_LAST'
}

/** unique or primary key constraints on table "order" */
export enum OrderConstraint {
  /** unique or primary key constraint on columns "merchantId", "projectId" */
  order_merchantId = 'order_merchantId',
  /** unique or primary key constraint on columns "id" */
  order_pkey = 'order_pkey'
}

/** unique or primary key constraints on table "orderItem" */
export enum OrderItemConstraint {
  /** unique or primary key constraint on columns "id" */
  orderItem_pkey = 'orderItem_pkey'
}

/** select columns of table "orderItem" */
export enum OrderItemSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  details = 'details',
  /** column name */
  id = 'id',
  /** column name */
  name = 'name',
  /** column name */
  orderId = 'orderId',
  /** column name */
  price = 'price',
  /** column name */
  productId = 'productId',
  /** column name */
  qty = 'qty',
  /** column name */
  updatedAt = 'updatedAt'
}

/** placeholder for update columns of table "orderItem" (current role has no relevant permissions) */
export enum OrderItemUpdateColumn {
  /** placeholder (do not use) */
  _PLACEHOLDER = '_PLACEHOLDER'
}

/** unique or primary key constraints on table "orderPriceModification" */
export enum OrderPriceModificationConstraint {
  /** unique or primary key constraint on columns "id" */
  orderPriceModyfikator_pkey = 'orderPriceModyfikator_pkey'
}

/** select columns of table "orderPriceModification" */
export enum OrderPriceModificationSelectColumn {
  /** column name */
  amount = 'amount',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  description = 'description',
  /** column name */
  id = 'id',
  /** column name */
  orderId = 'orderId'
}

/** placeholder for update columns of table "orderPriceModification" (current role has no relevant permissions) */
export enum OrderPriceModificationUpdateColumn {
  /** placeholder (do not use) */
  _PLACEHOLDER = '_PLACEHOLDER'
}

/** select columns of table "order" */
export enum OrderSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  currency = 'currency',
  /** column name */
  customerId = 'customerId',
  /** column name */
  id = 'id',
  /** column name */
  ip = 'ip',
  /** column name */
  merchantId = 'merchantId',
  /** column name */
  metadata = 'metadata',
  /** column name */
  price = 'price',
  /** column name */
  projectId = 'projectId',
  /** column name */
  returnUrl = 'returnUrl',
  /** column name */
  status = 'status',
  /** column name */
  subscriptionId = 'subscriptionId',
  /** column name */
  title = 'title',
  /** column name */
  updatedAt = 'updatedAt',
  /** column name */
  webhookUrl = 'webhookUrl'
}

export enum OrderStatusEnum {
  CREATED = 'CREATED',
  EXPIRED = 'EXPIRED',
  PAID = 'PAID',
  PENDING = 'PENDING',
  REFUNDED = 'REFUNDED',
  REJECTED = 'REJECTED',
  SUSPICIOUS = 'SUSPICIOUS'
}

/** select columns of table "orderSummary" */
export enum OrderSummarySelectColumn {
  /** column name */
  count = 'count',
  /** column name */
  currency = 'currency',
  /** column name */
  dailyAverageSum = 'dailyAverageSum',
  /** column name */
  date = 'date',
  /** column name */
  status = 'status',
  /** column name */
  sum = 'sum'
}

/** update columns of table "order" */
export enum OrderUpdateColumn {
  /** column name */
  merchantId = 'merchantId',
  /** column name */
  metadata = 'metadata',
  /** column name */
  status = 'status',
  /** column name */
  title = 'title'
}

/** select columns of table "paymentByError" */
export enum PaymentByErrorSelectColumn {
  /** column name */
  count = 'count',
  /** column name */
  currency = 'currency',
  /** column name */
  date = 'date',
  /** column name */
  error = 'error',
  /** column name */
  errorMessage = 'errorMessage',
  /** column name */
  projectId = 'projectId',
  /** column name */
  projectProviderId = 'projectProviderId'
}

/** select columns of table "paymentByMethod" */
export enum PaymentByMethodSelectColumn {
  /** column name */
  amount = 'amount',
  /** column name */
  count = 'count',
  /** column name */
  currency = 'currency',
  /** column name */
  date = 'date',
  /** column name */
  paymentMethodId = 'paymentMethodId',
  /** column name */
  projectId = 'projectId',
  /** column name */
  status = 'status'
}

/** select columns of table "payment" */
export enum PaymentSelectColumn {
  /** column name */
  acceptHeader = 'acceptHeader',
  /** column name */
  amount = 'amount',
  /** column name */
  amountWithoutMargin = 'amountWithoutMargin',
  /** column name */
  cardId = 'cardId',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  currency = 'currency',
  /** column name */
  error = 'error',
  /** column name */
  errorMessage = 'errorMessage',
  /** column name */
  exchangeMargin = 'exchangeMargin',
  /** column name */
  exchangeRate = 'exchangeRate',
  /** column name */
  exchangeRateWithoutMargin = 'exchangeRateWithoutMargin',
  /** column name */
  externalId = 'externalId',
  /** column name */
  fingerprintId = 'fingerprintId',
  /** column name */
  id = 'id',
  /** column name */
  ip = 'ip',
  /** column name */
  isManual = 'isManual',
  /** column name */
  merchantId = 'merchantId',
  /** column name */
  metadata = 'metadata',
  /** column name */
  orderCurrencyAmount = 'orderCurrencyAmount',
  /** column name */
  orderId = 'orderId',
  /** column name */
  paymentMethodId = 'paymentMethodId',
  /** column name */
  paymentTokenId = 'paymentTokenId',
  /** column name */
  projectProviderId = 'projectProviderId',
  /** column name */
  redirectUrl = 'redirectUrl',
  /** column name */
  rejectReason = 'rejectReason',
  /** column name */
  status = 'status',
  /** column name */
  updatedAt = 'updatedAt',
  /** column name */
  userAgentHeader = 'userAgentHeader',
  /** column name */
  userAgentResults = 'userAgentResults',
  /** column name */
  voucherId = 'voucherId'
}

export enum PaymentStatusEnum {
  PAID = 'PAID',
  PENDING = 'PENDING',
  REFUNDED = 'REFUNDED',
  REJECTED = 'REJECTED'
}

/** select columns of table "paymentSummary" */
export enum PaymentSummarySelectColumn {
  /** column name */
  count = 'count',
  /** column name */
  currency = 'currency',
  /** column name */
  date = 'date',
  /** column name */
  projectProviderId = 'projectProviderId',
  /** column name */
  status = 'status'
}

/** select columns of table "paymentToken" */
export enum PaymentTokenSelectColumn {
  /** column name */
  cardId = 'cardId',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  customerId = 'customerId',
  /** column name */
  id = 'id',
  /** column name */
  name = 'name',
  /** column name */
  type = 'type',
  /** column name */
  updatedAt = 'updatedAt'
}

export enum PaymentTokenTypeEnum {
  BLIK = 'BLIK',
  CARD = 'CARD'
}

/** unique or primary key constraints on table "product" */
export enum ProductConstraint {
  /** unique or primary key constraint on columns "id" */
  subscriptionProduct_pkey1 = 'subscriptionProduct_pkey1'
}

/** select columns of table "product" */
export enum ProductSelectColumn {
  /** column name */
  additionalParameters = 'additionalParameters',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  currency = 'currency',
  /** column name */
  customInterval = 'customInterval',
  /** column name */
  deletedAt = 'deletedAt',
  /** column name */
  externalId = 'externalId',
  /** column name */
  id = 'id',
  /** column name */
  imageUrl = 'imageUrl',
  /** column name */
  name = 'name',
  /** column name */
  price = 'price',
  /** column name */
  projectId = 'projectId',
  /** column name */
  subscriptionInterval = 'subscriptionInterval'
}

/** update columns of table "product" */
export enum ProductUpdateColumn {
  /** column name */
  additionalParameters = 'additionalParameters',
  /** column name */
  deletedAt = 'deletedAt',
  /** column name */
  imageUrl = 'imageUrl',
  /** column name */
  name = 'name',
  /** column name */
  price = 'price'
}

/** unique or primary key constraints on table "projectCurrencyExchangeMargin" */
export enum ProjectCurrencyExchangeMarginConstraint {
  /** unique or primary key constraint on columns "from", "to", "projectId" */
  projectCurrencyExchangeMagin_pkey = 'projectCurrencyExchangeMagin_pkey'
}

/** select columns of table "projectCurrencyExchangeMargin" */
export enum ProjectCurrencyExchangeMarginSelectColumn {
  /** column name */
  from = 'from',
  /** column name */
  margin = 'margin',
  /** column name */
  projectId = 'projectId',
  /** column name */
  to = 'to'
}

/** update columns of table "projectCurrencyExchangeMargin" */
export enum ProjectCurrencyExchangeMarginUpdateColumn {
  /** column name */
  margin = 'margin'
}

/** unique or primary key constraints on table "projectIntegration" */
export enum ProjectIntegrationConstraint {
  /** unique or primary key constraint on columns "id" */
  projectIntegration_pkey = 'projectIntegration_pkey',
  /** unique or primary key constraint on columns "type", "projectId" */
  projectIntegration_type_projectId_key = 'projectIntegration_type_projectId_key'
}

/** select columns of table "projectIntegration" */
export enum ProjectIntegrationSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  id = 'id',
  /** column name */
  parameters = 'parameters',
  /** column name */
  projectId = 'projectId',
  /** column name */
  provider = 'provider',
  /** column name */
  type = 'type',
  /** column name */
  updatedAt = 'updatedAt'
}

/** update columns of table "projectIntegration" */
export enum ProjectIntegrationUpdateColumn {
  /** column name */
  parameters = 'parameters',
  /** column name */
  provider = 'provider'
}

/** unique or primary key constraints on table "projectProvider" */
export enum ProjectProviderConstraint {
  /** unique or primary key constraint on columns "providersApiId" */
  projectProvider_pkey = 'projectProvider_pkey',
  /** unique or primary key constraint on columns "projectId", "name" */
  projectProvider_projectId_name_key = 'projectProvider_projectId_name_key'
}

/** unique or primary key constraints on table "projectProviderPaymentMethod" */
export enum ProjectProviderPaymentMethodConstraint {
  /** unique or primary key constraint on columns "paymentMethodId", "projectId", "projectProviderId" */
  projectProviderPaymentMethodVariant_pkey = 'projectProviderPaymentMethodVariant_pkey'
}

/** select columns of table "projectProviderPaymentMethod" */
export enum ProjectProviderPaymentMethodSelectColumn {
  /** column name */
  categoryId = 'categoryId',
  /** column name */
  depositPercent = 'depositPercent',
  /** column name */
  depositStatic = 'depositStatic',
  /** column name */
  enabled = 'enabled',
  /** column name */
  feePercent = 'feePercent',
  /** column name */
  feeStatic = 'feeStatic',
  /** column name */
  paymentMethodId = 'paymentMethodId',
  /** column name */
  projectProviderId = 'projectProviderId',
  /** column name */
  surchargePercent = 'surchargePercent',
  /** column name */
  surchargeStatic = 'surchargeStatic'
}

/** update columns of table "projectProviderPaymentMethod" */
export enum ProjectProviderPaymentMethodUpdateColumn {
  /** column name */
  categoryId = 'categoryId',
  /** column name */
  depositPercent = 'depositPercent',
  /** column name */
  depositStatic = 'depositStatic',
  /** column name */
  enabled = 'enabled',
  /** column name */
  feePercent = 'feePercent',
  /** column name */
  feeStatic = 'feeStatic',
  /** column name */
  paymentMethodId = 'paymentMethodId',
  /** column name */
  projectProviderId = 'projectProviderId',
  /** column name */
  surchargePercent = 'surchargePercent',
  /** column name */
  surchargeStatic = 'surchargeStatic'
}

/** select columns of table "projectProvider" */
export enum ProjectProviderSelectColumn {
  /** column name */
  isArchived = 'isArchived',
  /** column name */
  name = 'name',
  /** column name */
  providerType = 'providerType',
  /** column name */
  providersApiId = 'providersApiId'
}

/** unique or primary key constraints on table "projectProviderTransactionLog" */
export enum ProjectProviderTransactionLogConstraint {
  /** unique or primary key constraint on columns "id" */
  projectProviderTransactionLog_pkey = 'projectProviderTransactionLog_pkey'
}

/** select columns of table "projectProviderTransactionLog" */
export enum ProjectProviderTransactionLogSelectColumn {
  /** column name */
  amount = 'amount',
  /** column name */
  chargebackId = 'chargebackId',
  /** column name */
  confirmed = 'confirmed',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  currency = 'currency',
  /** column name */
  date = 'date',
  /** column name */
  deposit = 'deposit',
  /** column name */
  description = 'description',
  /** column name */
  fee = 'fee',
  /** column name */
  id = 'id',
  /** column name */
  paymentId = 'paymentId',
  /** column name */
  projectId = 'projectId',
  /** column name */
  projectProviderId = 'projectProviderId',
  /** column name */
  refundId = 'refundId',
  /** column name */
  type = 'type',
  /** column name */
  updatedAt = 'updatedAt'
}

/** select "projectProviderTransactionLogAggregateBoolExpBool_andArgumentsColumns" columns of table "projectProviderTransactionLog" */
export enum ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_andArgumentsColumns {
  /** column name */
  confirmed = 'confirmed'
}

/** select "projectProviderTransactionLogAggregateBoolExpBool_orArgumentsColumns" columns of table "projectProviderTransactionLog" */
export enum ProjectProviderTransactionLogSelectColumnProjectProviderTransactionLogAggregateBoolExpBool_orArgumentsColumns {
  /** column name */
  confirmed = 'confirmed'
}

/** update columns of table "projectProviderTransactionLog" */
export enum ProjectProviderTransactionLogUpdateColumn {
  /** column name */
  amount = 'amount',
  /** column name */
  confirmed = 'confirmed',
  /** column name */
  currency = 'currency',
  /** column name */
  date = 'date',
  /** column name */
  deposit = 'deposit',
  /** column name */
  description = 'description',
  /** column name */
  fee = 'fee'
}

/** update columns of table "projectProvider" */
export enum ProjectProviderUpdateColumn {
  /** column name */
  isArchived = 'isArchived',
  /** column name */
  name = 'name',
  /** column name */
  projectId = 'projectId'
}

/** unique or primary key constraints on table "projectScript" */
export enum ProjectScriptConstraint {
  /** unique or primary key constraint on columns "id" */
  projectScript_pkey = 'projectScript_pkey',
  /** unique or primary key constraint on columns "projectId" */
  projectScript_projectId_key = 'projectScript_projectId_key'
}

/** select columns of table "projectScript" */
export enum ProjectScriptSelectColumn {
  /** column name */
  code = 'code',
  /** column name */
  id = 'id'
}

/** update columns of table "projectScript" */
export enum ProjectScriptUpdateColumn {
  /** column name */
  code = 'code',
  /** column name */
  functions = 'functions'
}

/** select columns of table "project" */
export enum ProjectSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  defaultCurrency = 'defaultCurrency',
  /** column name */
  defaultReturnUrl = 'defaultReturnUrl',
  /** column name */
  defaultWebhookUrl = 'defaultWebhookUrl',
  /** column name */
  discordNotificationWebhook = 'discordNotificationWebhook',
  /** column name */
  enabledModules = 'enabledModules',
  /** column name */
  fullLogoUrl = 'fullLogoUrl',
  /** column name */
  googlePayMerchantId = 'googlePayMerchantId',
  /** column name */
  id = 'id',
  /** column name */
  logoUrl = 'logoUrl',
  /** column name */
  name = 'name',
  /** column name */
  paywallOptions = 'paywallOptions',
  /** column name */
  secretKey = 'secretKey',
  /** column name */
  updatedAt = 'updatedAt'
}

export enum ProvidersPaymentMethodId {
  applepay = 'applepay',
  bank_transfer = 'bank_transfer',
  blik = 'blik',
  card = 'card',
  direct_carrier_billing = 'direct_carrier_billing',
  googlepay = 'googlepay',
  pay_by_link_alior = 'pay_by_link_alior',
  pay_by_link_alior_installments = 'pay_by_link_alior_installments',
  pay_by_link_allianz = 'pay_by_link_allianz',
  pay_by_link_applepay = 'pay_by_link_applepay',
  pay_by_link_bancontact = 'pay_by_link_bancontact',
  pay_by_link_blik = 'pay_by_link_blik',
  pay_by_link_blikpaylater = 'pay_by_link_blikpaylater',
  pay_by_link_bnpparibas = 'pay_by_link_bnpparibas',
  pay_by_link_bos = 'pay_by_link_bos',
  pay_by_link_card = 'pay_by_link_card',
  pay_by_link_city = 'pay_by_link_city',
  pay_by_link_creditagricole = 'pay_by_link_creditagricole',
  pay_by_link_crypto = 'pay_by_link_crypto',
  pay_by_link_getinbank = 'pay_by_link_getinbank',
  pay_by_link_googlepay = 'pay_by_link_googlepay',
  pay_by_link_idea = 'pay_by_link_idea',
  pay_by_link_ideal = 'pay_by_link_ideal',
  pay_by_link_ing = 'pay_by_link_ing',
  pay_by_link_inteligo = 'pay_by_link_inteligo',
  pay_by_link_klarna = 'pay_by_link_klarna',
  pay_by_link_mbank = 'pay_by_link_mbank',
  pay_by_link_mbank_installments = 'pay_by_link_mbank_installments',
  pay_by_link_milenium = 'pay_by_link_milenium',
  pay_by_link_neosurf = 'pay_by_link_neosurf',
  pay_by_link_nest = 'pay_by_link_nest',
  pay_by_link_neteller = 'pay_by_link_neteller',
  pay_by_link_noble = 'pay_by_link_noble',
  pay_by_link_nowy = 'pay_by_link_nowy',
  pay_by_link_paypal = 'pay_by_link_paypal',
  pay_by_link_paypo = 'pay_by_link_paypo',
  pay_by_link_paysafecard = 'pay_by_link_paysafecard',
  pay_by_link_paysafecash = 'pay_by_link_paysafecash',
  pay_by_link_payu_installments = 'pay_by_link_payu_installments',
  pay_by_link_pekao = 'pay_by_link_pekao',
  pay_by_link_pko = 'pay_by_link_pko',
  pay_by_link_plus = 'pay_by_link_plus',
  pay_by_link_pocztowy = 'pay_by_link_pocztowy',
  pay_by_link_pragmago = 'pay_by_link_pragmago',
  pay_by_link_przekaz = 'pay_by_link_przekaz',
  pay_by_link_revolut = 'pay_by_link_revolut',
  pay_by_link_santander = 'pay_by_link_santander',
  pay_by_link_skrill = 'pay_by_link_skrill',
  pay_by_link_skycash = 'pay_by_link_skycash',
  pay_by_link_spoldzielczy = 'pay_by_link_spoldzielczy',
  pay_by_link_toyota = 'pay_by_link_toyota',
  pay_by_link_twisto = 'pay_by_link_twisto',
  pay_by_link_unionpay = 'pay_by_link_unionpay',
  pay_by_link_velo = 'pay_by_link_velo',
  pay_by_link_volkswagen = 'pay_by_link_volkswagen',
  pay_by_link_webmoney = 'pay_by_link_webmoney',
  pay_by_link_wechat = 'pay_by_link_wechat',
  pay_by_link_zabka = 'pay_by_link_zabka',
  pay_by_link_zen = 'pay_by_link_zen',
  paywall = 'paywall',
  voucher = 'voucher'
}

export enum ProvidersPaymentProviderErrorReason {
  AMOUNT_LIMIT_EXCEEDED = 'AMOUNT_LIMIT_EXCEEDED',
  BLIK_INVALID_CODE = 'BLIK_INVALID_CODE',
  CARD_THREE_DS_FAILED = 'CARD_THREE_DS_FAILED',
  DCB_DISABLED_PREMIUM_SERVICES = 'DCB_DISABLED_PREMIUM_SERVICES',
  DCB_INVALID_PHONE_NUMBER = 'DCB_INVALID_PHONE_NUMBER',
  DCB_INVALID_PIN = 'DCB_INVALID_PIN',
  DCB_UNSUPPORTED_BILLING_MODEL = 'DCB_UNSUPPORTED_BILLING_MODEL',
  DCB_UNSUPPORTED_OPERATOR = 'DCB_UNSUPPORTED_OPERATOR',
  INVALID_AMOUNT = 'INVALID_AMOUNT',
  INVALID_CONFIGURATION = 'INVALID_CONFIGURATION',
  TRANSACTION_TIMEOUT = 'TRANSACTION_TIMEOUT',
  UNKNOWN = 'UNKNOWN',
  UNSUPPORTED = 'UNSUPPORTED'
}

export enum ProvidersPaymentProviderType {
  adyen = 'adyen',
  autopay = 'autopay',
  cashbill = 'cashbill',
  coinbase = 'coinbase',
  coingate = 'coingate',
  dpay = 'dpay',
  dvpass = 'dvpass',
  espago = 'espago',
  fenige = 'fenige',
  igoriaPay = 'igoriaPay',
  imoje = 'imoje',
  mock = 'mock',
  montonio = 'montonio',
  p24 = 'p24',
  paycadoo = 'paycadoo',
  paymenterio = 'paymenterio',
  paymentsos = 'paymentsos',
  paynow = 'paynow',
  paytel = 'paytel',
  payu = 'payu',
  tpay = 'tpay',
  vimoni = 'vimoni',
  zen = 'zen'
}

export enum ProvidersPaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  REFUNDED = 'REFUNDED',
  REJECTED = 'REJECTED'
}

export enum ProvidersRecurringProcessingModel {
  CARD_ON_FILE = 'CARD_ON_FILE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  UNSCHEDULED_CARD_ON_FILE = 'UNSCHEDULED_CARD_ON_FILE'
}

export enum ProvidersRefundStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

/** select columns of table "reconciliation" */
export enum ReconciliationSelectColumn {
  /** column name */
  checked = 'checked',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  errors = 'errors',
  /** column name */
  id = 'id',
  /** column name */
  invalid = 'invalid',
  /** column name */
  path = 'path',
  /** column name */
  projectId = 'projectId',
  /** column name */
  total = 'total',
  /** column name */
  updated = 'updated',
  /** column name */
  updatedAt = 'updatedAt'
}

/** select columns of table "refund" */
export enum RefundSelectColumn {
  /** column name */
  amount = 'amount',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  externalId = 'externalId',
  /** column name */
  id = 'id',
  /** column name */
  merchantId = 'merchantId',
  /** column name */
  orderCurrencyAmount = 'orderCurrencyAmount',
  /** column name */
  paymentId = 'paymentId',
  /** column name */
  reason = 'reason',
  /** column name */
  status = 'status',
  /** column name */
  updatedAt = 'updatedAt'
}

export enum RefundStatusEnum {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

/** select columns of table "relatedCustomers" */
export enum RelatedCustomersSelectColumn {
  /** column name */
  customerId = 'customerId',
  /** column name */
  projectId = 'projectId',
  /** column name */
  relatedCustomerId = 'relatedCustomerId'
}

/** unique or primary key constraints on table "subscription" */
export enum SubscriptionConstraint {
  /** unique or primary key constraint on columns "id" */
  subscription_pkey = 'subscription_pkey'
}

export enum SubscriptionIntervalEnum {
  CUSTOM = 'CUSTOM',
  MINUTELY = 'MINUTELY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY'
}

/** unique or primary key constraints on table "subscriptionItem" */
export enum SubscriptionItemConstraint {
  /** unique or primary key constraint on columns "id" */
  subscriptionProduct_pkey = 'subscriptionProduct_pkey'
}

/** unique or primary key constraints on table "subscriptionItemPause" */
export enum SubscriptionItemPauseConstraint {
  /** unique or primary key constraint on columns "id" */
  subscriptionProductPause_pkey = 'subscriptionProductPause_pkey'
}

/** select columns of table "subscriptionItemPause" */
export enum SubscriptionItemPauseSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  endsAt = 'endsAt',
  /** column name */
  id = 'id',
  /** column name */
  startsAt = 'startsAt',
  /** column name */
  subscriptionItemId = 'subscriptionItemId'
}

/** update columns of table "subscriptionItemPause" */
export enum SubscriptionItemPauseUpdateColumn {
  /** column name */
  deletedAt = 'deletedAt'
}

/** unique or primary key constraints on table "subscriptionItemPrice" */
export enum SubscriptionItemPriceConstraint {
  /** unique or primary key constraint on columns "id" */
  subscriptionItemPrice_pkey = 'subscriptionItemPrice_pkey'
}

/** select columns of table "subscriptionItemPrice" */
export enum SubscriptionItemPriceSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  id = 'id',
  /** column name */
  price = 'price',
  /** column name */
  qty = 'qty',
  /** column name */
  startsAt = 'startsAt',
  /** column name */
  subscriptionItemId = 'subscriptionItemId'
}

/** placeholder for update columns of table "subscriptionItemPrice" (current role has no relevant permissions) */
export enum SubscriptionItemPriceUpdateColumn {
  /** placeholder (do not use) */
  _PLACEHOLDER = '_PLACEHOLDER'
}

/** select columns of table "subscriptionItem" */
export enum SubscriptionItemSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  details = 'details',
  /** column name */
  endsAt = 'endsAt',
  /** column name */
  externalId = 'externalId',
  /** column name */
  externalProductId = 'externalProductId',
  /** column name */
  id = 'id',
  /** column name */
  imageUrl = 'imageUrl',
  /** column name */
  name = 'name',
  /** column name */
  productId = 'productId',
  /** column name */
  startsAt = 'startsAt',
  /** column name */
  subscriptionId = 'subscriptionId',
  /** column name */
  updatedAt = 'updatedAt'
}

/** update columns of table "subscriptionItem" */
export enum SubscriptionItemUpdateColumn {
  /** column name */
  details = 'details',
  /** column name */
  endsAt = 'endsAt',
  /** column name */
  externalId = 'externalId',
  /** column name */
  externalProductId = 'externalProductId',
  /** column name */
  imageUrl = 'imageUrl',
  /** column name */
  name = 'name',
  /** column name */
  productId = 'productId'
}

/** select columns of table "subscription" */
export enum SubscriptionSelectColumn {
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  currency = 'currency',
  /** column name */
  currentBillingDate = 'currentBillingDate',
  /** column name */
  customInterval = 'customInterval',
  /** column name */
  customerId = 'customerId',
  /** column name */
  deletedAt = 'deletedAt',
  /** column name */
  eventId = 'eventId',
  /** column name */
  firstBillingDate = 'firstBillingDate',
  /** column name */
  id = 'id',
  /** column name */
  interval = 'interval',
  /** column name */
  lastBillingDate = 'lastBillingDate',
  /** column name */
  paymentInAdvance = 'paymentInAdvance',
  /** column name */
  paymentMethod = 'paymentMethod',
  /** column name */
  paymentTokenId = 'paymentTokenId',
  /** column name */
  title = 'title',
  /** column name */
  updatedAt = 'updatedAt',
  /** column name */
  webhookUrl = 'webhookUrl'
}

/** select "SubscriptionAggregateBoolExpBool_andArgumentsColumns" columns of table "subscription" */
export enum SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_andArgumentsColumns {
  /** column name */
  paymentInAdvance = 'paymentInAdvance'
}

/** select "SubscriptionAggregateBoolExpBool_orArgumentsColumns" columns of table "subscription" */
export enum SubscriptionSelectColumnSubscriptionAggregateBoolExpBool_orArgumentsColumns {
  /** column name */
  paymentInAdvance = 'paymentInAdvance'
}

/** update columns of table "subscription" */
export enum SubscriptionUpdateColumn {
  /** column name */
  deletedAt = 'deletedAt',
  /** column name */
  paymentInAdvance = 'paymentInAdvance',
  /** column name */
  paymentMethod = 'paymentMethod',
  /** column name */
  paymentTokenId = 'paymentTokenId',
  /** column name */
  webhookUrl = 'webhookUrl'
}

/** select columns of table "suspectCustomer" */
export enum SuspectCustomerSelectColumn {
  /** column name */
  cardsCount = 'cardsCount',
  /** column name */
  customerId = 'customerId',
  /** column name */
  fingerprintsCount = 'fingerprintsCount',
  /** column name */
  ipsCount = 'ipsCount',
  /** column name */
  maxCreatedAt = 'maxCreatedAt',
  /** column name */
  projectId = 'projectId',
  /** column name */
  rejectedPaymentsCount = 'rejectedPaymentsCount'
}

/** select columns of table "suspectFingerprint" */
export enum SuspectFingerprintSelectColumn {
  /** column name */
  customerCount = 'customerCount',
  /** column name */
  fingerprintId = 'fingerprintId',
  /** column name */
  maxCreatedAt = 'maxCreatedAt',
  /** column name */
  projectId = 'projectId'
}

/** select columns of table "suspectIp" */
export enum SuspectIpSelectColumn {
  /** column name */
  customerCount = 'customerCount',
  /** column name */
  ip = 'ip',
  /** column name */
  maxCreatedAt = 'maxCreatedAt'
}

/** select columns of table "transactionLogSummary" */
export enum TransactionLogSummarySelectColumn {
  /** column name */
  amount = 'amount',
  /** column name */
  currency = 'currency',
  /** column name */
  date = 'date',
  /** column name */
  deposit = 'deposit',
  /** column name */
  fee = 'fee',
  /** column name */
  projectId = 'projectId',
  /** column name */
  projectProviderId = 'projectProviderId',
  /** column name */
  type = 'type'
}

export enum TransactionTypeEnum {
  CHARGEBACK = 'CHARGEBACK',
  OTHER = 'OTHER',
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND',
  WITHDRAW = 'WITHDRAW'
}

/** unique or primary key constraints on table "voucherGroup" */
export enum VoucherGroupConstraint {
  /** unique or primary key constraint on columns "id" */
  voucherGroup_pkey = 'voucherGroup_pkey'
}

/** select columns of table "voucherGroupMeta" */
export enum VoucherGroupMetaSelectColumn {
  /** column name */
  balanceSum = 'balanceSum',
  /** column name */
  count = 'count',
  /** column name */
  id = 'id',
  /** column name */
  startBalanceSum = 'startBalanceSum'
}

/** select columns of table "voucherGroup" */
export enum VoucherGroupSelectColumn {
  /** column name */
  codeLength = 'codeLength',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  currency = 'currency',
  /** column name */
  endsAt = 'endsAt',
  /** column name */
  id = 'id',
  /** column name */
  name = 'name',
  /** column name */
  startsAt = 'startsAt',
  /** column name */
  updatedAt = 'updatedAt'
}

/** update columns of table "voucherGroup" */
export enum VoucherGroupUpdateColumn {
  /** column name */
  codeLength = 'codeLength',
  /** column name */
  currency = 'currency',
  /** column name */
  endsAt = 'endsAt',
  /** column name */
  id = 'id',
  /** column name */
  name = 'name',
  /** column name */
  projectId = 'projectId',
  /** column name */
  startsAt = 'startsAt'
}

/** select columns of table "voucher" */
export enum VoucherSelectColumn {
  /** column name */
  code = 'code',
  /** column name */
  createdAt = 'createdAt',
  /** column name */
  generationId = 'generationId',
  /** column name */
  groupId = 'groupId',
  /** column name */
  id = 'id',
  /** column name */
  isArchived = 'isArchived',
  /** column name */
  projectId = 'projectId',
  /** column name */
  startBalance = 'startBalance',
  /** column name */
  updatedAt = 'updatedAt'
}

/** select "voucherAggregateBoolExpBool_andArgumentsColumns" columns of table "voucher" */
export enum VoucherSelectColumnVoucherAggregateBoolExpBool_andArgumentsColumns {
  /** column name */
  isArchived = 'isArchived'
}

/** select "voucherAggregateBoolExpBool_orArgumentsColumns" columns of table "voucher" */
export enum VoucherSelectColumnVoucherAggregateBoolExpBool_orArgumentsColumns {
  /** column name */
  isArchived = 'isArchived'
}
