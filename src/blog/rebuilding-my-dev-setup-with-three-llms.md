---
title: Rebuilding My Dev Setup With Three LLMs
description: "A build log of moving to a Mac, rebuilding the terminal stack, and putting Claude Code, Codex, and Gemini to work on the same codebase. Two real failures included."
date: 2026-04-29
tags: [ai, claude-code, codex, gemini, macos, terminal, devops, eleventy]
layout: post.njk
thumbnail: /images/blog/rebuilding-my-dev-setup-with-three-llms.jpg
---

![A clean macOS desktop with iTerm2 open, showing a tmux session](/images/blog/rebuilding-my-dev-setup-with-three-llms.jpg)

The site you are reading was rebuilt over the last few weeks. Most of what changed wasn't the markup. It was the machine I write on, the terminal stack I write in, and the language models I run against the code.

The headline of this post: I don't use one LLM, I use three. Claude Code is the orchestrator (planning and writing). Codex is the reviewer (asynchronous, often adversarial). Gemini is the large-context reader (full-repo grep, second opinions). Each model gets the job it does best. The reason is not fashion. A single model rarely critiques its own output convincingly, so two models reading the same diff catches things one model would talk itself into.

This is the build log. Real configs, two real failures, and one mistake I am leaving in the `.htaccess` as documentation.

## The machine

For the last few years I drove a Windows machine with WSL2 underneath for Linux work. It mostly worked. WSL2 is not a virtual machine in the user-experience sense, but it is not seamless either. Pathing between Windows and Linux is a constant tax. Display-GPU sharing for local LLMs is its own tax, covered in [Deploying OpenClaw on Windows with WSL2](/blog/deploying-openclaw-windows-wsl2/), where I learned that 7GB of my 8GB VRAM was spoken for before the model loaded.

Now I write on a Mac. The machine itself is unremarkable. What was interesting was rebuilding everything that wasn't muscle memory.

## The terminal stack

Replacements, not improvements. The point was to rebuild a working environment, not to chase optimization.

- iTerm2 for the terminal
- Powerlevel10k for the prompt
- tmux for sessions
- MesloLGS Nerd Font, because Powerlevel10k expects glyphs the system fonts don't ship
- Karabiner-Elements to translate ten years of Ctrl muscle memory into Cmd

Karabiner is the load-bearing piece. A decade of `Ctrl+C`, `Ctrl+V`, `Ctrl+A` does not unlearn itself in a week. Rather than retrain, I let Karabiner translate the keys. The rule for `Ctrl+C` to `Cmd+C`, with an `unless` clause for terminals and IDEs where `Ctrl+C` means SIGINT and should not be hijacked:

```json
{
  "description": "C (Ctrl)",
  "manipulators": [
    {
      "conditions": [
        {
          "bundle_identifiers": [
            "^com.googlecode.iterm2$",
            "^com.apple.Terminal$",
            "^com.github.wez.wezterm$",
            "^com.microsoft.VSCode",
            "^com.jetbrains",
            "^dev.zed.Zed$"
          ],
          "type": "frontmost_application_unless"
        }
      ],
      "from": {
        "key_code": "c",
        "modifiers": { "mandatory": ["left_control"], "optional": ["any"] }
      },
      "to": [{ "key_code": "c", "modifiers": ["command"] }],
      "type": "basic"
    }
  ]
}
```

The full rule list is 63 entries: arrow-key word jumps, Home, End, the standard `Ctrl` shortcuts. The pattern above repeats with different keys.

That is most of the rebuild. Editor and shell config are personal preference and not the point of this post.

## Three providers, three jobs

This is the part that is actually interesting. Three different language model providers running against the same codebase, each handling the work it does best.

- **Claude Code**: orchestrator. Planning, refactoring, writing. Opus runs plan mode (the thinking step). Sonnet runs execution (the implementation step). Both inside one session with shared context.
- **Codex (gpt-5.x family)**: reviewer. Background async review of completed work. Adversarial review against `main` before a merge. Default model is `gpt-5.4-mini` at medium effort, cheap enough to run on every meaningful change.
- **Gemini 2.5 Pro**: large-context reader. Full-repo grep, multimodal screenshots, second opinions when Codex quota is tight or when context size is the actual bottleneck.

The reason is not provider loyalty. A single model is a poor critic of its own output. If I ask Claude to write code and Claude to review it, Claude will find Claude's reasoning convincing. Cross-provider review catches what single-provider review misses by construction.

The role split is documented in `~/.claude/CLAUDE.md`, which Claude Code loads at the start of every session:

