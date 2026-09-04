/**
 * A GraphQL document carried as a plain string, tagged with the result and
 * variables types the codegen inferred for it.
 *
 * Deliberately not `@graphql-typed-document-node/core`: that package peer-depends
 * on `graphql`, which would put ~700 KB of parser into every consumer's install
 * for a type that is erased at build time.
 */
export class TypedDocumentString<TResult, TVariables> extends String {
  /** Phantom fields — never populated, they only keep the type parameters honest. */
  declare readonly __result?: TResult;
  declare readonly __variables?: TVariables;

  constructor(
    private readonly value: string,
    public readonly __meta__?: Record<string, unknown>,
  ) {
    super(value);
  }

  override toString(): string {
    return this.value;
  }
}

/** Any GraphQL document this client can execute: typed, or a bare string. */
export type PaycadooDocument<TResult, TVariables> =
  | TypedDocumentString<TResult, TVariables>
  | string;
