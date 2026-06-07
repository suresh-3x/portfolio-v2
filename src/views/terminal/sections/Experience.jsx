import { experienceEntries } from '../../../data/experience';

// Merge the two Stride Ahead rows (shared groupKey) into one timeline row.
function buildRows() {
  const rows = [];
  const seenGroups = new Set();
  for (const e of experienceEntries) {
    if (e.groupKey === 'strideahead') {
      if (seenGroups.has('strideahead')) continue;
      seenGroups.add('strideahead');
      rows.push({
        id: 'strideahead',
        company: 'Stride Ahead',
        role: 'Tech Lead / Senior SDE',
        outcome: 'founding backend, releases 4h to under 15m',
        period: 'Mar 2021 to Aug 2025',
      });
      continue;
    }
    let outcome = '';
    if (e.company === 'T-Systems')
      outcome = 'agentic AI platform solo, 10+ prod agents';
    else if (e.company === 'Gridlogic')
      outcome = 'wallet + game engine, 5M+ MAU / 10K rps';
    else if (e.company === 'BizAssist')
      outcome = 'four production web apps, zero P0 in 12 months';
    rows.push({
      id: e.id,
      company: e.company,
      role: e.role,
      outcome,
      period: e.period,
    });
  }
  return rows;
}

// Full description list: merge Stride entries' bullets under one heading.
function buildDetail() {
  const out = [];
  const seen = new Set();
  for (const e of experienceEntries) {
    if (e.groupKey === 'strideahead') {
      if (seen.has('strideahead')) {
        // append later bullets to the already-pushed group
        const grp = out.find((o) => o.id === 'strideahead');
        if (grp) grp.description = grp.description.concat(e.description);
        continue;
      }
      seen.add('strideahead');
      out.push({
        id: 'strideahead',
        company: 'Stride Ahead',
        role: 'Tech Lead, then Senior SDE',
        period: 'Mar 2021 to Aug 2025',
        description: [...e.description],
      });
      continue;
    }
    out.push({
      id: e.id,
      company: e.company,
      role: e.role,
      period: e.period,
      description: e.description,
    });
  }
  return out;
}

export default function Experience() {
  const rows = buildRows();
  const detail = buildDetail();

  return (
    <section id="experience" className="t-exp">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">experience</span>
        <span className="t-sec-h__count mono">
          {String(rows.length).padStart(2, '0')} roles
        </span>
      </div>

      <div className="t-table">
        <div className="t-table__row t-table__row--head mono">
          <span className="t-table__co">COMPANY</span>
          <span className="t-table__rl">ROLE · OUTCOME</span>
          <span className="t-table__dt">DATES</span>
        </div>
        {rows.map((r) => (
          <div className="t-table__row mono" key={r.id}>
            <span className="t-table__co">{r.company}</span>
            <span className="t-table__rl">
              {r.role}
              {r.outcome ? ', ' + r.outcome : ''}
            </span>
            <span className="t-table__dt">{r.period}</span>
          </div>
        ))}
      </div>

      <div className="t-exp-detail">
        {detail.map((e) => (
          <div className="t-exp-role" key={e.id}>
            <div className="t-exp-role__head">
              <span className="t-exp-role__co mono">{e.company}</span>
              <span className="t-exp-role__role mono">{e.role}</span>
              <span className="t-exp-role__dt mono">{e.period}</span>
            </div>
            <ul className="t-exp-role__list">
              {e.description.map((d, i) => (
                <li key={i}>
                  <span className="t-exp-role__bullet mono" aria-hidden="true">
                    &rsaquo;
                  </span>
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
