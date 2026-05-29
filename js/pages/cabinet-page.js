import { initLayout } from "../main.js";
import { requireAuth } from "../auth.js";
import {
  getCurrentUser,
  getFavorites,
  getTestResults,
  updateProfile,
} from "../storage.js";
import { loadJSON, formatSalary } from "../utils.js";

initLayout("cabinet");
if (!requireAuth()) throw new Error("auth");

const user = getCurrentUser();
document.getElementById("profileName").textContent = user.name;
document.getElementById("profileEmail").textContent = user.email;
document.getElementById("editName").value = user.name;
document.getElementById("editRole").value = user.role || "student";

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

document.getElementById("profileForm").onsubmit = (e) => {
  e.preventDefault();
  const u = updateProfile({
    name: document.getElementById("editName").value.trim(),
    role: document.getElementById("editRole").value,
  });
  document.getElementById("profileName").textContent = u.name;
  alert("Сақталды");
};

(async () => {
  const { professions } = await loadJSON("data/professions.json");
  const favIds = getFavorites();
  const favEl = document.getElementById("favList");
  if (!favIds.length) favEl.innerHTML = '<p class="empty-state">Таңдаулылар жоқ</p>';
  else
    favEl.innerHTML = favIds
      .map((id) => {
        const p = professions.find((x) => x.id === id);
        if (!p) return "";
        return (
          '<div class="card" style="margin-bottom:.75rem"><a href="profession.html?id=' +
          p.id +
          '"><strong>' +
          p.titleKk +
          "</strong></a><p>" +
          formatSalary(p.salaryMin, p.salaryMax) +
          "</p></div>"
        );
      })
      .join("");

  const tests = getTestResults();
  const testEl = document.getElementById("testList");
  if (!tests.length) testEl.innerHTML = '<p class="empty-state">Тест нәтижелері жоқ</p>';
  else
    testEl.innerHTML = tests
      .map(
        (t) =>
          '<div class="card" style="margin-bottom:.75rem"><small>' +
          new Date(t.date).toLocaleString("kk-KZ") +
          "</small><ul>" +
          (t.top || [])
            .map((x) => "<li>" + x.title + " — " + x.match + "%</li>")
            .join("") +
          "</ul></div>"
      )
      .join("");
})();
