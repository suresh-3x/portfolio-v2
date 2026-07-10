import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';

export default function Footer() {
  const lenis = useLenis();
  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          &copy; {new Date().getFullYear()} Suresh Bhandari.
        </div>
        <div className="site-footer__meta">
          All systems operational.
        </div>
        <div className="site-footer__right">
          <a href="https://github.com/suresh-3x" target="_blank" rel="noopener noreferrer">github</a>
          <a href="https://linkedin.com/in/suresh-3x" target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href="mailto:suresh.37x@gmail.com">email</a>
          <button onClick={scrollToTop} className="site-footer__top" aria-label="Scroll to top">
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
