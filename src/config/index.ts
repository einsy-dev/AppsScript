import { Values } from "../database/values";

export const _active = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
export const _sites = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_sites");

export const _sitesValues = _sites
  ? new Values({
      range: _sites.getRange(3, 1, _sites.getLastRow(), _sites.getLastColumn()),
      keyRow: 2,
      keyCol: 1
    })
  : null;
