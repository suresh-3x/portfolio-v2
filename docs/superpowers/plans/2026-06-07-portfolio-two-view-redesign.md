# Portfolio Two-View (Terminal / Paper) Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio presentation layer as one app with two complete, switchable Views (Terminal = warm dark console, Paper = light research/docs), both rendered from a single shared content layer.

**Architecture:** A `ViewContext` holds `view ∈ {terminal, paper}` (default terminal, persisted, no-flash). `App` renders the active view's component tree. Each view owns its own section components and scoped CSS but imports the same upgraded `src/data/*.js`. A `⌘K` command palette and a segmented `View` switch are global chrome. Clean rebuild: the 13 hero variants, ThemePicker/ThemeContext, and dead CSS are deleted.

**Tech Stack:** Vite 7, React 19, Lenis, Framer Motion, lucide-react, Playwright (E2E + visual). Fonts: Inter, JetBrains Mono, IBM Plex Mono.

**Design source of truth:** the rendered mockups in `.superpowers/brainstorm/7713-1780787790/content/directions.html` — `#dir-terminal` is the Terminal view top-of-page, `#dir-research` is the Paper view top-of-page. Port their structure/CSS into React and extend to all 7 sections. Spec: `docs/superpowers/specs/2026-06-07-portfolio-two-view-redesign-design.md`.

**Global copy rule:** no em-dashes (—) or en-dashes (–) in any shipping string. Ranges use "to". Task 16 enforces this with an automated guard.

**Design tokens (define once, use everywhere):**

```
Terminal            Paper
--t-bg     #0e0e10  --p-bg      #ffffff
--t-panel  #141417  --p-panel   #fbfbfa
--t-text   #e8e6e1  --p-text    #16161a
--t-muted  #8b8b86  --p-muted   #5b5b66
--t-faint  #3a3a3e  --p-rule    #e7e7e3
--t-border rgba(255,255,255,.08)
--t-accent #f5a623  --p-accent  #1a56db
--t-ok     #5bd672  --p-chip    #f3f4f6
mono: JetBrains Mono   tag-mono: IBM Plex Mono
body: Inter            body: Inter / system-ui
```

Section ids (anchors, both views): `home about work experience stack notes contact`.

---

## Task 0: Branch check

**Files:** none.

- [ ] **Step 1: Confirm branch**

Run: `git branch --show-current`
Expected: `redesign/terminal-paper-views` (already created). If not, `git checkout -b redesign/terminal-paper-views`.

---

## Task 1: Fonts, no-flash bootstrap, reset CSS

**Files:**
- Modify: `index.html` (project root)
- Modify: `src/index.css`

- [ ] **Step 1: Add font preconnect + load and the no-flash inline script to `index.html`**

In `<head>`, before the module script, add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<script>
  (function () {
    try {
      var p = new URLSearchParams(location.search).get('view');
      var stored = localStorage.getItem('portfolio-view');
      var v = (p === 'terminal' || p === 'paper') ? p
            : (stored === 'terminal' || stored === 'paper') ? stored
            : 'terminal';
      document.documentElement.setAttribute('data-view', v);
    } catch (e) {
      document.documentElement.setAttribute('data-view', 'terminal');
    }
  })();
