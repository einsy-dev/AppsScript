interface DatabaseI {
  [domain: string]: {
    id: number;
    value: { [key: string]: string };
  };
}

export function parseTable({
  sheet,
  keyRow = 0
}: {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  keyRow: number;
}): DatabaseI | undefined {
  if (!sheet) return;
  const table = sheet.getDataRange().getValues();
  const db: DatabaseI = {};

  const keys = [];
  for (let i = keyRow; i < table.length; i++) {
    if (i > keyRow) {
      db[table[i][0]] = { id: i, value: {} };
    }
    for (let j = 0; j < table[0].length; j++) {
      if (i === keyRow) {
        keys.push(table[i][j] || "");
      } else {
        if (!keys[j]) continue;
        if (db[table[i][0]].value[keys[j]]) keys[j] += j + 1;
        db[table[i][0]].value[keys[j]] = table[i][j] || "";
      }
    }
  }
  return db;
}
