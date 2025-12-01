import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Agency Website (BizAssist)",
      desc: "A full-stack agency website built with modern technologies.",
      tags: ["Next.js", "Tailwind", "Node.js", "MongoDB", "Vercel"],
      links: {
        demo: "#", // No demo link provided
        code: "https://github.com/suresh-3x/bizAssist"
      }
    },
    {
      title: "News3x",
      desc: "iOS News application using SwiftUI and CoreData.",
      tags: ["SwiftUI", "CoreData", "iOS"],
      links: {
        demo: "#",
        code: "https://github.com/suresh-3x/News3x"
      }
    },
    {
      title: "Vision Clothing",
      desc: "E-commerce mobile application built with Flutter.",
      tags: ["Flutter", "Dart", "Material Design"],
      links: {
        demo: "#",
        code: "https://github.com/suresh-3x/vision-clo"
      }
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> Featured Projects
        </h2>
        <p className="section-subtitle">
          A selection of technical challenges I've solved.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="project-card"
          >
            <div className="card-header">
              <Folder size={40} className="folder-icon" />
              <div className="card-links">
                <a href={project.links.github} className="icon-link" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href={project.links.demo} className="icon-link" aria-label="Live Demo">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <div className="project-desc">
              <p>{project.desc}</p>
            </div>

            <div className="project-tags">
              {project.tags.map((tag, tIdx) => (
                <span key={tIdx} className="tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .projects-section {
          padding: var(--spacing-xl) 0;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }

        .project-card {
          background: var(--bg-secondary);
          padding: var(--spacing-lg);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: transform var(--transition-fast), border-color var(--transition-fast);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .project-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-md);
        }

        .folder-icon {
          color: var(--accent-primary);
        }

        .card-links {
          display: flex;
          gap: var(--spacing-md);
        }

        .icon-link {
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .icon-link:hover {
          color: var(--accent-primary);
        }

        .project-title {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-sm);
          color: var(--text-primary);
        }

        .project-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: var(--spacing-lg);
          flex-grow: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
          margin-top: auto;
        }

        .tag {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
};

export default Projects;
