import { useEffect } from 'react';
import { useRouter } from '../../router';
import { getPageMetadata } from '../../router/routes';

function setMetaTag(selector, attribute, value) {
  let el = document.querySelector(selector);
  if (!el && selector.startsWith('meta[')) {
    el = document.createElement('meta');
    // Extract attribute name and key
    const match = selector.match(/meta\[([a-zA-Z0-9_-]+)="([^"]+)"\]/);
    if (match) {
      el.setAttribute(match[1], match[2]);
      document.head.appendChild(el);
    }
  }
  if (el) {
    el.setAttribute(attribute, value);
  }
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function updateJsonLd(jsonLd) {
  const SCRIPT_ID = 'route-dynamic-jsonld';
  let script = document.getElementById(SCRIPT_ID);

  if (!jsonLd) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd);
}

export default function SeoHead() {
  const { route } = useRouter();

  useEffect(() => {
    const meta = getPageMetadata(route);

    document.title = meta.title;

    setMetaTag('meta[name="title"]', 'content', meta.title);
    setMetaTag('meta[name="description"]', 'content', meta.description);

    setCanonical(meta.canonical);

    // OpenGraph
    setMetaTag('meta[property="og:title"]', 'content', meta.title);
    setMetaTag('meta[property="og:description"]', 'content', meta.description);
    setMetaTag('meta[property="og:url"]', 'content', meta.canonical);
    setMetaTag('meta[property="og:type"]', 'content', meta.ogType || 'website');
    if (meta.ogImage) {
      setMetaTag('meta[property="og:image"]', 'content', meta.ogImage);
    }

    // Twitter
    setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'content', meta.description);
    setMetaTag('meta[name="twitter:url"]', 'content', meta.canonical);
    if (meta.ogImage) {
      setMetaTag('meta[name="twitter:image"]', 'content', meta.ogImage);
    }

    // Dynamic JSON-LD structured data
    updateJsonLd(meta.jsonLd);
  }, [route]);

  return null;
}
