---
type: flow
title: "Deploy Pipeline"
status: active
tags:
  - flow
created: 2026-07-14
updated: 2026-07-14
related:
  - "[[Build Pipeline]]"
  - "[[Deploy Concurrency Queue]]"
sources: []
---

# Deploy Pipeline

## Trigger

Push to `main`. Handled by `.github/workflows/deploy.yml`.

## Steps

1. Checkout, install dependencies.
2. Run `npm test` (Vitest suite) - deploy does not proceed if tests fail.
3. Run `npm run build` - see [[Build Pipeline]].
4. FTP-deploy `_site/` to the Porkbun-hosted live server.

A separate `ci.yml` workflow runs the test suite on all PRs and non-`main` pushes, so failures surface before merge, not just before deploy. A third workflow, `security.yml`, runs gitleaks over full history, blocks tracked `.env` files, and fails on high/critical `npm audit` advisories - independent of the deploy trigger.

## Failure modes

- Concurrent pushes to `main` do not run in parallel: see [[Deploy Concurrency Queue]]. They queue and deploy in order instead of racing over FTP.
- A failing test blocks the deploy at step 2 - the live site is never updated with untested code.
- `security.yml` failures (leaked secret, tracked `.env`, critical audit finding) are a separate gate, not blocking `main` merges by design, but should be treated as urgent.

## Related flows

- [[Build Pipeline]] - the build this pipeline wraps
