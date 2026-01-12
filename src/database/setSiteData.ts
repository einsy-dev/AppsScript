import { _active, _sites } from "./config";
import { getKeys } from "./getKeys";
import { parseTable } from "./parseTable";

export function setSiteData(range: GoogleAppsScript.Spreadsheet.Range) {
  if (!_sites) return;
  const parsed = parseTable({ sheet: _sites, keyRow: 1 });
  if (!parsed) return;
  let keys = getKeys({ sheet: _active, keyRow: 2 });
  if (!keys?.length) return;
  const domain = range.getValue();
  let data: (string | number)[][] = [[domain]];

  for (let key of keys) {
    if (key === "Domain") continue;
    data[0].push(parsed[domain].value?.[key] || "");
  }
  const newRange = _active.getRange(range.getRow(), 1, 1, data[0].length);
  newRange.setValues(data);
}
