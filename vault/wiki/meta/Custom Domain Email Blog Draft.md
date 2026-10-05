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

The article is deliberately excluded through `.eleventyignore`. Remove that entry only when publication is authorized. Its October 5 date is the draft date, not an inferred email timestamp. Sending and delivery are complete according to the user's latest supplied session record; older unsent-draft notes do not supersede that record. No email, account settings, or DNS changes are part of this drafting task.

## Evidence and imagery

- Historical agent roles and audit counts come from the workflow notes and existing posts. Model changes, reviewer contexts, and worktrees remain distinct.
- The supplied screenshots document intermediate errors and verification steps. Final sending and delivery are attributed to the completed session record, with no recipient-header or authentication-alignment claim.
- Official Apple, Gmail, and Porkbun references are linked in the article. Google's third-party Send-As retirement notice is time-qualified; recheck it before publication.
- Cover: Joanna Kosinska, Unsplash photo `LbMy35NyCNg`, image source `photo-1494426383302-7b9d36a1a028`. Attribution appears in the article. Current and historical asset review found no previous use.
- Two private screenshots use flattened, lossless PNGs with solid RGB black replacement pixels over private account addresses, the entire confirmation link, and the partial avatar. Decoded pixels outside the masks match the original screenshots. The exports contain no EXIF, XMP, or IPTC. Original sensitive screenshots and rejected blur attempts are not repository assets.

## Validation

- `npm test`: 137 of 137 pass on the PR branch, including the production build.
- Production output excludes the draft page. A separate local preview includes it for review.
- Desktop 1440 x 1000 and mobile 390 x 844 previews load all five images with no page overflow. Screenshot figures pair on desktop and stack on mobile; full-size links retain the redactions.
- Final redacted repository assets match the verified PNG exports byte for byte. The draft preserves both literal SMTP errors and renders October 5, 2026.

Publication, merging, and any additional mail changes require separate authorization.
