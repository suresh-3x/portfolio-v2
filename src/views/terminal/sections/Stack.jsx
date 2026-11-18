import { Server, Database, Brain, Cloud } from 'lucide-react';
import { primarySkillsets } from '../../../data/skills';
import SectionHead from '../SectionHead';

const ICONS = { server: Server, database: Database, brain: Brain, cloud: Cloud };

export default function Stack() {
  return (
    <section id="stack" className="t-stack">
      <SectionHead title="stack" headline="Tools I'd defend in an interview." to="/stack" more="full stack" />
      <ul className="xp-grid stack-cards">
        {primarySkillsets.map((g) => {
          const Icon = ICONS[g.icon] || Server;
          return (
            <li className="xp-card" key={g.title}>
              <div className="stack-cards__head">
                <span className="stack-cards__icon" aria-hidden="true"><Icon size={18} /></span>
                <h3>{g.title}</h3>
              </div>
              <ul className="stack-cards__tools mono" aria-label={`${g.title} tools`}>
                {g.skills.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <ul className="stack-cards__proof" aria-label="Used for">
                {g.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
