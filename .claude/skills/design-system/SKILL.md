---
name: design-system
description: Apply the levihuff.net design system when styling anything. Use when editing templates, Tailwind classes, src/_includes/css/tailwind.css, or tailwind.config.js, or when reviewing visual changes for DESIGN.md compliance.
---

# Design system application

The full system is `DESIGN.md` (repo root). This skill is the working checklist; when in doubt, read the relevant DESIGN.md section before styling.

## Token map (DESIGN.md → Tailwind)

| DESIGN.md token | Tailwind utility |
|---|---|
| `--bg-0` … `--bg-3`, `--bg-inset` | `bg-surface-0` … `bg-surface-3`, `bg-surface-inset` |
| `--fg-1` … `--fg-4` | `text-fg-1` … `text-fg-4` |
| `--border-1` … `--border-3` | `border-hair-1` … `border-hair-3` |
| `--accent #f5a524` | `amber` (text-amber, bg-amber, outline-amber) |
| Syne / IBM Plex Sans / JetBrains Mono | `font-syne` / `font-plex` / `font-jb` |

Breakpoints are overridden: `sm: 481px`, `md: 801px`, `lg: 1101px`. Max widths: `max-w-site` (1100px), `max-w-prose` (70ch).

## Hard rules (violations fail review)

1. No emoji anywhere — copy, headings, buttons, icons.
2. No italics — emphasis is weight (600/700) or an uppercase mono label; italic font files are intentionally not loaded.
3. Amber is the only accent. No second accent color, no gradients, no purple/teal/cyan.
4. Focus rings always visible: `focus-visible:outline-[3px] focus-visible:outline-amber focus-visible:outline-offset-2`. Never `outline-none`.
5. Depth via surface layering (`bg-surface-1` → `2` → `3`), not shadows.
6. Sentence case for headings and buttons; UPPERCASE only for short mono labels (`STACK`, `STATUS`).
7. Every `<img>` has an `alt` attribute — `test/build.test.js` enforces this.
8. Motion is functional only: no bounces, no parallax, no scroll-jacking. Everything gated on `prefers-reduced-motion`.
9. Nothing rounder than 10px on rectangles; pill radius is for avatars only.
10. No pure white text on dark — `--fg-1` is `#e8eaed`.

## Procedure

1. Before styling, find an existing component in `src/_includes/components/` that already solves the pattern and match it.
2. Use utilities in templates; Tailwind scans `src/**/*.{njk,md,html}` and picks them up. Custom rules go in `src/_includes/css/tailwind.css` inside the appropriate `@layer` — never a new stylesheet.
3. Check the change against the hard rules above and DESIGN.md section 14 (the anti-pattern list).
4. Run `npm test`; the build test verifies CSS output is minified and non-empty.
