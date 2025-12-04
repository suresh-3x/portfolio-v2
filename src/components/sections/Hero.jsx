import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Database, Server, Globe } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Loading backend modules...\nInitializing mobile frameworks...\nOptimizing system architecture...\n> Polymath Engineer ready.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-text"
        >
          <div className="badge">
            <span className="status-dot"></span>
            {/* Available for hire */}
            Online
          </div>
          <h1>
            Suresh <span className="highlight">Bhandari</span><br />
            Backend Software Engineer
          </h1>
          <p className="subtitle">
            <strong>Polymath</strong> & Software Engineer with 10+ years of experience.
            Architecting high-performance, scalable backend systems while continuously expanding expertise across diverse domains.
          </p>

          <div className="cta-group">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="tech-stack-preview">
            <div className="tech-item"><Server size={16} /> Microservices</div>
            <div className="tech-item"><Database size={16} /> High-Scale DBs</div>
            <div className="tech-item"><Globe size={16} /> Distributed Systems</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-visual"
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="close"></span>
                <span className="minimize"></span>
                <span className="maximize"></span>
              </div>
              <div className="terminal-title">bash — 80x24</div>
            </div>
            <div className="terminal-body">
              <pre>
                <code>
                  <span className="prompt">user@server:~$</span> ./init_polymath.sh<br />
                  {text}
                  <span className="cursor">_</span>
                </code>
              </pre>

              <div className="system-stats">
                <div className="stat-row">
                  <span className="label">UPTIME</span>
                  <span className="value">99.999%</span>
                </div>
                <div className="stat-row">
                  <span className="label">LATENCY</span>
                  <span className="value text-green">&lt;10ms</span>
                </div>
                <div className="stat-row">
                  <span className="label">STATUS</span>
                  <span className="value text-blue">OPTIMIZED</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: var(--spacing-xl) 0;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-xl);
          align-items: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-sm);
          background: rgba(0, 255, 157, 0.1);
          border: 1px solid rgba(0, 255, 157, 0.2);
          border-radius: 100px;
          color: var(--accent-primary);
          font-size: 0.8rem;
          font-family: var(--font-mono);
          margin-bottom: var(--spacing-md);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-primary);
        }

        h1 {
          font-size: 3.5rem;
          margin-bottom: var(--spacing-md);
          line-height: 1.1;
        }

        .highlight {
          color: var(--accent-secondary);
          position: relative;
        }
        
        .highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent-secondary);
          opacity: 0.5;
        }

        .subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-lg);
          max-width: 500px;
        }

        .cta-group {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          font-weight: 600;
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: var(--bg-primary);
        }

        .btn-primary:hover {
          background: #00cc7d;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .btn-secondary:hover {
          border-color: var(--text-primary);
        }

        .tech-stack-preview {
          display: flex;
          gap: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--border-color);
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--text-muted);
          font-size: 0.9rem;
          font-family: var(--font-mono);
        }

        /* Terminal Visual */
        .terminal-window {
          background: #0f0f0f;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          font-family: var(--font-mono);
        }

        .terminal-header {
          background: #1a1a1a;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .terminal-buttons {
          display: flex;
          gap: 8px;
        }

        .terminal-buttons span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .close { background: #ff5f56; }
        .minimize { background: #ffbd2e; }
        .maximize { background: #27c93f; }

        .terminal-title {
          flex: 1;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .terminal-body {
          padding: 20px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .prompt { color: var(--accent-primary); margin-right: 8px; }
        .cursor { animation: blink 1s step-end infinite; }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .system-stats {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px dashed var(--border-color);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .stat-row {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .stat-row .label {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .stat-row .value {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .text-green { color: var(--accent-primary); }
        .text-blue { color: var(--accent-secondary); }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .hero-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .tech-stack-preview {
            justify-content: center;
          }
          
          h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
