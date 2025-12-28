import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Heart, Code } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section brand">
          <div className="logo">
            <Logo size={32} />
            <span className="logo-text">Suresh.dev</span>
          </div>
          <p className="tagline">Building digital experiences with code & creativity.</p>
          <div className="status-badge">
            <span className="status-dot"></span>
            System Online
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3 className="section-title">Navigation</h3>
          <nav className="link-grid">
            <a href="#" className="nav-link">Home</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>

        {/* Social & Connect */}
        <div className="footer-section social">
          <h3 className="section-title">Connect</h3>
          <div className="social-links">
            <a href="https://github.com/suresh-3x" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/suresh-3x" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:suresh.37x@gmail.com" className="social-link" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="https://stackoverflow.com/users/15631949/suresh-bhandari" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Stack Overflow">
              <Code size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Suresh Bhandari. All rights reserved.</p>
        </div>
        <button onClick={scrollToTop} className="scroll-top" aria-label="Scroll to top">
          <ArrowUp size={16} />
        </button>
      </div>

      <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: var(--spacing-lg) 0 var(--spacing-md);
          margin-top: var(--spacing-lg);
          position: relative;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-lg);
        }

        /* Brand Section */
        .footer-section.brand {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--accent-secondary);
          font-family: var(--font-mono);
          font-weight: bold;
          font-size: 1.2rem;
        }

        .tagline {
          color: var(--text-secondary);
          max-width: 300px;
          font-size: 0.95rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(var(--accent-secondary-rgb), 0.05);
          border: 1px solid rgba(var(--accent-secondary-rgb), 0.2);
          border-radius: 20px;
          color: var(--accent-secondary);
          font-size: 0.8rem;
          font-family: var(--font-mono);
          width: fit-content;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-secondary);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-secondary);
          animation: pulse 2s infinite;
        }

        /* Section Titles */
        .section-title {
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-size: 1rem;
          margin-bottom: var(--spacing-md);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Navigation */
        .link-grid {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .nav-link {
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          width: fit-content;
        }

        .nav-link:hover {
          color: var(--accent-secondary);
          transform: translateX(4px);
        }

        /* Social Links */
        .social-links {
          display: flex;
          gap: var(--spacing-md);
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .social-link:hover {
          transform: translateY(-2px);
          color: white;
          border-color: transparent;
        }

        .social-link:nth-child(1):hover { /* Github */
          background: var(--accent-secondary);
          box-shadow: 0 4px 12px rgba(var(--accent-secondary-rgb), 0.4);
        }

        .social-link:nth-child(2):hover { /* LinkedIn */
          background: var(--accent-tertiary);
          box-shadow: 0 4px 12px rgba(var(--accent-tertiary-rgb), 0.4);
        }

        .social-link:nth-child(3):hover { /* Mail */
          background: var(--accent-primary);
          box-shadow: 0 4px 12px rgba(var(--accent-primary-rgb), 0.4);
        }

        .social-link:nth-child(4):hover { /* StackOverflow */
          background: #f48024;
          box-shadow: 0 4px 12px rgba(244, 128, 36, 0.4);
        }

        /* Bottom Bar */
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--spacing-lg) var(--spacing-md) 0;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .scroll-top {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .scroll-top:hover {
          background: var(--bg-primary);
          color: var(--accent-secondary);
          border-color: var(--accent-secondary);
        }

        /* Social Section Alignment */
        .footer-section.social {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-lg);
            text-align: center;
          }

          .footer-section.brand {
            align-items: center;
          }

          .footer-section.social {
            align-items: center;
          }

          .logo {
            justify-content: center;
          }

          .link-grid {
            align-items: center;
          }

          .social-links {
            justify-content: center;
          }

          .footer-bottom {
            flex-direction: column;
            gap: var(--spacing-md);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