</script>
```

- [ ] **Step 2: Replace `src/index.css` with a minimal reset + shared tokens**

Strip all theme/neobrutalist/hero rules. Keep only: box-sizing reset, html/body base, the Lenis-friendly `overflow-anchor: none`, scroll-margin for anchored sections, and shared CSS variables for spacing/fonts. Per-view colors live in `terminal.css` / `paper.css`. Body background/text are set by `[data-view="…"]` rules (added in Tasks 7/11). Set `:root` font vars:

```css
:root{
  --font-sans:'Inter',system-ui,-apple-system,sans-serif;
  --font-mono:'JetBrains Mono','IBM Plex Mono',monospace;
  --font-tag:'IBM Plex Mono',monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
html{overflow-anchor:none}
html,body,#root{width:100%;min-height:100%}
body{font-family:var(--font-sans);line-height:1.6;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
a{color:inherit;text-decoration:none}
section[id]{scroll-margin-top:88px}
.skip-link{position:absolute;left:-9999px}
.skip-link:focus{left:12px;top:12px;z-index:100;padding:8px 12px;background:#000;color:#fff;border-radius:6px}
@media(prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}
```

- [ ] **Step 3: Verify dev server boots**

Run: `yarn dev` (then open the printed URL). Expected: page loads, `<html data-view="terminal">` present (check devtools). Existing UI may look broken; that is fine, later tasks replace it. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add index.html src/index.css
git commit -m "chore: fonts, no-flash view bootstrap, reset css"
```

---

## Task 2: ViewContext (state + persistence)

**Files:**
- Create: `src/context/ViewContext.jsx`

- [ ] **Step 1: Write `src/context/ViewContext.jsx`**

```jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ViewContext = createContext(null);
const STORAGE_KEY = 'portfolio-view';
const VALID = ['terminal', 'paper'];

function initialView() {
  if (typeof window === 'undefined') return 'terminal';
  const p = new URLSearchParams(window.location.search).get('view');
  if (VALID.includes(p)) return p;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (VALID.includes(stored)) return stored;
  // Mirror whatever the no-flash script already committed, else default.
  const attr = document.documentElement.getAttribute('data-view');
  return VALID.includes(attr) ? attr : 'terminal';
}

export function ViewProvider({ children }) {
  const [view, setViewState] = useState(initialView);

  useEffect(() => {
    document.documentElement.setAttribute('data-view', view);
    try { localStorage.setItem(STORAGE_KEY, view); } catch (e) { /* ignore */ }
  }, [view]);

  const setView = useCallback((v) => {
    if (VALID.includes(v)) setViewState(v);
  }, []);

  const toggleView = useCallback(() => {
    setViewState((v) => (v === 'terminal' ? 'paper' : 'terminal'));
  }, []);

  return (
    <ViewContext.Provider value={{ view, setView, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('useView must be used within ViewProvider');
  return ctx;
}
```

- [ ] **Step 2: Wrap the app in `src/main.jsx`**

Modify `src/main.jsx` to import `ViewProvider` and wrap `<App />`:

```jsx
import { ViewProvider } from './context/ViewContext';
// ...
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViewProvider>
      <App />
    </ViewProvider>
  </StrictMode>
);
```

If `main.jsx` currently imports `ThemeProvider`, remove that import and usage.

- [ ] **Step 3: Commit**

```bash
git add src/context/ViewContext.jsx src/main.jsx
git commit -m "feat: ViewContext with no-flash persistence"
```

---

## Task 3: Content data upgrades + new `notes.js`

**Files:**
- Modify: `src/data/profile.js`
- Modify: `src/data/experience.js`
- Modify: `src/data/projects.js`
- Create: `src/data/notes.js`

All copy below is final and dash-free.

- [ ] **Step 1: Upgrade `profile.js` `tagline` and `summary`**

Set `profile.tagline` to:
`'I build and scale the distributed systems and agentic AI platforms that keep products alive under real load.'`

Replace `summary` with:
```js
export const summary = `Senior Backend & AI Engineer with 5 years building and scaling distributed systems. I owned core backend services for a real money gaming platform at 5M+ MAU sustaining 10K req/sec peaks, and I have repeatedly run production end to end as the sole engineer across multiple products. Today I build agentic AI systems on Google ADK at T-Systems (Deutsche Telekom subsidiary), embedded as the dedicated backend hire collaborating daily with German data science, frontend, and DevOps teams. I care about the unglamorous parts that keep products alive: durable queues, idempotency, failure modes, and clean ownership. Core stack: Python, FastAPI, Node.js, RabbitMQ, Redis, gRPC, PostgreSQL, AWS.`;
```

Leave `impactMetrics`, `atsKeywords`, `education`, `seo` unchanged. (Email in data is `suresh.37x@gmail.com`; keep as-is.)

- [ ] **Step 2: Sharpen `experience.js` descriptions (keep every metric, remove any em/en dashes)**

For each entry, audit the `description` strings and replace any `—`/`–` with "to"/commas, and tighten leading verbs. Do not drop facts or numbers. Example: the Gridlogic bullet stays semantically identical but reads "sustaining 3 to 5K req/sec steady state and absorbing 10K req/sec peak event spikes". Keep `period` strings but ensure they read "Mar 2023 to May 2025" form (replace the hyphen between dates with " to "). Verify no `—`/`–` remain in the file.

- [ ] **Step 3: Add Revamp Engine as the first project in `projects.js`**

Insert at the top of the `projects` array (before Nomad Mind):

```js
{
  title: 'Revamp Engine',
  category: 'AI / Agentic Systems',
  description:
    'A 24/7 agentic AI worker system that finds real estate builders, auto-revamps their pages, and ships previews a human has approved. Designed so the queue, not the LLM, is the spine.',
  long_description:
    'A durable, queue driven pipeline where SQLite is the source of truth and Redis is a rebuildable hot cache (queues, state, circuit breaker), rehydrated from SQLite on boot. Work is split across per-queue workers: q:scrape, q:import, and q:deploy drain regardless of LLM health, while q:ai stalls only when the LLM circuit breaker is OPEN, so a model outage degrades one capability instead of the whole system. A FastAPI control plane never 500s if Redis is down. A Node build service renders Astro templates and deploys previews to Vercel or Netlify. A human stays in the loop by design: a revamp stops at built and waits for a person to preview and approve it. Nothing goes outward automatically. Runs 24/7 on a Raspberry Pi 4B.',
  tags: ['Python', 'FastAPI', 'Redis', 'SQLite', 'Agentic AI', 'LLM', 'Astro', 'Node.js', 'Raspberry Pi'],
  tech_details: {
    architecture: 'Durable queue (SQLite truth + Redis hot cache)',
    resilience: 'LLM circuit breaker; non-AI queues drain during an LLM outage',
    control_plane: 'FastAPI dashboard, never 500s if Redis is down',
    build_service: 'Node + Astro templates, deploys to Vercel or Netlify',
    safety: 'Human in the loop; nothing deploys outward automatically',
    host: 'Raspberry Pi 4B',
  },
  links: {},
  featured: true,
  year: 2026,
},
```

Also add `'AI / Agentic Systems'` to `projectCategories` (after `'AI / RAG'`). Audit existing project `description`/`long_description` for `—`/`–` and replace with dash-free phrasing (lead with the hard problem + metric where light edits help, but do not invent facts).

- [ ] **Step 4: Create `src/data/notes.js`**

```js
export const notes = [
  {
    slug: 'queue-is-the-spine',
    title: 'The queue is the spine, not the AI',
    date: '2026-05',
    abstract:
      'Designing Revamp Engine so an LLM outage stalls only q:ai. SQLite as truth, Redis as a rebuildable cache, and a circuit breaker that quarantines AI work while scraping and deploys keep draining.',
    tags: ['agentic-ai', 'distributed-systems', 'resilience'],
    href: '',
  },
  {
    slug: 'zero-fault-wallet',
    title: 'A zero fault wallet engine at 10K req/sec',
    date: '2026-02',
    abstract:
      'Moving real money under live load with no data loss: idempotency, event flow over RabbitMQ, Redis hot state, and tracing a consistency bug through millions of events in two days.',
    tags: ['distributed-systems', 'reliability', 'payments'],
    href: '',
  },
  {
    slug: 'rag-over-60-docs',
    title: 'RAG over 60 docs: hours to seconds',
    date: '2025-12',
    abstract:
      'Building a retrieval augmented chatbot on Google ADK that turned manual lookup into instant grounded answers: chunking, embeddings, retrieval contracts with the data science team, and keeping answers faithful.',
    tags: ['agentic-ai', 'rag', 'llm'],
    href: '',
  },
];
```

- [ ] **Step 5: Commit**

```bash
git add src/data/profile.js src/data/experience.js src/data/projects.js src/data/notes.js
git commit -m "content: upgrade copy, add Revamp Engine + notes, strip dashes"
```

---

## Task 4: Content-integrity guard (fast automated test)

**Files:**
- Create: `scripts/check-content.mjs`
- Modify: `package.json` (add script)

- [ ] **Step 1: Write `scripts/check-content.mjs`**

```js
// Fast guard: no em/en dashes in shipping data, and key content present.
import { profile, summary } from '../src/data/profile.js';
import { experienceEntries } from '../src/data/experience.js';
import { projects } from '../src/data/projects.js';
import { notes } from '../src/data/notes.js';

const DASH = /[–—]/; // – —
const errors = [];

function scan(label, obj) {
  const s = JSON.stringify(obj);
  if (DASH.test(s)) errors.push(`em/en dash found in ${label}`);
}
scan('profile', profile);
scan('summary', summary);
scan('experience', experienceEntries);
scan('projects', projects);
scan('notes', notes);

if (!projects.some((p) => p.title === 'Revamp Engine' && p.featured)) {
  errors.push('Revamp Engine missing or not featured');
}
if (experienceEntries.length < 5) errors.push('expected >= 5 experience entries');
if (notes.length < 3) errors.push('expected >= 3 notes');

if (errors.length) {
  console.error('CONTENT CHECK FAILED:\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log('content check OK');
```

- [ ] **Step 2: Add script to `package.json`**

In `"scripts"`, add: `"check:content": "node scripts/check-content.mjs"`.

- [ ] **Step 3: Run it**

Run: `yarn check:content`
Expected: `content check OK`. If it reports a dash, fix the offending data string, then re-run until clean.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-content.mjs package.json
git commit -m "test: content-integrity guard (no dashes, key content present)"
```

---

## Task 5: App shell — Navbar, ViewSwitch, Footer, skip link

**Files:**
- Create: `src/components/ViewSwitch.jsx`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/Layout.jsx`

- [ ] **Step 1: `ViewSwitch.jsx` (segmented control)**

```jsx
import { useView } from '../context/ViewContext';

export default function ViewSwitch() {
  const { view, setView } = useView();
  return (
    <div className="view-switch" role="group" aria-label="View">
      <span className="view-switch__label">View</span>
      {['terminal', 'paper'].map((v) => (
        <button
          key={v}
          type="button"
          className={`view-switch__btn${view === v ? ' is-active' : ''}`}
          aria-pressed={view === v}
          onClick={() => setView(v)}
        >
          {v}
        </button>
      ))}
    </div>
  );
}
```

Styling for `.view-switch` is added in both `terminal.css` and `paper.css` (segmented pill; active segment uses the view accent).

- [ ] **Step 2: Rework `Navbar.jsx`**

Navbar shows the name/mark on the left, section anchor links (`#about #work #experience #stack #notes #contact`) in the middle, and on the right: `<ViewSwitch />` plus a `⌘K` hint button that dispatches a custom event `window.dispatchEvent(new Event('open-command-palette'))`. Remove any ThemePicker import/usage. Keep it a single small component; per-view look is handled by CSS classes scoped under `[data-view]`.

- [ ] **Step 3: Rework `Footer.jsx`**

Footer renders GitHub, LinkedIn, email, and resume links from `profile`, plus a short colophon line. No dashes in copy. Per-view styling via CSS.

- [ ] **Step 4: Keep `Layout.jsx` as a thin shell**

`Layout` renders `<a class="skip-link" href="#home">Skip to content</a>`, `<Navbar/>`, `{children}` inside `<main id="main">`, and `<Footer/>`. Remove old theme wiring.

- [ ] **Step 5: Commit**

```bash
git add src/components/ViewSwitch.jsx src/components/Navbar.jsx src/components/Footer.jsx src/components/Layout.jsx
git commit -m "feat: app shell with ViewSwitch, anchors, skip link"
```

---

## Task 6: Command palette (`⌘K`)

**Files:**
- Create: `src/components/CommandPalette.jsx`

- [ ] **Step 1: Write `CommandPalette.jsx`**

Behavior: opens on `⌘K`/`Ctrl+K` or the `open-command-palette` event; closes on `Esc` or backdrop click; focus-trapped; arrow keys move selection; Enter runs the action. Actions: jump to each section (sets `location.hash`), open GitHub/LinkedIn/resume/email (from `profile`), `view terminal`/`view paper` (via `useView().setView`), and copy email. Filter by typed query.

```jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useView } from '../context/ViewContext';
import { profile } from '../data/profile';

const SECTIONS = ['about', 'work', 'experience', 'stack', 'notes', 'contact'];

export default function CommandPalette() {
  const { setView } = useView();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(() => [
    ...SECTIONS.map((s) => ({ id: `go-${s}`, label: `Go to ${s}`, run: () => { window.location.hash = `#${s}`; } })),
    { id: 'view-terminal', label: 'Switch view: terminal', run: () => setView('terminal') },
    { id: 'view-paper', label: 'Switch view: paper', run: () => setView('paper') },
    { id: 'github', label: 'Open GitHub', run: () => window.open(profile.github, '_blank', 'noopener') },
    { id: 'linkedin', label: 'Open LinkedIn', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
    { id: 'resume', label: 'Open resume', run: () => window.open(profile.resumeUrl, '_blank', 'noopener') },
    { id: 'email', label: 'Copy email', run: () => navigator.clipboard?.writeText(profile.email) },
  ], [setView]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? actions.filter((a) => a.label.toLowerCase().includes(t)) : actions;
  }, [q, actions]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onOpen);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('open-command-palette', onOpen); };
  }, []);

  useEffect(() => { if (open) { setQ(''); setI(0); setTimeout(() => inputRef.current?.focus(), 0); } }, [open]);

  if (!open) return null;
  const onListKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setI((n) => Math.min(n + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setI((n) => Math.max(n - 1, 0)); }
    if (e.key === 'Enter') { e.preventDefault(); filtered[i]?.run(); setOpen(false); }
  };

  return (
    <div className="cmdk" role="dialog" aria-modal="true" aria-label="Command palette" onClick={() => setOpen(false)}>
      <div className="cmdk__panel" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk__input"
          placeholder="Type a command or search…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setI(0); }}
          onKeyDown={onListKey}
        />
        <ul className="cmdk__list">
          {filtered.map((a, idx) => (
            <li key={a.id}>
              <button
                className={`cmdk__item${idx === i ? ' is-active' : ''}`}
                onMouseEnter={() => setI(idx)}
                onClick={() => { a.run(); setOpen(false); }}
              >{a.label}</button>
            </li>
          ))}
          {filtered.length === 0 && <li className="cmdk__empty">No matches</li>}
        </ul>
      </div>
    </div>
  );
}
```

`.cmdk*` styling is added to both view CSS files (centered modal, view-appropriate colors).

- [ ] **Step 2: Commit**

```bash
git add src/components/CommandPalette.jsx
git commit -m "feat: command palette (⌘K)"
```

---

## Task 7: App wiring + view routing

**Files:**
- Modify: `src/App.jsx`
- Create: `src/views/terminal/TerminalView.jsx`
- Create: `src/views/paper/PaperView.jsx`

- [ ] **Step 1: Create placeholder view components**

`TerminalView.jsx` and `PaperView.jsx` each export a default component returning a `<>` fragment with the 7 `<section id=…>` placeholders (filled in later tasks). This lets routing work immediately.

- [ ] **Step 2: Rewrite `App.jsx`**

Keep the existing `HashScrollHandler` (Lenis scroll restoration) verbatim. Replace the body so it renders `Layout` + `CommandPalette` + the active view with a crossfade:

```jsx
import { useView } from './context/ViewContext';
import Layout from './components/Layout';
import CommandPalette from './components/CommandPalette';
import TerminalView from './views/terminal/TerminalView';
import PaperView from './views/paper/PaperView';
// ...keep HashScrollHandler...

