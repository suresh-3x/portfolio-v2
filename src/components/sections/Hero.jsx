import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { impactMetrics, profile } from '../../data/profile';

const Hero = ({ highlightColor }) => {
  const stack = ['Python', 'FastAPI', 'Node.js', 'Google ADK', 'PostgreSQL', 'AWS', 'RabbitMQ', 'Redis', 'gRPC'];

  return (
    <section className="hero-section" id="home">
      <div className="hero-container hero-single">
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
            {profile.name.split(' ')[0]}{' '}
            <span className="highlight" style={{ color: highlightColor }}>
              {profile.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <h2 className="hero-positioning">
            I build and scale production backends and AI agents for products with millions of users.
          </h2>

          <p className="hero-copy">{profile.tagline}</p>

          <div className="hero-proof-strip" aria-label="Career highlights">
            {impactMetrics.map((metric) => (
              <div className="proof-cell" key={metric.label}>
                <span className="proof-value">{metric.value}</span>
                <span className="proof-label">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="action-row">
            <a href={profile.projectsHref} className="primary-btn">
              View Engineering Work <ArrowRight size={18} />
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="secondary-btn">
              Resume <FileText size={18} />
            </a>
          </div>

          <div className="hero-stack" aria-label="Core stack">
            <span className="hero-stack-label">// CORE_STACK</span>
            <div className="hero-stack-chips">
              {stack.map((item) => (
                <span key={item} className="hero-chip">{item}</span>
              ))}
            </div>
          </div>
        </Motion.div>
      </div>

      <style>{`
        .hero-single {
          grid-template-columns: 1fr !important;
          max-width: 960px !important;
          text-align: left;
        }

        .hero-single .hero-content {
          max-width: 880px;
          align-items: flex-start !important;
        }

        .hero-proof-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow);
          background: var(--card-bg);
          max-width: 720px;
          width: 100%;
          margin: 0.5rem 0 2rem;
        }

        .hero-proof-strip .proof-cell {
          padding: 1rem 1.1rem;
          border-right: 2px solid var(--nb-border);
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .hero-proof-strip .proof-cell:last-child {
          border-right: none;
        }

        .hero-proof-strip .proof-value {
          font-family: var(--font-mono);
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1;
          color: var(--text-primary);
        }

        .hero-proof-strip .proof-label {
          font-size: 0.7rem;
          color: var(--text-secondary);
          line-height: 1.3;
        }

        .hero-stack {
          margin-top: 0.25rem;
          width: 100%;
        }

        .hero-stack-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.7rem;
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

        @media (max-width: 720px) {
          .hero-proof-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-proof-strip .proof-cell:nth-child(2) {
            border-right: none;
          }
          .hero-proof-strip .proof-cell:nth-child(1),
          .hero-proof-strip .proof-cell:nth-child(2) {
            border-bottom: 2px solid var(--nb-border);
          }
          .hero-proof-strip .proof-value {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
