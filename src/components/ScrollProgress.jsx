import { useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const lenis = useLenis();
  const barRef = useRef(null);

  useEffect(() => {
    if (!lenis || !barRef.current) return;

    const handleScroll = (e) => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScrollableHeight = documentHeight - windowHeight;
      const scrollProgress = totalScrollableHeight > 0 ? e.scroll / totalScrollableHeight : 0;

      barRef.current.style.width = `${Math.min(scrollProgress, 1) * 100}%`;
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, [lenis]);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      aria-hidden="true"
    />
  );
}
