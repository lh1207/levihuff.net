---
type: meta
title: "Wiki Log"
created: 2026-07-14
updated: 2026-08-21
tags:
  - meta
status: evergreen
related: []
sources: []
---

# Wiki Log

Append-only. New entries go at the TOP. Never edit past entries.

---

## 2026-10-07 - AeroAssist website PR opened with monitoring

Opened PR #135 on `codex/aeroassist-portfolio-case-study` at the owner's request. Rebased onto current main at `977828d`, resolving shared vault conflicts while preserving both histories. All 159 tests pass. Initial GitHub checks are running; a ten-minute heartbeat monitors CI, reviews, conflicts, and closure without merge authorization. See [[AeroAssist Website Case Study]].

---

## 2026-10-07 - AeroAssist website presentation grounded in source

Reworked the existing AeroAssist case study, Docker notes, and project card using GitHub history and source at `dff52cb`. Removed unsupported feature claims, linked contribution commits, retained authentic screenshots, and documented runtime limitations. The owner restricts changes to the website; project repositories remain unchanged. All 159 tests pass, with desktop/mobile browser checks and independent attribution review. Website changes remain local and unpublished. See [[AeroAssist Website Case Study]].

---

## 2026-10-05 - Corrected the merged article's build exclusion

PR #131 was merged while `.eleventyignore` still suppressed the article. Removed the exclusion to include the post in the normal blog collection and production output. Draft PR status should have provided the review boundary. Updated [[Custom Domain Email Blog Draft]], the index, and hot cache to record this correction.

---

## 2026-10-05 - PR #131 reconciled with merged dependency updates

Merged main at `eec01f7` into the draft branch. Resolved shared hot-cache and log conflicts by preserving both branches' evidence and historical entries. Article text, images, and publication exclusion are unchanged. Clean installation and all 159 tests pass. See [[Custom Domain Email Blog Draft]].

---

## 2026-10-05 - Custom domain email draft prepared for review

Prepared the unpublished article on `blog/replying-from-my-own-domain` from current main. Added an attributed Unsplash cover and four supplied screenshots, with private regions replaced by solid black pixels in flattened PNG exports. Verified 137 tests and desktop/mobile rendering. `.eleventyignore` keeps the article out of production output. Final mail delivery is attributed to the supplied completed session record.

See [[Custom Domain Email Blog Draft]].

---

## 2026-10-05 - Owner approves a narrow braces advisory exception

The owner explicitly accepts GHSA-vfj7-8cjw-p6xm so dependency updates can proceed without a compatible upstream patch. CI now uses `npm run audit:ci` to exempt only that exact advisory and parent entries whose causes are exclusively that finding. Other high findings, all critical findings, and audit execution/report errors remain blocking. Fresh live audit validation passes with all eight accepted package entries visible in logs. The dependency vulnerability remains present; remove the exception when upstream dependencies can be patched.

Updated [[Tech Stack]], [[Deploy Pipeline]], the index, and hot cache. All 159 tests pass, including 22 regressions for the policy and its failure modes. Independent review finds no unintended audit bypass. The exception is part of existing PR #130.

---

## 2026-10-05 - Dependabot updates consolidated in PR #130

Updated [[Tech Stack]] for the combined dependency tree in [PR #130](https://github.com/lh1207/levihuff.net/pull/130). Dependabot PRs #125, #126, #127, #128, and #129 are closed as superseded. The replacement remains open and unmerged.

Clean installation and all 137 tests, including the production build, pass. The Vitest 5 mocker includes the security fix requested by the overlapping 4.1.11 PR. Compatible transitive patches resolve the additional brace-expansion and markdown-it advisories. Eight high audit entries remain from the unpatched braces advisory; the PR documents the blocker and preserves the security gate. Refreshed the index and hot cache for continuation.

---

## 2026-08-21 - AD PXE Phase 4 blog PR #123 opened

Added a 1,271-word, source-grounded post on the supported Windows 11 PXE path in the Active Directory lab. Verified that ad-pxe-lab PR #5 is merged, not draft, and used its merged runbook, final acceptance transcript, and three authentic screenshots as sources.

Published from `codex/ad-pxe-lab-phase-04-post` at commit `de3c7ac` in levihuff.net PR #123. All 137 tests, rendered desktop QA, GitHub CI, and the security workflow passed. Phase 4 is complete; Phase 5 Group Policy and later golden-image and Configuration Manager work remain pending.

See [[AD PXE Phase 4 Blog PR 123]].

---

## 2026-08-18 - PR #99 merged and deployed

PR #99 merged into `main` as squash commit `65986e5` after conflict resolution retained current site behavior and removed automatic vault commits. Local verification passed all 137 tests; the wiki metadata and all real wikilinks validated successfully.

GitHub CI, security checks, both CodeQL analyses, the production build, and FTP deployment all completed successfully. The repository-local vault is now the primary store for codebase-specific durable context, with the global personal vault available for cross-reference.

---

## 2026-08-18 - Rebased scaffold onto current main

Resolved PR #99 against current `main` without carrying stale site or workflow changes. Refreshed the vault for Tailwind CSS 4, current dependency versions, the `jsonScript` filter, structured profile data, `/llms.txt`, and the 137-test suite.

Kept the repo-local vault, SessionStart context loading, and the Stop refresh reminder. Removed the PostToolUse auto-commit hook so vault changes remain explicit, reviewable commits.

---

## 2026-07-14 - Vault scaffolded

Created the vault at `vault/` inside the levihuff.net repo (project-local, committed alongside site source - not the global `~/.claude/vault`, not a nested git repo). Mode B (GitHub / Repository).

Created:
- `vault/CLAUDE.md` - vault instructions
- `vault/wiki/{index,log,hot,overview}.md`
- `vault/wiki/modules/` - `_index`, [[Eleventy Config]], [[CSS Pipeline]], [[Data Layer]], [[Template System]]
- `vault/wiki/components/_index.md` (seed)
- `vault/wiki/decisions/` - `_index`, [[Deploy Concurrency Queue]], [[Dark First Theme]], [[Vue Version Pin]]
- `vault/wiki/dependencies/` - `_index`, [[Tech Stack]]
- `vault/wiki/flows/` - `_index`, [[Build Pipeline]], [[Deploy Pipeline]]
- `vault/_templates/` - module, component, decision, dependency, flow
- `vault/.obsidian/snippets/vault-colors.css` - folder colors + custom callouts, adapted from the plugin's generic scheme to this vault's Mode B folder names
- Repo-level hooks in `.claude/settings.json`: SessionStart prints `vault/wiki/hot.md`, and Stop reminds maintainers to refresh it when `vault/wiki/` has uncommitted changes

MCP: skipped for now (Claude Code already has direct filesystem access to `vault/` in this repo; no separate MCP server needed for this workflow).

Content for modules/decisions/dependencies/flows was seeded from the parent repo's own `CLAUDE.md` architecture documentation plus direct file reads (`package.json`, `eleventy.config.cjs`, `.gitignore`), not from a `.raw/` source dump - there was no external source to ingest, this is first-party documentation of the live codebase.
