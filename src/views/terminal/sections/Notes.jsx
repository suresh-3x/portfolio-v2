import { notes } from '../../../data/notes';
import { Link } from '../../../router/Router';
import SectionHead from '../SectionHead';

const latest = [...notes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

export default function Notes() {
  return (
    <section id="notes" className="t-notes">
      <SectionHead title="notes" headline="Notes from production." to="/notes" more="all notes" />
      <ul className="xp-grid note-cards">
        {latest.map((n) => (
          <li key={n.slug} className="xp-card note-card">
            <Link to={`/notes/${n.slug}`} className="note-card__link">
              <span className="xp-card__co mono">{n.date} · {n.readingTime}</span>
              <strong className="note-card__title">{n.title}</strong>
              <span className="xp-card__text note-card__abstract">{n.abstract}</span>
              <span className="note-card__cta mono">Read note &rarr;</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
