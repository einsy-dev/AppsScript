function getDomain(url: string): string | null {
  if (!url) return "";
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function formatLinks() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  if (!range) return;
  const selected = range.getValues();
  const formatted: string[][] = [];

  for (let i = 0; i < selected.length; i++) {
    formatted[i] = [];
    for (let j = 0; j < selected[i].length; j++) {
      formatted[i][j] = (getDomain(selected[i][j]) || "").toLowerCase();
    }
  }
  range.setValues(formatted);
  range.activate();
}
