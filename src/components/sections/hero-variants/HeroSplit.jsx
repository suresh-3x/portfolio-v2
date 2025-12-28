import React from 'react';
import { motion } from 'framer-motion';

const HeroSplit = () => {
    return (
        <section className="hero-split" id="home">
            <div className="split-left">
                <motion.div
                    className="content-wrapper"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="mono-tag">01 // WELCOME</span>
                    <h1>Engineering<br />The Future</h1>
                    <p>Specialized in robust backend systems and high-scale architecture.</p>
                    <button className="primary-btn">Start Project</button>
                </motion.div>
            </div>

            <div className="split-right">
                <div className="image-overlay"></div>
                {/* Visual pattern or image would go here */}
                <div className="abstract-shape"></div>
            </div>

            <style>{`
            .hero-split {
                min-height: 100vh;
                display: grid;
                grid-template-columns: 1fr 1fr;
                position: relative;
            }

            .split-left {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 4rem;
                background: var(--bg-primary);
            }

            .content-wrapper {
                max-width: 500px;
            }

            .mono-tag {
                font-family: var(--font-mono);
                color: var(--accent-secondary);
                font-size: 0.9rem;
                display: block;
                margin-bottom: 1.5rem;
            }

            h1 {
                font-size: 4.5rem;
                line-height: 1;
                margin-bottom: 1.5rem;
                letter-spacing: -2px;
            }

            .split-left p {
                font-size: 1.1rem;
                color: var(--text-secondary);
                margin-bottom: 2.5rem;
                max-width: 400px;
                line-height: 1.6;
            }

            .primary-btn {
                background: white;
                color: black;
                border: none;
                padding: 1rem 2.5rem;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                border-radius: 4px;
                transition: transform 0.2s;
            }

            .primary-btn:hover {
                transform: scale(1.05);
            }

            .split-right {
                background: var(--bg-secondary);
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .abstract-shape {
                width: 300px;
                height: 300px;
                background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                filter: blur(60px);
                animation: morph 8s ease-in-out infinite;
                opacity: 0.4;
            }

            @keyframes morph {
                0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
                100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            }

            @media (max-width: 768px) {
                .hero-split {
                    grid-template-columns: 1fr;
                    min-height: auto;
                }
                .split-right {
                    height: 300px;
                    order: -1;
                }
                .split-left {
                    padding: 2rem;
                }
                h1 {
                    font-size: 3rem;
                }
            }
        `}</style>
        </section>
    );
};

export default HeroSplit;
