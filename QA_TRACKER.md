# Portfolio QA Tracker Sheet

## Project Overview
**Target:** Portfolio V2
**Framework:** Vite + React + Vanilla CSS
**Themes:** Dawn, Dusk, Mono-Light, Mono-Dark

## Test Categories
1.  **Themes & UI:** Theme switching, color consistency, and visual polish.
2.  **Responsiveness:** Mobile and Desktop layouts.
3.  **Scroll Behavior:** Last scroll position persistence, Navbar overlap/occlusion.

---

## Tracker Table

| ID | Category | Test Case Description | Expected Result | Automated | AI Agent | Manual | Notes |
|:---|:---|:---|:---|:---|:---|:---|:---|
| TC-01 | Themes | Toggle all 4 themes (Dawn, Dusk, Mono-Light, Mono-Dark) | UI colors update correctly for each theme; no broken styles. | ✅ Passed | ✅ Passed | ✅ Passed | Verified across Desktop and Mobile. |
| TC-02 | Themes | Persistence after reload | Selected theme is saved in localStorage and applied on reload. | ✅ Passed | ✅ Passed | ✅ Passed | Verified with Playwright and AI Agent. |
| TC-03 | UI | Navbar visibility | Navbar is visible and functional across all themes. | ✅ Passed | ✅ Passed | ✅ Passed | Verified Desktop and Mobile burger menu. |
| TC-04 | Responsiveness | Desktop Layout (1440px+) | No horizontal scroll; sections are well-aligned. | ✅ Passed | ✅ Passed | ✅ Passed | Verified no overflow. |
| TC-05 | Responsiveness | Mobile Layout (375px - 425px) | Responsive layout; no overflow; burger menu works. | ✅ Passed | ✅ Passed | ✅ Passed | Verified on iPhone 12 Pro (390px). |
| TC-06 | Scroll | Navbar Overlap | Navbar does not cover section headings or content when navigating via links or scrolling. | ✅ Passed | ✅ Passed | ✅ Passed | `scroll-margin-top: 180px` handles this perfectly. |
| TC-07 | Scroll | Scroll Position Persistence | Page restores last scroll position after a reload. | ✅ Passed | ✅ Passed | ✅ Passed | **Fixed**: Added `localStorage` persistence logic in `App.jsx`. |
| TC-08 | Scroll | Smooth Scrolling | Clicking navbar links scrolls smoothly to sections. | ✅ Passed | ✅ Passed | ✅ Passed | Playwright and Agent confirmed smooth scroll. |

---

## Execution Logs

### Session 1: Initial QA Run (2025-12-31)
- [ ] Initialize Dev Server
- [ ] Execute TC-01 to TC-08
- [ ] Document bugs if any
