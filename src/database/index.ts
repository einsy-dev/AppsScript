import { _active, _sitesValues } from "../config";
import { Values } from "./values";

export function refresh() {
  if (_active.getName().includes("_")) return;
  if (!_sitesValues) {
    console.error("_sitesValues is null");
    return;
  }

  let range = _active.getRange(3, 1, _active.getLastRow(), 1);
  const data = new Values({ range, keyRow: 2, keyCol: 1 });
  data.update(_sitesValues, { clear: true });
}

export function refreshRange() {
  let activeRange = _active.getActiveRange();
  if (!activeRange) return;
  if (!_sitesValues) {
    console.error("_sitesValues is null");
    return;
  }
  const range = _active.getRange(activeRange.getRow(), 1, activeRange.getNumRows(), 1);
  if (!range) return;
  const data = new Values({ range, keyRow: 2, keyCol: 1 });
  data.update(_sitesValues, { clear: true });
}

export function updateRange() {
  let range = _active.getActiveRange();
  if (!range) return;
  if (!_sitesValues) {
    console.error("_sitesValues is null");
    return;
  }
  const data = new Values({ range, keyRow: 2, keyCol: 1 });
  _sitesValues.update(data, { create: true, preserve: true });
}

export function onDomainChange({ range }: GoogleAppsScript.Events.SheetsOnEdit) {
  if (range.getSheet().getName().includes("_")) return;
  if (range.getRow() <= 2) {
    console.log("Out of trigger range");
    return;
  }
  if (!_sitesValues) {
    console.error("_sitesValues is null");
    return;
  }

  const data = new Values({ range, keyRow: 2, keyCol: 1 });

  if (range.getColumn() === 1) {
    data.update(_sitesValues, { clear: true });
  } else {
    _sitesValues.update(data, { create: true, preserve: true });
  }
}
