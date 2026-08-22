---
type: meta
title: "AD PXE Phase 4 Blog PR 123"
created: 2026-08-21
updated: 2026-08-21
tags:
  - blog
  - ad-pxe-lab
  - publication
status: active
related:
  - "[[Template System]]"
sources:
  - "https://github.com/lh1207/ad-pxe-lab/pull/5"
  - "https://github.com/lh1207/levihuff.net/pull/123"
---

# AD PXE Phase 4 Blog PR 123

## Outcome

The site now has a 1,271-word post titled "Building a supported Windows 11 PXE path in my Active Directory lab." It explains the verified Phase 4 boundary of `lh1207/ad-pxe-lab` and clearly leaves Phase 5 and later work pending.

The source implementation is merged in ad-pxe-lab PR #5. The website post is published for review in levihuff.net PR #123 from `codex/ad-pxe-lab-phase-04-post`, commit `de3c7ac`.

## Accuracy boundary

The post is grounded in the merged Phase 4 runbook, final PowerShell transcript, repository vault note, and evidence screenshots. It covers:

- WDS01 as the sole AD-integrated PXE responder
- custom ADK Windows 11 WinPE delivered through WDS
- Windows Setup launched from the read-only `Win11Source` SMB share
- zero WDS install images
- same-subnet DHCP without options 60, 66, or 67
- the UEFI `0xc0000704` recursive-dispatch repair
- CL02 domain membership, Workstations OU placement, secure channel, and domain-user sign-in
- vTPM, Secure Boot, 80 GB disk, and standard `pre-phase-05` checkpoints

Three authentic Phase 4 screenshots are stored under `src/images/blog/`. No generated or stock image is used.

## Verification

- `npm test`: 137 of 137 passed
- `git diff --check`: passed
- rendered desktop page: all images loaded, no horizontal overflow, and no browser console warnings or errors
- GitHub Actions CI and security workflows: passed on PR #123
