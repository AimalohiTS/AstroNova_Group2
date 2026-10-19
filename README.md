# Group Name: AstroNova_Group2

# Project Name: CAPSTONE PROJECT
Powered by: TS Academy. This is a Capstone Project Repository that presents our Frontend Development finished work.

## About the Project
The web page is a collaborative group capstone project dashboard called "AstroNova" (designed for a solar system explorer app). It showcases detailed profiles of major bodies in our solar system—including Earth, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, and Pluto—complete with physical metrics, a comparative summary table, and a team directory in the footer. It supports both Light and Dark appearance modes and is built with responsive layout principles.

### Functions and Components of the Web Page
**Header & Navigation Section: (Done by Ifunanya)**
- Contains the site logo (logo_black.png) linking back to the home view.
- Features a Theme Toggle button designed to switch between Light and Dark display modes.
- Includes a Search Form with a text input (Search planet name) and submit button to filter planets dynamically.

**Planet Cards Section:**
- *Earth Card:* Configured as a constant, pinned card on the interface. (Done by Ifunanya)
- *Other Planet Cards (Mercury through Pluto):* Individual <article> elements detailing each planet's classification (Terrestrial, Gas Giant, Ice Giant, Dwarf Planet), descriptions, physical stats (Gravity, Mass, Period), and visual data icons (Temperature, Moons, Diameter, Distance from Sun). (Group work with Chimaobi, Emmanuella, & Oluwatofunmi)

**Planetary Facts At A Glance (Table Section) (Group work with Daniel & Yusuf):**
A structured comparative table citing NASA data, categorizing planets into Terrestrial Planets, Jovian Planets (Gas Giants and Ice Giants), and Dwarf Planets with columns for names, mass, and diameter. 

**Footer Section: (Group work with Anthonia & Dasola)**
- *About / Team Directory:* Lists the group members' first names and links directly to their respective GitHub profiles (e.g., Emmanuella as Team Lead, Joy as Asst. Team Lead, Anthonia, and others).
- *Copyright & Credits:* Displays the project copyright, a designer credit linking to amakandukwu.com, a link to the AstroNova group repository, and a link to TSAcademy (tsacademyonline.com).

