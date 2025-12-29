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
              <div className="sb-sys">
                {"BHANDARI".split("").map((c, i) => <span key={i}>{c}</span>)}
              </div>
            </div>
          </div>
          <div className="nav-right">
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
              {navItems.map((item, index) => (
                <li key={item.label} style={{ transitionDelay: `${index * 100}ms` }}>
                  <a href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </a>
                </li>
              ))}
              {menuOpen && (
                <div className="mobile-theme-wrapper">
                  <ThemePicker />
                </div>
              )}
            </ul>
            <div className="theme-desktop">
              <ThemePicker />
            </div>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 95%;
          max-width: 1200px;
          z-index: 9999;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none; /* Allows scrolling background elements while letting island handle clicks */
        }

        .nav-island {
          background: var(--card-bg);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid ${highlightColor || 'var(--border-color)'};
          box-shadow: none;
          border-radius: 100px;
          width: 100%;
          max-width: 1200px; /* Align with main-content max-width */
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

        .sb-sys {
          font-family: var(--font-mono);
          font-size: 0.52rem;
          font-weight: 700;
          color: var(--text-secondary);
          opacity: 0.6;
          text-transform: uppercase;
          line-height: 1;
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 1px;
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
           
           .nav-links.open {
               display: flex;
               position: fixed;
               top: 0;
               left: 0;
               width: 100%;
               height: 100vh;
               background: var(--bg-primary-color);
               flex-direction: column;
               justify-content: center;
               align-items: center;
               z-index: 9999;
               padding: 5rem 2rem 2rem;
               gap: 1.5rem;
               animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
               overflow-y: auto;
           }
           
           .nav-links.open li {
               width: 100%;
               display: flex;
               justify-content: center;
               opacity: 0;
               animation: fadeInMobile 0.4s forwards;
           }

           @keyframes fadeInMobile {
               from { opacity: 0; transform: translateY(10px); }
               to { opacity: 1; transform: translateY(0); }
           }
           
           .nav-link {
               font-size: 1.5rem;
               padding: 1.25rem;
               width: fit-content;
               text-align: center;
               color: var(--text-primary);
               font-weight: 700;
           }

           .mobile-theme-wrapper {
               margin-top: 2rem;
               padding: 1.5rem;
               border-top: 1px solid var(--border-color);
               width: 80%;
               display: flex;
               justify-content: center;
           }

           .menu-toggle {
               position: relative;
               z-index: 10001;
           }
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
