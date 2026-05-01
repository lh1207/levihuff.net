---
title: Deploying OpenClaw on Windows with WSL2
description: "A ground-level look at what it actually takes to get OpenClaw running locally on Windows: the wizard crashes, config schema traps, broken UI elements and a hard lesson about running LLMs on a display GPU"
date: 2026-04-14
tags: [ai, local-llm, wsl2, windows, ollama, homelab, devops]
layout: post.njk
thumbnail: /images/blog/openclaw-hero.jpg
---

![OpenClaw Logo, which has a cartoon crab with circle claws and rectangle legs](/images/blog/openclaw-hero.jpg)

[OpenClaw](https://github.com/openclaw/openclaw) is an open-source personal AI assistant that runs locally on your hardware. It connects to chat apps like WhatsApp, Telegram and Discord and can act as an autonomous agent: managing calendars, clearing inboxes, controlling your browser, running system commands. The pitch is a self-hosted AI that actually does things, on your own machine, with your own models.

I deployed it on my main workstation. My utility server is a repurposed Optiplex and wouldn't keep up. Getting OpenClaw running on Windows with WSL2 was more involved than the documentation suggests, and I learned more from where it broke than from where it worked.

## Windows and WSL2 Are Intertwined

The install guides assume you're on macOS or a clean Linux system. WSL2 is technically supported, but the documentation doesn't cover the Windows-specific surface area in much depth. This sets a misleading expectation: the onboarding wizard looks simple, and the step count shown in current guides doesn't match how many steps actually appear when you run it.

The first problem I hit was a hard crash in the wizard itself. Skipping the channel selection step, the part where it asks you to connect Zalo or another messaging app you might not want, triggers:

```
TypeError: Cannot read properties of undefined (reading 'trim')
```

There's no way around it. The "skip for now" option at that step isn't functional. You have to pick a channel to proceed, even if you have no intention of using it.

## The Config Is What You're Really Doing

The wizard doesn't produce a working config. It scaffolds a `openclaw.json` that's missing `gateway.mode`, which means the gateway won't start. Running `openclaw doctor --fix` rewrites the config but still doesn't add that field. You're left with a file that looks complete but fails silently.

On top of that, the schema has non-obvious requirements. My first attempt at writing the config manually used `host` and `model` as keys at the provider level, reasonable guesses based on similar tools. OpenClaw doesn't recognize them. I had to reverse-engineer the actual expected schema from the error output.

Another source of confusion: the model entry created through the UI sets `"api": "ollama"` at the model level. That conflicts with the provider-level setting of `openai-completions`. The UI doesn't warn you. You fix it in JSON directly by correcting the model-level `api` field.

The provider key name the UI generates is something like `"qwen3:8b - ollama"`, specific to the model and adapter combo, not portable or clean. Renaming it to just `"ollama"` directly in the config file makes things considerably easier to reason about.

### What the Working Config Actually Requires

- `gateway.mode: local`: set manually; the wizard and doctor both skip it
- Provider-level `api` set to `openai-completions`, not overridden at the model level
- `contextWindow` at 16,000 or above: OpenClaw enforces a minimum and kills the agent before it replies if you go lower
- `http://localhost:11434/v1` for the Ollama endpoint, which works correctly with mirrored networking mode set in `.wslconfig`

Bypassing the wizard entirely and writing `openclaw.json` by hand turned out to be the faster path once I understood the schema.

## The UI Has Broken Pieces

The Model Provider API Adapter dropdown deselects itself when you interact with it and won't save your selection. The Save button doesn't appear while a dropdown is actively open. The end result is that configuring providers through the UI reliably doesn't work, which pushes you back to JSON regardless.

This isn't a complaint about the project. It's open source and early. But it does mean the UI should be treated as a reference, not the primary configuration surface.

## The Hardware Reality of Running LLMs on a Display GPU

My main workstation has an 8GB VRAM GPU. That sounds like enough for a local model until you account for what Windows is already using.

Windows display composition holds onto a significant portion of the GPU memory. In my case, roughly 7GB of the available 8GB was consumed by the time I accounted for desktop rendering and active applications. That left around 800MB for the model.

Qwen3 8B requires about 5.2GB. With only 800MB free on the GPU, the model runs mostly CPU-offloaded. Token generation becomes noticeably slow: usable, but not the experience you'd have with the model fully resident in VRAM.

This is something worth understanding before you set expectations. Mac Mini users on M-series hardware have unified memory, meaning the full memory pool is available to the model without competing with display output. That's a fundamentally different situation, not a fair comparison.

The right fix on Windows is either a dedicated inference GPU with the display on a separate card or a smaller model. Qwen3 4B or 1.7B would fit in the remaining VRAM and run at full GPU speed. The 16k minimum context window that OpenClaw enforces also costs VRAM, so that factors into the calculation too.

## What the WSL2 Setup Needs to Look Like

The environment that actually works:

- WSL2 with systemd enabled: `openclaw` relies on systemd services, so this is not optional
- Ollama installed and running as a system service inside WSL2, not just a user process
- CUDA accessible to WSL2, verified with `nvidia-smi` from inside the WSL shell
- Ollama's systemd service override at `/etc/systemd/system/ollama.service.d/override.conf`, the system-level path, not the user-level one
- Mirrored networking mode in `.wslconfig` so `localhost:11434` resolves correctly from the OpenClaw gateway

Once those pieces are in place and the config is written correctly, the gateway starts reliably as a user-level systemd service.

## Key Takeaways

1. **Read the error output as documentation**: The schema I needed was reverse-engineered from what OpenClaw rejected, not from what the docs described
2. **Wizards that crash on optional steps are a workflow hazard**: Designing a required action as "skippable" and then crashing when skipped is a real usability problem worth watching for in any tool
3. **GPU VRAM on a display machine is not your full VRAM**: Windows takes a significant cut before your model sees any of it, plan accordingly
4. **WSL2 systemd configuration is load-bearing**: Everything from Ollama to OpenClaw depends on it; getting that right first saves time
5. **The UI can lie by omission**: Fields that look configurable may not save, and the config file is the ground truth

## Conclusion

OpenClaw works, but getting there on Windows required manual config work, workaround research and an honest reckoning with what my GPU can actually do when it's also running a desktop. The local AI assistant category is interesting: persistent memory, real task execution, model flexibility. But the Windows onboarding experience has enough rough edges that you should go in prepared to read JSON and interpret error messages. Once it's running, the foundation is solid. Getting there is the work.
