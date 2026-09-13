import React from 'react';
import { useRouter, Link } from '../router';
import { projects } from '../data/projects';
import { Github, ExternalLink, ArrowLeft, ArrowRight, Cpu, Maximize2, Layers } from 'lucide-react';

export default function ProjectDetailPage() {
  const { route } = useRouter();
  const slug = route.params?.slug;
  const project = route.data || projects.find((p) => p.slug === slug);

  const [activeGalleryIdx, setActiveGalleryIdx] = React.useState(0);
  const [lightboxImg, setLightboxImg] = React.useState(null);

  if (!project) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1>Project Not Found</h1>
        <p style={{ margin: '1rem 0 2rem', opacity: 0.8 }}>
          The requested system or case study could not be located.
        </p>
        <Link to="/projects" className="btn-action btn-action--primary">
          <ArrowLeft size={14} /> Back to All Projects
        </Link>
      </div>
    );
  }

  // Find index for next/prev navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const imageSrc = project.image || '/images/projects/default.svg';

  return (
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumbs__sep">/</span>
        <Link to="/projects">Projects</Link>
        <span className="breadcrumbs__sep">/</span>
        <span aria-current="page">{project.title}</span>
      </nav>

      <header className="page-header">
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <span className="t-card__badge mono" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
            {project.category}
          </span>
          <span className="mono" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Year: {project.year}
          </span>
          {project.tech_details?.host && (
            <span className="t-card__badge mono t-card__badge--amber" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
              Host: {project.tech_details.host}
            </span>
          )}
        </div>

        <h1>{project.title}</h1>
        <p className="page-header__sub">{project.description}</p>
      </header>

      {/* Metrics Row */}
      {project.key_metrics && project.key_metrics.length > 0 && (
        <div className="project-metrics-grid" role="region" aria-label="Key Project Metrics">
          {project.key_metrics.map((m) => (
            <div className="metric-card" key={m.label}>
              <div className="metric-card__value">{m.value}</div>
              <div className="metric-card__label">{m.label}</div>
              {m.note && <div className="metric-card__note">{m.note}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Main Grid: Architecture Deep Dive + Sidebar */}
      <div className="project-detail-grid">
        <div className="detail-main">
          {/* Visual Architecture & Production Interface Snapshot */}
          {project.image && (
            <figure className="project-preview-window">
              <div className="preview-window__bar">
                <div className="preview-window__dots">
                  <span className="dot dot--red" />
                  <span className="dot dot--amber" />
                  <span className="dot dot--green" />
                </div>
                <div className="preview-window__title mono">
                  {project.slug}.production - snapshot
                </div>
                <button
                  type="button"
                  className="preview-window__expand mono"
                  onClick={() => setLightboxImg({ src: imageSrc, caption: project.image_caption || `${project.title} production snapshot` })}
                  title="Expand preview image"
                  aria-label="Expand preview image"
                >
                  <Maximize2 size={13} />
                </button>
              </div>

              <div
                className="preview-window__canvas"
                onClick={() => setLightboxImg({ src: imageSrc, caption: project.image_caption || `${project.title} production snapshot` })}
                style={{ cursor: 'zoom-in' }}
              >
                <img
                  src={imageSrc}
                  alt={`${project.title} - Architecture overview and production interface snapshot`}
                  loading="eager"
                  decoding="async"
                  onError={(e) => { e.target.src = '/images/projects/default.svg'; }}
                />
              </div>

              {project.image_caption && (
                <figcaption className="preview-window__caption mono">
                  <Cpu size={14} style={{ flexShrink: 0 }} />
                  <span>{project.image_caption}</span>
                </figcaption>
              )}
            </figure>
          )}

          {/* Problem & Solution */}
          {project.problem && (
            <section className="detail-section">
              <h2>The Challenge &amp; Problem</h2>
              <p>{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section className="detail-section">
              <h2>Engineered Solution</h2>
              <p>{project.solution}</p>
            </section>
          )}

          {/* Architecture Summary */}
          {project.architecture_summary && (
            <section className="detail-section">
              <h2>System Architecture &amp; Data Flow</h2>
              <p>{project.architecture_summary}</p>
            </section>
          )}

          {/* Long Description */}
          {project.long_description && (
            <section className="detail-section">
              <h2>Technical Implementation Details</h2>
              <p>{project.long_description}</p>
            </section>
          )}

          {/* Interactive Screen Gallery (for Multi-Screen apps) */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="detail-section project-gallery-section">
              <h2>
                <Layers size={18} />
                Application Screens &amp; User Flow
              </h2>
              <p style={{ marginBottom: '1.25rem' }}>
                High-fidelity interface captures illustrating client workflows, state handling, and component hierarchy.
              </p>

              {/* Active Featured Screen */}
              {(() => {
                const activeItem = project.gallery[activeGalleryIdx] || project.gallery[0];
                const activeSrc = typeof activeItem === 'string' ? activeItem : activeItem.src;
                const activeLabel = typeof activeItem === 'string' ? `Screen ${activeGalleryIdx + 1}` : activeItem.label;

                return (
                  <div className="gallery-featured-card">
                    <div className="gallery-featured-header">
                      <span className="mono" style={{ fontSize: '0.85rem' }}>
                        Screen {activeGalleryIdx + 1} of {project.gallery.length}: <strong>{activeLabel}</strong>
                      </span>
                      <button
                        type="button"
                        className="btn-action mono"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        onClick={() => setLightboxImg({ src: activeSrc, caption: activeLabel })}
                      >
                        <Maximize2 size={12} /> Full Size
                      </button>
                    </div>

                    <div
                      className="gallery-featured-viewport"
                      onClick={() => setLightboxImg({ src: activeSrc, caption: activeLabel })}
                      style={{ cursor: 'zoom-in' }}
                    >
                      <img
                        src={activeSrc}
                        alt={`${project.title} - ${activeLabel}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Thumbnails grid */}
              <div className="gallery-thumbnails-strip" role="tablist" aria-label="Project screenshot thumbnails">
                {project.gallery.map((item, idx) => {
                  const src = typeof item === 'string' ? item : item.src;
                  const label = typeof item === 'string' ? `Screen ${idx + 1}` : item.label;
                  const isActive = idx === activeGalleryIdx;

                  return (
                    <button
                      key={src}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`gallery-thumb-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveGalleryIdx(idx)}
                    >
                      <img
                        src={src}
                        alt={`${project.title} thumbnail ${idx + 1}: ${label}`}
                        loading="lazy"
                      />
                      <span className="gallery-thumb-label mono">{label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <section className="detail-section">
              <h2>Key Engineering Highlights</h2>
              <ul className="highlights-list">
                {project.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Technical Specifications */}
          {project.tech_details && (
            <section className="detail-section">
              <h2>Technical Specifications</h2>
              <table className="tech-specs-table">
                <tbody>
                  {Object.entries(project.tech_details).map(([key, val]) => (
                    <tr key={key}>
                      <th>{key.replace(/_/g, ' ').toUpperCase()}</th>
                      <td>{String(val)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          {/* Action Links */}
          <div className="sidebar-box">
            <h3>Project Links</h3>
            <div className="action-links">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action btn-action--primary"
                  aria-label={`View GitHub repository for ${project.title}`}
                >
                  <Github size={16} /> View GitHub Repository
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action"
                  aria-label={`Launch live demo for ${project.title}`}
                >
                  <ExternalLink size={16} /> Launch Live Demo
                </a>
              )}
              {project.links?.external && (
                <a
                  href={project.links.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action"
                  aria-label={`Visit external website for ${project.title}`}
                >
                  <ExternalLink size={16} /> External Link
                </a>
              )}
              {!project.links?.github && !project.links?.demo && !project.links?.external && (
                <div style={{ fontSize: '0.85rem', opacity: 0.7, padding: '0.5rem 0' }}>
                  Proprietary / Private production infrastructure. Code samples available upon inquiry.
                </div>
              )}
            </div>
          </div>

          {/* Technology Tags */}
          <div className="sidebar-box">
            <h3>Technologies Used</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="mono"
                  style={{
                    fontSize: '0.78rem',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Contact Box */}
          <div className="sidebar-box">
            <h3>Architecture Inquiries</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1rem', lineHeight: 1.5 }}>
              Interested in discussing this system architecture, scalability constraints, or production deployment?
            </p>
            <a
              href="mailto:suresh.37x@gmail.com"
              className="btn-action"
              style={{ width: '100%', boxSizing: 'border-box' }}
            >
              Discuss Architecture
            </a>
          </div>
        </aside>
      </div>

      {/* Prev / Next Project Navigation */}
      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        {prevProject ? (
          <Link to={`/projects/${prevProject.slug}`} className="btn-action">
            <ArrowLeft size={14} /> Previous: {prevProject.title}
          </Link>
        ) : (
          <span />
        )}

        <Link to="/projects" className="btn-action">
          All Projects Catalog
        </Link>

        {nextProject ? (
          <Link to={`/projects/${nextProject.slug}`} className="btn-action">
            Next: {nextProject.title} <ArrowRight size={14} />
          </Link>
        ) : (
          <span />
        )}
      </footer>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setLightboxImg(null)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <span className="mono">{lightboxImg.caption}</span>
              <button
                type="button"
                className="lightbox-close mono"
                onClick={() => setLightboxImg(null)}
                aria-label="Close preview"
              >
                Close (Esc)
              </button>
            </div>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.caption || 'Expanded preview'}
              className="lightbox-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}
