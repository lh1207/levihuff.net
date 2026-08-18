---
type: meta
title: "Hot Cache"
created: 2026-07-14
updated: 2026-08-18T16:00:00-04:00
tags:
  - meta
status: active
---

# Recent Context

## Last Updated

2026-08-18. PR #99 merged the repo-local documentation vault into `main` as squash commit `65986e5`. The vault records why the site architecture looks the way it does and is committed alongside the source.

## Key Recent Facts

- `vault/` is this repository's primary codebase vault. It is not a nested Git repository; cross-references to the global personal vault remain possible.
- Session start prints `vault/wiki/hot.md`. Session stop reminds maintainers about uncommitted vault changes.
- Vault edits are never auto-committed. Review and commit them intentionally with the related work.
- Current `main` uses Eleventy 3.1.6, Tailwind CSS 4.3.3 via `@tailwindcss/cli`, Vue 3.5.34 islands, Motion 10.18.0, and 137 Vitest regressions.

## Recent Changes

- Refreshed the scaffold against current `main`, including the Tailwind 4 pipeline, dependency versions, structured profile data, `/llms.txt`, `jsonScript`, and expanded image-dimension support.
- Removed the proposed PostToolUse auto-commit hook; retained context-loading and refresh-reminder hooks.
- PR checks and post-merge CI, security, CodeQL, build, and FTP deployment completed successfully.

## Active Threads

- `wiki/components/` remains a seed. Add individual pages when a component accumulates non-obvious behavior worth preserving.
- Architecture changes to `src/`, `eleventy.config.cjs`, `tailwind.config.js`, or `package.json` should update the corresponding vault note in the same change.
