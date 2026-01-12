import * as database from "./database";
import { filterCols } from "./filter/filterCols";
import { filterRows } from "./filter/filterRows";
import { insertColumns } from "./insert/insertCols";
import { insertRows } from "./insert/insertRows";
import { rotate } from "./rotate/rotate";
import { textIn } from "./text/textIn";
import { textTrim } from "./text/textTrim";
import { parseDomain } from "./utils/parseDomain";

function onOpen() {
  let ui = SpreadsheetApp.getUi();
  let menu = ui.createMenu("Scripts");

  // let text = ui.createMenu("Text");
  // text.addItem("Trim", "trimText").addItem("Put in", "putTextIn").addItem("Domain", "formatLinks");

  // let link = ui.createMenu("Link");
  // link.addItem("Domain", "formatLinks");

  let filter = ui.createMenu("Filter");
  filter.addItem("Filter rows", "filterRows");

  // let insert = ui.createMenu("Insert");
  // insert.addItem("Insert columns", "insertColumns").addItem("Insert rows", "insertRows");

  // let data = ui.createMenu("Data");
  // data.addItem("Mark bad sites", "markBadSites").addItem("Mark saved sites", "markSavedSites");

  menu
    .addItem("Change orientation", "changeOrientation")
    // .addSubMenu(text)
    // .addSubMenu(link)
    // .addSubMenu(insert)
    // .addSubMenu(data)
    .addSubMenu(filter)
    .addToUi();
}

(globalThis as any) = {
  ...globalThis,
  parseDomain,
  textIn,
  textTrim,
  rotate,
  insertColumns,
  insertRows,
  filterRows,
  filterCols,
  database
};
