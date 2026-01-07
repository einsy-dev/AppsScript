function filterUniqueRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  if (!range) return;
  const selected = range.getValues();
  const uniqueSet = new Set();
  const newValues = [];

  for (let i = 0; i < selected.length; i++) {
    for (let j = 0; j < selected[i].length; j++) {
      const value = selected[i][j];
      if (!uniqueSet.has(value)) {
        uniqueSet.add(value);
      } else {
        let row = sheet.getRange(range.getRow() + i, sheet.getLastColumn()).getValues();
        newValues.push(row);
      }
    }
  }

  const [col, row] = [range.getColumn(), range.getRow()];
  const newRange = sheet.getRange(row, col, newValues.length, 1);
  range.clearContent();
  newRange.setValues(newValues);
  newRange.activate();
}

function filterEmptyRows() {
  // const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // const range = sheet.getActiveRange();
  // if (!range) return;
  // const selected: string[][] = range.getValues();
  // // const newValues: string[][] = [];
  // for (let i = 0; i < selected.length; i++) {
  //   for (let j = 0; j < selected[i].length; j++) {
  //     const value = selected[i][j];
  //     if (value.trim() !== "") {
  //       let row = sheet.getRange(range.getRow() + i, range.getColumn(), 1, sheet.getLastColumn());
  //       let rowValues = row.getValues();
  //       console.log(rowValues, row.getRow());
  //     }
  //   }
  // }
  // const [col, row] = [range.getColumn(), range.getRow()];
  // const newRange = sheet.getRange(row, col, newValues.length, 1);
  // range.clearContent();
  // newRange.setValues(newValues);
  // newRange.activate();
}
