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
  if (!parsedTable) return;

  let newValues: { [key: string]: string };

  if (parsedTable[domain]) {
    newValues = updateObject(parsedTable[domain].value, parsedRow);
  } else {
    newValues = parsedRow;
  }

  const keys = getKeys({ sheet: _sites, keyRow: 2 });
  if (!keys) return;

  const newValuerArr =
    keys.map((key) => {
      return newValues[key] || "";
    }) || [];

  if (!newValuerArr.length) return;

  let newRange;

  if (parsedTable[domain]) {
    newRange = _sites.getRange(+parsedTable[domain].id + 1, 1, 1, newValuerArr.length);
  } else {
    newRange = _sites.getRange(_sites.getLastRow() + 1, 1, 1, newValuerArr.length);
  }
  newRange.setValues([newValuerArr]);
}
