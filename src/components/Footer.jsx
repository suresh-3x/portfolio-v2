import React from 'react';
import { ArrowUp, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const stack = ['Python', 'FastAPI', 'Google ADK', 'RAG', 'Postgres', 'Redis', 'RabbitMQ', 'AWS'];

const Footer = () => {
  const { theme } = useTheme();
  const isMonochrome = theme === 'mono-light' || theme === 'mono-dark';

  const accentColors = React.useMemo(() => {
    return [
      'var(--accent-primary)',
      'var(--accent-secondary)',
      'var(--accent-tertiary)',
      'var(--accent-primary)',
    ];
  }, []);

  const borderMultiplier = isMonochrome ? 3.7 : 1;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" style={{ '--border-multiplier': borderMultiplier }}>
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
              <a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer" className="footer-cta-v2 primary" style={{ '--cta-accent': accentColors[0] }}>
                <Mail size={18} />
                Email Suresh
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="footer-cta-v2" style={{ '--cta-accent': accentColors[1] }}>
                <FileText size={18} />
                Resume
              </a>
            </div>

            <div className="social-cluster-v2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-icon-v2" style={{ '--social-accent': accentColors[2] }} aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-v2" style={{ '--social-accent': accentColors[3] }} aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer" className="social-icon-v2" style={{ '--social-accent': accentColors[0] }} aria-label="Email">
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
          <button onClick={scrollToTop} className="scroll-btn-v2" style={{ '--scroll-accent': accentColors[0] }} aria-label="Scroll to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          width: 100%;
          padding: 4rem 0 5rem;
          background: transparent;
          border-top: 2px solid var(--nb-border);
        }

        .footer-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .footer-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--nb-border);
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
          grid-template-columns: minmax(0, 1fr) minmax(280px, 320px);
          gap: clamp(2rem, 5vw, 4rem);
          align-items: end;
        }

        .footer-brand-v2 {
          max-width: 700px;
        }

        .logo-group-v2 {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 1.25rem;
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
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .footer-heading-v2 {
          max-width: 700px;
          margin: 0 0 0.75rem;
          font-family: var(--font-sans);
          font-size: clamp(1.6rem, 3.5vw, 2.5rem);
          line-height: 1.05;
          letter-spacing: 0;
          color: var(--text-primary);
        }

        .footer-copy-v2 {
          max-width: 600px;
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .footer-stack-v2 {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.25rem;
        }

        .footer-stack-v2 span {
          border: 2px solid var(--nb-border);
          border-radius: 0;
          box-shadow: var(--nb-shadow-sm);
          padding: 0.3rem 0.6rem;
          background: var(--card-bg);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.7rem;
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
          min-height: 48px;
          padding: 0 1rem;
          border: 2px solid var(--nb-border);
          border-radius: 0;
          box-shadow: var(--nb-shadow-sm);
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          color: var(--text-primary);
          font-weight: 700;
          background: var(--card-bg);
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.3s ease, color 0.3s ease;
          text-decoration: none;
          cursor: pointer;
          pointer-events: auto;
        }

        .footer-cta-v2.primary {
          background: var(--cta-accent);
          color: var(--bg-primary-color);
        }

        .footer-cta-v2:hover {
          transform: translate(3px, 3px);
          box-shadow: 0 0 0 var(--nb-shadow-color);
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
          border-radius: 0;
          background: var(--card-bg);
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          color: var(--text-secondary);
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.3s ease, color 0.3s ease;
          text-decoration: none;
          cursor: pointer;
          pointer-events: auto;
        }

        .social-icon-v2:hover {
          background: var(--social-accent);
          color: var(--bg-primary-color);
          transform: translate(3px, 3px);
          box-shadow: 0 0 0 var(--nb-shadow-color);
        }

        .footer-bottom-v2 {
          padding-top: 1.5rem;
          border-top: 2px solid var(--nb-border);
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
          background: var(--card-bg);
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          color: var(--text-secondary);
          width: 44px;
          height: 44px;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.3s ease, color 0.3s ease;
        }

        .scroll-btn-v2:hover {
          color: var(--bg-primary-color);
          background: var(--scroll-accent);
          transform: translate(3px, 3px);
          box-shadow: 0 0 0 var(--nb-shadow-color);
        }

        @media (max-width: 840px) {
          .footer {
            padding: 3rem 0 4rem;
          }

          .footer-shell {
            max-width: 100%;
            padding: 0 1.5rem;
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
            gap: 2rem;
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
          .footer {
            padding: 2.5rem 0 3.5rem;
          }

          .footer-shell {
            padding: 0 1rem;
          }

          .logo-group-v2 {
            margin-bottom: 1rem;
          }

          .footer-heading-v2 {
            font-size: 1.5rem;
          }

          .footer-copy-v2 {
            font-size: 0.9rem;
          }

          .footer-cta-group-v2 {
            gap: 0.6rem;
          }

          .footer-cta-v2 {
            min-height: 44px;
            font-size: 0.9rem;
          }

          .social-cluster-v2 {
            gap: 0.6rem;
          }

          .social-icon-v2 {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
