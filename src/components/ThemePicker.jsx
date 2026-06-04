import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemePicker = ({ mobile, mode = 'dropdown' }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themesList = [
    { id: 'dawn', label: 'Dawn', icon: <Sun size={18} />, desc: 'Soft & Airy' },
    { id: 'dusk', label: 'Dusk', icon: <Moon size={18} />, desc: 'Deep & Cosmic' },
  ];

  return (
    <div className={`theme-picker-container ${mobile ? 'mobile' : ''}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`theme-toggle-btn ${isOpen ? 'open' : ''}`}
        aria-label="Theme settings"
      >
        <Palette size={20} />
      </button>

      {/* Modal Backdrop */}
      {isOpen && mode === 'modal' && (
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>
      )}

      {isOpen && (
        <div className={`theme-dropdown ${mode === 'modal' ? 'modal' : ''}`}>
          <div className="dropdown-header">
            <span>Interface Mode</span>
          </div>

          <div className="theme-options-grid">
            {themesList.map((t) => (
              <button
                key={t.id}
                className={`theme-option-card ${theme === t.id ? 'active' : ''}`}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
              >
                <div className="option-icon">{t.icon}</div>
                <div className="option-meta">
                  <span className="option-label">{t.label}</span>
                  <span className="option-desc">{t.desc}</span>
                </div>
                {theme === t.id && <Check size={14} className="check-icon" />}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .theme-picker-container {
          position: relative;
        }

        .theme-picker-container.mobile {
            display: flex;
            align-items: center;
        }

        .theme-toggle-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(var(--border-color-rgb, 255, 255, 255), 0.15);
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 1px rgba(var(--accent-primary-rgb, 99, 102, 241), 0.05),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .theme-toggle-btn:hover, .theme-toggle-btn.open {
          color: var(--accent-primary);
          background: rgba(var(--accent-primary-rgb), 0.08);
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 1px rgba(var(--accent-primary-rgb, 99, 102, 241), 0.15),
                      0 4px 12px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .theme-picker-container.mobile .theme-toggle-btn {
           /* Inherit standard size in header */
        }

        /* Standard Dropdown */
        .theme-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 260px;
          background: var(--card-bg);
          border: 1.5px solid rgba(var(--border-color-rgb, 255, 255, 255), 0.15);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2),
                      0 0 0 1px rgba(var(--accent-primary-rgb, 99, 102, 241), 0.05),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05);
          z-index: 1000;
          padding: 0.75rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          animation: slideDown 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: top right;
        }

        /* Modal Mode */
        .theme-dropdown.modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 320px;
          z-index: 100001; /* Higher than menu overlay */
          animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 100000;
          animation: fadeIn 0.2s ease;
        }

        .dropdown-header {
          margin-bottom: 1rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.6;
        }

        .theme-options-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .theme-option-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem;
          background: transparent;
          border: 1.5px solid rgba(var(--border-color-rgb, 255, 255, 255), 0.1);
          border-radius: 8px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          position: relative;
          width: 100%;
          box-shadow: 0 0 0 1px rgba(var(--accent-primary-rgb, 99, 102, 241), 0.02),
                      inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }

        .theme-option-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(var(--accent-primary-rgb), 0.3);
          transform: translateX(2px);
          box-shadow: 0 0 0 1px rgba(var(--accent-primary-rgb, 99, 102, 241), 0.1),
                      0 4px 12px rgba(0, 0, 0, 0.08),
                      inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .theme-option-card.active {
          background: rgba(var(--accent-primary-rgb), 0.08);
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 1px rgba(var(--accent-primary-rgb, 99, 102, 241), 0.15),
                      0 4px 12px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .option-icon {
          color: var(--accent-secondary);
          opacity: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .option-meta {
          display: flex;
          flex-direction: column;
        }

        .option-label {
          font-size: 0.9rem;
          font-weight: 700;
        }

        .option-desc {
          font-size: 0.7rem;
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .check-icon {
          margin-left: auto;
          color: var(--accent-secondary);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes modalPop {
          from { opacity: 0; transform: translate(-50%, -45%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ThemePicker;
