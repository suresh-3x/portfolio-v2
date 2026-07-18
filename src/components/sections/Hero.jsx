import React, { useState, useEffect } from 'react';

const metrics = [
  { value: '99.99%', label: 'UPTIME MAINTAINED' },
  { value: '10K', label: 'REQ/SEC PEAK' },
  { value: '15+', label: 'PRODUCTION AI AGENTS' },
  { value: '5+ yrs', label: 'INFRASTRUCTURE' },
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
      <div className="hero-shell">
        <div className="hero-topline">
          <p className="breadcrumb mono">
            <span>main</span>
            <span className="sep">/</span>
            <strong className="current">polymath</strong>
            <span className="sep">/</span>
            <span>building things that should not be possible alone</span>
          </p>
          <div className="status-pill mono">
            <span className="status-dot"></span>
            STATUS: locked in
          </div>
        </div>

        <div className="hero-split">
          <div className="hero-left">
            <h1 className="sans">Suresh Bhandari</h1>
            <p className="hero-role mono">
              Senior Backend &amp; AI Engineer
            </p>
            <p className="hero-statement sans">
              I build distributed systems and agentic AI that stay boringly alive under real production load.
            </p>
            <p className="hero-range mono">
              range: bare-metal Linux to distributed infrastructure to agentic AI
            </p>
          </div>

          <div className="hero-right">
            <p className="kicker mono">Most engineers ship code.</p>
            <h2 className="sans">The best ones ship judgment.</h2>
            <div className="massive-number sans">
              {count.toLocaleString()}+
            </div>
            <p className="caption sans">active users supported by systems I've architected and scaled.</p>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-metrics" aria-label="Career metrics">
            {metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong className="sans">{metric.value}</strong>
                <span className="mono">{metric.label}</span>
              </div>
            ))}
          </div>
          <p className="stack-line mono">
            <span className="accent">stack:</span> Python, FastAPI, Node.js, Google ADK, RAG, RabbitMQ, Redis, gRPC, PostgreSQL, AWS
            <span className="cursor"></span>
          </p>
        </div>
      </div>

      <style>{`
        .hero {
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: stretch;
          padding: clamp(3rem, 6vw, 6rem) 0;
          border-bottom: 1px solid var(--border-color);
        }

        .hero-shell {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .mono { font-family: var(--font-mono); }
        .sans { font-family: var(--font-sans); }

        [data-view="terminal"] .hero {
          --text-main: var(--t-text);
          --text-muted: var(--t-muted);
          --text-faint: var(--t-faint);
          --accent: var(--t-accent);
          --border-color: var(--t-border);
          --bg-panel: var(--t-panel);
          --ok-color: var(--t-ok);
        }

        [data-view="paper"] .hero {
          --text-main: var(--p-text);
          --text-muted: var(--p-muted);
          --text-faint: var(--p-faint);
          --accent: var(--p-accent);
          --border-color: var(--p-rule);
          --bg-panel: var(--p-chip);
          --ok-color: var(--p-accent);
        }

        .hero-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
          margin-bottom: 4rem;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          line-height: 1.5;
        }

        .breadcrumb .current {
          color: var(--accent);
          font-weight: 700;
        }
        
        .breadcrumb .sep {
          color: var(--text-faint);
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          border: 1px solid var(--border-color);
          background: var(--bg-panel);
          color: var(--text-main);
          border-radius: 4px; 
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--ok-color);
        }

        .hero-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .hero-left h1 {
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 1;
          font-weight: 800; /* Increased weight for H1 supremacy */
          letter-spacing: -0.03em;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          margin-top: 0;
        }

        .hero-role {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          color: var(--text-main);
          font-size: clamp(0.85rem, 1.2vw, 1rem);
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .hero-role .prompt { color: var(--accent); }
        .hero-role em { font-style: normal; color: var(--text-muted); font-weight: 400; }
        .hero-role .bullet { color: var(--text-faint); font-size: 0.8em; }

        .hero-statement {
          color: var(--text-main);
          font-size: clamp(1.15rem, 1.8vw, 1.5rem);
          line-height: 1.5;
          margin-bottom: 2rem;
          font-weight: 450;
        }

        .hero-range {
          color: var(--text-muted);
          font-size: clamp(0.75rem, 1vw, 0.85rem);
          line-height: 1.6;
        }

        .hero-range .arrow { color: var(--accent); }

        .hero-right {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-left: 4rem;
          border-left: 1px solid var(--border-color);
        }

        .kicker {
          color: var(--text-faint);
          font-size: clamp(0.85rem, 1vw, 1rem);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          font-weight: 600;
          margin-top: 0;
        }

        .hero-right h2 {
          color: var(--text-main);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }

        .massive-number {
          color: var(--text-main);
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          line-height: 1;
          font-weight: 300; /* Decreased weight for engineered look */
          letter-spacing: -0.05em; /* Tighter tracking */
          font-variant-numeric: tabular-nums;
          margin-bottom: 1rem;
        }
        
        [data-view="terminal"] .massive-number {
          color: var(--accent);
        }

        .caption {
          color: var(--text-muted);
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          font-weight: 500;
          max-width: 80%;
        }

        .hero-bottom {
          margin-top: auto;
        }

        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--border-color);
          border-right: none;
        }
        
        /* Hover dimming effect */
        .hero-metrics:hover .metric {
          opacity: 0.3;
        }

        .metric {
          padding: 1.5rem;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: opacity 0.2s ease;
        }
        
        .hero-metrics .metric:hover {
          opacity: 1;
        }

        .metric strong {
          color: var(--text-main);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        [data-view="terminal"] .metric strong {
          color: var(--accent);
        }

        .metric span {
          color: var(--text-muted);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stack-line {
          margin-top: 1.5rem;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        
        .stack-line .accent {
          color: var(--accent);
          font-weight: 700;
        }

        .cursor {
          display: inline-block;
          width: 0.5rem;
          height: 1rem;
          margin-left: 0.5rem;
          background: var(--accent);
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink { 50% { opacity: 0; } }

        @media (max-width: 1024px) {
          .hero-split {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-right {
            padding-left: 0;
            border-left: none;
            padding-top: 3rem;
            border-top: 1px solid var(--border-color);
          }
          .caption {
            max-width: 100%;
          }
        }

        @media (max-width: 900px) {
          .hero-metrics {
            grid-template-columns: repeat(2, 1fr);
            border-bottom: none;
          }
          .metric {
            border-bottom: 1px solid var(--border-color);
          }
        }

        @media (max-width: 600px) {
          .hero-topline {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-metrics {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
