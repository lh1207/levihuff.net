---
title: "Owning my AI memory"
description: "A personal practice for keeping durable working notes in files I control, rather than relying on a single assistant or app."
date: 2026-06-23
tags: [ai, claude-code, gemini, llm, workflow, obsidian]
layout: post.njk
thumbnail: /images/blog/owning-my-ai-memory-circuit-brain.jpg
---

![Digital illustration of a human brain made from circuit board traces and connection nodes](/images/blog/owning-my-ai-memory-circuit-brain.jpg)

The details that make a working session useful should be easy to review and update. I keep those notes in files I control: project decisions, preferences for a review, and context that would otherwise need repeating.

This is a personal record-keeping practice, not a claim about the current memory or export features of any particular assistant.

Updated October 2026: the durable copy is the note itself. Any assistant-specific setting is optional convenience, not evidence about a platform's capabilities or policy.

## Keep a small canonical note

The note is deliberately short. It records facts that are easy to mistake or lose, plus working preferences that help a collaborator give a useful answer. A generic example looks like this:

```markdown
# Context

- Earlier IT support work included Windows imaging, Active Directory, and PowerShell tasks.
- Current personal projects include a static site and version-controlled lab configuration.

# Working preferences

- Lead with the answer, then explain the evidence.
- Review plans and code for concrete failure modes.
```

The first section distinguishes career history from personal work. The second is direction, not biography. Keeping those separate makes the note easier to correct when either changes.

## Files make review possible

Markdown does not solve organization by itself, but it gives the notes an inspectable form. A project can keep its assumptions near its source, and a personal note can stay separate from any one codebase.

These existing graph screenshots show the organization of linked notes. A note title identifies a topic; it does not prove an accomplishment or a completed deployment.

![Graph view showing links between Markdown notes](/images/blog/owning-my-ai-memory-vault-graph.webp)

![The index note selected in the graph view, highlighting its links](/images/blog/owning-my-ai-memory-vault-graph-index.webp)

That pattern shows up in my public work. The [Windows and Active Directory lab](https://github.com/lh1207/ad-pxe-lab) includes PowerShell scripts and runbooks; the [homelab repository](https://github.com/lh1207/homelab) keeps Compose definitions and host notes together. In both cases, the files describe what is configured without claiming that a service is currently running.

The same discipline applies to notes about how I work: state the source, distinguish a plan from completed work, and remove facts when they become stale.

## The useful habit

The main rule is simple: keep the durable facts readable, and treat tool-specific behavior as a detail that may change. That leaves a useful record for future work without making promises about a product, a platform, or an unverified operational setup.
