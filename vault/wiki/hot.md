---
type: meta
title: "Hot Cache"
created: 2026-07-14
updated: 2026-10-08
tags: [meta]
status: active
related: ["[[V2 Cleanup and Verification]]", "[[Tech Stack]]", "[[Deploy Pipeline]]"]
---

# Recent context

## V2 cleanup and reconciliation

- PR #136 remains the V2 cleanup on `codex/v2-cleanup-polish`. Its latest remote head before reconciliation is `7204c58`. The user authorizes resolving conflicts and updating this branch, not merging the PR into main or deploying.
- Main merges the security work through PR #137 at `c4f4d34`. The cleanup branch already carries the same security/runtime changes. Merging main produces conflicts only in this hot note and the append-only log; preserve both histories and the existing V2 polish.
- Reconciliation validation: clean installation, all 175 tests including production build, and zero known vulnerabilities in the audit. Runtime/security code remains unchanged by the merge.
- Shared V2 fixes include narrow-screen headings/wrapping, keyboard-scrollable tables/code, mobile menu breakpoint recovery and no-JavaScript fallback, skip/filter/back-to-top focus, footer targets, and descriptive infrastructure links. Dark theme is rendered directly; Motion is hero-only.
- Original cleanup evidence: 109 Chrome responsive cases without page-wide overflow and 4,635 exact-case local references resolved. Of 40 external URLs, 38 respond successfully; LinkedIn/Handshake block automation. See [[V2 Cleanup and Verification]] for scope and limits.
- The 15-minute PR monitor reports meaningful changes to checks, reviews, conflicts, or state. It does not merge, deploy, or post comments.

## Current dependency and hosting policy

- Main now uses Eleventy 4.0.0-alpha.10, the maintained 11ty gray-matter alias, Parcel watcher 2.6.0, RSS 3.1.0, Vitest 5.0.3, and Vue 3.5.43. Node must satisfy `^22.15.0 || ^24.0.0 || >=26.0.0`. See [[Tech Stack]].
- Every advisory severity blocks; the old braces exception is removed. Browser Vue/Motion pins participate in package audit and CDN/manifest/lock agreement tests. Registry signatures are verified.
- The main ruleset still requires the exact `npm audit (high+)` job name despite its stricter all-severity behavior. Retain that label. See [[Deploy Pipeline]].
- Security contact expires April 29, 2027. `.htaccess` stays undeployed and `_headers` inactive on Porkbun; static files cannot enforce those HTTP directives.

## Stable context

- PRs #131/#132 publish the custom-domain-email article; no exclusion remains. Its supplied screenshots use flattened solid redactions, and original sensitive images are not repository assets. See [[Custom Domain Email Blog Draft]].
- `vault/` owns repository knowledge. Never edit `.raw/`; preserve historical log entries. Personal/cross-project knowledge belongs in the separate global vault.
- Phase 4 AD/PXE from PR #123 is published; later deployment phases remain outside its completion boundary.
