# NeoBrutalist Restyle — Design Spec

**Date:** 2026-06-04
**Status:** Approved (pending spec review)
**Reference:** https://singhinusa.dev/ ("Built with NeoBrutalism")

## Goal

Replace the current refined "system blade" visual language with a **full NeoBrutalist** aesthetic, applied as **one consistent design language across all four existing themes** (`dawn`, `dusk`, `mono-light`, `mono-dark`). Restyle only — no changes to section structure, content, or page layout.

## Decisions (locked)

- **Direction:** Full NeoBrutalist (not toned-down).
- **Scope:** Restyle everything in place. All current sections stay (Hero, About, Experience, Skills, Projects, Education, Achievements, GitHub stats, Contact) with their existing layouts and content.
- **Signature elements adopted:** underscore monospace section headers + emoji markers.
- **Signature elements NOT adopted:** loud lime/yellow flat color blocks, `// comment`-style labels.
- **Palette:** keep existing brand accents (rose / emerald / blue). No loud brutalist lime/yellow.
- **Dark-theme offset shadow:** accent-colored (rose) on `dusk`; light/white on `mono-dark`.
- **Corners:** `border-radius: 0` everywhere.
- **Emoji placement:** in section headers (e.g. `💼 EXPERIENCE`) and natural inner content blocks. Matches the reference.

## Core visual rules (apply to every theme)

1. **Sharp corners** — `border-radius: 0` on all cards, buttons, badges, tags, inputs, the hero blade.
2. **Hard borders** — `2px` solid border on every surface.
3. **Solid offset shadows** — no blur:
   - Cards: `5px 5px 0 <shadow-color>`
   - Badges / buttons / tags: `3px 3px 0 <shadow-color>`
4. **Press interaction** — interactive elements (buttons, links, hoverable cards) translate `2–3px` toward their shadow on hover, and the shadow shrinks by the same amount so the element appears to press down. Replaces the current `translateY(-3px)` float and soft blurred shadows.
5. **Typography** — keep existing Space Mono (headings/labels) + Inter (body) pairing.
6. **Backgrounds** — keep each theme's existing background color. No warm-cream swap.
7. **Motion** — respect `prefers-reduced-motion`: disable the press translate (keep instant state change).

## Per-theme border + shadow color

The only thing that varies between themes:

| Theme | Border color | Offset shadow color |
|---|---|---|
| `dawn` | `#111111` | `#111111` |
| `mono-light` | `#000000` | `#000000` |
| `dusk` | `#f5f5f5` | `#f43f5e` (rose accent) |
| `mono-dark` | `#ffffff` | `#ffffff` |

## Signature elements

- **Underscore section headers:** `ABOUT_ME`, `WORK_I'M_PROUD_OF`, etc. — monospace, uppercase, underscores instead of spaces. Updates `ResumeSectionHeader` and `SectionDivider` (v4).
- **Emoji markers:** one leading emoji per section / major content block. Suggested mapping:
  - 💼 Experience · 🚀 Projects · 🧠 Skills · 🎓 Education · ⚡ Achievements · 👋 / hero · 📊 GitHub stats · ✉️ Contact
- **Badges/tags:** bordered chips (2px border, `3px 3px 0` shadow, square). Brand-color fills used sparingly for emphasis, not as the default.

## Implementation approach

Token-driven so all four themes inherit identical treatment automatically.

1. **Tokens** — add to each theme object in `src/context/ThemeContext.jsx`:
   - `--nb-border` (border color)
   - `--nb-shadow-color`
   - `--nb-shadow` → `5px 5px 0 var(--nb-shadow-color)`
   - `--nb-shadow-sm` → `3px 3px 0 var(--nb-shadow-color)`
   - `--nb-border-width` → `2px`
   - Set `--radius`/equivalent to `0` (or override radii in CSS).
2. **Utilities** — new `src/styles/neobrutalism.css` with reusable classes driven by the tokens:
   - `.nb-card`, `.nb-badge`, `.nb-tag`, `.nb-btn` (+ `.nb-btn--primary`)
   - shared `:hover` press behavior + `prefers-reduced-motion` guard
   - Import in `src/main.jsx` / wherever global styles load.
3. **Section headers** — update `src/components/ui/ResumeSectionHeader.jsx` and `src/components/ui/SectionDivider.jsx` (+ `index.css` divider styles) for underscore + emoji.
4. **Sweep** — convert existing components/CSS to tokens + utilities and `border-radius: 0`:
   - `index.css` (hero, blade, buttons, tags, proof cards, dividers)
   - `src/styles/*.css` (editorial, experience, hero, resume, parallax)
   - `src/components/ui/Card.jsx`, section components as needed.
5. **Hero** — restyle the `system-blade` and buttons to brutalist (square, hard border, offset shadow, press hover). Keep its structure and the variant system intact.

## Out of scope

- Section/content/layout restructuring (no single-column resume reflow).
- Adding/removing themes (stays at 4).
- Loud brutalist accent palette.
- New sections or copy changes.

## Success criteria

- All four themes render the same NeoBrutalist language (hard borders, square corners, solid offset shadows, underscore headers, emoji markers), differing only in border/shadow color per the table above.
- No soft blurred shadows or rounded corners remain on primary surfaces.
- Hover "press" interaction works and is disabled under `prefers-reduced-motion`.
- Existing Playwright tests still pass; no layout/content regressions.
