---
type: meta
title: "Hot Cache"
created: 2026-07-14
updated: 2026-08-21T22:15:00-04:00
tags:
  - meta
status: active
---

# Recent Context

## Last Updated

2026-08-21. The AD/PXE lab Phase 4 post is open in levihuff.net PR #123 from `codex/ad-pxe-lab-phase-04-post` at `de3c7ac`. GitHub CI and security checks pass.

## Key Recent Facts

- `vault/` is this repository's primary codebase vault. It is not a nested Git repository; cross-references to the global personal vault remain possible.
- Session start prints `vault/wiki/hot.md`. Session stop reminds maintainers about uncommitted vault changes.
- Vault edits are never auto-committed. Review and commit them intentionally with the related work.
- Current `main` uses Eleventy 3.1.6, Tailwind CSS 4.3.3 via `@tailwindcss/cli`, Vue 3.5.34 islands, Motion 10.18.0, and 137 Vitest regressions.
- ad-pxe-lab PR #5 is merged. Phase 4 is complete with a supported custom-WinPE PXE path, Windows 11 CL02 deployment, domain and OU placement, secure channel, domain-user sign-in, and `pre-phase-05` checkpoints.

## Recent Changes

- Added `src/blog/building-a-supported-windows-11-pxe-path.md`, a 1,271-word source-grounded Phase 4 post.
- Added three authentic lab evidence images under `src/images/blog/`; no generated or stock imagery is used.
- Verified 137 of 137 tests, desktop rendering, image loading, overflow, console output, GitHub CI, and security.

## Active Threads

- Review and merge PR #123 when ready.
- Keep the post's status boundary accurate: Phase 4 is complete; Phase 5 and later phases remain pending.
- `wiki/components/` remains a seed. Add individual pages when a component accumulates non-obvious behavior worth preserving.
