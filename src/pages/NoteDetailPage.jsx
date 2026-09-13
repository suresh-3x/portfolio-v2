import React from 'react';
import { useRouter, Link } from '../router';
import { notes } from '../data/notes';
import { profile } from '../data/profile';
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function NoteDetailPage() {
  const { route } = useRouter();
  const slug = route.params?.slug;
  const note = route.data || notes.find((n) => n.slug === slug);

  if (!note) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1>Note Not Found</h1>
        <p style={{ margin: '1rem 0 2rem', opacity: 0.8 }}>
          The requested engineering note could not be located.
        </p>
        <Link to="/notes" className="btn-action btn-action--primary">
          <ArrowLeft size={14} /> Back to All Notes
        </Link>
      </div>
    );
  }

  // Prev / next note navigation
  const currentIndex = notes.findIndex((n) => n.slug === note.slug);
  const prevNote = currentIndex > 0 ? notes[currentIndex - 1] : null;
  const nextNote = currentIndex < notes.length - 1 ? notes[currentIndex + 1] : null;

  return (
    <div className="page-container note-article">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumbs__sep">/</span>
        <Link to="/notes">Notes</Link>
        <span className="breadcrumbs__sep">/</span>
        <span aria-current="page">{note.title}</span>
      </nav>

      <header className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div className="note-meta">
          <span className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={13} /> {note.date}
          </span>
          <span className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={13} /> {note.readingTime || '5 min read'}
          </span>
          <span>By {profile.name}</span>
        </div>

        <h1>{note.title}</h1>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="t-card__badge mono"
              style={{ fontSize: '0.75rem', padding: '2px 8px' }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Abstract Callout */}
      <div
        className="sidebar-box"
        style={{
          padding: '1.5rem',
          margin: '2rem 0',
          fontStyle: 'italic',
          lineHeight: '1.7',
          borderLeft: '3px solid var(--t-accent, #1a56db)'
        }}
      >
        &ldquo;{note.abstract}&rdquo;
      </div>

      {/* Structured Content Sections */}
      <article className="note-content">
        {note.sections && note.sections.map((section, sIdx) => (
          <section key={sIdx} style={{ marginBottom: '2.5rem' }}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </section>
        ))}

        {/* Key Takeaways */}
        {note.takeaways && note.takeaways.length > 0 && (
          <div className="note-takeaways">
            <h3>Key Architecture Takeaways</h3>
            <ul className="highlights-list">
              {note.takeaways.map((takeaway, tIdx) => (
                <li key={tIdx}>{takeaway}</li>
              ))}
            </ul>
          </div>
        )}
      </article>

      {/* Prev / Next Note Footer */}
      <footer
        style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        {prevNote ? (
          <Link to={`/notes/${prevNote.slug}`} className="btn-action">
            <ArrowLeft size={14} /> Previous: {prevNote.title}
          </Link>
        ) : (
          <span />
        )}

        <Link to="/notes" className="btn-action">
          All Notes
        </Link>

        {nextNote ? (
          <Link to={`/notes/${nextNote.slug}`} className="btn-action">
            Next: {nextNote.title} <ArrowRight size={14} />
          </Link>
        ) : (
          <span />
        )}
      </footer>
    </div>
  );
}
