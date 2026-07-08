---
description: Dispatch an adversarial Codex review of current work (branch diff or uncommitted changes)
argument-hint: [branch | uncommitted]
---

Dispatch an adversarial review for: $ARGUMENTS

1. First check `.cursor/review-state/handoff.md`. If the parallel review monitor is active and has already reviewed the commits in question (compare `last-seen-sha` and `findings/`), do not duplicate its review — read its findings instead and report the open items. See the "Parallel review monitor (Cursor)" section of CLAUDE.md.
2. Decide scope from the argument (default: uncommitted if the working tree is dirty, otherwise branch):
   - Uncommitted changes: run `codex review` in the repo root.
   - Branch diff: run `codex exec "review the diff against main and report bugs"`.
3. Relay the findings ranked by severity. For each, state whether you agree, and check claims against the contracts in CLAUDE.md before accepting them: data schemas in `test/data.test.js`, blog frontmatter conventions, the design rules (no emoji, no italics, amber-only accent), and the deploy concurrency guard.
4. Apply only fixes that are clearly correct and in scope; list everything else as open items. The orchestrator owns final correctness (global workflow: Plan, Execute, Review).
5. Finish with `npm test` if any fix was applied.
