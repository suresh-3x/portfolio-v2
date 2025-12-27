import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Globe, Cpu, Zap, Cloud } from 'lucide-react';

const HeroGrid = () => {
    return (
        <section className="hero-grid" id="home">
            <div className="bento-grid">
                <motion.div
                    className="bento-card bio-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1>SURESH BHANDARI</h1>
                    <p>Full-Stack Engineer & System Architect</p>
                </motion.div>

                <motion.div
                    className="bento-card tech-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="icon-grid">
                        <Database size={24} />
                        <Server size={24} />
                        <Globe size={24} />
                        <Cpu size={24} />
                        <Zap size={24} />
                        <Cloud size={24} />
                    </div>
                    <span>Stack</span>
                </motion.div>

                <motion.div
                    className="bento-card status-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="status-indicator">
                        <span className="dot"></span>
                        <span>ONLINE</span>
                    </div>
                    <div className="ping">12ms</div>
                </motion.div>

                <motion.div
                    className="bento-card exp-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <span className="big-num">10+</span>
                    <span className="label">Years Exp.</span>
                </motion.div>

                <motion.div
                    className="bento-card action-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 0.98 }}
                >
                    <a href="#projects">View Projects &rarr;</a>
                </motion.div>
            </div>

            <style>{`
            .hero-grid {
                min-height: 85vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: var(--spacing-xl);
            }

            .bento-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-template-rows: repeat(3, 160px);
                gap: 16px;
                width: 100%;
                max-width: 1000px;
            }

            .bento-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 20px;
                padding: 24px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                backdrop-filter: blur(10px);
            }

            .bio-card {
                grid-column: span 2;
                grid-row: span 2;
                justify-content: space-between;
                background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
            }

            .bio-card h1 {
                font-size: 2.5rem;
                line-height: 1;
                margin-bottom: 0.5rem;
                background: linear-gradient(to right, #fff, #aaa);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .tech-card {
                grid-column: span 1;
                grid-row: span 1;
                align-items: center;
            }

            .icon-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
                margin-bottom: 12px;
                color: var(--accent-primary);
            }

            .status-card {
                grid-column: span 1;
                grid-row: span 1;
                align-items: center;
                justify-content: space-between;
                flex-direction: row;
            }

            .status-indicator {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.8rem;
                font-weight: bold;
                color: #00ff9d;
            }

            .dot {
                width: 8px;
                height: 8px;
                background: #00ff9d;
                border-radius: 50%;
                box-shadow: 0 0 10px #00ff9d;
            }

            .exp-card {
                grid-column: span 1;
                grid-row: span 2;
                background: var(--accent-primary);
                color: black;
                align-items: center;
                text-align: center;
            }

            .big-num {
                font-size: 4rem;
                font-weight: 800;
                line-height: 1;
            }

            .label {
                font-weight: 600;
                opacity: 0.8;
            }

            .action-card {
                grid-column: span 1;
                grid-row: span 1;
                background: white;
                color: black;
                align-items: center;
                cursor: pointer;
            }

            .action-card a {
                color: black;
                text-decoration: none;
                font-weight: 700;
                font-size: 1.1rem;
            }

            @media (max-width: 768px) {
                .bento-grid {
                    display: flex;
                    flex-direction: column;
                    height: auto;
                }
                .bento-card {
                    min-height: 140px;
                }
            }
        `}</style>
        </section>
    );
};

export default HeroGrid;
