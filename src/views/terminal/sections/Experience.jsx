import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { experienceEntries, results } from '../../../data/experience';
import { profile } from '../../../data/profile';

// Newest first.
const rows = [...experienceEntries].sort(
  (a, b) => b.year * 12 + b.month - (a.year * 12 + a.month)
);

const yearsOf = (e) => {
  const end = e.end ? e.end.year : 'now';
  return end === e.year ? `${e.year}` : `${e.year} to ${end}`;
};

// Timeline maths: months since the first start date.
const mIdx = (y, m) => y * 12 + (m - 1);
const now = new Date();
const T0 = Math.min(...experienceEntries.map((e) => e.year)) * 12; // Jan of first year
const T1 = mIdx(now.getFullYear(), now.getMonth() + 1) + 1;
const pct = (i) => `${((i - T0) / (T1 - T0)) * 100}%`;
const span = (e) => {
  const s = mIdx(e.year, e.month);
  const end = e.end ? mIdx(e.end.year, e.end.month) : T1;
  return { left: pct(s), width: `${((end - s) / (T1 - T0)) * 100}%` };
};
const years = [];
for (let y = T0 / 12; y <= now.getFullYear(); y++) years.push(y);

const VIEW_KEY = 'expView';
function readView() {
  try { return localStorage.getItem(VIEW_KEY) || 'company'; } catch { return 'company'; }
}

function ByCompany() {
  const [active, setActive] = useState(rows[0].id);
  const e = rows.find((r) => r.id === active);
  return (
    <div className="xp-tabs">
      <div className="xp-tabs__list" role="tablist" aria-label="Companies">
        {rows.map((r) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            id={`xp-tab-${r.id}`}
            aria-selected={r.id === active}
            aria-controls="xp-panel"
            className="xp-tab"
            onClick={() => setActive(r.id)}
          >
            <span className="xp-tab__co">
              {r.company}
              {!r.end && <span className="xp-tab__live" aria-label="current" />}
            </span>
            <span className="xp-tab__sub mono">
              {yearsOf(r)} · {r.tab}
            </span>
          </button>
        ))}
      </div>

      <div className="xp-panel" role="tabpanel" id="xp-panel" aria-labelledby={`xp-tab-${e.id}`}>
        <h3 className="xp-panel__role">
          {e.role} <span className="xp-panel__at">@ {e.company}</span>
        </h3>
        <p className="xp-panel__meta mono">
          {e.period.replace('Present', 'now')} · {e.meta}
        </p>
        <p className="xp-panel__intro">{e.intro}</p>
        <ul className="xp-panel__list">
          {e.points.map(([k, v]) => (
            <li key={k}>
              <span className="xp-bullet" aria-hidden="true">&#9656;</span>
              <span><strong>{k}</strong> {v}</span>
            </li>
          ))}
        </ul>
        <ul className="xp-tags" aria-label="Stack">
          {e.tags.map((t) => <li key={t} className="mono">{t}</li>)}
        </ul>
      </div>
    </div>
  );
}

function ByResults() {
  return (
    <>
      <div className="xp-tl" aria-label="Career timeline">
        <p className="xp-tl__cap mono">{years[0]} to now</p>
        <div className="xp-tl__years mono" aria-hidden="true">
          {years.map((y) => <span key={y} style={{ left: pct(y * 12) }}>{y}</span>)}
        </div>
        <div className="xp-tl__lane">
          {experienceEntries.map((e) => (
            <span key={e.id} className={`xp-tl__bar${e.end ? '' : ' is-now'}`} style={span(e)} title={`${e.company} · ${e.period}`}>
              {e.bar}
            </span>
          ))}
        </div>
      </div>

      <ul className="xp-grid">
        {results.map((r) => (
          <li key={r.big} className={`xp-card${r.tone ? ` xp-card--${r.tone}` : ''}`}>
            <span className="xp-card__co mono">{r.co}</span>
            <strong className="xp-card__big">{r.big}</strong>
            <span className="xp-card__text">{r.text}</span>
          </li>
        ))}
      </ul>

      <ul className="xp-rows">
        {rows.map((e) => (
          <li key={e.id}>
            <strong>{e.company}</strong>
            <span className="mono xp-rows__role">{e.role.replace(/\s*\(.*\)/, '')} · {e.tab}</span>
            <span className="mono xp-rows__dt">{e.period.replace('Present', 'now')}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Experience() {
  const [view, setView] = useState(readView);
  const pick = (v) => {
    setView(v);
    try { localStorage.setItem(VIEW_KEY, v); } catch { /* private mode */ }
  };

  return (
    <section id="experience" className="xp">
      <div className="xp-head">
        <div>
          <p className="xp-head__label mono">experience</p>
          <h2 className="xp-head__title">
            {view === 'company' ? 'Three companies, one habit: owning production.' : 'Results first. Résumé second.'}
          </h2>
        </div>
        <div className="xp-head__actions">
          <div className="xp-toggle mono" role="group" aria-label="Experience view">
            <button type="button" aria-pressed={view === 'company'} onClick={() => pick('company')}>by company</button>
            <button type="button" aria-pressed={view === 'results'} onClick={() => pick('results')}>by results</button>
          </div>
          <a className="xp-head__pdf mono" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            resume.pdf <ArrowDown size={13} aria-hidden="true" />
          </a>
        </div>
      </div>

      {view === 'company' ? <ByCompany /> : <ByResults />}
    </section>
  );
}
