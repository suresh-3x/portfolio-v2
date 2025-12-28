import React from 'react';

const Logo = ({ className = '', size = 40 }) => {
    return (
        <div className={`sb-logo-svg ${className}`} style={{ width: size, height: size }}>
            <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                    x="2"
                    y="2"
                    width="36"
                    height="36"
                    rx="8"
                    stroke="var(--text-primary)"
                    strokeWidth="2"
                    fill="none"
                />

                {/* Letter S */}
                <path
                    d="M14 12H10V18H14V20H10V18 M14 12V14H10 M14 14V16H12 M12 16H10 M10 18V20H14M14 20V22H10"
                    stroke="none"
                /> {/* Wait, writing manual paths for letters is risky without visual. Let's use simpler stroke paths */}

                {/* Geometric S */}
                <path
                    d="M17 14H13V19H17V24H13"
                    stroke="var(--text-primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Geometric B */}
                <path
                    d="M21 14V24H24C25.6569 24 27 22.6569 27 21C27 20 26 19 25 19C26 19 27 18 27 16.5C27 15.1193 25.8807 14 24.5 14H21Z"
                    stroke="var(--text-primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <style>{`
        .sb-logo-svg {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border-radius: 8px;
        }
      `}</style>
        </div>
    );
};

export default Logo;
