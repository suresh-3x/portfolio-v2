import React from 'react';

const ResumeSectionHeader = ({ id, title, subtitle }) => (
  <header className="resume-section-header">
    <h2 id={`${id}-heading`} className="resume-section-title">
      {title}
    </h2>
    <hr className="resume-rule" />
    {subtitle && <p className="resume-section-subtitle">{subtitle}</p>}
  </header>
);

export default ResumeSectionHeader;
