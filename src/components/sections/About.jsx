import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Shield, Cloud, Bot, Smartphone, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';

const About = () => {

  const resumeLink = "https://gwl1cw03d070bspa.public.blob.vercel-storage.com/resume-sde-0.pdf";

  const features = [
    {
      icon: <Cpu size={18} />,
      title: "Concurrent Systems",
      desc: "Architecting fault-tolerant microservices for massive scale."
    },
    {
      icon: <Zap size={18} />,
      title: "Performance tuning",
      desc: "Deep-level optimization for mission-critical throughput."
    },
    {
      icon: <Shield size={18} />,
      title: "Security & Auth",
      desc: "Robust IAM, OAuth2, and multi-layered encryption."
    },
    {
      icon: <Cloud size={18} />,
      title: "Cloud Strategy",
      desc: "Multi-cloud orchestration and containerized delivery."
    },
    {
      icon: <Bot size={18} />,
      title: "AI Integration",
      desc: "Embedding advanced LLMs into automated business workflows."
    },
    {
      icon: <Smartphone size={18} />,
      title: "Universal Apps",
      desc: "High-end cross-platform experiences for mobile and web."
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          {/* Narrative Side */}
          <div className="about-narrative">


            <p className="narrative-p main">
              I don't just write code; I engineer <strong>resilient digital ecosystems</strong>. My approach is rooted in the belief that great software is a synthesis of rigorous performance standards and intuitive human-centered design.
            </p>

            <p className="narrative-p">
              With a decade of experience navigating the complexities of high-throughput systems, I've developed a philosophy centered on <strong>scalability by design</strong>. Whether I'm orchestrating distributed backends or crafting precise interfaces, my focus remains constant: delivering technical excellence that translates directly into business growth.
            </p>

            <div className="about-tags">
              <span className="about-tag">ARCHITECT</span>
              <span className="about-tag">POLYMATH</span>
            </div>
          </div>

          {/* Resume Side */}
          <div className="about-visual">
            <div className="resume-card-container">
              {/* Architectural Background Illustration */}
              <div className="system-logic-illustration">
                <div className="logic-node n-1"></div>
                <div className="logic-node n-2"></div>
                <div className="logic-node n-3"></div>
                <svg className="logic-grid" viewBox="0 0 400 400" fill="none">
                  <path d="M50 100 L350 100 M200 100 L200 300 M100 200 L300 200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                  <circle cx="200" cy="100" r="2" fill="currentColor" />
                  <circle cx="200" cy="300" r="2" fill="currentColor" />
                  <circle cx="100" cy="200" r="2" fill="currentColor" />
                  <circle cx="300" cy="200" r="2" fill="currentColor" />
                </svg>
              </div>

              <Card className="resume-blade-card" showStrip={false}>
                <div className="resume-card-inner">
                  <div className="resume-visual-box">
                    <div className="mini-spec-doc">
                      <div className="spec-lines">
                        <span className="s-line l"></span>
                        <span className="s-line m"></span>
                        <span className="s-line s"></span>
                      </div>
                      <div className="spec-node"></div>
                      <div className="spec-glint"></div>
                    </div>
                  </div>
                  <div className="resume-info">
                    <span className="resume-label">PROFESSIONAL_MANIFEST</span>
                    <h3 className="resume-status">ENGINEERING_RESUME_v25</h3>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="resume-action-btn">
                      <span>VIEW</span>
                      <ExternalLink size={14} />
                    </a>
                  </motion.div>
                </div>
                <div className="resume-card-footer">
                  <span>DOC_AUTH: VERIFIED</span>
                  <span>SIZE: 142KB</span>
                </div>
              </Card>
              <div className="resume-blade-aura"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .about-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 6rem;
            align-items: center;
        }

        .narrative-p {
            font-size: 1.1rem;
            line-height: 1.7;
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
        }

        .narrative-p.main {
            font-size: 1.4rem;
            color: var(--text-primary);
            line-height: 1.6;
            margin-bottom: 2rem;
        }

        .narrative-p strong {
            color: var(--accent-primary);
        }

        .about-tags {
            display: flex;
            gap: 12px;
            margin-top: 2rem;
        }

        .about-tag {
            font-family: var(--font-mono);
            font-size: 0.65rem;
            font-weight: 800;
            padding: 4px 10px;
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            border-radius: 4px;
            letter-spacing: 1px;
        }

        .resume-card-container {
            position: relative;
            width: 100%;
            max-width: 400px;
            margin-left: auto;
        }

        .resume-blade-card {
            background: rgba(var(--text-primary-rgb), 0.02) !important;
            border: 1px solid var(--border-color) !important;
        }

        .resume-card-inner {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 1.5rem 0;
        }

        .resume-visual-box {
            width: 60px;
            height: 70px;
            background: rgba(var(--text-primary-rgb), 0.03);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
        }

        .mini-spec-doc {
            width: 30px;
            height: 40px;
            border: 1px solid var(--border-color);
            border-radius: 2px;
            position: relative;
            background: var(--bg-primary);
            display: flex;
            flex-direction: column;
            padding: 6px;
            gap: 4px;
        }

        .spec-lines {
            display: flex;
            flex-direction: column;
            gap: 4px;
            opacity: 0.3;
        }

        .s-line {
            height: 2px;
            background: var(--text-primary);
            border-radius: 1px;
        }

        .s-line.l { width: 100%; }
        .s-line.m { width: 60%; }
        .s-line.s { width: 40%; }

        .spec-node {
            position: absolute;
            top: 6px;
            right: 6px;
            width: 4px;
            height: 4px;
            background: var(--accent-primary);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--accent-primary);
            animation: node-pulse-mini 2s infinite;
        }

        @keyframes node-pulse-mini {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
        }

        .spec-glint {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, transparent, rgba(var(--accent-primary-rgb), 0.05), transparent);
            animation: spec-scan 4s infinite linear;
        }

        @keyframes spec-scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }

        .resume-info {
            flex-grow: 1;
        }

        .resume-label {
            font-family: var(--font-mono);
            font-size: 0.6rem;
            color: var(--text-muted);
            letter-spacing: 2px;
            display: block;
            margin-bottom: 4px;
        }

        .resume-status {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            font-weight: 800;
            color: var(--text-primary);
        }

        .resume-action-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: var(--text-primary);
            color: var(--bg-primary-color);
            text-decoration: none;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 800;
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .resume-action-btn:hover {
            background: var(--accent-primary);
            color: white;
            transform: translateY(-2px);
        }

        .resume-card-footer {
            padding-top: 1rem;
            border-top: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            font-family: var(--font-mono);
            font-size: 0.55rem;
            color: var(--text-muted);
            opacity: 0.6;
        }

        .resume-blade-aura {
            position: absolute;
            inset: -40px;
            background: radial-gradient(circle, rgba(var(--accent-primary-rgb), 0.04) 0%, transparent 70%);
            z-index: -1;
            pointer-events: none;
        }

        .system-logic-illustration {
            position: absolute;
            inset: -60px;
            pointer-events: none;
            z-index: -1;
            color: var(--border-color);
            opacity: 0.4;
        }

        .logic-grid {
            width: 100%;
            height: 100%;
            opacity: 0.3;
        }

        .logic-node {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-primary);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--accent-primary);
            animation: float-node 8s infinite ease-in-out;
        }

        .logic-node.n-1 { top: 20%; left: 30%; animation-delay: 0s; }
        .logic-node.n-2 { bottom: 30%; right: 25%; animation-delay: -2s; }
        .logic-node.n-3 { top: 50%; right: 40%; animation-delay: -4s; }

        @keyframes float-node {
            0%, 100% { transform: translate(0, 0); opacity: 0.3; }
            50% { transform: translate(10px, -20px); opacity: 0.8; }
        }

        @media (max-width: 1024px) {
            .about-grid {
                grid-template-columns: 1fr;
                gap: 4rem;
                text-align: center;
            }
            .resume-card-container {
                margin: 0 auto;
            }
            .about-tags {
                justify-content: center;
            }
        }

        @media (max-width: 768px) {
          .narrative-p.main {
            font-size: 1.2rem;
            line-height: 1.5;
            margin-bottom: 1.5rem;
          }
          .narrative-p {
            font-size: 1rem;
            line-height: 1.6;
          }
          .resume-card-inner {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1rem;
            gap: 1rem;
          }
          .resume-visual-box {
            margin: 0 auto;
          }
          .resume-action-btn {
              width: 100%;
              justify-content: center;
          }
          .system-logic-illustration {
              inset: -20px;
              opacity: 0.2;
          }
        }

        @media (max-width: 480px) {
            .about-container {
                padding: 0 1.25rem;
            }
            .resume-status {
                font-size: 0.7rem;
            }
        }

      `}</style>
    </section>
  );
};

export default About;
