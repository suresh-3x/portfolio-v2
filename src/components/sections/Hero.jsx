import React from 'react';
import { motion as Motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Cloud,
  Code,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Network,
  Server,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react';
import { impactMetrics, profile } from '../../data/profile';

const Hero = ({ highlightColor }) => {
  const systemModules = [
    {
      title: 'AGENTIC AI',
      icon: <BrainCircuit size={22} strokeWidth={1.5} />,
      tags: ['Google ADK', 'RAG', 'Python'],
      spec: '01 // AI',
      accent: 'var(--accent-primary)',
    },
    {
      title: 'DISTRIBUTED APIs',
      icon: <Server size={22} strokeWidth={1.5} />,
      tags: ['FastAPI', 'Node.js', 'gRPC'],
      spec: '02 // SDE',
      accent: 'var(--accent-secondary)',
    },
    {
      title: 'DATA + EVENTS',
      icon: <Database size={22} strokeWidth={1.5} />,
      tags: ['Postgres', 'Redis', 'RabbitMQ'],
      spec: '03 // SCALE',
      accent: 'var(--accent-tertiary)',
    },
    {
      title: 'CLOUD DELIVERY',
      icon: <Cloud size={22} strokeWidth={1.5} />,
      tags: ['AWS', 'Docker', 'CI/CD'],
      spec: '04 // OPS',
      accent: 'var(--accent-primary)',
    },
  ];

  const tagIcon = {
    'Google ADK': <Bot size={10} />,
    RAG: <Workflow size={10} />,
    Python: <Terminal size={10} />,
    FastAPI: <Zap size={10} />,
    'Node.js': <Code size={10} />,
    gRPC: <Network size={10} />,
    Postgres: <Database size={10} />,
    Redis: <Gauge size={10} />,
    RabbitMQ: <GitBranch size={10} />,
    AWS: <Cloud size={10} />,
    Docker: <Server size={10} />,
    'CI/CD': <Workflow size={10} />,
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        <Motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="system-status">
            <span className="status-dot"></span>
            <span className="status-text">Open to senior backend / AI roles</span>
          </div>

          <p className="hero-role">{profile.title}</p>

          <h1 className="hero-title">
            {profile.name.split(' ')[0]}{' '}
            <span className="highlight" style={{ color: highlightColor }}>
              {profile.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <h2 className="hero-positioning">
            I build production backends and AI agents for high-scale products.
          </h2>

          <p className="hero-copy">
            {profile.tagline}
          </p>

          <div className="hero-proof-grid" aria-label="Career highlights">
            {impactMetrics.map((metric) => (
              <div className="proof-card" key={metric.label}>
                <span className="proof-value">{metric.value}</span>
                <span className="proof-label">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="action-row">
            <a href={profile.projectsHref} className="primary-btn">
              View Engineering Work <ArrowRight size={18} />
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="secondary-btn">
              Resume <FileText size={18} />
            </a>
          </div>
        </Motion.div>

        <Motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="system-blade-container">
            <div className="system-blade">
              <div className="blade-header">
                <div className="blade-id">ENGINEERING_SYSTEM // portfolio</div>
                <div className="blade-status">
                  <span className="status-dot pulsing"></span>
                  PRODUCTION_READY
                </div>
              </div>

              {systemModules.map((module) => (
                <div className="blade-module" style={{ '--accent': module.accent }} key={module.title}>
                  <div className="module-indicator"></div>
                  <div className="module-icon-container">
                    {module.icon}
                  </div>
                  <div className="module-content">
                    <div className="module-head">
                      <span className="module-title">{module.title}</span>
                    </div>
                    <div className="module-tags">
                      {module.tags.map((tag) => (
                        <span key={tag}>
                          {tagIcon[tag]}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="module-specs">{module.spec}</div>
                </div>
              ))}

              <div className="blade-footer">
                <div className="logic-spine"></div>
                <div className="logic-values">
                  <span>IMPACT: 5M+ MAU</span>
                  <span>UPDATED: {profile.lastUpdated.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="blade-aura"></div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;
