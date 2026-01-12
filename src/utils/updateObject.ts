export function updateObject(target: { [key: string]: any }, source: { [key: string]: any }): any {
  let t = { ...target };
  let s = { ...source };
  for (const key in t) {
    if (Object.prototype.hasOwnProperty.call(t, key) && Object.prototype.hasOwnProperty.call(s, key)) {
      t[key] = s[key];
    }
  }
  return t;
}
