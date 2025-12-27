import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const HeroGlitch = () => {
    return (
        <section className="hero-glitch" id="home">
            <div className="glitch-container">
                <h1 className="glitch" data-text="SURESH BHANDARI">SURESH BHANDARI</h1>
                <div className="sub-glitch">
                    <span className="tag">BACKEND_OPS</span>
                    <span className="tag">SYSTEM_ARCH</span>
                    <span className="tag">NET_SEC</span>
                </div>

                <p className="mission-stat">
                    <Terminal size={14} className="icon" /> :: EXECUTING HIGH_PERFORMANCE PROTOCOLS...
                </p>

                <a href="#projects" className="cyber-btn">
                    INITIALIZE_PROJECTS
                    <span className="glitch-effect"></span>
                </a>
            </div>

            <style>{`
        .hero-glitch {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #050505;
          position: relative;
          overflow: hidden;
        }

        .hero-glitch::before {
            content: "";
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 2px, 3px 100%;
            pointer-events: none;
            z-index: 10;
        }

        .glitch-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 20;
        }

        .glitch {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 800;
            text-transform: uppercase;
            position: relative;
            color: white;
            letter-spacing: 0.05em;
            text-shadow: 2px 2px 0px var(--accent-primary), -2px -2px 0px var(--accent-secondary);
            animation: glitch-skew 1s infinite linear alternate-reverse;
        }

        .glitch::before, .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .glitch::before {
            left: 2px;
            text-shadow: -1px 0 #ff00c1;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        .glitch::after {
            left: -2px;
            text-shadow: -1px 0 #00fff9;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
        }

        .sub-glitch {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .tag {
            font-family: var(--font-mono);
            color: var(--accent-primary);
            font-size: 0.9rem;
            border: 1px solid var(--accent-primary);
            padding: 4px 12px;
            background: rgba(0, 255, 157, 0.1);
        }

        .mission-stat {
            font-family: var(--font-mono);
            color: var(--text-secondary);
            margin-top: 3rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .cyber-btn {
            margin-top: 3rem;
            padding: 1.2rem 3rem;
            background: transparent;
            border: 2px solid var(--text-primary);
            color: var(--text-primary);
            font-family: var(--font-mono);
            font-weight: bold;
            text-transform: uppercase;
            position: relative;
            transition: all 0.2s;
            cursor: pointer;
            text-decoration: none;
        }

        .cyber-btn:hover {
            background: var(--text-primary);
            color: black;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        @keyframes glitch-anim {
            0% { clip: rect(32px, 9999px, 83px, 0); }
            20% { clip: rect(4px, 9999px, 88px, 0); }
            40% { clip: rect(52px, 9999px, 63px, 0); }
            60% { clip: rect(10px, 9999px, 8px, 0); }
            80% { clip: rect(93px, 9999px, 14px, 0); }
            100% { clip: rect(7px, 9999px, 63px, 0); }
        }

        @keyframes glitch-anim2 {
            0% { clip: rect(2px, 9999px, 8px, 0); }
            20% { clip: rect(84px, 9999px, 3px, 0); }
            40% { clip: rect(2px, 9999px, 88px, 0); }
            60% { clip: rect(32px, 9999px, 2px, 0); }
            80% { clip: rect(1px, 9999px, 73px, 0); }
            100% { clip: rect(48px, 9999px, 2px, 0); }
        }
      `}</style>
        </section>
    );
};

export default HeroGlitch;
