# Portfolio Redesign — "One Identity, Two Machines" (Terminal / Paper)

**Date:** 2026-06-07
**Owner:** Suresh Bhandari — Senior Backend & AI Engineer
**Status:** Approved design, pending spec review → implementation plan

---

## 1. Goal

Revamp the portfolio so it reads like the personal site of one of the strongest
backend/AI engineers of this generation: substance-first, metric-driven,
unmistakably "an engineer who operates systems," and visually distinctive without
falling into the cloned-template look.

The signature concept: **one portfolio, two complete Views of the same content.**
A `View` switch flips the *entire* layout, type system, color, and density — not
just a color palette. The two views are deliberate opposites:

- **Terminal** — warm-dark console. *"I operate systems."*
- **Paper** — light research/docs page. *"I have depth and output."*

Both views render from a single shared content layer, so they can never drift.

### Non-goals
- Not a CMS or blog engine (notes are static data for now).
- Not a backend/SSR rewrite — stays a Vite SPA.
- Not a multi-page app — single page per view, anchor-navigated.

---

## 2. Research grounding (why this design)

Studied first-hand: brittanychiang.com (current + v4), leerob.com, rauchg.com,
rauno.me, paco.me, joshwcomeau.com, and — critically — backend/AI/systems people:
karpathy.ai, simonwillison.net, brendangregg.com, danluu.com, aphyr.com.

**Principles adopted:**
1. Lead with a one-sentence identity in plain language; no logo splash, no typewriter effect.
2. Restraint as default — mostly text, one tight type system, one accent per view, generous whitespace.
3. Quantified credibility everywhere (5M+ MAU, 10K req/sec, hours→seconds, 4h→<15m) — never vague adjectives.
4. Show don't claim — the site's own speed, a11y, no-flash, and the `⌘K` palette *are* the proof of taste.
5. For backend/AI engineers specifically: the **artifact and the writing lead**, the chrome gets out of the way; a signature system (Revamp Engine) beats a generic projects grid.

**Anti-patterns explicitly avoided:** cloned navy `#0a192f` + neon-mint `#64ffda`
+ "01./02./03." template; skill-percentage bars; scroll-jacking / entrance-anim
on every block; glassmorphism/particle backgrounds; the neobrutalist noise of the
current site; the 13 abandoned hero variants.

---

## 3. The two-View system

### Decisions (locked)
- **Names:** `Terminal` and `Paper`. The switcher is labeled **View**.
- **Default:** `Terminal` (dark) for a brand-new visitor.
- **Writing:** included — 3 real notes drafted (see §6).
- **Approach:** clean rebuild of the presentation layer, keep & upgrade `src/data/*.js`.
- **Terminal accent:** warm amber `#f5a623` (not hacker-green).
- **Paper accent:** link-blue `#1a56db`.
- **Command palette (`⌘K`):** included, Terminal view (also reachable in Paper).

### Switch behavior
- Segmented `View` control in the top nav (two segments: `Terminal` · `Paper`).
- Persistence precedence: `?view=` URL param > `localStorage('portfolio-view')` > default `terminal`.
- Crossfade transition (~250ms) between views; respects `prefers-reduced-motion` (instant swap).
- **No-flash:** a tiny inline script in `index.html` sets `data-view` on `<html>` before first paint, mirroring the ThemeContext no-flash pattern.
- The palette can switch views too (`> view paper`).

---

## 4. Architecture

Vite + React 19, Lenis smooth scroll, Framer Motion (subtle), lucide-react icons —
all retained. Clean rebuild of the presentation layer on top of the existing data.

