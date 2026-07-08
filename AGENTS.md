# AGENTS.md

This file provides guidance to Codex when working with code in this repository. `CLAUDE.md` is the deeper single source of truth; this file stays short and must never contradict it.

## Commands

```bash
npm install        # Install dependencies
npm start          # Dev server with live reload (localhost:8080)
npm run build      # Production build → _site/
npm run watch      # Watch mode without serving
npm test           # Run the Vitest test suite (one-shot)
npm run test:watch # Vitest in watch mode
```

**There is a test suite.** Four Vitest files under `test/` cover filters, data schemas, blog frontmatter, and a full build smoke test. CI runs `npm test` on every PR and non-main push; the deploy workflow runs it before building. Always run `npm test` after making changes. `test/build.test.js` runs `npm run build` in `beforeAll` and can take up to 2 minutes.

## Architecture

This is an [Eleventy (11ty)](https://www.11ty.dev/) static site (Eleventy 3.x). `npm run build` reads `src/` and outputs plain HTML/CSS to `_site/`. Deployment happens automatically on push to `main` via GitHub Actions (`deploy.yml`: test, build, FTP-deploy). `ci.yml` runs tests on PRs and non-main pushes; `security.yml` runs gitleaks, an `.env` guard, and `npm audit`.

The Eleventy config file is `eleventy.config.cjs` — there is no `.eleventy.js`.

### Template system

- **Layouts:** `src/_layouts/` — `base.njk` wraps every page; `post.njk` extends it for blog posts.
- **Components:** `src/_includes/components/` — partials included via `{% include %}` (nav, footer, cards, infra-card, etc.).
- **Pages:** `src/*.njk` — each page declares `layout: base.njk` in frontmatter.
- **Blog posts:** `src/blog/*.md` — Markdown with required frontmatter (`title`, `description`, `date`, `tags`, `layout: post.njk`, `thumbnail`). Collected into the `posts` collection in `eleventy.config.cjs`. `test/blog.test.js` enforces the frontmatter.
- **Infrastructure pages:** `src/infrastructure/` — hub page plus one detail page per `infra.js` entry, paginated from data.

### Data layer

All structured content lives in `src/_data/`, automatically available as template globals. Never hardcode content in templates.

| File | Used by |
|---|---|
| `site.json` | Site name, URL, contact email, social links |
| `navigation.json` | Nav links rendered in `nav.njk` |
| `projects.json` | Projects page & project cards |
| `experience.json` | About-page experience cards |
| `skills.json` | Skill groups on the About page |
| `tools.json` | Tools section badges |
| `infra.js` | Infrastructure hub, detail pages, homepage featured cards (CommonJS module; schema in CLAUDE.md) |

`test/data.test.js` validates every one of these; it also bans em dashes in `.njk` templates and infra copy.

### Custom filters (`src/filters.js`, registered in `eleventy.config.cjs`)

`tagSlug`, `imageDimensions`, `dateReadable`, `dateIso`, `dateYMD`, `safeCdata`, `readingTime`.

### CSS

CSS is not passthrough-copied. Tailwind builds `src/_includes/css/tailwind.css` through PostCSS into `_site/css/styles.css`. Passthrough covers `src/images/`, `src/fonts/`, `src/files/`, `src/humans.txt`, `robots.txt`, and `_headers` only.

### Theme

Dark-first and dark-only at runtime. `base.njk` sets `data-theme="dark"` on `<html>` before first paint. There is no runtime theme toggle and no `localStorage` theme persistence; the `[data-theme="light"]` CSS rules exist only for future opt-in support.

## Design rules

Follow `DESIGN.md`: no emoji, no italics, no gradients, single amber accent (`#f5a524`), sentence-case headings, always-visible focus rings. Site copy avoids em dashes (enforced by tests for templates and infra data).

## Review coordination

A parallel review monitor may be running from Cursor (see `.cursor/agents/review-monitor.md` and `AGENT_CONFIG.md`). If `.cursor/review-state/handoff.md` exists, read it before reviewing or committing so work is not duplicated.
