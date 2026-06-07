import { experienceEntries } from '../../../data/experience';
import { education } from '../../../data/profile';
import CompanyLogo from '../../../components/CompanyLogo';

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

      <p className="t-edu mono">
        <span className="t-edu__k">education</span>
        {education.degree}, {education.universityFull} ({education.university}),{' '}
        {education.period}. {education.gpa}.
      </p>
    </section>
  );
}
