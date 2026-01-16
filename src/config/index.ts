import { Values } from "../database/values";

export const _active = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
export const _sites = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("_sites");

export const _activeValues = _active
  ? new Values({
      range: _active.getRange(3, 1, _active.getLastRow(), _active.getLastColumn()),
      keyRow: 2,
      keyCol: 1
    })
  : null;

export const _sitesValues = _sites
  ? new Values({
      range: _sites.getRange(3, 1, _sites.getLastRow(), _sites.getLastColumn()),
      keyRow: 2,
      keyCol: 1
    })
  : null;
