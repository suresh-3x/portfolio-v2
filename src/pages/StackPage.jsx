import React, { useState } from 'react';
import { Link } from '../router/Router';
import { primarySkillsets } from '../data/skills';
import { Server, Brain, Layers, Cloud, Code, Layout, Database, Shield, Workflow, ArrowRight } from 'lucide-react';

const iconMap = {
  server: Server,
  brain: Brain,
  layers: Layers,
  cloud: Cloud,
  code: Code,
  layout: Layout,
  database: Database,
  shield: Shield,
  workflow: Workflow,
};

export default function StackPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const displayedSkillsets = primarySkillsets.filter((s) => {
    return activeCategory === 'All' || s.title.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumbs__sep">/</span>
        <span aria-current="page">Stack</span>
      </nav>

      <header className="page-header">
        <h1>Technical Stack &amp; Architectural Skills</h1>
        <p className="page-header__sub">
          Comprehensive inventory of production technologies, frameworks, storage engines, and engineering practices battle-tested across distributed systems and agentic AI platforms.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="filter-bar" style={{ marginBottom: '2rem' }}>
        <div className="filter-categories" role="tablist" aria-label="Stack categories">
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'All' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('All')}
          >
            All Disciplines
          </button>
          {primarySkillsets.map((s) => (
            <button
              key={s.title}
              type="button"
              className={`filter-btn ${activeCategory === s.title ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(s.title)}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Skillset Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {displayedSkillsets.map((skillset) => {
          const IconComp = iconMap[skillset.icon] || Server;
          return (
            <div
              key={skillset.title}
              className="sidebar-box"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.75rem' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ padding: '8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', display: 'flex' }}>
                    <IconComp size={18} />
                  </div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>
                    {skillset.title}
                  </h2>
                </div>

                <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '1.25rem', lineHeight: '1.5' }}>
                  {skillset.summary}
                </p>

                {skillset.highlights && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {skillset.highlights.map((h) => (
                      <span
                        key={h}
                        className="t-card__badge mono"
                        style={{ fontSize: '0.72rem', padding: '2px 6px' }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: '0.78rem', opacity: 0.7, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Core Tools &amp; Technologies
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {skillset.skills.map((tool) => (
                      <span
                        key={tool}
                        className="mono"
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)'
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-Link Footer */}
      <div style={{ marginTop: '4rem', padding: '2rem', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>See this stack in production</h2>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0 }}>
            Read technical case studies showing how FastAPI, Redis, RabbitMQ, and Google ADK are composed.
          </p>
        </div>
        <Link to="/projects" className="btn-action btn-action--primary">
          View Projects Architecture <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
