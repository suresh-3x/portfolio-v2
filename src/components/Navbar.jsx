import React, { useState, useEffect, useRef } from 'react';
import { User, Code, Folder, Mail, Briefcase, Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import ThemePicker from './ThemePicker';
import Logo from './Logo';

import { useTheme } from '../context/ThemeContext';

// Sections already carry `scroll-margin-top` for the fixed navbar, which Lenis
// honors — so no extra offset is needed here.
const NAV_SCROLL_OFFSET = 0;

const Navbar = ({ highlightColor }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const lenis = useLenis();
  const { theme } = useTheme();
  const isMonochrome = theme === 'mono-light' || theme === 'mono-dark';

  const accentColors = React.useMemo(() => {
    return [
      'var(--accent-primary)',
      'var(--accent-secondary)',
      'var(--accent-tertiary)',
      'var(--accent-primary)',
      'var(--accent-secondary)',
    ];
  }, []);

  const borderMultiplier = isMonochrome ? 3.7 : 1;

  // Optimized scroll listener with debounce
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 24;
      
      if (shouldBeScrolled !== scrolled) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        setScrolled(shouldBeScrolled);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrolled]);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (!element) return;
    history.pushState(null, null, href);
    if (lenis) {
      lenis.scrollTo(href, { offset: NAV_SCROLL_OFFSET, duration: 0.6 });
    } else {
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ '--border-multiplier': borderMultiplier }}>
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
              {navItems.map((item, index) => {
                const accentColor = accentColors[index % accentColors.length];
                return (
                  <li key={item.label} style={{ transitionDelay: `${index * 100}ms` }}>
                    <a
                      href={item.href}
                      className="nav-link"
                      style={{ '--nav-accent': accentColor }}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <span className="nav-icon" style={{ color: accentColor }}>{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </a>
                  </li>
                );
              })}
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
            {navItems.map((item, index) => {
              const accentColor = accentColors[index % accentColors.length];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="mobile-nav-link"
                  style={{
                    '--mobile-accent': accentColor,
                    animationDelay: `${100 + (index * 50)}ms`
                  }}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span className="mobile-nav-icon" style={{ color: accentColor }}>{item.icon}</span>
                  <span className="mobile-nav-label">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .nav-island {
          background: var(--card-bg);
          border: none;
          border-bottom: 2px solid var(--nb-border);
          border-radius: 0;
          width: 100%;
          pointer-events: auto;
          transition: box-shadow 0.2s ease;
        }

        .navbar.scrolled .nav-island {
          box-shadow: 0 4px 0 var(--nb-shadow-color);
        }

        .nav-container {
          padding: 0.85rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          will-change: padding;
          transition: padding 0.2s ease;
        }

        .navbar.scrolled .nav-container {
          padding: 0.65rem 1.5rem;
        }

        .logo-v4 {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .logo-v4 > div:first-child {
          flex-shrink: 0;
        }

        .sb-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0px;
          width: auto;
          height: 40px;
        }

        .sb-name {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.1;
          display: flex;
          justify-content: space-between;
          width: 100%;
          letter-spacing: 0.02em;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
          padding: 6px 2px;
          border-radius: 0;
          border: none;
          border-bottom: 2px solid transparent;
        }

        .nav-icon {
          display: none;
        }

        .nav-label {
          line-height: 1;
          display: flex;
          align-items: center;
        }

        .nav-link:hover {
          color: var(--text-primary);
          border-bottom-color: var(--nav-accent);
        }

        .menu-toggle {
          display: none;
          background: var(--card-bg);
          border: 2px solid var(--nb-border);
          color: var(--text-primary);
          cursor: pointer;
          padding: 7px;
          border-radius: 0;
          box-shadow: var(--nb-shadow-sm);
          transition: transform 0.08s ease, box-shadow 0.08s ease;
          flex-shrink: 0;
        }

        .menu-toggle:hover {
          transform: translate(3px, 3px);
          box-shadow: 0 0 0 var(--nb-shadow-color);
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
          overflow-x: hidden;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease, visibility 0.25s ease;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        
        .mobile-menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-menu-content {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          background: radial-gradient(circle at 50% 0%, rgba(var(--accent-secondary-rgb, 255, 255, 255), 0.03), transparent 50%);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
          padding-top: 0.5rem;
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
          transition: background 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        
        .mobile-close-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .mobile-close-btn:active {
          transform: scale(0.95);
        }

        .mobile-nav-links-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          justify-content: flex-start;
          flex-grow: 1;
          padding-bottom: 2rem;
        }
        
        .mobile-nav-link {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          opacity: 0;
          transform: translateX(-20px);
          transition: color 0.2s ease, transform 0.2s ease;
          width: 100%;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid transparent;
        }

        .mobile-menu-overlay.open .mobile-nav-link {
          animation: mobileItemSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .mobile-nav-icon {
          opacity: 0.7;
          flex-shrink: 0;
          transition: opacity 0.2s ease;
        }

        .mobile-nav-link:hover {
          color: var(--mobile-accent);
          background: rgba(255, 255, 255, 0.03);
          border-color: var(--mobile-accent)30;
        }

        .mobile-nav-link:hover .mobile-nav-icon {
          opacity: 1;
        }
        
        .mobile-nav-link:active {
          transform: translateX(-18px) scale(0.98);
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
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0.6rem 1rem;
          }

          .navbar.scrolled .nav-container {
            padding: 0.5rem 1rem;
          }

          .logo-v4 {
            font-size: 1.1rem;
          }

          .mobile-menu-overlay {
            padding: 1.5rem;
          }

          .mobile-menu-header {
            margin-bottom: 2rem;
          }

          .mobile-nav-link {
            font-size: 1.3rem;
            padding: 1rem;
          }
        }
        
        @keyframes mobileItemSlideIn {
          from { 
            opacity: 0; 
            transform: translateX(-20px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
