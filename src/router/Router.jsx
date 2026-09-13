import React, { useState, useEffect, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import { matchRoute } from './routes';
import { RouterContext, useRouter } from './RouterContext';

export function RouterProvider({ children }) {
  const [currentUrl, setCurrentUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const lenis = useLenis();

  const handlePopState = useCallback(() => {
    setCurrentUrl(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (typeof window === 'undefined') return;

    // Handle hash links when already on the target page
    if (to.startsWith('#')) {
      const targetHash = to;
      if (window.location.pathname === '/') {
        history[replace ? 'replaceState' : 'pushState'](null, '', targetHash);
        const el = document.querySelector(targetHash);
        if (el) {
          if (lenis) lenis.scrollTo(targetHash, { duration: 0.7 });
          else el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      // If not on root, navigate to root with the hash
      to = `/${targetHash}`;
    }

    // Preserve existing search params if none provided (e.g. ?view=paper)
    const currentParams = window.location.search;
    const finalUrl = to.includes('?') ? to : `${to}${currentParams}`;

    if (replace) {
      window.history.replaceState(null, '', finalUrl);
    } else {
      window.history.pushState(null, '', finalUrl);
    }

    const newPath = to.split('?')[0].split('#')[0];
    setCurrentUrl(newPath || '/');

    // Scroll to top on page change
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [lenis]);

  const route = matchRoute(currentUrl);

  const value = {
    pathname: currentUrl,
    route,
    navigate,
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function Link({ to, children, onClick, className, ...rest }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    if (onClick) onClick(e);

    // Let user open in new tab with modifier keys or middle click
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    // External link check
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      return;
    }

    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
