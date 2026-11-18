// Scroll so a section sits just under the fixed header, then re-check when the scroll ends.
// Lazy images and grid snapping can change the page height mid-scroll, which would leave
// a one-shot scroll short of its target; ponytail: up to 3 corrective hops, no observers.

export function sectionTop(el) {
  const nav = document.querySelector('.site-nav');
  const header = nav ? nav.getBoundingClientRect().bottom : 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(max, Math.max(0, el.getBoundingClientRect().top + window.scrollY - header - 16));
}

export function scrollToSection(lenis, el, hops = 3, duration = 0.8) {
  if (!el) return;
  const verify = () => {
    if (hops > 0 && Math.abs(window.scrollY - sectionTop(el)) > 2) scrollToSection(lenis, el, hops - 1, 0.25);
  };
  if (lenis) {
    lenis.scrollTo(sectionTop(el), { duration, onComplete: verify });
  } else {
    window.scrollTo({ top: sectionTop(el), behavior: 'smooth' });
    setTimeout(verify, duration * 1000 + 150);
  }
}
