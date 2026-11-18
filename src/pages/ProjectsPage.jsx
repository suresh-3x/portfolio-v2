import React, { useState, useMemo } from 'react';
import { projects, projectCategories } from '../data/projects';
import { Link } from '../router/Router';

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
        <h1>Things I've built and run.</h1>
        <p className="page-header__sub">
          Production systems, AI pipelines and open source work. Each one has a case study.
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

        {/* phones: one native dropdown instead of nine wrapping chips */}
        <select
          className="filter-select search-input mono"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Project category"
        >
          {projectCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

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

      <div className="pj-grid">
        {filteredProjects.map((p, i) => {
          const badge = badgeFor(p);
          const featured = i === 0 && selectedCategory === 'All' && !searchQuery;
          return (
            <Link
              to={`/projects/${p.slug}`}
              className={`pj-card${featured ? ' pj-card--featured' : ''}`}
              key={p.slug || p.title}
            >
              <div className="pj-card__img">
                <img
                  src={p.image || '/images/projects/default.svg'}
                  alt={`${p.title} screenshot`}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  // very wide shots would lose their sides under cover-crop; show them whole
                  onLoad={(e) => { const im = e.currentTarget; if (im.naturalWidth / im.naturalHeight > 2) im.classList.add('is-wide'); }}
                  onError={(e) => { e.currentTarget.src = '/images/projects/default.svg'; }}
                />
              </div>
              <div className="pj-card__body">
                <div className="pj-card__meta mono">
                  <span>{p.category}</span>
                  <span className={`pj-card__badge${badge.kind === 'ok' ? ' is-ok' : ''}`}>{badge.text}</span>
                </div>
                <h2 className="pj-card__title">{p.title}</h2>
                <p className="pj-card__desc">{p.description}</p>
                <div className="pj-card__tags mono">
                  {p.tags.slice(0, featured ? 6 : 4).map((t) => <span key={t}>{t}</span>)}
                </div>
                <span className="pj-card__cta mono">View case study &rarr;</span>
              </div>
            </Link>
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
