import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { profile } from '../data/profile';

export default function Footer() {
  const lenis = useLenis();
  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span className="site-footer__brand">{profile.name}</span>
        <span className="site-footer__meta">
          Built with React. {profile.location}. {profile.relocation}.
        </span>
        <div className="site-footer__right">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={16} aria-hidden="true" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={16} aria-hidden="true" />
          </a>
          <button type="button" className="site-footer__top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
