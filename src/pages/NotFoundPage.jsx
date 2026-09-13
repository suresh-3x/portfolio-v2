import React from 'react';
import { Link } from '../router/Router';
import { ArrowLeft, Home, FolderGit2, Briefcase, FileCode, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
      <div className="mono" style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--t-accent, #1a56db)', marginBottom: '1rem' }}>
        404
      </div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ maxWidth: '500px', margin: '0 auto 2.5rem', opacity: 0.8, lineHeight: '1.6' }}>
        The system route you requested does not exist or has been relocated. Choose an operational destination below:
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto' }}>
        <Link to="/" className="btn-action btn-action--primary">
          <Home size={14} /> Home Terminal
        </Link>
        <Link to="/projects" className="btn-action">
          <FolderGit2 size={14} /> Projects Catalog
        </Link>
        <Link to="/experience" className="btn-action">
          <Briefcase size={14} /> Experience History
        </Link>
        <Link to="/stack" className="btn-action">
          <FileCode size={14} /> Tech Stack
        </Link>
        <Link to="/notes" className="btn-action">
          <BookOpen size={14} /> Engineering Notes
        </Link>
      </div>
    </div>
  );
}
