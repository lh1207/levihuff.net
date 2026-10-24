# Career cleanup verification

PR integration addendum: branch `codex/support-credibility-cleanup` merges main at `195efec`. Newer dependencies, articles, UI improvements, canonical entity graph, and source-reviewed AeroAssist case study are preserved. FAQ, entity metadata and llms guide are reconciled with the audited career narrative. The integrated branch passes 178 tests across five files; the snapshot results below describe the earlier Documents-only implementation.
15 October 2026. Requested checkout: `/Users/levi/Documents/Development/levihuff.net`, based on `3492ab1`.

## Result and audit
The site now leads with help desk, IT support, and desktop support. Recent Kroger customer service and earlier IT internships appear before software projects. The dark/amber identity and existing site architecture remain.

[Pass 1 claim matrix](credibility-audit-2026-10-14.md) records original wording, classifications, evidence, exact sources, and actions. It was completed before website edits. This report records the second review and staged browser verification. The reviewed files are applied to the requested checkout, where tests, build, and internal link checks also pass. Nothing is published by this task.

## Removed
- Employee, location, ticket, order, event, uptime, percentage, timing, and improvement figures without traceable evidence.
- A+ and ITF+ earned-credential claims: no certificate, badge, or exam evidence found. This does not establish that they are false.
- Graduation month and GPA: no registrar evidence; conflicting month in secondary records.
- Production ownership, security/compliance guarantees, inflated proficiency, and company-wide responsibility.
- Unsupported tool lists, proposed project features presented as implemented, duplicate professional project cards, and the unimplemented UCRelief concept.
- Historical AI-post cost/token tables, performance comparisons, deployment timing, hardware measurements, platform-policy assertions, and routing-frequency claims: supporting records were not found. General troubleshooting guidance and inspected implementation details replace them.
- The unverified Handshake URL.

## Narrowed
- Internship duties use support/assistance language; self-reported titles and historical dates remain traceable to the original resume.
- Kroger remains recent customer service and order fulfillment. No current employment end date, IT duties, or performance metric is inferred.
- AeroAssist distinguishes an existing application from Levi's Docker/Compose contribution.
- Culinary Mastery and LocoQuest are academic team projects. Project features are not automatically personal achievements.
- Homelab descriptions establish configuration files and documented topology, not live status.
- Windows lab descriptions identify scripts and the recorded AD/DNS/DHCP checks. WDS/PXE runbooks are not treated as proof that later steps ran.

## Strong statements retained
| Statement | Evidence and limit |
|---|---|
| IT graduate; prior enterprise support; recent Kroger customer-facing work | Explicit task facts; institution/title/date details supported by the original resume. No independent employer or registrar verification claimed. |
| Windows, Active Directory, imaging, troubleshooting, ticketing, onboarding, endpoint/email support and PowerShell | Explicit user-supplied experience. |
| Currently studying for CompTIA Network+ | Explicit task fact, displayed under current learning, never as earned. |
| Washington Court House base; local first, Columbus preferred out of town, remote welcome | Explicit task preferences. |
| Personal PowerShell/Hyper-V setup and AD/DNS/DHCP configuration records | `ad-pxe-lab/scripts/`, `lab.config.psd1`, and `docs/phase-02-configuration-verification.txt`. |
| Container configuration work | Homelab Compose files and AeroAssist Docker/Compose commits and source. |
| Academic team contributions | LocoQuest README/commit history; Culinary Mastery repository and UC IT Expo Team 7 listing. |

## Stale information corrected
CCNA current-study references become Network+ study; Cincinnati residence becomes Washington Court House; software/infrastructure-only positioning becomes support-focused. Culinary Mastery uses React web/Express rather than unverified React Native/Cosmos/Firebase. Homelab topology and Hyper-V lab tools now match inspected artifacts. The site-build article now describes Eleventy 3, Tailwind compilation, current paths, tests, and the Node 22 workflow.

