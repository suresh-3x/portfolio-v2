import React from 'react';

// Turns "About Me" -> "ABOUT_ME"
const toUnderscore = (s) => s.replace(/\s+/g, '_').toUpperCase();

const SectionDivider = ({ title, subtitle, colorVar = '--accent-primary', id, emoji }) => {
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
