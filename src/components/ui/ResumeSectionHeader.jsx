import React from 'react';

// Turns "About Me" -> "ABOUT_ME"
const toUnderscore = (s) => s.replace(/\s+/g, '_').toUpperCase();

const ResumeSectionHeader = ({ id, title, subtitle, emoji }) => (
  <header className="resume-section-header">
    <h2 id={`${id}-heading`} className="resume-section-title">
      {emoji && <span className="section-emoji" aria-hidden="true">{emoji} </span>}
      {toUnderscore(title)}
    </h2>
    <hr className="resume-rule" />
    {subtitle && <p className="resume-section-subtitle">{subtitle}</p>}
  </header>
);

export default ResumeSectionHeader;
