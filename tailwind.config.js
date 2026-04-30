/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.njk',
    './src/**/*.md',
    './src/**/*.html',
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
    },
    extend: {
      // All 15 theme color pairs are defined as CSS variables in tailwind.css.
      // Using RGB triplets so Tailwind's opacity modifier (bg-primary/50) works.
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark:    'rgb(var(--color-primary-dark) / <alpha-value>)',
          light:   'rgb(var(--color-primary-light) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          border:  'rgb(var(--color-accent-border) / <alpha-value>)',
        },
        ink:         'rgb(var(--color-text) / <alpha-value>)',
        'ink-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        'ink-faint': 'rgb(var(--color-text-light) / <alpha-value>)',
        canvas:          'rgb(var(--color-bg) / <alpha-value>)',
        'canvas-raised': 'rgb(var(--color-bg-white) / <alpha-value>)',
        'canvas-subtle': 'rgb(var(--color-bg-subtle) / <alpha-value>)',
        stroke:        'rgb(var(--color-border) / <alpha-value>)',
        'stroke-faint':'rgb(var(--color-border-light) / <alpha-value>)',
        'code-surface':'rgb(var(--color-code-bg) / <alpha-value>)',
        'code-fg':     'rgb(var(--color-code-text) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', '"Cascadia Code"', '"Roboto Mono"', 'Consolas', 'monospace'],
      },
      // Site uses 0.8rem (xs) and 0.9rem (sm) — slightly larger than Tailwind defaults.
      // text-base through text-4xl happen to match Tailwind's defaults so no override needed.
      fontSize: {
        xs: ['0.8rem',  { lineHeight: '1.4' }],
        sm: ['0.9rem',  { lineHeight: '1.5' }],
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
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      // Shadows reference CSS variables so dark-mode opacity changes happen automatically.
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      maxWidth: {
        site:  '1100px',
        prose: '70ch',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
      },
    },
  },
  plugins: [],
}
