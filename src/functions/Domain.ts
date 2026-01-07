/**
 * Extracts domain.
 * @param {string} url to parse.
 * @return domain.
 * @customfunction
 */
function DOMAIN(url: string): string | null {
  if (url.match("https?")) {
    url = url.replace("https?", "https");
  } else {
    url = "https://" + url;
  }

  return url.split("/")[2];
}
