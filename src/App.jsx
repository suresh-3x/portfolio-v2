import React from 'react';
import Layout from './components/Layout';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import GithubStats from './components/sections/GithubStats';
import SectionDivider from './components/ui/SectionDivider';

const HashScrollHandler = () => {
  React.useEffect(() => {
    // Disable automatic scroll restoration to prevent "crawling" on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToHash = (immediate = false) => {
      const hash = window.location.hash;
      const savedPosition = localStorage.getItem('lastScrollPosition');

      if (hash && hash !== '#') {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          const scrollTarget = Math.max(0, offsetPosition);

          window.scrollTo({
            top: scrollTarget,
            behavior: immediate ? "auto" : "smooth"
          });
        }
      } else if (savedPosition && !hash) {
        // Restore last known scroll position if no hash
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: immediate ? "auto" : "smooth"
        });
      } else {
        // Force scroll to top on reload if no hash and no saved position
        window.scrollTo(0, 0);
      }
    };

    // Save scroll position
    const handleScroll = () => {
      localStorage.setItem('lastScrollPosition', window.scrollY.toString());
    };

    // Handle initial load
    scrollToHash(true);
    const timeoutId = setTimeout(() => scrollToHash(false), 300);

    window.addEventListener('hashchange', () => scrollToHash(false));
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', () => scrollToHash(false));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

function App() {
  const highlightColor = React.useMemo(() => {
    const colors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

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

      <SectionDivider
        id="github"
        title="Activity"
        subtitle="Real-time pulse of code contributions and system growth."
        colorVar="--accent-secondary"
      />
      <GithubStats />

      <SectionDivider
        id="education"
        title="Formation"
        subtitle="Academic foundations and professional certifications."
        colorVar="--accent-tertiary"
      />
      <Education />

      <SectionDivider
        id="contact"
        title="Contact"
        subtitle="Initiate communication for next-gen collaborations."
        colorVar="--accent-primary"
      />
      <Contact />
    </Layout>
  );
}

export default App;
