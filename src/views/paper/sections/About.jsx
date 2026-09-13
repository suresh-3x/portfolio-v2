import { summary } from '../../../data/profile';
import { Link } from '../../../router/Router';

export default function About() {
  return (
    <section id="about" className="p-section p-about">
      <div className="p-h">
        <h2>About</h2>
        <span className="p-h-note">what I actually do</span>
      </div>
      <p className="p-about-prose">{summary}</p>
      <div className="p-about-highlights" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', margin: '1.25rem 0' }}>
        <span className="p-metricpill">5+ yrs distributed systems</span>
        <span className="p-metricpill p-metricpill--hot">5M+ MAU / 10K req/s</span>
        <span className="p-metricpill">Google ADK agentic AI</span>
        <span className="p-metricpill">T-Systems (Deutsche Telekom)</span>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/about" className="btn-action">
          Read Full Bio &amp; Engineering Principles &rarr;
        </Link>
      </div>
    </section>
  );
}
