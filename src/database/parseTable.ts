export function parseTable({
  sheet,
  keyRow = 0
}: {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  keyRow: number;
}): { [key: string]: { [key: string]: string | number } } | undefined {
  if (!sheet) return;
  const database = sheet.getDataRange().getValues();
  const db: { [key: string]: { [key: string]: string | number } } = {};

  const keys = [];
  for (let i = keyRow; i < database.length; i++) {
    if (i > 0) {
      db[database[i][0]] = { id: i };
    }
    for (let j = 0; j < database[0].length; j++) {
      if (i === keyRow) {
        keys.push(database[i][j] || "");
      } else {
        if (!keys[j]) continue;
        db[database[i][0]][keys[j]] = database[i][j] || "";
      }
    }
  }
  return db;
}
