# @paycadoo/client

Official Node.js client for the [Paycadoo](https://paycadoo.com) API. Typed operations, a transport
with timeouts and retries that know what is safe to repeat, and error codes you can branch on.

Node only. There is no browser build: the API key this client sends is a server-side credential.

## Installation

```bash
npm install @paycadoo/client
```

Requires **Node.js >= 20.19** — the transport composes the caller's `AbortSignal` with its own
deadlines through `AbortSignal.any()`.

The package has **zero runtime dependencies**.

## Quick start

```ts
import { createPaycadooClient } from "@paycadoo/client";

const paycadoo = createPaycadooClient({
  apiKey: process.env.PAY_API_KEY!,
  endpoint: process.env.PAY_URL, // defaults to https://api.paycadoo.com
});

await paycadoo.ping(); // one round-trip; throws if the endpoint or the key is wrong
```

## Configuration

```ts
interface PaycadooClientOptions {
  /** Project API key. Sent as `x-api-key`. */
  apiKey: string;
  /** API origin. Default: "https://api.paycadoo.com" */
  endpoint?: string;
  /** Path the GraphQL API is served under. Default: "/v1/graphql" */
  graphqlPath?: string;
  /** Deadline for a single HTTP attempt, ms. Default: 10000 */
  timeoutMs?: number;
  /** Deadline for the whole call including retries, ms. Default: 30000 */
  totalTimeoutMs?: number;
  retry?: {
    /** Attempts for a retryable call, the first included. Default: 3 */
    attempts?: number;
    /** Default: 200 */
    baseDelayMs?: number;
    /** Default: 5000 */
    maxDelayMs?: number;
  };
  /** Merged into every request. `x-api-key` cannot be overridden. */
  headers?: Record<string, string>;
  /** Injected `fetch`, for tests and proxies. Default: the global one. */
  fetch?: typeof fetch;
  /** Any structural logger — a pino instance fits with no adapter. */
  logger?: PaycadooLogger;
  /** Include operation variables in log output. Default: false */
  logVariables?: boolean;
}
```

## Timeouts and retries

Two deadlines, both enforced: `timeoutMs` bounds one HTTP attempt, `totalTimeoutMs` bounds the call
as a whole — retries and backoff spend from the same budget.

What gets retried:

| Outcome | Retried |
|---|---|
| `408`, `425`, `429`, `500`, `502`, `503`, `504` | yes |
| network failure (DNS, TLS, reset) | yes |
| our own attempt timeout | yes |
| any other status | no |
| `200` carrying `errors[]` | **never** |
| an `AbortSignal` you supplied | never — your abort reason is rethrown untouched |

**A `200` with `errors[]` is the application answering, not the transport failing.** Repeating it is
how a customer gets charged twice, so it is raised immediately regardless of the retry settings.

Backoff is full jitter — a uniform draw from `[0, cap]` where the cap doubles per attempt — so a
fleet of clients does not retry in lockstep and knock a recovering server over a second time. A
`Retry-After` header wins over the computed delay.

**Mutations are not retried.** The kind is read off the document, so this needs no flag from you.
Override per call when you know better:

```ts
await paycadoo.raw(SomeMutation, variables, { idempotent: true });
```

## `raw()`

Everything this package does not wrap is still reachable, with types:

```ts
import { createPaycadooClient, TypedDocumentString } from "@paycadoo/client";

// a typed document (from your own graphql-codegen setup)
const result = await paycadoo.raw(GetProjectDocument, { id });

// or a bare string, when the types are not worth generating
const { chargeback } = await paycadoo.raw<{ chargeback: Array<{ id: string }> }>(
  `query ListChargebacks($limit: Int!) { chargeback(limit: $limit) { id } }`,
  { limit: 10 },
);
```

The operator surface — `createProject`, `removeProject`, `setProjectScript`, `updateCustomerFraudScore`,
chargebacks, reconciliation, antifraud — is deliberately reachable only through `raw()`. That is an
operator console, not a merchant SDK, and wrapping it would imply a stability promise this package
does not make.

The schema ships with the package, so you can point your own codegen at it:

```js
// codegen.ts
schema: "node_modules/@paycadoo/client/schema/paycadoo.graphql";
```

## Error handling

```ts
import {
  isPaycadooErrorCode,
  PaycadooGraphQLError,
  PaycadooHttpError,
  PaycadooTimeoutError,
} from "@paycadoo/client";

try {
  await paycadoo.raw(CreateOrderDocument, { input });
} catch (error) {
  if (isPaycadooErrorCode(error, "ORDER_ALREADY_EXISTS")) {
    // `error` is narrowed to PaycadooGraphQLError & { code: "ORDER_ALREADY_EXISTS" }
    return recoverExistingOrder(input.merchantId);
  }
  if (error instanceof PaycadooTimeoutError) {
    // the write may or may not have landed — reconcile, do not blindly repeat
  }
  throw error;
}
```

| Class | Raised when |
|---|---|
| `PaycadooError` | base class for everything below |
| `PaycadooGraphQLError` | `200` with `errors[]`; carries `.code` and `.errors` |
| `PaycadooHttpError` | non-2xx; carries `.status` and a truncated `.body` |
| `PaycadooNetworkError` | `fetch` itself failed |
| `PaycadooTimeoutError` | one of our deadlines fired; `.scope` is `"attempt"` or `"total"` |
| `PaycadooConfigError` | the client was built with something unusable |

| Guard | Narrows to |
|---|---|
| `isPaycadooError(e)` | `PaycadooError` |
| `isPaycadooGraphQLError(e)` | `PaycadooGraphQLError` |
| `isPaycadooHttpError(e)` | `PaycadooHttpError` |
| `isPaycadooNetworkError(e)` | `PaycadooNetworkError` |
| `isPaycadooTimeoutError(e)` | `PaycadooTimeoutError` |
| `isPaycadooErrorCode(e, "ORDER_ALREADY_EXISTS")` | that class **and** that literal code |

Every error carries `requestId` (sent as `x-request-id`), `operationName` and `attempts`, and has a
`toJSON()` — without it a logger would render the error as `{}`.

`PaycadooErrorCode` is an open union: known codes autocomplete, an unknown one from a newer server
release still type-checks rather than being silently mistyped. The known set is exported as
`PAYCADOO_ERROR_CODES`.

## Logging

```ts
import pino from "pino";

const paycadoo = createPaycadooClient({ apiKey, logger: pino() });
```

Any object with `debug`/`info`/`warn`/`error`/`child` fits — the package declares its own structural
`PaycadooLogger` type rather than depending on a logging library.

**Operation variables are never logged by default.** They carry customer data and amounts, and logs
outlive the request. Set `logVariables: true` to opt in.

## Pagination

Hasura's lists page with `limit`/`offset`. `paginate` walks them and stops as soon as a page comes
back short, so `n` rows cost `ceil(n / pageSize)` requests:

```ts
import { collect, paginate } from "@paycadoo/client";

for await (const order of paginate(({ limit, offset }) =>
  paycadoo.raw(ListOrdersDocument, { limit, offset }).then((r) => r.order),
)) {
  console.log(order.id);
}

const all = await collect(paginate(fetchPage, { pageSize: 250, max: 1_000 }));
```

## Enums

Every enum in the schema is re-exported from the package root, so you never hand-maintain a copy that
drifts:

```ts
import { OrderStatusEnum, CurrencyEnum } from "@paycadoo/client";
```

## Development

```bash
npm ci
npm run codegen      # regenerate src/generated from schema/paycadoo.graphql
npm run typecheck
npm test
npm run build
```

`schema/paycadoo.graphql` and `src/generated/**` are committed: schema drift then shows up in a pull
request diff, and a fresh clone builds without a reachable API. CI fails if the generated output does
not match the committed one.

To refresh the schema:

```bash
PAYCADOO_API_KEY=… npm run schema:fetch
```

## Releasing

`npm version <patch|minor|major> && git push --follow-tags`. A `v*` tag runs the tests, then publishes
to npm over **trusted publishing (OIDC)** with provenance. There is no npm token anywhere in this
repository.

## License

MIT
