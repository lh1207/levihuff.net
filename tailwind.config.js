/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.njk',
    './src/**/*.md',
    './src/**/*.html',
  ],
  // Classes injected at build time (not in source files) that Tailwind would otherwise purge.
  safelist: [
    'header-anchor',
  ],
  // data-theme="dark" is set on <html> by the inline bootstrap script in base.njk
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    // Override Tailwind's default breakpoints to match the existing site thresholds.
    // max-width: 480px  → default (mobile-first base) / sm: 481px+
    // max-width: 800px  → sm / md: 801px+
    screens: {
      sm: '481px',
      md: '801px',
      lg: '1101px',
    },
    extend: {
      // All 15 theme color pairs are defined as CSS variables in tailwind.css.
      // Using RGB triplets so Tailwind's opacity modifier (bg-primary/50) works.
      colors: {
        // Design system tokens (DESIGN.md)
        surface: {
          0:     '#0a0b0d',
          1:     '#111317',
          2:     '#181b21',
          3:     '#20242c',
          inset: '#07080a',
        },
        fg: {
          1: '#e8eaed',
          2: '#b4b8c0',
          3: '#7c828d',
          4: '#4f545d',
        },
        hair: {
          1: '#25292f',
          2: '#2f343c',
          3: '#3a4049',
        },
        amber: {
          DEFAULT: '#f5a524',
          hi:      '#ffba3d',
          lo:      '#b87a14',
          tint:    'rgba(245,165,36,0.10)',
          edge:    'rgba(245,165,36,0.32)',
        },
        ok:   '#4ade80',
        warn: '#f5a524',
        err:  '#ef4444',
        info: '#60a5fa',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', '"Cascadia Code"', '"Roboto Mono"', 'Consolas', 'monospace'],
        // Design system fonts (DESIGN.md)
        syne: ['"Syne"', 'system-ui', 'sans-serif'],
        plex: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        jb:   ['"JetBrains Mono"', '"SF Mono"', 'Monaco', 'monospace'],
      },
      // Site uses 0.8rem (xs) and 0.9rem (sm) — slightly larger than Tailwind defaults.
      fontSize: {
        xs: ['0.8rem',  { lineHeight: '1.4' }],
        sm: ['0.9rem',  { lineHeight: '1.5' }],
        // Design system scale overrides (DESIGN.md §4) — 3xl/4xl/5xl diverge from Tailwind defaults
        'mono-xs': ['11px', { lineHeight: '1.5', letterSpacing: '0.04em' }],
        'mono-sm': ['12px', { lineHeight: '1.5' }],
        '3xl':     ['32px', { lineHeight: '1.25' }],
        '4xl':     ['44px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        '5xl':     ['64px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
      },
      // Named spacing tokens map 1-to-1 to the --space-* custom properties.
      spacing: {
        xs:   '0.25rem',
        sm:   '0.5rem',
        md:   '1rem',
        lg:   '1.5rem',
        xl:   '2rem',
        '2xl':'3rem',
        '3xl':'4rem',
      },
      borderRadius: {
        sm:   '4px',
        md:   '6px',
        lg:   '8px',
        xl:   '12px',
        pill: '999px',
        // Design system radii (DESIGN.md §6) — d-lg is 10px (sharper industrial tone)
        'd-sm':  '4px',
        'd-md':  '6px',
        'd-lg':  '10px',
        'd-pill':'999px',
      },
      // Shadows reference CSS variables so dark-mode opacity changes happen automatically.
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        // Design system shadow presets (DESIGN.md §7) — dark surface recipes
        'd-sm':     '0 1px 0 rgba(255,255,255,.02) inset, 0 1px 2px rgba(0,0,0,.4)',
        'd-md':     '0 1px 0 rgba(255,255,255,.03) inset, 0 4px 12px rgba(0,0,0,.45)',
        'd-lg':     '0 1px 0 rgba(255,255,255,.04) inset, 0 12px 32px rgba(0,0,0,.6)',
        'd-accent': '0 0 0 1px rgba(245,165,36,0.32), 0 8px 24px rgba(245,165,36,.18)',
      },
      maxWidth: {
        site:  '1100px',
        prose: '70ch',
      },
      transitionDuration: {
        fast: '120ms',
        base: '180ms',
        slow: '280ms',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
