import { _active } from "./config";
import { setSiteData } from "./setSiteData";
import { updateDataBase } from "./updateDatabase";

export function onDomainChange({ range }: GoogleAppsScript.Events.SheetsOnEdit) {
  if (_active.getName() === "_sites") return;
  if (range.getRow() <= 2) {
    console.log("Out of trigger range");
  }
  if (range.getColumn() === 1) {
    setSiteData(range);
  } else {
    updateDataBase(range);
  }
}