function App() {
  const { view } = useView();
  return (
    <Layout>
      <HashScrollHandler />
      <CommandPalette />
      <div key={view} className="view-fade">
        {view === 'terminal' ? <TerminalView /> : <PaperView />}
      </div>
    </Layout>
  );
}
export default App;
```

`.view-fade` gets a ~250ms opacity transition in `index.css` (reduced-motion disables it).

- [ ] **Step 3: Run and verify routing**

Run: `yarn dev`. Toggle the View switch; confirm the section placeholders swap and `data-view` flips, and reload persists the choice. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/views/terminal/TerminalView.jsx src/views/paper/PaperView.jsx src/index.css
git commit -m "feat: active-view routing with crossfade"
```

---

## Task 8: Terminal view — styles + Identity + About

**Files:**
- Create: `src/styles/terminal.css` (imported once in `TerminalView.jsx`)
- Create: `src/views/terminal/sections/Identity.jsx`
- Create: `src/views/terminal/sections/About.jsx`

**Reference:** `#dir-terminal` in `.superpowers/brainstorm/7713-1780787790/content/directions.html`. Port its markup/CSS, rescoping selectors under `[data-view="terminal"]` and replacing the mock content with `profile`/`summary` imports. Use the Terminal tokens from the header.

- [ ] **Step 1:** Write `terminal.css` with `[data-view="terminal"]` body bg/text, the faint grid, nav, `.view-switch`, `.cmdk`, and Identity/About classes. All selectors prefixed `[data-view="terminal"]`.
- [ ] **Step 2:** `Identity.jsx` — `$ whoami` hero from `profile` (name, role with `$` prompt, `tagline`, current-role line, the 4 `impactMetrics` as mono counters, a `stack:` line from `atsKeywords`/core stack). Section id `home`.
- [ ] **Step 3:** `About.jsx` — a `~/about` boxed panel rendering `summary`. Section id `about`.
- [ ] **Step 4:** Wire both into `TerminalView.jsx`. Run `yarn dev`, verify in Terminal view. Stop server.
- [ ] **Step 5: Commit** `git add src/styles/terminal.css src/views/terminal && git commit -m "feat(terminal): identity + about"`

