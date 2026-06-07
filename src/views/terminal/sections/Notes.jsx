import { notes } from '../../../data/notes';

// Compute REAL focus-tag counts by tallying tags across the notes array.
function tagCounts() {
  const counts = {};
  for (const n of notes) {
    for (const t of n.tags) counts[t] = (counts[t] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

export default function Notes() {
  const focus = tagCounts();

  return (
    <section id="notes" className="t-notes">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">notes</span>
        <span className="t-sec-h__count mono">~/notes</span>
      </div>

      <div className="t-focus mono">
        <span className="t-focus__k">focus:</span>
        {focus.map(([tag, count], i) => (
          <span className="t-focus__item" key={tag}>
            <span className="t-focus__tag">{tag}</span>
            <span className="t-focus__n">x{count}</span>
            {i < focus.length - 1 && <span className="t-focus__d">&middot;</span>}
          </span>
        ))}
      </div>

      <div className="t-note-list">
        {notes.map((n) => (
          <article className="t-note" key={n.slug}>
            <div className="t-note__head">
              <h3 className="t-note__title mono">{n.title}</h3>
              <span className="t-note__date mono">{n.date}</span>
            </div>
            <p className="t-note__abstract">{n.abstract}</p>
            <div className="t-note__tags">
              {n.tags.map((t) => (
                <span className="mono" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
