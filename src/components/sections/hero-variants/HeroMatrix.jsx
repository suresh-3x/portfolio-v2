import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Cpu, Network } from 'lucide-react';

const HeroMatrix = () => {
    return (
        <section className="hero-clean" id="home">
            <div className="clean-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="status-pill">
                        <span className="dot"></span>
                        System Online
                    </div>
                    <h1>
                        <span className="mono-heading">{'<Architect />'}</span><br />
                        Suresh Bhandari
                    </h1>
                    <p className="description">
                        Designing the invisible infrastructure that powers the visible world.
                        Specialized in distributed systems, high-scale engineering, and backend performance.
                    </p>

                    <div className="action-row">
                        <a href="#projects" className="btn-primary">View Architecture</a>
                        <a href="#contact" className="btn-ghost">Contact Me</a>
                    </div>
                </motion.div>
            </div>

            <div className="clean-visual">
                <div className="code-block-wrapper">
                    <div className="window-header">
                        <div className="window-dot red"></div>
                        <div className="window-dot yellow"></div>
                        <div className="window-dot green"></div>
                        <span className="window-title">system_core.ts</span>
                    </div>
                    <div className="code-content">
                        <div className="line"><span className="keyword">class</span> <span className="class-name">SystemArchitect</span> <span className="keyword">implements</span> <span className="interface">Polymath</span> {'{'}</div>
                        <div className="line indent-1"><span className="keyword">public</span> <span className="property">experience</span>: <span className="type">number</span> = <span className="number">10</span>;</div>
                        <div className="line indent-1"><span className="keyword">public</span> <span className="property">skills</span>: <span className="type">string</span>[] = [</div>
                        <div className="line indent-2"><span className="string">'Distributed Systems'</span>,</div>
                        <div className="line indent-2"><span className="string">'Microservices'</span>,</div>
                        <div className="line indent-2"><span className="string">'Cloud Native'</span></div>
                        <div className="line indent-1">];</div>
                        <div className="line">{'}'}</div>
                    </div>
                    <div className="glow-effect"></div>
                </div>
            </div>

            <style>{`
                .hero-clean {
                    min-height: 90vh;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    gap: 4rem;
                    padding: var(--spacing-xl) 0;
                    margin: 0 auto;
                    max-width: 1200px;
                }

                .clean-content {
                    padding-left: 2rem;
                }

                .status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    background: rgba(0, 255, 157, 0.05);
                    border: 1px solid rgba(0, 255, 157, 0.2);
                    border-radius: 100px;
                    color: var(--accent-primary);
                    font-family: var(--font-mono);
                    font-size: 0.85rem;
                    margin-bottom: 2rem;
                }

                .status-pill .dot {
                    width: 6px;
                    height: 6px;
                    background: var(--accent-primary);
                    border-radius: 50%;
                    box-shadow: 0 0 8px var(--accent-primary);
                }

                h1 {
                    font-size: 4rem;
                    line-height: 1.1;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    letter-spacing: -1px;
                }

                .mono-heading {
                    font-family: var(--font-mono);
                    color: var(--accent-primary);
                    font-size: 2.5rem;
                    opacity: 0.9;
                }

                .description {
                    font-size: 1.15rem;
                    color: var(--text-secondary);
                    line-height: 1.7;
                    max-width: 500px;
                    margin-bottom: 2.5rem;
                }

                .action-row {
                    display: flex;
                    gap: 1rem;
                }

                .btn-primary {
                    background: var(--accent-primary);
                    color: black;
                    padding: 1rem 2rem;
                    border-radius: 6px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: transform 0.2s;
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                }

                .btn-ghost {
                    background: transparent;
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                    padding: 1rem 2rem;
                    border-radius: 6px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: background 0.2s;
                }

                .btn-ghost:hover {
                    background: rgba(255, 255, 255, 0.05);
                }

                /* Code Visual */
                .clean-visual {
                    display: flex;
                    justify-content: center;
                    perspective: 1000px;
                }

                .code-block-wrapper {
                    background: #0a0a0a;
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    padding: 0;
                    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.5);
                    width: 100%;
                    max-width: 500px;
                    position: relative;
                    overflow: hidden;
                    transform: rotateY(-5deg) rotateX(5deg);
                    transition: transform 0.4s ease;
                }

                .code-block-wrapper:hover {
                    transform: rotateY(0) rotateX(0);
                }

                .window-header {
                    background: #111;
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border-bottom: 1px solid var(--border-color);
                }

                .window-dot { width: 10px; height: 10px; border-radius: 50%; }
                .red { background: #ff5f56; }
                .yellow { background: #ffbd2e; }
                .green { background: #27c93f; }

                .window-title {
                    margin-left: 12px;
                    font-family: var(--font-mono);
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }

                .code-content {
                    padding: 24px;
                    font-family: var(--font-mono);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #d4d4d4;
                }

                .line { min-height: 1.5rem; }
                .indent-1 { padding-left: 1.5rem; }
                .indent-2 { padding-left: 3rem; }

                .keyword { color: #f97583; } /* Pink/Red */
                .class-name { color: #79b8ff; } /* Blue */
                .interface { color: var(--accent-primary); }
                .property { color: #b392f0; } /* Purple */
                .type { color: #79b8ff; }
                .string { color: #9ecbff; } /* Light Blue */
                .number { color: #79b8ff; }

                .glow-effect {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle at center, rgba(0, 255, 157, 0.05) 0%, transparent 50%);
                    pointer-events: none;
                }

                @media (max-width: 968px) {
                    .hero-clean {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 3rem;
                    }
                    .clean-content { padding-left: 0; padding: 0 1.5rem; }
                    .action-row { justify-content: center; }
                    .clean-visual { padding: 0 1.5rem; }
                }
            `}</style>
        </section>
    );
};

export default HeroMatrix;