## The Names of all The Group Members with their GitHub Profiles
1. Emmanuella Aimalohi Ileogben - Team Lead (https://github.com/AimalohiTS)
2. Joy Oluchi Ani - Asst. Team Lead (https://github.com/Joie-luchy)
3. Anthonia Chidinma Aja-Chukwu - (https://github.com/DEV-TONIA001)
4. Ifunanya Chidimma Ugwoke - (https://github.com/ifunanyadimma/)
5. Dasola Gift Olanipekun - (https://github.com/Dasola-creator)
6. Chimaobi Akachukwu - (https://github.com/Chimaobi-Akachukwu)   
7. Stephen Ezeani - (https://github.com/StevieGerald)
8. Daniel Chukwuka Ubah - (https://github.com/ubahdaniel2002-ai)
9. Yusuf Abdullahi Sejiro - (https://github.com/mizdad06)
10. Oluwatofunmi Esther Ajayi - (https://github.com/oluwatofunmiajayi94-droid)

## How the Web Page Works
- *Visual Layout & Hierarchy:* The page organizes data using semantic HTML elements (<header>, <nav>, <search>, <article>, <dl>, <table>, <footer>) to ensure structural clarity and accessibility for screen readers.
- *Interactivity & User Flow:* Users can look up specific planets using the search bar, toggle between dark and light modes seamlessly, and navigate through detailed planetary metric cards or review comparative data in the NASA facts table.

### What the CSS Is All About (style.css)
- *CSS Custom Properties (Variables):* Defines color tokens (--bg-color, --text-color, --card-bg, etc.) inside :root and overrides them under a [data-theme="dark"] selector to power instant light/dark mode switching.
- *Responsive Grid Systems:* Utilizes CSS Grid (repeat(auto-fit, minmax(280px, 1fr))) to ensure planet cards gracefully reflow and rearrange themselves across desktops, tablets, and mobile screens.
- *Card & Micro-Interactions:* Implements hover transformations (transform: translateY(-5px)) and smooth transitions for a polished user experience.
- *Utility & Accessibility Classes:* Includes structural helpers like .visually-hidden for screen-reader accessibility and .hidden to dynamically toggle element visibility during searches.
- *Typography & Google Fonts Configuration:* This project utilizes custom typography imported from Google Fonts to establish a modern, readable, and sci-fi/tech-inspired aesthetic. Font-Families Used:
  a. Inter (sans-serif) - Weights: Regular (400), Medium (500), Semi-Bold (600), Bold (700). Usage: Primary body text, UI elements, descriptions, and labels for optimal readability.
  b. Space Mono (monospace) - Weights: Regular (400), Bold (700). Usage: Headings, technical stats, numerical data, and code-like key-value displays.
- *Planet Section Styles:* CSS styles for the planet explorer interface, including responsive grid layouts, card components with circular images, and dark mode support for text, badges, and backgrounds.
- *Table Components Styles:* CSS styles for responsive data tables, featuring horizontal scrolling, custom cell padding, zebra striping, category row styling, and full dark mode support.
- *Footer Components Styles:* CSS styles for the site footer, featuring a flexible two-column layout, top border separator, about section, and copyright links with muted typography.

### What the JavaScript Is All About
Splitting JavaScript into modular files keeps the codebase maintainable for collaborative group work:
- *theme.js (Theme Manager):* Listens for clicks on the theme toggle button, switches the HTML document's data-theme attribute between light and dark, and saves the user's preference to browser localStorage so it persists across page reloads. (Done by Ifunanya)
- *search.js (Search & Filter Logic):* Captures user input from the search form in real-time (input and submit events), evaluates planet names against the search query, and toggles the .hidden CSS class on or off for respective cards without requiring a full page refresh. (Done by Emmanuella)
- *main.js (Search Loader)*: Ensures the HTML file contains the referenced DOM elements (#planet-grid, #planet-search, #loading-message, #error-message). The script automatically initializes once the HTML document finishes loading via the DOMContentLoaded event listener. (Done by Stephen)
- *planets.js (Planet Data Array):* Accepts a targeted DOM container element selected from the HTML document to house the cards. renderPlanets is imported as an ES module into the main JavaScript entry file. It is invoked with the planet data array to dynamically generate and inject the components into the webpage. (Done by Stephen & Joy)
- *api.js (Fetch API):* A dedicated data-fetching module built using modern asynchronous JavaScript (async/await) and the Fetch API. Its primary purpose is to retrieve structured JSON data about the solar system's planets from an external endpoint ([https://anurella.github.io/json/planet.json] (Done by Stephen)

### Putting Together the WebPage, HTML, CSS, JavaScript (Group work done by Ifunanya & Emmaenuella)
**Documenting the README.md file - Done by Emmanuella**


## How to Run This Web Page Locally
To run and test this project locally on your machine, follow these steps:
**i. Organize Project Files:** 
Ensure all your files are saved inside a single project folder with the following directory structure:
my-astro-project/
├── html/ (contains index.html)
├── css/ (contains style.css)
├── js/ (contains:
                  ├── theme.js,
                  ├── search.js
                  ├── api.js
                  ├── main.js
                  ├── planets.js
├── images/ (containing planet PNGs and logo)
├── .gitignore
├── package.lock.json
└── icons/ (containing vector and toggle icons)

ii. **Open with a Local Development Server:**
- Because modern browsers restrict certain asset loads or local script behaviors when opening files directly via the file:// protocol, it is best to run it through a local server.
- If using Visual Studio Code, install the popular Live Server extension.
- Right-click on index.html inside VS Code and select "Open with Live Server".

iii. **View in Browser:**
The project will automatically launch in your default web browser (usually at [http://127.0.0.1:5500](http://127.0.0.1:5500)), where you can interact with the theme toggle, search bar, and fully responsive layout.

## The Live Deployment Link
- Vercel App - (https://astronovagroup2-roan.vercel.app/)

[Project Repository](https://github.com/AimalohiTS/AstroNova_Group2)
