import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Play, Star } from 'lucide-react';

const HeroSaaS = () => {
    return (
        <section className="hero-saas" id="home">
            <div className="bg-glow"></div>

            <div className="saas-container">
                <div className="saas-content">
                    <div className="pill-badge">
                        <Star size={12} fill="currentColor" />
                        <span>Available for new projects</span>
                    </div>

                    <h1>
                        Scale your <span className="highlight">infrastructure</span><br />
                        without the headache.
                    </h1>
                    <p className="lead">
                        I build enterprise-grade backend systems that handle millions of requests with zero downtime. Secure, scalable, and built for growth.
                    </p>

                    <div className="cta-group">
                        <a href="#projects" className="saas-btn-primary">
                            View Case Studies <ArrowRight size={18} />
                        </a>
                        <a href="#contact" className="saas-btn-secondary">
                            <Play size={18} fill="currentColor" /> Book a Call
                        </a>
                    </div>

                    <div className="trust-signals">
                        <div className="signal">
                            <Check size={16} className="check" /> <span>99.99% Uptime</span>
                        </div>
                        <div className="signal">
                            <Check size={16} className="check" /> <span>High Concurrency</span>
                        </div>
                        <div className="signal">
                            <Check size={16} className="check" /> <span>Cloud Native</span>
                        </div>
                    </div>
                </div>

                <div className="saas-visual">
                    <div className="app-window">
                        <div className="window-bar">
                            <div className="dots">
                                <span className="d close"></span>
                                <span className="d min"></span>
                                <span className="d max"></span>
                            </div>
                            <div className="address-bar">api.production.com/health</div>
                        </div>
                        <div className="window-content">
                            <div className="code-block">
                                <span className="c-keyword">GET</span> /v1/system/status
                                <br /><br />
                                <span className="c-gray">// Response (20ms)</span><br />
                                <span className="c-blue">{`{`}</span><br />
                                &nbsp;&nbsp;<span className="c-prop">"status"</span>: <span className="c-string">"operational"</span>,<br />
                                &nbsp;&nbsp;<span className="c-prop">"latency"</span>: <span className="c-num">24ms</span>,<br />
                                &nbsp;&nbsp;<span className="c-prop">"region"</span>: <span className="c-string">"us-east-1"</span>,<br />
                                &nbsp;&nbsp;<span className="c-prop">"active_nodes"</span>: <span className="c-num">128</span><br />
                                <span className="c-blue">{`}`}</span>
                            </div>
                            <div className="floating-card">
                                <div className="stat-label">Requests/min</div>
                                <div className="stat-val">42,593</div>
                                <div className="stat-graph"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hero-saas {
                    height: 100vh;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-primary);
                    position: relative;
                    overflow: hidden;
                }

                .bg-glow {
                    position: absolute;
                    top: -20%;
                    right: -10%;
                    width: 800px;
                    height: 800px;
                    background: radial-gradient(circle, rgba(0, 255, 157, 0.08) 0%, transparent 70%);
                    pointer-events: none;
                }

                .saas-container {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 4rem;
                    max-width: 1200px;
                    width: 90%;
                    z-index: 10;
                    align-items: center;
                }

                .saas-content {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1.5rem;
                }

                .pill-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    background: rgba(0, 255, 157, 0.1);
                    border: 1px solid rgba(0, 255, 157, 0.2);
                    border-radius: 100px;
                    font-size: 0.85rem;
                    color: var(--accent-primary);
                    font-weight: 600;
                }

                h1 {
                    font-size: 3.5rem;
                    line-height: 1.1;
                    font-weight: 800;
                    letter-spacing: -1px;
                }

                .highlight {
                    color: var(--accent-primary);
                    position: relative;
                    display: inline-block;
                }
                
                .highlight::after {
                    content: '';
                    position: absolute;
                    bottom: 4px;
                    left: 0;
                    width: 100%;
                    height: 8px;
                    background: var(--accent-primary);
                    opacity: 0.2;
                    transform: skewX(-10deg);
                }

                .lead {
                    font-size: 1.25rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    max-width: 500px;
                }

                .cta-group {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .saas-btn-primary {
                    background: var(--accent-primary);
                    color: #000;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-weight: 700;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .saas-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(0, 255, 157, 0.3);
                }

                .saas-btn-secondary {
                    background: transparent;
                    color: var(--text-primary);
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: background 0.2s;
                }

                .saas-btn-secondary:hover {
                    background: rgba(255,255,255,0.05);
                }

                .trust-signals {
                    display: flex;
                    gap: 2rem;
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid var(--border-color);
                    width: 100%;
                }

                .signal {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .check { color: var(--accent-primary); }

                /* SaaS Visual */
                .saas-visual {
                    position: relative;
                }

                .app-window {
                    background: #151921;
                    border-radius: 12px;
                    border: 1px solid var(--border-color);
                    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.6);
                    overflow: hidden;
                    position: relative;
                }

                .window-bar {
                    background: #1e242e;
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    border-bottom: 1px solid #333;
                }

                .dots { display: flex; gap: 6px; }
                .d { width: 10px; height: 10px; border-radius: 50%; }
                .close { background: #ff5f56; }
                .min { background: #ffbd2e; }
                .max { background: #27c93f; }

                .address-bar {
                    background: #0d1117;
                    flex: 1;
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    font-family: var(--font-mono);
                    text-align: center;
                }

                .window-content {
                    padding: 2rem;
                    position: relative;
                    min-height: 300px;
                    background: #0d1117;
                }

                .code-block {
                    font-family: 'Fira Code', monospace;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #e6edf3;
                }

                .c-keyword { color: #ff7b72; font-weight: bold; }
                .c-gray { color: #8b949e; }
                .c-blue { color: #79c0ff; }
                .c-prop { color: #7ee787; }
                .c-string { color: #a5d6ff; }
                .c-num { color: #79c0ff; }

                .floating-card {
                    position: absolute;
                    bottom: 20px;
                    right: -20px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    border-left: 4px solid var(--accent-primary);
                    animation: float 6s ease-in-out infinite;
                }

                .stat-label { font-size: 0.8rem; color: var(--text-secondary); }
                .stat-val { font-size: 1.8rem; font-weight: bold; margin: 4px 0; }
                .stat-graph { 
                    width: 100px; height: 4px; border-radius: 2px;
                    background: linear-gradient(90deg, var(--accent-primary) 0%, transparent 100%);
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @media (max-width: 968px) {
                    .saas-container { grid-template-columns: 1fr; gap: 3rem; }
                    .saas-content { align-items: center; text-align: center; }
                    .lead { margin: 0 auto; }
                    .cta-group { justify-content: center; }
                    .trust-signals { justify-content: center; }
                    .app-window { width: 100%; }
                    .floating-card { right: 0; }
                }

                @media (max-width: 600px) {
                     .hero-saas { height: auto; padding-top: 5rem; }
                     h1 { font-size: 2.5rem; }
                     .trust-signals { flex-direction: column; gap: 1rem; }
                }
            `}</style>
        </section>
    );
};

export default HeroSaaS;
