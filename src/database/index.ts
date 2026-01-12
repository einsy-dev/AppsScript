import { setSiteData } from "./setSiteData";

export function onDomainChange({ range }: GoogleAppsScript.Events.SheetsOnEdit) {
  if (range.getColumn() === 1 && range.getRow() > 2) {
    setSiteData(range);
  } else {
    console.log("out of trigger range");
  }
}
