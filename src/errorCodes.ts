/**
 * Codes Paycadoo puts in `errors[].extensions.code`. The list is the union of
 * the GraphQL layer's own codes, the REST gateway's codes and Hasura's, and it
 * is deliberately open: a new server release may add one, and a client that
 * refuses to represent it is worse than a client that passes it through.
 */
export const PAYCADOO_ERROR_CODES = [
  // paycadoo backend — src/middle/errors.ts
  "INVALID_PAYMENT_TOKEN",
  "ORDER_ALREADY_EXISTS",
  "VOUCHER_LACK_OF_FUNDS",
  "VOUCHER_INVALID_CURRENCY",
  "VOUCHER_NOT_EXIST",
  "PAYMENT_METHOD_NOT_EXIST",
  "BAD_USER_INPUT",
  "UNSUPPORTED_CURRENCY",
  "CANNOT_BE_REFUNDED",
  "ORDER_INVALID_STATUS",
  "ORDER_NOT_FOUND",
  "UNSUPPORTED",
  "TOO_MANY_PAYMENTS",
  "PAYMENT_NOT_ALLOWED",
  "INVALID_API_KEY",
  "FORBIDDEN",
  // paycadoo REST gateway — src/errors/errorHandler.ts
  "INTERNAL_SERVER_ERROR",
  "NOT_FOUND",
  "UNAUTHORIZED",
  "VALIDATION_ERROR",
  // hasura
  "access-denied",
  "constraint-violation",
  "data-exception",
  "invalid-headers",
  "invalid-jwt",
  "not-supported",
  "permission-error",
  "postgres-error",
  "unexpected",
  "validation-failed",
] as const;

export type KnownPaycadooErrorCode = (typeof PAYCADOO_ERROR_CODES)[number];

/**
 * Known codes keep autocomplete useful; the `string & {}` arm keeps an unknown
 * code from the server representable instead of silently mistyped.
 */
export type PaycadooErrorCode = KnownPaycadooErrorCode | (string & {});

const KNOWN = new Set<string>(PAYCADOO_ERROR_CODES);

export const isKnownPaycadooErrorCode = (
  code: string,
): code is KnownPaycadooErrorCode => KNOWN.has(code);
