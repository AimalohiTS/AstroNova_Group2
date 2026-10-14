const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  toggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
  try { localStorage.setItem("theme", theme); } catch {}
}

// On load: saved choice, else the system preference
let saved = null;
try { saved = localStorage.getItem("theme"); } catch {}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(saved || (prefersDark ? "dark" : "light"));

toggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});