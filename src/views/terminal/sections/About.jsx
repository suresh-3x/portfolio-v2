import { profile, education } from '../../../data/profile';
import SectionHead from '../SectionHead';

// One-line versions of the principles on /about.
const principles = [
  ['The queue is the spine.', 'APIs and models fail. Durable queues keep the work moving when they do.'],
  ['Idempotency first.', 'Clients retry. Every critical write should be safe to run twice.'],
  ['Contain the blast radius.', 'A model outage should take down one feature, not the platform.'],
  ['Reliability is unglamorous.', 'Good indexes, bounded thread pools, tracing, and honest load tests.'],
];

export default function About() {
  return (
    <section id="about" className="t-about">
      <SectionHead title="about" to="/about" more="more about me" />

      <div className="t-about__grid">
        <dl className="t-about__facts">
          <div><dt>Based in</dt><dd>{profile.location}</dd></div>
          <div><dt>Now</dt><dd>T-Systems, via Pixeldust</dd></div>
          <div><dt>Started</dt><dd>Coding at 13, on free cPanel hosting</dd></div>
          <div><dt>Studied</dt><dd>BCA, {education.university}, {education.period.split(' to ')[1]}</dd></div>
        </dl>

        <div className="t-about__body">
          <p className="t-about__lede">
            I care about the unglamorous parts that keep products alive: durable queues, idempotency,
            failure modes, and clean ownership.
          </p>
          <p className="t-about__text">
            It started with websites on free hosting, then rooting Android phones and breaking Linux
            installs to see how they worked. That curiosity became the job. I owned core backend services
            for a real money gaming platform with 5M+ monthly players, ran production alone across several
            products, and today I build agentic AI systems at T-Systems (Deutsche Telekom).
          </p>

          <ul className="t-about__principles">
            {principles.map(([title, line]) => (
              <li key={title}>
                <strong>{title}</strong> {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
