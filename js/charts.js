import { loadJSON } from "./utils.js";

let salaryChart, vacancyChart;

export async function initCharts() {
  const data = await loadJSON("data/market-stats.json");
  const select = document.getElementById("categorySelect");
  const render = (catId) => {
    const stat = data.stats.find((s) => s.categoryId === catId) || data.stats[0];
    const labels = stat.salaryTrend.map((x) => x.year);
    if (salaryChart) salaryChart.destroy();
    if (vacancyChart) vacancyChart.destroy();
    salaryChart = new Chart(document.getElementById("salaryChart"), {
      type: "line",
      data: { labels, datasets: [{ label: "Орташа жалақы (₸)", data: stat.salaryTrend.map((x) => x.value), borderColor: "#2563eb", tension: 0.3 }] },
      options: { responsive: true },
    });
    vacancyChart = new Chart(document.getElementById("vacancyChart"), {
      type: "bar",
      data: { labels, datasets: [{ label: "Бос орындар", data: stat.vacancyTrend.map((x) => x.value), backgroundColor: "#0ea5e9" }] },
      options: { responsive: true },
    });
  };
  data.stats.forEach((s) => {
    const cat = data.categories.find((c) => c.id === s.categoryId);
    const opt = document.createElement("option");
    opt.value = s.categoryId;
    opt.textContent = cat?.nameKk || s.categoryId;
    select.appendChild(opt);
  });
  select.addEventListener("change", () => render(select.value));
  render(select.value);
}
