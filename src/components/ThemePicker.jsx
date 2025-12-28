import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, Sun, Moon, Terminal, Sunset, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemePicker = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const themes = [
    {
      id: 'dawn',
      name: 'Aurora',
      preview: 'linear-gradient(135deg, #ffffff 0%, #f0f2f5 100%)',
      accentColor: '#1a7f37',
      textColor: '#1f2328',
      icon: Sun
    },
    {
      id: 'dusk',
      name: 'Midnight',
      preview: 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)',
      accentColor: '#3fb950',
      textColor: '#e6edf3',
      icon: Sunset
    },
    {
      id: 'mono-light',
      name: 'Mono Light',
      preview: '#ffffff',
      accentColor: '#000000',
      textColor: '#000000',
      icon: FileText
    },
    {
      id: 'mono-dark',
      name: 'Mono Dark',
      preview: '#000000',
      accentColor: '#ffffff',
      textColor: '#ffffff',
      icon: Moon
    }
  ];

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
    <div className="theme-picker" ref={menuRef}>
      <button
        className={`theme-picker-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme Picker"
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <div className="theme-menu">
          <div className="theme-menu-header">
            <h3>Appearance</h3>
          </div>

          <div className="theme-grid">
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  className={`theme-card ${theme === t.id ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  style={{ background: t.preview }}
                >
                  <div className="theme-card-overlay">
                    <div className="theme-card-icon" style={{ color: t.textColor, opacity: 0.15 }}>
                      <Icon size={48} strokeWidth={1.5} />
                    </div>
                    <span className="theme-card-name" style={{ color: t.textColor }}>{t.name}</span>
                    {theme === t.id && (
                      <div className="theme-check" style={{ background: t.accentColor, color: '#fff' }}>
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <div className="theme-card-border" style={{ borderColor: theme === t.id ? t.accentColor : 'transparent' }}></div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .theme-picker {
          position: relative;
        }

        .theme-picker-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-picker-btn:hover, .theme-picker-btn.active {
          background: var(--bg-secondary);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          transform: translateY(-1px);
        }

        .theme-menu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 260px;
          background: var(--bg-primary-color);
          /* Force solid background */
          background-color: var(--bg-primary-color); 
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 1rem;
          box-shadow: 0 10px 40px -5px rgba(0,0,0,0.25);
          z-index: 1000;
          animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: top right;
        }

        /* Ensure menu is visible against glass/blur backgrounds */
        [data-theme='matrix'] .theme-menu { background: #000; border: 1px solid #333; }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .theme-menu-header {
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }

        .theme-menu-header h3 {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-family: var(--font-mono);
          padding-left: 4px;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .theme-card {
          position: relative;
          aspect-ratio: 1;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          overflow: hidden;
          padding: 0;
          transition: transform 0.2s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .theme-card:hover {
          transform: scale(1.03);
        }

        .theme-card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          padding: 10px;
        }

        .theme-card-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -60%);
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 1;
        }

        .theme-card-name {
          font-size: 0.8rem;
          font-weight: 700;
          font-family: var(--font-mono);
          z-index: 2;
        }

        .theme-check {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          z-index: 2;
        }

        .theme-card-border {
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          border-radius: 10px;
          pointer-events: none;
          z-index: 3;
        }
      `}</style>
    </div>
  );
};

export default ThemePicker;
