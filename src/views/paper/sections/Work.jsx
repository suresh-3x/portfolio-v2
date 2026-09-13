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

// Derive a small status / metric badge per project.
function badgeFor(p) {
  if (p.title === 'Revamp Engine') {
    return { label: 'live, runs on Pi 4B', hot: true };
  }
  const hasLink = p.links && Object.keys(p.links).length > 0;
  if (!hasLink) return { label: 'private', hot: false };
  return { label: p.category, hot: false };
}

function primaryLink(links) {
  if (!links) return null;
  return links.external || links.demo || links.github || null;
}

export default function Work() {
  return (
    <section id="work" className="p-section p-work">
      <div className="p-h">
        <h2>Selected Systems</h2>
        <span className="p-h-note">production work, with the number that matters</span>
      </div>

      <div className="p-sys">
        {featured.map((p) => {
          const badge = badgeFor(p);
          const link = primaryLink(p.links);
          const isDead = link === '#';
          const useLink = link && !isDead;
          const imageSrc = p.image || '/images/projects/default.svg';
          return (
            <article className="p-sysitem stagger-fade" key={p.title}>
              {p.image && (
                <div className="p-sysimg">
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
              <div className="p-systop">
                <h3 className="p-systitle">
                  <Link to={`/projects/${p.slug}`}>
                    {p.title}
                  </Link>
                </h3>
                <span className={badge.hot ? 'p-metricpill p-metricpill--hot' : 'p-metricpill'}>
                  {badge.label}
                </span>
              </div>
              <p className="p-sysdesc">{p.description}</p>
              <div className="p-systags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                <Link to={`/projects/${p.slug}`} style={{ color: 'var(--p-accent)', fontWeight: 600 }}>
                  Case study &amp; architecture &rarr;
                </Link>
                {useLink && (
                  <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--p-muted)' }}>
                    external &nearr;
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <Link to="/projects" className="btn-action btn-action--primary">
          View All 14 Production Systems &rarr;
        </Link>
      </div>
    </section>
  );
}
