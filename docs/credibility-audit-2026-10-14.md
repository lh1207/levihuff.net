# Career positioning and credibility audit

Pass 1, 14 October 2026. Source checkout: `/Users/levi/Documents/Development/levihuff.net`, HEAD `3492ab1`. No website content was changed during this pass. The other checkout at `/Users/levi/Repositories/levihuff.net` is not the implementation target.

## Evidence standard

VERIFIED means an implementation or independent artifact was inspected. SUPPORTED BUT SHOULD BE NARROWED means a source supports a smaller claim, not an outcome or broader responsibility. USER-CONFIRMED means explicitly supplied in this task. UNSUPPORTED means adequate evidence was not found; it does not mean the claim is false. STALE / INCORRECT means superseded or contradicted.

The existing site, its blog prose, and AI-generated vault summaries are not independent evidence. Git authorship alone does not prove a claim in the commit. A resume supports self-reported role history but does not verify metrics, credentials, production ownership, or the current employment end date. Code proves implemented behavior, not successful deployment or individual ownership of all team work.

## Sources

- U: User's task, 14 October 2026: B.S. IT graduate; prior enterprise support; recent Kroger customer service; Windows, AD, imaging/deployment, ticketing, hardware troubleshooting, onboarding/endpoint/email support, PowerShell; current Network+ study; Washington Court House base, local first, Columbus preferred out of town, remote acceptable.
- R: `src/files/Levi_Huff_Resume.pdf`, page 1, before this change. Exact text captured in `/private/tmp/levihuff-original-resume.txt`. Self-reported career record, not independent credential/metric evidence.
- P: `src/images/about/graduation-ceremony.jpg`, `graduation-portrait.jpg`, `tql-office.jpg`, and band photographs. Contextual visual evidence, not a transcript, graduation-date record, employment verification, or proof of every named performance.
- H: `git log -- src/files/Levi_Huff_Resume.pdf src/_data/experience.json src/about.njk`. Existing history repeats the claims; it does not substantiate measurements.
- C: Targeted workspace search of Documents/Development and relevant global-vault career material found no certificate, badge URL, transcript, employer performance report, or measured before/after deployment record. Vault `wiki/areas/Career.md` also records a graduation-month discrepancy; treated as a reason for caution, not proof of a new date.
- S: Site implementation: `package.json`, `eleventy.config.cjs`, templates, data, tests and Git history. Establishes this site's Eleventy/Tailwind/Nunjucks implementation and its actual accessibility features, not blanket conformance.

Source locations below refer to the original checkout. Related duplicates are grouped so a repeated claim receives the same decision everywhere, including the PDF, image alternatives and generated metadata.

## Career, credentials and positioning

