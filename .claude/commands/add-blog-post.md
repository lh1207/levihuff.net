---
description: Scaffold a new blog post in src/blog/ with valid frontmatter
argument-hint: <post-title-or-slug>
---

Create a new blog post for: $ARGUMENTS

1. Derive a kebab-case slug from the title and create `src/blog/<slug>.md`.
2. Fill in the exact frontmatter contract from the "Blog post conventions" section of CLAUDE.md (title, description, date, tags, `layout: post.njk`, thumbnail). Do not invent extra fields.
3. The thumbnail must be a root-relative path under `/images/blog/` and the file must exist on disk before tests can pass — if no image exists yet, ask which existing image to use or stop and say the image is the blocker. `test/blog.test.js` verifies the file exists.
4. Write the body following the voice rules in DESIGN.md section 2 and the "Design conventions" section of CLAUDE.md: no emoji, no italics, sentence-case headings, specific numbers over approximations.
5. Run `npm test` and confirm it passes before reporting done.
