---
type: meta
title: "Hot Cache"
created: 2026-07-14
updated: 2026-10-07
tags: [meta]
status: active
related: ["[[V2 Cleanup and Verification]]", "[[Tech Stack]]", "[[Custom Domain Email Blog Draft]]"]
---

# Recent context

## V2 cleanup

- The local V2 polish retains Eleventy, Tailwind, pinned Vue islands, the site's content/identity, and static FTP deployment. The user subsequently authorized opening and monitoring a PR on `codex/v2-cleanup-polish`; no merge or deployment is authorized.
- PR #136 is open. A thread heartbeat checks every 15 minutes and reports meaningful changes only. At opening head db4ab30, CI/CodeQL/secrets/env checks pass, but npm audit blocks on unchanged dependencies (critical shell-quote, high source-map-js, and an Eleventy dependency-chain finding). No reviews yet. No dependency upgrade is included in the cleanup.
- Shared fixes cover narrow-screen wrapping/headings, keyboard-scrollable tables/code, menu breakpoint/inert recovery, no-JavaScript navigation, skip/filter/back-to-top focus, footer targets, and descriptive infrastructure links. Motion is hero-only; scroll-triggered reveals are disabled. Dark theme is emitted directly in HTML.
- The existing favicon.ico is actually JPEG data; markup now uses profile.jpg with the correct type and retains the SVG. Uncertain assets are preserved. Documentation is reconciled with dark-only WOFF2 implementation.
- Validation: 163 tests, 109 Chrome responsive cases across requested widths with no page-wide overflow, successful keyboard/failure-mode checks, 4,635 exact-case local references resolved, metadata/discovery checks passed. Of 40 external links, 38 return 2xx; LinkedIn 999 and Handshake 403 remain unverified. See [[V2 Cleanup and Verification]] for full file inventory and limits.
- Security contact expires April 29, 2027. `.htaccess` remains undeployed; `_headers` remains inactive on Porkbun. Host-side HTTP behavior is not verified by the static build.

## Draft and dependencies

- Main published the custom-domain-email article in PR #132 after PR #131 merged. The cleanup branch incorporates main at `977828d` and preserves that published state. Exclusion checks tolerate the absent `.eleventyignore`. See [[Custom Domain Email Blog Draft]].
- PR #130 merged dependency consolidation at `eec01f7`. Vitest 5 requires Node 22.12+, 24, or 26+; CI/deploy use Node 22. The narrow owner-approved braces advisory exception remains a risk acceptance, not a fix. Other high/critical findings still block. See [[Tech Stack]].

## Stable context

- `vault/` is the primary repository store. Never edit `.raw/`; preserve historical log entries; review vault changes before committing.
- Phase 4 AD/PXE post from PR #123 is published. Later deployment phases remain outside its completion boundary.
