---
type: overview
title: "Architecture Overview"
created: 2026-07-14
updated: 2026-07-14
tags:
  - overview
status: developing
related:
  - "[[Modules Index]]"
  - "[[Decisions Index]]"
  - "[[Dependencies Index]]"
  - "[[Flows Index]]"
sources: []
---

# Architecture Overview

levihuff.net is a static site built with [Eleventy (11ty)](https://www.11ty.dev/). `npm run build` reads `src/` and outputs plain HTML/CSS to `_site/`. Deploy happens automatically on push to `main` via GitHub Actions, which runs tests, builds, and FTP-deploys `_site/` to Porkbun-hosted static hosting.

## The shape of it

- **Config**: one file, `eleventy.config.cjs` - see [[Eleventy Config]].
- **Content**: data-driven. Structured content (`site.json`, `projects.json`, `experience.json`, `infra.js`, etc.) lives in `src/_data/` and templates render it - see [[Data Layer]]. Adding a project or infra entry is a data edit, not a template edit.
- **Styling**: Tailwind, compiled through a real PostCSS pipeline (not a passthrough copy) - see [[CSS Pipeline]]. Design rules live in `DESIGN.md`: no emoji, no italics, single amber accent, dark-first with no runtime toggle ([[Dark First Theme]]).
- **Interactivity**: two Vue 3 CDN islands (project filter, blog tag filter) and Motion-driven scroll animations, both minimal by design - see [[Template System]].
- **Testing**: four Vitest suites (`filters`, `data`, `blog`, `build`) gate every push to `main` before deploy - see [[Deploy Pipeline]].

## Why it looks this way

The non-obvious choices are filed as ADRs in [[Decisions Index]]: why FTP deploys queue instead of racing ([[Deploy Concurrency Queue]]), why there's no theme toggle yet ([[Dark First Theme]]), why the Vue CDN import is pinned to an exact version ([[Vue Version Pin]]).

## Where things are documented already

This vault documents architecture and rationale. Day-to-day conventions (commands, blog post frontmatter schema, `src/_data/*.json` field-level schemas, design system rules) are the parent repo's `CLAUDE.md` and `DESIGN.md` - read those first for "how do I do X", read this vault for "why does X work this way".

## Map

- [[Modules Index]] - subsystems: config, CSS pipeline, data layer, templates
- [[Components Index]] - reusable partials and Vue islands (seed, grows as needed)
- [[Decisions Index]] - ADRs
- [[Dependencies Index]] - [[Tech Stack]] and pin notes
- [[Flows Index]] - [[Build Pipeline]], [[Deploy Pipeline]]