```
src/
  main.jsx                 MOD  ViewProvider wrap; mount
  App.jsx                  MOD  renders <ActiveView/> + global chrome (nav, palette, footer)
  index.css                MOD  reset + shared tokens only (view CSS lives per-view)
  index.html (root)        MOD  no-flash inline script, font preconnect, meta

  context/
    ViewContext.jsx        NEW  { view, setView }  (replaces ThemeContext)

  data/                    KEPT + content upgrade pass (§6)
    profile.js             MOD  upgraded summary/tagline; metrics unchanged
    experience.js          MOD  verbs sharpened; every metric preserved
    projects.js            MOD  + Revamp Engine (featured #1); descriptions elevated
    skills.js              KEPT as-is (presented per view)
    notes.js               NEW  3 drafted notes (§6.4)

  components/
    Navbar.jsx             MOD  hosts ViewSwitch + section anchors
    ViewSwitch.jsx         NEW  segmented View control
    CommandPalette.jsx     NEW  ⌘K — jump to sections, open links, switch view
    Footer.jsx             MOD  per-view footer
    Layout.jsx             MOD  thin shell

  views/
    terminal/
      TerminalView.jsx     NEW  composes terminal sections
      sections/*.jsx       NEW  Identity, About, Work, Experience, Stack, Notes, Contact
    paper/
      PaperView.jsx        NEW  composes paper sections
      sections/*.jsx       NEW  same 7, paper treatment

  styles/
    terminal.css           NEW  scoped under [data-view="terminal"]
    paper.css              NEW  scoped under [data-view="paper"]

  components/seo/ResumeStructuredData.jsx   KEPT (SEO/ATS)
  utils/analytics.js, Vercel Analytics      KEPT
```

**Removed:** `sections/hero-variants/*` (13 files), `neobrutalism.css`,
`editorial.css`, `hero.css`, `resume.css` (folded), `ThemePicker.jsx`,
`ThemeContext.jsx`, and currently-unused section components
(`Achievements`, `Contact` old, `Education`, `GithubStats`, `ImpactStrip`,
hero `system-blade` markup), plus `effects/ParallaxScene`, `context/ParallaxContext`,
`hooks/useParallax`, `styles/parallax.css` **if** confirmed unused. Education/impact
content is preserved by folding into the new sections, not deleted as data.

**Shared content guarantee:** both views import the same `data/*.js`. No content is
duplicated in markup; each view is purely a presentation of that data.

---

## 5. Section anatomy (same 7 sections, opposite treatment)

Order is identical in both views: Identity → About → Selected Work → Experience →
Stack → Notes → Contact.

### Terminal view
- **Identity:** `$ whoami` hero. Name in mono, role with a `$`/`›` prompt, the
  one-liner, current role line, the 4 headline metrics as monospace counters in a
  bordered stat row, a `stack:` status line. Faint background grid. Blinking cursor.
- **About:** a boxed "readme" panel (`~/about`) with the upgraded summary.
- **Selected Work:** cards with status chips (e.g. `live · runs on Pi 4B`,
  `5M–10M MAU`), `work/NN` ids, a `→` outcome line in amber, tech tags as mono chips.
  Featured-first; Revamp Engine leads.
- **Experience:** a status-line table — `COMPANY · ROLE — OUTCOME … DATES` in mono,
  hairline rows. All 5 entries.
- **Stack:** grouped like `tree`/status output (Backend, AI & ML, Architecture,
  Cloud/DevOps, …), mono.
- **Notes:** `~/notes` list — title, date, 1-line abstract.
- **Contact:** prompt-style links (`$ open github`), `⌘K` hint, email.

### Paper view
- **Identity:** bold/serif name, a one-paragraph bio line, a quiet stat row (4 metrics).
- **About:** flowing prose, generous reading measure (~660px).
- **Selected Work** ("Selected Systems"): ledger list — name, inline metric, short
  description, tag chips. Revamp Engine first.
- **Experience:** reverse-chron timeline with company **monogram chips** (T, G, B, S),
  role, dates, one quantified outcome each.
- **Stack:** compact grouped lists.
- **Notes:** titled list with **tag-count chips** (e.g. `agentic-ai`, `distributed-systems`),
  date, abstract.
- **Contact:** clean footer row — GitHub · LinkedIn · email · résumé.

### Command palette (`⌘K`, Terminal-led, available both views)
Fuzzy list of actions: jump to each section; open GitHub / LinkedIn / résumé / email;
`view terminal` / `view paper`; copy email. Keyboard-navigable, esc to close,
focus-trapped. This is a genuine feature and a deliberate engineer signal.

