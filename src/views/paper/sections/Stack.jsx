import { primarySkillsets } from '../../../data/skills';
import { Link } from '../../../router/Router';

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
                  {i > 0 ? <span className="p-group-sep"> · </span> : null}
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/stack" className="btn-action">
          Explore Complete Tech Stack &amp; Architecture &rarr;
        </Link>
      </div>
    </section>
  );
}
