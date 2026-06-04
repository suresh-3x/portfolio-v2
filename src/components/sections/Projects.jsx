import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects';
import { useTheme } from '../../context/ThemeContext';

const Projects = () => {
  const { theme } = useTheme();

  // Calculate grid slots
  // Featured project takes 2 slots, others take 1.
  const totalSlotsUsed = 2 + (projects.length - 1);
  const remainder = totalSlotsUsed % 3;
  const emptySlotsNeeded = remainder === 0 ? 0 : 3 - remainder;

  const emptySlots = Array.from({ length: emptySlotsNeeded }).map((_, i) => i);

  return (
    <section className="projects-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="proj-mag">
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <motion.div
                key={project.title}
                className={`proj-mag-item ${isFeatured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="proj-mag-index">
                  {String(index + 1).padStart(2, '0')} {isFeatured ? '— Featured' : ''}
                </div>
                <div className="proj-mag-title">{project.title}</div>
                <div className="proj-mag-desc">{project.description}</div>
                <div className="proj-mag-chips">
                  {project.tags.slice(0, 4).map((tag, tIdx) => (
                    <span key={tIdx} className="proj-mag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="proj-links-m">
                  {project.links?.github && (
                    <a href={project.links.github} className="proj-link-m" target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  )}
                  {project.links?.demo && project.links.demo !== '#' && (
                    <a href={project.links.demo} className="proj-link-m" target="_blank" rel="noopener noreferrer">
                      Live ↗
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
          
          {/* Render empty slots as "Launching Soon" */}
          {emptySlots.map((slotIndex) => {
            const displayIndex = projects.length + slotIndex + 1;
            return (
             <div key={`empty-${slotIndex}`} className="proj-mag-item empty-slot">
                <div className="proj-mag-index empty-index">
                  {String(displayIndex).padStart(2, '0')}
                </div>
                <div className="empty-slot-content">
                  <div className="empty-slot-icon">⚡</div>
                  <div className="empty-slot-text">Launching Soon</div>
                  <div className="empty-slot-sub">Project in development</div>
                </div>
             </div>
            );
          })}
        </div>
      </motion.div>

      <style>{`
        .projects-section {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .proj-mag {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px; /* For the thin grid lines effect */
          background: var(--border-color);
          border: 1px solid var(--border-color);
        }

        .proj-mag-item {
          background: var(--card-bg);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          min-height: 280px;
          transition: background 0.2s;
        }

        .proj-mag-item:not(.featured):not(.empty-slot):hover {
          background: var(--bg-secondary);
        }

        .proj-mag-item.featured {
          grid-column: span 2;
          background: var(--text-primary);
        }

        [data-theme='mono'] .proj-mag-item.featured {
          background: #000000;
        }

        /* Empty Slots */
        .empty-slot {
          justify-content: flex-start; /* Align to top instead of center */
          align-items: flex-start;
          background: rgba(var(--text-primary-rgb), 0.02);
          border: 1px dashed var(--border-color);
          position: relative;
        }

        .empty-index {
          opacity: 0.5;
        }

        .empty-slot-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0.5;
          flex: 1; /* Take remaining space */
          width: 100%;
        }

        .empty-slot-icon {
          font-size: 24px;
        }

        .empty-slot-text {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }

        .empty-slot-sub {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .proj-mag-item.featured .proj-mag-title { color: var(--bg-primary-color); }
        [data-theme='mono'] .proj-mag-item.featured .proj-mag-title { color: var(--text-primary); }

        .proj-mag-item.featured .proj-mag-desc { color: rgba(255, 255, 255, 0.7); }
        [data-theme='mono'] .proj-mag-item.featured .proj-mag-desc { color: var(--text-secondary); }

        .proj-mag-item.featured .proj-mag-chip { 
          background: rgba(255, 255, 255, 0.05); 
          color: rgba(255, 255, 255, 0.6); 
          border-color: rgba(255, 255, 255, 0.1); 
        }

        [data-theme='mono'] .proj-mag-item.featured .proj-mag-chip { 
          background: var(--bg-secondary); 
          color: var(--text-secondary); 
          border-color: var(--border-color); 
        }
        
        [data-theme='dawn'] .proj-mag-item.featured .proj-mag-index { color: var(--accent-secondary); }
        [data-theme='dawn'] .proj-mag-item.featured .proj-link-m { color: var(--accent-secondary); }

        .proj-mag-index {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-primary);
          margin-bottom: 1rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .proj-mag-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .proj-mag-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          flex: 1;
          margin-bottom: 1.5rem;
        }

        .proj-mag-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 1.5rem;
        }

        .proj-mag-chip {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 4px 10px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .proj-links-m {
          display: flex;
          gap: 1.5rem;
          margin-top: auto;
        }

        .proj-link-m {
          color: var(--text-primary);
          font-size: 12px;
          text-decoration: none;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .proj-link-m:hover {
          color: var(--accent-primary);
        }

        [data-theme='dawn'] .proj-mag-item.featured .proj-link-m:hover {
          color: #fff;
        }

        @media (max-width: 900px) {
          .proj-mag {
            grid-template-columns: repeat(2, 1fr);
          }
          .proj-mag-item.featured {
            grid-column: span 2;
          }
        }

        @media (max-width: 600px) {
          .proj-mag {
            grid-template-columns: 1fr;
          }
          .proj-mag-item.featured {
            grid-column: span 1;
          }
          .proj-mag-item {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
