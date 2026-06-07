import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { Command, Menu, X } from 'lucide-react';
import ViewSwitch from './ViewSwitch';

const NAV_ITEMS = [
  { label: 'about', href: '#about' },
  { label: 'work', href: '#work' },
  { label: 'experience', href: '#experience' },
  { label: 'stack', href: '#stack' },
  { label: 'notes', href: '#notes' },
  { label: 'contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    history.pushState(null, '', href);
    if (lenis) lenis.scrollTo(href, { duration: 0.7 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  const openPalette = () => window.dispatchEvent(new Event('open-command-palette'));

  return (
    <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-nav__inner">
        <a className="site-nav__mark" href="#home" onClick={(e) => go(e, '#home')}>
          suresh<span className="site-nav__dot">.</span>bhandari
        </a>

        <nav className="site-nav__links" aria-label="Sections">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => go(e, item.href)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-nav__actions">
          <button
            type="button"
            className="site-nav__cmdk"
            onClick={openPalette}
            aria-label="Open command palette"
          >
            <Command size={13} aria-hidden="true" />
            <span>K</span>
          </button>
          <ViewSwitch />
          <button
            type="button"
            className="site-nav__menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`site-nav__overlay${menuOpen ? ' is-open' : ''}`}>
        <div className="site-nav__overlay-head">
          <ViewSwitch />
          <button
            type="button"
            className="site-nav__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <nav className="site-nav__overlay-links" aria-label="Sections">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => go(e, item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