## Verification
- Baseline: 124/124 tests passed. Final staged source and requested checkout: **127/127 tests passed** across four Vitest files.
- `npm run build`: passed in staging and the requested checkout. The temporary staging copy has no Git metadata, so the existing CSS cache-version fallback logs “not a git repository” and uses `dev`; the target-checkout build does not have this warning.
- Git initially treated the ReportLab PDF as text and flagged valid PDF whitespace. `.gitattributes` now marks PDFs as binary, preventing text normalization; no PDF bytes were altered to silence the check.
- `npm run lint`: unavailable; the existing package has no lint script. This predates the changes. JavaScript/Python syntax checks passed.
- Clean generated output: **90 HTML pages, 2,131 internal link/fragment checks, zero failures**.
- Public profile, project, and evidence URLs checked. All listed project repositories resolve. LinkedIn returned its automated-access block (999). Four GitHub file requests returned rate limiting (429); those files were confirmed through the repository connector. Additional Reddit project source files and directories also resolve through the connector or HTTP checks. No missing project repository found.
- PDF: one page, selectable text, visually inspected, six link annotations checked. Download returns HTTP 200 and `application/pdf`.
- Chromium: Home, About, Projects, Labs, Contact, lab detail, and Blog checked at **1440, 390, and 320 px**. No horizontal page overflow, broken images, or clipped visible paragraph text. Screenshots updated under `docs/screenshots/`; additional review captures stay in staging.
- Mobile menu: opens with correct expanded state, focuses first item, closes with Escape, returns focus to toggle.
- Keyboard: skip link is visible with a 3px focus outline, focuses `main-content`, and clears the sticky header.
- Project filters announce two infrastructure and three software projects; all five projects render without JavaScript.
- No page errors or failed resource requests during final main-page browser sweep.
- Metadata and JSON-LD reviewed: support-focused title/description, consistent Open Graph, WCH location, no unverified job title or earned credential.
- Stale-term searches reviewed manually across source, docs, tests, and tracked configuration. Remaining “enterprise” is the explicit user-confirmed background; “employees” is a generic internship-support sentence; percentages in CSS and template delimiters are code; prohibited strings in tests and the audit are intentional. Ignored nested historical worktrees and the preserved unpublished email draft are outside the active site's content.
- Existing unpublished email draft, images, `.eleventyignore`, `.codex/`, and `vault/` are not part of the copy manifest.

## UX fixes discovered during verification
Project details now stack labels above text so three-column cards remain readable. AeroAssist's logo uses contain sizing. The back-to-top button respects its hidden state instead of covering an initial-page CTA. Anchor offsets and a focusable main element improve keyboard navigation.

## Remaining uncertainty and limits
Employment titles/dates and narrow duties are self-reported career records, cross-checked against task facts where possible; no employer records were located. Kroger's current employment status remains unspecified. No earned credential is asserted. UC institution attribution is resume/photo-supported rather than independently registrar-verified. LinkedIn content and access could not be verified automatically. Lab files are bounded evidence, not a live service or complete deployment audit. Browser checks establish accessibility basics, not a formal WCAG certification or measured performance guarantee. General learning guides are not presented as proof of completed work; historical AI articles were narrowed during the final audit, with original dates and URLs preserved.

## Next improvements, ranked by recruiter impact
1. Supply credential verification links or exam certificates, plus confirmed employment dates, so earned certifications and a complete timeline can be restored accurately.
2. Align the external GitHub profile and LinkedIn/resume copies with this support narrative; GitHub still contains stale CCNA/A+ self-report outside this repository.
3. Add a small support case study with redacted screenshots, exact commands, the diagnosed fault, and observed verification. Prefer original lab evidence over illustrative stock photos.
4. Reconcile the Documents checkout with newer repository/remote work before publication, preserving this audit and the unpublished email draft. The task does not merge or deploy either checkout.

## Files changed
- `.gitattributes`
- `CLAUDE.md`
- `DESIGN.md`
- `PLAN.md`
- `README.md`
- `docs/credibility-audit-2026-10-14.md`
- `docs/screenshots/blog.png`
- `docs/screenshots/homepage.png`
- `docs/screenshots/infrastructure.png`
- `docs/screenshots/projects.png`
- `scripts/build-resume.py`
- `src/_data/career.json`
- `src/_data/experience.json`
- `src/_data/infra.js`
- `src/_data/navigation.json`
- `src/_data/projects.json`
- `src/_data/retiredInfrastructure.json`
- `src/_data/site.json`
- `src/_data/skills.json`
- `src/_data/tools.json`
- `src/_includes/components/project-card.njk`
- `src/_includes/css/tailwind.css`
- `src/_layouts/base.njk`
- `src/about.njk`
- `src/blog/aeroassist-docker-support.md`
- `src/blog/aeroassist-ticketing-system.md`
- `src/blog/culinary-mastery-educational-cooking-app.md`
- `src/blog/deploying-openclaw-windows-wsl2.md`
- `src/blog/full-stack-development-fundamentals.md`
- `src/blog/how-this-site-works.md`
- `src/blog/index.njk`
- `src/blog/indexing-my-reddit-saves-without-the-api.md`
- `src/blog/locquest-android-geolocation-app.md`
- `src/blog/owning-my-ai-memory.md`
- `src/blog/rebuilding-my-dev-setup-with-three-llms.md`
- `src/blog/spending-the-fable-window.md`
- `src/blog/systems-administration-learning-path.md`
- `src/blog/tire-discounters-it-support.md`
- `src/blog/total-quality-logistics-experience.md`
- `src/contact.njk`
- `src/files/Levi_Huff_Resume.pdf`
- `src/humans.txt`
- `src/index.njk`
- `src/infrastructure/index.njk`
- `src/infrastructure/retired.njk`
- `src/projects.njk`
- `test/build.test.js`
- `test/data.test.js`
- `docs/career-cleanup-verification-2026-10-15.md`
