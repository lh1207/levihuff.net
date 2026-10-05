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
updated: 2026-10-05
related:
  - "[[Eleventy Config]]"
  - "[[CSS Pipeline]]"
  - "[[Vue Version Pin]]"
sources:
  - "https://github.com/lh1207/levihuff.net/pull/130"
  - "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm"
---

# Tech Stack

## What it's used for

Runtime and dev dependencies on the consolidation branch in [PR #130](https://github.com/lh1207/levihuff.net/pull/130). These changes remain unmerged as of 2026-10-05.

**Runtime**
- `@11ty/eleventy` `^3.1.6` - static site generator, the core of the build

**Dev**
- `@11ty/eleventy-plugin-rss` `^3.0.0` - Atom feed generation
- `@11ty/eleventy-plugin-syntaxhighlight` `^5.0.2` - Prism-based code block highlighting
- `tailwindcss` and `@tailwindcss/cli` `^4.3.3` - utility CSS generation, vendor prefixing, and minification
- `gray-matter` `^4.0.3` - frontmatter parsing in tests
- `markdown-it` `^15.0.1` (locked to 15.0.2), `markdown-it-anchor` `^10.0.0` - markdown rendering and heading anchors
- `npm-run-all2` `^9.0.3` - runs `dev:11ty` + `dev:css` and `watch:11ty` + `watch:css` in parallel
- `vitest` `^5.0.0` - test runner for the four suites in `test/`; requires Node `^22.12.0 || ^24.0.0 || >=26.0.0`

Image dimensions are parsed by the repository's own buffer helpers in `src/filters.js`; there is no image-dimension package dependency.

**CDN-loaded, not in package.json** (see [[Template System]]):
- Motion `10.18.0` - scroll/stagger animations in `base.njk`, guarded by `prefers-reduced-motion`
- Vue `3.5.34` - pinned exactly, not a floating range; see [[Vue Version Pin]]

## Where it's pinned / configured

- `package.json` - npm dependency versions (caret ranges except where noted)
- `src/projects.njk`, `src/blog/index.njk` - Vue CDN import URL, must match exactly between the two
- `base.njk` - Motion CDN import URL

## Upgrade risk

This is a small, deliberately minimal stack. The main coordinated upgrade risks are:
1. Vue: bump both CDN URLs together, then `npm test` (see [[Vue Version Pin]]).
2. Eleventy major version bumps: re-check the RSS plugin's ESM default-export `require()` workaround in [[Eleventy Config]] still applies.
3. Tailwind upgrades: keep `tailwindcss` and `@tailwindcss/cli` aligned and verify the legacy `@config` bridge still works.
4. Vitest 5: local Node must meet its supported range. CI and deployment use floating Node 22, which resolves a supported patch release.

## October 2026 consolidation

PR #130 replaces Dependabot PRs #125 through #129, which are closed with links to the replacement. Vitest and `@vitest/mocker` 5.0.0 include the mock redirect file-serving allowlist guard from the separate 4.1.11 update. Both transitive `js-yaml` lines are patched to 3.15.2 and 4.3.2. Compatible audit updates also resolve `brace-expansion` to 1.1.21 and Eleventy's nested `markdown-it` to 14.3.2.

Clean `npm ci`, all 137 tests (including the production build), `npm ls --all`, and `git diff --check` pass. Independent review finds no blocking dependency compatibility regression. GitHub's Node 22 CI test job also passes for the dependency commit.

`npm audit --audit-level=high` still fails with eight high-severity package entries, all originating from `braces` through Eleventy's chokidar and Tailwind's watcher/micromatch chains. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists no patched release as of 2026-10-05. Forced Eleventy/Tailwind downgrades are not a compatible remediation. The audit gate remains enabled, and the PR records this upstream blocker.

## Notes

`test/build.test.js` runs a full `npm run build` in `beforeAll` (up to ~2 minutes) - factor that into any CI or local turnaround expectations when a dependency bump touches the build.
