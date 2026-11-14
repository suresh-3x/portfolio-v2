import { summaryTerminal } from '../../../data/profile';
import SectionHead from '../SectionHead';

export default function About() {
  return (
    <section id="about" className="t-about">
      <SectionHead title="about" to="/about" more="more about me" />
      <p className="t-about__text">{summaryTerminal}</p>
    </section>
  );
}
