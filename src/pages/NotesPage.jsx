import React from 'react';
import { Link } from '../router/Router';
import { notes } from '../data/notes';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function NotesPage() {
  return (
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumbs__sep">/</span>
        <span aria-current="page">Notes</span>
      </nav>

      <header className="page-header">
        <h1>Engineering Notes &amp; Systems Architecture</h1>
        <p className="page-header__sub">
          Practical reflections on distributed systems design, fault-tolerant queues, high-throughput payment architectures, and agentic AI pipelines.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {notes.map((note) => (
          <article
            key={note.slug}
            className="sidebar-box"
            style={{ padding: '2rem', borderRadius: '8px', transition: 'border-color 0.15s ease' }}
          >
            <div className="note-meta" style={{ marginBottom: '0.75rem' }}>
              <span className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={13} /> {note.date}
              </span>
              <span className="mono" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={13} /> {note.readingTime || '5 min read'}
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="t-card__badge mono"
                    style={{ fontSize: '0.72rem', padding: '1px 6px' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 700, margin: '0.5rem 0 1rem' }}>
              <Link to={`/notes/${note.slug}`}>
                {note.title}
              </Link>
            </h2>

            <p style={{ fontSize: '1rem', opacity: 0.85, lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {note.abstract}
            </p>

            <div>
              <Link
                to={`/notes/${note.slug}`}
                className="btn-action btn-action--primary"
                style={{ fontSize: '0.85rem' }}
              >
                Read Full Engineering Note <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
