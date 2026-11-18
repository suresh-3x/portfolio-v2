import { useLayoutEffect } from 'react';

// Background grid pitch (see body background in terminal.css).
const G = 64;
// ponytail: no snapping at phone widths; padding to 64px lines blows up spacing on a 375px screen.
const PHONE = 760;

/*
 * Snap structural lines onto the background grid.
 * - Grid origin moves to the content column's left edge and the header's bottom edge.
 * - Content width is trimmed to a multiple of G so the right edge also lands on a line.
 * - Listed elements get small extra space (< G) so their border sits on a grid line.
 *
 * ponytail: one measure pass in document order, re-run on resize/route/content-size change.
 * Ceiling: card edges inside multi-column grids (gaps) are not snapped horizontally across columns.
 */
const RULES = [
  // [selector, mode]
  // top:    element's top border -> grid line (adds margin-top)
  // bottom: element's bottom border -> grid line (grows min-height)
  // box:    top via margin-top, bottom via min-height
  // end:    element's bottom edge -> grid line (adds min-height); used for the hero
  // line:   left border via translateX (<= G-1 px left), or top border via margin-top
  // cols:   CSS grid -> whole-cell column widths with a one-cell gap
  // center: centered column -> nearest grid line left of centre (margin-left)
  ['.hero', 'end'],
  ['.hero-logos', 'line'],
  ['.note-article', 'center'],
  ['.t-about__principles', 'top'],
  ['.t-about__principles li', 'bottom'],
  ['.xp-head', 'bottom'],
  ['.xp-grid', 'cols'],
  ['.xp-card', 'box'],
  ['.xp-rows', 'top'],
  ['.xp-rows li', 'bottom'],
  ['.t-prompt', 'box'],
  ['.page-header', 'bottom'],
  ['.project-metrics-grid', 'cols'],
  ['.metric-card', 'box'],
  ['.principles-grid', 'cols'],
  ['.stack-grid', 'cols'],
  ['.pj-grid', 'cols'],
  ['.pj-card', 'box'],
  ['.sidebar-box', 'box'],
  ['.note-takeaways', 'box'],
  ['.pager', 'top'],
  ['.pager__grid', 'cols'],
  ['.pager__card', 'box'],
];
// Add d px above el. Handles sibling margin collapsing (block flow) and re-checks the result.
function nudgeTop(el, cur, gy) {
  const d = mod(-gy(pagePos(el).y));
  if (!d) return;
  let base = px(cur.marginTop);
  const prev = el.previousElementSibling;
  if (prev && /^(block|flow-root|list-item)$/.test(getComputedStyle(el.parentElement).display)) {
    base = Math.max(base, px(getComputedStyle(prev).marginBottom)); // collapsed gap is the larger margin
  }
  el.style.marginTop = `${base + d}px`;
  for (let i = 0; i < 3; i++) {
    const r = mod(-gy(pagePos(el).y));
    if (r < 1 || r > G - 1) break; // offsetTop is whole px, origin may be fractional
    el.style.marginTop = `${px(el.style.marginTop) + r}px`;
  }
}
const px = (v) => parseFloat(v) || 0;

const PROPS = ['marginTop', 'paddingBottom', 'boxSizing', 'minHeight', 'transform', 'marginLeft', 'marginRight', 'gridTemplateColumns', 'columnGap'];
const mod = (n) => ((n % G) + G) % G;

