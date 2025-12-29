import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2, ExternalLink, Clock } from 'lucide-react';
import Card from '../ui/Card';

const Experience = () => {

  const RawData = [
    {
      role: "Back End Developer",
      company: "Pixeldust Technologies",
      website: "https://www.pixeldust.in",
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

  // Duration Helper
  const calculateTotalDuration = (roles) => {
    const parseDate = (str) => {
      if (!str) return new Date();
      if (str.toLowerCase() === 'present') return new Date();
      return new Date(str);
    };

    // 1. Get all intervals
    const intervals = roles.map(role => {
      const parts = role.period.split(' - ');
      if (parts.length !== 2) return null;
      return {
        start: parseDate(parts[0]),
        end: parseDate(parts[1])
      };
    }).filter(Boolean);

    if (intervals.length === 0) return "";

    // 2. Sort by start date
    intervals.sort((a, b) => a.start - b.start);

    // 3. Merge overlapping intervals
    const merged = [];
    if (intervals.length > 0) {
      let current = intervals[0];

      for (let i = 1; i < intervals.length; i++) {
        const next = intervals[i];

        // If overlap or adjacent (within 30 days?), merge
        // Actually, just strict date comparison is fine for "Month Year" resolution
        if (next.start <= current.end) {
          // Extend current end if next end is later
          if (next.end > current.end) {
            current.end = next.end;
          }
        } else {
          // No overlap, push current and start new
          merged.push(current);
          current = next;
        }
      }
      merged.push(current);
    }

    // 4. Calculate total months
    let totalMonths = 0;
    merged.forEach(interval => {
      let months = (interval.end.getFullYear() - interval.start.getFullYear()) * 12;
      months += interval.end.getMonth() - interval.start.getMonth();
      // Add 1 month to be inclusive (Jan to Jan is 1 month of work usually implied?)
      // Actually standard diff for "Jan - Feb" is 1. If we want inclusive count e.g. "Jan - Mar" = 3 months (Jan, Feb, Mar)?
      // Usually "Jan 2022 - Jan 2023" = 12 months.
      // "Jan - Jan" usually means 1 month or 0? 
      // Let's treat standard difference + 1 for inclusive month count if we consider 'working during that month'.
      // If result is 0 (same month), count as 1.
      months = Math.max(1, months + (interval.end.getDate() >= interval.start.getDate() ? 0 : -1));

      // Let's stick to simple month diff + 1 for inclusive start/end month
      // Re-calcing simpler:
      const diffBytes = (interval.end.getFullYear() - interval.start.getFullYear()) * 12 + (interval.end.getMonth() - interval.start.getMonth());
      totalMonths += Math.max(1, diffBytes + 1);
    });

    const years = Math.floor(totalMonths / 12);
    const remMonths = totalMonths % 12;

    if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remMonths > 0 ? `${remMonths} mos` : ''}`;
    }
    return `${totalMonths} mos`;
  };

  // Group experiences by company and sort
  const groupedExperiences = useMemo(() => {
    const groups = {};

    RawData.forEach(role => {
      if (!groups[role.company]) {
        groups[role.company] = {
          company: role.company,
          website: role.website,
          location: role.location,
          latestYear: role.year,
          latestMonth: role.month,
          roles: []
        };
      } else {
        if (role.year > groups[role.company].latestYear ||
          (role.year === groups[role.company].latestYear && role.month > groups[role.company].latestMonth)) {
          groups[role.company].latestYear = role.year;
          groups[role.company].latestMonth = role.month;
        }
      }
      groups[role.company].roles.push(role);
    });

    const groupArray = Object.values(groups).sort((a, b) => {
      if (a.latestYear !== b.latestYear) return b.latestYear - a.latestYear;
      return b.latestMonth - a.latestMonth;
    });

    groupArray.forEach(group => {
      group.totalDuration = calculateTotalDuration(group.roles);
      group.roles.sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
    });

    return groupArray;
  }, []);

  const getThemeVariable = (index) => {
    const vars = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)'];
    return vars[index % 3];
  };

  return (
    <section id="experience" className="experience-section">


      <div className="experience-timeline">
        {groupedExperiences.map((group, groupIndex) => {
          const accentColor = getThemeVariable(groupIndex);
          const cardStyle = { borderRadius: '4px' };
          if (accentColor !== 'var(--accent-primary)') {
            cardStyle['--accent-primary'] = accentColor;
          }

          return (
            <motion.div
              key={group.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
              className="experience-group"
            >
              {/* Timeline Connector */}
              <div className="timeline-connector">
                <div className="timeline-dot" style={{ backgroundColor: accentColor, boxShadow: `0 0 0 4px rgba(var(--bg-primary-rgb), 1)` }}>
                  <Building2 size={14} color="var(--bg-primary-color)" />
                </div>
                <div className="timeline-line" style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }} />
              </div>

              <Card
                className="experience-card"
                showStrip={true}
                noPadding={false}
                style={cardStyle}
              >
                <div className="card-header-group">
                  <div className="company-info-row">
                    <h3 className="company-name" style={{ color: accentColor }}>
                      {group.company}
                    </h3>
                    <a href={group.website} target="_blank" rel="noopener noreferrer" className="company-link" aria-label={`Visit ${group.company}`}>
                      <ExternalLink size={14} />
                    </a>

                    <div className="badges-row">
                      {group.totalDuration && (
                        <div className="duration-badge">
                          <Clock size={12} />
                          {group.totalDuration}
                        </div>
                      )}
                      <div className="location-badge">
                        <MapPin size={12} />
                        {group.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="roles-list">
                  {group.roles.map((role, rIndex) => (
                    <div key={rIndex} className={`role-item ${rIndex !== group.roles.length - 1 ? 'has-border' : ''}`}>
                      <div className="role-header">
                        <h4 className="role-title">{role.role}</h4>
                        <div className="role-meta">
                          <span className="period">
                            <Calendar size={12} /> {role.period}
                          </span>
                          <span className="type-badge">{role.type}</span>
                        </div>
                      </div>
                      <ul className="role-description">
                        {role.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .experience-section {
          position: relative;
        }

        .experience-timeline {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          padding-left: 0;
          padding-right: 0;
        }

        .experience-group {
          position: relative;
          margin-bottom: 3rem;
          padding-left: 2.5rem;
        }

        /* Timeline Connector */
        .timeline-connector {
          position: absolute;
          left: 0;
          top: 0;
          bottom: -3rem;
          width: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .experience-group:last-child .timeline-connector {
           bottom: auto;
           height: 100%;
        }
        
        .experience-group:last-child .timeline-line {
            display: none;
        }

        .timeline-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .timeline-line {
          width: 2px;
          flex-grow: 1;
          margin-top: 4px;
          opacity: 0.3;
        }

        /* Card Content */
        .experience-card {
          width: 100%;
          position: relative;
        }

        .card-header-group {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .company-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .company-name {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0;
        }

        .company-link {
          color: var(--text-secondary);
          transition: color 0.2s;
        }

        .company-link:hover {
          color: var(--text-primary);
        }

        .badges-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }

        .location-badge, .duration-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: 4px 10px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        /* Roles List */
        .roles-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .role-item {
          position: relative;
        }
        
        .role-item.has-border {
            padding-bottom: 1.5rem;
            border-bottom: 1px dashed var(--border-color);
        }

        .role-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.8rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .role-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .role-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
        }

        .period {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        .type-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          border: 1px solid var(--border-color);
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .role-description {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .role-description li {
          position: relative;
          padding-left: 1.2rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .role-description li::before {
          content: '→';
          position: absolute;
          left: 0;
          top: 0px;
          color: var(--accent-primary);
          font-size: 1rem;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .experience-timeline {
            padding-left: 0.25rem; /* Minimized to give space to cards */
            max-width: 100%;
          }
          .experience-group {
            padding-left: 1.25rem; /* Reduced from 2rem to give cards more room */
            margin-left: 0.25rem;
            margin-bottom: 3.5rem;
            position: relative;
          }
          .timeline-connector {
            left: -0.75rem; 
            top: 1.5rem;
            bottom: -3.5rem;
          }
          .timeline-dot {
              width: 20px;
              height: 20px;
              left: -10px;
              top: -4px;
          }
          .timeline-line {
              left: -1px;
          }
          .company-name {
              font-size: 1.1rem;
          }
          .role-header {
            flex-direction: column;
            gap: 4px;
            align-items: flex-start;
          }
          .badges-row {
             display: none; /* Simplify on mobile */
          }
          .role-description {
              padding-left: 1.25rem;
          }
          .role-description li {
              font-size: 0.85rem;
              margin-bottom: 0.75rem;
          }
          .company-logo {
              width: 38px;
              height: 38px;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
