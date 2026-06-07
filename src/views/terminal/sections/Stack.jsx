import { primarySkillsets } from '../../../data/skills';

export default function Stack() {
  return (
    <section id="stack" className="t-stack">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">stack</span>
        <span className="t-sec-h__count mono">
          {String(primarySkillsets.length).padStart(2, '0')} groups
        </span>
      </div>

      <div className="t-tree">
        {primarySkillsets.map((g) => (
          <div className="t-tree__group" key={g.title}>
            <div className="t-tree__title mono">{g.title}</div>
            <div className="t-tree__skills">
              {g.skills.map((s) => (
                <span className="t-tree__chip mono" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
