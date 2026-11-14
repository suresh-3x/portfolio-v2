import { Link } from '../../router/Router';

// Plain section title with an optional quiet link to the full page.
export default function SectionHead({ title, to, more }) {
  return (
    <div className="t-sec-h">
      <h2 className="t-sec-h__label mono">{title}</h2>
      {to && (
        <Link to={to} className="t-sec-h__more mono">
          {more} &rarr;
        </Link>
      )}
    </div>
  );
}
