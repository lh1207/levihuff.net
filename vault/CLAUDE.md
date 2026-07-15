# levihuff.net Vault: LLM Wiki

Mode: B (GitHub / Repository)
Purpose: Continuous, committed documentation of the levihuff.net Eleventy codebase - architecture, modules, decisions, dependencies, and build/deploy flows - kept current as the repo evolves, and read at session start to prime context cheaply (prompt caching).
Owner: Levi Huff
Created: 2026-07-14

This vault lives inside the levihuff.net repo itself (`vault/`), not in the global `~/.claude/vault`. It is tracked and committed alongside the site's source - there is no separate git repository here.

## Structure

```
vault/
├── .raw/              # source dumps: raw file excerpts, CI logs, git log exports (hidden folder)
├── wiki/
│   ├── index.md       # master catalog of all wiki pages
│   ├── log.md         # chronological record of wiki operations (newest entries on top)
│   ├── hot.md         # hot cache: ~500-word summary of recent context
│   ├── overview.md     # executive summary of the whole site architecture
│   ├── modules/       # one note per major subsystem (data layer, CSS pipeline, templates, config)
│   ├── components/    # reusable template partials / Vue islands
│   ├── decisions/     # Architecture Decision Records (ADRs) - the "why" behind non-obvious choices
│   ├── dependencies/  # external deps, versions, upgrade risk
│   └── flows/         # build pipeline, deploy pipeline, request/render paths
├── _templates/         # note templates for each type
└── CLAUDE.md            # this file
```

## Conventions

- All notes use flat YAML frontmatter: `type`, `title`, `created`, `updated`, `tags`, `status` (minimum). See individual `_templates/` files for type-specific fields.
- Wikilinks use `[[Note Name]]` format: filenames are unique within the vault, no paths needed.
- `.raw/` contains source dumps: never modify them after they're written.
- `wiki/index.md` is the master catalog: update on every change.
- `wiki/log.md` is append-only: never edit past entries. New entries go at the TOP.
- `wiki/hot.md` is a cache, not a journal: overwrite it completely each time, keep it under 500 words.
- No em dashes in prose (matches the parent repo's own content convention in `CLAUDE.md`).

## Operations

- **Update**: after any change to `src/`, `eleventy.config.cjs`, `tailwind.config.js`, or `package.json` that shifts architecture, update the relevant `wiki/modules/`, `wiki/dependencies/`, or `wiki/flows/` note - don't wait for a dedicated "ingest" pass.
- **Decide**: when a non-obvious tradeoff gets made (see existing entries in `wiki/decisions/` for the bar), file a new ADR.
- **Query**: read `wiki/hot.md` first, then `wiki/index.md`, then drill into the specific note.
- **Session start**: a repo-level hook (`.claude/settings.json`) prints `vault/wiki/hot.md` automatically so this context loads without asking.

## Why this exists

The parent repo's `CLAUDE.md` documents *what the conventions are*. This vault documents *why the architecture looks the way it does* and tracks it as the repo changes, so a fresh Claude Code session (or a compacted one) can re-orient in a couple hundred tokens instead of re-reading the whole codebase.
