import { Link } from '../../router/Router';

// One header for every homepage section: mono label, big headline, quiet action on the right.
// Same classes as the experience header so all sections line up.
export default function SectionHead({ title, headline, to, more }) {
  return (
    <div className="xp-head">
      <div>
        <p className="xp-head__label mono">{title}</p>
        {headline && <h2 className="xp-head__title">{headline}</h2>}
      </div>
      {to && (
        <Link to={to} className="xp-head__pdf mono">
          {more} &rarr;
        </Link>
      )}
    </div>
  );
}
