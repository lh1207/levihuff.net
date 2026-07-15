---
type: module
title: "CSS Pipeline"
path: "src/_includes/css/tailwind.css"
status: active
language: css
purpose: "Compiles Tailwind utility classes scanned from templates into a single minified stylesheet."
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
  - "[[Eleventy Config]]"
sources: []
---

# CSS Pipeline

## Purpose

CSS is **not** a passthrough copy in this repo. It's a real build chain, which matters because it's easy to assume a static site's CSS is just copied verbatim.

## How it works

```
src/_includes/css/tailwind.css  →  PostCSS (autoprefixer + cssnano in prod)  →  _site/css/styles.css
```

Tailwind scans `src/**/*.njk`, `src/**/*.md`, and `src/**/*.html` for class names actually used in source. Because Tailwind only sees literal strings, `tailwind.config.js`'s `safelist` has to manually carry `header-anchor` - a class injected by the markdown-it-anchor plugin at build time ([[Eleventy Config]]), not present in any source file.

- To add a new utility: use the class directly in a template. Tailwind picks it up automatically on next build.
- To add a custom rule: add it to `src/_includes/css/tailwind.css` inside the appropriate `@layer`.
- Production builds minify via `cssnano`; `test/build.test.js` asserts the output is ≤5 non-empty lines as a minification smoke check.

## Depends on

- [[Tech Stack]] (Tailwind 3.4.x, PostCSS, autoprefixer, cssnano)

## Used by

- [[Build Pipeline]] - `npm run build` runs the Tailwind CLI as a second step after Eleventy

## Open questions

- None currently open.
