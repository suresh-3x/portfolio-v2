import { notes } from '../../../data/notes';
import { Link } from '../../../router/Router';
import SectionHead from '../SectionHead';

const latest = [...notes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

export default function Notes() {
  return (
    <section id="notes" className="t-notes">
      <SectionHead title="notes" to="/notes" more="all notes" />
      <ul className="t-notes__list">
        {latest.map((n) => (
          <li key={n.slug}>
            <Link to={`/notes/${n.slug}`} className="t-notes__item">
              <span className="t-notes__title">{n.title}</span>
              <span className="t-notes__date mono">{n.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
