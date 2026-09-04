import { describe, expect, it } from "vitest";
import { parseOperation } from "./operation.js";

describe("parseOperation", () => {
  it("should read a named query", () => {
    expect(parseOperation("\n  query GetOrder($id: uuid!) {\n  orderByPk }\n")).toEqual({
      type: "query",
      name: "GetOrder",
    });
  });

  it("should read a named mutation", () => {
    expect(parseOperation("mutation CreateOrder($i: X!) { createOrder }")).toEqual({
      type: "mutation",
      name: "CreateOrder",
    });
  });

  it("should skip leading fragments, which codegen prepends to the document", () => {
    const document = `
    fragment OrderFields on Order {
      id
    }
    query GetOrder($id: uuid!) {
      orderByPk(id: $id) { ...OrderFields }
    }`;
    expect(parseOperation(document)).toEqual({ type: "query", name: "GetOrder" });
  });

  it("should treat a bare selection set as an anonymous query", () => {
    expect(parseOperation("{ __typename }")).toEqual({ type: "query", name: undefined });
  });

  it("should ignore comments", () => {
    expect(parseOperation("# mutation in a comment\nquery Ping { __typename }")).toEqual({
      type: "query",
      name: "Ping",
    });
  });
});
