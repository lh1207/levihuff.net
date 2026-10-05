---
type: meta
title: "Custom Domain Email Blog Draft"
created: 2026-10-05
updated: 2026-10-05
tags: [blog, email, verification]
status: draft
related: ["Build Pipeline"]
---

# Custom domain email blog draft

`src/blog/replying-from-my-own-domain.md` connects agent verification with completing iCloud Custom Email Domain and Gmail Send-As. The branch is `blog/replying-from-my-own-domain`, based on main at `406daf7`.

## Publication boundary

PR #131 is merged. The corrective branch removes the mistaken `.eleventyignore` exclusion so normal builds include the article, blog listing, tags, and feeds. A draft PR should have provided the review boundary without suppressing the content in the eventual build. Its October 5 date is the article date, not an inferred email timestamp. Sending and delivery are complete according to the user's latest supplied session record; older unsent-draft notes do not supersede that record. No email, account settings, or DNS changes are part of this task.

## Evidence and imagery

- Historical agent roles and audit counts come from the workflow notes and existing posts. Model changes, reviewer contexts, and worktrees remain distinct.
- The supplied screenshots document intermediate errors and verification steps. Final sending and delivery are attributed to the completed session record, with no recipient-header or authentication-alignment claim.
- Official Apple, Gmail, and Porkbun references are linked in the article. Google's third-party Send-As retirement notice is time-qualified; recheck it before publication.
- Cover: Joanna Kosinska, Unsplash photo `LbMy35NyCNg`, image source `photo-1494426383302-7b9d36a1a028`. Attribution appears in the article. Current and historical asset review found no previous use.
- Two private screenshots use flattened, lossless PNGs with solid RGB black replacement pixels over private account addresses, the entire confirmation link, and the partial avatar. Decoded pixels outside the masks match the original screenshots. The exports contain no EXIF, XMP, or IPTC. Original sensitive screenshots and rejected blur attempts are not repository assets.

## Validation

- `npm test`: 137 of 137 pass on the PR branch, including the production build.
- Initial validation used a separate preview because of the mistaken exclusion. The correction validates the normal production output and blog listing directly.
- Correction validation: all 159 tests pass. Explicit build-output checks confirm the article, blog listing, email tag page, feed, and sitemap. The local server returns HTTP 200; the browser connection to localhost times out, so no new visual-check claim is made.
- Desktop 1440 x 1000 and mobile 390 x 844 previews load all five images with no page overflow. Screenshot figures pair on desktop and stack on mobile; full-size links retain the redactions.
- Final redacted repository assets match the verified PNG exports byte for byte. The draft preserves both literal SMTP errors and renders October 5, 2026.

Publication, merging, and any additional mail changes require separate authorization.

## PR #131 conflict resolution

PR #131 incorporates main at `eec01f7` after dependency PR #130 merged. The only conflicts are the shared hot cache and append-only log. Both branches' historical log entries are preserved, while the hot cache combines the unpublished article context with the current dependency and narrow audit-exception policy. Article text, assets, and `.eleventyignore` are unchanged. A clean dependency install and all 159 tests pass on the merged tree.
