export function printRoadmap(profession) {
  const w = window.open("", "_blank");
  w.document.write(`<!DOCTYPE html><html lang="kk"><head><meta charset="UTF-8"><title>${profession.titleKk} — Roadmap</title>
  <style>body{font-family:sans-serif;padding:2rem;max-width:800px;margin:auto}h1{color:#2563eb}li{margin:.5rem 0}</style></head><body>
  <h1>${profession.titleKk}</h1><p>Skills Roadmap — ProfiNavigator</p><ol>
  ${(profession.roadmapSteps || []).map((s) => `<li><strong>${s.title}</strong> (${s.durationWeeks} апта)<ul>${(s.topics||[]).map((t)=>`<li>${t}</li>`).join("")}</ul></li>`).join("")}
  </ol><p><small>Басылған: ${new Date().toLocaleDateString("kk-KZ")}</small></p></body></html>`);
  w.document.close();
  w.print();
}
