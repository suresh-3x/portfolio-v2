import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import Card from '../ui/Card';

const Education = () => {

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
    <section className="education-section">


      <div className="education-grid">
        {(() => {
          const accentColors = [
            'var(--accent-primary)',
            'var(--accent-secondary)',
            'var(--accent-tertiary)'
          ];

          return (
            <>
              {/* Card 1: Education (Red) */}
              <motion.div
                className="edu-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <Card
                  className="edu-card"
                  showStrip={false}
                  noPadding={true}
                  style={accentColors[0] !== 'var(--accent-primary)' ? { '--accent-primary': accentColors[0] } : {}}
                >
                  <div className="card-inner-box">
                    <div className="card-header-v2">
                      <div className="icon-box" style={{ color: accentColors[0] }}>
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
                        <p className="grade-v2" style={{ color: accentColors[0] }}>{education.grade}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Card 2: Certification 1 (Green) */}
              <motion.div
                className="edu-wrapper"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{ height: '100%' }}
              >
                <Card
                  className="edu-card"
                  showStrip={false}
                  noPadding={true}
                  style={{ '--accent-primary': accentColors[1] }}
                >
                  <div className="card-inner-box">
                    <div className="card-header-v2">
                      <div className="icon-box" style={{ color: accentColors[1] }}>
                        <Award size={24} />
                      </div>
                      <h3>Certification</h3>
                    </div>
                    <div className="card-content-v2">
                      <div className="cert-item-v2" style={{ borderLeftColor: accentColors[1] }}>
                        <h4>{certifications[0].title}</h4>
                        <p className="issuer-v2" style={{ color: accentColors[1] }}>{certifications[0].issuer}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Card 3: Certification 2 (Blue) */}
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
                  showStrip={false}
                  noPadding={true}
                  style={{ '--accent-primary': accentColors[2] }}
                >
                  <div className="card-inner-box">
                    <div className="card-header-v2">
                      <div className="icon-box" style={{ color: accentColors[2] }}>
                        <Award size={24} />
                      </div>
                      <h3>Certification</h3>
                    </div>
                    <div className="card-content-v2">
                      <div className="cert-item-v2" style={{ borderLeftColor: accentColors[2] }}>
                        <h4>{certifications[1].title}</h4>
                        <p className="issuer-v2" style={{ color: accentColors[2] }}>{certifications[1].issuer}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </>
          );
        })()}
      </div>

      <style>{`
        .education-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
        }

        .edu-card {
           height: 100%;
        }

        .card-inner-box {
            padding: 2.25rem;
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
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
            padding: 4rem 0;
          }
          .education-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
           .card-inner-box {
            padding: 1.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Education;
