---
description: Scaffold a new entry in src/_data/infra.js (infrastructure, homelab, or ai-ops)
argument-hint: <entry-name> [section]
---

Add a new infrastructure entry for: $ARGUMENTS

1. Append one object to the array in `src/_data/infra.js`, placed under the matching section comment (infrastructure, homelab, or ai-ops). Nothing else changes — cards and the detail page at `/infrastructure/<slug>/` are generated from data.
2. Follow the `infra.js` schema documented in the "Data layer" section of CLAUDE.md and enforced by `test/data.test.js`:
   - `slug` unique across the file and matching `/^[a-z0-9-]+$/`
   - `section` one of `infrastructure | homelab | ai-ops`; `kind` one of `project | service`
   - `slug`, `name`, `role`, `status`, `summary` all non-empty strings
   - `stack` a non-empty array of non-empty strings
   - `details` an array of `{label, text}` with non-empty values
   - `links` an array of `{label, url}` where every url is root-relative or https
   - `featured` a boolean (featured entries surface on the homepage)
3. No em dashes anywhere in the entry copy — `test/data.test.js` fails the suite if one appears. Follow the voice rules in DESIGN.md section 2.
4. Run `npm test` and confirm it passes before reporting done.
