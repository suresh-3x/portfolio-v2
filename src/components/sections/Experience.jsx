import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building2, ExternalLink, Clock, LayoutList, GitBranch } from 'lucide-react';
import Card from '../ui/Card';
import { experienceEntries } from '../../data/experience';
import { CompanyLogoGroup } from '../experience/CompanyLogo';

const Experience = () => {
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'timeline'

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

  // ── Card View: Group by company ──
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

  // ── Timeline View: chronological, all roles flat, sorted by start date ──
  const timelineEntries = useMemo(() => {
    return [...experienceEntries]
      .map(entry => {
        const parts = entry.period.split(/\s*[–\-]\s*/);
        const startDate = parts.length === 2 ? parseDate(parts[0]) : new Date();
        const endDate = parts.length === 2 ? parseDate(parts[1]) : new Date();
        return { ...entry, startDate, endDate };
      })
      .sort((a, b) => b.startDate - a.startDate); // most recent first
  }, []);

  // Find global range for the timeline
  const timelineRange = useMemo(() => {
    if (!timelineEntries.length) return { min: new Date(), max: new Date() };
    const starts = timelineEntries.map(e => e.startDate.getTime());
    const ends = timelineEntries.map(e => e.endDate.getTime());
    return { min: new Date(Math.min(...starts)), max: new Date(Math.max(...ends)) };
  }, [timelineEntries]);

  const totalRangeMonths = useMemo(() => {
    return (timelineRange.max.getFullYear() - timelineRange.min.getFullYear()) * 12 +
      (timelineRange.max.getMonth() - timelineRange.min.getMonth()) + 1;
  }, [timelineRange]);

  const getBarPosition = (entry) => {
    const startOffset = (entry.startDate.getFullYear() - timelineRange.min.getFullYear()) * 12 +
      (entry.startDate.getMonth() - timelineRange.min.getMonth());
    const duration = (entry.endDate.getFullYear() - entry.startDate.getFullYear()) * 12 +
      (entry.endDate.getMonth() - entry.startDate.getMonth()) + 1;
    return {
      left: `${(startOffset / totalRangeMonths) * 100}%`,
      width: `${Math.max((duration / totalRangeMonths) * 100, 2)}%`
    };
  };

  const formatShortDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Generate year markers for timeline
  const yearMarkers = useMemo(() => {
    const markers = [];
    const startYear = timelineRange.min.getFullYear();
    const endYear = timelineRange.max.getFullYear();
    for (let y = startYear; y <= endYear; y++) {
      const offset = (y - startYear) * 12 - timelineRange.min.getMonth();
      markers.push({ year: y, left: `${(offset / totalRangeMonths) * 100}%` });
    }
    return markers;
  }, [timelineRange, totalRangeMonths]);

  const getThemeVariable = (index) => {
    const vars = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)'];
    return vars[index % 3];
  };

  return (
    <section className="experience-section">

      {/* View Toggle */}
      <div className="exp-view-toggle">
        <button
          className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
          onClick={() => setViewMode('card')}
          aria-label="Card view"
        >
          <LayoutList size={14} />
          <span>Cards</span>
        </button>
        <button
          className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
          onClick={() => setViewMode('timeline')}
          aria-label="Timeline view"
        >
          <GitBranch size={14} />
          <span>Timeline</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'card' ? (
          /* ═══ CARD VIEW ═══ */
          <motion.div
            key="card-view"
            className="experience-timeline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {groupedExperiences.map((group, groupIndex) => {
              const accentColor = getThemeVariable(groupIndex);
              const cardStyle = { borderRadius: '4px' };
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
                        <CompanyLogoGroup logos={group.logos} size={44} />
                        <div className="company-text-block">
                          <h3 className="company-name" style={{ color: accentColor }}>
                            {group.company}
                          </h3>
                          {group.companyLine && (
                            <p className="company-subline">{group.companyLine}</p>
                          )}
                        </div>
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
          </motion.div>
        ) : (
          /* ═══ TIMELINE VIEW ═══ */
          <motion.div
            key="timeline-view"
            className="tl-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Year axis */}
            <div className="tl-axis">
              <div className="tl-axis-track">
                {yearMarkers.map(m => (
                  <div key={m.year} className="tl-year-marker" style={{ left: m.left }}>
                    <span className="tl-year-label">{m.year}</span>
                    <div className="tl-year-tick" />
                  </div>
                ))}
              </div>
            </div>

            {/* Swimlanes */}
            <div className="tl-lanes">
              {timelineEntries.map((entry, idx) => {
                const accentColor = getThemeVariable(idx);
                const pos = getBarPosition(entry);
                const isPresent = entry.period.toLowerCase().includes('present');

                return (
                  <motion.div
                    key={entry.id}
                    className="tl-lane"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <div className="tl-lane-label">
                      <div className="tl-lane-logos">
                        <CompanyLogoGroup logos={entry.logos} size={28} />
                      </div>
                      <div className="tl-lane-info">
                        <span className="tl-lane-role">{entry.role}</span>
                        <span className="tl-lane-company">{entry.company}</span>
                      </div>
                    </div>
                    <div className="tl-lane-track">
                      <div className="tl-grid-lines">
                        {yearMarkers.map(m => (
                          <div key={m.year} className="tl-grid-line" style={{ left: m.left }} />
                        ))}
                      </div>
                      <div
                        className={`tl-bar ${isPresent ? 'tl-bar--present' : ''}`}
                        style={{
                          left: pos.left,
                          width: pos.width,
                          '--bar-accent': accentColor,
                        }}
                      >
                        <span className="tl-bar-period">
                          {formatShortDate(entry.startDate)} – {isPresent ? 'Now' : formatShortDate(entry.endDate)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .experience-section {
          position: relative;
        }

        /* ── Toggle ── */
        .exp-view-toggle {
          display: flex;
          gap: 4px;
          justify-content: flex-end;
          max-width: 1200px;
          margin: 0 auto 2rem;
          padding: 3px;
          background: rgba(var(--text-primary-rgb), 0.03);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 769px) {
          .exp-view-toggle {
            margin-right: 0;
            margin-left: auto;
            max-width: 1200px;
            width: fit-content;
          }
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .toggle-btn:hover {
          color: var(--text-primary);
          background: rgba(var(--text-primary-rgb), 0.04);
        }

        .toggle-btn.active {
          background: var(--text-primary);
          color: var(--bg-primary-color);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        /* ── Card View ── */
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
          align-items: flex-start;
          gap: 14px;
          flex-wrap: wrap;
        }

        .company-text-block {
          flex: 1;
          min-width: 160px;
        }

        /* ── Company Logos ── */
        .company-logo-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .company-logo-group--stacked {
          flex-direction: column;
        }

        .company-logo-wrap {
          display: flex;
          align-items: center;
        }

        .company-logo-sep {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-secondary);
          opacity: 0.5;
          line-height: 1;
        }

        .company-logo-link {
          display: inline-flex;
          flex-shrink: 0;
          border-radius: 10px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .company-logo-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(var(--accent-primary-rgb), 0.15);
        }

        .company-logo-link:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 2px;
        }

        .company-logo,
        .company-logo-fallback {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          object-fit: contain;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 6px;
          flex-shrink: 0;
          display: block;
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

        .company-link {
          color: var(--text-secondary);
          transition: color 0.2s;
          align-self: center;
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

        /* ── Timeline View ── */
        .tl-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .tl-axis {
          margin-bottom: 1.5rem;
          padding-left: 220px;
        }

        .tl-axis-track {
          position: relative;
          height: 28px;
          border-bottom: 1px solid var(--border-color);
        }

        .tl-year-marker {
          position: absolute;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tl-year-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-secondary);
          opacity: 0.7;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .tl-year-tick {
          width: 1px;
          height: 8px;
          background: var(--border-color);
        }

        .tl-lanes {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tl-lane {
          display: flex;
          align-items: center;
          gap: 0;
          min-height: 48px;
          border-radius: 6px;
          transition: background 0.2s;
          padding: 6px 0;
        }

        .tl-lane:hover {
          background: rgba(var(--text-primary-rgb), 0.02);
        }

        .tl-lane-label {
          width: 220px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 16px;
        }

        .tl-lane-logos {
          flex-shrink: 0;
        }

        .tl-lane-logos .company-logo-group {
          gap: 3px;
        }

        .tl-lane-logos .company-logo,
        .tl-lane-logos .company-logo-fallback {
          width: 28px !important;
          height: 28px !important;
          border-radius: 6px;
          padding: 3px;
        }

        .tl-lane-logos .company-logo-sep {
          font-size: 0.6rem;
        }

        .tl-lane-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .tl-lane-role {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tl-lane-company {
          font-size: 0.68rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          opacity: 0.7;
        }

        .tl-lane-track {
          flex: 1;
          position: relative;
          height: 36px;
          border-radius: 4px;
          min-width: 0;
        }

        .tl-grid-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .tl-grid-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--border-color);
          opacity: 0.4;
        }

        .tl-bar {
          position: absolute;
          top: 4px;
          bottom: 4px;
          border-radius: 4px;
          background: var(--bar-accent);
          opacity: 0.2;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: default;
        }

        .tl-bar:hover {
          opacity: 0.45;
          transform: scaleY(1.15);
        }

        .tl-bar--present {
          opacity: 0.35;
          border-right: 2px dashed var(--bar-accent);
          animation: tl-pulse 3s infinite ease-in-out;
        }

        @keyframes tl-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.5; }
        }

        .tl-bar-period {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          letter-spacing: 0.3px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .tl-bar:hover .tl-bar-period {
          opacity: 1;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .experience-timeline {
            padding-left: 0.25rem;
            max-width: 100%;
          }
          .experience-group {
            padding-left: 1.25rem;
            margin-left: 0.25rem;
            margin-bottom: 3.5rem;
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
          .company-info-row {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
            gap: 10px 12px;
          }
          .company-text-block {
            grid-column: 2;
            min-width: 0;
          }
          .company-link {
            grid-column: 2;
            justify-self: start;
          }
          .badges-row {
            grid-column: 1 / -1;
            margin-left: 0;
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
             display: none;
          }
          .role-description {
            padding-left: 1.25rem;
          }
          .role-description li {
            font-size: 0.85rem;
            margin-bottom: 0.75rem;
          }

          /* Timeline view mobile: stack labels above bars */
          .tl-axis { padding-left: 0; }
          .tl-lane {
            flex-direction: column;
            align-items: stretch;
            gap: 4px;
            padding: 10px 0;
          }
          .tl-lane-label {
            width: 100%;
            padding-right: 0;
            padding-bottom: 4px;
          }
          .tl-lane-track { height: 28px; }
          .tl-bar-period { opacity: 1; font-size: 0.52rem; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
