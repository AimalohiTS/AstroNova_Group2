
const API_URL = "https://anurella.github.io/json/planet.json";

export async function fetchPlanets() {
  try {
    const response = await fetch(API_URL);

    // Check whether the request succeeded.
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    // Convert the response into JavaScript data.
    const data = await response.json();

    // Ensure the API returned an array.
    if (!Array.isArray(data)) {
      throw new Error("Invalid API response: expected an array of planets.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching planet data:", error);

    throw error;
  }
}
