function onOpen() {
  let ui = SpreadsheetApp.getUi();
  let menu = ui.createMenu("Scripts");

  let text = ui.createMenu("Text")
  text
    .addItem("Trim", "trimText")
    .addItem("Put in", "putTextIn")
    .addItem("Domain", "formatLinks")

  let link = ui.createMenu("Link")
  link
    .addItem("Domain", "formatLinks")


  let filter = ui.createMenu("Filter")
  filter
    .addItem("Repeat value", "filterUniqueRows")
    .addItem("Empty row", "filterEmptyRows")

  let insert = ui.createMenu("Insert")
  insert
    .addItem("Insert columns", "insertColumns")
    .addItem("Insert rows", "insertRows")

  let data = ui.createMenu("Data")
  data
    .addItem("Mark bad sites", "markBadSites")
    .addItem("Mark saved sites", "markSavedSites")

  menu
    .addItem("Change orientation", "changeOrientation")
    .addSubMenu(text)
    .addSubMenu(link)
    .addSubMenu(insert)
    .addSubMenu(filter)
    .addSubMenu(data)
    .addToUi();
}

function blank() { }





