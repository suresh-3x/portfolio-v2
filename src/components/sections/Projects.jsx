import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder, Zap, Wind, Server, Database, Triangle, Smartphone, Layers, Code, Palette, Terminal, Cpu, Globe, Box, Layout } from 'lucide-react';
import Card from '../ui/Card';

const Projects = () => {

  const getTechIcon = (tag) => {
    const size = 12;
    // Map common tech to Lucide icons
    switch (tag.toLowerCase()) {
      case 'next.js': return <Zap size={size} />;
      case 'tailwind': return <Wind size={size} />;
      case 'node.js': return <Server size={size} />;
      case 'mongodb': return <Database size={size} />;
      case 'vercel': return <Triangle size={size} />;
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
      default: return null; // Or <Code size={size} /> if you want a default
    }
  };

  const projects = [
    {
      title: "Agency Website (BizAssist)",
      desc: "Full-stack agency website delivering scalable client solutions with Next.js, Tailwind, Node.js, and MongoDB.",
      tags: ["Next.js", "Tailwind", "Node.js", "MongoDB", "Vercel"],
      links: {
        demo: "https://www.bizassist.online/",
        code: "https://github.com/suresh-3x/bizAssist"
      }
    },
    {
      title: "News3x",
      desc: "iOS news aggregator built with SwiftUI and CoreData, offering real-time updates and offline reading.",
      tags: ["SwiftUI", "CoreData", "iOS"],
      links: {
        demo: "#",
        code: "https://github.com/suresh-3x/News3x"
      }
    },
    {
      title: "Vision Clothing",
      desc: "E-commerce mobile app crafted in Flutter, showcasing material design and seamless checkout flow.",
      tags: ["Flutter", "Dart", "Material Design"],
      links: {
        demo: "#",
        code: "https://github.com/suresh-3x/vision-clo"
      }
    },
    {
      title: "JordanSoldOutChecker",
      desc: "High-performance inventory checker built in Go, utilizing concurrency to process massive SKU lists.",
      tags: ["Go", "Concurrency", "HTTP", "CLI"],
      links: {
        demo: "#",
        code: "https://github.com/suresh-3x/jordanSoldOutChecker"
      }
    },
    {
      title: "Tasker",
      desc: "Cross-platform task management app built with Flutter and Dart, featuring offline sync and intuitive UI.",
      tags: ["Flutter", "Dart", "SQLite", "Mobile"],
      links: {
        demo: "#",
        code: "https://github.com/suresh-3x/Tasker"
      }
    }
  ];

  return (
    <section id="projects" className="projects-section">


      <div className="projects-grid">
        {projects.map((project, index) => {
          const accentColors = [
            'var(--accent-primary)',
            'var(--accent-secondary)',
            'var(--accent-tertiary)'
          ];
          const accentColor = accentColors[index % 3];

          const cardStyle = {};
          if (accentColor !== 'var(--accent-primary)') {
            cardStyle['--accent-primary'] = accentColor;
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ height: '100%' }}
            >
              <Card
                className="project-card"
                showStrip={false}
                noPadding={true}
                style={cardStyle}
              >
                <div className="project-card-inner">
                  <div className="project-top">
                    <div className="project-icon-box" style={{ color: accentColor }}>
                      <Folder size={32} />
                    </div>
                    <div className="project-links">
                      <a href={project.links.code} className="icon-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                        <Github size={18} />
                      </a>
                      <a href={project.links.demo} className="icon-link" aria-label="Live Demo" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>

                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-desc">
                      <p>{project.desc}</p>
                    </div>
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
              </Card>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
        }

        .project-card {
           height: 100%;
        }

        .project-card:hover {
            border-color: var(--accent-primary);
            background: rgba(var(--accent-primary-rgb), 0.05);
            transform: translateY(-5px);
        }

        .project-card-inner {
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .project-icon-box {
          opacity: 0.8;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-icon-box {
            transform: scale(1.1) rotate(-5deg);
        }

        .project-links {
          display: flex;
          gap: 1.25rem;
        }

        .icon-link {
          color: var(--text-secondary);
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .icon-link:hover {
          color: var(--accent-primary);
          opacity: 1;
          transform: translateY(-2px);
        }

        .project-info {
          flex-grow: 1;
          margin-bottom: 2rem;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .project-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          opacity: 0.8;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .tag-module {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
          line-height: 1;
        }
        
        .tag-module svg {
            opacity: 0.7;
        }

        @media (max-width: 768px) {
          .projects-section {
            padding: 4rem 0;
          }
          .projects-grid {
             grid-template-columns: 1fr;
             gap: 1.25rem;
             padding: 0;
          }
          .project-card-inner {
            padding: 1.25rem;
          }
          .project-title {
              font-size: 1.1rem;
          }
          .project-desc {
              font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
