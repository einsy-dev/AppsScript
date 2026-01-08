function textTrim() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  if (!range) return;
  const selected = range.getValues();
  for (let i = 0; i < selected.length; i++) {
    for (let j = 0; j < selected[i].length; j++) {
      if (typeof selected[i][j] !== "string") return;
      selected[i][j] = selected[i][j].trim();
    }
  }
  range.setValues(selected);
}
