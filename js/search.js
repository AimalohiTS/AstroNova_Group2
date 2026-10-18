
export function filterPlanets(planets, query) {
  // Return an empty array if the input is invalid.
  if (!Array.isArray(planets)) {
    return [];
  }

  // Normalize the search query.
  const searchTerm = String(query ?? "").trim().toLowerCase();

  // Show all planets when the search box is empty.
  if (!searchTerm) {
    return planets;
  }

  // Filter by planet name, type, and description.
  return planets.filter((planet) => {
    const name = String(planet.name ?? "").toLowerCase();
    const type = String(planet.type ?? "").toLowerCase();
    const description = String(
      planet.description ?? ""
    ).toLowerCase();

    return (
      name.includes(searchTerm) ||
      type.includes(searchTerm) ||
      description.includes(searchTerm)
    );
  });
}
