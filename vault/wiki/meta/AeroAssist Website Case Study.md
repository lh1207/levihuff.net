---
type: meta
title: "AeroAssist Website Case Study"
created: 2026-10-07
updated: 2026-10-07
tags: [portfolio, source-review, aeroassist]
status: ready-for-review
related: ["[[Data Layer]]", "[[Template System]]"]
---

# AeroAssist website case study

## Scope and decision

The owner limits this task to levihuff.net. AeroAssist and the other project repositories are evidence sources and remain unchanged. No source-project README or application code is modified. Website changes are proposed in [PR #135](https://github.com/lh1207/levihuff.net/pull/135), on `codex/aeroassist-portfolio-case-study`; they are not merged or deployed.

The owner requests a PR and monitoring. The branch is rebased onto main at `977828d`, preserving the email article publication correction and both vault histories. All 159 tests pass after rebase. The active heartbeat `monitor-aeroassist-website-pr` checks CI, reviews, conflicts, and terminal status every ten minutes. It stays quiet for unchanged/non-actionable states, reports actionable changes or all-checks-passing, and pauses after reporting merge/closure. It has no merge authorization.

AeroAssist is selected after comparing its README and contributors with LocoQuest and the Culinary Mastery team repository. AeroAssist has usable repository screenshots and a straightforward UI/API/database story; the website previously overclaimed automation, role administration, notifications, audit history, and tests. Correcting these claims gives this website entry a clear benefit.

## Source evidence

- GitHub identity: `lh1207`; AeroAssist master at `dff52cbc726f252fc47e9de10b5586982a7c66e7`.
- All 103 recorded commits use the owner's GitHub noreply identity under three display names. This establishes recorded authorship, not a claim about undocumented collaboration.
- `b75a613`: Razor/JavaScript CRUD interface; `c9f7822`: early SQLite persistence and EF migration; `d79bbda`: charts and shared form JavaScript; PR #37: Docker support.
- Current architecture: Razor Pages/page-model HTTP calls, TicketController, TicketService, AeroAssistContext, SQL Server. Chart.js calls the API from the browser; Identity shares the EF context.
- Website `app.jpg`, `features.jpg`, and `swagger.jpg` match the repository asset hashes. The queue and overview screenshots are historical assets, not a new successful run.

## Website changes

The existing AeroAssist article becomes a recruiter case study with summary, stack, contribution links, a component flow, real images, setup context, and explicit limitations. The Docker article becomes a focused configuration reference; invented examples, incorrect option names, and unsupported homelab claims are removed. Existing article URLs remain stable.

The project card links internally to the case study and uses the actual ticket-queue screenshot. Static Nunjucks cards and the Vue island both retain full screenshots with `imageClass: screenshot`; internal project links stay in the same tab. The data schema and CLAUDE.md document the added image class.

## Validation and limitations

All 159 tests pass, including the production build and internal-link checks. Browser checks cover the Software filter, same-tab case-study navigation, article anchors, desktop layout, a 390-pixel mobile viewport without horizontal overflow, and loading of both historical screenshots. Independent source review confirms contribution claims. A targeted credential pattern check reports no obvious token/private key/non-placeholder secret; this is not an exhaustive security audit.

The application is not executed: no .NET SDK is available and the Docker daemon is stopped. Browser chart scripts hardcode localhost; app health checks require curl without installing it; Compose contains demo database-password defaults and certificate bypass configuration. No test project is committed. Future work is deployment-independent chart URLs and fresh-run validation, CRUD tests, and authorization/deployment hardening.
