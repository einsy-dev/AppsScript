import { _active } from "../config";
import { parseDomain } from "../utils/parseDomain";

interface DomainsI {
  [domain: string]: { [key: string]: string };
}

interface ValuesProps {
  range: GoogleAppsScript.Spreadsheet.Range;
  keyRow: number;
  keyCol: number;
}

export class Values {
  sheet: GoogleAppsScript.Spreadsheet.Sheet;
  range: GoogleAppsScript.Spreadsheet.Range;
  values: string[][];
  keyCol: number;
  keyRow: number;
  cols: { [key: string]: number } = {}; // {domain: 0, url: 1 ... }
  rows: { [domain: string]: number } = {}; // {google.com: 0, facebook.com: 1 ...}

  constructor({ range, keyRow, keyCol }: ValuesProps) {
    this.sheet = range.getSheet();
    this.range = this.sheet.getRange(range.getRow(), 1, range.getNumRows(), this.sheet.getLastColumn());
    this.values = this.range.getValues();
    this.keyCol = keyCol;
    this.keyRow = keyRow;
    this._getCols({ keyRow: this.keyRow });
    this._getRows({ keyCol: this.keyCol });
  }

  private _getCols({ keyRow }: { keyRow: number }) {
    let keys = this.sheet.getRange(keyRow, 1, 1, this.sheet.getLastColumn()).getValues()[0];
    this.cols = keys.reduce((acc, el, i) => {
      acc[el] = i;
      return acc;
    }, {} as { [key: string]: number });
  }

  private _getRows({ keyCol }: { keyCol: number }) {
    this.rows = this.values.reduce((acc, row: string[], i: number) => {
      let domain = parseDomain(row[keyCol - 1]);
      if (domain && acc[domain] === undefined) {
        acc[domain] = i;
      }
      return acc;
    }, {} as { [domain: string]: number });
  }

  private _parseRow(domain: string): { [key: string]: string } {
    const res: { [key: string]: string } = {};
    for (let key in this.cols) {
      res[key] = this.values[this.rows[domain]]?.[this.cols[key]] || "";
    }
    return res;
  }

  set(domain: string, key: string, value: string, create: boolean = false) {
    let col = this.cols[key];
    let row = this.rows[domain];

    if (col === undefined) return;

    if (row === undefined && create) {
      this.rows[domain] = this.values.length - 2;
      row = this.rows[domain];
      this.values[row] = Array(this.values[0].length).fill("");
      this.values[row][this.keyCol] = domain;
    }

    if (row === undefined) return;

    this.values[row][col] = value;
  }

  save() {
    const newRange = this.sheet.getRange(this.range.getRow(), 1, this.values.length, this.values[0].length);
    this.range = newRange;
    newRange.setValues(this.values);
  }

  get(domain: string[]): DomainsI {
    const res: DomainsI = {};
    for (let i = 0; i < domain.length; i++) {
      res[domain[i]] = this._parseRow(domain[i]);
    }
    return res;
  }

  update(values: Values, params: { create?: boolean; clear?: boolean } = { create: false, clear: false }) {
    const sameKeys = Object.keys(this.cols)
      .filter((key) => Object.prototype.hasOwnProperty.call(values.cols, key))
      .reduce((obj, key) => {
        obj[key] = this.cols[key];
        return obj;
      }, {} as { [key: string]: number });

    if (params.clear) {
      this.sheet.getRange(this.range.getRow(), 2, this.range.getNumRows(), _active.getLastColumn() - 1).clearContent();
      this.values = this.range.getValues();
    }

    for (let domain in values.rows) {
      for (let key in sameKeys) {
        this.set(domain, key, values.values[values.rows[domain]][values.cols[key]], params.create);
      }
    }
    this.save();
  }
}
