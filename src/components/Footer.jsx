import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-island-v2">
        <div className="footer-content-v2">
          <div className="footer-brand-v2">
            <div className="logo-group-v2">
              <Logo size={28} />
              <div className="sb-details-v2">
                <span className="sb-name-v2">
                  {"SURESH".split("").map((c, i) => <span key={i}>{c}</span>)}
                </span>
                <div className="sb-sys-v2">
                  {"BHANDARI".split("").map((c, i) => <span key={i}>{c}</span>)}
                </div>
              </div>
            </div>
            <p className="tagline-v2">Crafting Precision. Engineering Scale.</p>
          </div>

          <div className="footer-actions-v2">
            <div className="social-cluster-v2">
              <a href="https://github.com/suresh-3x" target="_blank" rel="noopener noreferrer" className="social-icon-v2" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/suresh-3x" target="_blank" rel="noopener noreferrer" className="social-icon-v2" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:suresh.37x@gmail.com" className="social-icon-v2" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
            <div className="status-indicator-v2">
              <div className="status-dot-v2"></div>
              <span className="status-label-v2">Systems live</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-v2">
          <div className="copyright-v2">
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="sep-v2">/</span>
            <span>Suresh Bhandari</span>
          </div>
          <button onClick={scrollToTop} className="scroll-btn-v2" aria-label="Scroll to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 5rem 0 6rem;
          display: flex;
          justify-content: center;
          width: 100%;
          position: relative;
          background: rgba(var(--text-primary-rgb), 0.015);
          border-top: 1px solid var(--border-color);
        }

        .footer-island-v2 {
          width: 100%;
          max-width: 1200px;
          padding: 0 var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: 4rem;
          position: relative;
        }

        .footer-content-v2 {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          position: relative;
          z-index: 2;
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
          font-size: 1.2rem;
          color: var(--text-primary);
          line-height: 1;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .sb-sys-v2 {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          color: var(--text-secondary);
          opacity: 0.6;
          text-transform: uppercase;
          line-height: 1;
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 2px;
        }

        .tagline-v2 {
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-family: var(--font-mono);
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .footer-actions-v2 {
           display: flex;
           flex-direction: column;
           align-items: flex-end;
           gap: 1.5rem;
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
          border-radius: 14px;
          background: rgba(var(--text-primary-rgb), 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-icon-v2:hover {
          background: var(--text-primary);
          color: var(--bg-primary-color);
          border-color: var(--text-primary);
          transform: translateY(-5px);
        }

        .status-indicator-v2 {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px;
          background: rgba(var(--accent-secondary-rgb), 0.05);
          border: 1px solid rgba(var(--accent-secondary-rgb), 0.1);
          border-radius: 100px;
        }

        .status-dot-v2 {
          width: 8px;
          height: 8px;
          background: var(--accent-secondary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-secondary);
          animation: pulse 2s infinite;
        }

        .status-label-v2 {
           font-family: var(--font-mono);
           font-size: 0.65rem;
           font-weight: 700;
           color: var(--accent-secondary);
           text-transform: uppercase;
           letter-spacing: 1.5px;
        }

        .footer-bottom-v2 {
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright-v2 {
          font-size: 0.8rem;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          opacity: 0.5;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .sep-v2 {
           opacity: 0.3;
        }

        .scroll-btn-v2 {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .scroll-btn-v2:hover {
          background: var(--text-primary);
          color: var(--bg-primary-color);
          border-color: var(--text-primary);
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .footer {
            padding: 4rem 0 5rem;
          }
          .footer-island-v2 {
            gap: 2.5rem;
          }
          .footer-content-v2 {
             flex-direction: column;
             align-items: center;
             text-align: center;
             gap: 2.5rem;
          }
          .logo-group-v2 {
              flex-direction: column;
              align-items: center;
          }
          .tagline-v2 {
              font-size: 0.75rem;
          }
          .footer-actions-v2 {
             align-items: center;
             width: 100%;
          }
          .footer-bottom-v2 {
             flex-direction: column-reverse;
             gap: 2rem;
             align-items: center;
             text-align: center;
          }
          .copyright-v2 {
              flex-direction: column;
              gap: 8px;
          }
        }

        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
