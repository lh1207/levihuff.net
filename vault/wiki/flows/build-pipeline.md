---
type: flow
title: "Build Pipeline"
status: active
tags:
  - flow
created: 2026-07-14
updated: 2026-07-14
related:
  - "[[Eleventy Config]]"
  - "[[CSS Pipeline]]"
sources: []
---

# Build Pipeline

## Trigger

`npm run build` - run locally, in CI (`ci.yml`), and as the first stage of `deploy.yml`.

## Steps

1. `eleventy` reads `src/**` and renders templates + markdown to `_site/` per [[Eleventy Config]] (collections, filters, transforms, passthrough all apply here).
2. `tailwindcss -i ./src/_includes/css/tailwind.css -o ./_site/css/styles.css --minify` runs as a second, separate step - Eleventy does not touch CSS. See [[CSS Pipeline]].
3. Output in `_site/` is plain static HTML/CSS, ready to serve or FTP-upload as-is.

`npm start` and `npm run watch` run the two steps in parallel via `npm-run-all2` (`dev:11ty`/`dev:css` or `watch:11ty`/`watch:css`) for local dev with live reload; `npm run build` runs them as a one-shot production build.

## Failure modes

- Bad frontmatter in a blog post or data file fails the Eleventy step - caught by `test/blog.test.js` / `test/data.test.js` before it reaches CI.
- A new internal link with no corresponding page in `_site/` after build is caught by `test/build.test.js`'s link-resolution check.
- Missing `alt` on an `<img>` fails the same build test.

## Related flows

- [[Deploy Pipeline]] - wraps this flow with test-then-deploy
