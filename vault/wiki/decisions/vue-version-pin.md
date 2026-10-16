---
type: decision
title: "Vue Version Pin"
status: active
date: 2026-07-14
tags:
  - decision
created: 2026-07-14
updated: 2026-10-07
related:
  - "[[Template System]]"
  - "[[Tech Stack]]"
sources: []
---

# Vue Version Pin

## Context

`src/projects.njk` and `src/blog/index.njk` load Vue 3 as an inline ES module: `import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3.5.43/dist/vue.esm-browser.prod.js'`.

## Decision

The version is pinned to the exact `3.5.43`, never a floating range like `vue@3` or `vue@^3.5`. Exact Vue and Motion pins also appear in devDependencies so npm audit covers their package trees. Tests enforce matching CDN URLs and lockfile resolutions.

## Why (the tradeoff)

Subresource Integrity (SRI) hashes cannot be attached to the static imports inside these inline module scripts the way they can to a `<script src>` tag, so there is no cryptographic guard against the CDN serving a tampered or different file. The exact version pin is the substitute supply-chain guard: a floating range could silently serve a different (and potentially compromised, or simply breaking) build on a future CDN fetch with no corresponding commit in this repo.

## Alternatives considered

- Floating `vue@3` - rejected: defeats the purpose of the pin, reintroduces the exact risk this guards against.
- Self-hosting the Vue bundle instead of CDN - not adopted; out of scope for the current two small islands.

## Consequences

- When upgrading Vue, bump both URLs and the manifest pin together, refresh the lockfile, and run `npm test` and `npm run audit:ci`.
- Don't let this pin drift out of sync between the two files - a mismatch would load two different Vue builds on different pages.
