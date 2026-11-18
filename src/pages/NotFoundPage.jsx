import { Link } from '../router';

export default function NotFoundPage() {
  return (
    <div className="page-container notfound">
      <p className="notfound__code mono">404</p>
      <h1>Nothing lives here.</h1>
      <p className="notfound__sub">The page moved or never existed.</p>
      <Link to="/" className="btn-action btn-action--primary">Back home</Link>
      <nav className="notfound__links mono" aria-label="Other pages">
        <Link to="/projects">projects</Link>
        <Link to="/experience">experience</Link>
        <Link to="/stack">stack</Link>
        <Link to="/notes">notes</Link>
      </nav>
    </div>
  );
}
