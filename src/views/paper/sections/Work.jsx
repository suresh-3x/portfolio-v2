import { projects } from '../../../data/projects';

const featured = projects.filter((p) => p.featured);

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
                  <img
                    src={imageSrc}
                    alt={p.title}
                    onError={(e) => { e.target.src = '/images/projects/default.svg'; }}
                  />
                </div>
              )}
              <div className="p-systop">
                <h3 className="p-systitle">
                  {useLink ? (
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
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
            </article>
          );
        })}
      </div>
    </section>
  );
}
