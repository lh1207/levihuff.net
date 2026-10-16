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
