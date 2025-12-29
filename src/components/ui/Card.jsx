import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, showStrip = true, noPadding = false, style = {}, ...props }) => {
  return (
    <motion.div
      className={`custom-card ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={style}
      {...props}
    >
      {showStrip && <div className="card-strip"></div>}
      <div className={`card-content ${noPadding ? 'no-padding' : ''}`}>
        {children}
      </div>

      <style>{`
        .custom-card {
          position: relative;
          background: rgba(var(--text-primary-rgb), 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex !important;
          flex-direction: row !important;
          align-items: stretch;
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          will-change: transform;
        }

        .card-strip {
          width: 6px;
          background: var(--accent-primary);
          flex-shrink: 0;
          transition: width 0.3s ease, background-color 0.4s ease;
        }

        .custom-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .custom-card:hover .card-strip {
          width: 10px; /* Slight expansion on hover */
        }
        
        .card-content {
            flex-grow: 1;
            padding: var(--spacing-lg);
        }

        .card-content.no-padding {
            padding: 0;
        }

        @media (max-width: 480px) {
            .card-content:not(.no-padding) {
                padding: 1.25rem 1rem;
            }
        }
      `}</style>
    </motion.div>
  );
};

export default Card;
