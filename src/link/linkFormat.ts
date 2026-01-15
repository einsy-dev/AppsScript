import { _active } from "../config";
import { parseDomain } from "../utils/parseDomain";

export function linkFormat() {
  const range = _active.getActiveRange();
  if (!range) return;
  const selected = range.getValues();
  const formatted: string[][] = [];

  for (let i = 0; i < selected.length; i++) {
    formatted[i] = [];
    for (let j = 0; j < selected[i].length; j++) {
      formatted[i][j] = parseDomain(selected[i][j]) || "";
    }
  }
  range.setValues(formatted);
  range.activate();
}
