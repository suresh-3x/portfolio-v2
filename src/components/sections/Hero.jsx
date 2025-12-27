import React, { useState, useEffect } from 'react';
import HeroDefault from './hero-variants/HeroDefault';
import HeroMinimal from './hero-variants/HeroMinimal';
import HeroGlitch from './hero-variants/HeroGlitch';
import HeroGrid from './hero-variants/HeroGrid';
import HeroSplit from './hero-variants/HeroSplit';
import HeroMatrix from './hero-variants/HeroMatrix';
import HeroSaaS from './hero-variants/HeroSaaS';
import HeroGradient from './hero-variants/HeroGradient';
import HeroTypo from './hero-variants/HeroTypo';
import HeroInteractive from './hero-variants/HeroInteractive';

const Hero = () => {
  const [variant, setVariant] = useState('default');

  useEffect(() => {
    // Parse URL parameters to get 'hero' variant
    const params = new URLSearchParams(window.location.search);
    const heroParam = params.get('hero');

    // Map params to variant names
    const variantMap = {
      '1': 'default',
      '2': 'minimal',
      '3': 'glitch',
      '4': 'grid',
      '5': 'split',
      '6': 'matrix',
      '7': 'saas',
      '8': 'gradient',
      '9': 'typo',
      '10': 'interactive'
    };

    if (heroParam && variantMap[heroParam]) {
      setVariant(variantMap[heroParam]);
    }
  }, []);

  // Render the selected variant
  const renderVariant = () => {
    switch (variant) {
      case 'minimal': return <HeroMinimal />;
      case 'glitch': return <HeroGlitch />;
      case 'grid': return <HeroGrid />;
      case 'split': return <HeroSplit />;
      case 'matrix': return <HeroMatrix />;
      case 'saas': return <HeroSaaS />;
      case 'gradient': return <HeroGradient />;
      case 'typo': return <HeroTypo />;
      case 'interactive': return <HeroInteractive />;
      case 'default':
      default:
        return <HeroDefault />;
    }
  };

  return (
    <>
      {renderVariant()}
    </>
  );
};

export default Hero;
