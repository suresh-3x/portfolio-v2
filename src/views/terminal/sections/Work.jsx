import { projects } from '../../../data/projects';
import { Link } from '../../../router/Router';

const featuredSlugs = [
  'revamp-engine',
  'mcwm-straddle-edge',
  'nomad-mind',
  'calcom-contributions',
];

const featured = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean);

// Derive a small status / metric badge per project from available data.
function badgeFor(p) {
  if (p.tech_details && p.tech_details.host === 'Raspberry Pi 4B') {
    return { text: 'live · runs on Pi 4B', kind: 'ok' };
  }
  const hasLinks = p.links && Object.keys(p.links).length > 0;
  if (!hasLinks) return { text: 'private', kind: 'amber' };
  if (p.category && p.category.startsWith('Open Source')) {
    return { text: 'open source', kind: 'ok' };
  }
  return { text: String(p.year), kind: 'amber' };
}

// Derive a dashed edge outcome line in amber from tech_details or category.
function edgeFor(p) {
  const td = p.tech_details;
  if (td) {
    if (td.architecture) return td.architecture;
    if (td.pipeline) return td.pipeline;
    if (td.integrations) return 'integrations: ' + td.integrations;
    if (td.backend) return td.backend;
  }
  return p.category;
}

function firstLink(links) {
  if (!links) return null;
  return links.github || links.demo || links.external || null;
}

export default function Work() {
  return (
    <section id="work" className="t-work">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">
          <span className="t-sec-h__num">02</span>selected_work
        </span>
        <span className="t-sec-h__count mono">
          {String(featured.length).padStart(2, '0')} systems
        </span>
      </div>

      <div className="t-cards">
        {featured.map((p, i) => {
          const badge = badgeFor(p);
          const href = firstLink(p.links);
          const isDead = href === '#';
          const showLink = href && !isDead;
          const id = 'work/' + String(i + 1).padStart(2, '0');
          const imageSrc = p.image || '/images/projects/default.svg';
          return (
            <article className="t-card stagger-fade" key={p.title}>
              {p.image && (
                <div className="t-card__img">
                  <Link to={`/projects/${p.slug}`}>
                    <img
                      src={imageSrc}
                      alt={`${p.title} - ${p.category || 'Architecture preview'}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.target.src = '/images/projects/default.svg'; }}
                    />
                  </Link>
                </div>
              )}
              <div className="t-card__top">
                <span className="t-card__id mono">{id}</span>
                <span
                  className={
                    't-card__badge mono' +
                    (badge.kind === 'amber' ? ' t-card__badge--amber' : '')
                  }
                >
                  {badge.text}
                </span>
              </div>

              <h3 className="t-card__title mono">
                <Link to={`/projects/${p.slug}`}>
                  {p.title}
                </Link>
              </h3>

              <p className="t-card__desc">{p.description}</p>

              <div className="t-card__edge mono">
                <span className="t-card__arrow">&rarr;</span>
                <b>{edgeFor(p)}</b>
              </div>

              <div className="t-card__stack">
                {p.tags.slice(0, 6).map((t) => (
                  <span className="mono" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to={`/projects/${p.slug}`} className="mono" style={{ fontSize: '0.75rem', color: 'var(--t-accent)' }}>
                  architecture specs &rarr;
                </Link>
                {showLink && (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: '0.72rem', opacity: 0.7 }}>
                    {p.links?.github ? 'github' : 'external'} &nearr;
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <Link to="/projects" className="btn-action btn-action--primary">
          Explore All 14 Systems &amp; Case Studies &rarr;
        </Link>
      </div>
    </section>
  );
}
