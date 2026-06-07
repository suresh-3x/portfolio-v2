import { experienceEntries } from '../../../data/experience';
import CompanyLogo from '../../../components/CompanyLogo';

// One-line outcome per role (keyed by entry id, so the two Stride stints differ).
const OUTCOMES = {
  't-systems-pixeldust': 'agentic AI platform solo, 10+ prod agents',
  gridlogic: 'wallet + game engine, 5M+ MAU / 10K rps',
  bizassist: 'four production apps, zero P0 in 12 months',
  'stride-ahead-lead': 'returned to stabilize the platform, releases 4h to under 15m',
  'stride-ahead-sde-senior': 'founding engineer, core architecture for 3+ years',
};

// Reverse chronological by start date (year + month).
const rows = [...experienceEntries].sort(
  (a, b) => b.year * 12 + b.month - (a.year * 12 + a.month)
);

function CompanyName({ entry }) {
  return entry.website ? (
    <a href={entry.website} target="_blank" rel="noopener noreferrer">{entry.company}</a>
  ) : (
    entry.company
  );
}

export default function Experience() {
  return (
    <section id="experience" className="t-exp">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">experience</span>
        <span className="t-sec-h__count mono">{String(rows.length).padStart(2, '0')} roles</span>
      </div>

      <div className="t-table">
        <div className="t-table__row t-table__row--head mono">
          <span className="t-table__co">COMPANY</span>
          <span className="t-table__rl">ROLE · OUTCOME</span>
          <span className="t-table__dt">DATES</span>
        </div>
        {rows.map((e) => (
          <div className="t-table__row mono" key={e.id}>
            <span className="t-table__co"><CompanyName entry={e} /></span>
            <span className="t-table__rl">
              {e.role}
              {OUTCOMES[e.id] ? ', ' + OUTCOMES[e.id] : ''}
            </span>
            <span className="t-table__dt">{e.period}</span>
          </div>
        ))}
      </div>

      <div className="t-exp-detail">
        {rows.map((e) => (
          <div className="t-exp-role" key={e.id}>
            <div className="t-exp-role__head">
              <span className="t-exp-role__logos">
                {e.logos.map((l) => (
                  <CompanyLogo key={l.domain} logo={l} />
                ))}
              </span>
              <span className="t-exp-role__co mono"><CompanyName entry={e} /></span>
              <span className="t-exp-role__role mono">{e.role}</span>
              {e.employer && (
                <span className="t-exp-role__via mono">via {e.employer}</span>
              )}
              <span className="t-exp-role__dt mono">{e.period}</span>
            </div>
            <ul className="t-exp-role__list">
              {e.description.map((d, i) => (
                <li key={i}>
                  <span className="t-exp-role__bullet mono" aria-hidden="true">&rsaquo;</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