---

## Task 9: Terminal view — Selected Work + Experience

**Files:**
- Create: `src/views/terminal/sections/Work.jsx`
- Create: `src/views/terminal/sections/Experience.jsx`

- [ ] **Step 1:** `Work.jsx` — featured-first cards from `projects.filter(p => p.featured)` (Revamp Engine leads). Each card: `work/NN` id, title, status chip(s), description, an outcome line in `--t-accent`, tech tags as mono chips. Derive a status chip per project (e.g. Revamp Engine → `live · runs on Pi 4B`; Gridlogic-style → scale chips). Section id `work`.
- [ ] **Step 2:** `Experience.jsx` — a mono status-line table from `experienceEntries` (sorted by `sortOrder`): company, role, a one-line outcome, dates, hairline rows. Section id `experience`. Group the two Stride Ahead rows under one company visually if practical (use `groupKey`).
- [ ] **Step 3:** Add the `.t-work*` and `.t-exp*` styles to `terminal.css`. Verify in dev. 
- [ ] **Step 4: Commit** `git add src/styles/terminal.css src/views/terminal && git commit -m "feat(terminal): selected work + experience"`

---

## Task 10: Terminal view — Stack + Notes + Contact

**Files:**
- Create: `src/views/terminal/sections/Stack.jsx`
- Create: `src/views/terminal/sections/Notes.jsx`
- Create: `src/views/terminal/sections/Contact.jsx`

