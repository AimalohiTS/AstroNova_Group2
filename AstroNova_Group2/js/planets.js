
function getPlanetValue(planet, keys, fallback = "N/A") {
  for (const key of keys) {
    const value = planet?.[key];

    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) return value.length;
      if (typeof value === "object") {
        return JSON.stringify(value);
      }
      return value;
    }
  }

  return fallback;
}

function createElement(tag, className = "", text) {
  const element = document.createElement(tag);

  if (className) element.className = className;

  if (text !== undefined && text !== null) {
    element.textContent = String(text);
  }

  return element;
}

function getImageUrl(planet) {
  return getPlanetValue(
    planet,
    ["image", "imageUrl", "image_url", "imgSrc", "img"],
    ""
  );
}

function createPlanetCard(planet) {
  const card = createElement("article", "planet-card");
  const imageUrl = getImageUrl(planet);

  if (imageUrl) {
    const image = createElement("img", "planet-image");

    image.src = imageUrl;
    image.alt = getPlanetValue(
      planet,
      ["name", "englishName"],
      "Planet"
    );
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.hidden = true;
    });

    card.appendChild(image);
  }

  const content = createElement("div", "planet-content");
  const heading = createElement("div", "planet-heading");

  const name = getPlanetValue(
    planet,
    ["name", "englishName"],
    "Unknown Planet"
  );

  const planetName = createElement("h2", "planet-name", name);

  const planetType = createElement(
    "p",
    "planet-type",
    getPlanetValue(
      planet,
      ["type", "planetType", "classification"],
      "Terrestrial"
    )
  );

  heading.append(planetName, planetType);

  const description = createElement(
    "p",
    "planet-description",
    getPlanetValue(
      planet,
      ["description", "overview", "about", "summary"],
      "Discover the unique features of this planet."
    )
  );

  // Main facts displayed across the card
  const mainFacts = createElement("div", "planet-main-facts");

  const mainFactItems = [
    ["Gravity", ["gravity", "surfaceGravity"]],
    ["Mass", ["mass"]],
    ["Period", ["period", "orbitalPeriod", "orbital_period"]]
  ];

  mainFactItems.forEach(([label, keys]) => {
    const item = createElement("div", "planet-main-fact");
    const factLabel = createElement("p", "fact-label", label);
    const factValue = createElement(
      "p",
      "fact-value",
      getPlanetValue(planet, keys)
    );

    item.append(factLabel, factValue);
    mainFacts.appendChild(item);
  });

  // Facts displayed with icons
  const iconFacts = createElement("div", "planet-icon-facts");

  const facts = [
    {
      label: "Temperature",
      keys: ["temperature", "meanTemperature", "avgTemp"],
      icon: "icons/Temperature_Icon.png"
    },
    {
      label: "Moons",
      keys: ["moons", "moonCount", "numberOfMoons"],
      icon: "icons/Half_moon.png"
    },
    {
      label: "Diameter",
      keys: ["diameter"],
      icon: "icons/Diameter.png"
    },
    {
      label: "Distance from Sun",
      keys: [
        "distanceFromSun",
        "distance_from_sun",
        "distance",
        "meanDistance"
      ],
      icon: "icons/CompanyIcon.png"
    }
  ];

  facts.forEach(({ label, keys, icon }) => {
    const item = createElement("div", "planet-icon-fact");
    const image = createElement("img", "planet-fact-icon");

    image.src = icon;
    image.alt = "";
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.hidden = true;
    });

    const value = createElement(
      "span",
      "planet-fact-value",
      getPlanetValue(planet, keys)
    );

    item.append(image, value);
    item.title = label;
    item.setAttribute("aria-label", `${label}: ${value.textContent}`);

    iconFacts.appendChild(item);
  });

  content.append(
    heading,
    description,
    mainFacts,
    iconFacts
  );

  card.appendChild(content);

  return card;
}

// Render the planet card(s).
export function renderPlanets(planets, container) {
  const grid = container || document.getElementById("planet-grid");

  if (!grid) {
    console.error('Missing element: #planet-grid');
    return;
  }

  grid.replaceChildren();

  if (!Array.isArray(planets) || planets.length === 0) {
    grid.appendChild(
      createElement("p", "empty-message", "No planets found.")
    );
    return;
  }

  planets.forEach((planet) => {
    grid.appendChild(createPlanetCard(planet));
  });
}

// Determine the category used in the comparison table.
function getPlanetCategory(planet) {
  const name = String(
    getPlanetValue(planet, ["name", "englishName"], "")
  ).toLowerCase();

  const type = String(
    getPlanetValue(
      planet,
      ["type", "planetType", "classification"],
      ""
    )
  ).toLowerCase();

  if (
    type.includes("dwarf") ||
    ["pluto", "ceres", "eris", "haumea", "makemake"].includes(name)
  ) {
    return "Dwarf";
  }

  if (
    type.includes("terrestrial") ||
    type.includes("rocky") ||
    ["mercury", "venus", "earth", "mars"].includes(name)
  ) {
    return "Terrestrial";
  }

  if (
    type.includes("ice") ||
    ["uranus", "neptune"].includes(name)
  ) {
    return "Ice Giant";
  }

  if (
    type.includes("gas") ||
    ["jupiter", "saturn"].includes(name)
  ) {
    return "Gas Giant";
  }

  return "Other";
}

