export const projects = [
  // Open Source Contributions
  {
    title: 'Cal.com (Calendso) Contribution',
    category: 'Open Source',
    description: 'Contributed to calendso, an open-source scheduling infrastructure powering calendar and meeting automation. Part of the wider Cal.com ecosystem for scheduling absolutely everyone.',
    long_description: 'Active contributor to the Cal.com project (formerly Calendso), working on scheduling infrastructure and calendar integrations that power millions of scheduling workflows.',
    tags: ['TypeScript', 'Next.js', 'Node.js', 'Open Source', 'Scheduling'],
    links: {
      github: 'https://github.com/suresh-3x/calendso',
      external: 'https://cal.com'
    },
    featured: true,
    year: 2024
  },

  // Private Projects
  {
    title: 'APEX OHOL v8',
    category: 'Private - Trading Systems',
    description: 'Intraday options-scanning system for NSE F&O market detecting OHOL patterns with live tracking and paper trading.',
    long_description: 'Advanced algorithmic trading system that scans NSE F&O market for Open=High / Open=Low patterns on the first one-minute candle (09:15–09:16), generates trade signals, tracks them live, sends Telegram alerts, and runs a paper-trading engine for P&L simulation.',
    tags: ['Python', 'FastAPI', 'SQLite', 'Real-time', 'Trading', 'Telegram Bot'],
    tech_details: {
      frontend: 'Vanilla JS Single-Page App',
      backend: 'Python 3, FastAPI, Uvicorn',
      database: 'SQLite',
      broker: 'Kotak Neo API',
      notifications: 'Telegram Bot API'
    },
    links: {
      demo: '#'
    },
    featured: true,
    year: 2024
  },

  {
    title: 'BizAssist Hotel Booking System',
    category: 'Private - Booking Platform',
    description: 'High-performance hotel booking and vacation rental platform built on WordPress with custom plugin architecture.',
    long_description: 'Production-ready hotel booking system built on WordPress with a custom "BizAssist Booking System" plugin. Features property listings, checkout logic, STAAH integrations for bookings, and Cashfree payment gateway integration with mock/real mode switching.',
    tags: ['WordPress', 'PHP', 'Docker', 'MariaDB', 'Payments', 'Booking Engine'],
    tech_details: {
      cms: 'WordPress (Headless-ready)',
      database: 'MariaDB',
      custom_plugin: 'BizAssist Booking System',
      integrations: 'STAAH, Cashfree',
      deployment: 'Docker & Docker Compose'
    },
    links: {
      demo: '#'
    },
    featured: true,
    year: 2024
  },

  // Public Projects
  {
    title: 'BizAssist Platform',
    category: 'Full-Stack Web',
    description: 'Full-stack agency website delivering scalable client solutions with modern tech stack.',
    long_description: 'Production-grade business platform demonstrating full-stack development capabilities with Next.js frontend, Node.js backend, MongoDB database, and deployed on Vercel.',
    tags: ['Next.js', 'React', 'Tailwind', 'Node.js', 'MongoDB', 'Vercel'],
    links: {
      demo: 'https://www.bizassist.online/',
      github: 'https://github.com/suresh-3x/bizAssist'
    },
    featured: true,
    year: 2024
  },

  {
    title: 'Smax Bookings App',
    category: 'Mobile - iOS',
    description: 'Native iOS app for Cal.com scheduling with self-hosted Docker backend.',
    long_description: 'Native iOS application built with Swift and SwiftUI providing seamless Cal.com integration with a self-hosted backend. Demonstrates native iOS development and API integration.',
    tags: ['Swift', 'SwiftUI', 'iOS', 'Calendar API', 'Docker'],
    links: {
      github: 'https://github.com/suresh-3x/smax-bookings-app'
    },
    featured: true,
    year: 2024
  },

  {
    title: 'Vision Clothing',
    category: 'Mobile - E-Commerce',
    description: 'Cross-platform e-commerce mobile app showcasing Material Design and seamless checkout flow.',
    long_description: 'Production-ready e-commerce application built with Flutter and Dart, featuring product browsing, shopping cart, Material Design UI, and smooth checkout experience.',
    tags: ['Flutter', 'Dart', 'Material Design', 'E-Commerce', 'Mobile'],
    links: {
      github: 'https://github.com/suresh-3x/vision-clothing'
    },
    featured: false,
    year: 2023
  },
];

export const projectCategories = [
  'All',
  'Open Source',
  'Private - Trading Systems',
  'Private - Booking Platform',
  'Full-Stack Web',
  'Mobile - iOS',
  'Mobile - E-Commerce',
  'Mobile - Productivity',
  'Monitoring - CLI Tool'
];
