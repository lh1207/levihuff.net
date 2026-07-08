---
description: Run the full test suite and summarize any failures
allowed-tools: Bash(npm test), Bash(npm test:*), Read, Grep
---

Run `npm test` (the full Vitest suite; `test/build.test.js` runs `npm run build` in `beforeAll` and can take up to 2 minutes — do not interrupt it).

Then report:

1. Pass/fail per test file (`filters`, `data`, `blog`, `build`) — the four-file suite is documented in the "Test suite" section of CLAUDE.md.
2. For each failure, the failing assertion and the most likely cause, mapped to the layer it guards: `filters.test.js` → `src/filters.js`, `data.test.js` → `src/_data/*.json` or `infra.js` schema (including the em-dash ban), `blog.test.js` → blog frontmatter or a missing thumbnail file, `build.test.js` → broken build, broken internal link, missing `alt`, or missing passthrough artifact.
3. The single next action that would fix the highest-impact failure.

If everything passes, say so in one line with the test and file counts. Do not fix anything as part of this command; it is a verification pass only.
