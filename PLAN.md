# levihuff.net repositioning plan

Goal: lead with IT infrastructure as the core strength. AI ops stays on the
site as a smaller "staying current" layer. Infrastructure is the substance;
AI ops is never the headline.

## Information architecture

Nav: Home, Infrastructure, About, Projects, Resume, Blog, Contact.

| Page | Role |
|---|---|
| `/` | Infra-first hero, domain overview, featured infra work, small AI ops strip, contact band |
| `/infrastructure/` | Hub: infra projects, homelab services, secondary AI ops section |
| `/infrastructure/<slug>/` | Detail page per entry, generated from data |
| `/about/` | Narrative, education, experience, skills |
| `/projects/` | Software and co-op project portfolio (unchanged content, infra filter first) |
| `/resume/` | Resume page plus PDF download |
| `/blog/`, `/contact/` | Unchanged roles |

AI ops appears only as a bottom section on the infrastructure hub and a small
strip on the homepage. It does not get a nav item.

## Structural directions considered

1. **Domain hub plus data-driven entries (chosen).** One `/infrastructure/`
   hub organized by domain (imaging and deployment, automation, Active
   Directory, virtualization, homelab) with cards and detail pages generated
   from a single data file.
2. **Project-led case studies.** Three or four long case studies as primary
   nav items. Weaker: the strongest story here is breadth across domains plus
   a running homelab, not a small number of long writeups.
3. **Skill-matrix-led.** Skills grid as the spine. Weaker: reads like a
   duplicated resume and offers no proof artifacts.

Recommendation: direction 1. It matches how infrastructure hiring managers
scan (domains first, proof second), and the data model makes every future
project or homelab service one new structured entry with zero template work.

## Data model

All infrastructure, homelab, and AI ops content lives in `src/_data/infra.js`
(plain JavaScript, CommonJS). One entry per project or service:

```js
{
  slug: "windows-imaging-zero-touch",   // detail page URL segment
  name: "Windows imaging and zero-touch deployment",
  section: "infrastructure",            // infrastructure | homelab | ai-ops
  kind: "project",                      // project | service
  role: "Built and ran",                // one-line ownership statement
  stack: ["MDT", "WDS", "PXE"],
  status: "Production at two employers",
  summary: "One or two sentences for the card.",
  details: [{ label: "Context", text: "..." }],
  links: [{ label: "Write-up", url: "/blog/..." }],
  featured: true                        // surfaces on the homepage
}
```

Rendering:

- `src/_includes/components/infra-card.njk` renders every card.
- `src/infrastructure/index.njk` groups entries by `section`.
- `src/infrastructure/entry.njk` paginates the data file into one detail page
  per entry at `/infrastructure/<slug>/`.

Adding a new infra project or homelab service later is one new object in
`infra.js`. Nothing else changes.

## SEO

- Homepage title: `IT Infrastructure | Levi Huff`.
- Homepage meta description pairs "Levi Huff" with "IT infrastructure" in the
  first sentence.
- `/infrastructure/` is a second landing surface with the same pairing.
- Homepage JSON-LD Person gains a `knowsAbout` array (Active Directory,
  Windows deployment, PowerShell, Proxmox, and so on).

## Source-of-truth notes

- Employment dates and job titles come from `cv.md`: Tire Discounters
  "Infrastructure & Cybersecurity Co-op" (Aug 2022 to Dec 2022) and TQL
  "IT Support Intern" (Jan 2022 to Apr 2022). The Tier 1 helpdesk framing for
  TQL lives in description text, not the title, to stay consistent with the
  resume and LinkedIn.
- No pronouns displayed anywhere. No em dashes. No emoji, no italics
  (DESIGN.md).

## Roadmap

1. **Done in this pass:** `infra.js` data system, infrastructure hub and
   detail pages, infra-first homepage and nav, secondary AI ops section,
   recruiter-facing SEO, schema tests.
2. **Next:** per-entry images or diagrams (homelab topology), consolidate the
   `projects.json` "work" entries into `infra.js`, slim the projects page to
   software work.
3. **Then:** runbook-style blog posts per homelab service; CCNA progress
   notes on the infrastructure hub.
4. **Later:** regenerate the resume PDF to match the infra-first narrative;
   per-entry JSON-LD.
