# Career positioning and evidence policy

The site leads with help desk, desktop support and IT support. Washington Court House is the home base; local roles come first, Columbus is the preferred out-of-town market, and remote roles are acceptable.

## Content structure

- Homepage: IT graduate, recent Kroger customer service, earlier IT support, degree and Network+ study, then selected personal labs.
- About: experience, grouped skills, degree and current learning.
- Projects: evidence-linked personal lab/configuration work and software contributions. Academic team work is labeled.
- Labs: only repository-supported personal lab artifacts and configuration. Retired infrastructure entries redirect to current pages.
- Contact: email and job-search preferences.
- Downloadable PDF: generated from audited career data with `python3 scripts/build-resume.py` (requires reportlab).

## Sources of truth

`src/_data/career.json` holds the career summary, degree, current learning and location preferences. `experience.json`, `skills.json`, `projects.json` and `infra.js` keep claims scoped to their evidence.

The current certification target is CompTIA Network+, explicitly described as study. Earned credentials require supporting artifacts before publication. Do not add unverified graduation dates, GPA, metrics, employer scale, security guarantees or production ownership. A configuration file proves a configuration exists, not live uptime. A team project does not establish sole authorship.

See [the credibility audit](docs/credibility-audit-2026-10-14.md) for original claims, source limitations and exact decisions. Historical examples in that audit are not approved site copy.

## Validation

Run `npm test` and `npm run build`. This checkout currently has no lint script. Check generated content, PDF text/layout, internal links and anchors, external evidence URLs, mobile navigation, keyboard focus, and metadata. Preserve the unpublished email draft exclusion in `.eleventyignore`.

## Roadmap

Reviewed against `origin/main` at `6fa02d9` on November 2, 2026.

### Delivered

- Data-driven lab cards, infrastructure hub and per-entry detail pages use `src/_data/infra.js`.
- Per-entry JSON-LD already exists in `src/infrastructure/entry.njk`: `WebPage`, technology `about` entries, author/site references and a `BreadcrumbList`. `test/build.test.js` checks every entry page for this markup and validates JSON-LD parsing sitewide.
- Both current lab entries have source-linked, dated SVG diagrams. They describe documented architecture rather than live availability.
- The support-focused career cleanup and shared career data are in place, including the generated resume PDF. The former infra-first resume rewrite is superseded by the current evidence policy.
- Blog posts cover homelab recovery, Network+ study and college concepts, and Phase 05 GPO verification. Study remains labeled as study.

### Next

- Reconcile the Windows lab entry's initial-setup scope with the published Phase 05 verification article, checking the linked source records before broadening claims.
- Add further service runbooks or lab progress notes when dated configuration or execution evidence supports them; link each article from the relevant lab entry.
- Keep diagrams, lab summaries and resume content aligned with their sources as evidence changes.

### Superseded directions

- Consolidating employer work into `infra.js` and making Projects software-only no longer fit the content structure: employer duties belong in `experience.json`, while Projects retains evidence-linked labs, software contributions and labeled academic work.
- CCNA progress notes are replaced by the current Network+ study focus. Per-entry JSON-LD is completed work, not a future task.
