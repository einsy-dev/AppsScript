import { _active } from "../config";

export function insertColumns() {
  let col = _active.getActiveRange()?.getColumn();
  if (!col) return;
  let count = SpreadsheetApp.getUi().prompt("How many columns").getResponseText();
  if (!count) return;
  _active.insertColumnsAfter(col, +count);
}
