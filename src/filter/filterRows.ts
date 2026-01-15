import { _active } from "../config";

export function filterRows() {
  const activeRange = _active.getActiveRange();
  if (!activeRange) return;

  const [row, col] = [activeRange.getRow(), activeRange.getColumn()];
  const rows = _active.getRange(row, 1, activeRange.getNumRows(), _active.getLastColumn());
  let rowsValues: string[][] = rows.getValues();

  const uniqueSet = new Set<string>();
  rowsValues = rowsValues.filter((val) => {
    const value: string = val[col - 1].trim();
    if (value !== "" && !uniqueSet.has(value)) {
      uniqueSet.add(value);
      return true;
    } else {
      return false;
    }
  });

  rows.clearContent();
  const newRange = _active.getRange(row, 1, rowsValues.length, rowsValues[0].length);
  newRange.setValues(rowsValues);
  newRange.activate();
}
