---
type: meta
title: "Hot Cache"
updated: 2026-07-14T00:00:00
---

# Recent Context

## Last Updated

2026-07-14. Vault scaffolded from scratch at `vault/` inside the levihuff.net repo (Mode B: GitHub/Repository). This is a codebase-documentation vault, not a general knowledge base - it exists to track *why* the architecture looks the way it does, committed alongside the site source, and read at session start for cheap context priming.

## Key Recent Facts

- Vault lives at `vault/` in this repo (not `~/.claude/vault`, not a nested git repo - tracked as part of the normal repo history).
- MCP was deliberately skipped: Claude Code already reads/writes `vault/` directly via its own filesystem tools.
- A repo-level hook set was added to `.claude/settings.json` (separate from the plugin's own generic `wiki/`-at-root hooks, which don't apply here since this vault is nested under `vault/wiki/` rather than bare `wiki/`).

## Recent Changes

- Created: [[Architecture Overview]], [[Eleventy Config]], [[CSS Pipeline]], [[Data Layer]], [[Template System]], [[Deploy Concurrency Queue]], [[Dark First Theme]], [[Vue Version Pin]], [[Tech Stack]], [[Build Pipeline]], [[Deploy Pipeline]]
- Created index pages: [[Modules Index]], [[Components Index]] (seed only), [[Decisions Index]], [[Dependencies Index]], [[Flows Index]], [[Wiki Index]]

## Active Threads

- `wiki/components/` is intentionally a seed (no individual component pages yet) - populate once a component accumulates non-obvious behavior worth documenting.
- Next natural update trigger: any change to `src/`, `eleventy.config.cjs`, `tailwind.config.js`, or `package.json` that shifts architecture should prompt an update to the relevant module/dependency/flow note, per `vault/CLAUDE.md`.
