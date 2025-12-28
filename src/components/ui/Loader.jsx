import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="skeleton-container">
            <div className="skeleton-grid">
                {/* Left Content */}
                <div className="skeleton-left">
                    <div className="sk-status"></div>
                    <div className="sk-title"></div>
                    <div className="sk-subtitle"></div>
                    <div className="sk-desc"></div>
                    <div className="sk-actions">
                        <div className="sk-btn"></div>
                        <div className="sk-btn"></div>
                    </div>
                </div>

                {/* Right Stack */}
                <div className="skeleton-right">
                    <div className="sk-card"></div>
                    <div className="sk-card"></div>
                    <div className="sk-card"></div>
                    <div className="sk-card"></div>
                </div>
            </div>

            <style>{`
                .skeleton-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8rem 2rem;
                    background: var(--bg-primary-color);
                    overflow: hidden;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 9999;
                }

                .skeleton-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 4rem;
                    max-width: 1400px;
                    width: 100%;
                    align-items: center;
                }

                /* Pulse Animation */
                @keyframes sk-pulse {
                    0% { opacity: 0.3; }
                    50% { opacity: 0.15; }
                    100% { opacity: 0.3; }
                }

                .sk-status, .sk-title, .sk-subtitle, .sk-desc, .sk-btn, .sk-card {
                    background: var(--text-primary);
                    border-radius: 4px;
                    animation: sk-pulse 1.5s ease-in-out infinite;
                }

                .sk-status { width: 120px; height: 32px; margin-bottom: 2rem; border-radius: 100px; }
                .sk-title { width: 80%; height: 100px; margin-bottom: 1.5rem; }
                .sk-subtitle { width: 60%; height: 40px; margin-bottom: 2rem; }
                .sk-desc { width: 90%; height: 60px; margin-bottom: 3rem; opacity: 0.2; }
                
                .sk-actions { display: flex; gap: 1.5rem; }
                .sk-btn { width: 160px; height: 56px; }

                .skeleton-right {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }

                .sk-card { width: 100%; height: 140px; border-radius: 8px; }
                
                /* Mobile */
                @media (max-width: 1024px) {
                    .skeleton-container { padding: 4rem 1rem; align-items: flex-start; }
                    .skeleton-grid { grid-template-columns: 1fr; gap: 4rem; }
                    .skeleton-left { display: flex; flex-direction: column; align-items: center; }
                    .sk-title { width: 60%; height: 60px; }
                    .sk-subtitle { width: 40%; }
                    .sk-desc { width: 80%; }
                    .sk-actions { justify-content: center; width: 100%; }
                    .sk-btn { width: 45%; }
                }
            `}</style>
        </div>
    );
};

export default SkeletonLoader;
