# Portfolio Redesign: "One Identity, Two Machines" (Terminal / Paper)

**Date:** 2026-06-07
**Owner:** Suresh Bhandari, Senior Backend & AI Engineer
**Status:** Approved design, pending spec review then implementation plan

> Copy convention for this project: no em-dashes or en-dashes in any shipping copy
> or prose. Use periods, commas, colons, or parentheses. Keep real hyphens only in
> proper nouns and standard terms (T-Systems, CI/CD, Google ADK). Ranges use "to".

---

## 1. Goal

Revamp the portfolio so it reads like the personal site of one of the strongest
backend and AI engineers of this generation: substance first, driven by real
metrics, unmistakably "an engineer who operates systems," and visually distinctive
without falling into the cloned-template look.

The signature concept: **one portfolio, two complete Views of the same content.**
A `View` switch flips the entire layout, type system, color, and density, not just
a palette. The two views are deliberate opposites:

- **Terminal**: warm dark console. "I operate systems."
- **Paper**: light research and docs page. "I have depth and output."

Both views render from a single shared content layer, so they can never drift.

### Non-goals
- Not a CMS or blog engine (notes are static data for now).
- Not a backend or SSR rewrite. It stays a Vite SPA.
- Not a multi-page app. One page per view, navigated by anchors.

---

## 2. Research grounding (why this design)

Studied firsthand: brittanychiang.com (current and v4), leerob.com, rauchg.com,
rauno.me, paco.me, joshwcomeau.com, and critically the backend, AI, and systems
people: karpathy.ai, simonwillison.net, brendangregg.com, danluu.com, aphyr.com.

Principles adopted:
1. Lead with a one-sentence identity in plain language. No logo splash, no typewriter effect.
2. Restraint as the default. Mostly text, one tight type system, one accent per view, generous whitespace.
3. Quantified credibility everywhere (5M+ MAU, 10K req/sec, hours to seconds, 4h to under 15m). Never vague adjectives.
4. Show, do not claim. The site's own speed, accessibility, no flash, and the `⌘K` palette are the proof of taste.
5. For backend and AI engineers specifically: the artifact and the writing lead, the chrome gets out of the way. A signature system (Revamp Engine) beats a generic projects grid.

Anti-patterns explicitly avoided: the cloned navy `#0a192f` plus neon mint
`#64ffda` plus "01./02./03." template; skill percentage bars; scroll-jacking and
entrance animation on every block; glassmorphism and particle backgrounds; the
neobrutalist noise of the current site; the 13 abandoned hero variants.

---

## 3. The two-View system

### Decisions (locked)
- **Names:** `Terminal` and `Paper`. The switcher is labeled **View**.
- **Default:** `Terminal` (dark) for a brand-new visitor.
- **Writing:** included. 3 real notes drafted (see section 6).
- **Approach:** clean rebuild of the presentation layer, keep and upgrade `src/data/*.js`.
- **Terminal accent:** warm amber `#f5a623` (not hacker green).
- **Paper accent:** link blue `#1a56db`.
- **Command palette (`⌘K`):** included, Terminal view (also reachable in Paper).
- **Revamp Engine link:** none. Listed without an external link (private project).

### Switch behavior
- Segmented `View` control in the top nav (two segments: `Terminal`, `Paper`).
- Persistence precedence: `?view=` URL param, then `localStorage('portfolio-view')`, then default `terminal`.
- Crossfade transition (about 250ms) between views. Respects `prefers-reduced-motion` (instant swap).
- No flash: a tiny inline script in `index.html` sets `data-view` on `<html>` before first paint, mirroring the current no-flash theme pattern.
- The palette can switch views too (`> view paper`).

---

## 4. Architecture

Vite plus React 19, Lenis smooth scroll, Framer Motion (subtle), lucide-react
icons, all retained. Clean rebuild of the presentation layer on top of the
existing data.

