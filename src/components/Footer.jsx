import React from 'react';
import { ArrowUp, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import Logo from './Logo';

const stack = ['Python', 'FastAPI', 'Google ADK', 'RAG', 'Postgres', 'Redis', 'RabbitMQ', 'AWS'];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-meta-row">
          <span>Senior Backend and AI Engineer</span>
          <span className="footer-meta-location">
            <MapPin size={14} />
            {profile.location} / {profile.relocation}
          </span>
        </div>

        <div className="footer-content-v2">
          <div className="footer-brand-v2">
            <div className="logo-group-v2">
              <Logo size={28} />
              <div className="sb-details-v2">
                <span className="sb-name-v2">
                  {'SURESH'.split('').map((c, i) => <span key={i}>{c}</span>)}
                </span>
                <div className="sb-name-v2">
                  {'BHANDARI'.split('').map((c, i) => <span key={i}>{c}</span>)}
                </div>
              </div>
            </div>

            <h2 className="footer-heading-v2">
              Building backends, AI workflows, and cloud systems that survive production.
            </h2>
            <p className="footer-copy-v2">
              Open to senior SDE, backend platform, and applied AI engineering roles where reliability,
              ownership, and measurable product impact matter.
            </p>

            <div className="footer-stack-v2" aria-label="Core stack">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="footer-actions-v2">
            <div className="footer-cta-group-v2">
              <a href={`mailto:${profile.email}`} className="footer-cta-v2 primary">
                <Mail size={18} />
                Email Suresh
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="footer-cta-v2">
                <FileText size={18} />
                Resume
              </a>
            </div>

            <div className="social-cluster-v2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-icon-v2" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-v2" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${profile.email}`} className="social-icon-v2" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-v2">
          <div className="copyright-v2">
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="sep-v2">/</span>
            <span>{profile.name}</span>
            <span className="sep-v2">/</span>
            <span>Last updated {profile.lastUpdated}</span>
          </div>
          <button onClick={scrollToTop} className="scroll-btn-v2" aria-label="Scroll to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          width: 100%;
          padding: 4.5rem 0 5.5rem;
          background: rgba(var(--text-primary-rgb), 0.018);
          border-top: 1px solid var(--border-color);
        }

        .footer-shell {
          width: min(1200px, calc(100% - 2.5rem));
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        .footer-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .footer-meta-location {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
        }

        .footer-content-v2 {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: end;
        }

        .footer-brand-v2 {
          max-width: 760px;
        }

        .logo-group-v2 {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 1.5rem;
        }

        .sb-details-v2 {
          display: flex;
          flex-direction: column;
          gap: 2px;
          width: 95px;
        }

        .sb-name-v2 {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--text-primary);
          line-height: 1;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .footer-heading-v2 {
          max-width: 760px;
          margin: 0 0 1rem;
          font-family: var(--font-sans);
          font-size: clamp(1.8rem, 4vw, 3.25rem);
          line-height: 1.02;
          letter-spacing: 0;
          color: var(--text-primary);
        }

        .footer-copy-v2 {
          max-width: 640px;
          margin: 0;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
        }

        .footer-stack-v2 {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 1.5rem;
        }

        .footer-stack-v2 span {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.35rem 0.65rem;
          background: rgba(var(--text-primary-rgb), 0.025);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
        }

        .footer-actions-v2 {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.25rem;
        }

        .footer-cta-group-v2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          width: 100%;
        }

        .footer-cta-v2 {
          min-height: 52px;
          padding: 0 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          color: var(--text-primary);
          font-weight: 800;
          background: rgba(var(--text-primary-rgb), 0.025);
          transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);
        }

        .footer-cta-v2.primary {
          background: var(--text-primary);
          color: var(--bg-primary-color);
          border-color: var(--text-primary);
        }

        .footer-cta-v2:hover {
          transform: translateY(-2px);
          border-color: var(--text-primary);
        }

        .social-cluster-v2 {
          display: flex;
          gap: 0.75rem;
        }

        .social-icon-v2 {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: rgba(var(--text-primary-rgb), 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: transform var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
        }

        .social-icon-v2:hover {
          background: var(--text-primary);
          color: var(--bg-primary-color);
          transform: translateY(-2px);
        }

        .footer-bottom-v2 {
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .copyright-v2 {
          font-size: 0.78rem;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          opacity: 0.62;
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          align-items: center;
        }

        .sep-v2 {
          opacity: 0.4;
        }

        .scroll-btn-v2 {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
        }

        .scroll-btn-v2:hover {
          color: var(--text-primary);
          border-color: var(--text-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 840px) {
          .footer {
            padding: 3.5rem 0 4.5rem;
          }

          .footer-shell {
            width: min(100% - 2rem, 680px);
          }

          .footer-meta-row,
          .footer-content-v2,
          .footer-bottom-v2 {
            align-items: flex-start;
          }

          .footer-meta-row {
            flex-direction: column;
          }

          .footer-content-v2 {
            grid-template-columns: 1fr;
          }

          .footer-actions-v2 {
            align-items: stretch;
            width: 100%;
          }

          .footer-bottom-v2 {
            flex-direction: column-reverse;
          }
        }

        @media (max-width: 520px) {
          .logo-group-v2 {
            margin-bottom: 1.25rem;
          }

          .footer-heading-v2 {
            font-size: 1.8rem;
          }

          .footer-copy-v2 {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
