import React from 'react';
import { useTheme } from '../../context/ThemeContext';

// Turns "About Me" -> "ABOUT_ME"
const toUnderscore = (s) => s.replace(/\s+/g, '_').toUpperCase();

const SectionDivider = ({ title, subtitle, colorVar = '--accent-primary', id, emoji, index }) => {
    const { theme } = useTheme();
    const isEditorial = theme === 'dawn';

    if (isEditorial) {
        return (
            <div className="section-head-wrap" id={id}>
                <div className="section-head">
                    <div>
                        <div className="section-num">{index || '01'} / {title}</div>
                        <h2>{title}</h2>
                    </div>
                    {subtitle && <div className="section-sub">{subtitle}</div>}
                </div>
                <style>{`
                    .section-head-wrap {
                        max-width: 1100px;
                        margin: 0 auto;
                        padding: 7rem 1.5rem 3rem;
                    }
                    .section-head {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        border-bottom: 2px solid var(--text-primary);
                        padding-bottom: 1rem;
                    }
                    .section-num {
                        font-family: var(--font-mono);
                        font-size: 12px;
                        color: var(--accent-primary);
                        font-weight: 700;
                        letter-spacing: 0.1em;
                        text-transform: uppercase;
                        margin-bottom: 4px;
                    }
                    .section-head h2 {
                        font-size: clamp(32px, 4vw, 52px);
                        font-weight: 700;
                        line-height: 1;
                        letter-spacing: -0.03em;
                        text-transform: uppercase;
                        color: var(--text-primary);
                        margin: 0;
                    }
                    .section-sub {
                        color: var(--text-secondary);
                        font-size: 14px;
                        text-align: right;
                        max-width: 300px;
                        line-height: 1.6;
                        font-weight: 400;
                    }
                    @media (max-width: 768px) {
                        .section-head {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 1rem;
                        }
                        .section-sub {
                            text-align: left;
                            max-width: none;
                        }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="section-divider-v4" id={id}>
            <div className="divider-line-container">
                <div className="line left" style={{ '--current-accent': `var(${colorVar})` }}></div>
                <div className="divider-core">
                    {emoji
                        ? <span className="divider-emoji" aria-hidden="true">{emoji}</span>
                        : <span className="hash" style={{ color: `var(${colorVar})` }}>#</span>}
                    <h2 className="divider-title">{toUnderscore(title)}</h2>
                </div>
                <div className="line right" style={{ '--current-accent': `var(${colorVar})` }}></div>
            </div>
            {subtitle && <p className="divider-subtitle">{subtitle}</p>}
        </div>
    );
};

export default SectionDivider;
