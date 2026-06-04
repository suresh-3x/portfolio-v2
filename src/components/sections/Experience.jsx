import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import Card from '../ui/Card';
import { experienceEntries } from '../../data/experience';
import { CompanyLogoGroup } from '../experience/CompanyLogo';
import { useTheme } from '../../context/ThemeContext';

const Experience = () => {
  const { theme } = useTheme();
  const isMonochrome = theme === 'mono-light' || theme === 'mono-dark';
  const borderMultiplier = isMonochrome ? 3.7 : 1;

  // ── Date Parsing ──
  const monthMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11,
  };

  const parseDate = (str) => {
    if (!str) return new Date();
    const trimmed = str.trim().toLowerCase();
    if (trimmed === 'present') return new Date();
    const parts = trimmed.split(/\s+/);
    if (parts.length === 2) {
      const monthKey = parts[0].replace(/\.$/, '');
      const m = monthMap[monthKey];
      const y = parseInt(parts[1], 10);
      if (m !== undefined && !isNaN(y)) return new Date(y, m, 1);
    }
    return new Date(str);
  };

  // ── Duration Calculator ──
  const calculateTotalDuration = (roles) => {
    const intervals = roles.map(role => {
      const parts = role.period.split(/\s*[–\-]\s*/);
      if (parts.length !== 2) return null;
      return { start: parseDate(parts[0]), end: parseDate(parts[1]) };
    }).filter(Boolean);

    if (intervals.length === 0) return "";
    intervals.sort((a, b) => a.start - b.start);

    const merged = [];
    let current = { ...intervals[0] };
    for (let i = 1; i < intervals.length; i++) {
      const next = intervals[i];
      if (next.start <= current.end) {
        if (next.end > current.end) current.end = next.end;
      } else {
        merged.push(current);
        current = { ...next };
      }
    }
    merged.push(current);

    let totalMonths = 0;
    merged.forEach(iv => {
      const diff = (iv.end.getFullYear() - iv.start.getFullYear()) * 12 + (iv.end.getMonth() - iv.start.getMonth());
      totalMonths += Math.max(1, diff + 1);
    });

    const years = Math.floor(totalMonths / 12);
    const rem = totalMonths % 12;
    if (years > 0) return `${years} yr${years > 1 ? 's' : ''}${rem > 0 ? ` ${rem} mos` : ''}`;
    return `${totalMonths} mos`;
  };

  // ── Group roles by company (Stride roles share a groupKey) ──
  const groupedExperiences = useMemo(() => {
    const groups = {};
    experienceEntries.forEach(entry => {
      const key = entry.groupKey || entry.id;
      if (!groups[key]) {
        groups[key] = {
          key, company: entry.company, companyLine: entry.companyLine,
          website: entry.website, logos: entry.logos,
          sortOrder: entry.sortOrder, roles: []
        };
      } else {
        if (entry.sortOrder < groups[key].sortOrder) groups[key].sortOrder = entry.sortOrder;
      }
      groups[key].roles.push(entry);
    });

    const arr = Object.values(groups).sort((a, b) => a.sortOrder - b.sortOrder);
    arr.forEach(g => {
      g.totalDuration = calculateTotalDuration(g.roles);
      g.roles.sort((a, b) => a.sortOrder - b.sortOrder);
    });
    return arr;
  }, []);

  const getThemeVariable = (index) => {
    const vars = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)'];
    return vars[index % 3];
  };

  return (
    <section className="experience-section" style={{ '--border-multiplier': borderMultiplier }}>
      <div
        className="experience-timeline"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {groupedExperiences.map((group, groupIndex) => {
          const accentColor = getThemeVariable(groupIndex);
          const cardStyle = { borderRadius: '14px' };
          if (accentColor !== 'var(--accent-primary)') {
            cardStyle['--accent-primary'] = accentColor;
          }

          return (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
              className="experience-group"
            >
              <Card
                className="experience-card"
                hover={false}
                showStrip={true}
                noPadding={false}
                style={cardStyle}
              >
                <div className="card-header-group">
                  <div className="company-info-row">
                    <CompanyLogoGroup logos={group.logos} size={44} />
                    <h3 className="company-name" style={{ color: accentColor }}>
                      {group.company}
                    </h3>
                  </div>
                  <div className="company-meta-row">
                    {group.companyLine && (
                      <p className="company-subline">{group.companyLine}</p>
                    )}
                    <div className="badges-row">
                      {group.totalDuration && (
                        <div className="duration-badge">
                          <Clock size={12} />
                          {group.totalDuration}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="roles-list">
                  {group.roles.map((role, rIndex) => (
                    <div key={role.id} className={`role-item ${rIndex !== group.roles.length - 1 ? 'has-border' : ''}`}>
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
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          padding: 0 1.5rem;
        }

        .experience-group {
          position: relative;
          margin-bottom: 2.5rem;
        }

        .experience-group:last-child {
          margin-bottom: 0;
        }

        /* ── Card ── */
        .experience-card {
          width: 100%;
          position: relative;
          /* Disable the shared Card hover/lift entirely */
          transition: none !important;
        }

        .experience-card.custom-card {
          border-width: calc(1px * var(--border-multiplier, 1));
        }

        .experience-card:hover {
          border-color: var(--nb-border);
          box-shadow: var(--nb-shadow) !important;
          transform: none;
        }

        .experience-card .card-strip {
          width: 8px;
          border-right: 2px solid var(--nb-border);
        }

        .experience-card:hover .card-strip {
          width: 8px;
        }

        .card-header-group {
          margin-bottom: 1.5rem;
          border-bottom: 2px solid var(--nb-border);
          padding-bottom: 1.1rem;
        }

        .company-info-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .company-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        .company-subline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.45;
          font-style: italic;
          flex: 1;
          min-width: 0;
        }

        .badges-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Company Logos ── */
        .company-logo-group {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .company-logo-group--stacked {
          flex-direction: column;
        }

        .company-logo-wrap {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
        }

        .company-logo-sep {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-secondary);
          opacity: 0.5;
          line-height: 1;
          flex-shrink: 0;
        }

        .company-logo-link {
          display: inline-flex;
          flex-shrink: 0;
          border-radius: 0;
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }

        .company-logo-link:hover {
          transform: translate(2px, 2px);
          box-shadow: none;
        }

        .company-logo-link:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 2px;
        }

        .company-logo,
        .company-logo-fallback {
          width: 44px;
          height: 44px;
          border-radius: 0;
          object-fit: contain;
          background: var(--bg-secondary);
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          padding: 6px;
          flex-shrink: 0;
          display: block;
        }

        /* Horizontal wordmark logos: keep the 44px height, let width follow the
           aspect ratio so the mark stays readable instead of being squished. */
        .company-logo--wide {
          width: auto;
          max-width: 150px;
          padding: 6px 10px;
          object-fit: contain;
          /* Wordmarks often use dark ink; keep a light chip so they stay
             legible on dark/monochrome themes too. */
          background: #ffffff;
        }

        .company-logo-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--accent-primary);
          letter-spacing: -0.02em;
        }

        .company-name {
          font-size: 1.35rem;
          font-weight: 700;
          margin: 0 0 4px;
          line-height: 1.2;
        }

        .company-subline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.45;
          font-style: italic;
        }

        .badges-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .location-badge, .duration-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--on-accent);
          background: var(--accent-primary);
          padding: 4px 10px;
          border-radius: 0;
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

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
          border-bottom: 2px solid var(--nb-border);
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
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 2px solid var(--nb-border);
          box-shadow: var(--nb-shadow-sm);
          padding: 2px 7px;
          border-radius: 0;
          color: var(--text-primary);
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

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .experience-timeline {
            padding: 0 1rem;
            max-width: 100%;
          }
          .experience-group {
            margin-bottom: 1.5rem;
          }
          /* Stack logo(s) above full-width text so multi-logo cards
             (e.g. T-Systems × Pixeldust) don't squeeze the company name. */
          .company-info-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
          }
          .company-meta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .company-subline {
            font-style: normal;
            margin-bottom: 0;
          }
          .company-name {
            font-size: 1.1rem;
          }
          .card-header-group {
            margin-bottom: 1.1rem;
            padding-bottom: 0.9rem;
          }
          .role-header {
            flex-direction: column;
            gap: 4px;
            align-items: flex-start;
          }
          .badges-row {
            display: none;
          }
          .roles-list {
            gap: 1.25rem;
          }
          .role-description {
            padding-left: 0;
          }
          .role-description li {
            font-size: 0.88rem;
            line-height: 1.55;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
