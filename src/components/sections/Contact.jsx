import React from 'react';
import { Mail, Github, Linkedin, Twitter, Phone, MapPin, Code } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> Contact
        </h2>
        <p className="section-subtitle">
          Let's discuss your next project or opportunity.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <Mail className="icon" />
            <div>
              <h3>Email</h3>
              <a href="mailto:suresh.37x@gmail.com">suresh.37x@gmail.com</a>
            </div>
          </div>
          <div className="info-item">
            <Phone className="icon" />
            <div>
              <h3>Phone</h3>
              <a href="tel:+918451985962">+91 8451985962</a>
            </div>
          </div>
          <div className="info-item">
            <MapPin className="icon" />
            <div>
              <h3>Location</h3>
              <p>Mumbai, Maharashtra</p>
            </div>
          </div>

          <div className="social-links">
            <a href="https://github.com/suresh-3x" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/suresh-3x" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="https://stackoverflow.com/users/1234567/suresh-3x" target="_blank" rel="noopener noreferrer" aria-label="Stack Overflow">
              <Code size={24} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          padding: var(--spacing-xl) 0 var(--spacing-lg);
          text-align: center;
          margin-bottom: 0;
        }

        .contact-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .contact-info {
          display: flex;
          justify-content: center;
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-xl);
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          min-width: 250px;
          transition: all var(--transition-fast);
        }

        .info-item:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .icon {
          color: var(--accent-primary);
          width: 32px;
          height: 32px;
          margin-bottom: var(--spacing-xs);
        }

        .info-item h3 {
          font-family: var(--font-mono);
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .info-item a, .info-item p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          transition: color var(--transition-fast);
        }

        .info-item a:hover {
          color: var(--accent-primary);
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: var(--spacing-lg);
          margin-top: var(--spacing-xl);
        }

        .social-link {
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          padding: 10px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-link:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: translateY(-3px);
          background: var(--bg-primary);
        }

        @media (max-width: 768px) {
          .contact-info {
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-md);
          }

          .info-item {
            width: 100%;
            max-width: 350px;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
