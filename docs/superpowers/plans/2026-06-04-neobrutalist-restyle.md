# NeoBrutalist Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the portfolio into a NeoBrutalist visual language (hard borders, square corners, solid offset shadows, underscore headers, emoji markers) applied identically across all four themes (`dawn`, `dusk`, `mono-light`, `mono-dark`).

**Architecture:** Token-driven. Per-theme tokens (`--nb-*`) are defined in `ThemeContext.jsx`; a single, last-loaded `src/styles/neobrutalism.css` consumes those tokens to override existing surfaces (cards, buttons, badges, tags, nav, hero blade) globally. This avoids editing 116 scattered radius/shadow declarations by hand and guarantees all four themes get the same treatment automatically. Two header components get underscore + emoji updates.

**Tech Stack:** React 19, Vite, framer-motion, plain CSS with CSS custom properties, Playwright for QA.

**Reference spec:** `docs/superpowers/specs/2026-06-04-neobrutalist-restyle-design.md`

---

### Task 1: Add NeoBrutalist tokens to all four themes

**Files:**
- Modify: `src/context/ThemeContext.jsx` (each of the 4 theme objects: `dawn`, `dusk`, `mono-light`, `mono-dark`)

- [ ] **Step 1: Add `--nb-*` tokens to each theme object**

Add these keys to each theme. Border/shadow color is the only per-theme variation:

`dawn`:
```js
'--nb-border': '#111111',
'--nb-shadow-color': '#111111',
'--nb-shadow': '5px 5px 0 #111111',
'--nb-shadow-sm': '3px 3px 0 #111111',
'--nb-border-width': '2px',
```
`dusk` (accent rose shadow):
```js
'--nb-border': '#f5f5f5',
'--nb-shadow-color': '#f43f5e',
'--nb-shadow': '5px 5px 0 #f43f5e',
'--nb-shadow-sm': '3px 3px 0 #f43f5e',
'--nb-border-width': '2px',
```
`mono-light`:
```js
'--nb-border': '#000000',
'--nb-shadow-color': '#000000',
'--nb-shadow': '5px 5px 0 #000000',
'--nb-shadow-sm': '3px 3px 0 #000000',
'--nb-border-width': '2px',
```
`mono-dark`:
```js
'--nb-border': '#ffffff',
'--nb-shadow-color': '#ffffff',
'--nb-shadow': '5px 5px 0 #ffffff',
'--nb-shadow-sm': '3px 3px 0 #ffffff',
'--nb-border-width': '2px',
```

- [ ] **Step 2: Verify the dev server compiles**

Run: `yarn dev` (already running is fine) - confirm no syntax error, tokens present via DevTools `getComputedStyle(document.documentElement).getPropertyValue('--nb-shadow')`.

- [ ] **Step 3: Commit**

```bash
git add src/context/ThemeContext.jsx
git commit -m "feat(theme): add neobrutalist border/shadow tokens to all themes"
```

---

### Task 2: Create the global NeoBrutalist override stylesheet

**Files:**
- Create: `src/styles/neobrutalism.css`
- Modify: `src/main.jsx` (import it LAST so it overrides)

- [ ] **Step 1: Create `src/styles/neobrutalism.css`**

