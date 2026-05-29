import { loadJSON, formatSalary, demandLabel, demandBadgeClass } from "../utils.js";
import { getCurrentUser } from "../storage.js";

const categoryIcons = {
  it: "💻",
  med: "🏥",
  eng: "🔧",
  biz: "📊",
  edu: "📚",
};

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-desktop");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
  }

  const user = getCurrentUser();
  const el = document.getElementById("userNav");
  if (user && el) {
    el.innerHTML = `
      <span class="lang-switch">KZ</span>
      <a href="cabinet.html">${user.name}</a>
      <a class="btn btn-primary btn-sm" href="cabinet.html">Кабинет</a>`;
  }
}

function initFaq() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

function initContact() {
  document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Рахмет! Хабарламаңыз қабылданды (демо режим).");
    e.target.reset();
  });
}

async function initProfessionsPreview() {
  const [{ categories }, { professions }] = await Promise.all([
    loadJSON("data/categories.json"),
    loadJSON("data/professions.json"),
  ]);

  const filtersEl = document.getElementById("landingProfFilters");
  const gridEl = document.getElementById("landingProfGrid");
  if (!filtersEl || !gridEl) return;

  const pills = [
    { id: "", nameKk: "Барлығы" },
    ...categories,
  ];

  pills.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill" + (i === 0 ? " active" : "");
    btn.textContent = cat.nameKk;
    btn.dataset.category = cat.id || "";
    btn.addEventListener("click", () => {
      filtersEl.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.category);
    });
    filtersEl.appendChild(btn);
  });

  function render(categoryId) {
    let list = professions;
    if (categoryId) list = professions.filter((p) => p.categoryId === categoryId);
    list = list.slice(0, 6);
    gridEl.innerHTML = "";
    if (!list.length) {
      gridEl.innerHTML = '<p class="empty-state">Мамандық табылмады</p>';
      return;
    }
    list.forEach((p) => {
      const card = document.createElement("article");
      card.className = "card prof-preview-card";
      const icon = categoryIcons[p.categoryId] || "💼";
      const catName =
        categories.find((c) => c.id === p.categoryId)?.nameKk || "";
      card.innerHTML = `
        <div class="card-top">
          <span class="prof-icon">${icon}</span>
          <span class="${demandBadgeClass(p.demandLevel)}">${demandLabel(p.demandLevel)}</span>
        </div>
        <h3>${p.titleKk}</h3>
        <p style="font-size:0.8rem;color:var(--color-primary);margin-bottom:0.35rem">${catName}</p>
        <p>${p.descriptionKk.slice(0, 90)}…</p>
        <p class="salary" style="color:var(--color-primary);font-weight:600;font-size:0.9rem">${formatSalary(p.salaryMin, p.salaryMax)}</p>
        <div class="card-actions">
          <a href="profession.html?id=${p.id}">Толығырақ</a>
          <a class="btn btn-primary btn-sm" href="profession.html?id=${p.id}">Таңдау</a>
        </div>`;
      gridEl.appendChild(card);
    });
  }

  render("");
}

async function initLandingCharts() {
  const data = await loadJSON("data/market-stats.json");
  const stat = data.stats[0];
  const labels = stat.salaryTrend.map((x) => x.year);

  const salaryCtx = document.getElementById("landingSalaryChart");
  if (salaryCtx) {
    new Chart(salaryCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Жалақы (₸)",
            data: stat.salaryTrend.map((x) => x.value),
            backgroundColor: "#16a34a",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            ticks: {
              callback: (v) => (v / 1000).toFixed(0) + "k",
            },
          },
        },
      },
    });
  }

  const demandCtx = document.getElementById("landingDemandChart");
  if (demandCtx) {
    const cats = data.categories.slice(0, 4);
    new Chart(demandCtx, {
      type: "bar",
      data: {
        labels: cats.map((c) => c.nameKk),
        datasets: [
          {
            label: "Сұраныс",
            data: [95, 88, 72, 65],
            backgroundColor: ["#16a34a", "#22c55e", "#4ade80", "#86efac"],
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });
  }

  const trendEl = document.getElementById("trendList");
  if (trendEl) {
    const trends = [
      ["Бағдарламашы", "+18%"],
      ["Дәрігер", "+12%"],
      ["Деректер аналитигі", "+22%"],
      ["Мұғалім", "+8%"],
    ];
    trendEl.innerHTML = trends
      .map(
        ([name, pct]) =>
          `<li><span>${name}</span><span class="up">${pct}</span></li>`
      )
      .join("");
  }
}

initNav();
initFaq();
initContact();
initProfessionsPreview();
initLandingCharts();
