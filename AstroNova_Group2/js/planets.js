
function getPlanetValue(planet, keys, fallback = "N/A") {
  for (const key of keys) {
    const value = planet?.[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return fallback;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined && text !== null) {
    element.textContent = String(text);
  }

  return element;
}

function getImageUrl(planet) {
  return getPlanetValue(
    planet,
    ["image", "imageUrl", "image_url", "img", "picture"],
    ""
  );
}

function formatMass(planet) {
  const value = Number(getPlanetValue(planet, ["mass"], NaN));

  if (!Number.isFinite(value)) {
    return getPlanetValue(planet, ["mass"]);
  }

  // The supplied API expresses mass in Earth-mass units.
  return `${value} Earth masses`;
}

function formatDiameter(planet) {
  const value = getPlanetValue(planet, ["diameter"]);

  if (value === "N/A") {
    return value;
  }

  return `${value} km`;
}

function formatDistance(planet) {
  const value = getPlanetValue(
    planet,
    ["distanceFromSun", "distance_from_sun", "distance", "meanDistance"]
  );

  if (value === "N/A") {
    return value;
  }

  // The API distance values are expressed in millions of kilometres.
  return `${value} million km`;
}

function createFact(label, value) {
  const fact = createElement("div", "planet-fact");

  fact.append(
    createElement("dt", "", label),
    createElement("dd", "", value)
  );

  return fact;
}

function createPlanetCard(planet) {
  const name = getPlanetValue(planet, ["name"], "Unknown planet");
  const card = createElement("article", "planet-card");
  const imageUrl = getImageUrl(planet);

  const image = createElement("img", "planet-image");
  image.alt = `Image of ${name}`;
  image.loading = "eager";

  if (typeof imageUrl === "string" && imageUrl.trim()) {
    image.src = imageUrl;
    image.addEventListener("error", () => {
      image.hidden = true;
    });
  } else {
    image.hidden = true;
  }

  const content = createElement("div", "planet-content");

  const heading = createElement("div", "planet-heading");
  heading.append(
    createElement("h2", "planet-name", name),
    createElement(
      "p",
      "planet-type",
      getPlanetValue(planet, ["type", "classification"])
    )
  );

  const description = createElement(
    "p",
    "planet-description",
    getPlanetValue(
      planet,
      ["description", "overview", "about"],
      "No description available for this planet."
    )
  );

  const statsHeading = createElement("h3", "stats-heading", "Planet Overview");
  const stats = createElement("dl", "planet-stats");

  const facts = [
    ["Gravity", getPlanetValue(planet, ["gravity", "surfaceGravity"])],
    ["Mass", formatMass(planet)],
    ["Orbital Period", getPlanetValue(planet, ["period", "orbitalPeriod", "orbital_period"])],
    ["Temperature", getPlanetValue(planet, ["temperature", "meanTemperature", "avgTemp"])],
    ["Moons", getPlanetValue(planet, ["moons", "moonCount", "numberOfMoons"])],
    ["Diameter", formatDiameter(planet)],
    ["Distance from Sun", formatDistance(planet)]
  ];

  facts.forEach(([label, value]) => {
    stats.appendChild(createFact(label, value));
  });

  content.append(heading, description, statsHeading, stats);
  card.append(image, content);

  return card;
}

export function renderPlanets(planets, container) {
  if (!container) return;

  container.replaceChildren();

  if (!Array.isArray(planets) || planets.length === 0) {
    container.appendChild(
      createElement("p", "empty-message", "No planets match your search.")
    );
    return;
  }

  const fragment = document.createDocumentFragment();

  planets.forEach((planet) => {
    fragment.appendChild(createPlanetCard(planet));
  });

  container.appendChild(fragment);
}


export function renderPlanetTable(planets, tableBody) {
  if (!tableBody) return;

  tableBody.replaceChildren();

  if (!Array.isArray(planets)) return;

  const categories = [
    {
      label: "Terrestrial",
      names: ["Mercury", "Venus", "Earth", "Mars"],
    },
    {
      label: "Gas Giants",
      names: ["Jupiter", "Saturn"],
    },
    {
      label: "Ice Giants",
      names: ["Uranus", "Neptune"],
    },
  ];

  const getCategory = (planet) => {
    const name = String(planet.name ?? "").toLowerCase();

    return (
      categories.find((category) =>
        category.names.some(
          (planetName) => planetName.toLowerCase() === name
        )
      )?.label ?? "Other"
    );
  };

  const groupOrder = [
    "Terrestrial",
    "Gas Giants",
    "Ice Giants",
    "Other",
  ];

  const sortedPlanets = [...planets].sort((a, b) => {
    const categoryDifference =
      groupOrder.indexOf(getCategory(a)) -
      groupOrder.indexOf(getCategory(b));

    if (categoryDifference !== 0) {
      return categoryDifference;
    }

    return String(a.name ?? "").localeCompare(String(b.name ?? ""));
  });

  const categoryCounts = {};

  sortedPlanets.forEach((planet) => {
    const category = getCategory(planet);
    categoryCounts[category] = (categoryCounts[category] ?? 0) + 1;
  });

  const displayedCategories = new Set();

  sortedPlanets.forEach((planet) => {
    const row = document.createElement("tr");
    const category = getCategory(planet);

    if (!displayedCategories.has(category)) {
      const categoryCell = document.createElement("td");
      categoryCell.className = "category-cell";
      categoryCell.textContent = category;
      categoryCell.rowSpan = categoryCounts[category];

      row.appendChild(categoryCell);
      displayedCategories.add(category);
    }

    const nameCell = document.createElement("td");
    nameCell.textContent = planet.name ?? "Unknown";

    const massCell = document.createElement("td");
    const mass = Number(planet.mass);

    // Convert Earth masses to 10²⁴ kg when the API uses Earth-mass units.
    // If the API already provides mass in 10²⁴ kg, do not convert it again.
    const massUnit = String(
      planet.massUnit ?? planet.mass_unit ?? ""
    ).toLowerCase();

    if (Number.isFinite(mass)) {
      if (
        massUnit.includes("earth") ||
        massUnit.includes("earth mass") ||
        planet.massInEarths === true
      ) {
        massCell.textContent = (mass * 5.972).toFixed(2);
      } else {
        massCell.textContent = mass;
      }
    } else {
      massCell.textContent = planet.mass ?? "N/A";
    }

    const diameterCell = document.createElement("td");
    const diameter = planet.diameter;

    diameterCell.textContent =
      diameter !== undefined && diameter !== null && diameter !== ""
        ? diameter
        : "N/A";

    row.append(nameCell, massCell, diameterCell);
    tableBody.appendChild(row);
  });
}
