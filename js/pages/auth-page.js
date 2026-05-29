import { initLayout } from "../main.js";
import { login, register } from "../auth.js";
import { getParam } from "../utils.js";

initLayout("auth");
let mode = "login";
const tabL = document.getElementById("tabLogin");
const tabR = document.getElementById("tabReg");
tabL.onclick = () => setMode("login");
tabR.onclick = () => setMode("reg");

function setMode(m) {
  mode = m;
  tabL.classList.toggle("active", m === "login");
  tabR.classList.toggle("active", m === "reg");
  document.getElementById("nameGroup").style.display = m === "reg" ? "block" : "none";
  document.getElementById("roleGroup").style.display = m === "reg" ? "block" : "none";
}

document.getElementById("authForm").onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const err = document.getElementById("err");
  let r;
  if (mode === "login") r = login({ email, password });
  else
    r = register({
      name: document.getElementById("name").value.trim(),
      email,
      password,
      role: document.getElementById("role").value,
    });
  if (!r.ok) {
    err.textContent = r.error;
    return;
  }
  location.href = getParam("next") || "cabinet.html";
};
