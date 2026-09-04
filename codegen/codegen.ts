import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * Two outputs, both committed:
 *   - `enums.ts` carries every enum in the schema, so modules that must not
 *     touch the transport (webhooks) can import them on their own.
 *   - `graphql.ts` carries operation types and the document strings, and
 *     re-imports those enums instead of redeclaring them.
 */
const scalars = {
  uuid: "string",
  timestamptz: "string",
  timestamp: "string",
  date: "string",
  bigint: "number",
  numeric: "number",
  float8: "number",
  json: "unknown",
  jsonb: "unknown",
  Authuuid: "string",
  Authtimestamptz: "string",
  Authjsonb: "unknown",
  ProvidersUUID: "string",
  ProvidersEmailAddress: "string",
  ProvidersJSON: "unknown",
  ProvidersVoid: "null",
  ProvidersmutationInput_createMerchant_input_name: "string",
  ProvidersmutationInput_createPayment_input_paymentMethodData_oneOf_2_blikCode:
    "string",
  ProvidersmutationInput_createPayment_input_paymentMethodData_oneOf_4_cardCvv:
    "string",
  ProvidersmutationInput_createPayment_input_paymentMethodData_oneOf_4_cardExpMonth:
    "string",
  ProvidersmutationInput_createPayment_input_paymentMethodData_oneOf_4_cardExpYear:
    "string",
  ProvidersmutationInput_createPayment_input_paymentMethodData_oneOf_5_cardCvv:
    "string",
  ProvidersmutationInput_updateMerchantById_input_name: "string",
};

const config: CodegenConfig = {
  schema: "schema/paycadoo.graphql",
  documents: ["src/graphql/documents/**/*.graphql"],
  generates: {
    "src/generated/enums.ts": {
      plugins: ["typescript"],
      config: { onlyEnums: true, namingConvention: "keep" },
    },
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        { "./codegen/typed-document-string.mjs": {} },
      ],
      config: {
        onlyOperationTypes: true,
        documentMode: "string",
        namingConvention: "keep",
        enumValues: "./enums.js",
        scalars,
        typedDocumentStringImport: "../graphql/TypedDocumentString.js",
        avoidOptionals: { defaultValue: true },
      },
    },
  },
};

export default config;
