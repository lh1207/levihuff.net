---
title: "Making my AI workflow keep its receipts"
description: "How I turn temporary AI sessions into tested changes, reusable lessons, and auditable handoffs without letting cached context outrank the live system."
date: 2026-08-18T12:00:00-04:00
tags: [ai, codex, workflow, testing, obsidian, automation]
layout: post.njk
thumbnail: /images/blog/making-my-ai-workflow-keep-its-receipts.webp
---

![A developer writing a plan in a notebook beside monitors displaying code](/images/blog/making-my-ai-workflow-keep-its-receipts.webp)

Photo by [Jakub Żerdzicki](https://unsplash.com/@jakubzerdzicki) on [Unsplash](https://unsplash.com/photos/a-person-codes-while-taking-notes-QUtrcUo5-GI).

An AI coding session can produce a good answer and still leave nothing dependable behind.

The code might work only in the agent's temporary environment. The explanation might disappear into an old chat. A useful failure might be remembered as a vague feeling instead of becoming a rule. Even a successful change can be difficult to trust if nobody can say which tests ran, what was checked in the browser, or whether the result came from the current repository or a stale note.

I have been tightening my workflow around that gap. The goal is not to make an agent remember every conversation. I already keep my important context in files I control, which I covered in [Owning my AI memory](/blog/owning-my-ai-memory/). The newer problem is operational: how does one temporary session become a verified result and a better starting point for the next session?

My answer is a small pipeline built around live sources, explicit ownership, verification, and receipts.

```text
goal -> plan -> execute -> verify -> save or skip -> receipt
                   ^          |
                   |----------|
                     failures
```

The loop back matters more than the arrow pointing forward.

## A chat is not the unit of work

Chats encourage a misleading definition of done. The assistant gives a confident final response, the conversation looks complete, and the result feels settled.

My workflow treats the goal as the unit of work instead. A goal has a concrete outcome, a maintained plan, evidence, and a completion audit. The chat is only where those pieces happen to move around.

That distinction changes the agent's behavior. If the goal is "add a publish-ready blog post," producing Markdown is not enough. The thumbnail has to exist. The frontmatter has to match the site's schema. The production build has to accept it. Internal links need to resolve. The rendered page needs to look right at desktop and mobile sizes. Only then is there a result worth preserving.

It also gives interruptions somewhere to land. A session can pause, move to another machine, or hand part of the work to another agent without redefining success. The open plan still says what remains.

## Start warm, then verify against reality

I do not want every session to reread an entire Obsidian vault. That would be expensive, noisy, and surprisingly likely to surface an old decision before the current one.

Instead, the session starts with a short hot cache. Mine is a Markdown note under 500 words that summarizes the most recent durable context: active branches, completed work, known failures, and the next likely decisions. If that summary points to something relevant, the agent can open the index and then the specific owner note.

The lookup order is deliberately narrow:

1. Read the hot cache.
2. Use the index to find the relevant domain note.
3. Inspect the live repository, configuration, service, or task.
4. Treat the live source as authoritative when it disagrees with memory.

That last rule prevents the memory system from becoming mythology. Notes are a fast map, not a second production environment. A cached branch name can be stale. A workflow described last month can have been replaced. A test count can change with one new assertion. The note should help the agent find the truth faster, never win an argument with the truth.

This approach also keeps context proportional to the task. A dependency update does not need my entire career history. A blog post does not need every homelab decision. Warm context is useful because it is selective.

## Give every agent a bounded job

My current Codex workflow uses three roles. Sol owns the goal, plan, integration, and final audit. Terra handles architecture, ambiguous diagnosis, and adversarial review. Luna takes scoped leaf work such as exploration, test analysis, or mechanical edits.

The names matter less than the boundaries. The root agent keeps the full set of requirements. A delegated agent gets a concrete question, a defined file boundary when it is allowed to edit, and an instruction not to undo work elsewhere. The result comes back as evidence or a patch, not a second competing plan for the whole project.

This fixed one of the recurring problems in multi-agent work: parallelism without ownership. Several capable agents editing the same concern can create more review work than they save. Several agents owning disjoint files or read-only investigations can move quickly without turning integration into archaeology.

I used that pattern during a full-site audit. Work was partitioned by file ownership in isolated worktrees, while the root session remained responsible for merging and verification. The result was 17 commits with no merge conflicts and a clean test run. The speed came from separation, not from asking more agents to think about the same code at once.

For smaller jobs, delegation is unnecessary. A typo does not need a miniature organization chart. The rule is to add another agent only when the work can be bounded independently and the coordination cost is lower than the context it saves.

## Verification is a different kind of reasoning

Automated tests are the first gate because they turn site conventions into executable constraints. This repository checks blog frontmatter, thumbnail existence, data schemas, internal links, image attributes, feed validity, and a full Eleventy production build. Those checks are far more trustworthy than asking an agent whether the change "looks correct."

They are still not the whole gate.

While reviewing a recent post in the browser, I found that a date-only value had shifted to the previous day in Eastern time. The test suite passed because the date was valid. The rendered meaning was wrong.

The same browser pass caught a Nunjucks example that the static-site generator was executing instead of displaying as code. Again, the build succeeded. The reader would have seen the wrong article.

That pair gave me a durable rule: tests validate declared invariants, while visual review catches assumptions nobody declared. For a rendered feature, I now want both.

Environment failures need the same skepticism. In an isolated worktree, I once reused dependencies through a symbolic link to save time. Tailwind resolution failed even though the source change was fine. A clean install in the worktree passed. In another session, a sandboxed GitHub CLI check could not reach the macOS Keychain and reported authentication as invalid. Repeating the check with normal Keychain access showed that the credentials were healthy.

The lesson is not to ignore failures. It is to identify which layer failed before prescribing a fix. Source, build, environment, credentials, browser, and remote CI are different systems. A red result from one layer is evidence about that layer, not automatic proof that every layer underneath it is broken.

## Keep the failure, not the noise

The most reusable part of a session is often the correction.

One recent task ended with a straightforward request for a screenshot of an entire post. The capture tool produced a bad stitched image, and the session drifted into increasingly elaborate ways to manufacture a single tall file. The useful lesson was not a catalog of every failed stitching attempt. It was that a simple delivery request should stay simple: use several clean, contiguous captures when they communicate the result clearly, and stop before tool troubleshooting becomes the project.

That is what belongs in durable memory. Raw transcripts preserve everything at equal weight. A useful note preserves the decision that should change future behavior.

I file those lessons declaratively:

- A sandboxed credential failure on macOS is not enough to conclude that authentication is broken.
- Browser QA is required for content whose meaning depends on rendering.
- Parallel writers need disjoint file ownership.
- Live project files outrank cached notes.
- A small user request should not inherit the complexity of a broken convenience tool.

Those statements are compact enough to act on. The backstory remains available in logs if I ever need it, but the next session does not need to replay the whole incident to benefit from it.

## Make completion produce a receipt

The final stage is a prompt-cache completion gate. Before the root agent declares the goal complete, it evaluates the warm session for durable knowledge.

There are two valid outcomes.

If the goal produced a reusable decision, lesson, or substantial synthesis, the workflow updates the correct Obsidian note, the vault index, an append-only operation log, and the hot cache. If the task was trivial, duplicated existing knowledge, or involved material that should not be filed automatically, the workflow records an intentional skip.

Both outcomes produce a receipt.

That receipt is intentionally boring. It proves that persistence was considered while the full goal was still in context. It prevents "I should save that later" from becoming a silent loss, and it prevents the opposite failure of dumping every chat into the vault just because storage is cheap.

The save-or-skip decision is important. A second brain becomes less useful when every command result is treated as durable knowledge. The vault should contain the small set of lessons and decisions that improve future work, not an exhaust stream from every tool call.

## What this workflow optimizes for

This system is slower than asking one model for an answer and accepting the first plausible output. It is faster than repeatedly rediscovering the same environmental failure, reviewing overlapping agent edits, or debugging a "finished" change after publication.

It optimizes for four things:

1. **Continuity.** A goal and plan survive interruptions better than an unstructured chat.
2. **Authority.** The workflow can use cached context without confusing it with live truth.
3. **Accountability.** Tests, browser checks, handoffs, and receipts show why a result should be trusted.
4. **Learning.** Failures return to the next plan as compact rules instead of anecdotes I hope to remember.

The larger point is not that agents need more memory. They need a disciplined way to decide what deserves to persist, what must be rechecked, and what evidence closes the work.

I still use chats. I still benefit from long context windows and specialized agents. I just do not ask the chat transcript to be the project manager, test report, source of truth, and institutional memory at the same time.

The session can disappear. The result, the evidence, and the lesson should not.
