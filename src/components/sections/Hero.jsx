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
          position: relative;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--spacing-2xl);
          align-items: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: 6px 16px;
          background: rgba(0, 255, 157, 0.05);
          border: 1px solid rgba(0, 255, 157, 0.2);
          border-radius: 100px;
          color: var(--accent-primary);
          font-size: 0.8rem;
          font-family: var(--font-mono);
          margin-bottom: var(--spacing-lg);
          letter-spacing: 0.5px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-primary);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 255, 157, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(0, 255, 157, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 255, 157, 0); }
        }

        h1 {
          font-size: 4rem;
          margin-bottom: var(--spacing-md);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .highlight {
          background: linear-gradient(120deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xl);
          max-width: 540px;
          line-height: 1.6;
        }

        .cta-group {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: 1rem 2rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 1rem;
          transition: all var(--transition-fast);
          cursor: pointer;
          letter-spacing: 0.5px;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: var(--bg-primary);
          box-shadow: 0 4px 20px rgba(0, 255, 157, 0.2);
          border: 1px solid var(--accent-primary);
        }

        .btn-primary:hover {
          background: transparent;
          color: var(--accent-primary);
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(0, 255, 157, 0.3);
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .btn-secondary:hover {
          border-color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .tech-stack-preview {
          display: flex;
          gap: var(--spacing-md);
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--border-color);
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-family: var(--font-mono);
          background: var(--bg-secondary);
          padding: 6px 12px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }

        /* Terminal Visual */
        .terminal-window {
          background: #0f0f0f;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          font-family: var(--font-mono);
          position: relative;
        }

        .terminal-header {
          background: #1a1a1a;
          padding: 12px 16px;
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
          opacity: 0.7;
        }

        .terminal-body {
          padding: 24px;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(10, 10, 10, 0.95);
        }

        pre {
          margin: 0;
          white-space: pre-wrap;
        }

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #e0e0e0;
        }

        .prompt { color: var(--accent-primary); margin-right: 10px; font-weight: bold; }
        .cursor { 
          display: inline-block;
          width: 8px;
          height: 16px;
          background: var(--text-secondary);
          vertical-align: middle;
          animation: blink 1s step-end infinite;
          margin-left: 4px;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .system-stats {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px dashed var(--border-color);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .stat-row .label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-row .value {
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-mono);
        }

        .text-green { color: var(--accent-primary); }
        .text-blue { color: var(--accent-secondary); }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: var(--spacing-xl);
          }
          
          .hero-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            order: 2; /* Put text below visual on mobile if preferred, or keep as is */
            order: 1;
          }

          .hero-visual {
            order: 2;
          }

          .subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .tech-stack-preview {
            justify-content: center;
            flex-wrap: wrap;
          }
          
          h1 {
            font-size: 2.5rem;
          }

          .cta-group {
            flex-direction: column;
            width: 100%;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
