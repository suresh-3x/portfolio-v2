import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Shield, Cloud, Bot, Smartphone, ExternalLink, FileText } from 'lucide-react';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();

  const resumeLink = "https://gwl1cw03d070bspa.public.blob.vercel-storage.com/resume-sde-0.pdf";

  const features = [
    {
      icon: <Cpu size={18} />,
      title: "Distributed Systems",
      desc: "Fault-tolerant microservices for 10k+ concurrent requests."
    },
    {
      icon: <Zap size={18} />,
      title: "High-Performance",
      desc: "Optimizing database queries for sub-50ms execution."
    },
    {
      icon: <Shield size={18} />,
      title: "Enterprise Security",
      desc: "Robust OAuth2, JWT, and RBAC security standards."
    },
    {
      icon: <Cloud size={18} />,
      title: "Cloud Native",
      desc: "Scalable AWS, Docker, and Kubernetes infrastructure."
    },
    {
      icon: <Bot size={18} />,
      title: "AI & LLM Integration",
      desc: "Intelligent agents automating complex business workflows."
    },
    {
      icon: <Smartphone size={18} />,
      title: "Mobile Engineering",
      desc: "Cross-platform mobile experiences with Flutter."
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash" style={{ color: 'var(--accent-primary)' }}>#</span> About Me
        </h2>
        <p className="section-subtitle">
          More than just code. I build the engines that power the web.
        </p>
      </div>

      <div className="about-container">
        <div className="about-hero-block">
          <div className="about-bio-alt">
            <p style={{ marginBottom: '1rem' }}>
              As a <strong>Polymath & Software Engineer</strong> with over a decade of experience, I specialize in orchestrating complex, high-availability systems. My expertise spans the entire software lifecycle, from architecting resilient backend infrastructure to crafting intuitive mobile experiences.
            </p>
            <p>
              I excel in <strong>optimizing system performance</strong>, consistently delivering solutions that handle high throughput with sub-millisecond latency. My approach combines rigorous engineering principles with creative problem-solving to build scalable, secure, and efficient applications that drive business value.
            </p>
          </div>

          <motion.div
            className="resume-cta-v2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="about-resume-btn">
              <FileText size={16} />
              <span>View Resume</span>
              <ExternalLink size={14} className="ext-icon" />
            </a>
          </motion.div>
        </div>

        <div className="capabilities-compact-grid">
          {features.map((feature, index) => {
            const accentColors = [
              'var(--accent-primary)',
              'var(--accent-secondary)',
              'var(--accent-tertiary)'
            ];
            const accentColor = accentColors[index % 3];

            const cardStyle = { borderRadius: '4px' };
            // Fix: avoid circular variable reference for primary color
            if (accentColor !== 'var(--accent-primary)') {
              cardStyle['--accent-primary'] = accentColor;
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="compact-cap-card"
                  noPadding={true}
                  showStrip={true}
                  style={cardStyle}
                >
                  <div className="cap-content-horizontal">
                    <div className="cap-icon-box" style={{ color: accentColor }}>
                      {feature.icon}
                    </div>
                    <div className="cap-info-box">
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 6rem 0;
          position: relative;
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-hero-block {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4rem;
            margin-bottom: 4rem;
            padding: 0 1rem;
        }

        .about-bio-alt {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 750px;
        }

        .about-bio-alt strong {
          color: var(--accent-primary);
        }

        .about-resume-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 24px;
            background: rgba(var(--accent-primary-rgb), 0.05);
            border: 1px solid var(--accent-primary);
            border-radius: 4px;
            color: var(--accent-primary);
            font-family: var(--font-mono);
            font-weight: 700;
            font-size: 0.85rem;
            text-decoration: none;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            white-space: nowrap;
        }

        .about-resume-btn:hover {
            background: var(--accent-primary);
            color: #fff;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(var(--accent-primary-rgb), 0.3);
        }

        .about-resume-btn .ext-icon {
            opacity: 0.7;
        }

        .capabilities-compact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.25rem;
          padding: 0 1rem;
        }

        .compact-cap-card {
          height: 100%;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.01);
        }

        .cap-content-horizontal {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.25rem;
        }

        .cap-icon-box {
          flex-shrink: 0;
          padding-top: 3px;
          opacity: 0.9;
        }

        .cap-info-box h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cap-info-box p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
          opacity: 0.8;
          margin: 0;
        }

        @media (max-width: 1024px) {
            .about-hero-block {
                flex-direction: column;
                gap: 2rem;
            }
            .capabilities-compact-grid {
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 4rem 1rem;
          }
          .about-hero-block {
            padding: 0;
            margin-bottom: 3rem;
          }
          .about-bio-alt {
            font-size: 1rem;
          }
          .capabilities-compact-grid {
            grid-template-columns: 1fr;
            padding: 0;
          }
          .cap-content-horizontal {
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
