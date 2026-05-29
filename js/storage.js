const USERS_KEY = "pn_users";
const SESSION_KEY = "pn_session";
const FAV_KEY = "pn_favorites";
const TESTS_KEY = "pn_test_results";

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
export function getCurrentUser() {
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  return getUsers().find((u) => u.id === id) || null;
}
export function setSession(userId) {
  if (userId) localStorage.setItem(SESSION_KEY, userId);
  else localStorage.removeItem(SESSION_KEY);
}
export function getFavorites() {
  const user = getCurrentUser();
  if (!user) return [];
  const all = JSON.parse(localStorage.getItem(FAV_KEY) || "{}");
  return all[user.id] || [];
}
export function toggleFavorite(professionId) {
  const user = getCurrentUser();
  if (!user) return { ok: false, reason: "login" };
  const all = JSON.parse(localStorage.getItem(FAV_KEY) || "{}");
  const list = all[user.id] || [];
  const idx = list.indexOf(professionId);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(professionId);
  all[user.id] = list;
  localStorage.setItem(FAV_KEY, JSON.stringify(all));
  return { ok: true, favorites: list };
}
export function isFavorite(professionId) {
  return getFavorites().includes(professionId);
}
export function saveTestResult(result) {
  const user = getCurrentUser();
  if (!user) return false;
  const all = JSON.parse(localStorage.getItem(TESTS_KEY) || "{}");
  const list = all[user.id] || [];
  list.unshift({ ...result, date: new Date().toISOString() });
  all[user.id] = list.slice(0, 20);
  localStorage.setItem(TESTS_KEY, JSON.stringify(all));
  return true;
}
export function getTestResults() {
  const user = getCurrentUser();
  if (!user) return [];
  const all = JSON.parse(localStorage.getItem(TESTS_KEY) || "{}");
  return all[user.id] || [];
}
export function updateProfile(data) {
  const user = getCurrentUser();
  if (!user) return null;
  const users = getUsers().map((u) => (u.id === user.id ? { ...u, ...data } : u));
  saveUsers(users);
  return users.find((u) => u.id === user.id);
}
