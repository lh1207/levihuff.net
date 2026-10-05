---
type: meta
title: "Hot Cache"
created: 2026-07-14
updated: 2026-10-05
tags: [meta]
status: active
related: ["[[Tech Stack]]", "[[Custom Domain Email Blog Draft]]"]
---

# Recent context

## Current blog draft

- PR #131, `blog/replying-from-my-own-domain`, contains the unpublished custom-domain email article, an attributed Unsplash cover, and four supplied screenshots. Private regions use solid black replacement pixels in flattened PNGs; original sensitive screenshots are not repository assets.
- PR #131 is merged. A corrective branch removes the mistaken `.eleventyignore` exclusion so the post appears in normal builds and the blog listing. Draft PR status should provide the review boundary without hiding merged content. The completed mail setup and delivery come from the supplied session record; no further mail action is needed.
- The branch incorporates main at `eec01f7`. Its vault conflicts preserve both the article evidence and dependency context. See [[Custom Domain Email Blog Draft]] for validation.

## Current dependency context

- PR #130 is merged as `eec01f7`; Dependabot PRs #125 through #129 are closed as superseded.
- Main uses Vitest and `@vitest/mocker` 5.0.0, markdown-it 15.0.2, markdown-it-anchor 10.0.0, and js-yaml 3.15.2/4.3.2. Compatible transitive patches update brace-expansion to 1.1.21 and Eleventy's markdown-it to 14.3.2. See [[Tech Stack]].
- The suite has 159 tests, including 22 audit-policy regressions. Vitest 5 requires Node 22.12+, 24, or 26+; CI and deployment use Node 22.
- The owner-approved exception for GHSA-vfj7-8cjw-p6xm remains narrow: `npm run audit:ci` matches only that braces advisory and its dependent findings. The vulnerability remains present. Other high findings, all critical findings, and malformed or failed audits still block. Remove the exception when upstream dependencies can be patched.

## Stable context

- `vault/` is the primary repository knowledge store. Never edit `.raw/`; log entries are append-only; vault changes are reviewed and committed intentionally.
- Main includes the Phase 4 AD/PXE post from merged PR #123. Phase 4 is complete; Phase 5 and later deployment phases remain outside that post's completion boundary.
- The site remains Eleventy 3.1.6, Tailwind CSS 4.3.3 via `@tailwindcss/cli`, Vue 3.5.34 islands, and Motion 10.18.0.
