function insertColumns() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let col = sheet.getActiveRange()?.getColumn();
  if (!col) return;
  let count = SpreadsheetApp.getUi().prompt("How many columns").getResponseText();
  if (!count) return;
  sheet.insertColumnsAfter(col, +count);
}
