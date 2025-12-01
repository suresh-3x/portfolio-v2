import React from 'react';
import { Terminal, User, Code, Folder, Mail, Briefcase } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { label: 'About', icon: <User size={18} />, href: '#about' },
    { label: 'Experience', icon: <Briefcase size={18} />, href: '#experience' },
    { label: 'Skills', icon: <Code size={18} />, href: '#skills' },
    { label: 'Projects', icon: <Folder size={18} />, href: '#projects' },
    { label: 'Contact', icon: <Mail size={18} />, href: '#contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Terminal size={24} color="var(--accent-primary)" />
          <span className="logo-text">~/portfolio</span>
        </div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="nav-link">
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(5, 5, 5, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          padding: var(--spacing-md) 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .logo-text {
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: flex;
          gap: var(--spacing-lg);
          list-style: none;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--accent-primary);
        }

        @media (max-width: 768px) {
          .nav-label {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
