---
type: meta
title: "Wiki Log"
created: 2026-07-14
updated: 2026-07-14
tags:
  - meta
status: evergreen
related: []
sources: []
---

# Wiki Log

Append-only. New entries go at the TOP. Never edit past entries.

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
- Repo-level hooks in `.claude/settings.json`: SessionStart prints `vault/wiki/hot.md`, PostToolUse auto-commits `vault/` changes after Write/Edit, Stop reminds to refresh `hot.md` when `vault/wiki/` changed this session

MCP: skipped for now (Claude Code already has direct filesystem access to `vault/` in this repo; no separate MCP server needed for this workflow).

Content for modules/decisions/dependencies/flows was seeded from the parent repo's own `CLAUDE.md` architecture documentation plus direct file reads (`package.json`, `eleventy.config.cjs`, `.gitignore`), not from a `.raw/` source dump - there was no external source to ingest, this is first-party documentation of the live codebase.
