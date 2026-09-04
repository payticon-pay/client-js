import { plugin as upstream } from "@graphql-codegen/typed-document-node";

/**
 * Upstream `typed-document-node` in `documentMode: 'string'` emits its own
 * `TypedDocumentString` class and imports `DocumentTypeDecoration` from
 * `@graphql-typed-document-node/core`, whose `graphql` peer dependency would
 * land in every consumer's `node_modules`. We keep the plugin's output and
 * swap that one import for our own dependency-free class.
 */
const EMITTED_CLASS =
  /export class TypedDocumentString<TResult, TVariables>[\s\S]*?\n\}\n/;

export const plugin = async (schema, documents, config, info) => {
  const result = await upstream(schema, documents, config, info);
  const prepend = (result.prepend ?? []).filter(
    (line) => !line.includes("@graphql-typed-document-node/core"),
  );

  return {
    prepend: [
      ...prepend,
      `import { TypedDocumentString } from '${config.typedDocumentStringImport}';`,
      `export type { TypedDocumentString };`,
    ],
    content: result.content.replace(EMITTED_CLASS, ""),
  };
};
