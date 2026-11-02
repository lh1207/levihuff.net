# Phase 05 blog draft: provenance and publication boundary

The writing session retrieved and inspected the Phase 05 sources in `lh1207/ad-pxe-lab` through the GitHub connector at commit `cbcac0a9b9b658a04c232c6ad4e0ee6c159c92e1`; that source checkout is not this site workspace. The records are `runbooks/05-gpo-suite.md`, `docs/phase-05-configuration-verification.txt`, `docs/evidence/phase-05/README.md`, and `docs/evidence/phase-05/hr-user-verification.txt`. The writing session also read `vault/wiki/decisions/publication-boundary.md` and visually inspected the five selected PNGs.

The five selected images are the curated Workstations link, HR drive-map properties, HR targeting, CL02 logon banner, and final gate/checkpoints: `ad-pxe-phase-05-gpmc-workstations-link.png`, `ad-pxe-phase-05-hr-drive-map-properties.png`, `ad-pxe-phase-05-hr-drive-map-targeting.png`, `ad-pxe-phase-05-cl02-logon-banner.png`, and `ad-pxe-phase-05-final-gate-and-checkpoints.png`. The original wrong-policy GPMC screenshot was not available and has not been recreated.

The technical account keeps domain password controls in Default Domain Policy and attributes the documented placement mistake to workstation Security Options being edited there instead of in `GPO-C-Workstation-Baseline`, linked to Workstations. The recorded final gate and checkpoints establish configuration and checkpoint results. Physical USB denial and timed 900-second inactivity behavior were not exercised; the post must describe those settings as configured and verified, with the behavior tests untested. The HR transcript records the normal-user `hr.jones` session, H: mapping, share access, and applied drive-map GPO.

The publication boundary allows curated screenshots and concise assertion transcripts. Keep raw session directories, full `gpresult` XML, GPMC HTML/XML exports, backups and manifests, recovery material, credential/receipt JSON, and other raw private exports local. The five selected images are the curated assets for this draft; do not add raw exports or sensitive recovery material.

The article received two editing passes: Luna high tightened the first-person narration and flow; a second pass checked technical precision, repetition, evidence boundaries, and the updated review account. PR #6 was refreshed at `8f5b9bab0b4bbce279b099ab0d856eb09af5de61`. The fix commit and its recorded static validation were read: current GPO identifiers now flow from the validated inventory, and the prerequisite helper creates its session directory before logging. The recorded follow-up checks did not repeat the live finalizer/checkpoint creation. Before creating the website PR, the lab PR was checked again: both review threads were resolved and PR #6 was merged on October 28, 2026, at merge commit `0c209cacaf591f268b4f2cff7650e8f7c29a9203`. No original wrong-policy image is available for publication.

This file records provenance and boundaries for the website pull request. The source lab repository was only read. Website merge and deployment are outside this request.

## Unsplash illustrations

Two free photos were selected from their Unsplash source pages and embedded with visible photographer, photo-page, and license links:

- Kevin Canlas, [dark desk setup](https://unsplash.com/photos/ia7-T2bjDb4), as the opening illustration. Image asset: `https://images.unsplash.com/photo-1642697283420-194938fcc339`.
- Albert Stoynov, [networking equipment with Ethernet cables](https://unsplash.com/photos/dyUp7WPu5q4), before the final-verification section. Image asset: `https://images.unsplash.com/photo-1691435828932-911a7801adfb`.

Both are explicitly captioned as illustrative and are separate from the five lab screenshots. Each requests a 1600 by 900 crop and includes dimensions and alt text. The second is lazy-loaded. The existing local lab-banner thumbnail is retained. Unsplash downloads are blocked by this workspace's network policy, so the new photos use the source CDN URLs; their loading in a browser has not been verified here. The site tests check the generated markup, not availability of these external images.
