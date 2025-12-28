import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, Sun, Moon, Terminal, Sunset, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemePicker = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Derived state
  const isMono = theme.includes('mono');
  // Consider 'rgb' legacy theme as dark if it exists, otherwise 'dusk' is dark.
  const isDark = theme === 'dusk' || theme === 'mono-dark' || theme === 'rgb';

  const toggleMono = () => {
    if (isMono) {
      // Switching OFF Monochrome -> Go to Color
      setTheme(isDark ? 'dusk' : 'dawn');
    } else {
      // Switching ON Monochrome -> Go to Mono
      setTheme(isDark ? 'mono-dark' : 'mono-light');
    }
  };

  const setFormat = (dark) => {
    if (isMono) {
      setTheme(dark ? 'mono-dark' : 'mono-light');
    } else {
      setTheme(dark ? 'dusk' : 'dawn');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="theme-picker-container" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`theme-toggle-btn ${isOpen ? 'open' : ''}`}
        aria-label="Theme settings"
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="dropdown-header">
            <span>Appearance</span>
          </div>

          <div className="dropdown-section">
            <div className="toggle-row">
              <span className="label">Monochrome</span>
              <button
                className={`switch-toggle ${isMono ? 'active' : ''}`}
                onClick={toggleMono}
                role="switch"
                aria-checked={isMono}
              >
                <div className="switch-handle" />
              </button>
            </div>
          </div>

          <div className="dropdown-divider" />

          <div className="dropdown-section">
            <span className="label-sm">Theme</span>
            <div className="theme-grid">
              <button
                className={`theme-option ${!isDark ? 'selected' : ''}`}
                onClick={() => setFormat(false)}
              >
                <Sun size={18} />
                <span>Light</span>
              </button>
              <button
                className={`theme-option ${isDark ? 'selected' : ''}`}
                onClick={() => setFormat(true)}
              >
                <Moon size={18} />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .theme-picker-container {
          position: relative;
        }

        .theme-toggle-btn {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle-btn:hover, .theme-toggle-btn.open {
          color: var(--accent-secondary); /* Green as requested */
          background: rgba(var(--accent-secondary-rgb), 0.1);
          border-color: rgba(var(--accent-secondary-rgb), 0.2);
          box-shadow: 0 0 15px rgba(var(--accent-secondary-rgb), 0.2);
        }

        .theme-dropdown {
          position: absolute;
          top: calc(100% + 16px);
          right: 0;
          width: 260px;
          /* Using RGB var for glass effect */
          background: rgba(var(--bg-primary-rgb), 0.85); 
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: 0 16px 48px -12px rgba(0, 0, 0, 0.5);
          z-index: 1000;
          padding: 12px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: top right;
        }
        
        /* Define RGB values for glass effect based on data-theme */
        :root { --bg-primary-rgb: 255, 255, 255; }
        [data-theme='dusk'] { --bg-primary-rgb: 13, 17, 23; }
        [data-theme='dawn'] { --bg-primary-rgb: 244, 246, 248; }
        [data-theme='mono-dark'] { --bg-primary-rgb: 0, 0, 0; }
        [data-theme='mono-light'] { --bg-primary-rgb: 255, 255, 255; }

        .dropdown-header {
          padding: 0 4px 12px 4px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .dropdown-section {
          padding: 4px 0;
        }

        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
          transition: background 0.2s;
        }
        
        .toggle-row:hover {
            background: rgba(var(--accent-primary-rgb), 0.05);
        }

        .label {
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .label-sm {
          display: block;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
          padding-left: 4px;
          font-weight: 600;
        }

        .switch-toggle {
          width: 44px;
          height: 24px;
          background: var(--border-color);
          border: none;
          border-radius: 99px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          padding: 0;
        }

        .switch-toggle.active {
          background: var(--accent-secondary); /* Switch active is Green too? Or Primary? keeping Primary for switch, button is Green */
        }

        .switch-handle {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        .switch-toggle.active .switch-handle {
          transform: translateX(20px);
        }

        .dropdown-divider {
          height: 1px;
          background: var(--border-color);
          margin: 12px 0;
          opacity: 0.5;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .theme-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 16px;
          background: var(--bg-secondary);
          border: 2px solid transparent;
          border-radius: 12px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-option:hover {
          background: var(--bg-primary-color);
          border-color: var(--text-primary);
          color: var(--text-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .theme-option.selected {
          /* Selected state Red or Green? Usually Primary. keeping Primary */
          background: rgba(var(--accent-primary-rgb), 0.1);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ThemePicker;
