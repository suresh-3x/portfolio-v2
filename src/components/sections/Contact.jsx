import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card';

const Contact = () => {
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
    <section className="contact-section">


      <div className="contact-container-v3">
        <Card className="contact-main-card" showStrip={false} noPadding={true}>
          <div className="contact-card-bg">
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
          </div>

          <div className="contact-grid-v3">
            {contactItems.map((item, index) => {
              const accentColors = [
                'var(--accent-primary)',
                'var(--accent-secondary)',
                'var(--accent-tertiary)'
              ];
              const accentColor = accentColors[index % 3];

              return (
                <a key={index} href={item.link} target={index === 2 ? "_blank" : "_self"} rel="noopener noreferrer" className="contact-item-v3">
                  <div className="contact-icon-wrapper" style={{ '--item-accent': accentColor }}>
                    <div className="icon-glow"></div>
                    {item.icon}
                  </div>
                  <div className="contact-info-v3">
                    <span className="contact-label-v3">{item.label}</span>
                    <h3 className="contact-value-v3">{item.value}</h3>
                  </div>
                  <ArrowUpRight size={18} className="contact-arrow-v3" />
                </a>
              );
            })}
          </div>
        </Card>
      </div>

      <style>{`
        .contact-section {
          position: relative;
        }

        .contact-container-v3 {
          max-width: 1100px;
          margin: 0 auto;
          perspective: 1000px;
        }

        .contact-main-card {
          background: rgba(var(--text-primary-rgb), 0.02) !important;
          border: 1px solid var(--border-color) !important;
          overflow: hidden;
          position: relative;
        }

        .contact-card-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.4;
        }

        .bg-orb {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(80px);
        }

        .orb-1 {
          background: var(--accent-primary);
          top: -150px;
          left: -150px;
          opacity: 0.1;
        }

        .orb-2 {
          background: var(--accent-tertiary);
          bottom: -150px;
          right: -150px;
          opacity: 0.1;
        }

        .contact-grid-v3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          position: relative;
          z-index: 2;
        }

        .contact-item-v3 {
          padding: 3.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-right: 1px solid var(--border-color);
          position: relative;
        }

        .contact-item-v3:last-child {
          border-right: none;
        }

        .contact-item-v3:hover {
          background: rgba(var(--text-primary-rgb), 0.03);
          transform: translateY(-4px);
        }

        .contact-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          background: rgba(var(--text-primary-rgb), 0.03);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--item-accent);
          position: relative;
          transition: all 0.4s ease;
        }

        .icon-glow {
          position: absolute;
          inset: 0;
          background: var(--item-accent);
          border-radius: inherit;
          filter: blur(15px);
          opacity: 0;
          transition: all 0.4s ease;
        }

        .contact-item-v3:hover .contact-icon-wrapper {
          transform: scale(1.1) rotate(8deg);
          border-color: var(--item-accent);
          background: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .contact-item-v3:hover .icon-glow {
          opacity: 0.15;
        }

        .contact-info-v3 {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-label-v3 {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          opacity: 0.6;
        }

        .contact-value-v3 {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
          word-break: break-all;
        }

        .contact-arrow-v3 {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          opacity: 0;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          transform: translate(-10px, 10px);
        }

        .contact-item-v3:hover .contact-arrow-v3 {
          opacity: 0.5;
          transform: translate(0, 0);
        }

        @media (max-width: 968px) {
          .contact-grid-v3 {
            grid-template-columns: 1fr;
          }
          .contact-item-v3 {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            padding: 3rem 2rem;
          }
          .contact-item-v3:last-child {
            border-bottom: none;
          }
        }

      `}</style>
    </section>
  );
};

export default Contact;
