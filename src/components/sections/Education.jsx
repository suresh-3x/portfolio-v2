import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';

const Education = () => {
  const { theme } = useTheme();

  const education = {
    title: "Bachelors of Computer Applications",
    institution: "K. P. B. Hinduja College of Commerce",
    location: "Mumbai, Maharashtra",
    date: "10/2021",
    grade: "CGPA: 8.20",
    color: "#bd00ff" // Purple
  };

  const certifications = [
    {
      title: "CutShort Certified Python - Advanced",
      issuer: "CutShort",
      color: "#ffc078" // Amber
    },
    {
      title: "Rest API (Intermediate) Certificate",
      issuer: "HackerRank",
      color: "#ff8787" // Coral
    }
  ];

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
        {(() => {
          const eduAccent = 'var(--accent-secondary)';
          const certAccent = 'var(--accent-tertiary)';

          return (
            <>
              <motion.div
                className="edu-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <Card
                  className="edu-card"
                  showStrip={true}
                  noPadding={true}
                  style={{ '--accent-primary': eduAccent, borderRadius: '4px' }}
                >
                  <div className="card-inner-box">
                    <div className="card-header-v2">
                      <div className="icon-box" style={{ color: eduAccent }}>
                        <GraduationCap size={24} />
                      </div>
                      <h3>Education</h3>
                    </div>
                    <div className="card-content-v2">
                      <div className="edu-item-v2">
                        <h4>{education.title}</h4>
                        <p className="institution-v2">{education.institution}</p>
                        <div className="meta-v2">
                          <span className="location-v2">{education.location}</span>
                          <span className="date-v2"><Calendar size={14} /> {education.date}</span>
                        </div>
                        <p className="grade-v2" style={{ color: eduAccent }}>{education.grade}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                className="edu-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ height: '100%' }}
              >
                <Card
                  className="edu-card"
                  showStrip={true}
                  noPadding={true}
                  style={{ '--accent-primary': certAccent, borderRadius: '4px' }}
                >
                  <div className="card-inner-box">
                    <div className="card-header-v2">
                      <div className="icon-box" style={{ color: certAccent }}>
                        <Award size={24} />
                      </div>
                      <h3>Certifications</h3>
                    </div>
                    <div className="card-content-v2">
                      {certifications.map((cert, i) => {
                        const individualCertAccent = i % 2 === 0 ? 'var(--accent-tertiary)' : 'var(--accent-primary)';

                        return (
                          <div key={i} className="cert-item-v2" style={{ borderLeftColor: individualCertAccent }}>
                            <h4>{cert.title}</h4>
                            <p className="issuer-v2" style={{ color: individualCertAccent }}>{cert.issuer}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </>
          );
        })()}
      </div>

      <style>{`
        .education-section {
          padding: 6rem 0;
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .edu-card {
           height: 100%;
           border: 1px solid var(--border-color);
           background: rgba(255, 255, 255, 0.01);
        }

        .card-inner-box {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            height: 100%;
        }

        .card-header-v2 {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.25rem;
        }

        .icon-box {
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.9;
        }

        .card-header-v2 h3 {
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
          margin: 0;
        }

        .edu-item-v2 h4, .cert-item-v2 h4 {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .institution-v2, .issuer-v2 {
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .meta-v2 {
          display: flex;
          gap: 1.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .location-v2, .date-v2 {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .grade-v2 {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          font-weight: 700;
        }

        .cert-item-v2 {
            margin-bottom: 1.5rem;
            padding-left: 1rem;
            border-left: 2px solid;
            transition: all 0.3s ease;
        }

        .cert-item-v2:last-child {
            margin-bottom: 0;
        }

        .cert-item-v2:hover {
            transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .education-section {
            padding: 4rem 1rem;
          }
          .education-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
           .card-inner-box {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Education;