```
src/
  main.jsx                 MOD  ViewProvider wrap; mount
  App.jsx                  MOD  renders <ActiveView/> plus global chrome (nav, palette, footer)
  index.css                MOD  reset plus shared tokens only (view CSS lives per view)
  index.html (project root) MOD  no-flash inline script, font preconnect, meta

  context/
    ViewContext.jsx        NEW  { view, setView }  (replaces ThemeContext)

  data/                    KEPT plus content upgrade pass (section 6)
    profile.js             MOD  upgraded summary and tagline; metrics unchanged
    experience.js          MOD  verbs sharpened; every metric preserved
    projects.js            MOD  add Revamp Engine (featured #1); descriptions elevated
    skills.js              KEPT as-is (presented per view)
    notes.js               NEW  3 drafted notes (section 6.5)

  components/
    Navbar.jsx             MOD  hosts ViewSwitch plus section anchors
    ViewSwitch.jsx         NEW  segmented View control
    CommandPalette.jsx     NEW  the palette: jump to sections, open links, switch view
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

  components/seo/ResumeStructuredData.jsx   KEPT (SEO and ATS)
  utils/analytics.js, Vercel Analytics      KEPT
```

**Removed:** `sections/hero-variants/*` (13 files), `neobrutalism.css`,
`editorial.css`, `hero.css`, `resume.css` (folded), `ThemePicker.jsx`,
`ThemeContext.jsx`, and currently unused section components (`Achievements`, old
`Contact`, `Education`, `GithubStats`, `ImpactStrip`, the hero "system blade"
markup), plus `effects/ParallaxScene`, `context/ParallaxContext`,
`hooks/useParallax`, `styles/parallax.css` if confirmed unused. Education and
impact content is preserved by folding into the new sections, not deleted as data.

**Shared content guarantee:** both views import the same `data/*.js`. No content is
duplicated in markup. Each view is purely a presentation of that data.

---

## 5. Section anatomy (same 7 sections, opposite treatment)

Order is identical in both views: Identity, About, Selected Work, Experience,
Stack, Notes, Contact.

### Terminal view
- **Identity:** a `$ whoami` hero. Name in mono, role with a `$` or `›` prompt, the
  one-liner, current role line, the 4 headline metrics as monospace counters in a
  bordered stat row, and a `stack:` status line. Faint background grid. Blinking cursor.
- **About:** a boxed "readme" panel (`~/about`) with the upgraded summary.
- **Selected Work:** cards with status chips (for example `live, runs on Pi 4B`,
  `5M to 10M MAU`), `work/NN` ids, an outcome line in amber, tech tags as mono chips.
  Featured first. Revamp Engine leads.
- **Experience:** a status-line table, mono dates, hairline rows, all 5 entries.
- **Stack:** grouped like a `tree` or status output (Backend, AI & ML, Architecture,
  Cloud and DevOps, and so on), mono.
- **Notes:** a `~/notes` list. Title, date, one-line abstract.
- **Contact:** prompt-style links (`$ open github`), a `⌘K` hint, email.

### Paper view
- **Identity:** bold or serif name, a one-paragraph bio line, a quiet stat row (4 metrics).
- **About:** flowing prose, generous reading measure (about 660px).
- **Selected Work** ("Selected Systems"): a ledger list. Name, inline metric, short
  description, tag chips. Revamp Engine first.
- **Experience:** a reverse chronological timeline with company monogram chips (T, G,
  B, S), role, dates, one quantified outcome each.
- **Stack:** compact grouped lists.
- **Notes:** a titled list with tag-count chips (for example `agentic-ai`,
  `distributed-systems`), date, abstract.
- **Contact:** a clean footer row. GitHub, LinkedIn, email, resume.

### Command palette (`⌘K`, Terminal-led, available in both views)
A fuzzy list of actions: jump to each section; open GitHub, LinkedIn, resume, email;
`view terminal` or `view paper`; copy email. Keyboard navigable, esc to close,
focus trapped. This is a genuine feature and a deliberate engineer signal.

---

## 6. Content: retained in full, elevated

