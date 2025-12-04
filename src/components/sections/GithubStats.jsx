import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const GithubStats = () => {
  return (
    <section id="github-stats" className="github-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> GitHub Activity
        </h2>
        <p className="section-subtitle">
          My open source contributions and coding activity.
        </p>
      </div>

      <div className="github-content">
        <motion.div
          className="stats-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="stats-card">
            <img
              src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=suresh-3x&theme=github_dark"
              alt="GitHub Stats"
              className="stats-img"
            />
          </div>
          <div className="stats-card">
            <img
              src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=suresh-3x&theme=github_dark"
              alt="Top Languages"
              className="stats-img"
            />
          </div>
        </motion.div>

        <motion.div
          className="calendar-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3>Contribution Graph</h3>
          <div className="calendar-wrapper">
            <img
              src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=suresh-3x&theme=github_dark"
              alt="GitHub Contribution Graph"
              className="calendar-img"
            />
          </div>
        </motion.div>

        <div className="github-cta">
          <a
            href="https://github.com/suresh-3x"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            <Github size={20} />
            Visit GitHub Profile
          </a>
        </div>
      </div>

      <style>{`
        .github-section {
          padding: var(--spacing-xl) 0;
        }

        .github-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }

        .stats-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: var(--spacing-md);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform var(--transition-fast);
        }

        .stats-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
        }

        .stats-img {
          max-width: 100%;
          height: auto;
        }

        .calendar-container {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: var(--spacing-lg);
        }

        .calendar-container h3 {
          font-size: 1.2rem;
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
        }

        .calendar-wrapper {
          overflow-x: auto;
          padding-bottom: var(--spacing-sm);
        }

        .calendar-img {
          width: 100%;
          min-width: 700px;
          height: auto;
        }

        .github-cta {
          display: flex;
          justify-content: center;
        }

        .github-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: var(--font-mono);
          transition: all var(--transition-fast);
        }

        .github-btn:hover {
          background: var(--bg-primary);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default GithubStats;
