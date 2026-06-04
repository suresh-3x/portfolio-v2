import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { impactMetrics, profile } from '../../data/profile';

const Hero = ({ highlightColor }) => {
  const stack = ['Python', 'FastAPI', 'Node.js', 'Google ADK', 'PostgreSQL', 'AWS', 'RabbitMQ', 'Redis', 'gRPC'];
  const [firstName, ...rest] = profile.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section className="hero-section" id="home">
      <div className="hero-container hero-v2">
        <Motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="system-status">
            <span className="status-dot"></span>
            <span className="status-text">Open to senior backend / AI roles</span>
          </div>

          <p className="hero-role">{profile.title}</p>

          <h1 className="hero-title">
            <span className="hero-name-line">{firstName}</span>
            <span className="hero-name-line highlight" style={{ color: highlightColor }}>{lastName}</span>
          </h1>

          <h2 className="hero-positioning">
            I build and scale production backends and AI agents for products with millions of users.
          </h2>

          <p className="hero-copy">{profile.tagline}</p>

          <div className="action-row">
            <a href={profile.projectsHref} className="primary-btn">
              View Engineering Work <ArrowRight size={18} />
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="secondary-btn">
              Resume <FileText size={18} />
            </a>
          </div>
        </Motion.div>

        <Motion.aside
          className="hero-stats-card"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          aria-label="Career highlights"
        >
          <div className="hero-stats-head">
            <span>// IMPACT</span>
            <span className="hero-stats-status">
              <span className="status-dot pulsing"></span> LIVE
            </span>
          </div>
          <div className="hero-stats-rows">
            {impactMetrics.map((metric) => (
              <div className="hero-stat-row" key={metric.label}>
                <span className="hero-stat-value">{metric.value}</span>
                <span className="hero-stat-label">{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-stats-foot">
            {profile.location} · {profile.relocation}
          </div>
        </Motion.aside>

        <div className="hero-stack" aria-label="Core stack">
          <span className="hero-stack-label">// CORE_STACK</span>
          <div className="hero-stack-chips">
            {stack.map((item) => (
              <span key={item} className="hero-chip">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-v2 {
          grid-template-columns: minmax(0, 1.1fr) minmax(330px, 0.9fr);
          gap: clamp(2.5rem, 5vw, 4.5rem);
          align-items: center;
          max-width: 1180px;
          row-gap: 3rem;
        }

        .hero-v2 .hero-content {
          max-width: none;
          align-items: flex-start;
        }

        /* Typography refinement */
        .hero-v2 .system-status { margin-bottom: 1.5rem; }

        .hero-v2 .hero-role {
          margin: 0 0 1.1rem;
          font-size: clamp(0.72rem, 1.1vw, 0.84rem);
          letter-spacing: 0.22em;
        }

        .hero-v2 .hero-title {
          margin: 0 0 1.5rem;
          font-size: clamp(3.4rem, 6.2vw, 5.4rem);
          line-height: 0.88;
          letter-spacing: -0.035em;
        }

        .hero-name-line { display: block; }

        .hero-v2 .hero-positioning {
          max-width: 30ch;
          margin: 0 0 1.25rem;
          font-size: clamp(1.4rem, 2.2vw, 1.9rem);
          line-height: 1.12;
          font-weight: 800;
        }

        .hero-v2 .hero-copy {
          max-width: 46ch;
          margin: 0 0 2rem;
          font-size: clamp(1rem, 1.4vw, 1.08rem);
          line-height: 1.7;
        }

        .hero-v2 .action-row { gap: 1rem; }

        /* Stats card (right) */
        .hero-stats-card {
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow);
          background: var(--card-bg);
          align-self: center;
          width: 100%;
          max-width: 420px;
          margin-left: auto;
        }

        .hero-stats-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 1.1rem;
          background: var(--accent-primary);
          color: var(--on-accent);
          border-bottom: 2px solid var(--nb-border);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .hero-stats-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .hero-stats-head .status-dot.pulsing {
          width: 7px;
          height: 7px;
          background: var(--on-accent);
          box-shadow: none;
        }

        .hero-stat-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.05rem 1.1rem;
          border-bottom: 2px solid var(--nb-border);
        }

        .hero-stat-value {
          font-family: var(--font-mono);
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 800;
          line-height: 1;
          color: var(--text-primary);
        }

        .hero-stat-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: right;
          line-height: 1.35;
          max-width: 9.5rem;
        }

        .hero-stats-foot {
          padding: 0.7rem 1.1rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-secondary);
          text-transform: uppercase;
          background: var(--bg-secondary);
        }

        /* Stack band (spans full width) */
        .hero-stack {
          grid-column: 1 / -1;
          width: 100%;
          border-top: 2px solid var(--nb-border);
          padding-top: 1.5rem;
        }

        .hero-stack-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.8rem;
        }

        .hero-stack-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .hero-chip {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 5px 11px;
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          background: var(--card-bg);
          color: var(--text-primary);
        }

        @media (max-width: 980px) {
          .hero-v2 {
            grid-template-columns: 1fr;
            row-gap: 2.5rem;
            align-items: start;
          }
          .hero-stats-card {
            margin-left: 0;
            max-width: 520px;
          }
        }

        @media (max-width: 480px) {
          .hero-v2 .hero-title {
            font-size: clamp(2.9rem, 16vw, 3.6rem);
          }
          .hero-stat-value { font-size: 1.7rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