Hard rule from the owner: keep all current content (summary, experience text,
project text), slightly modified and upgraded to show true potential. Every metric
is preserved. No em-dashes or en-dashes in any of this copy.

### 6.1 Identity / hero
- Role: **Senior Backend & AI Engineer**
- One-liner: "I build and scale the distributed systems and agentic AI platforms that keep products alive under real load."
- Location: Mumbai, India. Open to relocation.
- Current line: "Backend Engineer at T-Systems (Deutsche Telekom subsidiary). Sole backend engineer on an internal agentic AI platform, with 10+ production agents on Google ADK."
- Headline metrics (unchanged): `5M+` MAU scaled, `10K` req/sec peak, `10+` production AI agents, `5+ yrs` backend.

### 6.2 About / summary (upgraded, all facts retained)
> Senior Backend & AI Engineer with 5 years building and scaling distributed
> systems. I owned core backend services for a real money gaming platform at
> **5M+ MAU** sustaining **10K req/sec** peaks, and I have repeatedly run production
> end to end as the sole engineer across multiple products. Today I build agentic AI
> systems on **Google ADK** at **T-Systems (Deutsche Telekom subsidiary)**, embedded
> as the dedicated backend hire collaborating daily with German data science,
> frontend, and DevOps teams. I care about the unglamorous parts that keep products
> alive: durable queues, idempotency, failure modes, and clean ownership.
> Core stack: Python, FastAPI, Node.js, RabbitMQ, Redis, gRPC, PostgreSQL, AWS.

### 6.3 Experience (all 5 entries kept, verbs sharpened, metrics intact)
- **T-Systems (Deutsche Telekom)**, Backend Engineer, Sep 2025 to Present.
  Architected the internal agentic AI platform solo (multi-agent orchestration on
  Google ADK, 10+ production agents including a RAG chatbot over 60+ docs,
  document-extraction pipelines, a live DB graph agent). Owned JWT auth, the
  chat-history store, HTTP streaming APIs, and all cloud deploys and CI/CD.
- **Gridlogic**, System Engineer, Mar 2023 to May 2025. Owned the game-engine logic
  and a zero fault real money wallet engine at 5M to 10M MAU. 3 to 5K req/sec steady,
  10K peak. Traced a consistency bug through millions of RabbitMQ events in 2 days,
  cutting mid-game errors 30% with zero data loss.
- **BizAssist**, Freelance Tech Lead, Oct 2024 to Sep 2025. Shipped 4 production apps
  solo (Next.js, Node.js, MongoDB, AWS), zero P0 in 12 months. A React Native booking
  app on a cal.com fork cut booking overhead about 60%.
- **Stride Ahead**, Tech Lead, May 2025 to Aug 2025. Standardized 5+ fragmented
  microservices, resolved a session-corruption bug class in 4 weeks, mentored 2 to 3
  engineers. Rebuilt CI/CD (4h to under 15m).
- **Stride Ahead**, SDE then Senior SDE, Mar 2021 to Mar 2023. Founding backend
  engineer. Took sole production ownership when the CTO left. Built the CRM backend
  from 0 to 15K to 20K MAU at 99.9%+ uptime. PDF pipeline at 1,000+ reports per month.

### 6.4 Projects (all kept, Revamp Engine added as featured #1)

**NEW. Revamp Engine** (featured, year 2026)
- Category: AI / Agentic Systems
- Short: "A 24/7 agentic AI worker system that finds real estate builders, auto-revamps
  their pages, and ships previews a human has approved. Designed so the queue, not the
  LLM, is the spine."
- Long: A durable, queue driven pipeline where SQLite is the source of truth and Redis
  is a rebuildable hot cache (queues, state, circuit breaker), rehydrated from SQLite
  on boot. Work is split across per-queue workers: `q:scrape`, `q:import`, and
  `q:deploy` drain regardless of LLM health, while `q:ai` stalls only when the LLM
  circuit breaker is OPEN, so a model outage degrades one capability instead of the
  whole system. A FastAPI control plane never 500s if Redis is down. A Node build
  service renders Astro templates and deploys previews to Vercel or Netlify. A human
  stays in the loop by design: a revamp stops at `built` and waits for a person to
  preview and approve it. Nothing goes outward automatically. Runs 24/7 on a
  Raspberry Pi 4B.
