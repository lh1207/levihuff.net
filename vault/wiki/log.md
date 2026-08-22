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
