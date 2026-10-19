import { fetchPlanets } from "./api.js";
import { renderPlanets } from "../planets.js";
import { filterPlanets } from "../search.js";

document.addEventListener("DOMContentLoaded", initPlanetExplorer);

async function initPlanetExplorer() {
  const searchInput = document.querySelector("#planet-search");
  const planetContainer = document.querySelector("#planet-grid");
  const loadingMessage = document.querySelector("#loading-message");
  const errorMessage = document.querySelector("#error-message");

  if (!planetContainer) {
    console.error('Missing element: "#planet-grid".');
    return;
  }

  let allPlanets = [];

  function showMessage(element, message) {
    if (!element) return;

    element.textContent = message;
    element.hidden = !message;
  }

  function displayPlanets(planets) {
    planetContainer.replaceChildren();

    if (planets.length === 0) {
      showMessage(errorMessage, "No planets found.");
      return;
    }

    showMessage(errorMessage, "");
    renderPlanets(planets, planetContainer);
  }

  try {
    showMessage(loadingMessage, "Loading planets...");
    showMessage(errorMessage, "");

 allPlanets = await fetchPlanets();

const earth = allPlanets.find(
  (planet) => planet.name?.toLowerCase() === "earth"
);

if (!earth) {
  throw new Error("Earth was not found in the API data.");
}

displayPlanets([earth]);
  } catch (error) {
    console.error("Unable to load planets:", error);

    showMessage(
      errorMessage,
      "Unable to load planet data. Please try again later."
    );
  } finally {
    showMessage(loadingMessage, "");
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();
      const filteredPlanets = filterPlanets(allPlanets, query);

      displayPlanets(filteredPlanets);
    });
  }
}