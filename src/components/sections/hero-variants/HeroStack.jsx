import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Globe, Cpu, Box, Layout, GitBranch, Terminal } from 'lucide-react';

const HeroStack = () => {
    return (
        <section className="hero-stack" id="home">
            <div className="stack-container">
                <div className="stack-info">
                    <div className="tag">
                        <Layers size={14} /> Full Stack Architecture
                    </div>
                    <h1>
                        Built With<br />
                        <span className="scrolling-text">Modern Tech</span>
                    </h1>
                    <p>
                        My engineering toolkit is optimized for performance, scalability, and developer experience.
                    </p>
                </div>

                <div className="stack-grid">
                    <div className="tech-box core">
                        <Terminal size={32} className="icon" />
                        <h3>Backend</h3>
                        <p>Python, Go, Node.js</p>
                    </div>
                    <div className="tech-box infra">
                        <Database size={32} className="icon" />
                        <h3>Data</h3>
                        <p>PostgreSQL, Redis</p>
                    </div>
                    <div className="tech-box cloud">
                        <CloudBox />
                    </div>
                    <div className="tech-box frontend">
                        <Layout size={32} className="icon" />
                        <h3>Frontend</h3>
                        <p>React, Next.js</p>
                    </div>
                    <div className="tech-box devops">
                        <GitBranch size={32} className="icon" />
                        <h3>DevOps</h3>
                        <p>Docker, K8s, CI/CD</p>
                    </div>
                </div>
            </div>

            <style>{`
                .hero-stack {
                    height: 100vh;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-primary);
                    overflow: hidden;
                    perspective: 1000px;
                }

                .stack-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    max-width: 1200px;
                    width: 100%;
                    padding: 2rem;
                    align-items: center;
                }

                .stack-info {
                    z-index: 10;
                }

                .tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: 100px;
                    color: var(--accent-secondary);
                    font-size: 0.9rem;
                    margin-bottom: 2rem;
                }

                .stack-info h1 {
                    font-size: 4.5rem;
                    line-height: 1;
                    margin-bottom: 1.5rem;
                    font-weight: 800;
                }

                .scrolling-text {
                    background: linear-gradient(to right, var(--accent-primary), var(--accent-secondary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .stack-info p {
                    font-size: 1.2rem;
                    color: var(--text-secondary);
                    max-width: 450px;
                    line-height: 1.6;
                }

                .stack-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    transform: rotateY(-10deg) rotateX(5deg);
                }

                .tech-box {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    padding: 2rem;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .tech-box:hover {
                    transform: translateY(-5px) scale(1.02);
                    border-color: var(--accent-primary);
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }

                .core { border-left: 3px solid var(--accent-primary); }
                .infra { border-left: 3px solid var(--accent-secondary); }
                .frontend { border-left: 3px solid #ff0055; }
                .devops { border-left: 3px solid #ffbd2e; grid-column: span 2; }
                
                /* Special Cloud Box */
                .cloud {
                    grid-column: span 2;
                    background: linear-gradient(135deg, rgba(0, 255, 157, 0.05), rgba(0, 0, 0, 0));
                    border: 1px solid rgba(0, 255, 157, 0.2);
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                }

                .icon {
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                }

                .tech-box h3 {
                    font-size: 1.2rem;
                    margin: 0;
                }

                .tech-box p {
                    margin: 0;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    font-family: var(--font-mono);
                }

                @media (max-width: 968px) {
                    .hero-stack { height: auto; padding: 6rem 0; }
                    .stack-container { grid-template-columns: 1fr; gap: 3rem; }
                    .stack-grid { transform: none; }
                }
            `}</style>
        </section>
    );
};

const CloudBox = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
        <Globe size={40} color="var(--accent-primary)" />
        <div>
            <h3 style={{ color: 'var(--accent-primary)' }}>Cloud Native</h3>
            <p style={{ margin: 0, opacity: 0.7 }}>AWS, GCP, Azure, Serverless</p>
        </div>
    </div>
);

export default HeroStack;
