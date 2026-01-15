import { ParsedSheet } from "../../config";

export function parseSheet({
  sheet,
  keyRow = 2
}: {
  sheet: GoogleAppsScript.Spreadsheet.Sheet | null;
  keyRow?: number;
}): ParsedSheet | undefined {
  if (!sheet) return;
  const values = sheet.getDataRange().getValues();
  keyRow--;
  const keys = values[keyRow];

  const result: ParsedSheet = {};

  for (let i = ++keyRow; i < values.length; i++) {
    let domain = values[i][0];
    result[domain] = { id: i + 1, value: {} };

    for (let j = 0; j < keys.length; j++) {
      if (!keys[j]) continue;
      if (result[domain].value[keys[j]]) keys[j] += j + 1;
      result[domain].value[keys[j]] = values[i][j];
    }
  }

  return result;
}
