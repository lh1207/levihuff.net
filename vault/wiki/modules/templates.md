---
type: module
title: "Template System"
path: "src/_layouts/, src/_includes/, src/*.njk, src/blog/*.md"
status: active
language: nunjucks + markdown
purpose: "Page composition: layouts wrap pages, components are reusable partials, blog posts are markdown with frontmatter."
maintainer: "Levi Huff"
last_updated: 2026-07-14
depends_on:
  - "[[Data Layer]]"
used_by: []
tags:
  - module
created: 2026-07-14
updated: 2026-07-14
status: active
related:
  - "[[Eleventy Config]]"
  - "[[Data Layer]]"
sources: []
---

# Template System

## Purpose

Defines how pages are composed from layouts, includes, and data.

## How it works

- **Layouts** (`src/_layouts/`): `base.njk` wraps every page (sets `data-theme="dark"` inline before first paint, loads the Motion CDN script, defines the Vue island bootstrapping). `post.njk` extends it for blog posts.
- **Components** (`src/_includes/components/`): partials included via `{% include %}`, e.g. `infra-card.njk`.
- **Pages** (`src/*.njk`): each declares `layout: base.njk` in frontmatter.
- **Blog posts** (`src/blog/*.md`): markdown with required frontmatter (`title`, `description`, `date`, `tags`, `layout: post.njk`, `thumbnail`); collected into the `posts` collection.
- **Tag pages** (`src/tags/`): `index.njk` lists all tags, `tag.njk` paginates posts per tag via the `tagSlug` filter.
- **Vue islands**: `src/projects.njk` (category filter) and `src/blog/index.njk` (tag filter) load Vue 3 as an inline ES module from `cdn.jsdelivr.net`, pinned to `3.5.34` - not a floating `vue@3` range, since inline `import()` can't carry SRI and the pin is the supply-chain guard instead. See [[Vue Version Pin]].

## Depends on

- [[Data Layer]] - templates read `site.json`, `navigation.json`, `projects.json`, etc. as globals

## Used by

- Nothing further downstream - this is the render layer, output goes straight to `_site/`.

## Open questions

- None currently open.
