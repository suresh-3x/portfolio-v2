import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2, ExternalLink, Briefcase } from 'lucide-react';
import Card from '../ui/Card';
import { useTheme } from '../../context/ThemeContext';

const Experience = () => {
  const { theme } = useTheme();

  const RawData = [
    {
      role: "Back End Developer",
      company: "Pixeldust Technologies",
      website: "https://www.pixeldust.in",
      themeColor: "linear-gradient(135deg, #fd7f38, #f43d68)",
      location: "Mumbai",
      period: "Sept 2025 - Present",
      type: "Hybrid",
      year: 2025,
      month: 9,
      description: [
        "Developing and maintaining backend systems powering various client projects with a focus on reliability and modular design.",
        "Implementing API integrations, optimizing database queries, and enhancing system performance.",
        "Collaborating closely with UI/UX and mobile teams to deliver seamless features."
      ]
    },
    {
      role: "Technical Lead",
      company: "Stride Ahead",
      website: "https://strideahead.in",
      themeColor: "#3f52fd", // New Specific Blue
      location: "Delhi",
      period: "May 2025 - August 2025",
      type: "Remote",
      year: 2025,
      month: 5,
      description: [
        "Spearheaded initiatives to stabilise and scale the existing system for high availability.",
        "Leveraged AI agents to automate routine tasks and accelerate development cycles.",
        "Introduced best practices that reduced downtime and delivered a more reliable platform."
      ]
    },
    {
      role: "Tech Lead",
      company: "BizAssist",
      website: "#",
      themeColor: "rgb(0, 107, 255)", // Brand Blue
      location: "Mumbai",
      period: "Oct 2024 - Sept 2025",
      type: "Remote",
      year: 2024,
      month: 10,
      description: [
        "Led technical development for BizAssist’s agency platform, ensuring smooth delivery.",
        "Architected backend systems using Next.js, Node.js, and MongoDB, deployed on Vercel and AWS.",
        "Supervised junior developers and managed release pipelines and infra planning."
      ]
    },
    {
      role: "System Engineer",
      company: "Gridlogic",
      website: "https://gridlogic.in",
      themeColor: "#E63946", // Now Red
      location: "Gurgaon",
      period: "March 2023 - May 2025",
      type: "Remote",
      year: 2023,
      month: 3,
      description: [
        "Developed core platform APIs and Game Engine features for an AI-based gaming system.",
        "Collaborated using RabbitMQ, Redis, Twisted, and Fast API to enhance performance.",
        "Implemented secure blockchain technology for digital asset transactions."
      ]
    },
    {
      role: "Senior Software Development Engineer",
      company: "Stride Ahead",
      website: "https://strideahead.in",
      themeColor: "#3f52fd", // Stride Ahead Blue
      location: "Delhi",
      period: "Jan 2022 - March 2023",
      type: "Remote",
      year: 2022,
      month: 1,
      description: [
        "Mentored and managed a team of junior developers, driving growth and business objectives.",
        "Designed and developed a robust backend service for a mobile app meeting defined metrics.",
        "Orchestrated server and microservice scaling responding effectively to business needs."
      ]
    },
    {
      role: "Software Development Engineer",
      company: "Stride Ahead",
      website: "https://strideahead.in",
      themeColor: "#3f52fd", // Stride Ahead Blue
      location: "Delhi",
      period: "March 2021 - Jan 2022",
      type: "Remote",
      year: 2021,
      month: 3,
      description: [
        "Collaborated with stakeholders to define roadmaps for a comprehensive assessment platform.",
        "Independently designed and developed the entire back-end system encompassing assessments and CMS.",
        "Managed deployment and maintenance for a rapidly expanding user base."
      ]
    }
  ];

  // Intelligent Sorting Logic (Newest First)
  const experiences = useMemo(() => {
    return [...RawData].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  }, []);

  const uniqueCompanies = useMemo(() => [...new Set(experiences.map(e => e.company))], [experiences]);

  const getSolidColor = (colorStr) => {
    if (colorStr.includes('gradient')) {
      const matches = colorStr.match(/#[a-fA-F0-9]{3,6}|rgba?\([^)]+\)/g);
      return matches && matches.length > 1 ? matches[1] : (matches ? matches[0] : '#fd7f38');
    }
    return colorStr;
  };

  return (
    <section id="experience" className="experience-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="hash">#</span> Experience
        </h2>
        <p className="section-subtitle">
          Professional trajectory across industry-leading organizations.
        </p>
      </div>

      <div className="experience-timeline">
        {experiences.map((exp, index) => {
          const isMultiple = experiences.filter(e => e.company === exp.company).length > 1;
          const isFirstInGroup = index === 0 || experiences[index - 1].company !== exp.company;
          const isLastInGroup = index === experiences.length - 1 || experiences[index + 1].company !== exp.company;

          const isMonochrome = theme === 'monochrome';
          const isRGB = theme === 'rgb';

          const RGB_COLORS = {
            primary: '#3fb950',   // Green
            secondary: '#3f52fd', // Blue
            tertiary: '#ff4b4b'   // Red
          };

          const getThemeAccent = (companyName) => {
            if (isMonochrome) return '#ffffff';
            if (isRGB) {
              const companyIdx = uniqueCompanies.indexOf(companyName);
              const colors = [RGB_COLORS.primary, RGB_COLORS.secondary, RGB_COLORS.tertiary];
              return colors[companyIdx % 3];
            }
            return null;
          };

          const currentAccent = getThemeAccent(exp.company);
          const nextAccent = experiences[index + 1] ? getThemeAccent(experiences[index + 1].company) : null;

          const solidColor = currentAccent || getSolidColor(exp.themeColor);
          const nextSolidColor = nextAccent || (experiences[index + 1] ? getSolidColor(experiences[index + 1].themeColor) : solidColor);
          const displayColor = currentAccent || exp.themeColor;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`timeline-item ${isMultiple ? 'is-multi' : ''}`}
            >
              {/* Vertical Connector */}
              <div className="timeline-rail">
                <div
                  className="rail-line"
                  style={{
                    background: index === experiences.length - 1 ? 'transparent' : `linear-gradient(to bottom, ${solidColor}, ${nextSolidColor})`,
                    opacity: isMultiple && !isLastInGroup && experiences[index + 1]?.company === exp.company ? 1 : 0.3
                  }}
                ></div>
                <div
                  className="rail-node"
                  style={{
                    background: solidColor,
                    boxShadow: isMonochrome ? 'none' : `0 0 15px ${solidColor}50`
                  }}
                >
                  <Briefcase size={12} color={isMonochrome ? '#000' : '#fff'} />
                </div>
              </div>

              <div className="timeline-content">
                <div className="item-header">
                  <div className="company-group">
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="company-link"
                      style={{ color: solidColor }}
                    >
                      <span className="name">{exp.company}</span>
                      <ExternalLink size={12} className="ext-icon" />
                    </a>
                  </div>
                  <div className="time-meta">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <Card
                  className="experience-entry-card"
                  showStrip={true}
                  noPadding={true}
                  style={{ '--accent-primary': solidColor }}
                >
                  <div className="card-body">
                    <div className="role-top">
                      <h3>{exp.role}</h3>
                      <span className="type-pill" style={{
                        borderColor: isMonochrome ? 'var(--text-secondary)' : solidColor + '40',
                        color: isMonochrome ? 'var(--text-secondary)' : solidColor
                      }}>
                        {exp.type}
                      </span>
                    </div>

                    <div className="location-info">
                      <MapPin size={12} /> {exp.location}
                    </div>

                    <ul className="description-list">
                      {exp.description.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .experience-section {
          padding: 6rem 0;
          position: relative;
        }

        .experience-timeline {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          padding-left: 50px;
        }

        .timeline-item {
          display: flex;
          gap: 2.5rem;
          margin-bottom: 4rem;
          position: relative;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        .timeline-rail {
          position: absolute;
          left: -40px;
          top: 0;
          bottom: 0;
          width: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 5px;
        }

        .rail-line {
          position: absolute;
          top: 30px;
          bottom: -4rem;
          width: 2px;
          z-index: 1;
        }

        .rail-node {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          margin-bottom: 10px;
          transition: transform 0.3s ease;
        }

        .timeline-item:hover .rail-node {
          transform: scale(1.15) rotate(5deg);
        }

        .timeline-content {
          flex-grow: 1;
          width: 100%;
          position: relative;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-family: var(--font-mono);
          position: relative;
          z-index: 2;
        }

        .company-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          transition: opacity 0.3s;
        }

        .company-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        .ext-icon {
          opacity: 0.5;
        }

        .time-meta {
          color: var(--text-secondary);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.7;
        }

        .experience-entry-card {
          border-radius: 4px !important;
          z-index: 2;
        }

        .card-body {
          padding: 2rem;
        }

        .role-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .role-top h3 {
          font-size: 1.4rem;
          margin: 0;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          font-weight: 800;
        }

        .type-pill {
          font-size: 0.7rem;
          text-transform: uppercase;
          padding: 2px 10px;
          border: 1px solid;
          border-radius: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .location-info {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        .description-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.8rem;
        }

        .description-list li {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          padding-left: 1.5rem;
          position: relative;
        }

        .description-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .experience-timeline { padding-left: 30px; }
          .timeline-rail { left: -30px; }
          .item-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .time-meta { margin-left: 26px; }
          .role-top { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .card-body { padding: 1.5rem; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
