// Google Analytics initialization
export const initGoogleAnalytics = () => {
  // Use environment variable if available, otherwise use default
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID || 'G-K6YMZXY2BH';

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', trackingId);
};

// Helper function to track events
export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Helper function to track page views
export const trackPageView = (path) => {
  if (window.gtag) {
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID || 'G-K6YMZXY2BH';
    window.gtag('config', trackingId, {
      page_path: path
    });
  }
};

