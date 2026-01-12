import { _active, _sites } from "./config";
import { getKeys } from "./getKeys";
import { parseTable } from "./parseTable";
import { updateDataBase } from "./updateDatabase";

export function setSiteData(range: GoogleAppsScript.Spreadsheet.Range) {
  if (!_sites) return;
  const parsed = parseTable({ sheet: _sites, keyRow: 1 });
  if (!parsed) return;
  let keys = getKeys({ sheet: _active, keyRow: 2 });
  if (!keys?.length) return;

  let rangeArr: string[][] = range.getValues();
  let newValues: string[][] = [];

  for (let i = 0; i < rangeArr.length; i++) {
    const domain = rangeArr[i][0] || "";
    if (!parsed[domain]) {
      updateDataBase(range);
      continue;
    }
    for (let j = 0; j < rangeArr[i].length; j++) {
      let data: string[] = [domain];
      for (let key of keys) {
        if (key === "Domain") continue;
        data.push(parsed[domain].value?.[key] || "");
      }
      newValues.push(data);
    }
  }
  const newRange = _active.getRange(range.getRow(), 1, newValues.length, newValues[0].length);
  newRange.setValues(newValues);
}
