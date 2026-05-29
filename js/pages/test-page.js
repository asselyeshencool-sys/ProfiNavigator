import { initLayout } from "../main.js";
import { loadJSON } from "../utils.js";
import { calculateResults } from "../test-engine.js";
import { saveTestResult, getCurrentUser } from "../storage.js";

initLayout("test");
let questions = [], professions = [], idx = 0, answers = [];

(async () => {
  const [q, p] = await Promise.all([
    loadJSON("data/questions.json"),
    loadJSON("data/professions.json"),
  ]);
  questions = q.questions;
  professions = p.professions;
  renderQ();
})();

function renderQ() {
  const area = document.getElementById("testArea");
  const res = document.getElementById("resultArea");
  res.style.display = "none";
  area.style.display = "block";
  if (idx >= questions.length) {
    showResults();
    return;
  }
  const q = questions[idx];
  document.getElementById("progressFill").style.width =
    (idx / questions.length) * 100 + "%";
  area.innerHTML =
    "<h2>" +
    q.textKk +
    "</h2><p>Сұрақ " +
    (idx + 1) +
    " / " +
    questions.length +
    '</p><ul class="test-options">' +
    q.options
      .map(
        (o) =>
          '<li><label><input type="radio" name="opt" value="' +
          o.id +
          '"/><span>' +
          o.textKk +
          "</span></label></li>"
      )
      .join("") +
    '</ul><button class="btn btn-primary" id="nextBtn" style="margin-top:1rem">Келесі</button>';
  document.getElementById("nextBtn").onclick = () => {
    const sel = area.querySelector('input[name="opt"]:checked');
    if (!sel) {
      alert("Жауап таңдаңыз");
      return;
    }
    const opt = q.options.find((o) => o.id === sel.value);
    answers.push(opt);
    idx++;
    renderQ();
  };
}

function showResults() {
  document.getElementById("testArea").style.display = "none";
  const { top } = calculateResults(answers, professions);
  const res = document.getElementById("resultArea");
  res.style.display = "block";
  document.getElementById("progressFill").style.width = "100%";
  res.innerHTML =
    '<div class="card"><h2>Нәтиже</h2><ul class="result-list">' +
    top
      .map(
        (t) =>
          '<li><a href="profession.html?id=' +
          t.profession.id +
          '">' +
          t.profession.titleKk +
          '</a><span class="match-pct">' +
          t.match +
          "%</span></li>"
      )
      .join("") +
    '</ul><button class="btn btn-primary" id="saveBtn">Кабинетке сақтау</button> <a class="btn btn-outline" href="test.html">Қайта өту</a></div>';
  document.getElementById("saveBtn").onclick = () => {
    if (!getCurrentUser()) {
      alert("Сақтау үшін кіріңіз");
      location.href = "auth.html";
      return;
    }
    saveTestResult({
      top: top.map((t) => ({
        id: t.profession.id,
        title: t.profession.titleKk,
        match: t.match,
      })),
    });
    alert("Сақталды!");
    location.href = "cabinet.html";
  };
}
