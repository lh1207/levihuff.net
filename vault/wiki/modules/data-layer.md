---
type: module
title: "Data Layer"
path: "src/_data/"
status: active
language: json + javascript
purpose: "Single source of truth for structured content (site meta, nav, projects, experience, skills, tools, infrastructure) consumed as Eleventy global data."
maintainer: "Levi Huff"
last_updated: 2026-07-14
depends_on: []
used_by:
  - "[[Template System]]"
tags:
  - module
created: 2026-07-14
updated: 2026-07-14
status: active
related:
  - "[[Eleventy Config]]"
sources: []
---

# Data Layer

## Purpose

All structured content lives in `src/_data/` - JSON files plus one CommonJS module (`infra.js`) - and is automatically exposed as template globals by Eleventy's data cascade. This is the "data-driven content" pattern the repo's own `eleventy-content` skill is built around: adding content is a data edit, not a template edit.

## How it works

| File | Used by | Key schema |
|---|---|---|
| `site.json` | Every page via `base.njk` | `name`, `url` (https://), `email`, `social.{github,linkedin,handshake}` |
| `navigation.json` | `nav.njk` | Array of `{label, url}`, `url` must be root-relative |
| `projects.json` | Projects page & cards | `title`, `description`, `image`, `paragraphs`, `category` (drives the Vue filter chips), `link`/`linkLabel`, `stack`, `meta` |
| `experience.json` | About cards | `company`, `focusAreas`, `description`, optional `highlights` |
| `skills.json` | Skill groups | Array of `{heading, items: [{label, text}]}` |
| `tools.json` | Tools section | Array of `{name, category}`, uppercase category strings |
| `infra.js` | Infrastructure hub, detail pages, homepage featured cards | See `slug`, `section`, `kind`, `role`, `stack`, `status`, `summary`, `details`, `links`, `featured` - enforced by `test/data.test.js` |

`infra.js` is the single source of truth for infrastructure projects, homelab services, and the AI-ops layer: one new object renders both a card (`components/infra-card.njk`) and a detail page at `/infrastructure/<slug>/` with no template work.

Entry copy across all data files must not contain em dashes - `test/data.test.js` fails the suite if any appear (same rule applies to every `.njk` template).

## Depends on

- None - this is the leaf/source layer.

## Used by

- [[Template System]] - layouts and includes consume this data via Eleventy's global data mechanism

## Open questions

- None currently open.
