import React from 'react';
import { ArrowUp, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { profile } from '../data/profile';
import Logo from './Logo';

const Footer = () => {
  const year = new Date().getFullYear();
  const lenis = useLenis();
  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-shell">
        <div className="footer-main">
          <div className="footer-lead">
            <span className="footer-kicker">// LET'S_WORK_TOGETHER</span>
            <h2 className="footer-heading">
              Building backends, AI workflows, and cloud systems that survive production.
            </h2>
            <p className="footer-copy">
              Open to senior SDE, backend platform, and applied AI engineering roles where
              reliability, ownership, and measurable product impact matter.
            </p>
            <p className="footer-loc">
              <MapPin size={14} /> {profile.location} · {profile.relocation}
            </p>
          </div>

          <div className="footer-cta-col">
            <a href={`mailto:${profile.email}`} className="footer-cta primary">
              <Mail size={18} /> Email Suresh
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="footer-cta">
              <FileText size={18} /> Resume
            </a>
            <div className="footer-socials">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${profile.email}`} className="footer-social" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <Logo size={24} />
            <span>{profile.name}</span>
          </div>
          <div className="footer-meta">
            <span>&copy; {year}</span>
            <span className="dot">·</span>
            <span>Updated {profile.lastUpdated}</span>
          </div>
          <button onClick={scrollToTop} className="scroll-top" aria-label="Scroll to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          width: 100%;
          padding: 4.5rem 0 3rem;
          background: transparent;
          border-top: 2px solid var(--nb-border);
        }

        .footer-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .footer-main {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
          gap: clamp(2rem, 5vw, 4.5rem);
          align-items: start;
          padding-bottom: 3rem;
        }

        .footer-kicker {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 1.25rem;
        }

        .footer-heading {
          max-width: 640px;
          margin: 0 0 1rem;
          font-family: var(--font-sans);
          font-size: clamp(1.7rem, 3.6vw, 2.7rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .footer-copy {
          max-width: 560px;
          margin: 0 0 1.25rem;
          color: var(--text-secondary);
          font-size: 0.98rem;
          line-height: 1.6;
        }

        .footer-loc {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .footer-cta-col {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .footer-cta {
          min-height: 52px;
          padding: 0 1.2rem;
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          color: var(--text-primary);
          font-weight: 800;
          background: var(--card-bg);
          text-decoration: none;
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.3s ease, color 0.3s ease;
        }

        .footer-cta.primary {
          background: var(--accent-primary);
          color: var(--on-accent);
        }

        .footer-cta:hover {
          transform: translate(3px, 3px);
          box-shadow: 0 0 0 var(--nb-shadow-color);
        }

        .footer-socials {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.25rem;
        }

        .footer-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          background: var(--card-bg);
          color: var(--text-secondary);
          text-decoration: none;
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.3s ease, color 0.3s ease;
        }

        .footer-social:hover {
          background: var(--accent-primary);
          color: var(--on-accent);
          transform: translate(3px, 3px);
          box-shadow: 0 0 0 var(--nb-shadow-color);
        }

        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 2px solid var(--nb-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .footer-meta {
          display: flex;
          gap: 0.6rem;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .footer-meta .dot { opacity: 0.5; }

        .scroll-top {
          width: 44px;
          height: 44px;
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          background: var(--card-bg);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.3s ease, color 0.3s ease;
        }

        .scroll-top:hover {
          background: var(--accent-primary);
          color: var(--on-accent);
          transform: translate(3px, 3px);
          box-shadow: 0 0 0 var(--nb-shadow-color);
        }

        @media (max-width: 840px) {
          .footer {
            padding: 3.5rem 0 2.5rem;
          }
          .footer-main {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-cta-col {
            width: 100%;
          }
        }

        @media (max-width: 520px) {
          .footer-shell {
            padding: 0 1rem;
          }
          .footer-bottom {
            justify-content: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
