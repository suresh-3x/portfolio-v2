import React from 'react';

const SectionDivider = ({ title, subtitle, colorVar = '--accent-primary', id }) => {
    return (
        <div className="section-divider-v4" id={id}>
            <div className="divider-line-container">
                <div className="line left" style={{ '--current-accent': `var(${colorVar})` }}></div>
                <div className="divider-core">
                    <span className="hash" style={{ color: `var(${colorVar})` }}>#</span>
                    <h2 className="divider-title">{title}</h2>
                </div>
                <div className="line right" style={{ '--current-accent': `var(${colorVar})` }}></div>
            </div>
            {subtitle && <p className="divider-subtitle">{subtitle}</p>}
        </div>
    );
};

export default SectionDivider;
