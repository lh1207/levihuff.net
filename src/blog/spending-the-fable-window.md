---
title: Spending the Fable Window
description: "A retrospective on using Claude Fable 5 only for first-pass work during its short free window: the tier ladder it sat on, what I built with it, real ccusage numbers against an Opus baseline, and what instrumentation caught that memory would have gotten wrong."
date: 2026-06-13
tags: [ai, claude-code, fable, opus, sonnet, mcp, ccusage, eleventy]
layout: post.njk
thumbnail: /images/blog/spending-the-fable-window.jpg
---

![A close-up of a monitor showing colorful source code, lit by blue and red light in a dark room](/images/blog/spending-the-fable-window.jpg)

For a few days, Claude Fable 5 was free. Fable is the expensive one, the model that sits a rung above Opus, the one you are not supposed to leave running all day. It was supposed to stay free through June 22. It got cut early, before that date, for everyone, not just my plan. The window we actually got was shorter than the one on the announcement.

So this is a retrospective on a tool that is already gone.

The obvious move when the expensive model is suddenly free is to make it the daily driver and run everything through it while the meter is off. That is also the least interesting way to test it. A free window tells you nothing about whether the tool is worth paying for unless you use it the way you would have to pay for it. So I treated it as a limited resource from day one: spend it only where the spend was justified, hand everything else down the ladder, and log the whole thing with ccusage so the verdict came from data instead of a vibe.

This is the build log of that. The rule I used, the three things I actually pointed it at, the real numbers, and where the rule met its limits.

## Where I spent Fable

I already run a model ladder inside Claude Code. Each task goes to the cheapest model that can finish it without me babysitting:

```text
Haiku 4.5   formatting, renames, mechanical edits
Sonnet 4.6  execution, iteration, debugging, the bulk of the work
Opus 4.8    judgment, plan mode, architecture calls
Fable 5     heavy first pass on hard, multi-file, long-horizon work
```

Fable slotted in at the top, one rung above Opus, and it got exactly one job: **Fable opens, Sonnet closes.**

Fable does the first heavy pass on a hard problem, the part where the whole shape of the thing is still ambiguous and a weaker model will commit to a bad structure early and make you pay for it later. Then the session ends and Sonnet takes over every follow-up: iteration, debugging, copy, the long tail of small edits.

The reason this is worth doing, and not just credit theater, is specific. Fable's lead over Opus is narrow on a one-file task and, in my use, widens as the task gets longer and touches more files. It also tends to finish hard work in fewer turns, and fewer turns at a higher per-token price partly cancels the price difference. None of that offset exists on an easy task. On an easy task you are paying roughly 2x for an answer Sonnet would have gotten right the first time, which is pure burn. So the ladder is not about loyalty to a model, it is about matching the spend to the only place the spend pays for itself: the ambiguous opening move on something genuinely hard.

That gave me a clean test. Find the hardest, most multi-file things on my list and spend Fable only on their first pass.

## One narrow session for reddit-kb

