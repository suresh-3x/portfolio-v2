import React from 'react';
import { motion as Motion } from 'framer-motion';
import { impactMetrics, profile } from '../../data/profile';

const Hero = () => {
  const stack = ['Python', 'FastAPI', 'Node.js', 'Google ADK', 'PostgreSQL', 'AWS', 'RabbitMQ', 'Redis', 'gRPC'];
  const [firstName, ...rest] = profile.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section className="hero-section" id="home">
      <div className="hero-bg-num">37</div>
      
      {/* Editorial Frame System */}
      <div className="hero-frame-container">
        <div className="hero-top-bar">
          <span className="frame-tag">PORTFOLIO_V2.6.26</span>
          <div className="frame-glow-strip"></div>
          <span className="frame-tag">SDE_III // AI_ENG</span>
        </div>

        <div className="hero-v2">
          <Motion.div
            className="hero-main-symmetrical"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="system-status">
              <span className="status-dot"></span>
              <span className="status-text">Open to senior backend / AI roles</span>
            </div>

            <p className="hero-role">{profile.title}</p>

            <h1 className="hero-title">
              <span className="hero-name-line">{firstName}</span>
              <span className="hero-name-line highlight">{lastName}</span>
            </h1>

            <div className="hero-desc-wrap">
              <h2 className="hero-positioning">
                I build and scale production backends and AI agents for products with millions of users.
              </h2>
              <div className="action-row">
                <a href={profile.projectsHref} className="primary-btn">
                  View Work
                </a>
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="secondary-btn">
                  Resume ↗
                </a>
              </div>
            </div>
          </Motion.div>
        </div>

        <div className="stats-strip-wrapper">
          <Motion.div
            className="stats-strip-symmetrical"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {impactMetrics.map((metric, idx) => (
              <div className="stat-item" key={metric.label}>
                <span className="stat-value">{metric.value}</span>
                <span className="stat-label">{metric.label}</span>
              </div>
            ))}
          </Motion.div>
        </div>
      </div>

      <div className="ticker-wrap">
        <div className="ticker-scroll">
          {stack.map((item, i) => (
            <React.Fragment key={`first-${i}`}>
              <span>{item}</span>
              <span className="dot">·</span>
            </React.Fragment>
          ))}
          {stack.map((item, i) => (
            <React.Fragment key={`second-${i}`}>
              <span>{item}</span>
              <span className="dot">·</span>
            </React.Fragment>
          ))}
          {stack.map((item, i) => (
            <React.Fragment key={`third-${i}`}>
              <span>{item}</span>
              <span className="dot">·</span>
            </React.Fragment>
          ))}
          {stack.map((item, i) => (
            <React.Fragment key={`fourth-${i}`}>
              <span>{item}</span>
              <span className="dot">·</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          height: 100svh;
          padding: 60px 0 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          text-align: center;
          background: transparent;
        }

        /* Subtle Noise Overlay */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter name='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3");
          opacity: 0.04;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 1;
        }

        .hero-frame-container {
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 5;
          padding-top: 1rem;
        }

        .hero-top-bar {
          width: 100%;
          max-width: 1100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem 1rem;
          margin-bottom: clamp(1rem, 2vh, 2rem);
          border-bottom: 1px solid var(--border-color);
        }

        .frame-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-secondary);
          letter-spacing: 2px;
          font-weight: 700;
        }

        .frame-glow-strip {
          height: 1px;
          flex: 1;
          margin: 0 2rem;
          background: linear-gradient(90deg, transparent, var(--border-color), transparent);
        }

        .hero-bg-num {
          position: absolute;
          left: 50%;
          top: 48%;
          transform: translate(-50%, -50%);
          font-size: clamp(200px, 45vw, 600px);
          font-weight: 900;
          color: rgba(0, 0, 0, 0.037);
          line-height: 1;
          letter-spacing: -0.05em;
          user-select: none;
          pointer-events: none;
          z-index: 2;
          -webkit-text-stroke: 1px rgba(0, 0, 0, 0.037);
        }

        [data-theme='mono'] .hero-bg-num {
          color: rgba(255, 255, 255, 0.02);
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.037);
        }

        .hero-v2 {
          width: 100%;
          padding: 0;
          display: flex;
          flex: 1;
          align-items: center;
        }

        .hero-main-symmetrical {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .system-status {
          background: var(--accent-secondary);
          color: #fff;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: clamp(1.5rem, 3vh, 3rem);
          box-shadow: 0 4px 15px rgba(var(--accent-secondary-rgb), 0.25);
        }

        [data-theme='mono'] .system-status {
          color: #000;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
          animation: pulse-terminal 1.5s infinite;
        }

        [data-theme='mono'] .status-dot {
           background: #000;
        }

        @keyframes pulse-terminal {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }

        .hero-role {
          font-family: var(--font-mono);
          font-size: clamp(0.8rem, 1.5vw, 1rem);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--text-secondary);
          margin-bottom: clamp(1rem, 2vh, 1.5rem);
        }

        .hero-title {
          font-size: clamp(3.5rem, 12vw, 10rem);
          line-height: 0.8;
          letter-spacing: -0.06em;
          text-transform: uppercase;
          font-weight: 900;
          color: var(--text-primary);
          margin-bottom: clamp(1.5rem, 3vh, 3rem);
        }

        .hero-name-line { display: block; }
        
        .hero-title .highlight {
          color: var(--accent-primary) !important;
        }

        .hero-desc-wrap {
          max-width: 850px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(1.5rem, 3vh, 3rem);
        }

        .hero-positioning {
          font-size: clamp(1.1rem, 2vw, 1.6rem);
          line-height: 1.5;
          color: var(--text-secondary);
          font-weight: 400;
          margin: 0;
          letter-spacing: 0.02em;
        }

        .action-row {
          display: flex;
          gap: 2rem;
        }

        .primary-btn {
          background: var(--accent-primary) !important;
          color: #fff !important;
          padding: 0 3rem !important;
          height: 56px !important;
          font-size: 14px !important;
          box-shadow: 0 4px 15px rgba(var(--accent-primary-rgb), 0.25) !important;
          text-transform: uppercase;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        [data-theme='mono'] .primary-btn {
           color: #000 !important;
        }

        .secondary-btn {
          border-color: var(--border-color) !important;
          color: var(--text-primary) !important;
          background: transparent !important;
          height: 56px !important;
          padding: 0 2.5rem !important;
          font-size: 14px !important;
          text-transform: uppercase;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .secondary-btn:hover {
          background: var(--text-primary) !important;
          color: var(--bg-primary-color) !important;
          border-color: var(--text-primary) !important;
        }

        /* Stats Strip Refinement */
        .stats-strip-wrapper {
          width: 100%;
          border-top: 1px solid var(--border-color);
        }

        .stats-strip-symmetrical {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .stat-item {
          padding: clamp(1.5rem, 3vh, 3.5rem) 1.5rem;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .stat-item:last-child { border-right: none; }

        .stat-value {
          font-family: var(--font-mono);
          font-size: clamp(2rem, 4vw, 4rem);
          font-weight: 900;
          line-height: 1;
        }

        .stat-item:nth-child(1) .stat-value { color: var(--accent-primary); }
        .stat-item:nth-child(2) .stat-value { color: var(--accent-secondary); }
        .stat-item:nth-child(3) .stat-value { color: var(--accent-tertiary); }
        .stat-item:nth-child(4) .stat-value { color: var(--accent-primary); }

        .stat-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-secondary);
          font-weight: 800;
        }

        /* Ticker Improvements */
        .ticker-wrap {
          background: transparent;
          padding: 16px 0;
          width: 100%;
          overflow: hidden;
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          /* Fade mask for smooth enter/exit */
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
          border-top: 1px solid var(--border-color);
        }

        .ticker-scroll {
          display: flex;
          white-space: nowrap;
          animation: scroll-left 40s linear infinite;
          width: max-content;
        }

        .ticker-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        [data-theme='dawn'] .ticker-scroll span:nth-child(3n+1) { color: var(--accent-primary); }
        [data-theme='dawn'] .ticker-scroll span:nth-child(3n+2) { color: var(--accent-secondary); }
        [data-theme='dawn'] .ticker-scroll span:nth-child(3n+3) { color: var(--accent-tertiary); }

        .ticker-scroll span {
          color: var(--text-primary);
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.15em;
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono);
        }

        .ticker-scroll .dot {
          color: var(--border-color) !important;
          margin: 0 2.5rem;
          font-size: 20px;
        }

        @media (max-width: 900px) {
          .hero-top-bar { display: none; }
          .stats-strip-symmetrical { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(even) { border-right: none; }
          .stat-item { border-bottom: 1px solid var(--border-color); }
        }

        @media (max-width: 480px) {
          .hero-section { height: auto; min-height: 100svh; }
          .hero-title { font-size: clamp(3rem, 18vw, 4.5rem); }
          .action-row { flex-direction: column; gap: 1rem; width: 100%; }
          .primary-btn, .secondary-btn { width: 100%; }
          .hero-bg-num { font-size: 180px; top: 38%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;