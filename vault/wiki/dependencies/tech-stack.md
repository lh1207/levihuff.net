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
updated: 2026-10-07
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

Runtime and dev dependencies on the refresh branch in [PR #137](https://github.com/lh1207/levihuff.net/pull/137). PR #130 is merged; PR #137 remains unmerged pending an audit-policy decision.

**Runtime**
- `@11ty/eleventy` `^3.1.6` - static site generator, the core of the build

**Dev**
- `@11ty/eleventy-plugin-rss` `^3.1.0` - Atom feed generation
- `@11ty/eleventy-plugin-syntaxhighlight` `^5.0.2` - Prism-based code block highlighting
- `tailwindcss` and `@tailwindcss/cli` `^4.3.3` - utility CSS generation, vendor prefixing, and minification
- `gray-matter` `^4.0.3` - frontmatter parsing in tests
- `markdown-it` `^15.0.1` (locked to 15.0.2), `markdown-it-anchor` `^10.0.0` - markdown rendering and heading anchors
- `npm-run-all2` `^9.0.3` - runs `dev:11ty` + `dev:css` and `watch:11ty` + `watch:css` in parallel
- `vitest` `^5.0.3` - test runner for the five suites in `test/`; requires Node `^22.12.0 || ^24.0.0 || >=26.0.0`

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

## October 7 dependency refresh

PR #137 consolidates the versions requested by Dependabot #133 and #134. Vitest and its mocker/spy packages resolve to 5.0.3; the RSS plugin resolves to 3.1.0. Compatible transitive updates include shell-quote 1.12.0 and source-map-js 1.2.2, resolving GHSA-pqg4-j6r4-53mv (critical) and GHSA-68fv-2mgg-jv7q (high). No forced downgrades, overrides, or new direct dependencies are used. `npm outdated` reports no outdated direct packages.

Clean installation, all 159 tests including production build, `npm ls --all`, and whitespace validation pass. Independent dependency review finds no compatibility issue. The same dependency commit is merged and pushed into PR #135 (159 passing tests) and PR #136 (163 passing tests).

The audit gate still fails. Eleventy's high parent finding now combines the accepted braces advisory with moderate GHSA-hp3w-g68c-fv3c through gray-matter, js-yaml 3, argparse 1, and sprintf-js. The existing policy requires every leaf in an exempt high chain to match the braces exception, so the moderate leaf invalidates that exemption. Neither braces nor sprintf-js has a patched release. npm's suggested gray-matter downgrade is incompatible, and forcing js-yaml 4 breaks gray-matter's safeLoad/safeDump API use.

An owner decision is pending on allowing low/moderate causes alongside the exact accepted braces advisory while retaining every other high/critical block. No policy change or main merge is performed without that decision. Raw audit reports 8 high and 4 moderate package entries, with no critical findings after the refresh. Package-entry counts include propagated parent findings.

## October 5 consolidation

PR #130 replaces Dependabot PRs #125 through #129, which are closed with links to the replacement. Vitest and `@vitest/mocker` 5.0.0 include the mock redirect file-serving allowlist guard from the separate 4.1.11 update. Both transitive `js-yaml` lines are patched to 3.15.2 and 4.3.2. Compatible audit updates also resolve `brace-expansion` to 1.1.21 and Eleventy's nested `markdown-it` to 14.3.2.

The dependency consolidation passes clean `npm ci`, all 159 tests (including 22 audit-policy regressions and the production build), `npm ls --all`, and `git diff --check`. Independent reviews find no blocking dependency compatibility regression or unintended audit bypass. GitHub's Node 22 CI test job also passes for the original dependency commit; verify the exception commit's checks live.

Raw `npm audit --audit-level=high` reports eight high-severity package entries, all originating from `braces` through Eleventy's chokidar and Tailwind's watcher/micromatch chains. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists no patched release as of 2026-10-05. Forced Eleventy/Tailwind downgrades are not a compatible remediation.

The owner explicitly approves exempting this one advisory on 2026-10-05. CI uses `npm run audit:ci`; the dependency vulnerability remains present and is accepted, not fixed. The wrapper matches the exact advisory URL, package, high severity, and affected range, resolving all parent findings to their underlying causes. Any additional advisory in that chain still blocks. All critical findings and audit execution/report errors also block. Fresh registry validation passes under this policy and logs all eight accepted package entries. Remove the exception when upstream dependencies can be patched.

## Notes

`test/build.test.js` runs a full `npm run build` in `beforeAll` (up to ~2 minutes) - factor that into any CI or local turnaround expectations when a dependency bump touches the build.
