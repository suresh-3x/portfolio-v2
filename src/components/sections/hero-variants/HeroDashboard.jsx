import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Server, Shield, Clock, Wifi, Lock, Zap } from 'lucide-react';

const HeroDashboard = () => {
    // Simulate live data
    const [stats, setStats] = useState({
        rps: 1420,
        latency: 24,
        cpu: 45,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                rps: prev.rps + Math.floor(Math.random() * 40 - 20),
                latency: Math.max(10, Math.min(50, prev.latency + Math.floor(Math.random() * 10 - 5))),
                cpu: Math.max(20, Math.min(80, prev.cpu + Math.floor(Math.random() * 10 - 5))),
            }));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero-dashboard" id="home">
            <div className="dashboard-wrapper">
                {/* Header */}
                <header className="control-bar">
                    <div className="bar-left">
                        <Activity size={18} className="spin-slow" />
                        <span className="mono-text">SYS.MONITOR_V2.4</span>
                    </div>
                    <div className="bar-center">
                        <span className="time-display">{new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="bar-right">
                        <div className="status-badge">
                            <span className="dot"></span> LIVE
                        </div>
                    </div>
                </header>

                <div className="grid-layout">
                    {/* Main Identity Card */}
                    <div className="panel profile-panel">
                        <div className="scan-line"></div>
                        <div className="panel-header">
                            <Lock size={14} /> IDENTITY_VERIFIED
                        </div>
                        <div className="profile-content">
                            <h1>SURESH BHANDARI</h1>
                            <h2>Senior Backend Engineer</h2>
                            <p className="typewriter"> Architecting scalable distributed systems.</p>
                        </div>
                        <div className="action-buttons">
                            <a href="#projects" className="cyber-btn primary">
                                <Zap size={16} /> INITIALIZE_PROJECTS
                            </a>
                            <a href="#contact" className="cyber-btn secondary">
                                <Wifi size={16} /> ESTABLISH_UPLINK
                            </a>
                        </div>
                    </div>

                    {/* Server Load Metric */}
                    <div className="panel metric-panel load">
                        <div className="panel-header">
                            <Cpu size={14} /> CPU_LOAD
                        </div>
                        <div className="circular-chart">
                            <svg viewBox="0 0 36 36" className="circular-chart-svg">
                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className="circle" strokeDasharray={`${stats.cpu}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <span className="percentage">{stats.cpu}%</span>
                        </div>
                    </div>

                    {/* Inbound Traffic */}
                    <div className="panel metric-panel traffic">
                        <div className="panel-header">
                            <Server size={14} /> INBOUND_REQ
                        </div>
                        <div className="digital-val color-accent">
                            {stats.rps} <span className="unit">req/s</span>
                        </div>
                        <div className="graph-lines">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="line" style={{ height: `${Math.random() * 100}%` }}></div>
                            ))}
                        </div>
                    </div>

                    {/* Latency */}
                    <div className="panel metric-panel latency">
                        <div className="panel-header">
                            <Clock size={14} /> GLOBAL_LATENCY
                        </div>
                        <div className="digital-val color-warn">
                            {stats.latency} <span className="unit">ms</span>
                        </div>
                        <div className="ping-dot"></div>
                    </div>

                    {/* Security Status */}
                    <div className="panel security-panel">
                        <div className="shield-icon">
                            <Shield size={32} />
                        </div>
                        <div className="sec-details">
                            <span className="sec-label">FIREWALL</span>
                            <span className="sec-status">ACTIVE</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hero-dashboard {
                    height: 100vh;
                    min-height: 100vh;
                    width: 100%;
                    background: #050505;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: var(--font-mono);
                    position: relative;
                    overflow: hidden;
                    padding: 2rem;
                }

                .hero-dashboard::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: 
                        linear-gradient(rgba(0, 255, 157, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 157, 0.03) 1px, transparent 1px);
                    background-size: 30px 30px;
                    pointer-events: none;
                }

                .dashboard-wrapper {
                    /* Changed from fixed width to max-width/responsive */
                    width: 100%;
                    max-width: 1400px; 
                    height: 100%;
                    max-height: 85vh;
                    border: 1px solid #333;
                    background: rgba(10, 10, 10, 0.8);
                    backdrop-filter: blur(10px);
                    border-radius: 4px;
                    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
                    display: flex;
                    flex-direction: column;
                }

                .control-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.8rem 1.5rem;
                    border-bottom: 1px solid #333;
                    background: rgba(255, 255, 255, 0.02);
                    flex-shrink: 0;
                }

                .bar-left, .bar-right { display: flex; align-items: center; gap: 10px; }
                .mono-text { font-size: 0.8rem; color: var(--text-secondary); letter-spacing: 1px; }

                .spin-slow { animation: spin 4s linear infinite; color: var(--accent-primary); }

                .status-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 8px;
                    background: rgba(0, 255, 157, 0.1);
                    border: 1px solid rgba(0, 255, 157, 0.3);
                    color: var(--accent-primary);
                    font-size: 0.7rem;
                    border-radius: 2px;
                }

                .dot { width: 6px; height: 6px; background: var(--accent-primary); border-radius: 50%; box-shadow: 0 0 5px var(--accent-primary); }

                .grid-layout {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1fr;
                    grid-template-rows: repeat(2, 1fr);
                    gap: 1.5rem;
                    padding: 1.5rem;
                    flex-grow: 1;
                    overflow: auto; /* Allow internal scroll if needed on small heights */
                }

                .panel {
                    border: 1px solid #333;
                    background: rgba(20, 20, 20, 0.6);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    min-height: 200px; /* Ensure visual substance */
                }

                .panel-header {
                    padding: 0.8rem;
                    font-size: 0.7rem;
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border-bottom: 1px solid #222;
                    background: rgba(0, 0, 0, 0.2);
                    flex-shrink: 0;
                }

                /* Profile Panel */
                .profile-panel {
                    grid-column: span 1;
                    grid-row: span 2;
                    padding: 0;
                    border-color: var(--accent-primary);
                    box-shadow: 0 0 20px rgba(0, 255, 157, 0.05);
                }

                .profile-content {
                    padding: 2rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .profile-content h1 {
                    font-size: 3rem;
                    line-height: 1;
                    margin-bottom: 0.5rem;
                    color: #fff;
                    font-weight: 700;
                    letter-spacing: -1px;
                }

                .profile-content h2 {
                    color: var(--accent-primary);
                    font-size: 1.2rem;
                    margin-bottom: 1.5rem;
                    font-weight: 400;
                }

                .typewriter {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    border-left: 2px solid var(--accent-secondary);
                    padding-left: 1rem;
                }

                .action-buttons {
                    padding: 2rem;
                    display: flex;
                    gap: 1rem;
                    border-top: 1px solid #222;
                    flex-shrink: 0;
                }

                .cyber-btn {
                    flex: 1;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 0.8rem;
                    text-decoration: none;
                    transition: all 0.2s;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .cyber-btn.primary {
                    background: var(--accent-primary);
                    color: #000;
                    font-weight: bold;
                }
                .cyber-btn.primary:hover {
                    box-shadow: 0 0 15px var(--accent-primary);
                }

                .cyber-btn.secondary {
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                }
                .cyber-btn.secondary:hover {
                    background: rgba(255, 255, 255, 0.05);
                }

                /* Metric Panels */
                .metric-panel {
                    align-items: center;
                    justify-content: space-between;
                }

                .circular-chart {
                    width: 120px;
                    height: 120px;
                    position: relative;
                    margin: auto;
                }

                .circular-chart-svg {
                    display: block;
                    width: 100%;
                }

                .circle-bg { stroke: #222; fill: none; stroke-width: 2.5; }
                .circle { stroke: var(--accent-primary); fill: none; stroke-width: 2.5; transition: stroke-dasharray 1s ease; }
                .percentage {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .digital-val {
                    font-size: 3rem;
                    font-weight: 700;
                    margin: auto;
                }
                .unit { font-size: 0.8rem; opacity: 0.6; font-weight: 400; }
                .color-accent { color: var(--accent-secondary); }
                .color-warn { color: #ffbd2e; }

                .graph-lines {
                    display: flex;
                    align-items: flex-end;
                    gap: 4px;
                    height: 50px;
                    width: 100%;
                    padding: 0 1rem 1rem;
                }
                .line { flex: 1; background: var(--accent-secondary); opacity: 0.5; transition: height 0.5s; }

                .security-panel {
                    grid-column: span 1;
                    background: rgba(0, 255, 157, 0.05);
                    border-color: var(--accent-primary);
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                }

                .sec-status { font-size: 1.2rem; font-weight: bold; color: var(--accent-primary); }

                .scan-line {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: rgba(0, 255, 157, 0.5);
                    box-shadow: 0 0 10px rgba(0, 255, 157, 0.5);
                    animation: scan 3s linear infinite;
                    pointer-events: none;
                }

                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes scan { 0% { top: -10%; opacity: 0; } 50% { opacity: 1; } 100% { top: 110%; opacity: 0; } }

                /* Tablet Breakpoint */
                @media (max-width: 1200px) {
                    .grid-layout {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto;
                    }
                    .profile-panel { 
                        grid-column: span 2; 
                        grid-row: span 1; 
                        min-height: 300px;
                    }
                    .dashboard-wrapper { height: auto; max-height: none; padding-bottom: 2rem; }
                     .hero-dashboard { height: auto; padding: 4rem 1rem; }
                }

                /* Mobile Breakpoint */
                @media (max-width: 768px) {
                    .hero-dashboard { padding: 6rem 1rem 4rem; align-items: flex-start; }
                    .grid-layout { grid-template-columns: 1fr; gap: 1rem; padding: 1rem; }
                    .profile-panel { grid-column: span 1; }
                    .action-buttons { flex-direction: column; }
                    .profile-content h1 { font-size: 2rem; }
                }
            `}</style>
        </section>
    );
};

export default HeroDashboard;
