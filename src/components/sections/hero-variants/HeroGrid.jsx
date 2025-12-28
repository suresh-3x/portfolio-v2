import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Globe, Cpu, Zap, Cloud, Code, Terminal, Layers } from 'lucide-react';

const TiltCard = ({ children, className, style }) => {
    const ref = useRef(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ ...style, transform }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

const HeroGrid = () => {
    return (
        <section className="hero-grid" id="home">
            <div className="grid-container">
                {/* Main Bio Card */}
                <TiltCard className="bento-card bio-card">
                    <div className="badge">System Architect</div>
                    <h1>SURESH<br />BHANDARI</h1>
                    <p>Building high-performance distributed systems & scalable backend infrastructure.</p>
                </TiltCard>

                {/* Tech Stack Card */}
                <TiltCard className="bento-card tech-card">
                    <div className="icon-grid">
                        <Database size={24} /> <Server size={24} /> <Globe size={24} />
                        <Cpu size={24} /> <Zap size={24} /> <Cloud size={24} />
                    </div>
                    <span>Tech Stack</span>
                </TiltCard>

                {/* Status Card */}
                <TiltCard className="bento-card status-card">
                    <div className="pulse-dot"></div>
                    <div className="status-text">
                        <span>SYSTEM</span>
                        <span className="status-online">ONLINE</span>
                    </div>
                </TiltCard>

                {/* Experience Card */}
                <TiltCard className="bento-card exp-card">
                    <span className="big-num">10+</span>
                    <span className="label">Years of<br />Excellence</span>
                </TiltCard>

                {/* Action Card */}
                <TiltCard className="bento-card action-card">
                    <a href="#projects">View Work ↗</a>
                </TiltCard>

                {/* Extra Detail Card */}
                <TiltCard className="bento-card detail-card">
                    <Code size={20} />
                    <span>Clean Code</span>
                </TiltCard>

                {/* Extra Detail Card 2 */}
                <TiltCard className="bento-card detail-card-2">
                    <Layers size={20} />
                    <span>Microservices</span>
                </TiltCard>
            </div>

            <style>{`
                .hero-grid {
                    height: 100vh;
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-primary);
                    overflow: hidden;
                    position: relative;
                }

                .hero-grid::before {
                    content: '';
                    position: absolute;
                    width: 120vw;
                    height: 120vh;
                    background: radial-gradient(circle at 50% 50%, rgba(0, 255, 157, 0.03) 0%, transparent 50%);
                    pointer-events: none;
                }

                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    /* Dynamic rows based on screen height, min 180px */
                    grid-template-rows: repeat(3, minmax(180px, 1fr)); 
                    gap: 20px;
                    padding: 2vw;
                    width: 100%;
                    max-width: 1400px; /* Increased from 1000px */
                    height: 100%;
                    max-height: 90vh; /* Keep it contained within the 100vh section */
                }

                .bento-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-color);
                    border-radius: 24px;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease, border-color 0.2s;
                    transform-style: preserve-3d;
                }
                
                .bento-card:hover {
                    border-color: var(--accent-primary);
                    background: rgba(255, 255, 255, 0.05);
                }

                /* ... existing card styles ... */

                @media (max-width: 1024px) {
                    .grid-container {
                        grid-template-columns: repeat(2, 1fr);
                        max-width: 100%;
                        max-height: none;
                        height: auto;
                        padding: 4rem 2rem;
                    }
                    /* Re-arrange for 2 columns */
                    .bio-card { grid-column: span 2; grid-row: span 1; min-height: 250px; }
                    .tech-card { grid-column: span 1; grid-row: span 1; min-height: 200px; }
                    .status-card { grid-column: span 1; grid-row: span 1; min-height: 200px; }
                    .exp-card { grid-column: span 1; grid-row: span 1; min-height: 200px; } 
                    .action-card { grid-column: span 1; grid-row: span 1; min-height: 200px; }
                    .detail-card { grid-column: span 1; grid-row: span 1; min-height: 200px; }
                    .detail-card-2 { grid-column: span 1; grid-row: span 1; min-height: 200px; }
                }

                @media (max-width: 600px) {
                    .hero-grid { height: auto; padding: 6rem 1rem 4rem; align-items: flex-start; min-height: 100vh; }
                    .grid-container {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto;
                        gap: 16px;
                    }
                    .bento-card { min-height: 160px; padding: 1.5rem; }
                    .bio-card h1 { font-size: 2rem; }
                }
            `}</style>
        </section>
    );
};

export default HeroGrid;