- Tags: Python, FastAPI, Redis, SQLite, Agentic AI, LLM, Astro, Node.js, Raspberry Pi
- Links: none (private project, listed without an external link).

Kept (descriptions elevated to lead with the hard problem and the metric): Nomad
Mind (AI / RAG), Cal.com contribution (Open Source), APEX OHOL v8 (trading),
BizAssist Hotel Booking, BizAssist Platform, Smax Bookings (iOS), Vision Clothing.

### 6.5 Notes (3 drafted, real, grounded in the work)
1. **"The queue is the spine, not the AI."** Designing Revamp Engine so an LLM outage
   stalls only `q:ai`: SQLite as truth, Redis as a rebuildable cache, and a circuit
   breaker that quarantines AI work while scraping and deploys keep draining.
   Tags: `agentic-ai`, `distributed-systems`, `resilience`.
2. **"A zero fault wallet engine at 10K req/sec."** Moving real money under live load
   with no data loss: idempotency, event flow over RabbitMQ, Redis hot state, and
   tracing a consistency bug through millions of events in two days.
   Tags: `distributed-systems`, `reliability`, `payments`.
3. **"RAG over 60 docs: hours to seconds."** Building a retrieval augmented chatbot on
   Google ADK that turned manual lookup into instant grounded answers: chunking,
   embeddings, retrieval contracts with the data science team, and keeping answers
   faithful.
   Tags: `agentic-ai`, `rag`, `llm`.

### 6.6 Education (preserved)
BCA (B.Sc. CS equivalent), GPA 8.20 / 10, YCMOU, 2018 to 2021. Placed in the Paper
timeline tail or as a Terminal line.

---

## 7. Motion, performance, accessibility, SEO

- **Motion:** Lenis retained. Framer Motion only for subtle in-view reveals and the
  view crossfade. No scroll-jacking, no per-block entrance animations. Honor
  `prefers-reduced-motion`.
- **Performance:** font `display: swap` plus preconnect. Lean bundle (drop dead CSS
  and JS). Fast first paint. Lazy mount the inactive view's heavy parts.
- **Accessibility:** skip-to-content link, full keyboard navigation, visible focus
  rings, semantic landmarks (`header`, `main`, `section`, `footer`), AA contrast in
  both views, palette focus trapped.
- **SEO and ATS:** keep `ResumeStructuredData`. Ensure the default (Terminal) DOM
  contains the full text content (summary, experience, ATS keywords) so it stays
  crawlable. Per-view `<title>` and meta unchanged from current `seo` data.

---

## 8. Acceptance criteria

1. Loading the site shows **Terminal** by default with no flash of the wrong view.
2. The `View` switch flips the entire layout (components, type, color, density), not
   just colors. The choice persists across reloads and via `?view=`.
3. Both views present all 7 sections from the same `data/*.js`. No content is hard
   coded twice.
4. All current content is present and every metric preserved. Revamp Engine appears
   as featured #1 (with no link). 3 notes render.
5. `⌘K` opens a working command palette (jump, links, view switch), keyboard navigable.
6. `prefers-reduced-motion` disables non-essential motion. Keyboard and screen reader
   navigation work. Contrast is AA in both views.
7. The 13 hero variants, ThemePicker and ThemeContext, and dead CSS are removed.
   `npm run build` and `npm run lint` pass clean.
8. No em-dashes or en-dashes in any shipping copy.
9. Lighthouse Performance and Accessibility both at or above 95 on desktop.

---

## 9. Open items to confirm during implementation
- Whether to fully delete the parallax stack (confirm it is unused after the rebuild).
- Final amber shade tuning for the Terminal accent against AA contrast on the dark background.
