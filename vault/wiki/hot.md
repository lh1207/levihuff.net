---
type: meta
title: "Hot Cache"
created: 2026-07-14
updated: 2026-10-08
tags: [meta]
status: active
related: ["[[AeroAssist Website Case Study]]", "[[V2 Cleanup and Verification]]", "[[Tech Stack]]"]
---

# Recent context

## AeroAssist PR #135

- Website-only changes remain open on `codex/aeroassist-portfolio-case-study`. The owner authorizes resolving its conflict with main and pushing the branch, not merging the PR or deploying. AeroAssist and other source-project repositories remain unchanged.
- Main at `49df940` is merged into the PR branch for reconciliation. Only hot context, index, and log conflicted; both histories, the AeroAssist case study, and main's V2 fixes are preserved. Clean install, 175 tests, zero-vulnerability audit, and 194 registry signatures pass.
- The card links to the existing revised article. Source-verified commits support UI, persistence, charts, and Docker work; unsupported feature claims are removed. Historical screenshots match repository assets. Static and Vue cards contain screenshots and open internal links in the same tab.
- Application execution remains unverified: no .NET SDK or running Docker daemon was available. See [[AeroAssist Website Case Study]].
- The ten-minute heartbeat reports meaningful CI/review/conflict/state changes and pauses after merge/closure. It has no merge authorization.

## V2 cleanup and dependencies

- Main includes V2 cleanup via PR #136 and security work via PR #137. Shared fixes cover narrow-screen wrapping, keyboard-scrollable tables/code, mobile navigation recovery and static fallback, focus handling, footer targets, and descriptive infrastructure links. Dark theme is rendered directly; Motion is hero-only.
- Original V2 evidence: 175 passing tests, 109 responsive cases without page overflow, and 4,635 exact-case local references resolved. Of 40 external URLs, 38 respond successfully; LinkedIn/Handshake block automation. See [[V2 Cleanup and Verification]].
- Current dependencies: Eleventy 4.0.0-alpha.10, maintained 11ty gray-matter alias, Parcel watcher 2.6.0, RSS 3.1.0, Vitest 5.0.3, and Vue 3.5.43. Node satisfies `^22.15.0 || ^24.0.0 || >=26.0.0`.
- Every advisory severity blocks; the braces exception is removed. Browser Vue/Motion pins participate in audit and CDN/manifest/lock agreement tests. Registry signatures are verified.
- Keep the exact required `npm audit (high+)` job name despite its stricter behavior. See [[Tech Stack]] and [[Deploy Pipeline]].

## Stable context

- PRs #131/#132 publish the custom-domain-email article; no exclusion remains. Screenshots use flattened solid redactions.
- Security contact expires April 29, 2027. `.htaccess` stays undeployed and `_headers` inactive on Porkbun.
- This vault owns repository knowledge; personal/cross-project knowledge belongs in the global vault. Never edit `.raw/`; preserve old log entries.
- Phase 4 AD/PXE from PR #123 is published; later deployment phases remain outside its completion boundary.
