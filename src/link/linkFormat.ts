function linkFormat() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  if (!range) return;
  const selected = range.getValues();
  const formatted: string[][] = [];

  for (let i = 0; i < selected.length; i++) {
    formatted[i] = [];
    for (let j = 0; j < selected[i].length; j++) {
      formatted[i][j] = (parseDomain(selected[i][j]) || "").toLowerCase();
    }
  }
  range.setValues(formatted);
  range.activate();
}
