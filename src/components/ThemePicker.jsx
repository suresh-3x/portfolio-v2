import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, Sun, Moon, Terminal, Sunset, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemePicker = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const themesList = [
    { id: 'dawn', label: 'Dawn', icon: <Sun size={18} />, desc: 'Soft & Airy' },
    { id: 'dusk', label: 'Dusk', icon: <Moon size={18} />, desc: 'Deep & Cosmic' },
    { id: 'mono-light', label: 'Mono Light', icon: <FileText size={18} />, desc: 'Minimalist' },
    { id: 'mono-dark', label: 'Mono Dark', icon: <Terminal size={18} />, desc: 'Industrial' },
  ];

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
          color: var(--accent-secondary);
          background: rgba(var(--accent-secondary-rgb), 0.1);
          border-color: rgba(var(--accent-secondary-rgb), 0.2);
          box-shadow: 0 0 15px rgba(var(--accent-secondary-rgb), 0.2);
        }

        .theme-dropdown {
          position: absolute;
          top: calc(100% + 16px);
          right: 0;
          width: 280px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          box-shadow: 0 16px 48px -12px rgba(0, 0, 0, 0.5);
          z-index: 1000;
          padding: 1rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          animation: slideDown 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: top right;
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
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(var(--text-primary-rgb), 0.03);
          border: 1px solid transparent;
          border-radius: 8px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          position: relative;
          width: 100%;
        }

        .theme-option-card:hover {
          background: rgba(var(--accent-secondary-rgb), 0.05);
          border-color: rgba(var(--accent-secondary-rgb), 0.2);
          transform: translateX(4px);
        }

        .theme-option-card.active {
          background: rgba(var(--accent-secondary-rgb), 0.1);
          border-color: var(--accent-secondary);
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
      `}</style>
    </div>
  );
};

export default ThemePicker;
