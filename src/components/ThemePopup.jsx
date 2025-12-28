import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Clock, X, Sun, Moon } from 'lucide-react';

const ThemePopup = () => {
    const { setDynamicThemeEnabled } = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const hasSeen = localStorage.getItem('hasSeenThemePopup');
        // Only show if not seen and no URL param forcing a theme
        const params = new URLSearchParams(window.location.search);

        if (!hasSeen && !params.get('theme')) {
            // Delay slightly for effect
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleEnable = () => {
        setDynamicThemeEnabled(true);
        localStorage.setItem('hasSeenThemePopup', 'true');
        setIsVisible(false);
    };

    const handleDismiss = () => {
        setDynamicThemeEnabled(false);
        localStorage.setItem('hasSeenThemePopup', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="theme-toast-screen">
                    <motion.div
                        className="theme-toast-container"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 30 }}
                    >
                        <div className="toast-inner">
                            <div className="toast-content">
                                <div className="toast-icon">
                                    <Clock size={20} />
                                </div>
                                <div className="toast-text-group">
                                    <h3>Enable Dynamic Theme?</h3>
                                    <p>Adapts to your local time automatically.</p>
                                    <div className="toast-meta-row">
                                        <span className="meta-item"><Sun size={12} /> Aurora (Day)</span>
                                        <span className="meta-dot">·</span>
                                        <span className="meta-item"><Moon size={12} /> Matrix (Night)</span>
                                    </div>
                                </div>
                                <button onClick={handleDismiss} className="toast-close" aria-label="Close"><X size={16} /></button>
                            </div>

                            <div className="toast-actions">
                                <button onClick={handleDismiss} className="btn-text">No Thanks</button>
                                <button onClick={handleEnable} className="btn-pill">Enable</button>
                            </div>
                        </div>
                    </motion.div>

                    <style>{`
                        .theme-toast-screen {
                            position: fixed;
                            bottom: 1.5rem;
                            right: 1.5rem;
                            z-index: 9999;
                            pointer-events: none;
                            display: flex;
                            justify-content: flex-end;
                        }

                        .theme-toast-container {
                            pointer-events: auto;
                            width: 320px;
                            max-width: calc(100vw - 3rem);
                            box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.3);
                            border-radius: 12px;
                            overflow: hidden;
                        }
                        
                        .toast-inner {
                            padding: 1rem;
                            background: var(--bg-primary-color);
                            border: 1px solid var(--border-color);
                            /* Force solid background */
                            background-color: var(--bg-primary-color);
                            border-radius: 12px;
                            position: relative;
                            padding-left: 1rem;
                        }

                        /* Add a subtle accent strip on the left manually */
                        .toast-inner::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            width: 4px;
                            background: var(--accent-primary);
                        }

                        .toast-content {
                            display: flex;
                            gap: 12px;
                            align-items: flex-start;
                            margin-bottom: 0.75rem;
                            padding-left: 8px; /* Offset for strip */
                        }

                        .toast-icon {
                            flex-shrink: 0;
                            width: 36px;
                            height: 36px;
                            border-radius: 10px;
                            background: rgba(var(--accent-primary-rgb), 0.1);
                            color: var(--accent-primary);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border: 1px solid rgba(var(--accent-primary-rgb), 0.15);
                        }

                        .toast-text-group h3 {
                            font-size: 0.9rem;
                            font-weight: 700;
                            margin: 0 0 2px 0;
                            color: var(--text-primary);
                            line-height: 1.3;
                        }

                        .toast-text-group p {
                            font-size: 0.8rem;
                            margin: 0 0 6px 0;
                            line-height: 1.4;
                            color: var(--text-secondary);
                        }

                        .toast-meta-row {
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            font-size: 0.7rem;
                            font-family: var(--font-mono);
                            color: var(--text-muted);
                            opacity: 0.8;
                        }

                        .meta-item {
                            display: flex;
                            align-items: center;
                            gap: 4px;
                        }

                        .toast-close {
                            position: absolute;
                            top: 8px;
                            right: 8px;
                            background: transparent;
                            border: none;
                            color: var(--text-muted);
                            cursor: pointer;
                            padding: 4px;
                            border-radius: 4px;
                            display: flex;
                        }
                        
                        .toast-close:hover {
                            color: var(--text-primary);
                            background: rgba(255,255,255,0.05);
                        }

                        .toast-actions {
                            display: flex;
                            justify-content: flex-end;
                            gap: 8px;
                            padding-top: 0.5rem;
                            border-top: 1px solid var(--border-color);
                            opacity: 0.9;
                            margin-top: 0.5rem;
                            padding-right: 4px;
                        }

                        .btn-text {
                            background: transparent;
                            border: none;
                            color: var(--text-secondary);
                            font-size: 0.75rem;
                            font-weight: 600;
                            cursor: pointer;
                            padding: 6px 12px;
                            border-radius: 4px;
                            transition: color 0.2s;
                        }

                        .btn-text:hover {
                            color: var(--text-primary);
                        }

                        .btn-pill {
                            background: var(--text-primary);
                            color: var(--bg-primary-color);
                            border: 1px solid var(--text-primary);
                            font-size: 0.75rem;
                            font-weight: 600;
                            cursor: pointer;
                            padding: 6px 16px;
                            border-radius: 20px;
                            transition: all 0.2s;
                        }

                        .btn-pill:hover {
                            transform: translateY(-1px);
                            opacity: 0.9;
                            box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.2);
                        }

                        @media (max-width: 480px) {
                            .theme-toast-screen {
                                bottom: 1rem;
                                right: 1rem;
                                left: 1rem;
                            }
                            .theme-toast-container {
                                width: 100%;
                            }
                        }
                    `}</style>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ThemePopup;
