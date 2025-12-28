import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';

const Contact = () => {
  const { theme } = useTheme();

  const contactItems = [
    {
      label: "Email",
      value: "suresh.37x@gmail.com",
      link: "mailto:suresh.37x@gmail.com",
      icon: <Mail size={24} />,
      color: "#3f52fd" // Vivid Blue
    },
    {
      label: "Phone",
      value: "+91 8451985962",
      link: "tel:+918451985962",
      icon: <Phone size={24} />,
      color: "#3fb950" // Green
    },
    {
      label: "Location",
      value: "Mumbai, Maharashtra",
      link: "https://www.google.com/maps/place/Mumbai,+Maharashtra",
      icon: <MapPin size={24} />,
      color: "#ff9500" // Orange
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> Contact
        </h2>
        <p className="section-subtitle">
          Let's discuss your next project or industry-scale opportunity.
        </p>
      </div>

      <div className="contact-container-v2">
        <div className="contact-grid-v2">
          {contactItems.map((item, index) => {
            const isMonochrome = theme === 'monochrome';
            const isRGB = theme === 'rgb';

            const RGB_COLORS = ['#3fb950', '#3f52fd', '#ff4b4b']; // Green, Blue, Red

            const accentColor = isMonochrome
              ? '#ffffff'
              : (isRGB
                ? RGB_COLORS[index % 3]
                : item.color);

            return (
              <a key={index} href={item.link} target={index === 2 ? "_blank" : "_self"} rel="noopener noreferrer" className="contact-card-link">
                <Card
                  className="contact-v2-card"
                  showStrip={true}
                  noPadding={true}
                  style={{ '--accent-primary': accentColor, borderRadius: '4px' }}
                >
                  <div className="contact-v2-inner">
                    <div className="contact-v2-top">
                      <div className="contact-v2-icon" style={{ color: accentColor }}>
                        {item.icon}
                      </div>
                      <ArrowUpRight size={16} className="contact-v2-arrow" />
                    </div>
                    <div className="contact-v2-info">
                      <span className="contact-v2-label">{item.label}</span>
                      <h3 className="contact-v2-value">{item.value}</h3>
                    </div>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .contact-section {
          padding: 6rem 0 10rem;
        }

        .contact-container-v2 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .contact-grid-v2 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .contact-card-link {
            text-decoration: none;
            color: inherit;
            display: block;
            height: 100%;
        }

        .contact-v2-card {
            border: 1px solid var(--border-color);
            background: rgba(255, 255, 255, 0.01);
            height: 100%;
            transition: all 0.3s ease;
        }

        .contact-v2-card:hover {
            border-color: var(--accent-primary);
            background: rgba(var(--accent-primary-rgb), 0.02);
            transform: translateY(-5px);
        }

        .contact-v2-inner {
            padding: 2.5rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            height: 100%;
        }

        .contact-v2-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .contact-v2-icon {
            opacity: 0.9;
            transition: transform 0.3s ease;
        }

        .contact-v2-card:hover .contact-v2-icon {
            transform: scale(1.1) rotate(-5deg);
        }

        .contact-v2-arrow {
            opacity: 0.2;
            color: var(--text-muted);
            transition: all 0.3s ease;
        }

        .contact-v2-card:hover .contact-v2-arrow {
            opacity: 1;
            color: var(--accent-primary);
            transform: translate(2px, -2px);
        }

        .contact-v2-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .contact-v2-label {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: var(--text-muted);
        }

        .contact-v2-value {
            font-size: 1.15rem;
            font-weight: 800;
            color: var(--text-primary);
            letter-spacing: -0.01em;
            word-break: break-all;
        }

        @media (max-width: 1024px) {
            .contact-grid-v2 {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            .contact-v2-inner {
                padding: 2rem;
                gap: 2rem;
            }
        }
      `}</style>
    </section>
  );
};

export default Contact;
