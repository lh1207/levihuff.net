# AGENT_CONFIG.md

Index of every agent-harness file in this repository: what each does and whether it is tracked. CLAUDE.md is the single source of truth for repo facts; nothing here should duplicate it, only point at it.

## Harness inventory

| File | Purpose | Tracked |
|---|---|---|
| `CLAUDE.md` | Claude Code guidance; SSOT for architecture, data schemas, tests, design rules, review monitor | yes |
| `AGENTS.md` | Codex-oriented summary, kept in sync with CLAUDE.md | yes |
| `AGENT_CONFIG.md` | This index | yes |
| `.claude/settings.json` | Project hooks: PostToolUse test gate, SessionStart reminder | yes |
| `.claude/hooks/run-tests-on-edit.sh` | Runs `npm test` after edits to src/, test/, eleventy.config.cjs, tailwind.config.js, or package.json; exits 2 with output on failure | yes |
| `.claude/commands/add-blog-post.md` | Scaffold a blog post per the CLAUDE.md frontmatter contract | yes |
| `.claude/commands/add-infra-entry.md` | Scaffold an `src/_data/infra.js` entry per the schema in `test/data.test.js` | yes |
| `.claude/commands/verify-site.md` | Run `npm test` and summarize failures by test file | yes |
| `.claude/commands/dispatch-review.md` | Codex adversarial review of branch or uncommitted diff, deduplicated against the monitor | yes |
| `.claude/skills/eleventy-content/SKILL.md` | Data-driven content procedure (data files, blog, pages) | yes |
| `.claude/skills/design-system/SKILL.md` | DESIGN.md token map and hard visual rules | yes |
| `.cursor/rules/levihuff.mdc` | Cursor rule (globs src/**, test/**, *.cjs): test gate, design voice, correct config filename | yes |
| `.cursor/agents/review-monitor.md` | Parallel review monitor agent definition | yes |
| `.cursor/review-state/` | Ephemeral monitor state: `handoff.md`, `last-seen-sha`, `session.json`, `findings/` | no (gitignored) |
| `.claude/settings.local.json`, `.claude/worktrees/`, other `.claude/*` | Personal settings, credentials, cache, worktrees | no (gitignored) |
| `scripts/review-monitor.sh`, `scripts/review-*.sh` | Monitor launcher scripts | planned, not yet in repo |

## .gitignore layout

`.claude/` was previously ignored wholesale, which made it impossible to track shared config (git cannot re-include files under a fully ignored directory). The rule is now `.claude/*` with explicit negations for `settings.json`, `commands/`, `skills/`, and `hooks/`. Credentials, caches, `settings.local.json`, and `worktrees/` remain ignored. `.cursor/*` stays ignored with negations for `agents/` and `rules/`; `review-state/` stays ephemeral.

## Review monitor

The monitor runs from Cursor in parallel with Claude Code sessions and owns per-commit Codex reviews (agent definition: `.cursor/agents/review-monitor.md`). Until the launcher scripts land, start it manually from Cursor. Contract:

- The monitor writes findings to `.cursor/review-state/findings/` and keeps `handoff.md` current.
- Claude Code reads `handoff.md` before committing and does not dispatch duplicate Codex reviews for commits the monitor already covered (see the "Parallel review monitor (Cursor)" section of CLAUDE.md).

## Model routing

| Task shape | Route |
|---|---|
| Session opening, planning, architecture, judgment calls | Fable / Opus (Fable opens) |
| Scoped execution, multi-file edits from an approved plan | Sonnet (Sonnet closes) |
| Mechanical single-file edits, renames, boilerplate | Haiku, or Qwen via `!qwen-exec -y` for local free execution |
| Adversarial review of a completed chunk | Codex via `!codex review` or the dispatch-review command |
| Full-repo or over-window context analysis | Gemini via `!gemini -p` |

Spend discipline: open with the expensive model only to plan, close with the cheaper one to execute; check `ccusage` before long autonomous runs and prefer the local Qwen path for bulk mechanical work. Do not burn orchestrator budget on reviews the monitor already owns.

## Known drift, out of scope for the harness

- `README.md` still references `.eleventy.js` and "Eleventy 2.x" and omits `infra.js`, the infrastructure pages, and `security.yml`. Fix in a content pass, not an agent-config pass.
- `DESIGN.md` section 12 describes a persisted light/dark toggle; the shipped site is dark-only with no runtime toggle (CLAUDE.md "Theme" is authoritative). DESIGN.md documents design intent, so it was left as is.
