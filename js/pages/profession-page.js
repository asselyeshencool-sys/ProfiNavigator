import { initLayout } from "../main.js";
import { loadJSON, formatSalary, demandLabel, demandBadgeClass, getParam } from "../utils.js";
import { toggleFavorite, isFavorite } from "../storage.js";
import { printRoadmap } from "../roadmap.js";

initLayout("profession");

(async () => {
  const id = getParam("id");
  const { professions } = await loadJSON("data/professions.json");
  const p = professions.find((x) => x.id === id) || professions[0];
  const el = document.getElementById("detail");
  const hard = (p.hardSkills || [])
    .map((s) => '<span class="skill-tag">' + s.name + "</span>")
    .join("");
  const soft = (p.softSkills || [])
    .map((s) => '<span class="skill-tag">' + s.name + "</span>")
    .join("");
  const steps = (p.roadmapSteps || [])
    .map(
      (s) =>
        "<li><strong>" +
        s.title +
        "</strong> (" +
        s.durationWeeks +
        " апта)<ul>" +
        (s.topics || []).map((t) => "<li>" + t + "</li>").join("") +
        "</ul></li>"
    )
    .join("");
  el.innerHTML =
    "<h1>" +
    p.titleKk +
    '</h1><span class="' +
    demandBadgeClass(p.demandLevel) +
    '">' +
    demandLabel(p.demandLevel) +
    '</span><p class="salary" style="font-size:1.2rem;margin:1rem 0">' +
    formatSalary(p.salaryMin, p.salaryMax) +
    "</p><p>" +
    p.descriptionKk +
    '</p><div class="skill-section"><h3>Hard skills</h3><div class="skill-tags">' +
    hard +
    '</div></div><div class="skill-section"><h3>Soft skills</h3><div class="skill-tags">' +
    soft +
    '</div></div><h3>Skills Roadmap</h3><ol class="roadmap-steps">' +
    steps +
    '</ol><div style="margin-top:1.5rem;display:flex;gap:1rem;flex-wrap:wrap"><button class="btn btn-primary" id="dlBtn">Roadmap жүктеу</button><button class="fav-btn ' +
    (isFavorite(p.id) ? "active" : "") +
    '" id="favBtn">♥ Таңдаулы</button><a class="btn btn-outline" href="compare.html?ids=' +
    p.slug +
    '">Салыстыру</a></div>';
  document.getElementById("dlBtn").onclick = () => printRoadmap(p);
  document.getElementById("favBtn").onclick = () => {
    const r = toggleFavorite(p.id);
    if (!r.ok) {
      alert("Кіріңіз");
      location.href = "auth.html";
      return;
    }
    document.getElementById("favBtn").classList.toggle("active");
  };
})();