- [ ] **Step 1:** `Stack.jsx` — render `primarySkillsets` grouped like `tree`/status output (group title + skill chips), section id `stack`.
- [ ] **Step 2:** `Notes.jsx` — `~/notes` list from `notes` (title, date, abstract, tags). If `href` is empty, render as non-link text (no dead links). Section id `notes`.
- [ ] **Step 3:** `Contact.jsx` — prompt-style links from `profile` (`$ open github`, etc.), `⌘K` hint, email. Section id `contact`.
- [ ] **Step 4:** Add styles, verify all 7 Terminal sections render top-to-bottom. 
- [ ] **Step 5: Commit** `git add src/styles/terminal.css src/views/terminal && git commit -m "feat(terminal): stack + notes + contact"`

---

## Task 11: Paper view — styles + Identity + About

**Files:**
- Create: `src/styles/paper.css` (imported once in `PaperView.jsx`)
- Create: `src/views/paper/sections/Identity.jsx`
- Create: `src/views/paper/sections/About.jsx`

**Reference:** `#dir-research` in the mockup file. Port and rescope under `[data-view="paper"]`. Use Paper tokens.

- [ ] **Step 1:** `paper.css` with `[data-view="paper"]` body bg/text, nav, `.view-switch`, `.cmdk`, Identity/About classes.
- [ ] **Step 2:** `Identity.jsx` — bold name, a one-paragraph bio line (from `tagline` + current role), a quiet stat row (4 `impactMetrics`). Section id `home`.
- [ ] **Step 3:** `About.jsx` — flowing `summary` prose at ~660px measure. Section id `about`.
- [ ] **Step 4:** Wire into `PaperView.jsx`, verify in Paper view.
- [ ] **Step 5: Commit** `git add src/styles/paper.css src/views/paper && git commit -m "feat(paper): identity + about"`

