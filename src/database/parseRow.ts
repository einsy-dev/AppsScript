import { _active, _sites } from "./config";
import { getKeys } from "./getKeys";

export function parseRow(range: GoogleAppsScript.Spreadsheet.Range) {
  if (!_sites || !_active) return;

  const rangeKeys = getKeys({ sheet: _active, keyRow: 2 });
  if (!rangeKeys) return;
  const row = _active.getRange(range.getRow(), 1, 1, _active.getLastColumn()).getValues()[0];
  const parsedRow: { [key: string]: string } = {};
  for (let i = 0; i < rangeKeys.length; i++) {
    if (parsedRow[rangeKeys[i]]) {
      rangeKeys[i] += i + 1;
    }
    parsedRow[rangeKeys[i]] = row[i] || "";
  }

  console.log(parsedRow);
  return parsedRow;
}
