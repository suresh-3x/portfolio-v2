import { useState } from 'react';

// Source chain: custom src (if any) -> Google favicon (reliable) -> monogram fallback.
function sourcesFor(logo) {
  const list = [];
  if (logo.src) list.push(logo.src);
  if (logo.domain) {
    list.push(`https://www.google.com/s2/favicons?domain=${logo.domain}&sz=128`);
  }
  return list;
}

function initialsFor(logo) {
  return (logo.company || logo.domain || '?')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Renders a single company logo with graceful fallback to a monogram.
 * className styles the <img>; monoClassName styles the fallback monogram box.
 */
export default function CompanyLogo({ logo, className = '', monoClassName = '' }) {
  const [idx, setIdx] = useState(0);
  const sources = sourcesFor(logo);
  const exhausted = idx >= sources.length;

  const visual = exhausted ? (
    <span className={`company-logo company-logo--mono ${monoClassName}`.trim()} aria-hidden="true">
      {initialsFor(logo)}
    </span>
  ) : (
    <img
      src={sources[idx]}
      alt={`${logo.company} logo`}
      className={`company-logo ${logo.wide ? 'company-logo--wide' : ''} ${className}`.trim()}
      loading="lazy"
      decoding="async"
      onError={() => setIdx((i) => i + 1)}
    />
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="company-logo-link"
        aria-label={`Visit ${logo.company}`}
        title={logo.company}
      >
        {visual}
      </a>
    );
  }
  return visual;
}
