import { notes } from '../../../data/notes';

export default function Notes() {
  return (
    <section id="notes" className="p-section p-notes-section">
      <div className="p-h">
        <h2>Writing / Notes</h2>
        <span className="p-h-note">building in the open</span>
      </div>

      <div className="p-notes">
        {notes.map((n) => (
          <article className="p-note" key={n.slug}>
            <div className="p-note-top">
              <h3 className="p-note-title">{n.title}</h3>
              <span className="p-note-date">{n.date}</span>
            </div>
            <p className="p-note-abstract">{n.abstract}</p>
            <div className="p-note-tags">
              {n.tags.map((t) => (
                <span className="p-tag" key={t}>
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
