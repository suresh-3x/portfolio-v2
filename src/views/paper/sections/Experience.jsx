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
    <section id="experience" className="p-section p-experience">
      <div className="p-h">
        <h2>Experience</h2>
        <span className="p-h-note">reverse chronological</span>
      </div>

      <div className="p-exp-full">
        {rows.map((e) => (
          <div className="p-expitem" key={e.id}>
            <div className="p-rowlogos">
              {e.logos.map((l) => (
                <CompanyLogo key={l.domain} logo={l} />
              ))}
            </div>
            <div className="p-expitem-body">
              <div className="p-expitem-head">
                <span className="p-expitem-co"><CompanyName entry={e} /></span>
                <span className="p-expitem-role">
                  {e.role}
                  {e.employer ? ` · via ${e.employer}` : ''}
                </span>
                <span className="p-expitem-period">{e.period}</span>
              </div>
              <ul className="p-bullets">
                {e.description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <p className="p-edu">
        <span className="p-edu-key">education</span>
        {education.degree}, {education.universityFull} ({education.university}),{' '}
        {education.period}. {education.gpa}.
      </p>
    </section>
  );
}
