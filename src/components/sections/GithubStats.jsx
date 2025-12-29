import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, Users, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';

const GithubStats = () => {
  const [stats, setStats] = useState({
    followers: 0,
    public_repos: 0,
    following: 0,
    total_stars: 0
  });
  const [loading, setLoading] = useState(true);

  const accentColor = "var(--accent-primary)";

  useEffect(() => {
    // ... useEffect remains same ...
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
    { label: 'Repos', value: stats.public_repos, icon: <BookOpen size={16} /> },
    { label: 'Stars', value: stats.total_stars, icon: <Star size={16} /> },
    { label: 'Followers', value: stats.followers, icon: <Users size={16} /> },
    { label: 'Following', value: stats.following, icon: <Users size={16} /> },
  ];

  return (
    <section id="github-stats" className="github-section">


      <div className="github-single-block">
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

        <div className="stats-grid-v4">
          {statItems.map((item, index) => {
            const accentColors = [
              'var(--accent-primary)',
              'var(--accent-secondary)',
              'var(--accent-tertiary)'
            ];
            const statAccent = accentColors[index % 3];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="github-stat-card-v4"
                  showStrip={false}
                  noPadding={true}
                  style={statAccent !== 'var(--accent-primary)' ? { '--accent-primary': statAccent } : {}}
                >
                  <div className="stat-card-inner-v4">
                    <div className="stat-header-v4">
                      <div className="icon-box-v4" style={{ color: statAccent }}>
                        {item.icon}
                      </div>
                      <span className="label-v4">{item.label}</span>
                    </div>
                    <span className="value-v4">{loading ? '...' : item.value}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .github-single-block {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .stats-grid-v4 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
        }

        .stat-card-inner-v4 {
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .stat-header-v4 {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .icon-box-v4 {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(var(--text-primary-rgb), 0.03);
            border: 1px solid var(--border-color);
        }

        .label-v4 {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: var(--text-secondary);
            font-weight: 700;
        }

        .value-v4 {
            font-size: 2rem;
            font-weight: 800;
            color: var(--text-primary);
            letter-spacing: -0.04em;
            line-height: 1;
        }

        .smart-action-bar {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 0;
        }

        .smart-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 0.8rem;
            color: var(--text-secondary);
            font-weight: 600;
            transition: all 0.2s ease;
            text-decoration: none;
            font-family: var(--font-mono);
        }

        .smart-btn:hover {
            border-color: var(--accent-secondary);
            color: var(--text-primary);
            background: rgba(var(--accent-secondary-rgb), 0.1);
        }

        @media (max-width: 1024px) {
            .stats-grid-v4 {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 640px) {
            .stats-grid-v4 {
                grid-template-columns: 1fr;
            }
            .github-section { padding: 4rem 0; }
            .stat-card-inner-v4 { padding: 1.5rem; }
            .value-v4 { font-size: 1.75rem; }
        }
      `}</style>
    </section>
  );
};

export default GithubStats;
