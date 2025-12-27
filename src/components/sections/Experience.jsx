import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Globe, Building2 } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      role: "Back End Developer",
      company: "Pixeldust Technologies",
      type: "Hybrid",
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
      type: "Remote",
      location: "Mumbai, Maharashtra",
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
      type: "Remote",
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
      type: "Remote",
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
      type: "Remote",
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
      type: "Remote",
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
                  <span className="type">
                    {exp.type === 'Remote' ? <Globe size={14} /> : <Building2 size={14} />} {exp.type}
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
        /* Section Spacing */
        .experience-section {
          padding: var(--spacing-xl) 0;
        }

        /* Timeline Container */
        .timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding-left: 40px;
        }

        /* Vertical Line */
        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom,
            var(--accent-primary) 0%,
            var(--border-color) 15%,
            var(--border-color) 85%,
            var(--accent-primary) 100%
          );
          opacity: 0.3;
        }

        /* Timeline Item */
        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        /* Timeline Marker */
        .timeline-marker {
          position: absolute;
          left: -46px; /* -40px padding - 6px half width */
          top: 24px;
          width: 14px;
          height: 14px;
          background: var(--bg-primary);
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
          transition: transform var(--transition-fast), background-color var(--transition-fast);
        }

        .timeline-item:hover .timeline-marker {
          background: var(--accent-primary);
          transform: scale(1.2);
        }

        /* Card Content */
        .timeline-content {
          background: rgba(10, 10, 10, 0.6);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          transition: all var(--transition-normal);
          backdrop-filter: blur(5px);
          position: relative;
          overflow: hidden;
        }

        .timeline-content:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 255, 157, 0.3);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
          background: rgba(15, 15, 15, 0.8);
        }

        /* Subtle glow on hover */
        .timeline-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
          opacity: 0;
          transition: opacity var(--transition-normal);
        }

        .timeline-content:hover::before {
          opacity: 0.5;
        }

        /* Header & Title */
        .exp-header {
          margin-bottom: 1.5rem;
        }

        .exp-header h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Meta Data (Company, Location, Date) */
        .exp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 0.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .exp-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all var(--transition-fast);
        }

        .timeline-content:hover .exp-meta span {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .exp-meta span.company {
          color: var(--accent-primary);
          background: rgba(0, 255, 157, 0.05);
          border-color: rgba(0, 255, 157, 0.1);
        }

        /* Description List */
        .exp-description {
          list-style: none;
          padding: 0;
          margin-top: 1.5rem;
        }

        .exp-description li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
        }

        .exp-description li::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
          font-size: 1.2rem;
          line-height: 1.7rem;
        }

        .exp-description li:last-child {
          margin-bottom: 0;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .timeline {
                padding-left: 20px;
                max-width: 100%;
            }
            .timeline::before {
                left: 9px;
            }
            .timeline-marker {
                left: 4px;
            }
            .timeline-content {
                padding: 1.5rem;
            }
            .exp-header h3 {
                font-size: 1.3rem;
            }
            .exp-meta {
                gap: 0.5rem;
            }
            .exp-meta span {
                font-size: 0.8rem;
            }
            .exp-description {
                padding-left: 0;
            }
        }
      `}</style>
    </section>
  );
};

export default Experience;
