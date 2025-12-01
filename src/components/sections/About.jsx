import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Shield } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Cpu size={24} />,
      title: "System Architecture",
      desc: "Designing scalable, fault-tolerant distributed systems that handle high throughput."
    },
    {
      icon: <Zap size={24} />,
      title: "Performance Optimization",
      desc: "Deep diving into database queries and runtime efficiency to shave off milliseconds."
    },
    {
      icon: <Shield size={24} />,
      title: "Security First",
      desc: "Implementing robust authentication and authorization protocols from the ground up."
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
            I am a <strong>Passionate Software Development Engineer</strong> with over a decade of hands-on coding experience, starting at age 13.
            I specialize in <strong>backend-heavy web development</strong>, building scalable, high-performance systems with Node.js, Django, FastAPI, and AWS.
          </p>
          <p>
            I am adept at architecting robust APIs, streamlining infrastructure, and delivering seamless integrations that power complex business workflows.
            A continuous learner and natural problem solver, focused on driving innovation and staying ahead of modern development trends.
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
          padding: var(--spacing-xl) 0;
        }

        .section-header {
          margin-bottom: var(--spacing-xl);
        }

        .section-title {
          font-size: 2rem;
          margin-bottom: var(--spacing-sm);
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .hash {
          color: var(--accent-primary);
        }

        .section-subtitle {
          color: var(--text-secondary);
          max-width: 600px;
        }

        .about-grid {
          display: grid;
          gap: var(--spacing-xl);
        }

        .about-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
          max-width: 800px;
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
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        .feature-card {
          background: var(--bg-secondary);
          padding: var(--spacing-lg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          transition: transform var(--transition-fast);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
        }

        .feature-icon {
          color: var(--accent-primary);
          margin-bottom: var(--spacing-md);
        }

        .feature-card h3 {
          font-size: 1.1rem;
          margin-bottom: var(--spacing-sm);
        }

        .feature-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
};

export default About;
