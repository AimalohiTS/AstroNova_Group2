
const API_URL = "https://anurella.github.io/json/planet.json";

export async function fetchPlanets() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      `Planet API request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  // Accept either an array or an object containing a planets array.
  const planets = Array.isArray(data)
    ? data
    : Array.isArray(data.planets)
      ? data.planets
      : null;

  if (!planets) {
    throw new Error("The API response does not contain a planet array.");
  }

  return planets;
}
