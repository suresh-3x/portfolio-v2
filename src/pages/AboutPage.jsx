import React from 'react';
import { Link } from '../router/Router';
import { profile, summary, education, atsKeywords } from '../data/profile';
import { Mail, Github, Linkedin, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumbs__sep">/</span>
        <span aria-current="page">About</span>
      </nav>

      <header className="page-header">
        <h1>About Suresh Bhandari</h1>
        <p className="page-header__sub">
          {profile.title} based in {profile.location} ({profile.relocation}).
        </p>
      </header>

      <div className="project-detail-grid">
        <div className="detail-main">
          {/* Main Narrative */}
          <section className="detail-section">
            <h2>The Systems Journey</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
              {summary}
            </p>
          </section>

          {/* Core Philosophy */}
          <section className="detail-section">
            <h2>Core Engineering Principles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
              <div className="sidebar-box" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#5bd672" /> The Queue Is the Spine
                </h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0, lineHeight: '1.5' }}>
                  External LLM APIs and remote microservices will fail or throttle. Decouple ingestion, orchestration, and execution through durable disk-backed message queues.
                </p>
              </div>

              <div className="sidebar-box" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#5bd672" /> Idempotency First
                </h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0, lineHeight: '1.5' }}>
                  Networks drop connections; clients retry. In payments and state machines, every critical mutation must be strictly idempotent to guarantee zero duplicate financial side-effects.
                </p>
              </div>

              <div className="sidebar-box" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#5bd672" /> Isolated Failure Domains
                </h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0, lineHeight: '1.5' }}>
                  A model provider outage or cache eviction should gracefully degrade an isolated capability rather than bringing down the entire platform.
                </p>
              </div>

              <div className="sidebar-box" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#5bd672" /> Unglamorous Reliability
                </h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0, lineHeight: '1.5' }}>
                  Sustainable systems are won in clean database indexing, predictable thread pools, observable tracing, and thorough failure testing under realistic load.
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="detail-section">
            <h2>Academic Foundation</h2>
            <div className="sidebar-box" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{education.degree}</h3>
                  <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>{education.universityFull} ({education.university})</div>
                </div>
                <div className="mono" style={{ fontSize: '0.85rem' }}>
                  {education.period}
                </div>
              </div>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                <span className="t-card__badge mono" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                  {education.gpa}
                </span>
                <span style={{ opacity: 0.8 }}>{education.note}</span>
                <span style={{ opacity: 0.8 }}>{education.location}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          <div className="sidebar-box">
            <h3>Get In Touch</h3>
            <div className="action-links">
              <a href={`mailto:${profile.email}`} className="btn-action btn-action--primary">
                <Mail size={15} /> {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-action">
                <Linkedin size={15} /> LinkedIn Profile
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-action">
                <Github size={15} /> GitHub (@suresh-3x)
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-action">
                <FileText size={15} /> Download Resume
              </a>
            </div>
          </div>

          <div className="sidebar-box">
            <h3>Core Keywords &amp; Competencies</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {atsKeywords.map((kw) => (
                <span
                  key={kw}
                  className="mono"
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="sidebar-box">
            <h3>Explore Systems</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1rem' }}>
              See live architectural implementations of durable queues, RAG pipelines, and self-hosted tools.
            </p>
            <Link to="/projects" className="btn-action" style={{ width: '100%', boxSizing: 'border-box' }}>
              Browse Projects <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
