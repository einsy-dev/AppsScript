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
  rows: { [domain: string]: number | number[] } = {}; // {google.com: 0, facebook.com: 1 ...}

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
    }, {} as { [key: string]: number | number[] });
  }

  private _getRows({ keyCol }: { keyCol: number }) {
    this.rows = this.values.reduce((acc, row: string[], i: number) => {
      let domain = parseDomain(row[keyCol - 1]);
      if (!domain) return acc;

      if (acc[domain] === undefined) {
        acc[domain] = i;
      } else if (Array.isArray(acc[domain])) {
        acc[domain].push(i);
      } else {
        acc[domain] = [acc[domain], i];
      }
      return acc;
    }, {} as { [domain: string]: number | number[] });
  }

  private _parseRow(domain: string): { [key: string]: string } {
    const res: { [key: string]: string } = {};

    const row = Array.isArray(this.rows[domain]) ? this.values[this.rows[domain][0]] : this.values[this.rows[domain]];
    if (!row) return res;

    for (let key in this.cols) {
      res[key] = row[this.cols[key]] || "";
    }

    return res;
  }

  set(
    domain: string,
    key: string,
    value: string,
    { create = false, preserve = false }: { create?: boolean; preserve?: boolean } = {}
  ) {
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

    if (Array.isArray(row)) {
      for (let el of row) {
        this.values[el][col] = !value && preserve ? this.values[el][col] : value;
      }
    } else {
      this.values[row][col] = !value && preserve ? this.values[row][col] : value;
    }
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

  update(
    values: Values,
    { create = false, clear = false, preserve = false }: { create?: boolean; clear?: boolean; preserve?: boolean } = {}
  ) {
    const sameKeys = Object.keys(this.cols)
      .filter((key) => Object.prototype.hasOwnProperty.call(values.cols, key))
      .reduce((obj, key) => {
        obj[key] = this.cols[key];
        return obj;
      }, {} as { [key: string]: number });

    if (clear) {
      this.sheet.getRange(this.range.getRow(), 2, this.range.getNumRows(), _active.getLastColumn() - 1).clearContent();
      this.values = this.range.getValues();
    }

    for (let domain in values.rows) {
      if (Array.isArray(values.rows[domain])) {
        for (let el of values.rows[domain]) {
          for (let key in sameKeys) {
            this.set(domain, key, values.values[el][values.cols[key]], {
              create,
              preserve
            });
          }
        }
      } else {
        for (let key in sameKeys) {
          this.set(domain, key, values.values[values.rows[domain]][values.cols[key]], {
            create,
            preserve
          });
        }
      }
    }
    this.save();
  }
}
