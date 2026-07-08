---
name: eleventy-content
description: Add or change content on levihuff.net the data-driven way. Use when adding projects, experience, skills, tools, infrastructure entries, blog posts, pages, or nav items, or when editing any file under src/_data/ or src/blog/.
---

# Eleventy content workflow

Content on this site is data-driven. Templates render what the data layer provides; content never gets hardcoded into `.njk` files. If a change seems to require editing a template to add copy, the correct move is almost always a data file edit instead.

## Where content lives

| Content | Edit this | Rendered by |
|---|---|---|
| Site identity, social links | `src/_data/site.json` | `src/_layouts/base.njk` |
| Nav items | `src/_data/navigation.json` | `src/_includes/components/nav.njk` |
| Projects | `src/_data/projects.json` | `src/projects.njk` + `components/project-card.njk` |
| Experience | `src/_data/experience.json` | `components/experience-card.njk` |
| Skills | `src/_data/skills.json` | `components/skill-group.njk` |
| Tools | `src/_data/tools.json` | tools section |
| Infrastructure, homelab, AI ops | `src/_data/infra.js` | `components/infra-card.njk`, `src/infrastructure/` |
| Blog posts | `src/blog/<slug>.md` | `src/_layouts/post.njk` |

## Procedure

1. Identify which data file owns the content. Check the schema in the "Data layer" section of CLAUDE.md; every schema is enforced by `test/data.test.js`.
2. For infra entries: append one object to `src/_data/infra.js` under the right section comment. Required: unique kebab-case `slug`, `name`, `section` (infrastructure | homelab | ai-ops), `kind` (project | service), `role`, non-empty `stack` array, `status`, `summary`, `details` [{label, text}], `links` [{label, url}], boolean `featured`. No em dashes in copy.
3. For blog posts: create `src/blog/<slug>.md` with the exact frontmatter from the "Blog post conventions" section of CLAUDE.md. The `thumbnail` file must exist under `src/images/blog/` on disk.
4. For a new page: create `src/<page>.njk` with `layout: base.njk` frontmatter; add a `navigation.json` entry if it belongs in the nav (root-relative URL, no duplicates).
5. If a schema gains a new field, update the matching `describe` block in `test/data.test.js` in the same change — unvalidated fields silently go untested.
6. Never edit anything in `_site/` (build output) and never add content to `src/_includes/` partials directly.
7. Run `npm test` before reporting done. `test/build.test.js` runs a full build and checks internal links, `alt` attributes, and passthrough artifacts; it can take up to 2 minutes.

## Copy rules

Voice per DESIGN.md section 2: first person, specific numbers, exact technical names. No emoji, no italics, no em dashes in site copy (`test/data.test.js` enforces the em-dash ban for `.njk` templates and infra entries).
