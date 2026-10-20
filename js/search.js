// AI JS code.
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('#search');
    const planetCards = document.querySelectorAll('.planet-card');

    // Handle form submission search
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        filterPlanets(searchInput.value);
    });

    // Handle live typing filtering
    searchInput.addEventListener('input', (e) => {
        filterPlanets(e.target.value);
    });

    function filterPlanets(query) {
        const searchTerm = query.toLowerCase().trim();

        planetCards.exp = planetCards.forEach(card => {
            const planetName = card.querySelector('.h2').textContent.toLowerCase();
            if (planetName.includes(searchTerm) || searchTerm === '') {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
});


export function filterPlanets(planets, query) {
  // Return an empty array if the input is invalid.
  if (!Array.isArray(planets)) {
    return [];
  }

// Stephen's JS.
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