```css
/* NeoBrutalist global layer - loaded last, consumes --nb-* tokens.
   One language for all four themes; only border/shadow color varies. */

/* 1. Square every primary surface. */
.custom-card,
.stack-card,
.proof-card,
.system-blade,
.nav-island,
.primary-btn,
.secondary-btn,
.system-status,
.stack-tag,
.tag-module,
.theme-option-card,
.experience-card,
.project-card,
.module-tags span,
.mobile-menu-overlay .mobile-nav-link {
  border-radius: 0 !important;
}

/* 2. Hard border + solid offset shadow on cards/surfaces. */
.custom-card,
.stack-card,
.proof-card,
.system-blade,
.experience-card,
.project-card {
  border: var(--nb-border-width) solid var(--nb-border) !important;
  box-shadow: var(--nb-shadow) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* 3. Buttons - hard border, offset shadow, tactile press on hover. */
.primary-btn,
.secondary-btn {
  border: var(--nb-border-width) solid var(--nb-border) !important;
  box-shadow: var(--nb-shadow-sm) !important;
  transition: transform 0.08s ease, box-shadow 0.08s ease !important;
}
.primary-btn:hover,
.secondary-btn:hover {
  transform: translate(3px, 3px) !important;
  box-shadow: 0 0 0 var(--nb-shadow-color) !important;
}

/* 4. Hoverable cards press the same way (override framer float visually). */
.custom-card:hover,
.stack-card:hover,
.experience-card:hover,
.project-card:hover {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0 var(--nb-shadow-color) !important;
  border-color: var(--nb-border) !important;
}

/* 5. Badges / tags / status chips - bordered, square, small offset. */
.system-status,
.stack-tag,
.tag-module,
.module-tags span {
  border: var(--nb-border-width) solid var(--nb-border) !important;
  box-shadow: var(--nb-shadow-sm) !important;
}

/* 6. Kill soft blurred shadows left elsewhere on those surfaces. */
.system-blade { box-shadow: var(--nb-shadow) !important; }

/* 7. Respect reduced motion: no translate press. */
@media (prefers-reduced-motion: reduce) {
  .primary-btn:hover,
  .secondary-btn:hover,
  .custom-card:hover,
  .stack-card:hover,
  .experience-card:hover,
  .project-card:hover {
    transform: none !important;
  }
}
```

- [ ] **Step 2: Import last in `src/main.jsx`**

Change the import block so `neobrutalism.css` loads after `index.css`:
```js
import './index.css'
import './styles/neobrutalism.css'
```
(Place the second line immediately after the existing `import './index.css'`.)

- [ ] **Step 3: Visually verify across all four themes**

In the browser, switch through dawn / dusk / mono-light / mono-dark. Expect: square corners, hard borders, solid offset shadows on cards/buttons/badges; dusk shows rose-colored shadows; mono-dark shows white shadows. Buttons "press" on hover.

- [ ] **Step 4: Commit**

```bash
git add src/styles/neobrutalism.css src/main.jsx
git commit -m "feat(style): add global neobrutalist override layer"
```

---

### Task 3: Underscore + emoji section headers

**Files:**
- Modify: `src/components/ui/ResumeSectionHeader.jsx`
- Modify: `src/components/ui/SectionDivider.jsx`
- Modify: `src/index.css` (divider + section title styles)

- [ ] **Step 1: Add an `emoji` prop + underscore transform to `ResumeSectionHeader.jsx`**

```jsx
import React from 'react';

// Turns "About Me" -> "ABOUT_ME"
const toUnderscore = (s) => s.replace(/\s+/g, '_').toUpperCase();

const ResumeSectionHeader = ({ id, title, subtitle, emoji }) => (
  <header className="resume-section-header">
    <h2 id={`${id}-heading`} className="resume-section-title">
      {emoji && <span className="section-emoji" aria-hidden="true">{emoji} </span>}
      {toUnderscore(title)}
    </h2>
    <hr className="resume-rule" />
    {subtitle && <p className="resume-section-subtitle">{subtitle}</p>}
  </header>
);

export default ResumeSectionHeader;
```

- [ ] **Step 2: Same treatment for `SectionDivider.jsx`**

Replace the title rendering so it shows an optional emoji and underscores, keeping the existing line/hash structure:
```jsx
import React from 'react';

const toUnderscore = (s) => s.replace(/\s+/g, '_').toUpperCase();

const SectionDivider = ({ title, subtitle, colorVar = '--accent-primary', id, emoji }) => {
    return (
        <div className="section-divider-v4" id={id}>
            <div className="divider-line-container">
                <div className="line left" style={{ '--current-accent': `var(${colorVar})` }}></div>
                <div className="divider-core">
                    {emoji
                      ? <span className="divider-emoji" aria-hidden="true">{emoji}</span>
                      : <span className="hash" style={{ color: `var(${colorVar})` }}>#</span>}
                    <h2 className="divider-title">{toUnderscore(title)}</h2>
                </div>
                <div className="line right" style={{ '--current-accent': `var(${colorVar})` }}></div>
            </div>
            {subtitle && <p className="divider-subtitle">{subtitle}</p>}
        </div>
    );
};

export default SectionDivider;
```

- [ ] **Step 3: Add emoji sizing CSS to `index.css`** (near `.divider-title`)