| Current text / location | Classification | Evidence found / exact source | Action |
|---|---|---|---|
| "IT infrastructure professional"; "I build and run IT infrastructure" (`src/index.njk`, `about.njk`, homepage Person `jobTitle`) | SUPPORTED BUT SHOULD BE NARROWED | U confirms support background, not current infrastructure ownership | REPLACE with IT graduate seeking help desk / desktop / IT support; omit employment-like JSON-LD job title |
| "B.S. Information Technology, University of Cincinnati" (`index.njk`, `about.njk`, R) | USER-CONFIRMED degree; SUPPORTED BUT SHOULD BE NARROWED institution | U confirms degree; R Education and P support institution | KEEP degree prominently; no invented verification claim |
| "May 2026", "GPA: 3.56" (`site.json:5`, `about.njk`, R) | UNSUPPORTED exact date/GPA | R only; no transcript; C notes conflicting month | REMOVE month and GPA; retain graduate status from U |
| Software/Application Development track; long coursework list (`about.njk`, R Education) | SUPPORTED BUT SHOULD BE NARROWED | R self-report only | NARROW to short education description; avoid coursework dump and course-completion claims |
| "CompTIA A+", "Dec 2025"; "IT Fundamentals+", "Apr 2024" (About, home, infrastructure, JSON-LD, R) | UNSUPPORTED earned credentials | R and site repetitions only; C found no credential artifact | REMOVE from visible copy, PDF and `hasCredential`; restore only with evidence |
| "Cisco CCNA in progress" (home, About, infrastructure, R, `PLAN.md`) | STALE / INCORRECT | U explicitly supersedes it | REPLACE with "Currently studying for CompTIA Network+" under current learning, never earned credentials |
| Washington Court House, Ohio base | USER-CONFIRMED | U | KEEP |
| "Cincinnati, Ohio, USA" (`src/humans.txt:3`) | STALE / INCORRECT | U | UPDATE base to Washington Court House |
| Infrastructure/sysadmin/software targets; hybrid Dayton/Columbus (`about.njk`, `contact.njk`, DESIGN/PLAN) | STALE / INCORRECT | U | REPLACE with support roles; local first, Columbus preferred out of town, remote acceptable |
| Co-op/internship at Tire Discounters and Total Quality Logistics, 2022 (`experience.json`, R Experience) | SUPPORTED BUT SHOULD BE NARROWED | R names employers, titles and dates; U confirms prior enterprise support | KEEP explicitly as internships; no ownership upgrade |
| "Engineered PowerShell scripts", "Designed and shipped" AD automation (`experience.json`, `infra.js`) | SUPPORTED BUT SHOULD BE NARROWED | U confirms AD/PowerShell; R describes provisioning | NARROW to supported AD/PowerShell tasks; separate later personal lab code from employer work |
| "1,200+ employees", "180+ locations", "40%" (experience, projects, infra, home, R) | UNSUPPORTED | No employer scope record or measurement; R/H repetitions only | REMOVE all numbers and implied organization-wide responsibility |
| "Built in production at two employers", "zero-touch", "2 hours to under 20 minutes" (home, projects, infra, R) | UNSUPPORTED ownership/outcome; SUPPORTED BUT SHOULD BE NARROWED imaging | U confirms imaging; R reports MDT/PXE involvement | NARROW to assisted Windows imaging/deployment; REMOVE timing and zero-touch production claims |
| Lenovo drivers, domain enrollment, standardized GPO across HQ/regional offices (experience, infra, Tire blog, R) | SUPPORTED BUT SHOULD BE NARROWED | R reports tasks, no employer artifacts; blog is not corroboration | Retain only basic imaging/AD/onboarding involvement; REMOVE policy ownership and specific automation outcomes |
| "50+ workstations", "90%" same-day hardware tickets, "200+" Jira cases (experience, infra, R) | UNSUPPORTED | No ticket export or inventory; R only | REMOVE counts, turnaround and knowledge-base outcome |
| "Fortune 500", "10,000+ employee" TQL (experience, infra, R) | UNSUPPORTED | No qualifying source; employer scale does not prove intern scope | REMOVE both; use employer name and IT support intern title |
| Full hardware lifecycle / "certified disposal" / "managed" decommissioning (experience, projects, TQL blog, R) | SUPPORTED BUT SHOULD BE NARROWED | R supports hardware work, not disposal certification or ownership | NARROW to hardware troubleshooting, setup and preparation for retirement; omit certified destruction |
| Ticket backlog, onboarding documentation, on-site/remote support (experience, Tire blog, R) | SUPPORTED BUT SHOULD BE NARROWED | R plus U support tickets/onboarding; no before/after report | Use "worked on support tickets" / "helped with onboarding"; no backlog-cleared or process-restored outcome |
| Kroger E-commerce Clerk, "Jan 2025 – Present" (experience, R) | USER-CONFIRMED recent employer/customer service; SUPPORTED BUT SHOULD BE NARROWED title | U confirms recent work; R title | KEEP recent customer-facing e-commerce work; do not infer ongoing employment or invent IT duties |
| Kroger "98%+", "51%+", "100+ daily orders" (experience, R) | UNSUPPORTED | No order records or defined measures | REMOVE numbers; customer interaction and order fulfillment only |
| UC Event Staff; "100+ events", "99% uptime", "46,000+ students" (experience, R) | SUPPORTED BUT SHOULD BE NARROWED role; UNSUPPORTED scale/outcome | R self-report; no event or uptime records | Retain a short event-support role if useful; REMOVE every number and university-wide service implication |
| UC RED Housing Desk Assistant; "Managed front desk operations" (experience, R) | SUPPORTED BUT SHOULD BE NARROWED | R describes parcels and front desk | NARROW to desk assistance, parcels and escalating concerns; secondary customer-facing role |
| Windows, AD, hardware, imaging, tickets, onboarding/endpoint/email, PowerShell | USER-CONFIRMED | U | KEEP, prioritized above development |
| Intune, Autopilot, SIEM, Zero Trust, endpoint security, Azure/macOS as OS, broad platform list (`skills.json`, `tools.json`, R) | UNSUPPORTED breadth / misleading taxonomy | Resume lists tools but provides no demonstrated tasks; U does not confirm them | REMOVE unsubstantiated tools; group retained skills by context |
| Named ticket platforms / remote tools (`skills.json`, R) | SUPPORTED BUT SHOULD BE NARROWED | Resume lists Jira/ServiceNow/SysAid/TeamViewer/RDP | Prefer ticketing and user support without implying equivalent depth in every product |
| "Technologies ... in production and co-op environments" above all tools (`index.njk`) | UNSUPPORTED blanket attribution | Mixes personal, academic and professional tools | REPLACE with context-specific skills; no proficiency ratings |
| "WCAG 2.1 AA, RFC 9116" (`src/humans.txt`) | UNSUPPORTED conformance | S shows features, not a conformance audit | REMOVE conformance claim; verify accessibility basics separately |
| "I can build" any script/API/full application (`about.njk`) | SUPPORTED BUT SHOULD BE NARROWED | Actual projects demonstrate bounded implementations | NARROW to scripting and software projects as additional background |
| Band membership, named events and dates; art/retro interests (About) | SUPPORTED BUT SHOULD BE NARROWED | Photos establish band/trombone context, not exact event list/dates; no independent interest evidence | Retain brief photo-supported music personality; remove unverified event list and unnecessary claims |
| Historical "As an IT student" (systems/full-stack blog) | SUPPORTED BUT SHOULD BE NARROWED | Articles have historical dates; U is now graduate | Preserve educational topics; remove ambiguous present-tense self-status |

