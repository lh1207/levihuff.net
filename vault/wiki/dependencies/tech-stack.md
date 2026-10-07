---
type: dependency
title: "Tech Stack"
package: "package.json"
version: "n/a - see individual entries"
status: active
risk: moderate
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

Runtime and dev dependencies on the security candidate in [PR #137](https://github.com/lh1207/levihuff.net/pull/137). The candidate has zero known npm vulnerabilities and is also applied to PRs #135 and #136. Main remains unchanged pending an explicit decision to adopt the official Eleventy 4 alpha line.

**Runtime**
- `@11ty/eleventy` `4.0.0-alpha.10` - exactly pinned official prerelease; replaces the vulnerable Chokidar 3 and frontmatter chains

**Dev**
- `@11ty/eleventy-plugin-rss` `^3.1.0` - Atom feed generation
- `@11ty/eleventy-plugin-syntaxhighlight` `^5.0.2` - Prism-based code block highlighting
- `tailwindcss` and `@tailwindcss/cli` `^4.3.3` - utility CSS generation, vendor prefixing, and minification
- `gray-matter` aliases `npm:@11ty/gray-matter@2.1.0` - maintained compatible frontmatter parser using js-yaml 4
- `markdown-it` `^15.0.1` (locked to 15.0.2), `markdown-it-anchor` `^10.0.0` - markdown rendering and heading anchors
- `npm-run-all2` `^9.0.3` - runs `dev:11ty` + `dev:css` and `watch:11ty` + `watch:css` in parallel
- `vitest` `^5.0.3` - test runner for the five suites in `test/`; requires Node `^22.12.0 || ^24.0.0 || >=26.0.0`

Image dimensions are parsed by the repository's own buffer helpers in `src/filters.js`; there is no image-dimension package dependency.

**CDN-loaded and exactly pinned in devDependencies for audit coverage** (see [[Template System]]):
- Motion `10.18.0` - scroll/stagger animations in `base.njk`, guarded by `prefers-reduced-motion`
- Vue `3.5.43` - both browser imports match the audited package pin; see [[Vue Version Pin]]

**Override:** `@parcel/watcher` `2.6.0` replaces Tailwind CLI's exact 2.5.1 pin. Official watcher 2.6 uses picomatch instead of micromatch/braces. Remove the override once Tailwind updates its dependency.

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
5. The security candidate requires Node `^22.15.0 || ^24.0.0 || >=26.0.0`. Eleventy, its dev server, and Nunjucks are prereleases. Supported watch behavior rules out forcing Chokidar 4/5 into Eleventy 3: glob support was removed, and Chokidar 5 is ESM-only while the old dev server uses require.

## October 7 zero-vulnerability candidate

PR #137 retains the RSS 3.1.0 and Vitest 5.0.3 upgrades from Dependabot #133/#134, plus compatible shell-quote 1.12.0 and source-map-js 1.2.2 patches. The owner's subsequent zero-vulnerability requirement supersedes the old braces exception and the proposed moderate-chain relaxation. CI rejects every known vulnerability, including development packages, and verifies registry signatures and available provenance.

Removed braces and sprintf-js rather than hiding their advisories. Neither has an upstream patched release. The official Eleventy 4 dependency line replaces Chokidar 3, the old Nunjucks chain, and gray-matter/js-yaml 3. The direct maintained frontmatter alias and official Parcel watcher override remove the remaining paths. JavaScript frontmatter is intentionally unsupported by the maintained fork; this repo uses YAML. The standalone old js-yaml CLI was the installed route to sprintf-js, not ordinary frontmatter parsing.

Auditing the exact browser package versions uncovered Vue/server-renderer GHSA-g2v6-rqmx-r4w6. Both CDN imports use patched Vue 3.5.43. The site uses browser islands rather than SSR, but the complete package tree is patched and covered. Motion 10.18.0 remains exactly pinned and has no findings in this audit. Tests enforce CDN/manifest/lockfile agreement.

Validation: clean npm ci; unqualified npm audit and audit:ci report zero at every severity; all 194 installed packages have verified registry signatures and 67 available attestations; npm ls and whitespace checks pass. All 171 tests pass on Node 26.10.0; the preceding 170-test suite also passes on minimum Node 22.15.0 and Node 24.0.0. Regressions cover every-severity blocking, former exception rejection, package removal, CDN pins, and Vue's malicious attribute names plus legitimate output.

Ten live-reload checks exercise npm start/watch, Markdown, layout cache invalidation, added templates, Tailwind, and passthrough files. The isolated framework upgrade preserves all 206 generated files byte for byte before the intentional Vue URL update. Real-browser project Software and blog email filters work without errors. Independent investigation and candidate review identify no surviving vulnerable route.

Security commit 700ce46 is pushed in #137 and applied to #135 (b5211dc, 171 tests) and #136 (5a77f5e, 175 tests). All three PRs pass GitHub CI, every-severity audits with signature verification, gitleaks, environment guards, and CodeQL. Dependabot #133/#134 are closed as superseded. Main adoption and deployment await the Eleventy prerelease decision. A zero advisory report cannot guarantee no undiscovered vulnerability or cryptographically attest to CDN response bytes.

## October 5 consolidation

Historical policy below is superseded by the October 7 candidate's zero-finding requirement.

PR #130 replaces Dependabot PRs #125 through #129, which are closed with links to the replacement. Vitest and `@vitest/mocker` 5.0.0 include the mock redirect file-serving allowlist guard from the separate 4.1.11 update. Both transitive `js-yaml` lines are patched to 3.15.2 and 4.3.2. Compatible audit updates also resolve `brace-expansion` to 1.1.21 and Eleventy's nested `markdown-it` to 14.3.2.

The dependency consolidation passes clean `npm ci`, all 159 tests (including 22 audit-policy regressions and the production build), `npm ls --all`, and `git diff --check`. Independent reviews find no blocking dependency compatibility regression or unintended audit bypass. GitHub's Node 22 CI test job also passes for the original dependency commit; verify the exception commit's checks live.

Raw `npm audit --audit-level=high` reports eight high-severity package entries, all originating from `braces` through Eleventy's chokidar and Tailwind's watcher/micromatch chains. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists no patched release as of 2026-10-05. Forced Eleventy/Tailwind downgrades are not a compatible remediation.

The owner explicitly approves exempting this one advisory on 2026-10-05. CI uses `npm run audit:ci`; the dependency vulnerability remains present and is accepted, not fixed. The wrapper matches the exact advisory URL, package, high severity, and affected range, resolving all parent findings to their underlying causes. Any additional advisory in that chain still blocks. All critical findings and audit execution/report errors also block. Fresh registry validation passes under this policy and logs all eight accepted package entries. Remove the exception when upstream dependencies can be patched.

## Notes

`test/build.test.js` runs a full `npm run build` in `beforeAll` (up to ~2 minutes) - factor that into any CI or local turnaround expectations when a dependency bump touches the build.
