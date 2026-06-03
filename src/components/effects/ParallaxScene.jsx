import React from 'react';
import { useGlobalParallax } from '../../context/ParallaxContext';
import { parallaxTransform } from '../../hooks/useParallax';

const ParallaxScene = ({
  children,
  className = '',
  perspective = 1000,
  tilt = true,
}) => {
  const { reduced } = useGlobalParallax();

  return (
    <div
      className={`parallax-scene ${className}`.trim()}
      style={{
        perspective: reduced ? 'none' : `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

export const ParallaxLayer = ({
  children,
  depth = 1,
  className = '',
  style = {},
  floating = false,
  flat = false,
}) => {
  const { offset, reduced } = useGlobalParallax();
  const transform = reduced
    ? undefined
    : flat
      ? `translate3d(${offset.x * depth * 20}px, ${offset.y * depth * 20}px, 0)`
      : parallaxTransform(offset, depth);

  return (
    <div
      className={`parallax-layer ${floating ? 'parallax-float' : ''} ${className}`.trim()}
      style={{
        ...style,
        transform: transform ?? style.transform,
        transformStyle: 'preserve-3d',
        transition: reduced ? undefined : 'transform 0.08s linear',
        willChange: reduced ? 'auto' : 'transform',
      }}
    >
      {children}
    </div>
  );
};

export const ParallaxFloaters = () => {
  const { offset, reduced } = useGlobalParallax();
  if (reduced) return null;

  return (
    <div className="parallax-floaters" aria-hidden>
      <span
        className="floater f1"
        style={{ transform: parallaxTransform(offset, 0.25) }}
      />
      <span
        className="floater f2"
        style={{ transform: parallaxTransform(offset, 0.45) }}
      />
      <span
        className="floater f3"
        style={{ transform: parallaxTransform(offset, 0.15) }}
      />
    </div>
  );
};

export default ParallaxScene;
