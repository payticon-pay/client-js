#!/usr/bin/env node
/**
 * Refreshes `schema/paycadoo.graphql` by introspecting a live endpoint.
 *
 * The schema is committed, so this is run deliberately and its diff reviewed —
 * regenerating from whatever a cluster happens to serve, unattended, is how a
 * client silently starts describing an API nobody shipped.
 *
 *   PAYCADOO_ENDPOINT=https://api.paycadoo.com PAYCADOO_API_KEY=… node scripts/fetch-schema.mjs
 */
import { writeFileSync } from "node:fs";
import { buildClientSchema, getIntrospectionQuery, lexicographicSortSchema, printSchema } from "graphql";

const endpoint = process.env.PAYCADOO_ENDPOINT ?? "https://api.paycadoo.com";
const path = process.env.PAYCADOO_GRAPHQL_PATH ?? "/v1/graphql";
const apiKey = process.env.PAYCADOO_API_KEY;
const output = process.argv[2] ?? "schema/paycadoo.graphql";

if (!apiKey) {
  console.error("PAYCADOO_API_KEY is required");
  process.exit(1);
}

const url = new URL(path, endpoint).toString();
const response = await fetch(url, {
  method: "POST",
  headers: { "content-type": "application/json", "x-api-key": apiKey },
  body: JSON.stringify({ query: getIntrospectionQuery({ descriptions: true }) }),
});

if (!response.ok) {
  console.error(`Introspection failed: HTTP ${response.status} ${response.statusText}`);
  process.exit(1);
}

const body = await response.json();
if (body.errors?.length) {
  console.error(`Introspection failed: ${body.errors.map((e) => e.message).join("; ")}`);
  process.exit(1);
}

// Sorted, so an unrelated server-side reordering never shows up as a diff.
const sdl = printSchema(lexicographicSortSchema(buildClientSchema(body.data)));
writeFileSync(output, `${sdl.trimEnd()}\n`);
console.log(`Wrote ${output} from ${url}`);
