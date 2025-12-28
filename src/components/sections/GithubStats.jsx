import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, Users, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';

const GithubStats = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    followers: 0,
    public_repos: 0,
    following: 0,
    total_stars: 0
  });
  const [loading, setLoading] = useState(true);

  const isMonochrome = theme === 'monochrome';
  const isRGB = theme === 'rgb';
  const accentColor = (isMonochrome || isRGB) ? "var(--accent-primary)" : "#3fb950";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/suresh-3x');
        const userData = await userRes.json();

        const reposRes = await fetch('https://api.github.com/users/suresh-3x/repos?per_page=100');
        const reposData = await reposRes.json();
        const stars = Array.isArray(reposData)
          ? reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0)
          : 0;

        setStats({
          followers: userData.followers || 0,
          public_repos: userData.public_repos || 0,
          following: userData.following || 0,
          total_stars: stars
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch GitHub stats", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    { label: 'Repos', value: stats.public_repos, icon: <BookOpen size={16} />, color: "#3fb950" }, // Green
    { label: 'Stars', value: stats.total_stars, icon: <Star size={16} />, color: "#3f52fd" }, // Blue
    { label: 'Followers', value: stats.followers, icon: <Users size={16} />, color: "#ff4b4b" }, // Red
    { label: 'Following', value: stats.following, icon: <Users size={16} />, color: "#3fb950" }, // Green
  ];

  return (
    <section id="github-stats" className="github-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> Open Source
        </h2>
        <p className="section-subtitle">
          Contributions and technical activity on GitHub.
        </p>
      </div>

      <div className="github-single-block">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="smart-action-bar">
            <a
              href="https://github.com/suresh-3x"
              target="_blank"
              rel="noopener noreferrer"
              className="v3-user-badge smart-btn"
            >
              <Github size={14} />
              <span>suresh-3x</span>
              <ExternalLink size={12} className="opacity-50" />
            </a>
          </div>

          <Card
            className="github-master-card"
            showStrip={true}
            noPadding={true}
            style={{ '--accent-primary': accentColor, borderRadius: '4px' }}
          >
            <div className="master-card-inner">
              {/* Top Section: Quick Stats */}
              <div className="stats-row">
                {statItems.map((item, index) => {
                  const RGB_COLORS = ['#3fb950', '#3f52fd', '#ff4b4b']; // Green, Blue, Red

                  const statAccent = isMonochrome
                    ? '#ffffff'
                    : (isRGB
                      ? RGB_COLORS[index % 3]
                      : item.color);

                  return (
                    <div key={index} className="minimal-stat">
                      <div className="stat-header">
                        <div className="icon-circle" style={{
                          color: statAccent,
                          backgroundColor: isMonochrome ? 'rgba(255,255,255,0.05)' : (isRGB ? 'rgba(255,255,255,0.03)' : `${statAccent}10`)
                        }}>
                          {item.icon}
                        </div>
                        <span className="label-v3">{item.label}</span>
                      </div>
                      <span className="value-v3">{loading ? '...' : item.value}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          </Card>
        </motion.div>
      </div>

      <style>{`
        .github-section {
          padding: 6rem 0;
        }

        .github-single-block {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .github-master-card {
            border: 1px solid var(--border-color);
            background: rgba(255, 255, 255, 0.01);
            overflow: hidden;
        }

        .master-card-inner {
            display: flex;
            flex-direction: column;
        }

        .stats-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            background: rgba(255, 255, 255, 0.01);
        }

        .minimal-stat {
            padding: 2.5rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            border-right: 1px solid var(--border-color);
            transition: background 0.3s ease;
        }

        .minimal-stat:last-child {
            border-right: none;
        }

        .minimal-stat:hover {
            background: rgba(255, 255, 255, 0.03);
        }

        .stat-header {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .icon-circle {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .label-v3 {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: var(--text-muted);
            font-weight: 700;
        }

        .value-v3 {
            font-size: 2.25rem;
            font-weight: 800;
            color: var(--text-primary);
            letter-spacing: -0.04em;
            line-height: 1;
        }

        .smart-action-bar {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 12px;
        }

        .smart-btn {
            background: transparent;
            border: none;
            padding: 0;
            gap: 10px;
            font-size: 0.85rem;
            color: var(--text-secondary);
            opacity: 0.7;
            font-weight: 600;
        }

        .smart-btn:hover {
            opacity: 1;
            color: var(--accent-primary);
            background: transparent;
            border-color: transparent;
        }

        @media (max-width: 1024px) {
            .stats-row {
                grid-template-columns: repeat(2, 1fr);
            }
            .minimal-stat:nth-child(2) {
                border-right: none;
            }
            .minimal-stat:nth-child(3), .minimal-stat:nth-child(4) {
                border-top: 1px solid var(--border-color);
            }
        }

        @media (max-width: 768px) {
            .github-section { padding: 4rem 0; }
            .value-v3 { font-size: 1.8rem; }
            .stats-row { grid-template-columns: repeat(2, 1fr); }
            .smart-action-bar { margin-bottom: 8px; }
        }

        @media (max-width: 480px) {
            .stats-row {
                grid-template-columns: 1fr;
            }
            .minimal-stat {
                border-right: none;
                border-bottom: 1px solid var(--border-color);
                padding: 1.5rem;
            }
            .minimal-stat:last-child {
                border-bottom: none;
            }
        }
      `}</style>
    </section>
  );
};

export default GithubStats;
