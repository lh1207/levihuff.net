---
type: module
title: "CSS Pipeline"
path: "src/_includes/css/tailwind.css"
language: css
purpose: "Compiles Tailwind utility classes scanned from templates into a single minified stylesheet."
maintainer: "Levi Huff"
last_updated: 2026-08-18
depends_on:
  - "[[Tech Stack]]"
used_by:
  - "[[Build Pipeline]]"
tags:
  - module
created: 2026-07-14
updated: 2026-08-18
status: active
related:
  - "[[Eleventy Config]]"
sources: []
---

# CSS Pipeline

## Purpose

CSS is **not** a passthrough copy in this repo. It's a real build chain, which matters because it's easy to assume a static site's CSS is just copied verbatim.

## How it works

```
src/_includes/css/tailwind.css  →  @tailwindcss/cli --minify  →  _site/css/styles.css
```

Tailwind CSS 4 handles imports and vendor prefixing internally. `src/_includes/css/tailwind.css` imports Tailwind, loads the legacy JavaScript theme with `@config`, and uses `@source inline("header-anchor")` for the class injected by markdown-it-anchor at build time. The repo no longer has a separate PostCSS configuration.

- To add a new utility: use the class directly in a template. Tailwind picks it up automatically on next build.
- To add a custom rule: add it to `src/_includes/css/tailwind.css` inside the appropriate `@layer`.
- Production builds minify with the Tailwind CLI's `--minify` flag; `test/build.test.js` asserts the output is at most five non-empty lines as a smoke check.

## Depends on

- [[Tech Stack]] (Tailwind CSS 4 and `@tailwindcss/cli`)

## Used by

- [[Build Pipeline]] - `npm run build` runs the Tailwind CLI as a second step after Eleventy

## Open questions

- None currently open.
