import { summary } from '../../../data/profile';

export default function About() {
  return (
    <section id="about" className="p-section p-about">
      <div className="p-h">
        <h2>About</h2>
        <span className="p-h-note">what I actually do</span>
      </div>
      <p className="p-about-prose">{summary}</p>
    </section>
  );
}
