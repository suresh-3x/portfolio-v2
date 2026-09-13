import { notes } from '../../../data/notes';
import { Link } from '../../../router/Router';

export default function Notes() {
  return (
    <section id="notes" className="t-notes">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">
          <span className="t-sec-h__num">05</span>notes
        </span>
        <span className="t-sec-h__count mono">~/notes</span>
      </div>

      <div className="t-note-list">
        {notes.map((n) => (
          <article className="t-note" key={n.slug}>
            <div className="t-note__head">
              <h3 className="t-note__title mono">
                <Link to={`/notes/${n.slug}`}>
                  {n.title}
                </Link>
              </h3>
              <span className="t-note__date mono">{n.date}</span>
            </div>
            <p className="t-note__abstract">{n.abstract}</p>
            <div className="t-note__tags">
              {n.tags.map((t) => (
                <span className="mono" key={t}>
                  #{t}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <Link to={`/notes/${n.slug}`} className="mono" style={{ fontSize: '0.75rem', color: 'var(--t-accent)' }}>
                read note &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/notes" className="btn-action">
          View All Engineering Notes &rarr;
        </Link>
      </div>
    </section>
  );
}
