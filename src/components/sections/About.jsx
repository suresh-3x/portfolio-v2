import React from 'react';
import { ExternalLink } from 'lucide-react';
import { profile } from '../../data/profile';

const About = () => {
  const facts = [
    { label: 'NOW', value: 'Senior Backend & AI Engineer @ T-Systems' },
    { label: 'BASED', value: `${profile.location} · ${profile.relocation}` },
    { label: 'FOCUS', value: 'Distributed systems · Agentic AI · Full production ownership' },
    { label: 'STACK', value: 'Python · FastAPI · Node.js · Google ADK · PostgreSQL · AWS' },
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-grid">
          {/* Narrative */}
          <div className="about-narrative">
            <p className="narrative-p main">
              Senior Backend and AI Engineer with <strong>5 years building and scaling distributed systems</strong>. I owned core backend services for a real-money gaming platform at 5M+ MAU sustaining 10K req/sec peak, and ran production end-to-end as the sole engineer across multiple products.
            </p>
            <p className="narrative-p">
              Now building <strong>agentic AI systems on Google ADK</strong> at T-Systems (Deutsche Telekom subsidiary), embedded as a dedicated backend hire collaborating daily with German data science, frontend, and DevOps teams.
            </p>
            <div className="about-tags">
              <span className="about-tag">ARCHITECT</span>
              <span className="about-tag">POLYMATH</span>
            </div>
          </div>

          {/* Profile facts panel */}
          <aside className="about-facts">
            <div className="about-facts-head">// PROFILE</div>
            {facts.map((f) => (
              <div className="fact-row" key={f.label}>
                <span className="fact-label">{f.label}</span>
                <span className="fact-value">{f.value}</span>
              </div>
            ))}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="about-resume-btn"
            >
              VIEW RÉSUMÉ <ExternalLink size={15} />
            </a>
          </aside>
        </div>
      </div>

      <style>{`
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 3.5rem;
          align-items: start;
        }

        .narrative-p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .narrative-p.main {
          font-size: 1.5rem;
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 1.75rem;
          font-weight: 500;
        }

        .narrative-p strong {
          color: var(--accent-primary);
          font-weight: 800;
        }

        .about-tags {
          display: flex;
          gap: 12px;
          margin-top: 2rem;
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

        /* Brutalist profile facts panel */
        .about-facts {
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow);
          background: var(--card-bg);
        }

        .about-facts-head {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--on-accent);
          background: var(--accent-primary);
          border-bottom: 2px solid var(--nb-border);
          padding: 0.7rem 1.1rem;
        }

        .fact-row {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 1rem 1.1rem;
          border-bottom: 2px solid var(--nb-border);
        }

        .fact-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--text-secondary);
        }

        .fact-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .about-resume-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0.95rem 1.1rem;
          background: var(--text-primary);
          color: var(--bg-primary-color);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.3s ease, color 0.3s ease;
        }

        .about-resume-btn:hover {
          background: var(--accent-primary);
          color: var(--on-accent);
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .narrative-p.main {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .about-container {
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
