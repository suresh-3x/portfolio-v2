import { profile, impactMetrics } from '../../../data/profile';

// Fixed metric order to match the reference: 5M+, 10K, 10+, 5+ yrs
const METRIC_ORDER = ['5M+', '10K', '10+', '5+ yrs'];
const orderedMetrics = METRIC_ORDER
  .map((v) => impactMetrics.find((m) => m.value === v))
  .filter(Boolean);

const STACK = [
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
];

export default function Identity() {
  return (
    <section id="home" className="p-identity">
      <h1 className="p-name">{profile.name}</h1>
      <p className="p-role">
        {profile.title}
        <span className="p-loc">
          {' '}
          {'·'} {profile.location}, {profile.relocation.toLowerCase()}
        </span>
      </p>

      <p className="p-lede">{profile.tagline}</p>

      <p className="p-current">
        <span className="p-now">Now</span>
        Backend Engineer at T-Systems (Deutsche Telekom subsidiary). Sole backend
        engineer building an internal agentic AI platform; 10+ production agents on
        Google ADK.
      </p>

      <div className="p-metrics">
        {orderedMetrics.map((m) => (
          <div className="p-metric" key={m.value}>
            <div className="p-metric-num">{m.value}</div>
            <div className="p-metric-lab">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="p-stack">
        <span className="p-stack-key">stack</span>
        {STACK.map((s, i) => (
          <span key={s} className="p-stack-item">
            {s}
            {i < STACK.length - 1 ? <span className="p-stack-sep">{'·'}</span> : null}
          </span>
        ))}
      </div>
    </section>
  );
}
