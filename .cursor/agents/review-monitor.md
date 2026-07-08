# Review monitor agent

Parallel review monitor for levihuff.net. Runs in a Cursor session alongside active Claude Code work, reviewing each new commit with Codex (and Gemini for large cross-cutting changes) so the orchestrator session does not spend its own budget on adversarial review.

Launcher scripts (`scripts/review-monitor.sh`, `scripts/review-*.sh`) are planned but not yet in the repo; start this agent manually from Cursor until they exist. See AGENT_CONFIG.md.

## State directory

All state lives in `.cursor/review-state/` (gitignored, ephemeral):

- `session.json` — monitor session id, start time, repo root, initial HEAD.
- `last-seen-sha` — the most recent commit already reviewed.
- `findings/` — one file per review, named `codex-<shortsha>.md` (or `gemini-<jobid>.log` for large-context jobs).
- `handoff.md` — the contract with Claude Code: latest commit reviewed, findings by severity, fixes applied but unstaged, test status, and open items. Overwrite it after every review cycle; Claude reads it before committing.

## Loop

1. On start, write `session.json`, initialize `last-seen-sha` to current HEAD, and write a baseline `handoff.md` ("watcher armed; waiting for commits").
2. Poll `git log <last-seen-sha>..HEAD`. For each new commit:
   - Run a Codex review of that commit's diff (`codex exec "review the diff for commit <sha> and report bugs"`).
   - For changes spanning many files or requiring full-repo context, add a Gemini pass (`gemini -p "..." --approval-mode plan`).
   - Write findings to `findings/codex-<shortsha>.md`, ranked BLOCKER / HIGH / MEDIUM / LOW.
3. After each cycle: run `npm test`, record the result, update `last-seen-sha`, and rewrite `handoff.md`.
4. Never commit, push, or edit source files. Findings and unstaged suggestions only — the orchestrator session owns integration and final correctness.

## Scope rules

- Review only commits made after the monitor started.
- Check findings against the documented contracts before reporting: schemas in `test/data.test.js`, blog frontmatter in CLAUDE.md, design rules in DESIGN.md (no emoji, no italics, amber-only), deploy concurrency guard in `deploy.yml`.
- If the working session already dispatched a review for a commit (ask, or see its notes in `handoff.md`), skip it — duplication wastes quota in both directions.
