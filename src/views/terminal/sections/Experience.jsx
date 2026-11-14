import { experienceEntries } from '../../../data/experience';
import CompanyLogo from '../../../components/CompanyLogo';
import SectionHead from '../SectionHead';

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
      <SectionHead title="experience" to="/experience" more="full history" />

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
              {e.employer && <span className="t-exp-role__via mono">via {e.employer}</span>}
              <span className="t-exp-role__dt mono">{e.period}</span>
            </div>
            {/* ponytail: homepage shows the first two bullets; /experience has the rest */}
            <ul className="t-exp-role__list">
              {e.description.slice(0, 2).map((d, i) => (
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
