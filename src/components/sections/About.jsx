import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Shield } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Cpu size={24} />,
      title: "Distributed Systems",
      desc: "Architecting fault-tolerant microservices capable of handling 10k+ concurrent requests."
    },
    {
      icon: <Zap size={24} />,
      title: "High-Performance Engineering",
      desc: "Optimizing database queries and runtime execution to achieve <50ms response times."
    },
    {
      icon: <Shield size={24} />,
      title: "Enterprise Security",
      desc: "Implementing OAuth2, JWT, and RBAC to ensure bank-grade security standards."
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> About Me
        </h2>
        <p className="section-subtitle">
          More than just code. I build the engines that power the web.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>
            As a <strong>Polymath & Software Engineer</strong> with over a decade of experience, I specialize in orchestrating complex, high-availability systems. My expertise spans the entire software lifecycle, from architecting resilient backend infrastructure to crafting intuitive mobile experiences.
          </p>
          <p>
            I excel in <strong>optimizing system performance</strong>, consistently delivering solutions that handle high throughput with sub-millisecond latency. My approach combines rigorous engineering principles with creative problem-solving to build scalable, secure, and efficient applications that drive business value.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="feature-card"
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .about-section {
          padding: var(--spacing-2xl) 0;
          position: relative;
        }

        .section-header {
          margin-bottom: var(--spacing-2xl);
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-sm);
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-weight: 700;
        }

        .hash {
          color: var(--accent-primary);
          font-family: var(--font-mono);
          opacity: 0.8;
        }

        .section-subtitle {
          color: var(--text-secondary);
          max-width: 600px;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .about-grid {
          display: grid;
          gap: var(--spacing-2xl);
        }

        .about-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
          max-width: 900px;
        }

        .about-text strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .about-text p {
          margin-bottom: var(--spacing-md);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
          margin-top: var(--spacing-lg);
        }

        .feature-card {
          background: var(--bg-secondary);
          padding: var(--spacing-xl);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          transition: all var(--transition-normal);
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-primary), transparent);
          opacity: 0;
          transition: opacity var(--transition-fast);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 255, 157, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.03);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-icon {
          color: var(--accent-primary);
          margin-bottom: var(--spacing-lg);
          padding: 12px;
          background: rgba(0, 255, 157, 0.1);
          border-radius: 12px;
          width: fit-content;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-md);
          font-weight: 600;
          color: var(--text-primary);
        }

        .feature-card p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          flex-grow: 1;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          .about-section {
             padding: var(--spacing-xl) 0;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
