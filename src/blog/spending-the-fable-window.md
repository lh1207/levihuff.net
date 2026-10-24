---
title: Checking AI-assisted changes
description: A practical checklist for keeping plans, implementation, and verification separate when working on this site.
date: 2026-06-13
tags: [ai, workflow, eleventy]
layout: post.njk
thumbnail: /images/blog/spending-the-fable-window.jpg
---

![Source code on a monitor](/images/blog/spending-the-fable-window.jpg)

Updated October 2026: the earlier model-cost, usage, and performance comparisons have been removed because the supporting records were not available for verification.

An AI-generated explanation can sound finished before the work is finished. The useful question is whether the files and checks support it.

## Separate the plan from the result

A plan describes intended work. A diff shows what changed. A passing test demonstrates only what that test exercises. Keeping those distinctions visible makes a change easier to review.

For this site, the [repository](https://github.com/lh1207/levihuff.net) contains a verification command in `.claude/commands/verify-site.md`. It instructs the assistant to run the suite and report failures by test file. That instruction is a workflow definition, not evidence that a particular run passed.

## Check the actual artifact

The site's tests cover data schemas, filters, blog frontmatter, and generated pages. Useful follow-up checks include opening the generated page, using the links, trying the mobile navigation, and reading the resume download.

Content needs its own review. Valid JSON does not make a career claim true, and a working project link does not establish ownership of every feature in that repository.

A review should connect each conclusion to its source:

- A technical feature should point to implemented code.
- A completed lab step should have recorded output.
- A performance claim should include a measurement and its conditions.
- A team project should distinguish the shared result from an individual's contribution.

## Keep the handoff concrete

A useful handoff identifies the changed files, the checks that ran, their results, and what remains uncertain. It should be possible for the next reader to inspect the same artifact.

That is the part of an AI-assisted workflow worth keeping: make the result reviewable, and let the evidence set the strength of the claim.
