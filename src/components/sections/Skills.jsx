import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  Server, Cpu, Cloud, Globe, Eye, Smartphone, Terminal, Layers,
  Database, Code, Box, Network, AppWindow, Brain,
  FileJson, Shield, Zap, Layout, Monitor, Workflow, Command,
  GitBranch, Container, HardDrive, Share2, Star
} from 'lucide-react';
import { primarySkillsets, skillCategories } from '../../data/skills';

// Map icon string names from data to lucide-react components
const iconMap = {
  code: Code,
  server: Server,
  database: Database,
  cloud: Cloud,
  layers: Layers,
  brain: Brain,
  layout: Layout,
  workflow: Workflow,
};

const Skills = () => {
  const { theme } = useTheme();
  const isMonochrome = theme === 'mono-light' || theme === 'mono-dark';

  const accentColors = React.useMemo(() => {
    if (isMonochrome) {
      return [
        'var(--accent-primary)',
        'var(--accent-secondary)',
        'var(--accent-tertiary)',
        'var(--accent-primary)',
        'var(--accent-secondary)',
        'var(--accent-tertiary)',
        'var(--accent-primary)',
        'var(--accent-secondary)',
      ];
    }
    return [
      'var(--accent-primary)',
      'var(--accent-secondary)',
      'var(--accent-tertiary)',
      'var(--accent-primary)',
      'var(--accent-secondary)',
      'var(--accent-tertiary)',
      'var(--accent-primary)',
      'var(--accent-secondary)',
    ];
  }, [isMonochrome]);

  const borderMultiplier = isMonochrome ? 3.7 : 1;

  // Helper to get icon for specific skills
  const getSkillIcon = (skill) => {
    const s = skill.toLowerCase();

    // Backend / Languages
    if (s.includes('python') || s.includes('golang') || s.includes('java') || s.includes('node')) return <Code size={12} />;
    if (s.includes('django') || s.includes('fastapi') || s.includes('express')) return <Server size={12} />;

    // Databases
    if (s.includes('sql') || s.includes('mongo') || s.includes('neo4j') || s.includes('redis')) return <Database size={12} />;

    // AI / ML
    if (s.includes('torch') || s.includes('tensor') || s.includes('learn') || s.includes('pandas')) return <Brain size={12} />;
    if (s.includes('llm') || s.includes('gpt') || s.includes('agent') || s.includes('rag') || s.includes('adk') || s.includes('openai') || s.includes('anthropic')) return <Zap size={12} />;

    // DevOps
    if (s.includes('docker') || s.includes('kubernetes') || s.includes('container')) return <Box size={12} />;
    if (s.includes('aws') || s.includes('gcp') || s.includes('azure') || s.includes('terraform')) return <Cloud size={12} />;
    if (s.includes('ci/cd') || s.includes('grafana')) return <Workflow size={12} />;

    // Frontend
    if (s.includes('react') || s.includes('next') || s.includes('vue') || s.includes('svelte')) return <AppWindow size={12} />;
    if (s.includes('css') || s.includes('tailwind') || s.includes('style')) return <Layout size={12} />;
    if (s.includes('typescript') || s.includes('javascript')) return <FileJson size={12} />;
    if (s.includes('redux') || s.includes('graphql')) return <Share2 size={12} />;

    // Networking
    if (s.includes('tcp') || s.includes('dns') || s.includes('socket') || s.includes('grpc')) return <Network size={12} />;
    if (s.includes('nginx') || s.includes('load bal')) return <Server size={12} />;

    // CV
    if (s.includes('vision') || s.includes('opencv') || s.includes('yolo') || s.includes('image')) return <Eye size={12} />;

    // Mobile
    if (s.includes('mobile') || s.includes('android') || s.includes('ios') || s.includes('swift')) return <Smartphone size={12} />;

    // System
    if (s.includes('bash') || s.includes('shell') || s.includes('cron')) return <Terminal size={12} />;
    if (s.includes('security')) return <Shield size={12} />;
    if (s.includes('process')) return <Cpu size={12} />;

    return <Star size={12} />;
  };

  // Resolve icon string from data to a React component
  const getCategoryIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Star;
    return <IconComponent size={18} />;
  };

  return (
    <section className="skills-section" style={{ '--border-multiplier': borderMultiplier }}>
      <div className="skills-container">
        {/* Primary Skills */}
        <div className="primary-skills-section">
          {primarySkillsets.map((category, idx) => {
            const accentColor = accentColors[idx % accentColors.length];

            return (
              <motion.div
                key={category.title}
                className="primary-skill-item"
                style={{ borderColor: accentColor, boxShadow: `0 4px 16px ${accentColor}20`, borderWidth: `${borderMultiplier}px` }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <div className="skill-item-header">
                  <div className="skill-icon" style={{ color: accentColor }}>
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div className="skill-item-title-block">
                    <h3 className="skill-item-title" style={{ color: accentColor }}>{category.title}</h3>
                    <p className="skill-item-summary">{category.summary}</p>
                  </div>
                </div>

                <div className="skill-highlights-grid">
                  {category.highlights.map((highlight) => (
                    <div key={highlight} className="skill-highlight-item" style={{ borderLeftColor: accentColor }}>
                      {highlight}
                    </div>
                  ))}
                </div>

                <div className="skill-tags-list">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag" style={{ '--tag-color': accentColor }}>
                      <span className="skill-tag-icon">
                        {getSkillIcon(skill)}
                      </span>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .skills-section {
          position: relative;
          padding: 0;
        }

        .skills-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Primary Skills Section */
        .primary-skills-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .primary-skill-item {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 1.5rem;
          border: 1px solid;
          border-width: calc(1px * var(--border-multiplier, 1));
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          backdrop-filter: blur(10px);
        }

        .skill-item-header {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .skill-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
          border: 1px solid rgba(var(--border-color-rgb, 255, 255, 255), 0.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .skill-icon svg {
          width: 22px;
          height: 22px;
          stroke-width: 1.5;
        }

        .skill-item-title-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .skill-item-title {
          font-size: 1.35rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .skill-item-summary {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.6;
          font-weight: 400;
          padding-bottom: 1.25rem;
          position: relative;
        }

        .skill-item-summary::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--border-color) 20%,
            var(--border-color) 80%,
            transparent 100%
          );
        }

        .skill-highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          width: 100%;
        }

        .skill-highlight-item {
          border-left: 3px solid;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.5;
          letter-spacing: -0.01em;
        }

        .skill-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: flex-start;
        }

        .skill-tag {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          padding: 0.55rem 1rem;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1.5px solid var(--tag-color, var(--accent-primary));
          color: var(--text-secondary);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          white-space: nowrap;
          letter-spacing: 0.5px;
          font-weight: 500;
          line-height: 1.4;
          box-shadow: 0 0 0 1px rgba(var(--accent-primary-rgb, 99, 102, 241), 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .skill-tag-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .skill-tag-icon svg {
          width: 11px;
          height: 11px;
          color: var(--tag-color, var(--accent-primary));
          stroke-width: 2;
          transition: color 0.2s ease, opacity 0.2s ease;
          opacity: 0.7;
        }

        .skill-tag:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--tag-color, var(--accent-primary));
          color: var(--text-primary);
          transform: translateY(-2px);
          box-shadow: 0 0 0 1px rgba(var(--accent-primary-rgb, 99, 102, 241), 0.2),
                      0 4px 12px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .skill-tag:hover .skill-tag-icon svg {
          color: var(--tag-color, var(--accent-primary));
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .skills-container {
            padding: 0 1.25rem;
          }

          .skill-highlights-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .skill-item-title {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 768px) {
          .primary-skills-section {
            gap: 2.5rem;
          }

          .primary-skill-item {
            gap: 1.5rem;
            padding: 1.5rem 0;
          }

          .skill-item-header {
            gap: 1.25rem;
          }

          .skill-icon {
            width: 44px;
            height: 44px;
          }

          .skill-icon svg {
            width: 20px;
            height: 20px;
          }

          .skill-item-title {
            font-size: 1.15rem;
          }

          .skill-item-summary {
            font-size: 0.85rem;
          }

          .skill-highlights-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .skill-tags-list {
            gap: 0.6rem;
          }

          .skill-tag {
            font-size: 0.73rem;
            padding: 0.45rem 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .skills-container {
            padding: 0 1rem;
          }

          .primary-skills-section {
            gap: 1rem;
          }

          .primary-skill-item {
            gap: 1rem;
            padding: 1rem;
          }

          .skill-item-header {
            flex-direction: column;
            gap: 0.75rem;
          }

          .skill-icon {
            width: 36px;
            height: 36px;
          }

          .skill-icon svg {
            width: 16px;
            height: 16px;
          }

          .skill-item-title {
            font-size: 0.95rem;
          }

          .skill-item-summary {
            font-size: 0.8rem;
          }

          .skill-highlight-item {
            padding-left: 0.75rem;
            font-size: 0.8rem;
          }

          .skill-tags-list {
            gap: 0.5rem;
          }

          .skill-tag {
            font-size: 0.7rem;
            padding: 0.4rem 0.7rem;
            gap: 0.4rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
