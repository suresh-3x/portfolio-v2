import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Database, Cloud, Layout, FileText, Zap, Wind, Server, Triangle, Smartphone, Layers, Code, Palette, Cpu, Globe, Box, Container } from 'lucide-react';
import Card from '../ui/Card';

const Hero = () => {

  const getTechIcon = (tag) => {
    const size = 10;
    switch (tag.toLowerCase()) {
      case 'python': return <Code size={size} />;
      case 'go': return <Terminal size={size} />;
      case 'node': return <Server size={size} />;
      case 'postgres': return <Database size={size} />;
      case 'redis': return <Layers size={size} />;
      case 'aws': return <Cloud size={size} />;
      case 'k8s': return <Box size={size} />;
      case 'docker': return <Container size={size} />;
      case 'react': return <Code size={size} />; // React specific if available or Code
      case 'next.js': return <Zap size={size} />;
      default: return <Code size={size} />;
    }
  };

  const renderStackTags = (tags) => (
    <div className="stack-tags">
      {tags.map((tag, idx) => (
        <span key={idx} className="stack-tag">
          {getTechIcon(tag)}
          {tag}
        </span>
      ))}
    </div>
  );

  return (
    <section className="hero-section" id="home">

      <div className="hero-container">
        {/* Left: Narrative */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="system-status">
            <span className="status-dot"></span>
            <span className="status-text">System Online</span>
          </div>

          <h1>
            Suresh <span className="highlight">Bhandari</span>
          </h1>

          <div className="role-container">
            <span className="role-text">Full-Stack Engineer</span>
            <span className="separator">//</span>
            <span className="role-text muted">Polymath</span>
          </div>

          <p className="bio-text">
            Architecting high-performance, scalable systems.
            Merging engineering precision with creative problem solving.
          </p>

          <div className="action-row">
            <a href="#projects" className="primary-btn">
              Explore Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="secondary-btn">
              Contact Me <FileText size={18} />
            </a>
          </div>
        </motion.div>

        {/* Right: Visual Stack */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stack-assembler">
            {/* Backend */}
            <motion.div
              className="stack-card-wrapper backend"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Card
                className="stack-card"
                showStrip={true}
                noPadding={true}
                style={{
                  borderRadius: '4px'
                }}
              >
                <div className="card-inner-box">
                  <div className="icon-box-hero" style={{ color: 'var(--accent-primary)' }}>
                    <Terminal size={24} />
                  </div>
                  <div className="stack-info">
                    <h3>Backend</h3>
                    {renderStackTags(['Python', 'Go', 'Node'])}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Data */}
            <motion.div
              className="stack-card-wrapper data"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Card
                className="stack-card"
                showStrip={true}
                noPadding={true}
                style={{
                  '--accent-primary': 'var(--accent-tertiary)', // Blue (Right Col)
                  borderRadius: '4px'
                }}
              >
                <div className="card-inner-box">
                  <div className="icon-box-hero" style={{ color: 'var(--accent-primary)' }}>
                    <Database size={24} />
                  </div>
                  <div className="stack-info">
                    <h3>Data</h3>
                    {renderStackTags(['Postgres', 'Redis'])}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Infrastructure */}
            <motion.div
              className="stack-card-wrapper cloud"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Card
                className="stack-card"
                showStrip={true}
                noPadding={true}
                style={{
                  borderRadius: '4px'
                }}
              >
                <div className="card-inner-box">
                  <div className="icon-box-hero" style={{ color: 'var(--accent-primary)' }}>
                    <Cloud size={24} />
                  </div>
                  <div className="stack-info">
                    <h3>Infrastructure</h3>
                    {renderStackTags(['AWS', 'K8s', 'Docker'])}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Interface */}
            <motion.div
              className="stack-card-wrapper frontend"
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <Card
                className="stack-card"
                showStrip={true}
                noPadding={true}
                style={{
                  '--accent-primary': 'var(--accent-tertiary)', // Blue (Right Col)
                  borderRadius: '4px'
                }}
              >
                <div className="card-inner-box">
                  <div className="icon-box-hero" style={{ color: 'var(--accent-primary)' }}>
                    <Layout size={24} />
                  </div>
                  <div className="stack-info">
                    <h3>Interface</h3>
                    {renderStackTags(['React', 'Next.js'])}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
          padding: 8rem 2rem;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          max-width: 1400px;
          width: 100%;
          align-items: center;
          z-index: 2;
        }

        .card-inner-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 2rem;
          height: 100%;
          text-align: center;
        }
        
        .icon-box-hero {
            margin-bottom: 4px;
            margin-top: 0;
            flex-shrink: 0;
        }

        .stack-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            width: 100%;
        }

        .stack-info h3 {
          margin: 0 0 8px 0;
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-family: var(--font-mono);
        }

        .stack-tags {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px;
        }

        .stack-tag {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-secondary);
            background: rgba(var(--bg-primary-rgb), 0.5);
            padding: 4px 8px;
            border-radius: 4px;
            border: 1px solid var(--border-color);
            line-height: 1;
            white-space: nowrap;
        }
        
        .stack-tag svg {
            opacity: 0.8;
            color: var(--text-primary);
        }

        .stack-assembler {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 540px;
        }

        .stack-card {
           padding: 0 !important;
           width: 100% !important;
           min-height: 130px;
           height: auto !important;
           border-radius: 4px !important;
           background: var(--card-bg) !important;
           backdrop-filter: blur(var(--glass-blur)) !important;
        }

        .stack-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
          opacity: 0.9;
        }

        .stack-info p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-secondary);
          opacity: 0.8;
          font-family: var(--font-mono);
          line-height: 1.4;
        }

        .system-status {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-secondary);
          margin-bottom: 2rem;
          background: rgba(var(--accent-secondary-rgb), 0.1);
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid rgba(var(--accent-secondary-rgb), 0.2);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: currentColor;
          border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
          animation: pulse 2s infinite;
        }

        h1 {
          font-size: 6rem;
          font-weight: 800;
          line-height: 0.85;
          letter-spacing: -4px;
          margin-bottom: 1.5rem;
        }

        .highlight {
          color: var(--accent-secondary);
        }

        .role-container {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 1.75rem;
          font-weight: 500;
          margin-bottom: 2rem;
          font-family: var(--font-mono);
        }

        .separator {
          color: var(--accent-secondary);
          opacity: 0.5;
        }

        .muted {
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .bio-text {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 580px;
          margin-bottom: 3rem;
        }

        .action-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .primary-btn {
          background: var(--text-primary);
          color: var(--bg-primary-color);
          height: 56px;
          padding: 0 2rem;
          border-radius: 4px;
          font-weight: 800;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          text-decoration: none;
        }

        .primary-btn:hover {
          transform: translateY(-3px);
          background: var(--accent-secondary);
          color: white;
          box-shadow: 0 15px 40px rgba(var(--accent-secondary-rgb), 0.3);
        }

        .secondary-btn {
          height: 56px;
          padding: 0 2rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          transition: all 0.3s;
          background: transparent;
          text-decoration: none;
        }

        .secondary-btn:hover {
          background: var(--bg-secondary);
          border-color: var(--text-primary);
          transform: translateY(-2px);
        }

        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 1200px) {
           h1 { font-size: 5rem; }
           .hero-container { gap: 3rem; }
        }

        @media (max-width: 968px) {
           /* Adjusted breakpoint for tablet/small laptop */
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h1 { font-size: 4rem; }
          .bio-text { margin: 0 auto 3rem; }
          .hero-visual { width: 100%; display: flex; justify-content: center; }
          .action-row { justify-content: center; }
          .stack-assembler { max-width: 500px; }
          .card-inner-box { align-items: center; text-align: center; }
          .stack-tags { justify-content: center; }
        }

        @media (max-width: 500px) {
          h1 { font-size: 3rem; letter-spacing: -2px; }
          .role-container { font-size: 1.2rem; flex-direction: column; gap: 8px; }
          .separator { display: none; }
          /* Keep stack assembler as 2 cols if possible, swapping to 1 only if very narrow */
          .stack-assembler { grid-template-columns: 1fr; width: 100%; max-width: 350px; }
          .action-row { flex-direction: column; width: 100%; }
          .primary-btn, .secondary-btn { width: 100%; justify-content: center; }
          .hero-section { padding: 6rem 1rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
