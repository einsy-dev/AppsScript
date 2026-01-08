function textIn() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  if (!range) return;
  let quote = SpreadsheetApp.getUi().prompt("*some text*").getResponseText();
  const selected = range.getValues();

  for (let i = 0; i < selected.length; i++) {
    for (let j = 0; j < selected[i].length; j++) {
      selected[i][j] = quote + selected[i][j] + quote;
    }
  }
  range.setValues(selected);
}
