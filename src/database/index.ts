import { _active } from "./config";
import { setSiteData } from "./setSiteData";
import { updateDataBase } from "./updateDatabase";

export function refresh() {
  if (_active.getName().includes("_")) return;
  let range = _active.getRange(3, 1, _active.getLastRow(), 1);
  setSiteData(range);
}

export function refreshRange() {
  if (_active.getName().includes("_")) return;
  let range = _active.getActiveRange();
  if (!range) return;
  setSiteData(range);
}

export function onDomainChange({ range }: GoogleAppsScript.Events.SheetsOnEdit) {
  if (_active.getName().includes("_")) return;
  if (range.getRow() <= 2) {
    console.log("Out of trigger range");
    return;
  }

  if (range.getColumn() === 1) {
    setSiteData(range);
  } else {
    updateDataBase(range);
  }
}
