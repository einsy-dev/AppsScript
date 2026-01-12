import { _active, _sites } from "./config";

export function getKeys({ sheet, keyRow = 0 }: { sheet: GoogleAppsScript.Spreadsheet.Sheet; keyRow: number }) {
  if (!sheet) return;
  const values = sheet.getRange(keyRow, 1, 1, sheet.getLastColumn()).getValues();
  const keys = [];
  for (let j = 0; j < values[0].length; j++) {
    keys.push(values[0][j] || "");
  }
  return keys;
}
