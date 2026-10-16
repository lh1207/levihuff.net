---
title: Keeping a development setup reviewable
description: The repository files that describe this portfolio's build, agent instructions, and checks, with a clear boundary between configuration and execution evidence.
date: 2026-04-29
tags: [workflow, eleventy, github-actions, documentation]
layout: post.njk
thumbnail: /images/blog/rebuilding-my-dev-setup-with-three-llms.jpg
---

![Computer workspace](/images/blog/rebuilding-my-dev-setup-with-three-llms.jpg)

Updated October 2026: this note now focuses on files that can be inspected in the [site repository](https://github.com/lh1207/levihuff.net). Earlier hardware measurements, deployment timings, model comparisons, and migration details are omitted because their supporting records were not available.

## Keep the build visible

The build is described in `package.json` and `eleventy.config.cjs`. Eleventy renders the pages, and Tailwind compiles the stylesheet. The source lives under `src/`; generated files go to `_site/`.

The deployment workflow in `.github/workflows/deploy.yml` installs dependencies, runs tests and the build, and uploads the output using the configured FTP action. That file establishes the configured steps. A successful deployment needs evidence from the actual run.

## Keep instructions near the code

`AGENTS.md` and `CLAUDE.md` document this repository's architecture, content rules, and test commands. `AGENT_CONFIG.md` inventories the tracked agent configuration.

Those files are useful context for a contributor. They do not prove that an assistant followed the instructions or that every check passed. The diff and test output still need review.

## Make changes easy to inspect

Career, skills, and project content live in `src/_data/`, while templates control how the data appears. This separates a content edit from a layout change and makes repeated information easier to keep consistent.

For a small change, a useful review can stay focused:

- Read the changed source and compare it with the request.
- Run the relevant checks, including the site's test suite.
- Inspect the resulting page and its links.
- Record unresolved questions instead of filling them with assumptions.

The goal is a setup whose behavior can be checked from its files and output. The tool used to make the edit is secondary to that evidence.
