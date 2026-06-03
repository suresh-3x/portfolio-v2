import React from 'react';
import Layout from './components/Layout';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import SectionDivider from './components/ui/SectionDivider';

const HEADER_OFFSET = 120;
const SCROLL_KEY = 'lastScrollPosition';

const HashScrollHandler = () => {
  React.useEffect(() => {
    // Disable native restoration; we restore manually to avoid "crawling" on reload.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Capture the target ONCE, up front, so a clamped programmatic scroll
    // (page not laid out yet) can't overwrite it before we reach it.
    const initialHash = window.location.hash;
    const savedPosition = parseInt(localStorage.getItem(SCROLL_KEY) || '0', 10) || 0;

    // Force instant restore: the global `scroll-behavior: smooth` would
    // otherwise animate the jump. Re-enabled once restoration settles so
    // in-page nav links keep their smooth scroll.
    const docEl = document.documentElement;
    const prevScrollBehavior = docEl.style.scrollBehavior;
    docEl.style.scrollBehavior = 'auto';

    let cancelled = false;
    let isRestoring = true; // suppress saving while we drive the scroll
    let saveRaf = 0;

    const endRestore = () => {
      isRestoring = false;
      docEl.style.scrollBehavior = prevScrollBehavior;
    };

    const hashTarget = (hash) => {
      if (!hash || hash === '#') return null;
      const el = document.getElementById(hash.slice(1));
      if (!el) return null;
      return Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET);
    };

    // The page is tall and content mounts progressively, so the document may be
    // too short to reach `target` on the first frame. Retry across frames until
    // we land within tolerance (or give up), then re-enable saving.
    const restore = (target, smooth = false) => {
      let attempts = 0;
      const step = () => {
        if (cancelled) return;
        window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' });
        attempts += 1;
        const reached = Math.abs(window.scrollY - target) < 4;
        if (!reached && attempts < 20) {
          requestAnimationFrame(step);
        } else {
          // Let the final scroll settle before we resume persisting.
          setTimeout(endRestore, 120);
        }
      };
      requestAnimationFrame(step);
    };

    const target = hashTarget(initialHash);
    if (target !== null) {
      restore(target);
    } else if (savedPosition > 0) {
      restore(savedPosition);
    } else {
      window.scrollTo(0, 0);
      endRestore();
    }

    const handleScroll = () => {
      if (isRestoring) return; // don't persist the clamped values mid-restore
      if (saveRaf) cancelAnimationFrame(saveRaf);
      saveRaf = requestAnimationFrame(() => {
        localStorage.setItem(SCROLL_KEY, Math.round(window.scrollY).toString());
      });
    };

    const handleHashChange = () => {
      const t = hashTarget(window.location.hash);
      if (t !== null) window.scrollTo({ top: t, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelled = true;
      docEl.style.scrollBehavior = prevScrollBehavior;
      if (saveRaf) cancelAnimationFrame(saveRaf);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

function App() {
  const highlightColor = 'var(--accent-primary)';

  return (
    <Layout highlightColor={highlightColor}>
      <HashScrollHandler />
      <Hero highlightColor={highlightColor} />

      <SectionDivider
        id="about"
        title="About"
        subtitle="Engineering resilient digital ecosystems through precision and design."
        colorVar="--accent-primary"
      />
      <About />

      <SectionDivider
        id="experience"
        title="Experience"
        subtitle="Professional trajectory across industry-leading organizations."
        colorVar="--accent-secondary"
      />
      <Experience />

      <SectionDivider
        id="skills"
        title="Skills"
        subtitle="Core technical components and deployment stack."
        colorVar="--accent-tertiary"
      />
      <Skills />

      <SectionDivider
        id="projects"
        title="Projects"
        subtitle="Selected works in distributed systems and interface design."
        colorVar="--accent-primary"
      />
      <Projects />
    </Layout>
  );
}

export default App;
