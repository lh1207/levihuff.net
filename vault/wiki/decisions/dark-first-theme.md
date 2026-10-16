---
type: decision
title: "Dark First Theme"
status: active
date: 2026-07-14
tags:
  - decision
created: 2026-07-14
updated: 2026-07-14
related:
  - "[[Template System]]"
sources: []
---

# Dark First Theme

## Context

`base.njk` sets `data-theme="dark"` on `<html>` via an inline `<script>` that runs before first paint, and there is no runtime toggle exposed to visitors.

## Decision

Dark is the only active theme. `[data-theme="light"]` CSS rules exist in `tailwind.css` and `tailwind.config.js` but are unused - reserved for future opt-in support, not dead code to clean up.

## Why (the tradeoff)

Setting the theme attribute inline (not via a stylesheet default or a post-load JS toggle) avoids a flash of the wrong theme on first paint. Committing to dark-only (rather than shipping a half-built toggle) keeps the design system simple and matches `DESIGN.md`'s single-accent-color philosophy.

## Alternatives considered

- Runtime toggle with `localStorage` persistence - deferred, not rejected outright; the light-theme CSS rules are left in place specifically so this can be added later without a rewrite.
- OS-preference-based (`prefers-color-scheme`) auto-switching - rejected for now to keep the visual identity consistent regardless of visitor system settings.

## Consequences

- Don't delete the `[data-theme="light"]` rules; they're intentionally dormant, not orphaned.
- Any future toggle work should reuse those rules rather than redesigning a light theme from scratch.
