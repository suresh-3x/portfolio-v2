import React, { useState, useEffect } from 'react';
import { Terminal, User, Code, Folder, Mail, Briefcase, Menu, X } from 'lucide-react';
import ThemePicker from './ThemePicker';
import Logo from './Logo';

import { useTheme } from '../context/ThemeContext';

const Navbar = ({ highlightColor }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Handle scroll lock accurately
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent shift if scrollbar disappears
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [menuOpen]);



  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Use a small timeout to allow menu close animation to start/finish if needed, 
      // but immediate scroll is usually better for responsiveness.
      // However, we need to ensure the hash is updated without jumping.
      history.pushState(null, null, href);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'About', icon: <User size={18} />, href: '#about' },
    { label: 'Experience', icon: <Briefcase size={18} />, href: '#experience' },
    { label: 'Skills', icon: <Code size={18} />, href: '#skills' },
    { label: 'Projects', icon: <Folder size={18} />, href: '#projects' },
    { label: 'Contact', icon: <Mail size={18} />, href: '#contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-island">
        <div className="nav-container">
          <div className="logo-v4">
            <Logo />
            <div className="sb-details">
              <span className="sb-name">
                {"SURESH".split("").map((c, i) => <span key={i}>{c}</span>)}
              </span>
              <div className="sb-name">
                {"BHANDARI".split("").map((c, i) => <span key={i}>{c}</span>)}
              </div>
            </div>
          </div>
          <div className="nav-right">
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
              {navItems.map((item, index) => (
                <li key={item.label} style={{ transitionDelay: `${index * 100}ms` }}>
                  <a
                    href={item.href}
                    className="nav-link"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="theme-desktop">
              <ThemePicker />
            </div>
            <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* dedicated mobile menu overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <ThemePicker mobile={true} mode="modal" />
            <button className="mobile-close-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={28} />
            </button>
          </div>

          <nav className="mobile-nav-links-container">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, item.href)}
                style={{
                  animationDelay: `${100 + (index * 50)}ms`
                }}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span className="mobile-nav-label">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 1.5rem;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 95%;
          max-width: 1200px;
          z-index: 9999;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .nav-island {
          background: var(--card-bg);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid ${highlightColor || 'var(--border-color)'};
          box-shadow: none;
          border-radius: 100px;
          width: 100%;
          max-width: 1200px;
          pointer-events: auto;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-container {
          padding: 0.75rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .logo-v4 {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .logo-v4 > div:first-child {
          flex-shrink: 0;
        }

        .sb-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
          width: 85px;
          height: 40px;
        }

        .sb-name {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all var(--transition-fast);
          text-decoration: none;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          line-height: 1;
        }

        .nav-label {
          line-height: 1;
          display: flex;
          align-items: center;
        }

        .nav-link:hover {
          color: var(--accent-secondary);
          transform: translateY(-1px);
        }

        .nav-link:hover .nav-icon {
          color: var(--accent-secondary);
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }
        
        /* Mobile Menu Styles */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: var(--bg-primary-color);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          pointer-events: auto;
          overflow-y: auto;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          overscroll-behavior: contain;
        }
        
        .mobile-menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-menu-content {
           min-height: 100vh; /* Ensure content stretches for layout */
           display: flex;
           flex-direction: column;
           padding: 2rem;
           background: radial-gradient(circle at 50% 10%, rgba(var(--accent-secondary-rgb), 0.05), transparent 70%);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 4rem;
          padding-top: 1rem;
        }
        
        .mobile-close-btn {
           background: none;
           border: none;
           color: var(--text-primary);
           cursor: pointer;
           padding: 8px;
           display: flex;
           align-items: center;
           justify-content: center;
           border-radius: 50%;
           transition: background 0.2s;
        }
        
        .mobile-close-btn:hover {
           background: rgba(var(--text-primary-rgb), 0.1);
        }

        .mobile-nav-links-container {
           display: flex;
           flex-direction: column;
           gap: 2rem;
           align-items: center;
           justify-content: center;
           flex-grow: 1;
           padding-bottom: 4rem;
        }
        
        .mobile-nav-link {
           font-size: 2rem;
           font-weight: 800;
           color: var(--text-primary);
           text-decoration: none;
           display: flex;
           align-items: center;
           gap: 1rem;
           opacity: 0;
           transform: translateY(20px);
           transition: color 0.2s;
        }
        
        .mobile-menu-overlay.open .mobile-nav-link {
            animation: mobileItemSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .mobile-nav-icon {
           opacity: 0.5;
           font-size: 0.8em; /* scale relative to text */
        }
        
        .mobile-nav-link:hover {
            color: var(--accent-secondary);
        }
        
        .mobile-nav-link:active {
            transform: scale(0.98);
        }

        @media (max-width: 1024px) {
           .nav-links {
               display: none;
           }
           .theme-desktop {
               display: none;
           }
           .menu-toggle {
               display: flex;
               align-items: center;
               justify-content: center;
               width: 40px;
               height: 40px;
           }
        }
        
        @keyframes mobileItemSlideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
