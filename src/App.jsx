import React from 'react';
import { useLenis } from 'lenis/react';
import Layout from './components/Layout';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import ResumeStructuredData from './components/seo/ResumeStructuredData';
import TerminalView from './views/terminal/TerminalView';
import { useRouter } from './router';
import SeoHead from './components/seo/SeoHead';
import { sectionTop, scrollToSection } from './utils/scrollToSection';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ExperiencePage from './pages/ExperiencePage';
import AboutPage from './pages/AboutPage';
import StackPage from './pages/StackPage';
import NotesPage from './pages/NotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const SCROLL_KEY = 'lastScrollPosition';

const HashScrollHandler = () => {
  const lenis = useLenis();
  const lenisRef = React.useRef(null);

  React.useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

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
      return sectionTop(el);
    };

    // The page is tall and content mounts progressively, so the document may be
    // too short to reach `target` on the first frame. Retry across frames until
    // we land within tolerance (or give up), then re-enable saving.
    const restore = (getTarget, smooth = false) => {
      let attempts = 0;
      const step = () => {
        if (cancelled) return;
        const target = getTarget();
        const l = lenisRef.current;
        if (l) {
          l.scrollTo(target, smooth ? { duration: 0.9 } : { immediate: true, force: true });
        } else {
          window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' });
        }
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

    if (hashTarget(initialHash) !== null) {
      restore(() => hashTarget(initialHash) ?? 0);
      // Images and grid snapping keep moving the target after the first frames; correct once loaded.
      const settle = () => {
        if (!cancelled) scrollToSection(lenisRef.current, document.getElementById(initialHash.slice(1)), 3, 0.25);
      };
      if (document.readyState === 'complete') setTimeout(settle, 300);
      else window.addEventListener('load', () => setTimeout(settle, 300), { once: true });
    } else if (savedPosition > 0) {
      restore(() => savedPosition);
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
      const hash = window.location.hash;
      if (!hash || hash === '#') return;
      scrollToSection(lenisRef.current, document.getElementById(hash.slice(1)));
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
  const { route } = useRouter();

  const renderContent = () => {
    switch (route.id) {
      case 'projects':
        return <ProjectsPage />;
      case 'project-detail':
        return <ProjectDetailPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'about':
        return <AboutPage />;
      case 'stack':
        return <StackPage />;
      case 'notes':
        return <NotesPage />;
      case 'note-detail':
        return <NoteDetailPage />;
      case 'not-found':
        return <NotFoundPage />;
      case 'home':
      default:
        return (
          <>
            <HashScrollHandler />
            <ResumeStructuredData />
            <div className="view-fade">
              <TerminalView />
            </div>
          </>
        );
    }
  };

  return (
    <Layout>
      <SeoHead />
      <ScrollProgress />
      <CommandPalette />
      {renderContent()}
    </Layout>
  );
}

export default App;
