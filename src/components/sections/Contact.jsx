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
          padding: var(--spacing-xl) 0;
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }

        .contact-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-text {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: var(--spacing-lg);
        }

        .contact-btn {
          margin-bottom: var(--spacing-xl);
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: var(--spacing-lg);
        }

        .social-link {
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .social-link:hover {
          color: var(--accent-primary);
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
};

export default Contact;