---

## Task 12: Paper view — Selected Systems + Experience + Stack + Notes + Contact

**Files:**
- Create: `src/views/paper/sections/Work.jsx`, `Experience.jsx`, `Stack.jsx`, `Notes.jsx`, `Contact.jsx`

- [ ] **Step 1:** `Work.jsx` ("Selected Systems") — ledger list from featured projects: name, inline metric, short description, tag chips. Revamp Engine first. Section id `work`.
- [ ] **Step 2:** `Experience.jsx` — reverse-chronological timeline; company **monogram chip** (first letter of `company`), role, dates, one outcome each. Section id `experience`.
- [ ] **Step 3:** `Stack.jsx` — compact grouped lists from `primarySkillsets`. Section id `stack`.
- [ ] **Step 4:** `Notes.jsx` — titled list with `tags` as count-style chips, date, abstract. Section id `notes`.
- [ ] **Step 5:** `Contact.jsx` — clean footer row (GitHub, LinkedIn, email, resume). Section id `contact`.
- [ ] **Step 6:** Add styles; verify all 7 Paper sections render. 
- [ ] **Step 7: Commit** `git add src/styles/paper.css src/views/paper && git commit -m "feat(paper): work, experience, stack, notes, contact"`

---

## Task 13: Delete dead code

**Files (delete):**
- `src/components/sections/hero-variants/` (all 13)
- `src/components/sections/Hero.jsx`, old `About.jsx`, `Experience.jsx`, `Projects.jsx`, `Skills.jsx` (replaced by view sections), `Achievements.jsx`, `Contact.jsx`, `Education.jsx`, `GithubStats.jsx`, `ImpactStrip.jsx`
- `src/components/ThemePicker.jsx`, `src/context/ThemeContext.jsx`
- `src/styles/neobrutalism.css`, `editorial.css`, `hero.css`, `resume.css`
- `src/components/ui/SectionDivider.jsx`, `ResumeSectionHeader.jsx` (if unused after rebuild)
- Parallax stack (`src/components/effects/ParallaxScene.jsx`, `src/context/ParallaxContext.jsx`, `src/hooks/useParallax.js`, `src/styles/parallax.css`) — only if confirmed unreferenced.

