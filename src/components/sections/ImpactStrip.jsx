import React from 'react';
import { motion } from 'framer-motion';
import { impactMetrics } from '../../data/profile';

const ImpactStrip = () => (
  <section className="impact-strip" aria-label="Career impact highlights">
    <ul className="impact-grid">
      {impactMetrics.map((m, i) => (
        <motion.li
          key={m.label}
          className="impact-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
        >
          <span className="impact-value">{m.value}</span>
          <span className="impact-label">{m.label}</span>
          <span className="impact-keyword">{m.keyword}</span>
        </motion.li>
      ))}
    </ul>
  </section>
);

export default ImpactStrip;
