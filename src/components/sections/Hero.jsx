import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Database, Cloud, Layout, FileText, Zap, Wind, Server, Triangle, Smartphone, Layers, Code, Palette, Cpu, Globe, Box, Container, Hexagon, Atom, Compass } from 'lucide-react';
import Card from '../ui/Card';

const Hero = ({ highlightColor }) => {
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
            Suresh <span className="highlight" style={{ color: highlightColor }}>Bhandari</span>
          </h1>

          <div className="role-container">
            <span className="role-text">Full-Stack Engineer</span>
            <span className="separator">//</span>
            <span className="role-text muted highlight" style={{ color: highlightColor }}>Polymath</span>
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
          <div className="system-blade-container">
            <div className="system-blade">
              {/* Visual Header / System Status */}
              <div className="blade-header">
                <div className="blade-id">CORE_ENGINE // v2.5</div>
                <div className="blade-status">
                  <span className="status-dot pulsing"></span>
                  SYSTEM_ACTIVE
                </div>
              </div>

              {/* Module 01: Backend */}
              <div className="blade-module" style={{ '--accent': 'var(--accent-primary)' }}>
                <div className="module-indicator"></div>
                <div className="module-icon-container">
                  <Server size={22} strokeWidth={1.5} />
                </div>
                <div className="module-content">
                  <div className="module-head">
                    <span className="module-title">BACKEND</span>
                  </div>
                  <div className="module-tags">
                    <span><Terminal size={10} /> Python</span>
                    <span><Cpu size={10} /> Go</span>
                    <span><Hexagon size={10} /> Node</span>
                  </div>
                </div>
                <div className="module-specs">01 // TRC</div>
              </div>

              {/* Module 02: Data */}
              <div className="blade-module" style={{ '--accent': 'var(--accent-tertiary)' }}>
                <div className="module-indicator"></div>
                <div className="module-icon-container">
                  <Database size={22} strokeWidth={1.5} />
                </div>
                <div className="module-content">
                  <div className="module-head">
                    <span className="module-title">DATA</span>
                  </div>
                  <div className="module-tags">
                    <span><Database size={10} /> Postgres</span>
                    <span><Zap size={10} /> Redis</span>
                  </div>
                </div>
                <div className="module-specs">02 // STR</div>
              </div>

              {/* Module 03: Infra */}
              <div className="blade-module" style={{ '--accent': 'var(--accent-primary)' }}>
                <div className="module-indicator"></div>
                <div className="module-icon-container">
                  <Cloud size={22} strokeWidth={1.5} />
                </div>
                <div className="module-content">
                  <div className="module-head">
                    <span className="module-title">INFRASTRUCTURE</span>
                  </div>
                  <div className="module-tags">
                    <span><Cloud size={10} /> AWS</span>
                    <span><Compass size={10} /> K8s</span>
                    <span><Box size={10} /> Docker</span>
                  </div>
                </div>
                <div className="module-specs">03 // CLD</div>
              </div>

              {/* Module 04: Interface */}
              <div className="blade-module" style={{ '--accent': 'var(--accent-tertiary)' }}>
                <div className="module-indicator"></div>
                <div className="module-icon-container">
                  <Layout size={22} strokeWidth={1.5} />
                </div>
                <div className="module-content">
                  <div className="module-head">
                    <span className="module-title">INTERFACE</span>
                  </div>
                  <div className="module-tags">
                    <span><Atom size={10} /> React</span>
                    <span><Zap size={10} /> Next.js</span>
                  </div>
                </div>
                <div className="module-specs">04 // VWS</div>
              </div>

              {/* Blade Footer / Logic Traces */}
              <div className="blade-footer">
                <div className="logic-spine"></div>
                <div className="logic-values">
                  <span>HEALTH: OPTIMAL</span>
                  <span>MTTF: 99.9%</span>
                </div>
              </div>
            </div>

            {/* Architectural Shadow / Depth */}
            <div className="blade-aura"></div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100svh;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
          padding: 8rem 0;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          max-width: 1200px;
          width: 100%;
          align-items: center;
          z-index: 2;
        }

        .system-blade-container {
            position: relative;
            width: 100%;
            max-width: 420px;
            margin-left: auto;
            perspective: 1200px;
        }

        .system-blade {
            background: rgba(var(--text-primary-rgb), 0.02);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            backdrop-filter: blur(20px);
            overflow: hidden;
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.1);
            transform: rotateY(-10deg) rotateX(2deg);
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            width: 100%;
        }

        .system-blade:hover {
            transform: rotateY(-2deg) rotateX(0deg);
        }

        .blade-header {
            padding: 12px 20px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(var(--text-primary-rgb), 0.03);
        }

        .blade-id {
            font-family: var(--font-mono);
            font-size: 0.6rem;
            font-weight: 700;
            color: var(--text-secondary);
            opacity: 0.5;
            letter-spacing: 1px;
        }

        .blade-status {
            font-family: var(--font-mono);
            font-size: 0.6rem;
            color: var(--accent-secondary);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .status-dot.pulsing {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--accent-secondary);
            box-shadow: 0 0 10px var(--accent-secondary);
            animation: pulse-simple 2s infinite;
        }

        @keyframes pulse-simple {
            0% { opacity: 0.4; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.4; transform: scale(0.8); }
        }

        .blade-module {
            display: flex;
            align-items: flex-start;
            padding: 1.5rem 20px;
            border-bottom: 1px solid var(--border-color);
            position: relative;
            transition: background 0.3s ease;
        }

        .blade-module:last-of-type {
            border-bottom: none;
        }

        .blade-module:hover {
            background: rgba(var(--text-primary-rgb), 0.01);
        }

        .module-indicator {
            position: absolute;
            left: 0;
            top: 1.5rem;
            width: 3px;
            height: 32px;
            background: var(--accent);
            opacity: 0.6;
            box-shadow: 0 0 10px var(--accent);
        }

        .module-icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background: rgba(var(--text-primary-rgb), 0.03);
            border-radius: 8px;
            color: var(--accent);
            opacity: 0.8;
            flex-shrink: 0;
        }

        .module-content {
            flex-grow: 1;
            padding-left: 1.25rem;
        }

        .module-head {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
        }

        .module-icon {
            opacity: 0.4;
            color: var(--accent);
        }

        .module-title {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 800;
            letter-spacing: 2px;
            color: var(--text-primary);
        }

        .module-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .module-tags span {
            display: flex;
            align-items: center;
            gap: 4px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-secondary);
            padding: 1px 6px;
            border: 1px solid var(--border-color);
            border-radius: 2px;
            opacity: 0.7;
        }

        .module-specs {
            font-family: var(--font-mono);
            font-size: 0.55rem;
            color: var(--text-muted);
            opacity: 0.4;
            transform: rotate(-90deg);
            transform-origin: right top;
            position: absolute;
            right: 15px;
            top: 2.2rem;
            white-space: nowrap;
        }

        .blade-footer {
            padding: 15px 20px;
            background: rgba(var(--text-primary-rgb), 0.04);
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .logic-spine {
            height: 1px;
            background: linear-gradient(to right, var(--accent-primary), transparent);
            opacity: 0.2;
        }

        .logic-values {
            display: flex;
            justify-content: space-between;
            font-family: var(--font-mono);
            font-size: 0.55rem;
            color: var(--text-muted);
            letter-spacing: 1px;
        }

        .blade-aura {
            position: absolute;
            inset: -40px;
            background: radial-gradient(circle at center, rgba(var(--accent-primary-rgb), 0.05) 0%, transparent 70%);
            z-index: -1;
            pointer-events: none;
        }

        @media (max-width: 1024px) {
            .hero-container {
                grid-template-columns: 1fr;
                gap: 3rem;
                text-align: center;
            }
            .hero-content {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .system-blade-container {
                max-width: 500px;
                margin: 3rem auto 0;
            }
            .system-blade {
                transform: none !important;
            }
        }

        @media (max-width: 480px) {
            .hero-section {
                padding: 6rem 0 4rem;
            }
            h1 {
                font-size: 2.75rem;
                letter-spacing: -2px;
            }
            .role-container {
                font-size: 1.1rem;
                gap: 10px;
            }
            .system-blade-container {
                transform: scale(0.95);
                margin-top: 2rem;
            }
            .blade-module {
                padding: 1rem 12px;
            }
            .module-icon-container {
                width: 36px;
                height: 36px;
            }
            .module-icon-container svg {
                width: 18px;
                height: 18px;
            }
            .module-specs {
                display: none;
            }
        }
        
        .icon-box-hero {
            display: none; /* Replaced by dashboard */
        }

        .stack-info {
            display: none;
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
          gap: 1.25rem;
          width: 100%;
          max-width: 540px;
        }

        .stack-card {
           padding: 0 !important;
           width: 100% !important;
           min-height: 160px;
           height: 100% !important;
           display: flex !important;
           background: rgba(var(--text-primary-rgb), 0.02) !important;
           border: 1px solid var(--border-color) !important;
           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
           position: relative;
           overflow: hidden;
        }

        .stack-card:hover {
          transform: translateY(-8px) !important;
          background: rgba(var(--text-primary-rgb), 0.04) !important;
          border-color: var(--accent-primary) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }

        .card-pattern {
          position: absolute;
          inset: 0;
          pointer-events: none;
          color: var(--accent-primary);
          opacity: 0.5;
        }

        .card-inner-box {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 1.75rem;
          height: 100%;
          width: 100%;
          justify-content: space-between;
          position: relative;
          z-index: 2;
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
          background: var(--accent-secondary);
          border-radius: 50%;
          box-shadow: 0 0 12px var(--accent-secondary);
          animation: pulse 2s infinite;
        }

        /* ... existing H1 etc ... */

        /* Add hover effect to stack cards by targeting them via wrapper if possible, or just the card class */
        /* Since .stack-card is a component class, we can target it in global CSS or here if it renders as a class */
        /* Assuming Card component passes className 'stack-card' to the DOM element */
        
        .stack-card {
           padding: 0 !important;
           width: 100% !important;
           min-height: 130px;
           height: auto !important;
           border-radius: 4px !important;
           background: var(--card-bg) !important;
           backdrop-filter: blur(var(--glass-blur)) !important;
           transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease !important;
           border: 1px solid var(--border-color);
           will-change: transform;
        }

        .stack-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
            border-color: var(--accent-primary);
        }

        h1 {
          font-size: 6rem;
          font-weight: 800;
          line-height: 0.85;
          letter-spacing: -4px;
          margin-bottom: 1.5rem;
        }

        .highlight {
          transition: color 0.5s ease;
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
            gap: 2.5rem; /* Reduced from 3rem */
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          h1 { font-size: 3.5rem; } /* Slightly smaller for better fit */
          .bio-text { margin: 0 auto 2rem; font-size: 1.1rem; }
          .hero-visual { width: 100%; display: flex; justify-content: center; }
          .action-row { justify-content: center; width: 100%; max-width: 480px; }
          .stack-assembler { max-width: 100%; } /* Use more space */
          .card-inner-box { align-items: center; text-align: center; padding: 1.5rem; }
          .stack-tags { justify-content: center; }
        }

        @media (max-width: 500px) {
          .hero-section { 
            padding: 8rem 0 4rem;
            min-height: 100dvh;
            align-items: flex-start;
          }
          h1 { 
            font-size: 2.1rem; 
            letter-spacing: -0.5px; 
            line-height: 1.1; 
            margin-bottom: 1.25rem; 
          } 
          .role-container { 
            font-size: 0.9rem; 
            flex-wrap: wrap; 
            justify-content: center; 
            gap: 6px; 
            margin-bottom: 1.75rem; 
          }
          .separator { display: none; }
          .bio-text { 
            font-size: 0.95rem; 
            margin-bottom: 2rem; 
            padding: 0 1rem;
          }
          .action-row { 
            flex-direction: column; 
            width: 100%; 
            gap: 1rem; 
            padding: 0 1rem;
          }
          .primary-btn, .secondary-btn { 
            width: 100%; 
            justify-content: center; 
            height: 52px; 
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
