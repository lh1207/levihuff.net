---
type: module
title: "Eleventy Config"
path: "eleventy.config.cjs"
status: active
language: javascript
purpose: "Central Eleventy build configuration: plugins, markdown, collections, filters, transforms, passthrough, global data."
maintainer: "Levi Huff"
last_updated: 2026-07-14
depends_on:
  - "[[Tech Stack]]"
used_by:
  - "[[Build Pipeline]]"
tags:
  - module
created: 2026-07-14
updated: 2026-07-14
status: active
related:
  - "[[CSS Pipeline]]"
  - "[[Template System]]"
sources: []
---

# Eleventy Config

## Purpose

`eleventy.config.cjs` is the single Eleventy config entry point. It's `.cjs` (not `.eleventy.js`) specifically so it can use CommonJS `require()` without adding `"type": "commonjs"` to `package.json` - that field would break `vitest.config.js`, which is ESM. This is a load-bearing detail: don't "clean up" the extension.

## How it works

- **Plugins**: `@11ty/eleventy-plugin-rss@3` (Atom feed) and `@11ty/eleventy-plugin-syntaxhighlight@5` (Prism code blocks). RSS v3 ships ESM-first, so its default export is loaded via `require("@11ty/eleventy-plugin-rss").default`.
- **Markdown**: `markdown-it` with `html: true`, `linkify: true`, `typographer: true`, plus `markdown-it-anchor` for heading permalinks. The anchor plugin injects `header-anchor` classes at build time - not present in any source file, which is why Tailwind's `safelist` in `tailwind.config.js` has to carry it explicitly (Tailwind only sees literal class names in source).
- **Collections**: `posts` (all `src/blog/**/*.md`), `tagList` (deduplicated, sorted tags across posts).
- **Filters** (`src/filters.js`): `tagSlug`, `imageDimensions`, `dateReadable`, `dateIso` (throws with a `[dateIso]` prefix on invalid dates), `dateYMD`, `safeCdata`, `readingTime` (200 wpm, floor of "1 min read").
- **Transforms**: `img-dimensions` backfills `width`/`height` on `<img>` tags missing them; `img-lazy-loading` sets `fetchpriority="high"` on the first image in a blog post's `.post-content` and `loading="lazy"` on the rest.
- **Global data**: `currentYear`, `buildDate` (`YYYY-MM-DD`), `gitHash` (short commit hash for CSS cache-busting, falls back to `"dev"` outside a git repo).
- **Passthrough**: `src/images/`, `src/fonts/`, `src/files/`, `src/humans.txt`, `robots.txt`, `_headers`. `src/.htaccess` is deliberately **not** passthrough - Porkbun's static hosting rejects it.
- **Directories**: input `src/`, output `_site/`, includes `_includes/`, layouts `_layouts/`.

## Depends on

- [[Tech Stack]] (Eleventy 3.x, markdown-it, RSS/syntaxhighlight plugins)

## Used by

- [[Build Pipeline]] - `npm run build` invokes Eleventy using this config
- [[CSS Pipeline]] - `gitHash` global data cache-busts the CSS URL emitted by templates

## Open questions

- None currently open.
