import React from 'react';
import { motion } from 'framer-motion';
import {
  Github, ExternalLink, Folder, Zap, Wind, Server, Database, Triangle,
  Smartphone, Layers, Code, Palette, Terminal, Cpu, Globe, Box, Layout,
  Zap as Lightning, TrendingUp
} from 'lucide-react';
import Card from '../ui/Card';
import { projects } from '../../data/projects';
import { useTheme } from '../../context/ThemeContext';

const Projects = () => {
  const { theme } = useTheme();
  const isMonochrome = theme === 'mono-light' || theme === 'mono-dark';
  const borderMultiplier = isMonochrome ? 3.7 : 1;
  const getTechIcon = (tag) => {
    const size = 12;
    switch (tag.toLowerCase()) {
      case 'next.js': return <Zap size={size} />;
      case 'react': return <Zap size={size} />;
      case 'tailwind': return <Wind size={size} />;
      case 'node.js': return <Server size={size} />;
      case 'mongodb': return <Database size={size} />;
      case 'vercel': return <Triangle size={size} />;
      case 'swift': return <Smartphone size={size} />;
      case 'swiftui': return <Smartphone size={size} />;
      case 'coredata': return <Database size={size} />;
      case 'ios': return <Smartphone size={size} />;
      case 'flutter': return <Layers size={size} />;
      case 'dart': return <Code size={size} />;
      case 'material design': return <Palette size={size} />;
      case 'go': return <Terminal size={size} />;
      case 'concurrency': return <Cpu size={size} />;
      case 'http': return <Globe size={size} />;
      case 'cli': return <Terminal size={size} />;
      case 'sqlite': return <Database size={size} />;
      case 'mobile': return <Smartphone size={size} />;
      case 'python': return <Code size={size} />;
      case 'fastapi': return <Lightning size={size} />;
      case 'wordpress': return <Code size={size} />;
      case 'docker': return <Box size={size} />;
      case 'mariadb': return <Database size={size} />;
      case 'trading': return <TrendingUp size={size} />;
      case 'real-time': return <Lightning size={size} />;
      case 'open source': return <Code size={size} />;
      case 'scheduling': return <Zap size={size} />;
      case 'e-commerce': return <Box size={size} />;
      default: return <Folder size={size} />;
    }
  };

  return (
    <section className="projects-section" style={{ '--border-multiplier': borderMultiplier }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <ProjectCard project={project} index={index} getTechIcon={getTechIcon} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .projects-section {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          width: 100%;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ project, index, getTechIcon }) => {
  const accentColors = [
    'var(--accent-primary)',
    'var(--accent-secondary)',
    'var(--accent-tertiary)',
    'var(--accent-primary)',
    'var(--accent-secondary)',
    'var(--accent-tertiary)'
  ];
  const accentColor = accentColors[index % accentColors.length];

  const githubLink = project.links?.github || project.links?.code;
  const demoLink = project.links?.demo || project.links?.external;

  return (
    <>
      <motion.div
        className="project-card"
        style={{ borderColor: accentColor, boxShadow: `0 4px 16px ${accentColor}20`, borderWidth: 'calc(1px * var(--border-multiplier, 1))' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
      >
        <div className="project-card-inner">
          <div className="project-top">
            <div className="project-icon-box" style={{ color: accentColor }}>
              <Folder size={28} />
            </div>
            <div className="project-links">
              {githubLink && (
                <a href={githubLink} className="icon-link" style={{ '--link-accent': accentColor }} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <Github size={18} />
                </a>
              )}
              {demoLink && demoLink !== '#' && (
                <a href={demoLink} className="icon-link" style={{ '--link-accent': accentColor }} aria-label="Live Demo" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="project-info">
            <h3 className="project-title" style={{ color: accentColor }}>{project.title}</h3>
            <p className="project-desc">{project.description}</p>
          </div>

          <div className="project-tags">
            {project.tags.map((tag, tIdx) => (
              <span key={tIdx} className="tag-module">
                {getTechIcon(tag)}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      <style>{`
        .project-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 1.5rem;
          border: 1px solid;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          backdrop-filter: blur(10px);
          height: 100%;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px var(--border-color)30;
        }

        .project-card-inner {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          height: 100%;
        }

        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .project-icon-box {
          opacity: 0.8;
          flex-shrink: 0;
        }

        .project-links {
          display: flex;
          gap: 0.75rem;
        }

        .icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: calc(1px * var(--border-multiplier, 1)) solid var(--border-color);
          color: var(--text-secondary);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .icon-link:hover {
          background: var(--link-accent);
          color: var(--bg-primary-color);
          border-color: var(--link-accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--link-accent)30;
        }

        .project-info {
          flex-grow: 1;
        }

        .project-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.02em;
        }

        .project-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: calc(1px * var(--border-multiplier, 1)) solid var(--border-color);
        }

        .tag-module {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-secondary);
          background: transparent;
          padding: 0.35rem 0.7rem;
          border-radius: 6px;
          border: calc(1px * var(--border-multiplier, 1)) solid var(--border-color);
          line-height: 1;
          transition: all 0.2s ease;
          white-space: nowrap;
          letter-spacing: 0.1px;
        }

        .tag-module:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .tag-module svg {
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .tag-module:hover svg {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .project-card {
            padding: 1.25rem;
          }

          .project-title {
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          .project-card {
            padding: 1.25rem;
          }

          .project-title {
            font-size: 0.95rem;
          }

          .project-desc {
            font-size: 0.85rem;
          }

          .project-tags {
            gap: 0.45rem;
          }

          .tag-module {
            font-size: 0.68rem;
            padding: 0.3rem 0.65rem;
          }
        }

        @media (max-width: 480px) {
          .project-card {
            padding: 1rem;
          }

          .project-title {
            font-size: 0.9rem;
          }

          .project-desc {
            font-size: 0.8rem;
          }

          .project-tags {
            gap: 0.4rem;
          }

          .tag-module {
            font-size: 0.65rem;
            padding: 0.3rem 0.6rem;
          }
        }
      `}</style>
    </>
  );
};

export default Projects;
