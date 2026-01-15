interface ParseRowsI {
  [domain: string]: {
    [key: string]: string;
  };
}

export function parseRange({ range, keyRow = 2 }: { range: GoogleAppsScript.Spreadsheet.Range; keyRow?: number }) {
  const values: string[][] = range.getValues();
  const result: ParseRowsI = {};

  const sheet = range.getSheet();
  let keys: string[] = sheet.getRange(keyRow, 1, 1, sheet.getLastColumn()).getValues()[0];

  for (let i = 1, row, domain; i < values.length; i++) {
    row = values[i];
    domain = row[0];
    result[domain] = {};

    for (let j = 0; j < keys.length; j++) {
      if (!keys[j]) continue;
      if (result[domain][keys[j]]) keys[j] += j + 1;
      result[domain][keys[j]] = row[i][j];
    }
  }

  return { sheet, range, parsed: result };
}
