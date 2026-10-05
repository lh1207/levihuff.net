---
type: meta
title: "Hot Cache"
created: 2026-07-14
updated: 2026-10-05
tags:
  - meta
status: active
related:
  - "[[Tech Stack]]"
---

# Recent Context

## Current dependency work

- [PR #130](https://github.com/lh1207/levihuff.net/pull/130), `chore/consolidate-dependabot-2026-10-05`, combines all five Dependabot updates. PRs #125 through #129 are closed as superseded; #130 remains open and unmerged.
- The branch uses Vitest and `@vitest/mocker` 5.0.0, markdown-it 15.0.2, markdown-it-anchor 10.0.0, and js-yaml 3.15.2/4.3.2. Compatible transitive patches also update brace-expansion to 1.1.21 and Eleventy's markdown-it to 14.3.2. See [[Tech Stack]].
- Clean installation, all 137 tests including the production build, the full dependency tree, and an independent compatibility review pass. GitHub's Node 22 CI passes for the dependency commit.
- The audit gate still fails: eight high package entries stem from the unpatched braces advisory GHSA-vfj7-8cjw-p6xm through Eleventy and Tailwind watcher dependencies. No forced downgrade or security-check bypass is applied.
- Vitest 5 requires Node 22.12+, 24, or 26+. CI and deployment already use floating Node 22. Verify current PR state and checks before further action.

## Stable context

- `vault/` is the primary repository knowledge store. Never edit `.raw/`; log entries are append-only; vault changes are reviewed and committed intentionally.
- Main includes the Phase 4 AD/PXE post from merged PR #123 at `406daf7`. Earlier hot-cache references to that PR being open are stale.
- The site remains Eleventy 3.1.6, Tailwind CSS 4.3.3 via `@tailwindcss/cli`, Vue 3.5.34 islands, and Motion 10.18.0.
- AD/PXE Phase 4 is complete. Phase 5 and later deployment phases remain outside the published post's completion boundary.
