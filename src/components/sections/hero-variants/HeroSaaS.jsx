import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Play } from 'lucide-react';

const HeroSaaS = () => {
    return (
        <section className="hero-saas" id="home">
            <div className="saas-container">
                <motion.div
                    className="saas-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="pill-badge">Now Open for Roles</span>
                    <h1>Scale Your Backend Infrastructure </h1>
                    <p>
                        I help startups and enterprises build fault-tolerant, high-performance systems that handle millions of requests.
                    </p>

                    <div className="saas-actions">
                        <a href="#contact" className="saas-btn-primary">Hire Me</a>
                        <a href="#projects" className="saas-btn-secondary"><Play size={16} fill="currentColor" /> View Demos</a>
                    </div>

                    <div className="trust-badges">
                        <div className="trust-item"><CheckCircle size={16} className="check" /> 10+ Years Exp</div>
                        <div className="trust-item"><CheckCircle size={16} className="check" /> 99.99% Uptime</div>
                        <div className="trust-item"><CheckCircle size={16} className="check" /> Scalable Arch</div>
                    </div>
                </motion.div>

                <motion.div
                    className="saas-visual"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="app-window">
                        <div className="app-header">
                            <div className="dots"><span></span><span></span><span></span></div>
                            <div className="bar"></div>
                        </div>
                        <div className="app-body">
                            <div className="sidebar"></div>
                            <div className="main-view">
                                <div className="graph-placeholder"></div>
                                <div className="row-placeholder"></div>
                                <div className="row-placeholder"></div>
                            </div>
                        </div>
                        <div className="floating-stat stat-1">
                            <span>API Req</span>
                            <strong>10k/sec</strong>
                        </div>
                        <div className="floating-stat stat-2">
                            <span>Latency</span>
                            <strong>12ms</strong>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
            .hero-saas {
                min-height: 90vh;
                display: flex;
                align-items: center;
                background: linear-gradient(180deg, #050505 0%, #0a0a0a 100%);
                padding: var(--spacing-2xl) 0;
            }

            .saas-container {
                max-width: 1200px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4rem;
                padding: 0 2rem;
                align-items: center;
            }

            .pill-badge {
                display: inline-block;
                padding: 6px 16px;
                background: rgba(59, 130, 246, 0.1);
                color: #60a5fa;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
            }

            .saas-content h1 {
                font-size: 3.5rem;
                line-height: 1.1;
                margin-bottom: 1.5rem;
                font-weight: 800;
                letter-spacing: -1px;
            }

            .saas-content p {
                font-size: 1.25rem;
                color: var(--text-secondary);
                margin-bottom: 2.5rem;
                line-height: 1.6;
            }

            .saas-actions {
                display: flex;
                gap: 1rem;
                margin-bottom: 3rem;
            }

            .saas-btn-primary {
                background: #3b82f6;
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-weight: 600;
                text-decoration: none;
                transition: background 0.2s;
            }

            .saas-btn-primary:hover {
                background: #2563eb;
            }

            .saas-btn-secondary {
                background: rgba(255, 255, 255, 0.05);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                font-weight: 600;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: background 0.2s;
            }

            .saas-btn-secondary:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            .trust-badges {
                display: flex;
                gap: 2rem;
                border-top: 1px solid rgba(255,255,255,0.1);
                padding-top: 1.5rem;
            }

            .trust-item {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.9rem;
                color: var(--text-mixed);
            }

            .check {
                color: #3b82f6;
            }

            /* Visual */
            .app-window {
                background: #1e1e1e;
                border-radius: 12px;
                border: 1px solid #333;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                aspect-ratio: 16/10;
                position: relative;
                display: flex;
                flex-direction: column;
            }

            .app-header {
                padding: 12px;
                border-bottom: 1px solid #333;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .dots { display: flex; gap: 6px; }
            .dots span { width: 10px; height: 10px; border-radius: 50%; background: #333; }
            .bar { height: 8px; width: 60%; background: #2a2a2a; border-radius: 4px; }

            .app-body {
                flex: 1;
                display: flex;
            }

            .sidebar { width: 60px; border-right: 1px solid #333; }
            .main-view { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 15px; }

            .graph-placeholder {
                height: 100px;
                background: linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
                border-bottom: 2px solid #3b82f6;
                border-radius: 4px;
            }
            .row-placeholder { height: 40px; background: #252525; border-radius: 4px; }

            .floating-stat {
                position: absolute;
                background: #252525;
                padding: 12px;
                border-radius: 8px;
                border: 1px solid #333;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
                min-width: 100px;
            }
            
            .floating-stat span { font-size: 0.8rem; color: #888; }
            .floating-stat strong { font-size: 1.2rem; color: #fff; }

            .stat-1 { top: 20px; right: -20px; }
            .stat-2 { bottom: 40px; left: -20px; }

            @media (max-width: 968px) {
                .saas-container {
                    grid-template-columns: 1fr;
                    text-align: center;
                }
                .saas-actions { justify-content: center; }
                .trust-badges { justify-content: center; }
                .saas-visual { display: none; }
            }
        `}</style>
        </section>
    );
};

export default HeroSaaS;
