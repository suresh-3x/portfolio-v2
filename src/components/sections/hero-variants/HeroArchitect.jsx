import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Zap, Database, ArrowRight, Layout, Server, GitBranch } from 'lucide-react';

const TopologyCard = ({ title, icon: Icon, children, className }) => (
    <motion.div
        className={`topo-card ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5, borderColor: 'var(--accent-primary)' }}
        transition={{ duration: 0.3 }}
    >
        <div className="card-header">
            <Icon size={18} className="card-icon" />
            <span className="card-title">{title}</span>
        </div>
        <div className="card-body">
            {children}
        </div>
    </motion.div>
);

const HeroArchitect = () => {
    return (
        <section className="hero-architect" id="home">
            <div className="topology-container">
                {/* Intro Block */}
                <div className="topo-card main-block">
                    <div className="status-pill">
                        <div className="dot"></div> System Architect
                    </div>
                    <h1>Suresh<br />Bhandari</h1>
                    <p>Designing the backbone of modern software.</p>
                </div>

                {/* Gateway */}
                <TopologyCard title="API Gateway" icon={Globe} className="gateway-block">
                    <div className="code-snippet">
                        <span>/v1/api</span>
                        <span>Rate Limit: 10k</span>
                    </div>
                </TopologyCard>

                {/* Auth */}
                <TopologyCard title="Auth Service" icon={Shield} className="auth-block">
                    <div className="status-row">
                        <span>JWT</span>
                        <span className="active">Active</span>
                    </div>
                </TopologyCard>

                {/* Core Service */}
                <TopologyCard title="Core Engine" icon={Zap} className="core-block">
                    <div className="visual-bars">
                        <div className="bar" style={{ height: '60%' }}></div>
                        <div className="bar" style={{ height: '80%' }}></div>
                        <div className="bar" style={{ height: '40%' }}></div>
                        <div className="bar" style={{ height: '90%' }}></div>
                    </div>
                </TopologyCard>

                {/* Database */}
                <TopologyCard title="Primary DB" icon={Database} className="db-block">
                    <div className="meta-row">
                        <span>Postgres</span>
                        <span>Master</span>
                    </div>
                    <div className="meta-row">
                        <span>Redis</span>
                        <span>Cache</span>
                    </div>
                </TopologyCard>

                {/* Frontend */}
                <TopologyCard title="Client" icon={Layout} className="client-block">
                    <div className="tech-badge">Next.js</div>
                    <div className="tech-badge">React</div>
                </TopologyCard>

                {/* Action */}
                <a href="#projects" className="topo-card action-block">
                    <span>View System Schematics</span>
                    <ArrowRight size={20} />
                </a>
            </div>

            <style>{`
                .hero-architect {
                    height: 100vh;
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-primary);
                    padding: 2rem;
                }

                .topology-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-template-rows: repeat(3, minmax(160px, 1fr));
                    gap: 1.5rem;
                    width: 100%;
                    max-width: 1400px;
                    height: 100%;
                    max-height: 85vh;
                }

                .topo-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 1rem;
                    color: var(--text-secondary);
                }

                .card-title {
                    font-family: var(--font-mono);
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .card-icon { color: var(--accent-primary); }

                /* Specific Blocks */
                .main-block {
                    grid-column: span 2;
                    grid-row: span 2;
                    background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0));
                    justify-content: center;
                    gap: 1rem;
                }

                .main-block h1 {
                    font-size: 3.5rem;
                    line-height: 1;
                    font-weight: 800;
                    margin: 0;
                }

                .main-block p {
                    color: var(--text-secondary);
                    font-size: 1.1rem;
                }

                .status-pill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(0, 255, 157, 0.1);
                    color: var(--accent-primary);
                    padding: 6px 12px;
                    border-radius: 100px;
                    width: fit-content;
                    font-size: 0.8rem;
                    font-weight: bold;
                }

                .dot { width: 8px; height: 8px; background: currentColor; border-radius: 50%; box-shadow: 0 0 10px currentColor; }

                .gateway-block {
                    grid-column: span 1;
                    justify-content: space-between;
                }

                .code-snippet {
                    background: rgba(0,0,0,0.3);
                    padding: 0.8rem;
                    border-radius: 8px;
                    font-family: var(--font-mono);
                    font-size: 0.8rem;
                    color: var(--accent-secondary);
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .auth-block {
                    grid-column: span 1;
                    justify-content: space-between;
                }

                .status-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    font-weight: bold;
                }
                .active { color: var(--accent-primary); }

                .core-block {
                    grid-column: span 1;
                    grid-row: span 2;
                    border-color: var(--accent-primary);
                    background: rgba(0, 255, 157, 0.02);
                }

                .visual-bars {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    height: 100px;
                    margin-top: auto;
                }

                .bar {
                    width: 20%;
                    background: var(--accent-primary);
                    opacity: 0.5;
                    border-radius: 4px;
                }

                .db-block {
                    grid-column: span 1;
                    grid-row: span 1;
                }

                .meta-row {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding: 8px 0;
                    font-size: 0.9rem;
                }

                .client-block { grid-column: span 1; flex-direction: row; flex-wrap: wrap; gap: 8px; align-items: start; }
                
                .tech-badge {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    padding: 4px 10px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                }

                .action-block {
                    grid-column: span 2;
                    background: var(--text-primary);
                    color: black !important;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    font-weight: bold;
                    font-size: 1.2rem;
                    text-decoration: none;
                }
                .action-block:hover { transform: scale(1.02); }
                .action-block .card-icon { color: black; }

                @media (max-width: 1024px) {
                    .topology-container {
                        grid-template-columns: repeat(2, 1fr);
                        max-height: none;
                        height: auto;
                        padding: 4rem 0;
                    }
                    .main-block { grid-column: span 2; order: -1; }
                    .action-block { grid-column: span 2; order: 10; }
                }

                @media (max-width: 600px) {
                    .hero-architect { height: auto; padding: 6rem 1rem; align-items: start; }
                    .topology-container { grid-template-columns: 1fr; gap: 1rem; }
                    .main-block, .action-block, .gateway-block, .auth-block, .core-block, .db-block, .client-block {
                        grid-column: span 1;
                    }
                    .main-block h1 { font-size: 2.5rem; }
                }
            `}</style>
        </section>
    );
};

export default HeroArchitect;
