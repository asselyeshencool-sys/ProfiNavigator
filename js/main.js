export function initLayout(activePage) {
  const nav = document.querySelector(".nav-desktop");
  if (nav) {
    nav.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href && href.includes(activePage)) a.classList.add("active");
    });
  }
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-desktop");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
  }
  import("./storage.js").then(({ getCurrentUser }) => {
    const el = document.getElementById("userNav");
    const user = getCurrentUser();
    if (el) {
      el.innerHTML = user
        ? `<a href="cabinet.html">${user.name}</a> <button class="btn btn-ghost" id="logoutBtn">Шығу</button>`
        : `<a href="auth.html">Кіру</a> <a class="btn btn-primary btn-sm" href="auth.html">Тіркелу</a>`;
      document.getElementById("logoutBtn")?.addEventListener("click", () => {
        import("./auth.js").then((m) => { m.logout(); location.href = "index.html"; });
      });
    }
  });
}
export function headerHTML(active = "") {
  return `<header class="site-header"><div class="container header-inner">
    <a class="logo" href="index.html">Profi<span>Navigator</span></a>
    <button class="nav-toggle" aria-label="Мәзір">☰</button>
    <nav class="nav-desktop">
      <a href="index.html">Басты</a>
      <a href="test.html">Тест</a>
      <a href="professions.html">Мамандықтар</a>
      <a href="analytics.html">Аналитика</a>
      <a href="compare.html">Салыстыру</a>
      <a href="cabinet.html">Кабинет</a>
      <span id="userNav"></span>
    </nav></div></header>
    <footer class="site-footer"><div class="container">© 2026 ProfiNavigator — Кәсіптік бағдар беру платформасы</div></footer>`;
}
