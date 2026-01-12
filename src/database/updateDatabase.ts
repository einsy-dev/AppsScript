import { _active, _sites } from "./config";
import { getKeys } from "./getKeys";
import { parseTable } from "./parseTable";

export function updateDataBase(range: GoogleAppsScript.Spreadsheet.Range) {
  if (!_sites) return;
  const parsed = parseTable({ sheet: _sites, keyRow: 1 });
  if (!parsed) return;

  const rangeKeys = getKeys({ sheet: _active, keyRow: 2 });
  if (!rangeKeys) return;
  const row = _active.getRange(range.getRow(), 1, 1, range.getLastColumn()).getValues()[0];
  const parsedRow: { [key: string]: string } = {};

  for (let i = 0; i < rangeKeys.length; i++) {
    parsedRow[rangeKeys[i]] = row[i] || "";
  }

  if (!parsedRow["Domain"]) return;
  const newValues = { ...parsed[parsedRow["Domain"]] };
  const dbRange = _sites.getRange(+parsed[parsedRow["Domain"]]["id"], 1, 1, Object.keys(parsed).length);

  console.log(parsedRow);
}
