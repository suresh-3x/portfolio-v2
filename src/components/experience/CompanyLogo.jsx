import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

const logoSourcesFromDomain = (domain) => [
  `https://logo.clearbit.com/${domain}?size=128`,
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
];

const CompanyLogo = ({
  domain,
  company,
  size = 48,
  className = '',
  src: customSrc,
  href,
  wide = false,
}) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const initials = (company || domain || '?')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const sources = customSrc
    ? [customSrc]
    : domain
      ? logoSourcesFromDomain(domain)
      : [];

  const renderLogo = () => {
    if (!sources.length || failed || sourceIndex >= sources.length) {
      return (
        <div
          className={`company-logo company-logo-fallback ${className}`}
          style={{ width: size, height: size }}
          title={company}
        >
          {initials || <Building2 size={size * 0.4} />}
        </div>
      );
    }

    return (
      <img
        src={sources[sourceIndex]}
        alt={`${company} logo`}
        className={`company-logo ${wide ? 'company-logo--wide' : ''} ${className}`.trim()}
        width={wide ? undefined : size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (customSrc) {
            setFailed(true);
            return;
          }
          if (sourceIndex < sources.length - 1) {
            setSourceIndex((i) => i + 1);
          } else {
            setFailed(true);
          }
        }}
      />
    );
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`company-logo-link ${className}`}
        aria-label={`Visit ${company}`}
        title={`Visit ${company}`}
      >
        {renderLogo()}
      </a>
    );
  }

  return renderLogo();
};

export const CompanyLogoGroup = ({
  logos = [],
  size = 52,
  className = '',
  stacked = false,
}) => {
  if (!logos.length) return null;

  return (
    <div
      className={`company-logo-group ${stacked ? 'company-logo-group--stacked' : ''} ${className}`.trim()}
    >
      {logos.map((logo, index) => {
        const href =
          logo.href || logo.website || (logo.domain ? `https://${logo.domain}` : undefined);

        return (
          <React.Fragment key={`${logo.company}-${logo.domain}`}>
            <div className="company-logo-wrap">
              <CompanyLogo
                domain={logo.domain}
                company={logo.company}
                size={size}
                className="company-logo-item"
                src={logo.src}
                wide={logo.wide}
                href={href}
              />
            </div>
            {index < logos.length - 1 && (
              <span className="company-logo-sep" aria-hidden>
                ×
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CompanyLogo;