---

## 6. Content — retained in full, elevated

Hard rule from the owner: **keep all current content** (summary, experience text,
project text), slightly modified/upgraded to show true potential. Every metric is
preserved verbatim.

### 6.1 Identity / hero
- Role: **Senior Backend & AI Engineer**
- One-liner: *"I build and scale the distributed systems and agentic-AI platforms that keep products alive under real load."*
- Location: Mumbai, India — open to relocation.
- Current line: *Backend Engineer @ T-Systems (Deutsche Telekom subsidiary) — sole backend engineer on an internal agentic-AI platform; 10+ production agents on Google ADK.*
- Headline metrics (unchanged): `5M+` MAU scaled · `10K` req/sec peak · `10+` production AI agents · `5+ yrs` backend.

### 6.2 About / summary (upgraded; all facts retained)
> Senior Backend & AI Engineer with 5 years building and scaling distributed systems.
> I owned core backend services for a real-money gaming platform at **5M+ MAU**
> sustaining **10K req/sec** peaks, and have repeatedly run production end-to-end as
> the sole engineer across multiple products. Today I build agentic-AI systems on
> **Google ADK** at **T-Systems (Deutsche Telekom subsidiary)**, embedded as the
> dedicated backend hire collaborating daily with German data-science, frontend, and
> DevOps teams. I care about the unglamorous parts that keep products alive: durable
> queues, idempotency, failure modes, and clean ownership.
> Core stack: Python · FastAPI · Node.js · RabbitMQ · Redis · gRPC · PostgreSQL · AWS.

### 6.3 Experience (all 5 entries kept; verbs sharpened, metrics intact)
- **T-Systems (Deutsche Telekom)** — Backend Engineer — Sep 2025–Present —
  architected the internal agentic-AI platform solo (multi-agent orchestration on
  Google ADK, 10+ production agents incl. a RAG chatbot over 60+ docs, doc-extraction
  pipelines, a live-DB graph agent); owned JWT auth, chat-history store, HTTP streaming
  APIs, and all cloud deploys/CI-CD.
- **Gridlogic** — System Engineer — Mar 2023–May 2025 — owned the game-engine logic
  and a zero-fault real-money wallet engine at 5M–10M MAU; 3–5K req/sec steady, 10K
  peak; traced a consistency bug through millions of RabbitMQ events in 2 days, cutting
  mid-game errors 30% with zero data loss.
- **BizAssist** — Freelance Tech Lead — Oct 2024–Sep 2025 — shipped 4 production apps
  solo (Next.js/Node/MongoDB/AWS), zero P0 in 12 months; React Native booking app on a
  cal.com fork cut booking overhead ~60%.
- **Stride Ahead** — Tech Lead — May 2025–Aug 2025 — standardized 5+ fragmented
  microservices, resolved a session-corruption bug class in 4 weeks, mentored 2–3
  engineers; rebuilt CI/CD (4h → <15m).
- **Stride Ahead** — SDE → Senior SDE — Mar 2021–Mar 2023 — founding backend engineer;
  took sole production ownership when the CTO left; built CRM backend 0 → 15–20K MAU at
  99.9%+ uptime; PDF pipeline at 1,000+ reports/month.

### 6.4 Projects (all kept; Revamp Engine added as featured #1)

**NEW — Revamp Engine** (featured, year 2026)
- Category: AI / Agentic Systems
- Short: *A 24/7 agentic-AI worker system that finds real-estate builders, auto-revamps
  their pages, and ships human-approved preview sites — designed so the queue, not the
  LLM, is the spine.*