The flagship use case was [Reddit Knowledge Base](https://github.com/lh1207/reddit-kb-mcp-server): an MCP server that indexes my saved Reddit content into ChromaDB and serves it back over [FastMCP](https://github.com/jlowin/fastmcp) 3.x. Four moving parts that all have to agree on data shapes: Python ingestion pulling "old Reddit" JSON with session token auth, `nomic-embed-text` running locally through Ollama for embeddings, ChromaDB as the vector store, and the MCP layer wiring it all together.

This is the kind of greenfield, multi-file, lots-of-decisions problem the ladder says to open with Fable. The plan was one Fable session to stand the whole skeleton up end to end.

I scoped it tighter than that. Not the whole skeleton, just the wireframe. No business logic at all. Lock every function signature, every return type, and the stub conventions first, then stop.

```text
Scaffold the reddit-kb MCP server. WIREFRAME ONLY.

Constraints:
- No business logic. Every function body is `raise NotImplementedError`
  with a one-line docstring describing the contract.
- Define and lock all public function signatures and return types now:
  ingestion (PRAW), embeddings (nomic-embed-text via Ollama),
  vector store (ChromaDB), and the MCP tool surface (FastMCP 3.x).
- Module layout: lib/reddit.py, lib/embeddings.py, lib/chroma.py,
  server.py for the MCP wiring.
- Stub convention: typed signatures, NotImplementedError bodies,
  TODO(scope) comments pointing at the session that will fill each one.

Do NOT implement reddit.py, embeddings.py, or chroma.py. We fill those
in separate, dedicated sessions. Output the tree and the stubbed files.
```

Then the three `lib/` modules got their own sessions, one at a time, against frozen signatures.

The reason for cutting it that small: a long-horizon model is good at holding a big task in its head, which makes it tempting to ask for the big task. But "good at holding it" and "lands it cleanly in one shot" are different claims. The more surface area in a single session, the more places a small early decision propagates into a structural problem you only notice three files later. Locking the contracts first meant the expensive session produced one cheap-to-verify thing: an interface. Everything after that was Sonnet filling in bodies that could not drift, because the shape was already nailed down.

Cost boundary: Fable touched `reddit-kb` exactly until the interface existed. Every line of actual logic was Sonnet.

## One planning pass, one build pass

The second target was this site. I am mid-reposition right now, moving it to lead with infrastructure and ops instead of generic full-stack framing. Concretely: the about, projects, and contact pages reframed infra-first, and the content behind them moved into expandable JSON under `src/_data` so adding a project or a role is a data edit, not a template change. That is a content and structure problem across a data-driven [Eleventy](https://www.11ty.dev/) and Nunjucks build, which is exactly the multi-file, ambiguous-shape work Fable is for.

I ran it as two Fable prompts. Plan, then build. Phase one did not touch a single template:

```text
Phase 1, PLAN ONLY. Write PLAN.md. Do not edit any site files.

I'm repositioning levihuff.net to lead with infrastructure and AI-ops
instead of full-stack-generalist framing. Produce:
- Information architecture: pages, sections, what each one is for.
- 2-3 distinct structural directions, with the tradeoff of each.
- A data model in src/_data that is expandable: adding a project,
  a skill, or a role should be a JSON edit, never a template edit.
- A phased roadmap: what ships first, what can wait.

Output PLAN.md only. No implementation this session.
```

I read `PLAN.md`, picked a direction, and only then let it build:

```text
Phase 2, BUILD. Implement the direction in PLAN.md (#2, the data-driven
one). 11ty + Nunjucks. All structured content lives in src/_data/*.json
as documented in the plan. Templates render data, they do not hardcode it.
First pass only: structure, data files, templates, wiring. Leave final
copy and visual polish as TODOs. I'll take those to Sonnet.
```

Same handoff as `reddit-kb`. Fable made the architecture calls and laid the first pass. The copy you are reading, the styling, the dozen small Nunjucks fixes after, all Sonnet. Splitting plan from build also meant the most reversible artifact, a markdown file, came out of the most expensive part. If the plan was wrong, I had thrown away one cheap session, not a half-built site.

## How I'll know it was worth it

The point of using it like this in the free window was to come out with a number, not an impression. So I logged everything with [ccusage](https://github.com/ryoppippi/ccusage), which reads Claude Code's local session files and prices them per model, and compared Fable against my Opus baseline.

Here is June on this machine, straight out of `ccusage monthly --breakdown`. Fable was free, but ccusage still prices it, so the dollar column is the notional credit cost: what that usage will cost me now that the window is closed.

| Model | Total tokens | Notional cost | Effective $/Mtok |
|---|---:|---:|---:|
| opus-4-8 | 36,622,995 | $46.25 | ~$1.26 |
| fable-5 | 16,512,714 | $42.42 | ~$2.57 |
| sonnet-4-6 | 98,716 | $0.18 | n/a |
| haiku-4-5 | 193,988 | $0.06 | n/a |

Two things fall out of that table.

The 2x sticker price is real and it is right there in my own logs. Fable cost about $2.57 per million tokens against Opus at about $1.26, a 2.04x ratio. That is the price you are deciding whether to pay.

But the token counts are not equal, and that is the part worth sitting with. Fable did its share of June in 16.5M tokens. Opus took 36.6M, more than double. These are not the same tasks run through both models, so this is a directional signal, not a benchmark. What the totals show is narrower than "Fable is cheaper": even at 2.04x per token, Fable's bill ($42.42) landed in the same range as Opus ($46.25), because it used under half the tokens. That is consistent with the bet behind the whole ladder, that a stronger model lands hard work in fewer turns, but June totals across different work do not prove it on their own. It is still enough to set a threshold. When the aggregate bill comes out near Opus on the harder openings, the per-token premium is buying fewer turns instead of just a bigger number, and that is a credit I would spend. On easy work none of it holds. The token count would not drop, the 2x would not cancel, and Fable would just be more expensive Sonnet.

## Where the rule met its limits

The rule held up on the work I aimed it at. Two places it ran into something I did not control, and both are worth logging.

### The platform picked the model, not me

The rule was "spend Fable on the hard, ambiguous first pass." A chunk of my hardest, most ambiguous work is homelab, security, and preservation. So I pointed Fable at a game-preservation project: an online game whose official servers are being shut down, where the work is standing up a replacement backend before they go dark. That means capturing and understanding the client-server protocol while there is still a live server to capture it from.

Fable did not take it. The session fell back to Opus 4.8.

Fable runs classifiers that route a session to Opus 4.8 when the work trips certain topics: cybersecurity, biology, chemistry, distillation. It is a small slice of sessions, under 5%, and it sometimes catches things that are not actually any of those. Preservation work that is reverse-engineering and traffic-interception flavored reads as cybersecurity to a classifier, so it tripped, and I got Opus instead of the model I asked for.

Opus 4.8 handled the task fine. That is not the failure. The failure is that I do not get to choose. For a meaningful slice of my actual work, anything that looks like reverse engineering, I cannot count on getting Fable specifically. Which means Fable can never be the model a security-adjacent or preservation workflow is built around. The one model in the ladder I would most want for the hardest RE problems is the one I am least guaranteed to get on exactly those problems. My routing rule did not fail because I chose wrong. It failed because the platform made the routing decision for me.

### Scoping wide is still a trap, even with a long-context model

`reddit-kb` is in the post because I cut it down to a wireframe. The first instinct was the opposite: one big session, whole skeleton, because Fable can hold it. It can hold it. It still produces a more fragile result than three narrow sessions against frozen signatures. A bigger context window lowers the cost of scoping wide, it does not remove it. The failure mode just moves further down the file tree where it is harder to see. I scoped narrow on purpose, which is why this one is a note and not a postmortem.

## The verdict: honest, not flattering

Look back at the ccusage table. Sonnet is $0.18. Haiku is $0.06. The two models that were supposed to carry the bulk and the cleanup barely register. That gap is what sent me into the session logs, and the logs told me something I would have sworn was not true.

"Fable opens, Sonnet closes" was the rule. The logs say Opus did the closing, not Sonnet. Some of that $46 of Opus is plan mode doing exactly its job, judgment and architecture, which is by design. But a lot of it was iteration the rule says should have gone to Sonnet, and did not.

The cause was a config alias that outlived the setup it was named for. I was still running `opusplan`. That mode plans on Opus and hands execution down to a cheaper model once you leave plan mode, and it does exactly that when Opus is your planner. The catch is I had moved my opener to Fable but left `opusplan` set. `opusplan` does not know Fable exists. So the planning I thought was running on Fable was running on Opus, and the takeover stayed at the top of the stack instead of dropping to Sonnet. The mode behaved correctly. The name just no longer matched the model I had swapped in, and a config name is not a contract. The fix is boring and permanent: state the routing you actually want in the session instead of trusting a mode label to track a change you made somewhere else.

Worth being clear about what this is and is not. It is a subtle interaction between a renamed planner and a routing alias, the kind of thing that never shows up in the output, only in the bill. I caught it the same week, from my own logs, because the entire point of the exercise was to measure instead of guess. That is the instrumentation doing its job, not failing at one.

The bigger half is structural, and it is the more useful thing to admit. Claude Code does not route by cost. There is no dispatcher watching a task come in and deciding "this is cleanup, send it to Sonnet." You pick a model and the iteration loop stays on it until you stop and switch with intent. You can switch, but nothing nudges you to, and a warm session always feels cheaper to continue than to break. Cost-aware routing was never going to come from willpower inside a single session. It is a workflow you build on purpose: separate sessions per task type, or a dispatch layer that decides what runs where before the expensive model ever loads the context. That is the next thing I am building.

So the verdict holds two things at once. A routing alias outlived the setup it was named for, and the tool was never built to make the cheap path the default. The number is the tell, and it is the kind of thing you only catch if you log the work instead of trusting the story you told yourself about it. Check the logs.

## Key takeaways

1. **A free window is only useful if you use it like a paid one.** Running a premium model as a daily driver while it is free teaches you nothing about whether to keep paying for it.
2. **Spend the expensive model on the ambiguous opening move.** Its lead over the next model down widens with task length and file count, and the fewer-turns effect is the only thing that offsets the price. Neither exists on easy work. Stop the session to swap models before continuing.
3. **Narrow the session even when the model could hold more.** A large context window lowers the cost of over-scoping, it does not delete it. Lock interfaces first, fill bodies later, cheaper.
4. **Log it, do not trust your memory of it.** ccusage caught a routing alias (`opusplan`) still pointing at Opus after I had swapped my opener to Fable, something the output never reveals and I would have guessed wrong. Per-token, Fable was 2.04x Opus, but its aggregate June bill still landed near Opus because it used under half the tokens. Measurement, not recall.
5. **You cannot build a security workflow on a model you might not get.** Fable's classifier fallback to Opus 4.8 trips on reverse-engineering-shaped work, which is a real part of my work, so Fable can sit in the ladder but it cannot anchor it.

## Conclusion

Fable is gone, pulled for everyone earlier than the calendar said it would be. The retrospective verdict is narrow: on genuinely hard, multi-file, long-horizon openings, its total bill landed near Opus while finishing in fewer turns, and that is a credit worth spending. Everywhere else it is more expensive Sonnet, and on the reverse-engineering work I most wanted it for, I do not reliably get it at all.

The tool left. The discipline it forced is the part worth keeping. Treating a model as a scarce resource, picking the one place the spend pays for itself, and checking the bill instead of the feeling is good practice whether or not the meter is running. Fable just made me actually do it.
