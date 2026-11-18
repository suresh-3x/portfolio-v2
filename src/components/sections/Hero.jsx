import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { FileText } from 'lucide-react';
import { profile } from '../../data/profile';
import CompanyLogo from '../CompanyLogo';

const shippedAt = [
  { domain: 'www.t-systems.com', company: 'T-Systems', sub: 'Deutsche Telekom · AI platform', href: 'https://www.t-systems.com' },
  { domain: 'gridlogic.in', company: 'Gridlogic', sub: 'Real-money gaming · 5M+ MAU', href: 'https://gridlogic.in' },
  { domain: 'strideahead.io', company: 'Stride Ahead', sub: 'Founding engineer · 0 to 50K MAU', href: 'https://strideahead.io' },
];

// Local time in Mumbai, refreshed every 30s.
function useMumbaiTime() {
  const fmt = () =>
    new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Background grid is 64px from the page's left edge (terminal.css body background).
const GRID = 64;

// ponytail: nudge the logo panel left so its divider sits on a grid line; cheap measure on resize.
function useSnapToGrid(ref) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const snap = () => {
      el.style.transform = '';
      if (getComputedStyle(el).borderLeftStyle === 'none') return; // mobile: no divider
      const x = el.getBoundingClientRect().left + window.scrollX;
      el.style.transform = `translateX(${-(x % GRID)}px)`;
    };
    snap();
    document.fonts?.ready.then(snap);
    window.addEventListener('resize', snap);
    return () => window.removeEventListener('resize', snap);
  }, [ref]);
}

const Hero = () => {
  const time = useMumbaiTime();
  const logosRef = useRef(null);
  useSnapToGrid(logosRef);

  return (
    <section className="hero" id="home">
      <div className="hero-main">
        <div className="hero-copy">
        <h1 className="hero-name">Suresh Bhandari</h1>
        <p className="hero-intro">
          I&apos;m a backend and AI engineer. For five years I&apos;ve kept systems up for real
          people: a gaming platform with 5M+ monthly players peaking at 10K requests a second, and now
          10+ AI agents in production at T-Systems.
        </p>
        <div className="hero-cta">
          <a
            className="hero-cta__btn hero-cta__btn--primary mono"
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={15} aria-hidden="true" />
            Resume
          </a>
          <a className="hero-cta__btn mono" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        </div>

        <ul ref={logosRef} className="hero-logos" aria-label="Where I've shipped">
          {shippedAt.map((l) => (
            <li key={l.company}>
              <CompanyLogo logo={l} />
              <span>
                <strong>{l.company}</strong>
                <span className="mono">{l.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-foot mono">
        <span>
          <span className="hero-foot__dot" aria-hidden="true" />
          Backend engineer at T-Systems
        </span>
        <span>{time} IST</span>
      </div>

      <style>{`
        [data-view="terminal"] .hero {
          min-height: calc(100svh - var(--strip-h, 0px));
          display: flex;
          flex-direction: column;
          padding-top: 72px;
        }

        .mono { font-family: var(--font-mono); }

        .hero-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 0;
        }

        .hero-copy { min-width: 0; }

        .hero-logos {
          list-style: none;
          margin: clamp(2.5rem, 6vh, 3.5rem) 0 0;
          padding: 1.25rem 0 0;
          border-top: 1px solid var(--t-border);
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 2rem;
        }
        .hero-logos li { display: flex; align-items: center; gap: 0.75rem; }
        .hero-logos .company-logo { width: 28px; height: 28px; border-radius: 6px; }
        .hero-logos strong { display: block; font-family: var(--font-sans); font-size: 0.95rem; color: var(--t-text); }
        .hero-logos .mono { font-size: 0.72rem; color: var(--t-faint); }

        @media (min-width: 1024px) {
          .hero-main {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            gap: 4rem;
          }
          .hero-logos {
            margin: 0;
            padding: 0 0 0 2rem;
            border-top: 0;
            border-left: 1px solid var(--t-border);
            flex-direction: column;
            gap: 1.75rem;
          }
        }

        .hero-name {
          font-family: var(--font-sans);
          font-size: clamp(3.2rem, 8.5vw, 7.5rem);
          line-height: 0.95;
          font-weight: 800;
          letter-spacing: -0.045em;
          color: var(--t-text);
        }

        .hero-intro {
          margin-top: clamp(1.75rem, 4vh, 2.5rem);
          max-width: 34ch;
          font-family: var(--font-sans);
          font-size: clamp(1.2rem, 2.1vw, 1.65rem);
          line-height: 1.5;
          color: var(--t-muted);
        }

        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: clamp(2rem, 5vh, 3rem);
        }
        .hero-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.15rem;
          border: 1px solid var(--t-border);
          border-radius: 6px;
          background: var(--t-panel);
          color: var(--t-text);
          font-size: 0.85rem;
          font-weight: 600;
          transition: opacity 0.15s ease, border-color 0.15s ease;
        }
        .hero-cta__btn:hover { border-color: var(--t-muted); }
        .hero-cta__btn--primary {
          background: var(--t-accent);
          border-color: var(--t-accent);
          color: var(--t-on-accent);
        }
        .hero-cta__btn--primary:hover { opacity: 0.88; border-color: var(--t-accent); }

        .hero-foot {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0.5rem 2rem;
          padding: 1.25rem 0 1.5rem;
          border-top: 1px solid var(--t-border);
          font-size: 0.75rem;
          color: var(--t-faint);
        }
        .hero-foot__dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          margin-right: 0.6rem;
          border-radius: 50%;
          background: var(--t-ok);
          vertical-align: middle;
        }
      `}</style>
    </section>
  );
};

export default Hero;