- Long: A durable, queue-driven pipeline where **SQLite is the source of truth and
  Redis is a rebuildable hot cache** (queues, state, circuit-breaker), rehydrated from
  SQLite on boot. Work is split across per-queue workers: `q:scrape`, `q:import`,
  `q:deploy` drain regardless of LLM health, while `q:ai` stalls only when the LLM
  **circuit-breaker** is OPEN — so a model outage degrades one capability instead of the
  system. A FastAPI control plane never 500s if Redis is down; a Node build service
  renders Astro templates and deploys previews to Vercel/Netlify. **Human-in-the-loop by
  design:** a revamp stops at `built` and waits for a person to explicitly preview and
  approve — nothing goes outward automatically. Runs 24/7 on a Raspberry Pi 4B.
- Tags: Python · FastAPI · Redis · SQLite · Agentic AI · LLM · Astro · Node.js · Raspberry Pi
- Links: **TBD — confirm if there's a public repo**; otherwise mark private (no link).

**Kept (descriptions elevated to lead with the hard problem + metric):**
Nomad Mind (AI/RAG), Cal.com contribution (Open Source), APEX OHOL v8 (trading),
BizAssist Hotel Booking, BizAssist Platform, Smax Bookings (iOS), Vision Clothing.

### 6.5 Notes (3 drafted — real, grounded in the work)
1. **"The queue is the spine, not the AI."** Designing Revamp Engine so an LLM outage
   stalls only `q:ai`: SQLite-as-truth, Redis as a rebuildable cache, and a circuit
   breaker that quarantines AI work while scraping and deploys keep draining.
   Tags: `agentic-ai`, `distributed-systems`, `resilience`.
2. **"A zero-fault wallet engine at 10K req/sec."** Moving real money under live load
   with no data loss — idempotency, event flow over RabbitMQ, Redis hot state, and
   tracing a consistency bug through millions of events in two days.
   Tags: `distributed-systems`, `reliability`, `payments`.
3. **"RAG over 60 docs: hours → seconds."** Building a retrieval-augmented chatbot on
   Google ADK that turned manual lookup into instant grounded answers — chunking,
   embeddings, retrieval contracts with the data-science team, and keeping answers faithful.
   Tags: `agentic-ai`, `rag`, `llm`.

### 6.6 Education (preserved)
BCA (B.Sc. CS equivalent), GPA 8.20/10, YCMOU, 2018–2021 — Paper timeline tail / Terminal line.

---

## 7. Motion, performance, accessibility, SEO

- **Motion:** Lenis retained; Framer Motion only for subtle in-view reveals and the
  view crossfade. No scroll-jacking, no per-block entrance animations. Honor
  `prefers-reduced-motion`.
- **Performance:** font `display: swap` + preconnect; lean bundle (drop dead CSS/JS);
  fast first paint; lazy-mount the inactive view's heavy bits.
- **A11y:** skip-to-content link, full keyboard nav, visible focus rings, semantic
  landmarks (`header`/`main`/`section`/`footer`), AA contrast in both views, palette
  focus-trapped.
- **SEO/ATS:** keep `ResumeStructuredData`; ensure the default (Terminal) DOM contains
  the full text content (summary, experience, ATS keywords) so it stays crawlable;
  per-view `<title>`/meta unchanged from current `seo` data.

---

## 8. Acceptance criteria

1. Loading the site shows **Terminal** by default with no flash of the wrong view.
2. The `View` switch flips the entire layout (components/type/color/density), not just colors; choice persists across reloads and via `?view=`.
3. Both views present all 7 sections from the same `data/*.js`; no content is hard-coded twice.
4. All current content is present and every metric preserved; Revamp Engine appears as featured #1; 3 notes render.
5. `⌘K` opens a working command palette (jump + links + view switch), keyboard-navigable.
6. `prefers-reduced-motion` disables non-essential motion; keyboard and screen-reader navigation work; contrast is AA in both views.
7. The 13 hero variants, ThemePicker/ThemeContext, and dead CSS are removed; `npm run build` and `npm run lint` pass clean.
8. Lighthouse: Performance and Accessibility ≥ 95 on desktop.

---

## 9. Open items to confirm during implementation
- Revamp Engine public repo URL (or keep private/no-link).
- Whether to fully delete the parallax stack (confirm it's unused after rebuild).
- Final amber shade tuning for Terminal accent against AA contrast on the dark bg.
