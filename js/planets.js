export function renderPlanets(planets, container) {
  if (!container) {
    console.error("Planet container was not found.");
    return;
  }

  container.replaceChildren();

  planets.forEach((planet) => {
    const card = document.createElement("article");
    card.className = "planet-card";

    // Earth image
    const image = document.createElement("img");
    image.className = "planet-card__image";
    image.src = planet.image || "";
    image.alt = `Planet ${planet.name || ""}`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.hidden = true;
    });

    // Planet heading and introduction
    const heading = document.createElement("div");
    heading.className = "planet-card__header";

    const name = document.createElement("h1");
    name.className = "planet-card__name";
    name.textContent = planet.name || "Unknown Planet";

    const type = document.createElement("p");
    type.className = "planet-card__type";
    type.textContent = planet.type || "Planet";

    const description = document.createElement("p");
    description.className = "planet-card__description";
    description.textContent =
      planet.description || "No description available.";

    heading.append(name, type, description);

    // Statistics
    const statsHeading = document.createElement("h2");
    statsHeading.className = "planet-card__section-title";
    statsHeading.textContent = "Planet Overview";

    const stats = document.createElement("div");
    stats.className = "planet-card__stats";

    const statItems = [
      { label: "Gravity", value: planet.gravity, unit: "m/s²" },
      { label: "Mass", value: planet.mass, unit: "kg" },
      { label: "Orbital Period", value: planet.period, unit: "days" }
    ];

    statItems.forEach((item) => {
      const stat = document.createElement("div");
      stat.className = "planet-card__stat";

      const label = document.createElement("p");
      label.className = "planet-card__stat-label";
      label.textContent = item.label;

      const value = document.createElement("p");
      value.className = "planet-card__stat-value";
      value.textContent = formatValue(item.value, item.unit);

      stat.append(label, value);
      stats.appendChild(stat);
    });

    // Planet facts
    const factsHeading = document.createElement("h2");
    factsHeading.className = "planet-card__section-title";
    factsHeading.textContent = "Planet Facts";

    const facts = document.createElement("div");
    facts.className = "planet-card__facts";

    const factItems = [
      { label: "Temperature", value: planet.temperature },
      { label: "Moons", value: planet.moons },
      { label: "Diameter", value: planet.diameter },
      {
        label: "Distance from Sun",
        value: planet.distanceFromSun
      }
    ];

    factItems.forEach((item) => {
      const fact = document.createElement("div");
      fact.className = "planet-card__fact";

      const label = document.createElement("p");
      label.className = "planet-card__fact-label";
      label.textContent = item.label;

      const value = document.createElement("p");
      value.className = "planet-card__fact-value";
      value.textContent = formatValue(item.value);

      fact.append(label, value);
      facts.appendChild(fact);
    });

    // Assemble the card
    card.append(
      image,
      heading,
      statsHeading,
      stats,
      factsHeading,
      facts
    );

    container.appendChild(card);
  });
}

function formatValue(value, unit = "") {
  if (value === undefined || value === null || value === "") {
    return "Not available";
  }

  const formattedValue =
    typeof value === "number"
      ? value.toLocaleString()
      : String(value);

  return unit ? `${formattedValue} ${unit}` : formattedValue;
}