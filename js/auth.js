import { getUsers, saveUsers, setSession, getCurrentUser } from "./storage.js";

export function register({ name, email, password, role }) {
  const users = getUsers();
  if (users.some((u) => u.email === email)) return { ok: false, error: "Бұл email тіркелген" };
  const user = { id: crypto.randomUUID(), name, email, password, role: role || "student" };
  users.push(user);
  saveUsers(users);
  setSession(user.id);
  return { ok: true, user: { id: user.id, name, email, role: user.role } };
}
export function login({ email, password }) {
  const user = getUsers().find((u) => u.email === email && u.password === password);
  if (!user) return { ok: false, error: "Email немесе пароль қате" };
  setSession(user.id);
  return { ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}
export function logout() { setSession(null); }
export function requireAuth(redirect = "auth.html") {
  if (!getCurrentUser()) {
    window.location.href = redirect + "?next=" + encodeURIComponent(location.pathname + location.search);
    return false;
  }
  return true;
}
export { getCurrentUser };
