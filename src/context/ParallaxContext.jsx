import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const GlobalParallaxContext = createContext({
  offset: { x: 0, y: 0 },
  reduced: true,
});

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ParallaxProvider({ children }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      setReduced(mq.matches);
      if (mq.matches) setOffset({ x: 0, y: 0 });
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;

    let frame = null;
    let target = { x: 0, y: 0 };

    const onMove = (e) => {
      target = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          setOffset(target);
          frame = null;
        });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const value = useMemo(() => ({ offset, reduced }), [offset, reduced]);

  return (
    <GlobalParallaxContext.Provider value={value}>
      {children}
    </GlobalParallaxContext.Provider>
  );
}

export function useGlobalParallax() {
  return useContext(GlobalParallaxContext);
}
