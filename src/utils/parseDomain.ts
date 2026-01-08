function parseDomain(url: string): string | null {
  if (!url) return "";
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}
