import { projects } from '../../../data/projects';
import { Link } from '../../../router/Router';
import SectionHead from '../SectionHead';

// Badge text is taken from each project's key_metrics, shortened to read as one line.
const featured = [
  { slug: 'revamp-engine', badge: '24/7 on a Raspberry Pi' },
  { slug: 'mcwm-straddle-edge', badge: '<250ms option chain updates' },
  { slug: 'nomad-mind', badge: 'every answer cited to a timestamp' },
  { slug: 'calcom-contributions', badge: 'merged upstream, 30k+ star repo' },
]
  .map((f) => ({ ...projects.find((p) => p.slug === f.slug), badge: f.badge }))
  .filter((p) => p.slug);

export default function Work() {
  return (
    <section id="work" className="t-work">
      <SectionHead title="work" to="/projects" more={`all ${projects.length} projects`} />

      <div className="t-showcase">
        {featured.map((p) => (
          <article className="t-show" key={p.slug}>
            <Link to={`/projects/${p.slug}`} className="t-show__frame" aria-label={`${p.title} case study`}>
              <img
                src={p.image || '/images/projects/default.svg'}
                alt={`${p.title} - ${p.category}`}
                loading="lazy"
                decoding="async"
              />
              <span className="t-show__badge mono">{p.badge}</span>
            </Link>

            <div className="t-show__info">
              <p className="t-show__meta mono">
                {p.category.replace(/^Private - /, '')}, {p.year}
              </p>
              <h3 className="t-show__title">
                <Link to={`/projects/${p.slug}`}>{p.title}</Link>
              </h3>
              <p className="t-show__desc">{p.description}</p>
              <p className="t-show__tags mono">{p.tags.slice(0, 4).join(', ')}</p>
              <Link to={`/projects/${p.slug}`} className="t-show__link mono">
                View case study &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
