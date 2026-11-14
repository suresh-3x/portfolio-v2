import { primarySkillsets } from '../../../data/skills';
import SectionHead from '../SectionHead';

export default function Stack() {
  return (
    <section id="stack" className="t-stack">
      <SectionHead title="stack" to="/stack" more="full stack" />
      <dl className="t-stack__list">
        {primarySkillsets.map((g) => (
          <div className="t-stack__row" key={g.title}>
            <dt className="mono">{g.title}</dt>
            <dd>{g.skills.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
