---
type: module
title: "Template System"
path: "src/_layouts/, src/_includes/, src/*.njk, src/blog/*.md"
language: nunjucks + markdown
purpose: "Page composition: layouts wrap pages, components are reusable partials, blog posts are markdown with frontmatter."
maintainer: "Levi Huff"
last_updated: 2026-10-07
depends_on:
  - "[[Data Layer]]"
used_by: []
tags:
  - module
created: 2026-07-14
updated: 2026-10-07
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

- **Layouts** (`src/_layouts/`): `base.njk` wraps every page, sets `data-theme="dark"` before first paint, emits shared metadata and `Person`/`WebSite` structured data, and loads Motion only when animated content is present. `post.njk` extends it for blog posts.
- **Components** (`src/_includes/components/`): partials included via `{% include %}`, e.g. `infra-card.njk`.
- **Pages** (`src/*.njk`): each declares `layout: base.njk` in frontmatter.
- **Blog posts** (`src/blog/*.md`): markdown with required frontmatter (`title`, `description`, `date`, `tags`, `layout: post.njk`, `thumbnail`); collected into the `posts` collection.
- **Tag pages** (`src/tags/`): `index.njk` lists all tags, `tag.njk` paginates posts per tag via the `tagSlug` filter.
- **Vue islands**: `src/projects.njk` (category filter) and `src/blog/index.njk` (tag filter) load Vue 3 as an inline ES module from `cdn.jsdelivr.net`, pinned to `3.5.34`. Data enters these scripts through the `jsonScript` filter so content cannot close the surrounding script tag. See [[Vue Version Pin]].

## V2 interaction behavior

The base layout emits the dark theme directly in HTML. Mobile navigation has a no-JavaScript fallback, 44px targets, and a short-screen scroll container. Opening the drawer temporarily makes main/footer inert; crossing 801px closes it and restores keyboard access. The main region is focusable for skip-link and back-to-top handling. The blog tag chooser returns focus to its trigger after selection.

Motion only enhances hero items. Section/grid scroll reveals are disabled, and CDN failure leaves static content available. Vue filters preserve static cards until mounting succeeds. See [[V2 Cleanup and Verification]] for browser coverage and limitations.

## Dependencies

- [[Data Layer]] - templates read `site.json`, `navigation.json`, `projects.json`, etc. as globals

## Used by

- Nothing further downstream - this is the render layer, output goes straight to `_site/`.

## Open questions

- None currently open.
