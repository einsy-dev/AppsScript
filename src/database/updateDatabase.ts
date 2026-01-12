import { updateObject } from "../utils/updateObject";
import { _active, _sites } from "./config";
import { getKeys } from "./getKeys";
import { parseRow } from "./parseRow";
import { parseTable } from "./parseTable";

export function updateDataBase(range: GoogleAppsScript.Spreadsheet.Range) {
  if (!_sites) return;

  const parsedRow = parseRow(range);
  if (!parsedRow) return;

  const domain = parsedRow.Domain;
  if (!domain) return;

  const parsedTable = parseTable({ sheet: _sites, keyRow: 1 });
  if (!parsedTable || !parsedTable[domain]) return;

  const newValues = updateObject(parsedTable[domain].value, parsedRow);

  const newValuerArr = Object.keys(parsedTable[domain].value).map((key) => newValues[key]);

  const dbRange = _sites.getRange(+parsedTable[domain].id + 1, 1, 1, newValuerArr.length);

  dbRange.setValues([newValuerArr]);
}