- [ ] **Step 1:** Grep for references before each delete: `git grep -n "ThemeContext\|hero-variants\|ParallaxContext\|SectionDivider\|neobrutalism" src` — remove importers first.
- [ ] **Step 2:** Delete the files. Keep `CompanyLogo.jsx`, `Logo.jsx`, `Loader.jsx`, `Card.jsx` only if a view uses them; otherwise delete.
- [ ] **Step 3:** Run `yarn build`. Expected: build succeeds with no missing-import errors. Fix any dangling import.
- [ ] **Step 4: Commit** `git add -A && git commit -m "chore: remove hero variants, theme system, dead css"`

---

## Task 14: Motion, accessibility, reduced-motion

**Files:** view CSS + section components as needed.

- [ ] **Step 1:** Add subtle in-view reveal (Framer Motion `whileInView`, small y-offset, once) to section wrappers in both views. No per-element stagger storms.
- [ ] **Step 2:** Verify `prefers-reduced-motion` disables reveals + crossfade (already gated in `index.css`; ensure Framer respects it via `useReducedMotion`).
- [ ] **Step 3:** A11y pass: every section has an accessible heading; nav links and ViewSwitch are buttons/links with labels; palette is `role="dialog"` focus-trapped; focus rings visible in both views; AA contrast (amber on `--t-bg`, blue on white both pass; verify).
- [ ] **Step 4: Commit** `git add -A && git commit -m "feat: subtle motion + a11y pass"`

