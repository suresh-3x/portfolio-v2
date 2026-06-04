import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { primarySkillsets } from '../../data/skills';

const Skills = () => {
  const { theme } = useTheme();

  return (
    <section className="skills-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="skills-mag-grid">
          {primarySkillsets.map((category, index) => (
            <motion.div
              key={category.title}
              className="skill-mag-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="skill-mag-header">
                <span className="skill-mag-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="skill-mag-title">{category.title}</h3>
              </div>
              <div className="skill-mag-tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-mag-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .skills-section {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .skills-mag-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px; /* For the thin grid lines effect */
          background: var(--border-color);
          border: 1px solid var(--border-color);
        }

        .skill-mag-card {
          background: var(--card-bg);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-height: 280px;
          transition: background 0.2s;
        }

        .skill-mag-card:hover {
          background: var(--bg-secondary);
        }

        .skill-mag-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .skill-mag-index {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent-primary);
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .skill-mag-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .skill-mag-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto; /* Push tags to the bottom */
        }

        .skill-mag-chip {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 4px 10px;
          font-weight: 600;
          text-transform: uppercase;
          transition: all 0.2s ease;
        }

        .skill-mag-card:hover .skill-mag-chip {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }

        [data-theme='dawn'] .skill-mag-card:hover .skill-mag-chip {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        @media (max-width: 900px) {
          .skills-mag-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .skills-mag-grid {
            grid-template-columns: 1fr;
          }
          .skill-mag-card {
            padding: 1.5rem;
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
