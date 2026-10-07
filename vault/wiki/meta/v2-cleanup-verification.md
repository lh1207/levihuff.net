---
type: meta
title: "V2 Cleanup and Verification"
created: 2026-10-07
updated: 2026-10-07
tags: [website, accessibility, responsive, verification]
status: active
related: ["[[Template System]]", "[[CSS Pipeline]]", "[[Eleventy Config]]", "[[Custom Domain Email Blog Draft]]"]
---

# V2 Cleanup and Verification

## Scope and structure

PR preparation follow-up: the user authorizes committing, pushing a feature branch, opening a PR, and monitoring checks/reviews. The branch is `codex/v2-cleanup-polish`. Main advances to `977828d` through PR #132, which publishes the custom-domain-email article; the cleanup incorporates this existing upstream change rather than restoring the stale exclusion. The exclusion regression accepts an absent `.eleventyignore`. The audit measurements below describe the original pre-integration build; the full suite is rerun after integration. Merging and deployment remain outside authorization.

The V2 cleanup preserves the dark charcoal and amber identity, typography, photography, biography, data, and static deployment. Eleventy generates 121 HTML pages plus discovery/feed files. Shared base/post layouts and component partials render pages from structured data. Tailwind 4 builds the stylesheet. Projects and Blog retain pinned Vue 3.5.34 filters with static fallbacks. Motion 10.18.0 remains a small hero enhancement. No dependencies, build tools, workflows, drafts, or deployment settings change. No commit, push, or deployment is part of this pass.

The initial audit precedes implementation. Baseline build and 159 tests pass, but browser checks reproduce 320px overflow in the Infrastructure heading and a long inline code path. Opening the mobile drawer and resizing to desktop leaves main/footer inert. Mobile navigation is unavailable without JavaScript. Blog filter selection hides the focused control. Markdown tables lack horizontal containment. The favicon.ico file contains JPEG data identical to profile.jpg.

## Changes and rationale

- Mobile navigation resets inert/focus state at 801px, has scroll containment for short screens, uses 44px link targets, and supplies visible no-JavaScript navigation. Its nonfunctional toggle stays hidden until the local enhancement runs.
- The skip link has a focusable main destination. Back-to-top transfers focus before its button hides. Closing the blog tag chooser returns keyboard focus to its trigger.
- Shared content wrapping and fluid 32px to 44px headings eliminate narrow-screen overflow. Project detail labels stack inside narrow cards; post navigation can wrap. Markdown tables keep native table semantics inside named, keyboard-reachable scroll regions. Code blocks are keyboard-scrollable.
- Footer icon links have 44px targets. Short pages keep the footer at the bottom. Infrastructure detail links name their destination for assistive technology. Markdown emphasis follows the no-italics design rule.
- Dark theme is emitted in HTML and theme-color matches the canvas. Favicon markup uses the existing JPEG with its correct media type; the SVG and touch icon remain. The mislabeled legacy .ico file is retained without a markup reference.
- Scroll-triggered opacity reveals are removed to match DESIGN.md. Hero content stays visible, reduced-motion preferences are checked around the import, and CDN failure is caught. Blog logo thumbnails use one appropriate fit mode.
- Output tests cover local fragments, CSS assets, sharing-image URLs and actual dimensions, security.txt contact/expiry/canonical, inactive .htaccess, and drafts derived from .eleventyignore.

## Validation

- `npm test`: 163 tests in five suites pass, including the production build smoke test. Baseline had 159 tests. Existing Vite native-config warning remains informational.
- Local installed Chrome, headless: 13 representative routes at 320, 375, 430, 768, 1024, and 1440 pixels, 900px high. Routes: Home, About, Projects, Infrastructure hub, Windows imaging infrastructure detail, Blog index, Windows 11 PXE post, owning-my-ai-memory post, tag index, AI tag page, Contact, Resume redirect, and 404.
- Another 31 post/infrastructure routes run at 320px: 109 total responsive cases with zero page-wide overflow. Resume navigates to About as intended. No missing completed images are observed in the representative matrix.
- Visual review samples include mobile Home, About, Infrastructure, Projects, Tags, wrapped inline code, tablet Blog, desktop Contact and 404, and full-page desktop Projects. Measurement of all matrix cases does not imply manual visual inspection of every screenshot.
- Keyboard checks pass: skip link focus, menu opening/first link, Tab/Shift+Tab cycle, Escape, desktop breakpoint reset, last menu link reachable at 375x320, project category selection, blog tag selection/focus return, and back-to-top focus/scrolling. Tests wait for asynchronous breakpoint and smooth-scroll completion rather than fixed timing.
- No-JavaScript and blocked-jsDelivr checks on Home, Projects, and Blog retain navigation/content/static cards. Reduced-motion checks show no active animations. Normal-flow browser checks report zero page script errors.
- Generated HTML: 4,635 local href/src references checked against an exact-case file inventory; zero missing or case-mismatched paths. All local fragments resolve. CSS fonts and metadata assets resolve. Sharing dimensions match source files. JSON-LD parses. Atom and sitemap XML parse.
- Core foreground/accent token contrast on the three main dark surfaces ranges from 4.80:1 to 15.43:1. This is a token calculation, not a complete WCAG audit.
- External URL sample: all 40 unique outbound HTTP(S) hrefs found in generated HTML are checked with redirects. 38 return 2xx, Handshake returns 403, LinkedIn returns 999. These two are blocked/access-controlled checks, not confirmed dead links. No 404, 410, timeout, or transport failure occurs.
- Independent review finds no blocking regression. Diff review confirms no content-data, dependency, workflow, or draft changes. Original untouched line endings are preserved to keep the patch readable.