```markdown
## Model Roles

| Model         | Role |
|---------------|------|
| Claude Code   | Orchestrator. Planning, reasoning, writing,
                 refactoring, documentation, CLAUDE.md management |
| Codex         | Reviewer and rescue agent. Bug investigation,
                 targeted fixes, background review |
| Gemini        | Large-context specialist. Full-repo reads,
                 multimodal analysis, context-heavy investigation |
```

Claude stays the orchestrator because it has the harness: persistent sessions, plan mode, hooks, sub-agents. Codex sits in the reviewer chair because GPT-family models read diffs differently than Claude does. Gemini sits in the chair Claude would otherwise burn its context window for, with a 1M-token window that swallows whole repos.

When this is overkill: a typo fix does not need three models. The trick is matching the task to the right model, not running all three on every prompt.

## The deploy pipeline

GitHub Actions builds and FTP-uploads `_site/` to the Porkbun host on every push to `main`:

```yaml
name: Deploy to FTP

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./_site/
          server-dir: ${{ secrets.FTP_SERVER_DIR }}
```

Build to live is roughly 40 seconds end-to-end. FTP feels archaic next to Netlify or Vercel, but the static build does not care, and it is what the host supports.

## What didn't work

Two real failures from the recent git history. They are kept here because the lessons are worth more than the fixes.

### Failure 1: FTP 553 on .htaccess

I added a `.htaccess` for cache headers and a few security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS at 2 years with `includeSubDomains; preload`). Locally, fine. On push, the FTP-Deploy step kept failing with `553 Could not create file` specifically on `.htaccess`. Other files uploaded clean.

The cause was the host. Porkbun's static hosting environment does not run Apache. It rejects `.htaccess` uploads outright at the FTP layer. There is no workaround on this host short of moving to one that runs Apache.

The fix was not fancy. Remove the `addPassthroughCopy("src/.htaccess")` from `.eleventy.js`. Stop deploying the file. I left the file in `src/` with a comment at the top explaining what it would do if the site ever moved hosts:

```apacheconf
# DEFENSIVE ARTIFACT — NOT DEPLOYED.
# Porkbun static hosting rejects .htaccess uploads (FTP 553) and does not
# run Apache. Retained as documentation of intended cache/security headers
# if the site ever migrates to an Apache host. To activate, re-add
# eleventyConfig.addPassthroughCopy("src/.htaccess") in .eleventy.js.
```

The lesson: deploy errors that look like FTP problems are sometimes hosting policy. Read the host's docs before chasing FTP timeouts.

### Failure 2: Header set vs. Header always set

In the same `.htaccess`, the cache rules were originally written as `Header set Cache-Control "..."`. That works for normal 200 responses. It does not apply on responses Apache generates internally (304, 404, 500), because `Header set` only fires on the "onsuccess" hook. The fix is `Header always set`, which fires unconditionally including on error responses.

I shipped the fix. Then I reverted it. (PR #19 added `always`, PR #20 reverted PR #19.)

Why? Because the file is not being served by Apache. The earlier lesson means none of those `Header` directives are doing anything in production. Switching `set` to `always set` fixed nothing because there was nothing to fix in the deployed environment. The "more correct" form was correct in a vacuum and meaningless on this host.

This is exactly what the multi-LLM workflow is supposed to catch. It would have, if I had bothered to ask the right question. Claude reviewed the change and approved it. Codex would have approved it on syntactic and Apache-doctrine grounds. Neither was prompted to ask: "is this file actually being served?" because I did not include that in the prompt. Cross-provider review catches reasoning errors a single model would gloss over. It does not compensate for a wrong premise. That responsibility stays with me.

## Key Takeaways

1. **Three models, three jobs**: orchestrator (Claude), reviewer (Codex), large-context reader (Gemini). Use the right one for the task. Do not run all three on every change.
2. **Cross-provider review is structural, not ornamental**: the value is that the second model did not write the first answer. A single model will rarely robustly critique its own output.
3. **The hosting environment is part of the codebase**: shipping `.htaccess` to a non-Apache host is a category error, not a typo. Configure for what is actually serving the bytes.
4. **Karabiner does the heavy lifting on a Mac migration**: a weekend of remap rules buys years of not fighting the OS for Ctrl muscle memory.
5. **Build logs save the failure, not the fix**: the FTP 553 commit and the `Header always set` revert are more useful in the history than two clean builds would have been.

## Conclusion

The site does not look much different from a year ago. Underneath, almost nothing is the same. Different machine, different terminal stack, different review pipeline, different review model.

I am writing this paragraph from a Mac, in iTerm2, inside tmux, with three different language model providers running on adjacent terminals. None of that is the post. The post is a record of where things broke, and what the LLMs caught (and did not catch) along the way.
