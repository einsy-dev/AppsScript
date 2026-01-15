import * as database from "./database";
import { refresh, refreshRange, updateRange } from "./database";
import { filterCols } from "./filter/filterCols";
import { filterRows } from "./filter/filterRows";
import { insertColumns } from "./insert/insertCols";
import { insertRows } from "./insert/insertRows";
import { linkFormat } from "./link/linkFormat";
import { rotate } from "./rotate/rotate";
import { textIn } from "./text/textIn";
import { textTrim } from "./text/textTrim";
import { parseDomain } from "./utils/parseDomain";

function onOpen() {
  let ui = SpreadsheetApp.getUi();
  let menu = ui.createMenu("Scripts");

  let text = ui.createMenu("Text");
  text.addItem("Text trim", "textTrim").addItem("Text in", "textIn").addItem("Link domain", "formatLinks");

  let link = ui.createMenu("Link");
  link.addItem("Domain", "linkFormat");

  let filter = ui.createMenu("Filter");
  filter.addItem("Filter rows", "filterRows");

  let insert = ui.createMenu("Insert");
  insert.addItem("Insert columns", "insertColumns").addItem("Insert rows", "insertRows");

  menu
    .addItem("Refresh", "refresh")
    .addItem("Refresh range", "refreshRange")
    .addItem("Update range", "updateRange")
    .addItem("Change orientation", "changeOrientation")
    .addSubMenu(text)
    .addSubMenu(link)
    .addSubMenu(insert)
    .addSubMenu(filter)
    .addToUi();
}

(globalThis as any) = {
  ...globalThis,
  parseDomain,
  textIn,
  textTrim,
  linkFormat,
  rotate,
  refresh,
  refreshRange,
  updateRange,
  insertColumns,
  insertRows,
  filterRows,
  filterCols,
  database
};
