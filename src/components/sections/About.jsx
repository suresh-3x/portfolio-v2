import React from 'react';
import { Cpu, Zap, Shield, Cloud, Bot, Database, ExternalLink } from 'lucide-react';
import { profile } from '../../data/profile';

const About = () => {
  const capabilities = [
    { icon: <Cpu size={20} />, title: 'Concurrent Systems', desc: 'Fault-tolerant microservices built for massive scale.' },
    { icon: <Zap size={20} />, title: 'Performance Tuning', desc: 'Deep optimization for mission-critical throughput.' },
    { icon: <Shield size={20} />, title: 'Security & Auth', desc: 'JWT, OAuth2, and multi-layered access control.' },
    { icon: <Cloud size={20} />, title: 'Cloud & Delivery', desc: 'Containerized multi-cloud orchestration and CI/CD.' },
    { icon: <Bot size={20} />, title: 'Agentic AI', desc: 'Production LLM agents on Google ADK with RAG.' },
    { icon: <Database size={20} />, title: 'Distributed Data', desc: 'Postgres, Redis, RabbitMQ, and gRPC at scale.' },
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-intro">
          {/* Narrative */}
          <div className="about-narrative">
            <p className="narrative-lead">
              I build and own the <strong>backend systems</strong> that keep products
              alive under real load and the <strong>AI agents</strong> running on top of them.
            </p>
            <p className="narrative-p">
              5+ years building and scaling distributed systems. I owned core backend services for a
              real-money gaming platform at 5M+ MAU sustaining 10K req/sec peak, and ran production
              end-to-end as the sole engineer across multiple products. Now building agentic AI systems
              on Google ADK at T-Systems (Deutsche Telekom subsidiary).
            </p>
          </div>

          <div className="about-actions">
            <div className="about-tags">
              <span className="about-tag">ARCHITECT</span>
              <span className="about-tag">POLYMATH</span>
              <span className="about-tag">TECH_LEAD</span>
            </div>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="about-resume-btn"
            >
              VIEW RÉSUMÉ <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Capabilities */}
        <div className="about-cap-head">// WHAT_I_DO</div>
        <div className="about-cap-grid">
          {capabilities.map((c, i) => (
            <div className="cap-card" key={c.title}>
              <div className="cap-top">
                <span className="cap-icon">{c.icon}</span>
                <span className="cap-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="cap-title">{c.title}</h3>
              <p className="cap-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .about-intro {
          margin-bottom: 4rem;
        }

        .narrative-lead {
          max-width: 20ch;
          font-size: clamp(2rem, 4.2vw, 3.2rem);
          line-height: 1.12;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0 0 1.75rem;
        }

        .narrative-lead strong {
          color: var(--accent-primary);
          font-weight: 800;
        }

        .narrative-p {
          max-width: 62ch;
          font-size: 1.1rem;
          line-height: 1.75;
          color: var(--text-secondary);
          margin: 0;
        }

        .about-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-top: 2.25rem;
        }

        .about-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .about-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          padding: 5px 12px;
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          color: var(--text-primary);
          background: var(--card-bg);
          letter-spacing: 1px;
        }

        .about-resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.7rem 1.2rem;
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          background: var(--text-primary);
          color: var(--bg-primary-color);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.3s ease, color 0.3s ease;
        }

        .about-resume-btn:hover {
          background: var(--accent-primary);
          color: var(--on-accent);
          transform: translate(3px, 3px);
          box-shadow: 0 0 0 var(--nb-shadow-color);
        }

        /* Capabilities */
        .about-cap-head {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .about-cap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .cap-card {
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          background: var(--card-bg);
          padding: 1.25rem;
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }

        .cap-card:hover {
          transform: translate(3px, 3px);
          box-shadow: 0 0 0 var(--nb-shadow-color);
        }

        .cap-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .cap-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: var(--accent-primary);
          color: var(--on-accent);
          border: 2px solid var(--nb-border);
        }

        .cap-num {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-secondary);
          opacity: 0.4;
        }

        .cap-title {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }

        .cap-desc {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 900px) {
          .about-top {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-bottom: 3rem;
          }
          .about-cap-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .about-container { padding: 0 1rem; }
          .about-cap-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
