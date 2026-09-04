export interface ParsedOperation {
  type: "query" | "mutation" | "subscription";
  name: string | undefined;
}

const OPERATION_LINE = /^(query|mutation|subscription)\b\s*([A-Za-z_]\w*)?/;

/**
 * Reads the operation kind and name straight off the document text.
 *
 * The kind decides the retry default, so it has to come from the document
 * rather than from the caller remembering to pass a flag. Fragment definitions
 * are skipped; a document that is a bare selection set is an anonymous query.
 */
export const parseOperation = (document: string): ParsedOperation => {
  for (const rawLine of document.split("\n")) {
    const line = rawLine.trim();
    if (line === "" || line.startsWith("#")) continue;

    const match = OPERATION_LINE.exec(line);
    if (match) {
      return {
        type: match[1] as ParsedOperation["type"],
        name: match[2],
      };
    }

    if (line.startsWith("{")) return { type: "query", name: undefined };
  }

  return { type: "query", name: undefined };
};
