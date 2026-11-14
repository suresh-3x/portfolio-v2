import { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { profile } from '../../data/profile';

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

const Hero = () => {
  const time = useMumbaiTime();

  return (
    <section className="hero" id="home">
      <div className="hero-main">
        <h1 className="hero-name">Suresh Bhandari</h1>
        <p className="hero-intro">
          I&apos;m a backend and AI engineer in Mumbai. For five years I&apos;ve kept systems up for real
          people: a gaming platform with 5M+ monthly players peaking at 10K requests a second, and now
          15+ AI agents in production at T-Systems.
        </p>
        <div className="hero-cta">
          <a
            className="hero-cta__btn hero-cta__btn--primary mono"
            href={profile.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarDays size={15} aria-hidden="true" />
            Book a call
          </a>
          <a className="hero-cta__btn mono" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
      </div>

      <div className="hero-foot mono">
        <span>
          <span className="hero-foot__dot" aria-hidden="true" />
          Backend engineer at T-Systems. Open to senior roles.
        </span>
        <span>Mumbai, {time} IST</span>
      </div>

      <style>{`
        [data-view="terminal"] .hero {
          min-height: 100svh;
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
