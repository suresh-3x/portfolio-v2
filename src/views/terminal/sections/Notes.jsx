import { notes } from '../../../data/notes';

export default function Notes() {
  return (
    <section id="notes" className="t-notes">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">notes</span>
        <span className="t-sec-h__count mono">~/notes</span>
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
