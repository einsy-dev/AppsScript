function insertColumns() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let col = sheet.getActiveRange()?.getColumn();
  if (!col) return;
  let count = SpreadsheetApp.getUi().prompt("How many columns").getResponseText();
  if (!count) return;
  sheet.insertColumnsAfter(col, +count);
}

function insertRows() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let row = sheet.getActiveRange()?.getRow();
  if (!row) return;
  let count = SpreadsheetApp.getUi().prompt("How many rows").getResponseText();
  if (!count) return;
  sheet.insertRowsAfter(row, +count);
}
