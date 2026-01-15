import { parseRange } from "./parse/parseRange";

export function updateDatabase(range: GoogleAppsScript.Spreadsheet.Range) {
  const { parsed } = parseRange({ range });
}
