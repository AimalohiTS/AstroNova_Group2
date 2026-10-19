
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";

  root.setAttribute("data-theme", selectedTheme);

  if (themeToggle) {
    const isDark = selectedTheme === "dark";

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  try {
    localStorage.setItem("astroNovaTheme", selectedTheme);
  } catch (error) {
    console.warn("Theme preference could not be saved.", error);
  }
}

function getSavedTheme() {
  try {
    const savedTheme = localStorage.getItem("astroNovaTheme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch (error) {
    console.warn("Saved theme could not be accessed.", error);
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

applyTheme(getSavedTheme());

// Switch themes when the button is clicked.
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}