function getDistance(planet) {
  const value = getPlanetValue(
    planet,
    [
      "distanceFromSun",
      "distance_from_sun",
      "distance",
      "meanDistance"
    ],
    ""
  );

  const number = Number.parseFloat(
    String(value).replace(/,/g, "")
  );

  return Number.isFinite(number)
    ? number
    : Number.POSITIVE_INFINITY;
}

// Render the grouped Planetary Facts table.
export function renderPlanetTable(planets, tableBody) {
  const tbody =
    tableBody || document.getElementById("planet-table-body");

  if (!tbody) {
    console.error('Missing element: #planet-table-body');
    return;
  }

  tbody.replaceChildren();

  if (!Array.isArray(planets) || planets.length === 0) {
    const row = createElement("tr");
    const cell = createElement(
      "td",
      "",
      "No planetary information available."
    );

    cell.colSpan = 5;
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  const categoryOrder = {
    Terrestrial: 1,
    "Gas Giant": 2,
    "Ice Giant": 3,
    Dwarf: 4,
    Other: 5
  };

  const sortedPlanets = [...planets].sort((a, b) => {
    const categoryA = getPlanetCategory(a);
    const categoryB = getPlanetCategory(b);

    if (categoryOrder[categoryA] !== categoryOrder[categoryB]) {
      return categoryOrder[categoryA] - categoryOrder[categoryB];
    }

    return getDistance(a) - getDistance(b);
  });

  const groups = [];

  sortedPlanets.forEach((planet) => {
    const category = getPlanetCategory(planet);

    let group = groups.find((item) => item.category === category);

    if (!group) {
      group = {
        category,
        planets: []
      };

      groups.push(group);
    }

    group.planets.push(planet);
  });

  groups.forEach((group) => {
    group.planets.forEach((planet, index) => {
      const row = createElement("tr");

      // First category column
      if (index === 0) {
        const primaryCategory = createElement(
          "td",
          `table-category ${group.category.toLowerCase().replace(/\s+/g, "-")}-group`
        );

        if (group.category === "Terrestrial") {
          primaryCategory.textContent = "Terrestrial Planets";
          primaryCategory.rowSpan = group.planets.length;
        } else if (
          group.category === "Gas Giant" ||
          group.category === "Ice Giant"
        ) {
          primaryCategory.textContent = "Jovian Planets";
          primaryCategory.rowSpan = groups
            .filter((item) =>
              ["Gas Giant", "Ice Giant"].includes(item.category)
            )
            .reduce((total, item) => total + item.planets.length, 0);
        } else if (group.category === "Dwarf") {
          primaryCategory.textContent = "Dwarf Planets";
          primaryCategory.rowSpan = group.planets.length;
        } else {
          primaryCategory.textContent = group.category;
          primaryCategory.rowSpan = group.planets.length;
        }

        if (
          group.category !== "Ice Giant" ||
          !groups.some((item) => item.category === "Gas Giant")
        ) {
          row.appendChild(primaryCategory);
        }
      }

      // Second category column for Jovian planets
      if (index === 0) {
        if (group.category === "Gas Giant") {
          const secondary = createElement(
            "td",
            "table-subcategory gas-category",
            "Gas Giants"
          );

          secondary.rowSpan = group.planets.length;
          row.appendChild(secondary);
        } else if (group.category === "Ice Giant") {
          const secondary = createElement(
            "td",
            "table-subcategory ice-category",
            "Ice Giants"
          );

          secondary.rowSpan = group.planets.length;
          row.appendChild(secondary);
        } else if (group.category === "Terrestrial") {
          // The first category cell spans the first two columns.
          const categoryCell = row.firstElementChild;
          categoryCell.colSpan = 2;
        } else if (group.category === "Dwarf") {
          const categoryCell = row.firstElementChild;
          categoryCell.colSpan = 2;
        } else {
          const categoryCell = row.firstElementChild;
          categoryCell.colSpan = 2;
        }
      }

      const name = getPlanetValue(
        planet,
        ["name", "englishName"],
        "Unknown"
      );

      const mass = getPlanetValue(
        planet,
        ["mass"],
        "N/A"
      );

      const diameter = getPlanetValue(
        planet,
        ["diameter"],
        "N/A"
      );

      row.append(
        createElement("td", "table-planet-name", name),
        createElement("td", "table-mass", mass),
        createElement("td", "table-diameter", diameter)
      );

      tbody.appendChild(row);
    });
  });
}