// Layout position on the page, ignoring transforms (entrance animations would skew getBoundingClientRect).
function pagePos(el) {
  let x = 0;
  let y = 0;
  for (let e = el; e; e = e.offsetParent) {
    x += e.offsetLeft + (e.offsetParent ? e.offsetParent.clientLeft : 0);
    y += e.offsetTop + (e.offsetParent ? e.offsetParent.clientTop : 0);
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

function snap() {
  const root = document.documentElement;
  // Phones: URL-bar show/hide fires resize constantly while scrolling. Undo snapping once, then bail early.
  if (window.innerWidth <= PHONE) {
    if (root.dataset.snapOff) return;
    root.dataset.snapOff = '1';
  } else {
    delete root.dataset.snapOff;
  }
  // Transitions on margin/min-height would make every read a half-animated value.
  root.classList.add('grid-snapping');
  try {
    snapNow(root);
  } finally {
    void document.body.offsetHeight; // settle final values before transitions come back
    root.classList.remove('grid-snapping');
  }
}

function snapNow(root) {
  const main = document.querySelector('.main-content');
  const nav = document.querySelector('.site-nav');
  if (!main || !nav) return;

  // Vertical origin + width trim.
  const cs = getComputedStyle(main);
  const pl = parseFloat(cs.paddingLeft);
  const gx = pagePos(main).x + pl;
  const width = main.clientWidth - 2 * pl;
  root.style.setProperty('--grid-x', `${mod(gx)}px`);
  root.style.setProperty('--snap-pr', `${mod(width)}px`);
  const gyOrigin = nav.getBoundingClientRect().bottom + window.scrollY; // header bottom at page top
  root.style.setProperty('--grid-y', `${mod(gyOrigin)}px`);

  const sel = RULES.map(([s]) => s).join(',');
  const footer = document.querySelector('.site-footer');
  // main + footer go last: main's height depends on everything snapped inside it.
  const els = [...document.querySelectorAll(sel), main, footer].filter(Boolean);

  // Restore what we changed last time, so measurements start from the natural layout.
  for (const el of els) {
    if (!el.dataset.snapped) continue;
    const orig = JSON.parse(el.dataset.snapped);
    for (const p of PROPS) el.style[p] = orig[p];
  }
  if (window.innerWidth <= PHONE) {
    root.style.setProperty('--snap-pr', '0px');
    return;
  }
  const save = (el) => {
    if (!el.dataset.snapped) {
      el.dataset.snapped = JSON.stringify(Object.fromEntries(PROPS.map((p) => [p, el.style[p]])));
    }
  };
  const gy = (y) => mod(y - gyOrigin); // y is a page coordinate

  for (const el of els) {
    const mode = el === main ? 'end' : el === footer ? 'top' : RULES.find(([s]) => el.matches(s))[1];
    if (getComputedStyle(el).display === 'none') continue;
    save(el);
    const cur = getComputedStyle(el);
    if (mode === 'top' || mode === 'box') nudgeTop(el, cur, gy);
    if (mode === 'bottom') {
      // grow via min-height (border-box): padding alone does nothing when a CSS min-height dominates
      const { y, h } = pagePos(el);
      const d = mod(-gy(y + h - 1));
      if (d) {
        el.style.boxSizing = 'border-box';
        el.style.minHeight = `${h + d}px`;
      }
    }
    if (mode === 'box') {
      const h = el.offsetHeight;
      el.style.minHeight = `${Math.ceil((h - 1) / G) * G + 1}px`;
    }
    if (mode === 'end') {
      const { y, h } = pagePos(el);
      const d = mod(-gy(y + h));
      if (d) el.style.minHeight = `${h + d}px`;
    }
    if (mode === 'line') {
      if (cur.borderLeftStyle !== 'none') {
        const d = mod(pagePos(el).x - gx);
        if (d) el.style.transform = `translateX(${-d}px)`;
      } else if (cur.borderTopStyle !== 'none') {
        // translate, not margin: the hero column is vertically centred, so margin would only move it half
        const d = mod(-gy(pagePos(el).y));
        if (d) el.style.transform = `translateY(${d}px)`;
      }
    }
    if (mode === 'cols') {
      // auto-fit reports empty 0px tracks; count real columns only, never more than children
      const n = Math.min(cur.gridTemplateColumns.split(' ').filter((t) => px(t) > 0).length, el.children.length);
      const cells = Math.floor(el.clientWidth / G) - (n - 1);
      if (n > 1 && cells >= n) {
        const base = Math.floor(cells / n);
        const extra = cells % n; // first `extra` columns get one more cell
        el.style.gridTemplateColumns = Array.from({ length: n }, (_, i) => `${(base + (i < extra)) * G}px`).join(' ');
        el.style.columnGap = `${G}px`;
      }
    }
    if (mode === 'center') {
      const pcs = getComputedStyle(el.parentElement);
      const cl = pagePos(el.parentElement).x + el.parentElement.clientLeft + px(pcs.paddingLeft); // parent content-box left
      const cw = el.parentElement.clientWidth - px(pcs.paddingLeft) - px(pcs.paddingRight);
      const ideal = cl + (cw - el.offsetWidth) / 2;
      el.style.marginLeft = `${Math.max(0, ideal - mod(ideal - gx) - cl)}px`;
      el.style.marginRight = 'auto';
    }
  }
}

export default function useGridSnap(key) {
  useLayoutEffect(() => {
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(snap);
    };
    snap();
    document.fonts?.ready.then(run);
    window.addEventListener('resize', run);
    const main = document.querySelector('.main-content');
    const ro = main ? new ResizeObserver(run) : null;
    ro?.observe(main);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', run);
      ro?.disconnect();
    };
  }, [key]);
}
