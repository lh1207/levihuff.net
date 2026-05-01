# Levi Huff — DESIGN.md

A consolidated, single-file export of the Levi Huff design system. Drop this in a repo and a developer can rebuild the look without external context.

**Owner:** Levi Huff · Cincinnati, OH · [levihuff.net](https://levihuff.net) · [github.com/lh1207](https://github.com/lh1207)
**Source:** [`lh1207/levihuff.net`](https://github.com/lh1207/levihuff.net) (Eleventy + Tailwind)
**Posture:** dark-first, industrial-technical. One warm-amber accent. Monospace for technical callouts. No emoji, no gradients, no italics.

---

## 1. Brand snapshot

Personal portfolio for an early-career IT and software development professional, graduating May 2026 from the University of Cincinnati (BS Information Technology). Targets AI ops and infrastructure support roles — bridging traditional IT (helpdesk, Active Directory, Windows imaging, networking) with modern AI deployments (Ollama, Docker, Proxmox, local LLM inference).

> Reads like field notes from someone who actually maintains the systems they describe.

---

## 2. Content fundamentals

**Voice.** Confident, technically grounded, early-career but never junior-feeling. Specifics over abstractions. Verbs over adjectives.

**Person.** First-person ("I built…", "I focus on…") for biographical and project copy. Second-person only on direct CTAs. Never "we" — it's a personal site.

**Casing.**
- Sentence case for headings and buttons (`Get in touch`, not `Get In Touch`).
- Title Case for proper nouns (`Active Directory`, `AeroAssist`, `Tire Discounters`).
- UPPERCASE reserved for short uppercase mono labels (`STATUS`, `STACK`, `04 / RESUME`).

**Canonical voice samples** (lifted from production copy):

> "Engineered PowerShell scripts for Active Directory provisioning at a 1,200+ employee organization, reducing manual setup time by 40%."

> "I focus on understanding how systems are used in practice before making changes, with attention to maintainability, clarity, and user impact."

> "Built a new MDT image that automated Lenovo driver installation, domain controller enrollment, and Windows 11 upgrades."

Each sentence has a verb, names a real system, and quantifies or qualifies the outcome. That's the formula.

**Avoid:** "passionate about technology", "synergize", "leverage", "innovative solutions", "cutting-edge", "🚀 crushing it", "in today's fast-paced world", "click here", "learn more".

**Numbers.** Always specific when describing impact (`40%`, `1,200+`, `180+ retail locations`, `200+ tickets`). Never approximate when a real count exists.

**Technical names.** Exact: `Windows Server`, `Active Directory`, `MDT`, `SCCM`, `BitLocker`, `Proxmox`, `Ollama`, `Docker`, `PXE boot`, `UEFI`. Never genericize.

**Emoji.** None — body, headings, CTAs, anywhere.

**Punctuation.** Em-dash (—) for asides, en-dash (–) for ranges (`Aug 2022 – Dec 2022`), Oxford comma always, ≤1 exclamation point per page (ideally zero).

**CTA copy.** Direct verb. `View projects`, `Read blog`, `Get in touch`, `Download PDF`.

---

## 3. Color tokens

Dark is the default. Light is opt-in via `[data-theme="light"]`.

### Surfaces (dark)

| Token | Hex | Use |
|---|---|---|
| `--bg-0` | `#0a0b0d` | page void |
| `--bg-1` | `#111317` | main canvas |
| `--bg-2` | `#181b21` | raised card |
| `--bg-3` | `#20242c` | hover / pressed surface |
| `--bg-inset` | `#07080a` | recessed: code blocks, inputs |

### Foreground (warm-leaning whites — never pure)

| Token | Hex | Use |
|---|---|---|
| `--fg-1` | `#e8eaed` | primary text |
| `--fg-2` | `#b4b8c0` | secondary text |
| `--fg-3` | `#7c828d` | tertiary / metadata |
| `--fg-4` | `#4f545d` | disabled, dividers-on-text |

### Borders

| Token | Hex | Use |
|---|---|---|
| `--border-1` | `#25292f` | default hairline |
| `--border-2` | `#2f343c` | hover hairline |
| `--border-3` | `#3a4049` | strong / focus |

### Accent — single warm amber

| Token | Value | Use |
|---|---|---|
| `--accent` | `#f5a524` | links, primary CTA, focus ring, mono accent labels |
| `--accent-hi` | `#ffba3d` | hover |
| `--accent-lo` | `#b87a14` | pressed / on-light |
| `--accent-tint` | `rgba(245,165,36,0.10)` | soft fill (tags, hovers) |
| `--accent-edge` | `rgba(245,165,36,0.32)` | tinted border |

**No second accent.** **No gradients.** Closest the system gets is `--accent-tint` on hovered surfaces.

### Status (terminal-derived, used only for genuine state)

| Token | Hex | Use |
|---|---|---|
| `--ok` | `#4ade80` | uptime, success |
| `--warn` | `#f5a524` | warning (shares accent — intentional) |
| `--err` | `#ef4444` | error |
| `--info` | `#60a5fa` | information |

### Light mode (opt-in)

`bg-0 #ffffff` · `bg-1 #f5f6f7` · `bg-2 #ffffff` · `fg-1 #1a1a1a` · `border-1 #e2e4e8` · `--accent #b87a14` (darkened for AA contrast on white).

---

## 4. Type system

Three families, three jobs. **No italics anywhere** — italic font files are intentionally not loaded. Emphasis = weight (600/700) or uppercase mono label.

| Family | Role | Weights |
|---|---|---|
| **Syne** | display headings (h1, h2, large numerals, hero) | 600–800 |
| **IBM Plex Sans** | body, h3, h4, leads, secondary text | 400–700 |
| **JetBrains Mono** | code, inline `code`, technical metadata, uppercase section labels (`STACK`, `IMPACT`, `STATUS`), terminal output | 400–600 |

All three are available on Google Fonts and are shipped as variable TTFs.

### Scale (modular ~1.2)

| Token | px | Typical use |
|---|---|---|
| `--fs-mono-xs` | 11 | uppercase mono labels |
| `--fs-mono-sm` | 12 | mono metadata |
| `--fs-xs` | 12 | tags, small meta |
| `--fs-sm` | 14 | secondary text |
| `--fs-md` | 16 | body |
| `--fs-lg` | 18 | lead paragraph |
| `--fs-xl` | 20 | h4 |
| `--fs-2xl` | 24 | h3 |
| `--fs-3xl` | 32 | h2 |
| `--fs-4xl` | 44 | h1 |
| `--fs-5xl` | 64 | display, error code, hero numerals |

**Line heights:** `1.1` tight (display) · `1.25` snug (h2/h3) · `1.5` normal · `1.7` relaxed (body).

**Tracking:** `-0.02em` on display, `0` body, `+0.04em` on uppercase mono labels.

### Semantic type classes

```css
.t-display   /* Syne 64px / 700 / -0.02em */
.t-h1        /* Syne 44px / 700 */
.t-h2        /* Syne 32px / 600 */
.t-h3        /* Plex 24px / 600 */
.t-h4        /* Plex 20px / 600 */
.t-lead      /* Plex 18px / 400, fg-2 */
.t-body      /* Plex 16px / 400 / 1.7 */
.t-secondary /* Plex 14px / 400, fg-2 */
.t-meta      /* Mono 12px, fg-3 */
.t-label     /* Mono 11px UPPERCASE +0.04em, fg-3 */
.t-label-accent /* same, color: --accent */
.t-code      /* Mono 0.92em on bg-inset, 1px border, 4px radius */
```

---

## 5. Spacing & layout

4px base.

| Token | px |
|---|---|
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 12 |
| `--space-4` | 16 |
| `--space-5` | 24 |
| `--space-6` | 32 |
| `--space-7` | 48 |
| `--space-8` | 64 |
| `--space-9` | 96 |

**Section vertical rhythm:** `--space-7` (48px) default, `--space-8` (64px) on hero blocks.
**Card interior padding:** `--space-5` (24px) standard, `--space-6` (32px) on feature cards.
**Site max-width:** 1100px. **Prose max-width:** 70ch.
**Grids:** `auto-fill, minmax(320px, 1fr)` for project & blog grids.

---

## 6. Radii

| Token | px | Use |
|---|---|---|
| `--r-sm` | 4 | tags, inputs |
| `--r-md` | 6 | buttons, cards |
| `--r-lg` | 10 | large cards, modals |
| `--r-pill` | 999 | avatars only |

Nothing rounder than 10px on rectangles — sharper corners reinforce the industrial tone.

---

## 7. Elevation & shadows

Dark surfaces don't shadow well, so depth is achieved primarily through **surface layering** (`bg-1` → `bg-2` → `bg-3`), supplemented by:

```css
--shadow-sm: 0 1px 0 rgba(255,255,255,0.02) inset, 0 1px 2px rgba(0,0,0,0.4);
--shadow-md: 0 1px 0 rgba(255,255,255,0.03) inset, 0 4px 12px rgba(0,0,0,0.45);
--shadow-lg: 0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 32px rgba(0,0,0,0.6);
--shadow-accent: 0 0 0 1px var(--accent-edge), 0 8px 24px rgba(245,165,36,0.18);
```

The 1px inset highlight is what reads as "lit from above"; the drop is barely perceptible. `--shadow-accent` is reserved for the primary CTA and focused project cards.

---

## 8. Motion

Functional only. **No bounces, no spring physics, no parallax, no scroll-jacking, no AOS reveals.**

```css
--ease: cubic-bezier(0.2, 0.8, 0.2, 1);
--dur-fast: 120ms;   /* hover color shifts */
--dur-base: 180ms;   /* default transitions */
--dur-slow: 280ms;   /* theme toggle */
```

Honors `prefers-reduced-motion: reduce` (collapses to ~0ms).

### Hover, press, focus

- **Links:** color `--fg-1` → `--accent`, underline appears on hover.
- **Cards:** `translateY(-2px)`, border steps `--border-1` → `--border-2`, shadow upgrades `sm` → `md`.
- **Buttons (primary, filled):** background `--accent` → `--accent-hi`. **No** scale, **no** lift.
- **Buttons (secondary):** background `--bg-2` → `--bg-3`, border `--border-1` → `--border-2`.
- **Press:** `translateY(0)`, instant. No shrink, no bounce.
- **Focus-visible:** 3px amber outline, 2px offset. **Always visible** — never `outline: none`.

---

## 9. Backgrounds & imagery

- **Flat near-black canvas.** No textures, no patterns, no decorative blobs, no floating code-snippet ornaments, no aurora gradients.
- **No hand-drawn illustrations**, no isometric 3D, no people-pointing-at-laptops stock.
- **Photography is documentary** — warm-toned, slightly desaturated workspace shots, terminals, hardware. Used sparingly: profile, two about-page section images, per-project hero images.
- **Code blocks** recess into the page on `--bg-inset` (`#07080a`) like a real terminal cut into the surface.
- **Transparency & blur** used **only** for the sticky header (`backdrop-filter: blur(8px)` on `rgba(17,19,23,0.72)`) and modal scrims. Card backgrounds are flat — no frosted glass.

---

## 10. Iconography

**Style:** Lucide / Feather — 24×24 viewBox, 2px stroke, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`, `currentColor`.

**Sizing:**
- 16px — inline beside body text, footer social links
- 20px — header controls, button leading icons
- 24px — section headers, card metadata
- 32px — empty-state illustrations (rare)

**Filled exceptions:** brand marks (GitHub, LinkedIn) ship as filled glyphs.

**No emoji as icons. Ever.**

---

## 11. Components

| Component | Pattern |
|---|---|
| Sticky header | 72px tall, `backdrop-filter: blur(8px)` on `rgba(17,19,23,0.72)`, brand left + nav right + theme toggle. Active nav link gets a 2px amber under-bar. |
| Project card | Image-on-top, mono `STACK` label, h3 title, body, mono `View →` link. Hover lifts 2px. |
| Experience card | UPPERCASE mono eyebrow (`CO-OP` / `INTERN`), h3 company, mono date range, body. **No left-border accent** (the original site's trope; explicitly removed). |
| Skill group | h3 group heading, definition-list pairs (`<strong>label</strong>: text`). |
| Tag / pill | `--accent-tint` fill, `--accent-edge` border, mono uppercase, 4px radius. |
| Primary button | Amber fill, dark text (`#0a0b0d`), weight 600, 6px radius, no scale on hover. |
| Secondary button | `--bg-2` fill, `--border-1` stroke, `--fg-1` text. Hover: `--bg-3` + `--border-2`. |
| Inline code | `--bg-inset` fill, `--border-1` 1px stroke, JetBrains Mono 0.92em, 4px radius. |
| Section eyebrow | Uppercase mono label (`01 / IMPACT`), 11px, +0.04em tracking, often preceded by a `▸` glyph in `--accent`. |
| Status dot | 8px filled circle in `--ok` / `--accent` / `--err`, beside a mono label. Optional 4px tinted halo. |
| Terminal block | `--bg-inset` background, 1px border, mono content, prompt char (`$`) in `--accent`, comments in `#6a8b6e`, strings in `#b4d28a`. Optional 1-row chrome bar at top with status dot + path. |

---

## 12. Themes

Two themes, dark-first.

- **Dark (default):** all tokens defined on `:root`. This is the brand presentation.
- **Light:** opt-in via `<html data-theme="light">`. Same tokens, retuned for white surfaces. Accent darkens to `#b87a14` for AA contrast.

Theme toggle persists to `localStorage` (`theme` key) and respects `prefers-color-scheme` on first visit.

---

## 13. CSS skeleton (drop-in)

```css
@font-face { font-family:"Syne"; src:url("fonts/Syne-VariableFont_wght.ttf") format("truetype-variations"); font-weight:400 800; font-style:normal; font-display:swap; }
@font-face { font-family:"JetBrains Mono"; src:url("fonts/JetBrainsMono-VariableFont_wght.ttf") format("truetype-variations"); font-weight:100 800; font-style:normal; font-display:swap; }
@font-face { font-family:"IBM Plex Sans"; src:url("fonts/IBMPlexSans-VariableFont_wdth_wght.ttf") format("truetype-variations"); font-weight:100 700; font-style:normal; font-display:swap; }

:root {
  --bg-0:#0a0b0d; --bg-1:#111317; --bg-2:#181b21; --bg-3:#20242c; --bg-inset:#07080a;
  --fg-1:#e8eaed; --fg-2:#b4b8c0; --fg-3:#7c828d; --fg-4:#4f545d;
  --border-1:#25292f; --border-2:#2f343c; --border-3:#3a4049;
  --accent:#f5a524; --accent-hi:#ffba3d; --accent-lo:#b87a14;
  --accent-tint:rgba(245,165,36,0.10); --accent-edge:rgba(245,165,36,0.32);
  --ok:#4ade80; --warn:#f5a524; --err:#ef4444; --info:#60a5fa;

  --font-display:"Syne", system-ui, sans-serif;
  --font-sans:"IBM Plex Sans", system-ui, sans-serif;
  --font-mono:"JetBrains Mono", "SF Mono", Monaco, monospace;

  --r-sm:4px; --r-md:6px; --r-lg:10px; --r-pill:999px;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px;

  --shadow-sm:0 1px 0 rgba(255,255,255,.02) inset, 0 1px 2px rgba(0,0,0,.4);
  --shadow-md:0 1px 0 rgba(255,255,255,.03) inset, 0 4px 12px rgba(0,0,0,.45);
  --shadow-lg:0 1px 0 rgba(255,255,255,.04) inset, 0 12px 32px rgba(0,0,0,.6);
  --shadow-accent:0 0 0 1px var(--accent-edge), 0 8px 24px rgba(245,165,36,.18);

  --ease:cubic-bezier(.2,.8,.2,1);
  --dur-fast:120ms; --dur-base:180ms; --dur-slow:280ms;
}

:root[data-theme="light"] {
  --bg-0:#fff; --bg-1:#f5f6f7; --bg-2:#fff; --bg-3:#eef0f2; --bg-inset:#1a1a1a;
  --fg-1:#1a1a1a; --fg-2:#555; --fg-3:#777; --fg-4:#aaa;
  --border-1:#e2e4e8; --border-2:#c9ccd1; --border-3:#a8acb3;
  --accent:#b87a14; --accent-hi:#f5a524; --accent-lo:#8a5a0d;
}

html, body { background: var(--bg-1); color: var(--fg-1); font-family: var(--font-sans); }
*:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
::selection { background: var(--accent); color: #0a0b0d; }
@media (prefers-reduced-motion: reduce) { *,*::before,*::after { transition-duration:.01ms !important; animation-duration:.01ms !important; } }
```

---

## 14. Don't list (anti-patterns)

- Don't use emoji.
- Don't use italics — use weight or uppercase mono labels.
- Don't add a second accent color or any gradient.
- Don't use the original site's `.experience-card` left-accent-border. Use a mono eyebrow label above the title instead.
- Don't introduce purple, teal, or cyan accents. The system is amber-only.
- Don't replace photography with illustrations or 3D renders.
- Don't add scroll-triggered reveals, parallax, or springy animations.
- Don't write "passionate", "synergize", "leverage", "innovative", "cutting-edge", or "in today's fast-paced world".
- Don't remove focus outlines.
- Don't use pure white (`#ffffff`) text on dark — always `#e8eaed` or warmer.