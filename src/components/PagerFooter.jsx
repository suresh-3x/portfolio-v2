import { Link } from '../router';

// Prev/next pair as two equal cards + a quiet "all" link. Used by note and project detail pages.
export default function PagerFooter({ prev, next, base, allLabel }) {
  return (
    <footer className="pager">
      <div className="pager__grid">
        {prev ? (
          <Link to={`${base}/${prev.slug}`} className="pager__card">
            <span className="pager__dir mono">&larr; previous</span>
            <span className="pager__title">{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`${base}/${next.slug}`} className="pager__card pager__card--next">
            <span className="pager__dir mono">next &rarr;</span>
            <span className="pager__title">{next.title}</span>
          </Link>
        ) : <span />}
      </div>
      <Link to={base} className="pager__all mono">{allLabel} &rarr;</Link>
    </footer>
  );
}
