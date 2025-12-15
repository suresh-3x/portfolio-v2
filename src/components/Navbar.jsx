import React, { useState, useEffect } from 'react';
import { Terminal, User, Code, Folder, Mail, Briefcase, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

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
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item, index) => (
            <li key={item.label} style={{ transitionDelay: `${index * 100}ms` }}>
              <a href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}>
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
          background: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 0;
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
          text-decoration: none;
        }

        .nav-link:hover {
          color: var(--accent-primary);
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
            z-index: 200;
          }
          
          .nav-links {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100dvh; /* Use dynamic viewport height */
            background: rgba(5, 5, 5, 0.98);
            backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 150;
          }

          .nav-links.open {
            opacity: 1;
            visibility: visible;
          }

          .nav-links li {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
          }

          .nav-links.open li {
            opacity: 1;
            transform: translateY(0);
          }

          .nav-link {
            font-size: 1.5rem;
            color: var(--text-primary);
            padding: 1rem;
            flex-direction: column;
            gap: 0.5rem;
          }

          .nav-link .nav-icon {
            width: 32px;
            height: 32px;
            color: var(--accent-primary);
            margin-bottom: 0.2rem;
          }

          .nav-link:hover {
            color: var(--accent-primary);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
