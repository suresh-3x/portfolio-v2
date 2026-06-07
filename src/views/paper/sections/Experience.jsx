import { experienceEntries } from '../../../data/experience';
import { education } from '../../../data/profile';
import CompanyLogo from '../../../components/CompanyLogo';

// One-line outcome per role (keyed by entry id, so the two Stride stints differ).
const OUTCOMES = {
  't-systems-pixeldust': 'Architected the internal agentic AI platform solo; 10+ production agents on Google ADK.',
  gridlogic: 'Owned the wallet and game engine backend at 5M+ MAU, 10K req/sec peak, zero financial data loss.',
  bizassist: 'Shipped four production apps solo with zero P0 incidents over 12 months.',
  'stride-ahead-lead': 'Returned as Tech Lead to stabilize a fragmented platform; cut release cycles 4h to under 15m.',
  'stride-ahead-sde-senior': 'Founding backend engineer; built the core architecture the team ran for 3+ years.',
};

const rows = [...experienceEntries].sort((a, b) => a.sortOrder - b.sortOrder);

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

      <div className="p-exp">
        {rows.map((e) => {
          const primary = e.logos[0];
          // The timeline chip is a small square: skip wide custom logos, use the
          // domain icon so it fits.
          const squareLogo = { ...primary, src: primary.wide ? undefined : primary.src };
          return (
            <div className="p-row" key={e.id}>
              <CompanyLogo logo={squareLogo} />
              <div className="p-rmid">
                <div className="p-co">
                  <CompanyName entry={e} />
                  <span className="p-co-sub"> {'·'} {e.role}</span>
                </div>
                <div className="p-out">{OUTCOMES[e.id] || e.description[0]}</div>
              </div>
              <div className="p-date">{e.period}</div>
            </div>
          );
        })}
      </div>

      <div className="p-exp-full">
        {rows.map((e) => (
          <div className="p-expitem" key={e.id}>
            <div className="p-expitem-head">
              <span className="p-expitem-co"><CompanyName entry={e} /></span>
              <span className="p-expitem-role">{e.role}</span>
              <span className="p-expitem-period">{e.period}</span>
            </div>
            <ul className="p-bullets">
              {e.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
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
