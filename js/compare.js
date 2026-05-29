import { formatSalary, demandLabel, loadJSON, getParam } from "./utils.js";

export async function initCompare() {
  const idsParam = getParam("ids") || "";
  const slugs = idsParam.split(",").filter(Boolean).slice(0, 3);
  const { professions } = await loadJSON("data/professions.json");
  let list = slugs.length
    ? professions.filter((p) => slugs.includes(p.slug))
    : [];
  if (!list.length) list = professions.slice(0, 2);
  const wrap = document.getElementById("compareTable");
  if (!wrap) return;
  const rows = [
    ["Мамандық", ...list.map((p) => p.titleKk)],
    ["Жалақы", ...list.map((p) => formatSalary(p.salaryMin, p.salaryMax))],
    ["Сұраныс", ...list.map((p) => demandLabel(p.demandLevel))],
    [
      "Hard skills",
      ...list.map((p) =>
        (p.hardSkills || [])
          .slice(0, 3)
          .map((s) => s.name)
          .join(", ")
      ),
    ],
    [
      "Soft skills",
      ...list.map((p) =>
        (p.softSkills || [])
          .slice(0, 3)
          .map((s) => s.name)
          .join(", ")
      ),
    ],
  ];
  wrap.innerHTML =
    "<table class='compare-table'><tbody>" +
    rows
      .map(
        (r) =>
          "<tr>" + r.map((c) => "<td>" + c + "</td>").join("") + "</tr>"
      )
      .join("") +
    "</tbody></table>";
}
