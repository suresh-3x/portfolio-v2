import { primarySkillsets } from '../../../data/skills';

export default function Stack() {
  return (
    <section id="stack" className="p-section p-stack-section">
      <div className="p-h">
        <h2>Stack</h2>
        <span className="p-h-note">tools, grouped by where they live</span>
      </div>

      <div className="p-groups">
        {primarySkillsets.map((g) => (
          <div className="p-group" key={g.title}>
            <div className="p-group-title">{g.title}</div>
            <div className="p-group-skills">
              {g.skills.map((s, i) => (
                <span key={s} className="p-group-skill">
                  {s}
                  {i < g.skills.length - 1 ? (
                    <span className="p-group-sep">{'·'}</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
