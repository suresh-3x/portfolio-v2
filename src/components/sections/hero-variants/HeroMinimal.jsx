import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroMinimal = () => {
  return (
    <section className="hero-minimal" id="home">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="minimal-content"
      >
        <span className="overline">Architecture • Systems • Scale</span>
        <h1>
          Suresh <br />
          <span className="hollow">Bhandari</span>
        </h1>
        <p className="intro">
          I build the digital infrastructure that powers global businesses.
          <br />
          Backend Expert. Polymath. Engineer.
        </p>

        <div className="links">
          <a href="#projects" className="link-item">View Work</a>
          <a href="#contact" className="link-item">Get in Touch <ArrowRight size={16} /></a>
        </div>
      </motion.div>

      <style>{`
        .hero-minimal {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: var(--spacing-2xl) 0;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        .hero-minimal::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
            z-index: 0;
            pointer-events: none;
        }

        .minimal-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .overline {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          letter-spacing: 4px;
          color: var(--accent-primary);
          text-transform: uppercase;
        }

        h1 {
          font-size: clamp(4rem, 12vw, 8rem);
          line-height: 0.9;
          font-weight: 900;
          letter-spacing: -3px;
          margin: 0;
        }

        .hollow {
          -webkit-text-stroke: 2px var(--text-primary);
          color: transparent;
          transition: all 0.5s ease;
        }
        
        .hollow:hover {
          color: var(--accent-primary);
          -webkit-text-stroke: 2px var(--accent-primary);
        }

        .intro {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 600px;
        }

        .links {
          display: flex;
          gap: 3rem;
          margin-top: 2rem;
        }

        .link-item {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--text-primary);
          text-decoration: none;
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .link-item::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0%;
          height: 1px;
          background: var(--accent-primary);
          transition: width 0.3s ease;
        }

        .link-item:hover::after {
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default HeroMinimal;
