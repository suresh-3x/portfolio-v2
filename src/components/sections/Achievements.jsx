import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Bot, Rocket } from 'lucide-react';
import Card from '../ui/Card';
import { achievements } from '../../data/profile';
import ParallaxScene, { ParallaxLayer } from '../effects/ParallaxScene';

const icons = [
  <TrendingUp size={20} key="scale" />,
  <Trophy size={20} key="lead" />,
  <Bot size={20} key="ai" />,
  <Rocket size={20} key="devops" />,
];

const Achievements = () => (
  <section className="achievements-section">
    <ParallaxScene className="achievements-parallax" intensity={0.6}>
      <div className="achievements-grid">
        {achievements.map((item, idx) => {
          const accentColors = [
            'var(--accent-primary)',
            'var(--accent-secondary)',
            'var(--accent-tertiary)',
          ];
          const accent = accentColors[idx % 3];
          const cardStyle =
            accent !== 'var(--accent-primary)' ? { '--accent-primary': accent } : {};

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
            >
              <ParallaxLayer depth={0.25 + (idx % 3) * 0.12}>
                <Card className="achievement-card" showStrip style={cardStyle}>
                  <div className="achievement-inner">
                    <div className="achievement-icon" style={{ color: accent }}>
                      {icons[idx]}
                    </div>
                    <h3 className="achievement-title">{item.title}</h3>
                    <p className="achievement-desc">{item.desc}</p>
                  </div>
                </Card>
              </ParallaxLayer>
            </motion.div>
          );
        })}
      </div>
    </ParallaxScene>

    <style>{`
      .achievements-section {
        padding-bottom: 1rem;
      }
      .achievements-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      .achievement-inner {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .achievement-icon {
        opacity: 0.9;
      }
      .achievement-title {
        font-size: 1rem;
        font-weight: 800;
        font-family: var(--font-mono);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0;
      }
      .achievement-desc {
        font-size: 0.92rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0;
      }
      @media (max-width: 768px) {
        .achievements-grid {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  </section>
);

export default Achievements;
