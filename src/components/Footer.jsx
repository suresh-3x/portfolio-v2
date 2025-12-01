import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <p className="copyright">&copy; {new Date().getFullYear()} Suresh Bhandari. All rights reserved.</p>
          <div className="footer-badge">
            Built with React & Vite
          </div>
        </div>
        <div className="footer-links">
          <a href="https://github.com/suresh-3x" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://linkedin.com/in/suresh-3x" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="mailto:suresh.37x@gmail.com" className="footer-link">Email</a>
        </div>
      </div>
      <style>{`
        .footer {
          padding: var(--spacing-xl) 0;
          border-top: 1px solid var(--border-color);
          background: linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary));
          margin-top: var(--spacing-xl);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .footer-main {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
        }

        .copyright {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .footer-badge {
            font-size: 0.75rem;
            padding: 2px 8px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            color: var(--text-muted);
            border: 1px solid var(--border-color);
        }

        .footer-links {
          display: flex;
          gap: var(--spacing-lg);
        }

        .footer-link {
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: color var(--transition-fast);
        }

        .footer-link:hover {
          color: var(--accent-primary);
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
          }
          
          .footer-main {
            flex-direction: column;
            gap: var(--spacing-xs);
          }
        }
      `}</style>
    </footer >
  );
};

export default Footer;
