---
type: meta
title: "Hot Cache"
created: 2026-07-14
updated: 2026-10-07
tags: [meta]
status: active
related: ["[[Tech Stack]]", "[[Custom Domain Email Blog Draft]]"]
---

# Recent context

## Current blog draft

- PRs #131 and #132 are merged. The custom-domain email article appears in normal builds after correction of its mistaken exclusion. Four supplied screenshots use flattened solid redactions; original sensitive images are not repository assets. Delivery evidence comes from the supplied session record. See [[Custom Domain Email Blog Draft]].

## Current dependency context

- The owner requires zero known vulnerabilities. Draft PR #137 contains the verified candidate; the same security code is pushed to #135 and #136. Their suites pass 171, 171, and 175 tests respectively, with zero audit findings. GitHub CI/security/CodeQL pass on all three. Dependabot #133/#134 are closed as superseded. See [[Tech Stack]].
- The candidate pins official Eleventy 4.0.0-alpha.10, aliases gray-matter to the maintained 11ty fork, and overrides Parcel watcher to official 2.6.0. These remove braces and sprintf-js completely. RSS 3.1.0, Vitest 5.0.3, shell-quote 1.12.0, and source-map-js 1.2.2 are retained.
- Both Vue imports use patched 3.5.43; exact Vue and Motion 10.18.0 pins are included in npm audit and tests enforce CDN/manifest/lock agreement. Every advisory severity now blocks; the old braces exception and proposed relaxation are removed. All 194 installed packages have verified registry signatures, with 67 available attestations.
- Node must satisfy `^22.15.0 || ^24.0.0 || >=26.0.0`. The preceding 170-test suite passes on minimum Node 22.15 and 24.0 plus Node 26. Ten live-reload checks and real-browser filters pass. All 206 generated files match the old framework output before the intentional Vue URL update.
- Main remains unchanged. Adopting Eleventy and its dev-server/Nunjucks prereleases requires an explicit owner decision. Stable Eleventy 3 cannot remove the affected watcher without breaking glob compatibility. Zero known findings does not guarantee no undiscovered vulnerability or attest to CDN bytes.

## Stable context

- `vault/` is the primary repository knowledge store. Never edit `.raw/`; log entries are append-only; vault changes are reviewed and committed intentionally.
- Main includes the Phase 4 AD/PXE post from merged PR #123. Phase 4 is complete; Phase 5 and later deployment phases remain outside that post's completion boundary.
- Until candidate adoption, main remains Eleventy 3.1.6 and Vue 3.5.34. Tailwind 4.3.3 and Motion 10.18.0 are shared by both baselines.
