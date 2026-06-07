import { experienceEntries } from '../../../data/experience';
import { education } from '../../../data/profile';

// Company monogram colors keyed by first letter / company.
const CHIP_CLASS = {
  'T-Systems': 'p-chip--ts',
  Gridlogic: 'p-chip--gl',
  'Stride Ahead': 'p-chip--sa',
  BizAssist: 'p-chip--bz',
};

// Concise one-line outcomes derived from the first description bullet.
const OUTCOMES = {
  'T-Systems': 'Architected the internal agentic AI platform solo; 10+ production agents on Google ADK.',
  Gridlogic: 'Owned the wallet and game engine backend at 5M+ MAU, 10K req/sec peak, zero financial data loss.',
  BizAssist: 'Shipped four production apps solo with zero P0 incidents over 12 months.',
  'Stride Ahead': 'Founding backend engineer; standardized 5+ microservices and cut release cycles 4h to under 15m.',
};

// Merge the two Stride Ahead rows into a single timeline row.
function buildRows(entries) {
  const rows = [];
  const seenGroups = new Set();
  for (const e of entries) {
    if (e.groupKey === 'strideahead') {
      if (seenGroups.has('strideahead')) continue;
      seenGroups.add('strideahead');
      rows.push({
        key: 'strideahead',
        company: 'Stride Ahead',
        roleSub: 'Tech Lead / Senior SDE',
        period: 'Mar 2021 to Aug 2025',
        outcome: OUTCOMES['Stride Ahead'],
      });
      continue;
    }
    rows.push({
      key: e.id,
      company: e.company,
      roleSub: e.role,
      period: e.period,
      outcome: OUTCOMES[e.company] || e.description[0],
    });
  }
  return rows;
}

const rows = buildRows(experienceEntries);

export default function Experience() {
  return (
    <section id="experience" className="p-section p-experience">
      <div className="p-h">
        <h2>Experience</h2>
        <span className="p-h-note">reverse chronological</span>
      </div>

      <div className="p-exp">
        {rows.map((r) => (
          <div className="p-row" key={r.key}>
            <div className={`p-mono ${CHIP_CLASS[r.company] || ''}`}>
              {r.company.charAt(0)}
            </div>
            <div className="p-rmid">
              <div className="p-co">
                {r.company}
                <span className="p-co-sub">
                  {' '}
                  {'·'} {r.roleSub}
                </span>
              </div>
              <div className="p-out">{r.outcome}</div>
            </div>
            <div className="p-date">{r.period}</div>
          </div>
        ))}
      </div>

      <div className="p-exp-full">
        {experienceEntries.map((e) => (
          <div className="p-expitem" key={e.id}>
            <div className="p-expitem-head">
              <span className="p-expitem-co">{e.company}</span>
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
