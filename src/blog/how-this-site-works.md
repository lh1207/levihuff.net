---
title: How this site works - Eleventy, Tailwind, and GitHub Actions
description: The source files and build pipeline behind levihuff.net, including Eleventy templates, shared career data, Tailwind CSS, and automated deployment.
date: 2025-01-19
tags: [eleventy, nodejs, static-site, web-development, github-actions]
layout: post.njk
thumbnail: /images/blog/site-build-terminal.jpg
---

This site uses Eleventy to turn Nunjucks templates, JSON data, and Markdown posts into static pages. These notes were updated in October 2026 to match the current repository.

## Source and content

The [site repository](https://github.com/lh1207/levihuff.net) contains the implementation. The main files are:

- `eleventy.config.cjs`: collections, filters, image transforms, and asset copying.
- `src/_layouts/base.njk`: shared page structure, metadata, navigation, and footer.
- `src/_layouts/post.njk`: blog layout.
- `src/_data/`: shared career, experience, skills, project, and site information.
- `src/blog/`: Markdown articles with frontmatter.
- `src/_includes/css/tailwind.css`: stylesheet source.

Shared data keeps repeated content, such as contact details and the current career summary, consistent across pages. The resume generator also reads the career data.

## Build pipeline

`package.json` declares Eleventy 3 and Tailwind CSS 3. The build command runs Eleventy, then compiles and minifies the Tailwind stylesheet into `_site/css/styles.css`. CSS has a build step; it is not copied unchanged.

Images, fonts, downloadable files, and selected site files use Eleventy's passthrough copying. The generated `_site/` directory contains the files served by the host.

Useful commands are:

- `npm start`: build once, then run the Eleventy server and CSS watcher.
- `npm run build`: generate the site and stylesheet.
- `npm run watch`: watch templates and CSS without starting the server.
- `npm test`: run the Vitest suite, including a build smoke test.

The public pages are static files. Client-side JavaScript adds navigation behavior and project/blog filters; templates also provide content for visitors without JavaScript.

## Checks and deployment

Tests cover data schemas, filters, blog frontmatter, and generated pages. The build checks include titles, descriptions, headings, image alternatives, local links, and structured data.

The GitHub Actions deployment workflow uses Node.js 22. On a push to `main`, it installs dependencies with `npm ci`, runs tests and the build, then uploads `_site/` through the configured FTP deployment action. Connection values come from repository secrets.

These files describe the configured workflow. They do not establish a deployment-time, uptime, security, or accessibility guarantee.

## Evidence

The implementation can be checked directly in [package.json](https://github.com/lh1207/levihuff.net/blob/main/package.json), [the Eleventy configuration](https://github.com/lh1207/levihuff.net/blob/main/eleventy.config.cjs), and [the deployment workflow](https://github.com/lh1207/levihuff.net/blob/main/.github/workflows/deploy.yml).
