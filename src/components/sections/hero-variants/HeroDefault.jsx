import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Database, Server, Globe, Layers, Cloud, Zap, Cpu } from 'lucide-react';

const HeroDefault = () => {
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
                        Full-Stack SWE
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
                        <div className="tech-item"><Layers size={14} /> Backend Architecture</div>
                        <div className="tech-item"><Globe size={14} /> Distributed Systems</div>
                        <div className="tech-item"><Cpu size={14} /> Microservices</div>
                        <div className="tech-item"><Database size={14} /> High-Scale DBs</div>
                        <div className="tech-item"><Cloud size={14} /> Cloud Native</div>
                        <div className="tech-item"><Zap size={14} /> System Performance</div>
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
          overflow: hidden; /* Prevent spillover */
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
          align-items: center;
          width: 100%;
        }

        .hero-text {
          width: 100%;
          order: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-visual {
          width: 100%;
          order: 1;
          display: flex;
          justify-content: center;
        }

        @media (min-width: 969px) {
          .hero-content {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: var(--spacing-2xl);
            text-align: left;
          }

          .hero-text {
            order: 0; /* Default order */
            align-items: flex-start;
            text-align: left;
          }

          .hero-visual {
            order: 0; /* Default order */
            justify-content: flex-end;
          }

          .cta-group {
            justify-content: flex-start;
          }

          .tech-stack-preview {
            justify-content: flex-start;
          }
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
          font-size: clamp(2.5rem, 5vw, 4rem); /* Responsive font size */
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
          flex-wrap: wrap; /* Allow wrapping on very small screens */
          justify-content: center; /* Default center for mobile */
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
          white-space: nowrap;
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
          gap: 12px;
          padding-top: var(--spacing-lg);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          flex-wrap: wrap;
          justify-content: flex-start; /* Left align for cleaner flow */
        }

        .tech-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-family: var(--font-mono);
          background: rgba(255, 255, 255, 0.03);
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all var(--transition-fast);
          backdrop-filter: blur(5px);
        }

        .tech-item:hover {
          color: var(--accent-primary);
          border-color: rgba(0, 255, 157, 0.3);
          background: rgba(0, 255, 157, 0.05);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Adjust alignment for mobile */
        @media (max-width: 768px) {
            .tech-stack-preview {
                justify-content: center;
            }
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
          width: 100%;
          max-width: 100%; 
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
          overflow-x: auto; /* Allow horizontal scroll for code if needed */
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
      `}</style>
        </section>
    );
};

export default HeroDefault;