## Files changed

| File | Purpose |
|---|---|
| `AGENTS.md` | Correct theme and data-test documentation |
| `CLAUDE.md` | Document current theme, animation, navigation, and scroll behavior |
| `DESIGN.md` | Reconcile runtime theme, font format, heading sizing, and punctuation guidance |
| `eleventy.config.cjs` | Semantic Markdown table scroll wrappers and keyboard code access |
| `tailwind.config.js` | Fluid narrow-screen h1 size |
| `src/.htaccess` | Correct config filename in undeployed reference comment |
| `src/_layouts/base.njk` | Shared metadata, navigation focus, skip target, back-to-top, and restrained Motion |
| `src/_layouts/post.njk` | Wrapping post navigation |
| `src/_includes/css/tailwind.css` | Shared wrapping, sticky-header offsets, scroll regions, emphasis and footer placement |
| `src/_includes/components/nav.njk` | No-JavaScript fallback, short-screen drawer, and touch targets |
| `src/_includes/components/footer.njk` | Larger icon targets and balanced spacing |
| `src/_includes/components/infra-card.njk` | Descriptive detail-link names |
| `src/_includes/components/project-card.njk` | Readable stacked detail labels in static cards |
| `src/projects.njk` | Matching detail layout in Vue cards |
| `src/blog/index.njk` | Filter focus return and correct logo image fit |
| `test/build.test.js` | Four generated-output regression checks |
| `vault/wiki/modules/templates.md` | Durable shared interaction and fallback behavior |
| `vault/wiki/modules/css-pipeline.md` | Durable responsive and scrolling decisions |
| `vault/wiki/modules/eleventy-config.md` | Durable rendering/transform behavior |
| `vault/wiki/meta/v2-cleanup-verification.md` | This audit, file inventory, results, and deployment handoff |
| `vault/wiki/index.md` | Catalog updates |
| `vault/wiki/log.md` | New append-only operation entry |
| `vault/wiki/hot.md` | Refreshed warm context |

The pre-existing untracked `.codex/` directory is not task output and remains untouched. `_site/` is generated build output, not a source change. Temporary scripts/results/screenshots are under `/tmp/levihuff-*` and `/tmp/detail-*`; they are not required for deployment.

## Findings retained or deferred

- DESIGN.md formerly described TTFs, theme persistence, and em dashes; implementation uses local WOFF2, dark-only behavior, and a template/infra em-dash ban. AGENTS/CLAUDE also incorrectly claimed light CSS existed. Documentation now follows implementation. Light palette/skeleton remain explicitly future reference material.
- Eight apparently unreferenced images remain because their purpose is uncertain: `about/band-night.jpg`, `about/workflow-documentation.jpg`, `aeroassist/docker-logo.png`, `projects/computer-hardware.jpg`, `projects/it-equipment.jpg`, `projects/it-provisioning.jpg`, `projects/student-app.jpg`, and `projects/workflow-docs.jpg`. All are under `src/images/`.
- Legacy section/stagger data-motion attributes are inert. They do not hide content or trigger downloads. Removing them across otherwise unchanged templates is unnecessary for this focused pass.
- No WebFinger exists, and none is created. `/.well-known/security.txt` uses `contact@levihuff.net`, its correct HTTPS canonical, and expiry `2027-04-29T00:00:00.000Z`. Renew before that date; the test intentionally fails when it expires.
- The original audit preserves the then-excluded custom-domain-email article. During PR preparation, current main is found to have published it in PR #132. The integrated branch preserves main's publication state; it does not introduce another publication change.
- Existing JetBrains Mono face is declared at weight 400. No font replacement, asset pruning, biography correction, dependency upgrade, or optional feature is introduced.
- No physical phone, Safari/Firefox, screen reader, exhaustive computed contrast scan, PDF content audit, production response headers, host 404 routing, or FTP upload is tested. External links can change after this check. Local `/404.html` rendering is verified; unknown-route hosting behavior is separate.

## Deployment handoff

Use the existing supported Node setup (CI uses Node 22), `npm ci`, `npm test`, and `npm run build`. Upload the contents of `_site/` using the existing FTP process, preserving `/.well-known/security.txt` and all asset directories. The unchanged main workflow already runs tests/build before FTP and serializes deployments. This task leaves local production output ready for review; it does not push or deploy.

`src/.htaccess` stays undeployed because Porkbun rejects it. `_headers` is copied but inactive on the current host. Neither file proves any HTTP directive is enforced. HTTPS redirects, HSTS, response security headers, cache policy, and custom 404 routing require host-side verification/configuration outside this static cleanup.

## Suggested V3 ideas

1. Repeat the keyboard and zoom checks on physical mobile devices and Safari/Firefox, including a screen-reader pass.
2. Consolidate duplicated static/Vue card markup if maintenance drift becomes a recurring problem.
3. Confirm ownership of unused images and replace the legacy mislabeled icon with a dedicated favicon/touch-icon export before pruning assets.
