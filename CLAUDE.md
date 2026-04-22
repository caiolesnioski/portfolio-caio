# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

There is no build step. Open `index.html` directly in a browser:

```bash
open index.html
```

Or serve it with any static file server (e.g. `python3 -m http.server 8080`) to avoid CORS issues with local file fetches.

## Architecture

This is a pure HTML/CSS/JS static portfolio site — no framework, no bundler, no package manager.

### Pages

| File | Role |
|---|---|
| `index.html` | Main single-page portfolio (hero, about, skills, resume, projects, veille section, contact) |
| `project.html` | Dynamic project detail page — content injected by `assets/js/project.js` based on `?id=` query param |
| `veille.html` | Standalone tech-watch (veille) page with its own layout and CSS |
| `portfolio-details.html` / `service-details.html` | Static detail pages (legacy/template pages) |

### CSS

- `assets/css/main.css` — global styles shared across all pages; defines CSS custom properties (color tokens) used throughout
- `assets/css/veille.css` — styles specific to `veille.html`
- Inline `<style>` blocks inside `index.html` and `veille.html` — used for page-specific overrides (e.g. `.veille-hero`, `.articles-grid` in `index.html`)
- Vendor CSS: Bootstrap 5, Bootstrap Icons, AOS (scroll animations), GLightbox, Swiper

### JavaScript

- `assets/js/main.js` — initializes all vendor plugins (AOS, Swiper, GLightbox, typed.js) and handles nav toggle, scroll spy, active nav highlighting. Based on the BootstrapMade "MyResume" template.
- `assets/js/project.js` — self-contained IIFE; reads `?id=` from the URL, looks up the project in a hardcoded `projects` object, and renders the detail view into `#project-detail`. **Projects are defined in this file directly, not in the JSON file.**
- `assets/js/veille-page.js` — handles the veille/tech-watch page logic
- `assets/data/projects.json` — a JSON file that exists but is **not currently loaded by any script**; the live project data lives inside `project.js`

### Vendor libraries (all local, no CDN except fonts)

Located in `assets/vendor/`: Bootstrap 5, Bootstrap Icons, AOS, GLightbox, Swiper, Typed.js, Waypoints, PureCounter.

## Adding a new project

1. Add a new entry to the `projects` object in `assets/js/project.js` with the slug as key.
2. The project object shape: `{ title, img, github, demo, sections: { [sectionTitle]: string } }`.
3. Link to it from `index.html` using `href="project.html?id=your-slug"`.

## Styling conventions

- Color tokens are CSS custom properties defined in `main.css` (e.g. `var(--contrast-color)`, `var(--accent-color)`).
- Layout uses Bootstrap 5 grid classes; custom components use plain CSS without a preprocessor.
- The `assets/scss/` directory exists but SCSS is not compiled as part of any current workflow — edits should go directly into `assets/css/main.css`.
