import React from 'react';

const Logo = ({ className = '', size = 40 }) => {
  return (
    <div className={`sb-logo-svg ${className}`} style={{ width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="40"
          height="40"
          rx="8"
          fill="none"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontWeight="900"
          fontSize="18"
          fill="var(--text-primary)"
        >
          SB
        </text>
      </svg>
      <style>{`
        .sb-logo-svg {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 12px;
          background: var(--card-bg);
          border: 1.5px solid var(--border-color);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.04),
            0 1px 2px rgba(0, 0, 0, 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.6);
          padding: 2px;
          position: relative;
          overflow: hidden;
        }
        
        [data-theme='dusk'] .sb-logo-svg,
        [data-theme='mono-dark'] .sb-logo-svg {
          background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.5),
            inset 0 0 12px rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .sb-logo-svg::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg, 
            transparent 45%, 
            rgba(255, 255, 255, 0.1) 50%, 
            transparent 55%
          );
          transform: rotate(45deg);
          animation: logoShine 4s infinite;
          pointer-events: none;
        }

        @keyframes logoShine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          20%, 100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .sb-logo-svg:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
          border-color: var(--accent-secondary);
        }

        [data-theme='dusk'] .sb-logo-svg:hover,
        [data-theme='mono-dark'] .sb-logo-svg:hover {
           border-color: var(--accent-primary);
           box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Logo;
