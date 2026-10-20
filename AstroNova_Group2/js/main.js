
import { fetchPlanets } from "./api.js";
import { filterPlanets } from "./search.js";
import { renderPlanets, renderPlanetTable } from "./planets.js";

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#search");
const planetGrid = document.querySelector("#planet-grid");
const tableBody = document.querySelector("#planet-table-body");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");

let allPlanets = [];

function showError(message) {
  if (!errorMessage) return;

  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function hideError() {
  if (!errorMessage) return;

  errorMessage.textContent = "";
  errorMessage.hidden = true;
}

function displayPlanets(query = "") {
  hideError();

  const searchTerm = query.trim();

  if (searchTerm) {
    renderPlanets(filterPlanets(allPlanets, searchTerm), planetGrid);
    return;
  }

  const earth = allPlanets.find(
    (planet) => String(planet.name ?? "").toLowerCase() === "earth"
  );

  renderPlanets(earth ? [earth] : allPlanets, planetGrid);
}

async function initializeApp() {
  try {
    allPlanets = await fetchPlanets();

    if (loadingMessage) {
      loadingMessage.hidden = true;
    }

    if (!allPlanets.length) {
      showError("No planet data is currently available.");
      return;
    }

    renderPlanetTable(allPlanets, tableBody);
    displayPlanets();

    if (searchForm && searchInput) {
      searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        displayPlanets(searchInput.value);
      });

      searchInput.addEventListener("input", () => {
        displayPlanets(searchInput.value);
      });
    }
  } catch (error) {
    console.error("Unable to load planet data:", error);

    if (loadingMessage) {
      loadingMessage.hidden = true;
    }

    showError(
      "We couldn't load the planets. Please check your internet connection and refresh the page."
    );
  }
}

initializeApp();
