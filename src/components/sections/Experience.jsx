import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            role: "Back End Developer",
            company: "Pixeldust Technologies",
            location: "Mumbai, Maharashtra",
            period: "Sept 2025 - Present",
            description: [
                "Developing and maintaining backend systems powering various client projects with a focus on reliability and modular design.",
                "Implementing API integrations, optimizing database queries, and enhancing system performance.",
                "Collaborating closely with UI/UX and mobile teams to deliver seamless, production-ready features."
            ]
        },
        {
            role: "Tech Lead",
            company: "BizAssist",
            location: "Remote",
            period: "Oct 2024 - Sept 2025",
            description: [
                "Led technical development for BizAssist’s agency platform, ensuring smooth delivery of product features.",
                "Architected backend systems using Next.js, Node.js, and MongoDB, deployed on Vercel and AWS.",
                "Supervised junior developers and oversaw code quality, release pipelines, and infra planning.",
                "Drove product roadmap execution from planning to deployment."
            ]
        },
        {
            role: "Technical Lead",
            company: "Stride Ahead",
            location: "Delhi",
            period: "May 2025 - August 2025",
            description: [
                "Spearheaded initiatives to stabilise and scale the existing system, ensuring high availability and performance under growing demand.",
                "Streamlined workflows and processes, eliminating inefficiencies and improving cross-team collaboration.",
                "Leveraged LLMs and AI agents to automate routine tasks, enhance decision-making, and accelerate development cycles.",
                "Introduced best practices and optimisations that reduced downtime, improved deployment speed, and delivered a more reliable platform."
            ]
        },
        {
            role: "System Engineer",
            company: "Gridlogic",
            location: "Gurgaon, Haryana",
            period: "March 2023 - May 2025",
            description: [
                "Developed and maintained an AI-based gaming system by adding new features to the existing core platform APIs, Game Engine, and dashboard.",
                "Collaborated using tools like RabbitMQ, Redis, Twisted, and Fast API to enhance system performance and functionality.",
                "Developed and implemented RESTful APIs to enable seamless communication between various components of the gaming system.",
                "Implemented security measures to ensure the safety and integrity of the gaming system.",
                "Designed and implemented blockchain technology solutions for secure key management and digital asset transactions."
            ]
        },
        {
            role: "Senior Software Development Engineer",
            company: "Stride Ahead",
            location: "Delhi",
            period: "Jan 2022 - March 2023",
            description: [
                "Mentored and managed a team of junior developers and interns, driving their growth and contributing to the successful attainment of business objectives.",
                "Designed and developed a robust backend service for a mobile app, ensuring seamless functionality and meeting predefined metrics.",
                "Played a key role in team-wide architectural decisions, leveraging valuable insights to enhance overall project outcomes.",
                "Orchestrated server scaling and microservice scaling, responding effectively to evolving business needs.",
                "Constructed SaaS solutions specifically tailored for educational institutes, enhancing their efficiency.",
                "Managed and maintained the backend infrastructure consisting of over 10+ servers and deployment of React Native based mobile application."
            ]
        },
        {
            role: "Software Development Engineer",
            company: "Stride Ahead",
            location: "Delhi",
            period: "March 2021 - Jan 2022",
            description: [
                "Collaborated with senior stakeholders to align business objectives and define project roadmaps, resulting in the development of a comprehensive assessment platform.",
                "Managed the deployment and ongoing maintenance of the software, ensuring smooth operations for a rapidly expanding user base.",
                "Independently designed and developed the entire back-end system, encompassing assessments, landing pages, and the CMS.",
                "Provided Software-as-a-Service (SaaS) solutions to additional clients, expanding the reach and impact of the assessment platform."
            ]
        }
    ];

    return (
        <section id="experience" className="experience-section">
            <div className="section-header">
                <h2 className="section-title">
                    <span className="hash">#</span> Experience
                </h2>
                <p className="section-subtitle">
                    My professional journey and contributions.
                </p>
            </div>

            <div className="timeline">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="timeline-item"
                    >
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                            <div className="exp-header">
                                <h3>{exp.role}</h3>
                                <div className="exp-meta">
                                    <span className="company">
                                        <Briefcase size={14} /> {exp.company}
                                    </span>
                                    <span className="location">
                                        <MapPin size={14} /> {exp.location}
                                    </span>
                                    <span className="period">
                                        <Calendar size={14} /> {exp.period}
                                    </span>
                                </div>
                            </div>
                            <ul className="exp-description">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style>{`
        .experience-section {
          padding: var(--spacing-xl) 0;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding-left: 20px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border-color);
        }

        .timeline-item {
          position: relative;
          margin-bottom: var(--spacing-xl);
          padding-left: var(--spacing-lg);
        }

        .timeline-marker {
          position: absolute;
          left: -25px; /* Adjust based on padding-left of timeline + width of line */
          top: 5px;
          width: 12px;
          height: 12px;
          background: var(--bg-primary);
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          z-index: 1;
        }
        
        /* Fix for marker positioning relative to the line */
        .timeline {
            padding-left: 30px;
        }
        .timeline::before {
            left: 11px;
        }
        .timeline-marker {
            left: 6px; /* 11px (line left) - 6px (half width) + 1px (center align) */
            top: 6px;
        }

        .timeline-content {
          background: var(--bg-secondary);
          padding: var(--spacing-lg);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: transform var(--transition-fast);
        }

        .timeline-content:hover {
          transform: translateX(5px);
          border-color: var(--accent-primary);
        }

        .exp-header h3 {
          font-size: 1.2rem;
          margin-bottom: var(--spacing-xs);
          color: var(--text-primary);
        }

        .exp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
          font-size: 0.85rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .exp-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .exp-description {
          list-style-type: disc;
          padding-left: 20px;
          color: var(--text-secondary);
        }

        .exp-description li {
          margin-bottom: 5px;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
            .timeline {
                padding-left: 20px;
            }
            .timeline::before {
                left: 9px;
            }
            .timeline-marker {
                left: 4px;
            }
            .timeline-content {
                padding: var(--spacing-md);
            }
            .exp-header h3 {
                font-size: 1.1rem;
            }
        }
      `}</style>
        </section>
    );
};

export default Experience;
