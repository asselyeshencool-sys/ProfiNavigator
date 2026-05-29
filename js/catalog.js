import { formatSalary, demandLabel, demandBadgeClass, debounce } from "./utils.js";
import { getCurrentUser, toggleFavorite, isFavorite } from "./storage.js";

export function filterProfessions(all, { category, demand, query }) {
  return all.filter((p) => {
    if (category && p.categoryId !== category) return false;
    if (demand && p.demandLevel !== demand) return false;
    if (query) {
      const q = query.toLowerCase();
      const text = (p.titleKk + " " + p.descriptionKk).toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
}

export function renderProfessionCard(p, container) {
  const card = document.createElement("article");
  card.className = "card profession-card";
  const fav = isFavorite(p.id);
  card.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:start">
      <h3><a href="profession.html?id=${p.id}">${p.titleKk}</a></h3>
      <button class="fav-btn ${fav ? "active" : ""}" data-id="${p.id}" aria-label="Таңдаулы">♥</button>
    </div>
    <span class="${demandBadgeClass(p.demandLevel)}">${demandLabel(p.demandLevel)} сұраныс</span>
    <p class="salary">${formatSalary(p.salaryMin, p.salaryMax)}</p>
    <p>${p.descriptionKk.slice(0, 120)}...</p>
    <div class="profession-card-actions">
      <a class="btn btn-primary" href="profession.html?id=${p.id}">Толығырақ</a>
      <a class="btn btn-outline" href="compare.html?ids=${p.slug}">Салыстыру</a>
    </div>`;
  card.querySelector(".fav-btn").addEventListener("click", () => {
    const r = toggleFavorite(p.id);
    if (!r.ok) { alert("Таңдаулыға қосу үшін кіріңіз"); location.href = "auth.html"; return; }
    card.querySelector(".fav-btn").classList.toggle("active");
  });
  container.appendChild(card);
}

export function bindCatalogFilters(all, container, els) {
  const render = () => {
    const filtered = filterProfessions(all, {
      category: els.category.value,
      demand: els.demand.value,
      query: els.search.value.trim(),
    });
    container.innerHTML = "";
    if (!filtered.length) {
      container.innerHTML = '<p class="empty-state">Мамандық табылмады</p>';
      return;
    }
    filtered.forEach((p) => renderProfessionCard(p, container));
  };
  els.category.addEventListener("change", render);
  els.demand.addEventListener("change", render);
  els.search.addEventListener("input", debounce(render));
  render();
}
