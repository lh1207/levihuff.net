# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm start          # Dev server with live reload (localhost:8080) — runs Eleventy + Tailwind in parallel
npm run build      # Production build → _site/
npm run watch      # Eleventy watch only (no CSS rebuild, no server)
```

There is no lint or test step — this is a pure static site with no test suite.

### How the build works

`npm start` and `npm run build` both run two processes in parallel via `npm-run-all`:

| Script | What it does |
|---|---|
| `dev:11ty` / `build:11ty` | Eleventy reads `src/` → emits HTML to `_site/` |
| `dev:css` / `build:css` | Tailwind CSS reads `src/_includes/css/tailwind.css` → emits `_site/css/styles.css` |

Production builds minify CSS via CSSNano (PostCSS). Always run both processes together; running only Eleventy will leave an empty or stale CSS file.

## Architecture

This is an [Eleventy (11ty)](https://www.11ty.dev/) static site paired with **Tailwind CSS 3.4**. `npm run build` reads `src/` and outputs plain HTML + a single compiled CSS file to `_site/`. Deployment happens automatically on push to `main` via GitHub Actions, which runs `npm ci && npm run build` then FTP-deploys `_site/` to the hosting server.

## Directory layout

```
src/
├── _data/           # JSON globals (site, navigation, projects, experience, skills, tools)
├── _includes/
│   ├── components/  # Nunjucks partials (nav, footer, cards, etc.)
│   │   └── landing/ # Homepage-specific mini-cards
│   └── css/
│       └── tailwind.css   # Tailwind entry point + custom base/component styles
├── _layouts/
│   ├── base.njk     # Root layout (head, nav, footer, theme/menu JS)
│   └── post.njk     # Blog post layout (extends base.njk)
├── blog/            # Markdown blog posts (12 posts)
├── tags/            # Tag index + per-tag pages
├── images/          # Static images (organized by section)
├── files/           # Resume PDF
├── *.njk            # Top-level pages (index, about, projects, resume, contact, …)
├── 404.njk          # Custom 404 page
├── feed.njk         # RSS feed (XML)
├── sitemap.njk      # XML sitemap
└── security-txt.njk # /.well-known/security.txt
```

## Template system

### Layouts (`src/_layouts/`)

- **`base.njk`** — wraps every page. Contains `<head>` with SEO/OG meta, Google Fonts imports (Syne, IBM Plex Sans, JetBrains Mono), inline theme-init + hamburger-menu script (runs before first paint), skip link, nav component, `<main>`, footer component, and back-to-top button.
- **`post.njk`** — extends `base.njk`. Adds post header (title, description, date, reading time, tags), rendered Markdown body in `.post-content`, previous/next nav links, and JSON-LD `BlogPosting` schema.

### Components (`src/_includes/components/`)

| File | Purpose |
|---|---|
| `nav.njk` | Sticky header with brand, desktop nav, hamburger + mobile drawer |
| `footer.njk` | Copyright year + social links (GitHub, LinkedIn, email) |
| `project-card.njk` | Full project card (image, stack, title, description, details list, link) |
| `experience-card.njk` | Role card (company, focus, description) used on About & Resume |
| `skill-group.njk` | Skill category heading + label-value list used on About & Resume |
| `landing/project-card-mini.njk` | Compact card for homepage "Selected work" grid |

### Pages (`src/*.njk`)

| File | URL | Notes |
|---|---|---|
| `index.njk` | `/` | Hero, "What I do", Tools grid, Selected work, CTA; Schema.org Person |
| `about.njk` | `/about/` | Bio, Education, Experience, Skills, Approach, Interests, Looking Ahead |
| `projects.njk` | `/projects/` | Full grid of all projects |
| `resume.njk` | `/resume/` | Education, Experience, Projects, Skills, Certifications |
| `contact.njk` | `/contact/` | Email card + "Looking for" card |
| `blog/index.njk` | `/blog/` | Post grid (thumbnail, title, description, date, reading time, tags) |
| `tags/index.njk` | `/tags/` | All tags |
| `tags/tag.njk` | `/tags/:tag/` | Per-tag post list |
| `feed.njk` | `/feed.xml` | RSS 2.0 feed (via Eleventy RSS plugin) |
| `sitemap.njk` | `/sitemap.xml` | XML sitemap |
| `404.njk` | `/404.html` | Custom 404 |
| `security-txt.njk` | `/.well-known/security.txt` | Security policy |

### Blog posts (`src/blog/*.md`)

Markdown files with required frontmatter:

```yaml
---
title: "Post title"
description: "One-line summary"
date: 2025-01-19
tags:
  - tag-name
layout: post.njk
thumbnail: /images/blog/my-image.jpg
---
```

Collected into the `posts` Eleventy collection (newest-first by convention). Tags are deduplicated and sorted into the `tagList` collection.

## Data layer (`src/_data/`)

All JSON files are available as template globals automatically:

| File | Contents |
|---|---|
| `site.json` | Site name, URL, contact email, graduation date, social links |
| `navigation.json` | Nav link labels + hrefs |
| `projects.json` | Project objects (name, stack, description, details, link, thumbnail, featured flag) |
| `experience.json` | Work experience objects (company, role, focus, description) |
| `skills.json` | Skill groups (label + items) for About/Resume |
| `tools.json` | Tool pills for homepage grid (name + category) |

To add a project, edit `projects.json`. Set `"featured": true` to surface it on the homepage "Selected work" section.

## Styling (Tailwind CSS)

### Entry point

`src/_includes/css/tailwind.css` — contains `@tailwind` directives plus hand-written `@layer base` and `@layer components` rules for:

- CSS custom properties (color tokens, spacing tokens, radii, shadow, motion)
- `.skip-link` and `.sr-only` accessibility helpers
- `.post-content` — full Markdown reset for blog body (headings, paragraphs, lists, code blocks, blockquotes, tables, images, Prism syntax tokens)
- `.header-anchor` — heading anchor links (hidden by default, visible on hover/focus)

### Design tokens (`tailwind.config.js`)

The Tailwind theme is fully customized. Key tokens:

**Colors** — semantic names, not raw hues:

| Token | Role |
|---|---|
| `surface-0` … `surface-3` | Page backgrounds (darkest → lightest) |
| `surface-inset` | Inset / recessed areas |
| `fg-1` … `fg-4` | Foreground text (high-contrast → muted) |
| `hair-1` … `hair-3` | Border / divider lines |
| `amber` / `amber-hi` / `amber-lo` | Primary accent color |
| `ok` / `warn` / `err` / `info` | Status colors |

**Dark mode** — class strategy using `[data-theme="dark"]` attribute (set on `<html>` by the inline theme script in `base.njk`).

**Typography** — three font families: `font-syne` (headings), `font-plex` (body), `font-jb` (code/mono).

**Breakpoints** — `sm: 481px`, `md: 801px`, `lg: 1101px`. Mobile-first; most grids go 1-col → 2-col → 3-col.

**Max widths** — `max-w-site` (1100 px wrapper), `max-w-prose` (70ch for readable text).

**Spacing tokens** — `xs` (0.25 rem) through `3xl` (4 rem), used for consistent gap/padding.

Use only these design tokens for new UI work. Do not introduce raw hex values or arbitrary Tailwind values — match the existing palette.

## Custom filters (`.eleventy.js`)

| Filter | Usage | Output |
|---|---|---|
| `dateReadable` | `{{ date \| dateReadable }}` | `January 19, 2025` |
| `dateIso` | `{{ date \| dateIso }}` | `2025-01-19T00:00:00.000Z` |
| `dateYMD` | `{{ date \| dateYMD }}` | `2025-01-19` (sitemap) |
| `readingTime` | `{{ content \| readingTime }}` | `3 min read` |
| `safeCdata` | `{{ content \| safeCdata }}` | Escapes `]]>` for RSS CDATA |
| `tagSlug` | `{{ tag \| tagSlug }}` | URL-safe tag slug |

## Global template data (`.eleventy.js`)

- `currentYear` — current calendar year (used in footer copyright)
- `buildDate` — ISO timestamp of the build (used in sitemap `<lastmod>`)

## Eleventy plugins

- **`@11ty/eleventy-plugin-rss`** — generates the RSS feed at `/feed.xml`
- **`@11ty/eleventy-plugin-syntaxhighlight`** — Prism.js code block highlighting

## Markdown extensions

Markdown is processed by `markdown-it` with the `markdown-it-anchor` plugin:

- Heading anchors are inserted **after** the heading text (`linkInsideHeader` style, symbol `#`).
- Slugify: lowercase, trim, strip non-alphanumeric/space/hyphen/underscore, then collapse to single dashes.
- The `.header-anchor` class is safelisted in `tailwind.config.js` so Tailwind doesn't purge it.

## Static passthrough

The following are copied as-is from `src/` to `_site/` (not processed by Eleventy or Tailwind):

- `src/images/` → `/images/`
- `src/files/` → `/files/` (resume PDF)
- `robots.txt`
- `_headers` (server/CDN response headers)
- `humans.txt`

> **Note:** CSS is **not** a passthrough. Tailwind builds `_site/css/styles.css` from `src/_includes/css/tailwind.css`. There is no `src/css/` directory in active use.

## Theme system

Dark/light mode:

1. An inline `<script>` at the top of `<body>` in `base.njk` reads `localStorage.getItem('theme')` (or falls back to `prefers-color-scheme`) and sets `data-theme="dark"|"light"` on `<html>` before the first paint — eliminating flash.
2. A toggle button in the nav switches the attribute and writes the preference to `localStorage`.
3. Tailwind applies `[data-theme="dark"]` variant selectors to swap CSS custom property values.

## Conventions

- **No comments in templates** unless the intent is genuinely non-obvious.
- **Data-driven** — add new content by editing JSON in `src/_data/`; avoid hard-coding content in templates.
- **Semantic HTML** — use appropriate elements (`<article>`, `<section>`, `<nav>`, `<time>`, etc.).
- **Accessibility** — every interactive element must have visible focus styles, `aria-*` where appropriate, and descriptive labels. The skip link and heading anchors are part of this contract.
- **Images** — use `loading="lazy"` on all non-hero images. Keep originals in `src/images/` organized by section (e.g. `src/images/projects/`, `src/images/blog/`).
- **Links** — external links should include `rel="noopener noreferrer"` and open in `_blank` only when appropriate.
- **New pages** — declare `layout: base.njk` (or `post.njk` for blog posts) in frontmatter; add the page to `navigation.json` if it should appear in the nav.

## CI/CD

GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Trigger: push to `main`
2. Steps: checkout → Node 20 setup (npm cache) → `npm ci` → `npm run build` → FTP deploy `_site/` via `SamKirkland/FTP-Deploy-Action`
3. Secrets required: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`

Do **not** commit secrets. The workflow reads them from GitHub repository secrets.
