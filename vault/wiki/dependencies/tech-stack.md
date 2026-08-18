---
type: dependency
title: "Tech Stack"
package: "package.json"
version: "n/a - see individual entries"
status: active
risk: low
tags:
  - dependency
created: 2026-07-14
updated: 2026-08-18
related:
  - "[[Eleventy Config]]"
  - "[[CSS Pipeline]]"
  - "[[Vue Version Pin]]"
sources: []
---

# Tech Stack

## What it's used for

Full runtime and dev dependency list from `package.json`, as of last review.

**Runtime**
- `@11ty/eleventy` `^3.1.6` - static site generator, the core of the build

**Dev**
- `@11ty/eleventy-plugin-rss` `^3.0.0` - Atom feed generation
- `@11ty/eleventy-plugin-syntaxhighlight` `^5.0.2` - Prism-based code block highlighting
- `tailwindcss` and `@tailwindcss/cli` `^4.3.3` - utility CSS generation, vendor prefixing, and minification
- `gray-matter` `^4.0.3` - frontmatter parsing in tests
- `markdown-it` `^15.0.0`, `markdown-it-anchor` `^9.2.1` - markdown rendering and heading anchors
- `npm-run-all2` `^9.0.3` - runs `dev:11ty` + `dev:css` and `watch:11ty` + `watch:css` in parallel
- `vitest` `^4.1.10` - test runner for the four suites in `test/`

Image dimensions are parsed by the repository's own buffer helpers in `src/filters.js`; there is no image-dimension package dependency.

**CDN-loaded, not in package.json** (see [[Template System]]):
- Motion `10.18.0` - scroll/stagger animations in `base.njk`, guarded by `prefers-reduced-motion`
- Vue `3.5.34` - pinned exactly, not a floating range; see [[Vue Version Pin]]

## Where it's pinned / configured

- `package.json` - npm dependency versions (caret ranges except where noted)
- `src/projects.njk`, `src/blog/index.njk` - Vue CDN import URL, must match exactly between the two
- `base.njk` - Motion CDN import URL

## Upgrade risk

Low overall - this is a small, deliberately minimal stack. The main coordinated upgrade risks are:
1. Vue: bump both CDN URLs together, then `npm test` (see [[Vue Version Pin]]).
2. Eleventy major version bumps: re-check the RSS plugin's ESM default-export `require()` workaround in [[Eleventy Config]] still applies.
3. Tailwind upgrades: keep `tailwindcss` and `@tailwindcss/cli` aligned and verify the legacy `@config` bridge still works.

## Notes

`test/build.test.js` runs a full `npm run build` in `beforeAll` (up to ~2 minutes) - factor that into any CI or local turnaround expectations when a dependency bump touches the build.
