export function filterRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  if (!range) return;
  const selected = range.getValues();
  const uniqueSet = new Set<{ [key: string]: string }>();
  const newValues: string[][] = [];

  for (let i = 0; i < selected.length; i++) {
    for (let j = 0; j < selected[i].length; j++) {
      const value = selected[i][j];
      if (value.trim() !== "" && !uniqueSet.has(value)) {
        uniqueSet.add(value);
        let row: string[][] = sheet
          .getRange(range.getRow() + i, range.getColumn(), 1, sheet.getLastColumn())
          .getValues();
        newValues.push(row[0]);
        console.log(newValues);
      }
    }
  }

  const [row, col] = [range.getRow(), range.getColumn()];
  const rangeToClear = sheet.getRange(row, col, range.getLastRow(), sheet.getLastColumn());
  rangeToClear.clearContent();
  const newRange = sheet.getRange(row, col, newValues.length, newValues[0].length);
  newRange.setValues(newValues);
  newRange.activate();
}
