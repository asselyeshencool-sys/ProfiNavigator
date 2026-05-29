export function formatSalary(min, max) {
  const f = (n) => new Intl.NumberFormat("kk-KZ").format(n);
  return f(min) + " – " + f(max) + " ₸";
}
export function demandLabel(level) {
  return { high: "Жоғары", medium: "Орташа", low: "Төмен" }[level] || level;
}
export function demandBadgeClass(level) {
  return "badge badge-" + (level || "medium");
}
export function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
export function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}
export async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error("Дерек жүктелмеді: " + path);
  return res.json();
}
