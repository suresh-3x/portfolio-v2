import React from 'react';
import { Link } from '../router/Router';
import { experienceEntries } from '../data/experience';
import { impactMetrics, profile } from '../data/profile';
import { Briefcase, Calendar, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumbs__sep">/</span>
        <span aria-current="page">Experience</span>
      </nav>

      <header className="page-header">
        <h1>Engineering Experience &amp; Career History</h1>
        <p className="page-header__sub">
          5+ years building, scaling, and stabilizing distributed systems, high-throughput payment pipelines, and agentic AI architectures across enterprise and startup environments.
        </p>
      </header>

      {/* Impact Metrics Banner */}
      <div className="project-metrics-grid" role="region" aria-label="Career Impact Metrics" style={{ margin: '0 0 3rem' }}>
        {impactMetrics.map((m) => (
          <div className="metric-card" key={m.label}>
            <div className="metric-card__value">{m.value}</div>
            <div className="metric-card__label">{m.label}</div>
            <div className="metric-card__note">{m.keyword}</div>
          </div>
        ))}
      </div>

      {/* Experience Timeline */}
      <div className="experience-list" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {experienceEntries.map((exp) => (
          <article
            key={exp.id}
            className="sidebar-box"
            style={{ padding: '2rem', borderRadius: '8px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span className="t-card__badge mono" style={{ fontSize: '0.75rem', padding: '2px 8px', marginBottom: '0.5rem', display: 'inline-block' }}>
                  {exp.type}
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0.25rem 0' }}>
                  {exp.role} <span style={{ opacity: 0.6 }}>at</span> {exp.company}
                </h2>
                {exp.employer && (
                  <div style={{ fontSize: '0.85rem', opacity: 0.75, marginTop: '0.25rem' }}>
                    Employed via {exp.employer}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                <div className="mono" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={13} /> {exp.period}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={13} /> {exp.location}
                </div>
              </div>
            </div>

            <div style={{ margin: '1.5rem 0' }}>
              <ul className="highlights-list">
                {exp.description.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: '0.85rem' }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                {exp.companyLine}
              </div>
              {exp.website && (
                <a
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                >
                  <ExternalLink size={12} /> {exp.company}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Looking for detailed architecture resumes or references?</h2>
        <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
          Download the latest Senior Backend &amp; AI Engineer resume PDF or reach out directly to discuss technical fit.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action btn-action--primary"
          >
            Download Resume (PDF)
          </a>
          <Link to="/projects" className="btn-action">
            Explore Built Systems <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
