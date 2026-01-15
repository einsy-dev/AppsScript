import { _active } from "../config";

export function rotate() {
  const range = _active.getActiveRange();
  if (!range) return;
  const selected: string[][] = range.getValues();
  const [col, row] = [range.getColumn(), range.getRow()];

  const res: string[][] = [[]];

  for (let i = 0; i < selected.length; i++) {
    for (let j = 0; j < selected[i].length; j++) {
      if (!Array.isArray(res[j])) res[j] = [];
      res[j].push(selected[i][j]);
    }
  }

  let newRange = _active.getRange(row, col, res.length, res[0].length);
  range.clearContent();
  newRange.setValues(res);
  newRange.activate();
}
