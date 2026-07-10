export const projects = [
  // AI / Agentic Systems (flagship)
  {
    title: 'Revamp Engine',
    category: 'AI / Agentic Systems',
    description:
      'A 24/7 agentic AI worker system that finds real estate builders, auto-revamps their pages, and ships previews a human has approved. Designed so the queue, not the LLM, is the spine.',
    long_description:
      'A durable, queue driven pipeline where SQLite is the source of truth and Redis is a rebuildable hot cache (queues, state, circuit breaker), rehydrated from SQLite on boot. Work is split across per-queue workers: q:scrape, q:import, and q:deploy drain regardless of LLM health, while q:ai stalls only when the LLM circuit breaker is OPEN, so a model outage degrades one capability instead of the whole system. A FastAPI control plane never 500s if Redis is down. A Node build service renders Astro templates and deploys previews to Vercel or Netlify. A human stays in the loop by design: a revamp stops at built and waits for a person to preview and approve it. Nothing goes outward automatically. Runs 24/7 on a Raspberry Pi 4B.',
    tags: ['Python', 'FastAPI', 'Redis', 'SQLite', 'Agentic AI', 'LLM', 'Astro', 'Node.js', 'Raspberry Pi'],
    tech_details: {
      architecture: 'Durable queue (SQLite truth + Redis hot cache)',
      resilience: 'LLM circuit breaker; non-AI queues drain during an LLM outage',
      control_plane: 'FastAPI dashboard, never 500s if Redis is down',
      build_service: 'Node + Astro templates, deploys to Vercel or Netlify',
      safety: 'Human in the loop; nothing deploys outward automatically',
      host: 'Raspberry Pi 4B',
    },
    links: {},
    featured: true,
    year: 2026,
    image: '/images/projects/revamp-engine.svg'
  },

  // AI / RAG
  {
    title: 'Nomad Mind',
    category: 'AI / RAG',
    description: 'Python RAG pipeline that ingests YouTube travel vlogs via vector embeddings and answers travel questions with itineraries grounded in real video content.',
    long_description: 'A retrieval augmented generation pipeline that turns YouTube travel vlogs into a queryable knowledge base. Transcribes and chunks video content, embeds it into a vector store, and answers travel questions and generates itineraries grounded in what creators actually show and say on the ground, not generic model knowledge.',
    tags: ['Python', 'RAG', 'Vector Embeddings', 'LLM', 'YouTube'],
    tech_details: {
      language: 'Python',
      pipeline: 'RAG (retrieval augmented generation)',
      ingestion: 'YouTube travel vlogs',
      retrieval: 'Vector embeddings',
      output: 'Grounded Q&A and itinerary generation'
    },
    links: {
      github: 'https://github.com/suresh-3x/nomad-mind'
    },
    featured: true,
    year: 2025,
    image: '/images/projects/nomad-mind.svg'
  },

  // Open Source Contributions & Projects
  {
    title: 'Cal.com Contributions',
    category: 'Open Source',
    description: 'Open source contributions to Cal.com, the scheduling infrastructure for everyone.',
    long_description: 'Contributed to the core Cal.com open source repository, helping improve the scheduling infrastructure, fixing bugs, and enhancing the self-hosted deployment experience. Cal.com is built with TypeScript, Next.js, and Prisma.',
    tags: ['TypeScript', 'Next.js', 'Open Source', 'Scheduling'],
    tech_details: {
      platform: 'Cal.com',
      url: 'https://cal.com/',
      role: 'Open Source Contributor'
    },
    links: {
      github: 'https://github.com/calcom/cal.com'
    },
    featured: true,
    year: 2025,
    image: '/images/projects/cal-contributions.svg'
  },

  {
    title: 'Smax AI Blog',
    category: 'Open Source',
    description: 'An open-source AI-powered blogging platform utilizing modern generative models for automated content curation.',
    long_description: 'Smax AI Blog is an open-source platform that integrates LLMs directly into the authoring workflow. It features automatic content generation, SEO optimization, and smart tagging using advanced AI models.',
    tags: ['AI', 'Open Source', 'LLM', 'Blogging Platform'],
    tech_details: {
      use_case: 'AI Content Generation',
      repository: 'github.com/suresh-3x/smax-ai-blog'
    },
    links: {
      github: 'https://github.com/suresh-3x/smax-ai-blog'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/smax-ai-blog.svg'
  },

  {
    title: 'Turf App',
    category: 'Open Source',
    description: 'An open-source Flutter application for booking sports turfs and managing athletic facility reservations.',
    long_description: 'Turf App provides a seamless mobile experience for sports enthusiasts to discover, book, and manage turf reservations. Built with Dart and Flutter, it offers a robust open-source template for facility booking systems.',
    tags: ['Flutter', 'Dart', 'Mobile', 'Open Source'],
    tech_details: {
      framework: 'Flutter',
      language: 'Dart',
      repository: 'github.com/suresh-3x/turf-app'
    },
    links: {
      github: 'https://github.com/suresh-3x/turf-app'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/turf-app.svg'
  },

  {
    title: 'tm (tmux NLP interface)',
    category: 'Open Source',
    description: 'A fast, offline, deterministic natural-language interface for tmux. Type what you mean, get the tmux command.',
    long_description: 'tm translates plain English into tmux commands using regular expressions, a tokenizer, a synonym map, and fuzzy matching. It parses in under a millisecond, runs entirely offline with zero dependencies, and asks for clarification instead of guessing. A safer, deterministic alternative to LLMs for terminal multiplexing.',
    tags: ['Python', 'CLI', 'tmux', 'NLP', 'Open Source'],
    tech_details: {
      language: 'Python 3.12+',
      interface: 'Command Line',
      repository: 'github.com/suresh-3x/tm'
    },
    links: {
      github: 'https://github.com/suresh-3x/tm'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/tm.svg'
  },

  {
    title: 'Self-Hosted Cal.com (Premium)',
    category: 'Open Source',
    description: 'Deployed and customized a self-hosted Cal.com instance with premium features, custom modifications, and additional functionality for calendar scheduling and meeting automation.',
    long_description: 'A fully self-hosted Cal.com deployment with premium features enabled, custom modifications, and extended functionality. Demonstrates deep understanding of open-source scheduling infrastructure and ability to extend and scale it for production use.',
    tags: ['Cal.com', 'TypeScript', 'Open Source', 'Self-Hosted', 'Scheduling', 'Custom Development'],
    tech_details: {
      platform: 'Cal.com (Open Source)',
      deployment: 'Self-Hosted',
      features: 'Premium features + custom modifications',
      customization: 'Extended functionality and integrations'
    },
    links: {},
    featured: true,
    year: 2025,
    image: '/images/projects/cal-self-hosted.svg'
  },

  {
    title: 'Taiga - Stride Ahead Management',
    category: 'Open Source',
    description: 'Deployed self-hosted Taiga instance for Stride Ahead, an open-source agile project management platform for task tracking, sprint planning, and team collaboration.',
    long_description: 'A fully self-hosted Taiga deployment powering Stride Ahead\'s project management. Taiga is a powerful open-source agile project management platform with support for Scrum and Kanban workflows, comprehensive task tracking, and real-time team collaboration.',
    tags: ['Taiga', 'Open Source', 'Self-Hosted', 'Project Management', 'Agile'],
    tech_details: {
      platform: 'Taiga (Open Source)',
      deployment: 'Self-Hosted',
      url: 'https://taiga.io/',
      use_case: 'Agile project and task management'
    },
    links: {
      external: 'https://taiga.io/'
    },
    featured: true,
    year: 2025,
    image: '/images/projects/taiga.svg'
  },

  // Private Projects
  {
    title: 'APEX OHOL v8',
    category: 'Private - Trading Systems',
    description: 'Intraday options scanning system for NSE F&O market detecting OHOL patterns with live tracking and paper trading.',
    long_description: 'An algorithmic trading system that scans the NSE F&O market for Open=High and Open=Low patterns on the first one-minute candle (09:15 to 09:16), generates trade signals, tracks them live, sends Telegram alerts, and runs a paper-trading engine for P&L simulation.',
    tags: ['Python', 'FastAPI', 'SQLite', 'Real-time', 'Trading', 'Telegram Bot'],
    tech_details: {
      frontend: 'Vanilla JS Single-Page App',
      backend: 'Python 3, FastAPI, Uvicorn',
      database: 'SQLite',
      broker: 'Kotak Neo API',
      notifications: 'Telegram Bot API'
    },
    links: {},
    featured: true,
    year: 2024,
    image: '/images/projects/apex-ohol.svg'
  },

  {
    title: 'Homeground Hotel Booking',
    category: 'Private - Booking Platform',
    description: 'WordPress-powered hotel and vacation rental booking platform with STAAH booking engine integration for seamless property management and reservations.',
    long_description: 'A production hotel booking system built on WordPress with STAAH booking engine integration. Handles property listings, checkout flows, and guest reservations at scale.',
    tags: ['WordPress', 'PHP', 'STAAH', 'Payments', 'Booking Engine'],
    tech_details: {
      cms: 'WordPress',
      integrations: 'STAAH Booking Engine',
      deployment: 'Self-hosted'
    },
    links: {
      external: 'https://homeground.in'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/homeground.svg'
  },

  // Public Projects
  {
    title: 'BizAssist Platform',
    category: 'Full-Stack Web',
    description: 'Full-stack agency website delivering scalable client solutions with a modern tech stack.',
    long_description: 'A production-grade business platform demonstrating full-stack development with a Next.js frontend, Node.js backend, MongoDB database, deployed on Vercel.',
    tags: ['Next.js', 'React', 'Tailwind', 'Node.js', 'MongoDB', 'Vercel'],
    links: {
      demo: 'https://www.bizassist.online/',
      github: 'https://github.com/suresh-3x/bizAssist'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/bizassist.svg'
  },

  {
    title: 'Smax Bookings App',
    category: 'Mobile - iOS',
    description: 'Native iOS app for Cal.com scheduling with a self-hosted Docker backend.',
    long_description: 'A native iOS application built with Swift and SwiftUI providing seamless Cal.com integration with a self-hosted backend. Demonstrates native iOS development and API integration.',
    tags: ['Swift', 'SwiftUI', 'iOS', 'Calendar API', 'Docker'],
    links: {
      github: 'https://github.com/suresh-3x/smax-bookings-app'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/smax-bookings.png'
  },

  {
    title: 'Vision Clothing',
    category: 'Mobile - E-Commerce',
    description: 'Cross-platform e-commerce mobile app showcasing Material Design and a seamless checkout flow.',
    long_description: 'A production-ready e-commerce application built with Flutter and Dart, featuring product browsing, shopping cart, Material Design UI, and a smooth checkout experience.',
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
  'AI / Agentic Systems',
  'AI / RAG',
  'Open Source',
  'Private - Trading Systems',
  'Private - Booking Platform',
  'Full-Stack Web',
  'Mobile - iOS',
  'Mobile - E-Commerce'
];
