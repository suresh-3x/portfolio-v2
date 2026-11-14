import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { profile } from '../../data/profile';

const facts = [
  { value: '99.99%', label: 'uptime' },
  { value: '10K', label: 'req/sec peak' },
  { value: '15+', label: 'production AI agents' },
  { value: '5+ yrs', label: 'in production' },
];

const Hero = () => {
  const [count, setCount] = useState(4999900);

  useEffect(() => {
    const target = 5000000;
    const duration = 400; 
    const steps = 20;
    const stepTime = duration / steps;
    const increment = (target - 4999900) / steps;
    
    let current = 4999900;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-split">
        <div className="hero-left">
          <h1 className="sans">Suresh Bhandari</h1>
          <p className="hero-role mono">Senior Backend &amp; AI Engineer</p>
          <p className="hero-statement sans">
            I build distributed systems and agentic AI that stay boringly alive under real production load.
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

        <div className="hero-right">
          <div className="massive-number sans">{count.toLocaleString()}+</div>
          <p className="caption sans">active users supported by systems I've architected and scaled.</p>
        </div>
      </div>

      <ul className="hero-facts mono" aria-label="Career metrics">
        {facts.map((f) => (
          <li key={f.label}>
            <b>{f.value}</b> {f.label}
          </li>
        ))}
      </ul>

      <style>{`
        [data-view="terminal"] .hero {
          --text-main: var(--t-text);
          --text-muted: var(--t-muted);
          --text-faint: var(--t-faint);
          --accent: var(--t-accent);
          --border-color: var(--t-border);
          --bg-panel: var(--t-panel);
        }

        .hero {
          padding: clamp(6rem, 14vh, 10rem) 0 1rem;
        }

        .mono { font-family: var(--font-mono); }
        .sans { font-family: var(--font-sans); }

        .hero-split {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: end;
        }

        .hero-left h1 {
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text-main);
          margin-bottom: 1.25rem;
        }

        .hero-role {
          color: var(--text-muted);
          font-size: clamp(0.85rem, 1.2vw, 0.95rem);
          margin-bottom: 1.75rem;
        }

        .hero-statement {
          color: var(--text-main);
          font-size: clamp(1.15rem, 1.8vw, 1.45rem);
          line-height: 1.5;
          max-width: 32ch;
        }

        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 2.25rem;
        }
        .hero-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-panel);
          color: var(--text-main);
          font-size: 0.85rem;
          font-weight: 600;
          transition: opacity 0.15s ease, border-color 0.15s ease;
        }
        .hero-cta__btn:hover { border-color: var(--text-muted); }
        .hero-cta__btn--primary {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--t-on-accent);
        }
        .hero-cta__btn--primary:hover { opacity: 0.88; border-color: var(--accent); }

        .hero-right {
          padding-left: 4rem;
          border-left: 1px solid var(--border-color);
        }

        .massive-number {
          color: var(--accent);
          font-size: clamp(3.25rem, 6vw, 5.25rem);
          line-height: 1;
          font-weight: 300;
          letter-spacing: -0.05em;
          margin-bottom: 1rem;
        }

        .caption {
          color: var(--text-muted);
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          max-width: 28ch;
        }

        .hero-facts {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 2.5rem;
          margin-top: clamp(3rem, 7vh, 4.5rem);
          color: var(--text-muted);
          font-size: 0.8rem;
        }
        .hero-facts b {
          color: var(--text-main);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .hero-split { grid-template-columns: 1fr; gap: 3rem; }
          .hero-right {
            padding-left: 0;
            border-left: none;
            padding-top: 2.5rem;
            border-top: 1px solid var(--border-color);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
