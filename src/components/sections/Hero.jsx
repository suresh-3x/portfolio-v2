import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Database, Cloud, Layout, Sun, Moon, Circle, FileText, Settings, Cpu, Code, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Card from '../ui/Card';

const Hero = () => {
  const { theme, setTheme, mode, setMode } = useTheme();

  const handleModeToggle = () => {
    const newMode = mode === 'system' ? 'ambient' : 'system';
    setMode(newMode);
    // Automatically switch to the first theme of the new mode
    if (newMode === 'ambient') {
      setTheme('dawn');
    } else {
      setTheme('dusk');
    }
  };

  // Theme Switcher Component
  // const ThemeSwitcher = () => (
  //   <div className="dual-theme-container">
  //     {/* Left Type Toggle */}
  //     <div className="mode-selector">
  //       <button
  //         onClick={handleModeToggle}
  //         className={`mode-btn ${mode === 'ambient' ? 'ambient-active' : 'system-active'}`}
  //         title={mode === 'ambient' ? "Switch to System Precision" : "Switch to Ambient Comfort"}
  //       >
  //         {mode === 'ambient' ? <Zap size={18} /> : <Cpu size={18} />}
  //         <span className="mode-label-hint">{mode === 'ambient' ? 'AMBIENT' : 'SYSTEM'}</span>
  //       </button>
  //     </div>

  //     <div className="vertical-divider"></div>

  //     {/* Right Theme Selector */}
  //     <div className="theme-options">
  //       <AnimatePresence mode="wait">
  //         {mode === 'ambient' ? (
  //           <motion.div
  //             key="ambient-themes"
  //             initial={{ opacity: 0, x: 10 }}
  //             animate={{ opacity: 1, x: 0 }}
  //             exit={{ opacity: 0, x: -10 }}
  //             className="option-group"
  //           >
  //             <button
  //               onClick={() => setTheme('dawn')}
  //               className={`option-btn ${theme === 'dawn' ? 'active' : ''}`}
  //               title="Dawn (Mist)"
  //             >
  //               <Sun size={18} />
  //             </button>
  //             <button
  //               onClick={() => setTheme('dusk')}
  //               className={`option-btn ${theme === 'dusk' ? 'active' : ''}`}
  //               title="Dusk (Twilight)"
  //             >
  //               <Circle size={14} fill={theme === 'dusk' ? 'currentColor' : 'none'} />
  //             </button>
  //           </motion.div>
  //         ) : (
  //           <motion.div
  //             key="system-themes"
  //             initial={{ opacity: 0, x: 10 }}
  //             animate={{ opacity: 1, x: 0 }}
  //             exit={{ opacity: 0, x: -10 }}
  //             className="option-group"
  //           >
  //             <button
  //               onClick={() => setTheme('rgb')}
  //               className={`option-btn ${theme === 'rgb' ? 'active' : ''}`}
  //               title="RGB (Precision)"
  //             >
  //               <div className="rgb-indicator"></div>
  //             </button>
  //             <button
  //               onClick={() => setTheme('monochrome')}
  //               className={`option-btn ${theme === 'monochrome' ? 'active' : ''}`}
  //               title="Monochrome (Industrial)"
  //             >
  //               <Code size={18} />
  //             </button>
  //           </motion.div>
  //         )}
  //       </AnimatePresence>
  //     </div>
  //   </div>
  // );

  const ThemeSwitcher = () => (
    <></>
  );

  return (
    <section className="hero-section" id="home">
      <ThemeSwitcher />

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
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Card
                className="stack-card"
                showStrip={true}
                noPadding={true}
                style={{
                  '--accent-primary': 'var(--accent-primary)',
                  borderRadius: '4px'
                }}
              >
                <div className="card-inner-box">
                  <Terminal size={24} className="stack-icon" style={{ color: 'var(--accent-primary)' }} />
                  <div className="stack-info">
                    <h3>Backend</h3>
                    <p>Python, Go, Node</p>
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
                  '--accent-primary': 'var(--accent-tertiary)',
                  borderRadius: '4px'
                }}
              >
                <div className="card-inner-box">
                  <Database size={24} className="stack-icon" style={{ color: 'var(--accent-primary)' }} />
                  <div className="stack-info">
                    <h3>Data</h3>
                    <p>Postgres, Redis</p>
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
                  '--accent-primary': 'var(--accent-secondary)',
                  borderRadius: '4px'
                }}
              >
                <div className="card-inner-box">
                  <Cloud size={24} className="stack-icon" style={{ color: 'var(--accent-primary)' }} />
                  <div className="stack-info">
                    <h3>Infrastructure</h3>
                    <p>AWS, K8s, Docker</p>
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
                  '--accent-primary': 'var(--accent-tertiary)',
                  borderRadius: '4px'
                }}
              >
                <div className="card-inner-box">
                  <Layout size={24} className="stack-icon" style={{ color: 'var(--accent-primary)' }} />
                  <div className="stack-info">
                    <h3>Interface</h3>
                    <p>React, Next.js</p>
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

        /* Dual Theme Toggle Styles */
        .dual-theme-container {
          position: fixed;
          top: 2rem;
          right: 2rem;
          display: flex;
          align-items: center;
          background: var(--card-bg);
          backdrop-filter: blur(var(--glass-blur));
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-soft);
          z-index: 1000;
          gap: 16px;
        }

        .mode-selector {
          display: flex;
          align-items: center;
        }

        .mode-btn {
          background: none;
          border: none;
          padding: 8px 12px;
          border-radius: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: var(--text-secondary);
        }

        .mode-label-hint {
            font-family: var(--font-mono);
            font-size: 0.65rem;
            font-weight: 800;
            letter-spacing: 1px;
            opacity: 0.8;
        }

        .mode-btn.ambient-active {
            color: #5a78af;
            background: rgba(90, 120, 175, 0.1);
        }

        .mode-btn.system-active {
            color: var(--accent-primary);
            background: rgba(var(--accent-primary-rgb), 0.1);
        }

        .vertical-divider {
            width: 1px;
            height: 24px;
            background: var(--border-color);
        }

        .theme-options {
            display: flex;
            align-items: center;
            min-width: 100px;
        }

        .option-group {
            display: flex;
            gap: 10px;
        }

        .option-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .option-btn.active {
          background: var(--bg-primary-color);
          color: var(--accent-primary);
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .rgb-indicator {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
            border: 1px solid rgba(255,255,255,0.2);
        }

        .system-status {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-primary);
          margin-bottom: 2rem;
          background: rgba(var(--accent-primary-rgb), 0.1);
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid rgba(var(--accent-primary-rgb), 0.2);
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
          color: var(--accent-primary);
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
          color: var(--accent-primary);
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
        }

        .primary-btn:hover {
          transform: translateY(-3px);
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 15px 40px rgba(var(--accent-primary-rgb), 0.3);
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
        }

        .secondary-btn:hover {
          background: var(--bg-secondary);
          border-color: var(--text-primary);
          transform: translateY(-2px);
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

        .card-inner-box {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 1.5rem;
          height: 100%;
        }

        .stack-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
          opacity: 0.9;
        }

        .stack-info h3 {
          margin: 0 0 4px 0;
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          text-transform: uppercase;
          font-family: var(--font-mono);
        }

        .stack-info p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-secondary);
          opacity: 0.8;
          font-family: var(--font-mono);
          line-height: 1.4;
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

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 4rem;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .bio-text { margin: 0 auto 3rem; }
          .hero-visual { width: 100%; display: flex; justify-content: center; }
          .action-row { justify-content: center; }
          .stack-assembler { max-width: 500px; }
        }

        @media (max-width: 600px) {
          h1 { font-size: 3.5rem; letter-spacing: -2px; }
          .role-container { font-size: 1.2rem; flex-direction: column; gap: 8px; }
          .separator { display: none; }
          .stack-assembler { grid-template-columns: 1fr; width: 100%; max-width: 350px; }
          .action-row { flex-direction: column; width: 100%; }
          .primary-btn, .secondary-btn { width: 100%; justify-content: center; }
          .hero-section { padding: 6rem 1rem; }
          .dual-theme-container { top: 1rem; right: 1rem; padding: 4px 8px; zoom: 0.9; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
