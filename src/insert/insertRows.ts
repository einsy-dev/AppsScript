import { _active } from "../config";

export function insertRows() {
  let row = _active.getActiveRange()?.getRow();
  if (!row) return;
  let count = SpreadsheetApp.getUi().prompt("How many rows").getResponseText();
  if (!count) return;
  _active.insertRowsAfter(row, +count);
}
