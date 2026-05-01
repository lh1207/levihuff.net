# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm start          # Dev server with live reload (localhost:8080)
npm run build      # Production build → _site/
npm run watch      # Watch mode without serving
```

There is no lint or test step — this is a pure static site with no test suite.

## Architecture

This is an [Eleventy (11ty)](https://www.11ty.dev/) static site. `npm run build` reads `src/` and outputs plain HTML/CSS to `_site/`. Deployment happens automatically on push to `main` via GitHub Actions, which builds and FTP-deploys `_site/` to the hosting server.

### Template system

- **Layouts:** `src/_layouts/` — `base.njk` wraps every page; `post.njk` extends it for blog posts.
- **Components:** `src/_includes/components/` — partials included via `{% include %}` (nav, footer, cards, etc.).
- **Pages:** `src/*.njk` — each page declares `layout: base.njk` in frontmatter.
- **Blog posts:** `src/blog/*.md` — Markdown with frontmatter (`title`, `description`, `date`, `tags`, `layout: post.njk`, `thumbnail`). Collected into the `posts` collection in `.eleventy.js`.

### Data layer

All structured content lives in `src/_data/` as JSON files, automatically available as template globals:

| File | Used by |
|---|---|
| `site.json` | Site name, URL, contact email |
| `navigation.json` | Nav links rendered in `nav.njk` |
| `projects.json` | Projects page & project cards |
| `experience.json` | Resume / about experience cards |
| `skills.json` | Skill groups on about/resume |

### Custom filters (`.eleventy.js`)

- `dateReadable` — human-readable date string
- `dateIso` — ISO 8601 datetime
- `dateYMD` — `YYYY-MM-DD` (used in sitemap)
- `readingTime` — estimated read time from content

### Static passthrough

Images (`src/images/`), CSS (`src/css/styles.css`), files (`src/files/`), `robots.txt`, and `_headers` are copied as-is to `_site/`.

### Theme

Dark/light mode is toggled client-side via `localStorage` and a `data-theme` attribute on `<html>`. The toggle script lives inline in `base.njk` (runs before first paint to avoid flash).