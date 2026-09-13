import React, { useState, useMemo } from 'react';
import { projects, projectCategories } from '../data/projects';
import { Link } from '../router/Router';
import { ExternalLink, Github, Search, ArrowRight } from 'lucide-react';

function badgeFor(p) {
  if (p.tech_details && p.tech_details.host === 'Raspberry Pi 4B') {
    return { text: 'live · runs on Pi 4B', kind: 'ok' };
  }
  const hasLinks = p.links && Object.keys(p.links).length > 0;
  if (!hasLinks) return { text: 'private', kind: 'amber' };
  if (p.category && p.category.startsWith('Open Source')) {
    return { text: 'open source', kind: 'ok' };
  }
  return { text: String(p.year), kind: 'amber' };
}

function edgeFor(p) {
  const td = p.tech_details;
  if (td) {
    if (td.architecture) return td.architecture;
    if (td.pipeline) return td.pipeline;
    if (td.integrations) return 'integrations: ' + td.integrations;
    if (td.backend) return td.backend;
  }
  return p.category;
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.tech_details && JSON.stringify(p.tech_details).toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumbs__sep">/</span>
        <span aria-current="page">Projects</span>
      </nav>

      <header className="page-header">
        <h1>Engineering Projects &amp; Distributed Systems</h1>
        <p className="page-header__sub">
          Production systems, agentic AI pipelines, open source contributions, and high-scale backends engineered for resilience and performance.
        </p>
      </header>

      <div className="filter-bar">
        <div className="filter-categories" role="tablist" aria-label="Project Categories">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-input-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="Search stack, tech, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search projects"
          />
        </div>
      </div>

      <div className="t-cards" style={{ marginTop: '1.5rem' }}>
        {filteredProjects.map((p, i) => {
          const badge = badgeFor(p);
          const id = 'sys/' + String(i + 1).padStart(2, '0');
          const imageSrc = p.image || '/images/projects/default.svg';
          const primaryExternal = p.links?.github || p.links?.demo || p.links?.external;

          return (
            <article className="t-card" key={p.slug || p.title}>
              {p.image && (
                <div className="t-card__img">
                  <img
                    src={imageSrc}
                    alt={`${p.title} - ${p.category || 'Architecture preview'}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.src = '/images/projects/default.svg'; }}
                  />
                </div>
              )}

              <div className="t-card__top">
                <span className="t-card__id mono">{id}</span>
                <span
                  className={
                    't-card__badge mono' +
                    (badge.kind === 'amber' ? ' t-card__badge--amber' : '')
                  }
                >
                  {badge.text}
                </span>
              </div>

              <h2 className="t-card__title mono" style={{ fontSize: '1.15rem', margin: '0.5rem 0' }}>
                <Link to={`/projects/${p.slug}`}>
                  {p.title}
                </Link>
              </h2>

              <p className="t-card__desc">{p.description}</p>

              <div className="t-card__edge mono">
                <span className="t-card__arrow">&rarr;</span>
                <b>{edgeFor(p)}</b>
              </div>

              <div className="t-card__stack">
                {p.tags.slice(0, 6).map((t) => (
                  <span className="mono" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="btn-action btn-action--primary"
                  style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
                >
                  Deep Dive &amp; Specs <ArrowRight size={13} />
                </Link>

                {primaryExternal && (
                  <a
                    href={primaryExternal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-action"
                    style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
                    aria-label={`External link for ${p.title}`}
                  >
                    {p.links?.github ? <Github size={13} /> : <ExternalLink size={13} />}
                    <span>{p.links?.github ? 'Repository' : 'Live Preview'}</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{ padding: '3rem 0', textAlign: 'center', opacity: 0.7 }}>
          <p>No projects match your filter query. Try resetting categories or search terms.</p>
        </div>
      )}
    </div>
  );
}
