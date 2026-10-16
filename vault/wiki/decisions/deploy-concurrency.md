---
type: decision
title: "Deploy Concurrency Queue"
status: active
date: 2026-07-14
tags:
  - decision
created: 2026-07-14
updated: 2026-07-14
related:
  - "[[Deploy Pipeline]]"
sources: []
---

# Deploy Concurrency Queue

## Context

`.github/workflows/deploy.yml` runs on every push to `main` and FTP-deploys `_site/` to Porkbun static hosting. FTP has no atomic multi-file commit - uploads happen file by file.

## Decision

The workflow sets `concurrency: { group: ftp-deploy, cancel-in-progress: false }`. Concurrent pushes to `main` queue and run one at a time, in order, rather than executing in parallel.

## Why (the tradeoff)

Two deploys racing against the same FTP target could interleave uploads - one deploy's HTML could ship alongside another deploy's half-uploaded CSS, producing a broken live site mid-deploy. Queuing (not canceling) trades deploy latency for correctness: a rapid sequence of pushes deploys slower (each waits its turn) but never corrupts the live host.

## Alternatives considered

- `cancel-in-progress: true` - rejected. Canceling an in-flight FTP upload mid-transfer is exactly the interleaving risk this exists to prevent, just via abort instead of race.
- Switching hosting to something with atomic deploys (e.g. an object store with atomic swap) - out of scope; Porkbun static hosting is the current host.

## Consequences

- Don't remove or loosen the `concurrency` block - see the explicit warning in the parent repo's `CLAUDE.md`.
- A burst of pushes to `main` will visibly serialize in the Actions tab; that's expected, not a bug.