## Pass 1 summary (career and site)

- Safe to retain: user-confirmed support background, degree, recent customer-facing work, location/role preferences and Network+ study; repository-proven implementation details with context.
- Narrow: role history from self-reported resume, job duties, team contributions, lab scope, tool depth, and security/accessibility descriptions.
- Remove: untraceable metrics, unsupported credentials, graduation month/GPA, production ownership, scale, blanket compliance and duplicated professional-project marketing.
- Update: CCNA, Cincinnati base in humans.txt, infrastructure/sysadmin-only targets and ambiguous student wording.
- Positioning problems: support experience is buried; Kroger is reduced to questionable metrics; infrastructure/AI tools dominate; PDF and JSON-LD repeat stronger claims than the evidence.
- Strengths to surface: customer-facing work alongside earlier support; Windows/AD/hardware/onboarding; actual PowerShell/deployment artifacts; a working ticketing application as secondary evidence of systems curiosity.

## Projects, infrastructure and articles

| Current text / location | Classification | Evidence found / exact source | Action |
|---|---|---|---|
| "Architected a three-provider AI development workflow" (`projects.json`, R) | UNSUPPORTED breadth and outcome | Local agent configs demonstrate tools, not the claimed effectiveness or authorship of an architecture | REMOVE prominent card; retain dated personal articles without treating them as credentials |
| "Proxmox Homelab & Docker Stack", migration from individual LXCs, upstream-failure isolation (`projects.json`, `infra.js`) | SUPPORTED BUT SHOULD BE NARROWED | `/Users/levi/Documents/Development/homelab/README.md:5-25,30-55,70-82`; `server/*/compose.yml`; Levi-authored Git history | NARROW to version-controlled service configurations; REMOVE migration/resilience outcomes |
| Pi-hole and BookStack "running in the Docker stack" (`infra.js`) | STALE / INCORRECT | Homelab README explicitly puts these in separate Proxmox LXCs; `reference/` files are examples | UPDATE topology in consolidated homelab entry; do not call examples deployed |
| "Running 24/7", every service monitored, all household devices, secure access with nothing exposed (`infra.js`, homepage) | UNSUPPORTED operational/security guarantees | Compose definitions and README are not live uptime/network evidence | REMOVE status and coverage guarantees; use configuration scope |
| Tailscale, Home Assistant current service entries (`infra.js`) | UNSUPPORTED current implementation | No matching implementation in inspected homelab source | REMOVE entries |
| Jellyfin, Homebridge, Uptime Kuma, Open WebUI (`infra.js`) | VERIFIED configuration only | Homelab `server/media/compose.yml`, `server/home/compose.yml`, `server/monitoring/compose.yml`, `server/ai/compose.yml` | KEEP as examples of Compose definitions in one lab entry; no current-running claim |
| "Ollama and Open WebUI deployed with Docker" (`infra.js`) | STALE / INCORRECT topology | Homelab README and `server/ai/compose.yml`: Open WebUI container; Ollama on separate Mac | NARROW and deprioritize; omit privacy/monitoring guarantees |
| "FOG Project and VMware Workstation Pro" active imaging lab (`infra.js:73-93`) | UNSUPPORTED this lab; replacement VERIFIED | Actual `ad-pxe-lab/scripts/{00-Test-HostReadiness,01-New-LabSwitch,02-New-LabParentDisk,03-New-LabVM}.ps1`, `lab.config.psd1` implement Hyper-V setup | REPLACE with personal Hyper-V/AD lab; distinguish WDS/PXE runbooks from executed steps |
| Hyper-V, AD DS, DNS and DHCP lab (missing strength) | VERIFIED bounded artifacts | `ad-pxe-lab/docs/phase-02-configuration-verification.txt`: dated 2026-07-22, DC01 domain/DNS/DHCP output and `Verification: Passed`; commit `2698a02` records phases 1–2 | ADD bounded configuration/transcript evidence; no production claim or later-phase claim |
| AeroAssist full-stack application with user/role management, automated routing, production-ready Docker, performance outcomes (projects, R, both AeroAssist articles) | VERIFIED ticket API/container files; UNSUPPORTED broader guarantees | `/Users/levi/Documents/Development/AeroAssist/Controllers/TicketController.cs`, `Services/TicketService.cs`, `AeroAssist.csproj`, `Dockerfile`, `docker-compose.yml`; Levi contribution commits `aaed9a4`–`285ecb0`, merge `dff52cb` | NARROW to C#/ASP.NET ticket operations, EF/SQL Server and Docker contribution; no production-use, RBAC/routing/security guarantee |
| LocoQuest "I built", Kotlin/Maps/Firebase, turn-by-turn navigation, offline and battery optimizations (projects and LocoQuest article) | VERIFIED code and team contribution; SUPPORTED BUT SHOULD BE NARROWED ownership; UNSUPPORTED extras | Public `lh1207/LocoQuest` main `daf62a85...`; `README.md` names Levi, Derrick Adkins, William Bohman; `app/src/main/java/com/locoquest/app/Home.kt` uses Google Maps and location APIs; Levi commit `b09633c...` changes Settings.kt | KEEP as academic team Android project; no sole ownership, turn-by-turn or optimization claims; omit Firebase unless actual implementation inspected |
| Culinary Mastery "React Native", "Azure Cosmos DB", Firebase + Azure 2FA, "secure Azure backend" (projects, R, article) | STALE / INCORRECT stack; UNSUPPORTED guarantees | Public `package.json` blob `38fb275...` uses React/React DOM/Vite/Express/mssql; `server/app.js` mounts Express routes; `server/services/geminiService.js` imports GoogleGenAI | REPLACE with React web/Node/Express implementation; REMOVE unverified Azure/Firebase/security/compliance claims |
| Culinary Mastery Team 7 / IT Expo 2025 | VERIFIED | [UC IT Expo project](https://itexpo.live/2025/seniors/280/) names Levi Huff; [public repository](https://github.com/24-25-UC-Senior-Design-Group-7/Culinary-Mastery); Levi Dockerfile commit `0941c412...` | KEEP team credit and project-level video/AI integration; no personal ownership of every feature |
| Culinary "62.5%", comprehensive OWASP/NIST/CISA security, compliance, forums/personalized paths, individual feature ownership (article) | UNSUPPORTED | No cited study/audit/feature-contribution evidence | REMOVE; rewrite article as a concise team-project record with source links |
| UCRelief concept; $26,160/$36,900 student-loan figures (`projects.json`) | UNSUPPORTED and weak relevance | No implementation evidence; unreferenced time-dependent statistics | REMOVE card and statistics |
| Four duplicated professional project cards and their efficiency/downtime claims (`projects.json`) | SUPPORTED BUT SHOULD BE NARROWED tasks; UNSUPPORTED outcomes | U/R support basic employment tasks, no measured outcome | CONSOLIDATE into experience, remove duplicated marketing cards |
| "Managed" full lifecycle, processor retirement chronology and certified-disposal methods (TQL article) | SUPPORTED BUT SHOULD BE NARROWED / UNSUPPORTED detail | R/U only support basic support/imaging/hardware work; post is not corroboration | Rewrite bounded internship account; remove disposal certification and technical overgeneralization |
| Tire blog ownership, eliminated manual work and restored support reliability | SUPPORTED BUT SHOULD BE NARROWED | U/R support duties only | Rewrite bounded support/onboarding/imaging account without results claims |
| Project stock photos described as app screenshots (`projects.json`, articles) | UNSUPPORTED visual implication | Image descriptions do not establish screenshots | Use literal/decorative alternatives; no image presented as proof of project UI |
| Site implementation article `.eleventy.js` / `src/css` | STALE / INCORRECT | S uses `eleventy.config.cjs` / `src/_includes/css/tailwind.css` | UPDATE paths; retain dated technical narrative |
| Other dated AI/Reddit/memory/accessibility articles | SUPPORTED BUT SHOULD BE NARROWED as evidence | Personal narratives and general guidance are not employment/credential proof | Keep only traceable implementation details and clearly framed general guidance; a publication date does not substantiate a factual claim |

## Pass 1 closeout

The audit is complete before website edits. Baseline: 124/124 tests pass. `npm run lint` fails because no lint script is configured; this predates the changes. The public GitHub profile resolves and repeats the degree as self-report, not independent verification. Its CCNA/A+ statements also remain self-report and the CCNA text is stale. LinkedIn and Handshake could not be fully fetched; do not claim their profile contents verified. Keep the established LinkedIn link, remove the unverified Handshake path if it cannot be checked.

Implementation priorities: (1) support-first homepage/About/contact and matching PDF, (2) remove metrics and earned credentials without evidence, (3) distinguish internships, personal lab artifacts and academic team projects, (4) correct technical stacks and articles, (5) verify generated metadata, links, keyboard/mobile behavior and unchanged unpublished material. These decisions do not authorize publication; changes remain local.

## Pass 2 residual findings

The final review expanded the generic historical-blog row above. These findings were recorded during implementation, not retroactively presented as Pass 1 evidence.

| Original claim | Classification | Evidence and source | Action |
|---|---|---|---|
| Fable free-window dates, named model routing, usage table, dollar costs, 2.04x comparison, fewer-turns conclusions (`spending-the-fable-window.md`) | UNSUPPORTED | No retained usage/session records or controlled comparison found; site prose is not proof | REMOVE comparisons and model attribution; replace with a source-linked review/checklist article, preserving original date and URL |
| OpenClaw wizard failures, schema and context minimum, GPU 8GB/7GB/800MB/5.2GB figures, guaranteed fixes and runtime reliability (`deploying-openclaw-windows-wsl2.md`) | UNSUPPORTED | No versioned configuration, output, or measurement supporting this account | REPLACE with clearly framed troubleshooting guidance; no completed-deployment claim |
| 63 Karabiner entries, GPU figures, model capability/context claims, 40-second deployment, old config path (`rebuilding-my-dev-setup-with-three-llms.md`) | UNSUPPORTED measurements; STALE path | Current site code/workflow proves configuration and build steps only | REPLACE with inspected repository organization and verification practices |
| Reddit policy date, pagination ceiling, privacy/no-cost guarantees, live successful calls (`indexing-my-reddit-saves-without-the-api.md`) | UNSUPPORTED broad/runtime claims; VERIFIED implementation subset | Local `reddit-kb` source: FastMCP tools, cookie-configured requests, Chroma persistence, Ollama calls, Docker configuration, tests | NARROW to code-backed functionality; no live, privacy, cost or policy guarantee |
| “Daily work” in Windows/AD, running homelab, universal AI-memory/export behavior (`owning-my-ai-memory.md`) | STALE / INCORRECT current career; UNSUPPORTED platform breadth | User confirms earlier support and recent Kroger; files establish homelab configuration and Markdown workflow only | UPDATE career chronology and NARROW platform/memory discussion |
