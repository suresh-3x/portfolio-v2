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
    </section>
  );
};

export default Hero;
