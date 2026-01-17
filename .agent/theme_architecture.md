# Portfolio Color Architecture: R-G-B Cycle

This document defines the core visual logic for the portfolio's color distribution across sections and components.

## 1. Core Color Mapping
The portfolio uses a 3-step color cycle derived from the theme's core variables:
- **Red (R)**: Associated with `--accent-primary`.
- **Green (G)**: Associated with `--accent-secondary`.
- **Blue (B)**: Associated with `--accent-tertiary`.

## 2. Section Hashtag Cycle
Section hashtags (`#`) rotate through the R -> G -> B sequence starting from the first content section (About).

1. **About**: Red (`--accent-primary`)
2. **Experience**: Green (`--accent-secondary`)
3. **Skills**: Blue (`--accent-tertiary`)
4. **Projects**: Red (`--accent-primary`)
5. **Github Stats**: Green (`--accent-secondary`)
6. **Education**: Blue (`--accent-tertiary`)
7. **Contact**: Red (`--accent-primary`)

## 3. Component Color Distribution (Columns)
Regardless of the active theme, all section content should conceptually follow a 3-column / 3-step color distribution from left-to-right:

- **Left (Step 1)**: Primary Accent (Red)
- **Middle (Step 2)**: Secondary Accent (Green)
- **Right (Step 3)**: Tertiary Accent (Blue)

For grids with more than 3 items, the color should cycle back (R-G-B-R-G-B...).

## 4. Constraint: Header Consistency
The header menu, logo accents, and theme picker toggles remain under the control of the Global Theme Context and should not be modified by individual section logic to maintain a unified navigation experience.
