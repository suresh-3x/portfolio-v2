import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> Education & Certifications
        </h2>
        <p className="section-subtitle">
          Academic background and professional certifications.
        </p>
      </div>

      <div className="education-grid">
        <motion.div
          className="edu-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="card-header">
            <GraduationCap className="icon" size={24} />
            <h3>Education</h3>
          </div>
          <div className="card-content">
            <div className="edu-item">
              <h4>Bachelors of Computer Applications</h4>
              <p className="institution">K. P. B. Hinduja College of Commerce</p>
              <div className="meta">
                <span className="location">Mumbai, Maharashtra</span>
                <span className="date"><Calendar size={14} /> 10/2021</span>
              </div>
              <p className="grade">CGPA: 8.20</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="edu-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-header">
            <Award className="icon" size={24} />
            <h3>Certifications</h3>
          </div>
          <div className="card-content">
            <div className="cert-item">
              <h4>CutShort Certified Python - Advanced</h4>
              <p className="issuer">CutShort</p>
            </div>
            <div className="cert-item">
              <h4>Rest API (Intermediate) Certificate</h4>
              <p className="issuer">HackerRank</p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .education-section {
          padding: var(--spacing-xl) 0;
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }

        .edu-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: var(--spacing-lg);
          transition: transform var(--transition-fast);
        }

        .edu-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--border-color);
        }

        .card-header .icon {
          color: var(--accent-primary);
        }

        .card-header h3 {
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .edu-item, .cert-item {
          margin-bottom: var(--spacing-md);
        }

        .edu-item:last-child, .cert-item:last-child {
          margin-bottom: 0;
        }

        .edu-item h4, .cert-item h4 {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 5px;
        }

        .institution, .issuer {
          color: var(--text-secondary);
          margin-bottom: 5px;
        }

        .meta {
          display: flex;
          gap: var(--spacing-md);
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 5px;
        }

        .meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .grade {
          font-size: 0.9rem;
          color: var(--accent-secondary);
          font-weight: 600;
        }
      `}</style>
    </section>
  );
};

export default Education;
