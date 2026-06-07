import { notes } from '../../../data/notes';

// Tally real tag counts across the notes array.
function tallyTags(items) {
  const counts = {};
  for (const n of items) {
    for (const t of n.tags) {
      counts[t] = (counts[t] || 0) + 1;
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

const focus = tallyTags(notes);

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
          </article>
        ))}
      </div>

      <div className="p-focus">
        {focus.map(([tag, count]) => (
          <span className="p-tag" key={tag}>
            {tag} <span className="p-tag-x">x{count}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