```css
.divider-emoji { font-size: 1.4rem; line-height: 1; }
.section-emoji { font-size: 0.9em; }
```

- [ ] **Step 4: Pass emoji where the dividers/headers are used**

Find usages and add the `emoji` prop per the spec mapping (💼 Experience · 🚀 Projects · 🧠 Skills · 🎓 Education · ⚡ Achievements · 📊 GitHub · ✉️ Contact · 👋 About).
Run: `grep -rIn "SectionDivider\|ResumeSectionHeader" src/components/sections` to locate call sites, then add `emoji="💼"` etc. to each.

- [ ] **Step 5: Verify underscores + emoji render; commit**

```bash
git add src/components/ui/ResumeSectionHeader.jsx src/components/ui/SectionDivider.jsx src/index.css src/components/sections
git commit -m "feat(headers): underscore + emoji section headers"
```

---

### Task 4: Hero brutalist pass

**Files:**
- Modify: `src/index.css` (hero blade, buttons, proof cards, status - only where Task 2 overrides don't reach)

- [ ] **Step 1: Square the hero blade rotation surfaces**

In `src/index.css`, change every `border-radius` inside `.system-blade`, `.blade-*`, `.module-*`, `.proof-card`, `.hero-section .primary-btn/.secondary-btn`, `.stack-card`, `.stack-tag` to `0`. (Task 2 already forces the main ones via `!important`; this cleans the source so there are no stale rounded values.)

- [ ] **Step 2: Verify hero in all 4 themes** - blade has hard border + offset shadow, buttons press, proof cards are square with offset shadows.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(hero): square corners + offset shadows on hero surfaces"
```

---

### Task 5: Section-level emoji markers + radius cleanup sweep

**Files:**
- Modify: `src/styles/resume.css`, `src/styles/experience.css`, `src/styles/editorial.css`, `src/styles/parallax.css`
- Modify: section components under `src/components/sections/*` as needed for inline radius values

- [ ] **Step 1: Replace remaining rounded radii on visible surfaces**

For each style file, change `border-radius: <n>` to `border-radius: 0` for cards/chips/tags/pills/buttons (leave avatars/circles that are intentionally round, e.g. `border-radius: 50%`, untouched).
Run to find candidates: `grep -rIn "border-radius" src/styles src/components/sections`

- [ ] **Step 2: Add inline emoji markers to content blocks where the spec calls for them** (e.g. a leading emoji on Experience role rows, Project titles) - keep minimal and consistent.

- [ ] **Step 3: Visually scan every section in all 4 themes for stray rounded corners / soft shadows.** Fix any missed surface by adding its class to the appropriate selector list in `neobrutalism.css`.

- [ ] **Step 4: Commit**

```bash
git add src/styles src/components/sections
git commit -m "feat(sections): square corners + emoji markers across sections"
```

---

### Task 6: Verify build + QA

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `yarn build`
Expected: completes with no errors.

- [ ] **Step 2: Run Playwright QA**

Run: `yarn dev` in one shell, then `npx playwright test`
Expected: existing TC-01..TC-08 pass (theme switching, persistence, favicon, mobile, scroll). These are structural and should be unaffected by the restyle.

- [ ] **Step 3: Manual cross-theme check** - load the site, cycle all 4 themes, scroll every section. Confirm: square corners everywhere, hard borders, solid offset shadows (rose on dusk, white on mono-dark), underscore headers with emoji, button press hover, no soft blurred shadows or rounded cards remaining.

- [ ] **Step 4: Final commit if any fixes**

```bash
git add -A
git commit -m "fix: neobrutalist QA cleanup"
```

---

## Self-Review notes

- **Spec coverage:** sharp corners (T2/T4/T5), hard borders (T2), offset shadows + per-theme color table (T1/T2), press hover + reduced-motion (T2), underscore headers + emoji (T3/T5), brand-accent palette kept (no lime/yellow introduced), backgrounds unchanged (no bg edits), all 4 themes via tokens (T1). Covered.
- **No restructuring:** plan only restyles; no section/layout/content changes. Matches scope.
- **Risk:** the `!important` override layer is intentional - existing CSS is highly specific and scattered; centralizing in `neobrutalism.css` keeps the four themes consistent and the change reviewable in one file.
