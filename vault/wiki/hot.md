---
type: meta
title: "Hot Cache"
created: 2026-07-14
updated: 2026-10-05
tags:
  - meta
status: active
---

# Recent Context

## Last Updated

2026-10-05. The custom-domain email article is prepared on `blog/replying-from-my-own-domain`, based on current main at `406daf7`. PR #123 is merged in that main revision.

## Key Recent Facts

- `vault/` is this repository's primary codebase vault. It is not a nested Git repository; cross-references to the global personal vault remain possible.
- Session start prints `vault/wiki/hot.md`. Session stop reminds maintainers about uncommitted vault changes.
- Vault edits are never auto-committed. Review and commit them intentionally with the related work.
- Current `main` uses Eleventy 3.1.6, Tailwind CSS 4.3.3 via `@tailwindcss/cli`, Vue 3.5.34 islands, Motion 10.18.0, and 137 Vitest regressions.
- ad-pxe-lab PR #5 is merged. Phase 4 is complete with a supported custom-WinPE PXE path, Windows 11 CL02 deployment, domain and OU placement, secure channel, domain-user sign-in, and `pre-phase-05` checkpoints.

## Recent Changes

- Added the unpublished `src/blog/replying-from-my-own-domain.md`, an attributed Unsplash cover, and four supplied screenshots.
- Private account addresses, a confirmation link, and an avatar are replaced by solid black pixels in lossless PNGs. Pixels outside the masks are preserved; originals are not repository assets.
- Verified 137 tests and desktop/mobile rendering on current main. See [[Custom Domain Email Blog Draft]] for source boundaries and validation.

## Active Threads

- Review the custom-domain email draft. `.eleventyignore` excludes the article from production until publication is authorized.
- The mail setup and delivery are complete according to the supplied session record. No further mail action is needed for this article.
- `wiki/components/` remains a seed. Add individual pages when a component accumulates non-obvious behavior worth preserving.