---

## Task 15: Playwright E2E + visual verification

**Files:**
- Create: `playwright.config.js`
- Create: `tests/views.spec.js`

- [ ] **Step 1:** `playwright.config.js` — `webServer` runs `yarn build && yarn preview --port 4173`, `baseURL: 'http://localhost:4173'`, project `chromium`.
- [ ] **Step 2:** `tests/views.spec.js`:

```js
import { test, expect } from '@playwright/test';

test('defaults to terminal view, no flash', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-view', 'terminal');
});

test('view switch flips layout and persists', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'paper' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-view', 'paper');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-view', 'paper');
});

test('deep link ?view=paper works', async ({ page }) => {
  await page.goto('/?view=paper');
  await expect(page.locator('html')).toHaveAttribute('data-view', 'paper');
});

test('command palette opens and switches view', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Meta+k');
  await expect(page.getByRole('dialog', { name: 'Command palette' })).toBeVisible();
  await page.getByPlaceholder('Type a command or search…').fill('paper');
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-view', 'paper');
});

test('key content + metrics present in both views', async ({ page }) => {
  for (const v of ['terminal', 'paper']) {
    await page.goto(`/?view=${v}`);
    await expect(page.getByText('Revamp Engine')).toBeVisible();
    await expect(page.getByText('T-Systems', { exact: false })).toBeVisible();
    await expect(page.getByText('10K', { exact: false })).toBeVisible();
    await expect(page.getByText('5M+', { exact: false })).toBeVisible();
  }
});

test('no em/en dashes in rendered text', async ({ page }) => {
  for (const v of ['terminal', 'paper']) {
    await page.goto(`/?view=${v}`);
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/[–—]/);
  }
});
```

- [ ] **Step 3:** Run `yarn check:content` then `npx playwright test`. Expected: all pass. Fix failures.
- [ ] **Step 4:** Visual check: screenshot both views at 1280px and 390px widths; eyeball against the mockups for fidelity and that all 7 sections render.
- [ ] **Step 5:** Run `yarn lint` and `yarn build`. Expected: clean.
- [ ] **Step 6: Commit** `git add playwright.config.js tests/ package.json && git commit -m "test: e2e for views, palette, content, dashes"`

---

## Task 16: Final polish + branch finish

- [ ] **Step 1:** Lighthouse (desktop) on `yarn preview`: Performance and Accessibility >= 95. Address any quick wins (image sizes, contrast, labels).
- [ ] **Step 2:** Re-run `yarn check:content`, `npx playwright test`, `yarn build`, `yarn lint` — all green. Capture the output.
- [ ] **Step 3:** Use superpowers:finishing-a-development-branch to decide merge/PR/cleanup with the user.

---

## Self-review notes

- **Spec coverage:** §3 decisions → Tasks 1,2,5,6; §4 architecture/file plan → Tasks 2,5,6,7,13; §5 anatomy (both views, 7 sections) → Tasks 8–12; §6 content → Tasks 3,4; §7 motion/a11y/SEO → Tasks 1,14,15; §8 acceptance → Tasks 4,15,16. All covered.
- **Dashes:** enforced by Task 4 (data) and Task 15 (rendered DOM).
- **No-flash + persistence:** Task 1 inline script + Task 2 context + Task 15 tests.
- **Names consistency:** `useView`, `setView`, `view-switch`, `cmdk`, `data-view` used identically across tasks.
- **Visual fidelity:** anchored to the committed mockup file rather than re-derived.
