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
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.4s ease;
          display: flex !important;
          flex-direction: row !important;
          align-items: stretch;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .card-strip {
          width: 6px;
          background: var(--accent-primary);
          flex-shrink: 0;
          transition: width 0.3s ease, background-color 0.4s ease;
        }

        .custom-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
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
      `}</style>
    </motion.div>
  );
};

export default Card;
