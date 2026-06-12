import { profile, atsKeywords, impactMetrics } from '../../../data/profile';

// Fixed metric order to match the mockup: 5M+, 10K, 10+, 5+ yrs
const METRIC_ORDER = ['5M+', '10K', '10+', '5+ yrs'];
const orderedMetrics = METRIC_ORDER.map((v) =>
  impactMetrics.find((m) => m.value === v)
).filter(Boolean);

// Core stack line: prefer the explicit atsKeywords tech tokens
const stackTokens = [
  'Python',
  'FastAPI',
  'Node.js',
  'Google ADK',
  'RAG',
  'RabbitMQ',
  'Redis',
  'gRPC',
  'PostgreSQL',
  'AWS',
].filter((t) => atsKeywords.includes(t));

export default function Identity() {
  return (
    <section id="home" className="t-identity">
      <p className="t-crumb mono">
        main
        <span className="t-crumb__sep">/</span>
        {profile.title}
        <span className="t-crumb__sep">/</span>
        <span className="t-crumb__here">building distributed + agentic systems</span>
      </p>

      <div className="t-identity__grid">
        <div className="t-identity__main">
          <h1 className="t-name mono">{profile.name}</h1>

          <div className="t-role mono">
            <span className="t-role__pr">$</span>
            <span>{profile.title}</span>
            <span className="t-role__cur" aria-hidden="true" />
            <span className="t-role__loc">
              {profile.location} &middot; open to relocation
            </span>
          </div>

          <p className="t-lede">{profile.tagline}</p>
        </div>

        <div className="t-now">
          <span className="t-now__k mono">Now</span>
          <p>
            <b>Backend Engineer @ T-Systems</b> (Deutsche Telekom subsidiary):
            {' '}sole backend engineer building an internal agentic AI platform with
            {' '}10+ production agents on Google ADK.
          </p>
        </div>
      </div>

      <div className="t-metrics">
        {orderedMetrics.map((m) => (
          <div className="t-metric" key={m.value}>
            <div className="t-metric__fig mono">{m.value}</div>
            <div className="t-metric__lab mono">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="t-status mono">
        <span className="t-status__k">stack:</span>
        {stackTokens.map((t, i) => (
          <span className="t-status__item" key={t}>
            <span className="t-status__tag">{t}</span>
            {i < stackTokens.length - 1 && (
              <span className="t-status__d">&middot;</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
