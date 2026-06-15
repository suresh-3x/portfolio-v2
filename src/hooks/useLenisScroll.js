import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

export const useLenisScroll = () => {
  const lenis = useLenis();
  const [scrollData, setScrollData] = useState({
    velocity: 0,
    direction: 0, // 1 for down, -1 for up, 0 for idle
    progress: 0, // 0 to 1 for overall scroll progress
    scrollY: 0,
  });

  const velocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const idleTimeoutRef = useRef(null);

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (e) => {
      const currentScroll = e.scroll;
      const deltaScroll = currentScroll - lastScrollRef.current;
      const velocity = Math.abs(deltaScroll);
      const direction = deltaScroll > 0 ? 1 : deltaScroll < 0 ? -1 : 0;

      // Smooth velocity decay
      velocityRef.current = velocity * 0.95 + velocityRef.current * 0.05;

      // Calculate total scroll progress (0 to 1)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = totalScrollableHeight > 0 ? currentScroll / totalScrollableHeight : 0;

      setScrollData({
        velocity: velocityRef.current,
        direction,
        progress: Math.min(progress, 1),
        scrollY: currentScroll,
      });

      lastScrollRef.current = currentScroll;

      // Reset idle timeout
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        velocityRef.current = 0;
      }, 150);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [lenis]);

  return scrollData;
};

// Hook for parallax effect
export const useParallax = (intensity = 0.5, ref = null) => {
  const lenis = useLenis();
  const elementRef = useRef(ref);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!lenis || !elementRef.current) return;

    const handleScroll = (e) => {
      const element = elementRef.current;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const parallaxOffset = (e.scroll - elementTop) * intensity * 0.3;
      setOffset(parallaxOffset);
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, [lenis, intensity]);

  return {
    ref: elementRef,
    style: {
      transform: `translateY(${offset}px)`,
      transition: 'transform 0.01s ease-out',
    },
  };
};

// Hook for fade-in on scroll
export const useScrollReveal = (threshold = 0.5, ref = null) => {
  const elementRef = useRef(ref);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return {
    ref: elementRef,
    className: isVisible ? 'scroll-reveal-visible' : 'scroll-reveal-hidden',
  };
};
