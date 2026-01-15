import { _sitesValues } from "../config";
import { Values } from "./values";

export function updateSheet(range: GoogleAppsScript.Spreadsheet.Range) {
  if (!_sitesValues) {
    console.error("_sitesValues is null");
    return;
  }
  const data = new Values({ range, keyRow: 2, keyCol: 1 });
  data.update(_sitesValues);
}
