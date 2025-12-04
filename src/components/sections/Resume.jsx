import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

const Resume = () => {
    const resumeLink = "https://gwl1cw03d070bspa.public.blob.vercel-storage.com/resume-sde-0.pdf";

    return (
        <section id="resume" className="resume-section">
            <div className="section-header">
                <h2 className="section-title">
                    <span className="hash">#</span> Resume
                </h2>
                <p className="section-subtitle">
                    View or download my full resume.
                </p>
            </div>

            <div className="resume-content">
                <div className="resume-actions">
                    <a
                        href={resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-btn primary"
                    >
                        <ExternalLink size={20} />
                        View Resume
                    </a>
                </div>
            </div>

            <style>{`
        .resume-section {
          padding: var(--spacing-xl) 0;
          text-align: center;
        }

        .resume-content {
          display: flex;
          justify-content: center;
          margin-top: var(--spacing-lg);
        }

        .resume-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 4px;
          font-family: var(--font-mono);
          transition: all var(--transition-fast);
          text-decoration: none;
          font-size: 1.1rem;
        }

        .resume-btn.primary {
          background: var(--bg-primary);
          border: 1px solid var(--accent-primary);
          color: var(--accent-primary);
        }

        .resume-btn.primary:hover {
          background: rgba(0, 255, 157, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 255, 157, 0.1);
        }
      `}</style>
        </section>
    );
};

export default Resume;
