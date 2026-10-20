
export function filterPlanets(planets, query) {
  if (!Array.isArray(planets)) {
    return [];
  }

  const searchTerm = String(query ?? "").trim().toLowerCase();

  if (!searchTerm) {
    return planets;
  }

  return planets.filter((planet) => {
    const name = String(planet.name ?? "").toLowerCase();
    const type = String(planet.type ?? "").toLowerCase();
    const description = String(planet.description ?? "").toLowerCase();

    return (
      name.includes(searchTerm) ||
      type.includes(searchTerm) ||
      description.includes(searchTerm)
    );
  });
}
