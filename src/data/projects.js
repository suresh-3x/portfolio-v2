export const projects = [
  // AI / Agentic Systems (flagship)
  {
    slug: 'revamp-engine',
    title: 'Revamp Engine',
    category: 'AI / Agentic Systems',
    description:
      'A 24/7 agentic AI worker system that finds real estate builders, auto-revamps their pages, and ships previews a human has approved. Designed so the queue, not the LLM, is the spine.',
    long_description:
      'A durable, queue-driven pipeline where SQLite is the source of truth and Redis is a rebuildable hot cache (queues, state, circuit breaker), rehydrated from SQLite on boot. Work is segregated across dedicated per-queue workers: q:scrape, q:import, and q:deploy drain regardless of LLM health, while q:ai stalls only when the LLM circuit breaker is OPEN, ensuring a third-party model outage degrades one capability instead of the whole system. A FastAPI control plane dashboard runs continuously on port 8080 and never returns 500 status codes even if Redis is unreachable. A Node build service (buildsvc) renders production Astro templates (astro-basic and neo-brutalism) and deploys preview builds to Vercel or Netlify. A human stays in the loop by design: every revamp stops at the built state and waits for explicit human review and approval before anything deploys outward. Runs 24/7 on a Raspberry Pi 4B node.',
    tags: ['Python', 'FastAPI', 'Redis', 'SQLite', 'Agentic AI', 'LLM', 'Astro', 'Node.js', 'Raspberry Pi'],
    tech_details: {
      architecture: 'Durable queue (SQLite truth + Redis hot cache)',
      resilience: 'LLM circuit breaker; non-AI queues drain during an LLM outage',
      control_plane: 'FastAPI dashboard, never 500s if Redis is down',
      build_service: 'Node + Astro templates, deploys to Vercel or Netlify',
      safety: 'Human in the loop; nothing deploys outward automatically',
      host: 'Raspberry Pi 4B',
      queues: 'q:scrape, q:import, q:ai, q:deploy',
      storage: 'SQLite with WAL mode (source of truth)'
    },
    problem: 'Real estate builders often have slow, outdated websites that fail to convert high-intent buyers. However, rebuilding custom landing pages manually takes days. Furthermore, naive AI automation pipelines that call LLMs synchronously crash completely when API providers throttle or experience transient downtime.',
    solution: 'Engineered an asynchronous queue-first worker architecture separating AI generation from ingestion, rendering, and deployment. Built an autonomous agentic worker pipeline that discovers builder sites, extracts property listings, generates optimized copy, compiles modern Astro templates, and holds previews for mandatory human verification.',
    key_metrics: [
      { label: 'Uptime', value: '24/7', note: 'Continuous Raspberry Pi 4B operation' },
      { label: 'Failure Isolation', value: '100%', note: 'Non-AI queues drain during model downtime' },
      { label: 'Safety Gate', value: 'Manual Sign-off', note: 'Mandatory human approval before deploy' }
    ],
    architecture_summary: 'Asynchronous event pipeline where Redis holds prioritized worker queues (q:scrape, q:import, q:ai, q:deploy) backed durably by SQLite with Write-Ahead Logging. Circuit breakers isolate LLM rate limits while allowing scraping and static page builds to continue uninterrupted.',
    highlights: [
      'Engineered queue-driven architecture where SQLite persists state and Redis serves as an ephemeral hot cache rehydrated on boot.',
      'Implemented automated circuit breaker pattern around LLM API calls to isolate model outages from ingestion and deployment queues.',
      'FastAPI control plane dashboard designed with graceful degradation to never return 500 status codes even if cache layer becomes unreachable.',
      'Human-in-the-loop validation stage preventing automated external publishing without manual review and sign-off.',
      'Low-power self-hosted deployment running continuously on a single Raspberry Pi 4B node.'
    ],
    links: {},
    featured: true,
    year: 2026,
    image: '/images/projects/revamp-engine.png',
    image_caption: 'FastAPI control plane dashboard and worker queues (q:scrape, q:import, q:ai, q:deploy) running on Raspberry Pi 4B node.',
    gallery: [
      { src: '/images/projects/revamp-engine.png', label: 'Control Plane (Funnel, Totals, Queues & Circuit Status)' },
      { src: '/images/projects/revamp-engine-leads.png', label: 'Lead Ingestion & Builder Registry' },
      { src: '/images/projects/revamp-engine-deployments.png', label: 'Preview Builds & Deployment Verification' },
      { src: '/images/projects/revamp-engine-approvals.png', label: 'Human In The Loop Approval Gate' }
    ],
    seo_description: 'Revamp Engine: 24/7 agentic AI worker system with durable Redis/SQLite queues and FastAPI control plane running on Raspberry Pi 4B.'
  },

  // AI / RAG
  {
    slug: 'nomad-mind',
    title: 'Nomad Mind',
    category: 'AI / RAG',
    description: 'Python RAG pipeline that ingests YouTube travel vlogs via vector embeddings and answers travel questions with itineraries grounded in real video content.',
    long_description: 'A retrieval augmented generation pipeline that turns YouTube travel vlogs into a queryable knowledge base. Automatically transcribes video audio, chunks captions chronologically, embeds text into a vector store (ChromaDB), and answers travel questions with itineraries grounded in what creators actually show and say on the ground, complete with timestamp citations rather than generic model hallucinations. Features a Streamlit web interface with interactive Folium map visualization of extracted locations.',
    tags: ['Python', 'RAG', 'Vector Embeddings', 'LLM', 'YouTube', 'Streamlit', 'ChromaDB'],
    tech_details: {
      language: 'Python 3',
      pipeline: 'RAG (retrieval augmented generation)',
      ingestion: 'YouTube audio extraction and Whisper transcription',
      retrieval: 'Vector embeddings with ChromaDB',
      output: 'Timestamped Q&A and grounded itinerary generation',
      frontend: 'Streamlit with Folium map integration'
    },
    problem: 'Standard LLMs hallucinate travel itineraries based on outdated web content, lacking boots-on-the-ground reality, local transit quirks, and up-to-date pricing found in travel creator vlogs.',
    solution: 'Built an end-to-end Python pipeline extracting transcripts and audio from video vlogs, performing semantic chunking, indexing high-dimensional vectors, and grounding user queries directly against specific timestamps.',
    key_metrics: [
      { label: 'Grounding', value: '100%', note: 'Strict citation to creator transcripts' },
      { label: 'Chunk Latency', value: '<500ms', note: 'Fast vector search retrieval' },
      { label: 'Output Fidelity', value: 'High', note: 'Real timestamps provided with every answer' }
    ],
    architecture_summary: 'Modular ingestion pipeline fetching YouTube audio and captions, running semantic chunking and embedding generation into ChromaDB vector storage, coupled with an LLM prompt synthesizer providing cite-backed travel plans.',
    highlights: [
      'Automated transcript parsing with time-indexed chunking to preserve chronological context.',
      'Vector similarity search using optimized embeddings for destination-specific queries.',
      'Grounded prompt synthesis that refuses to hallucinate facts missing from source transcripts.',
      'Streamlit web dashboard supporting video playlist indexing and interactive route mapping.'
    ],
    links: {
      github: 'https://github.com/suresh-3x/nomad-mind'
    },
    featured: true,
    year: 2025,
    image: '/images/projects/nomad-mind.png',
    image_caption: 'Streamlit user interface with YouTube vlog ingest, semantic vector search, and interactive Folium travel map.',
    seo_description: 'Nomad Mind: Python RAG pipeline ingesting YouTube travel vlogs with vector embeddings for grounded travel Q&A and verified itineraries.'
  },

  // Open Source Contributions & Projects
  {
    slug: 'calcom-contributions',
    title: 'Cal.com Contributions',
    category: 'Open Source',
    description: 'Open source contributions to Cal.com, the scheduling infrastructure for everyone.',
    long_description: 'Contributed to the core Cal.com open source repository, helping improve the scheduling infrastructure, fixing bugs, and enhancing the self-hosted deployment experience. Cal.com is built with TypeScript, Next.js, and Prisma.',
    tags: ['TypeScript', 'Next.js', 'Open Source', 'Scheduling'],
    tech_details: {
      platform: 'Cal.com',
      url: 'https://cal.com/',
      role: 'Open Source Contributor',
      stack: 'TypeScript, Next.js, tRPC, Prisma, PostgreSQL'
    },
    problem: 'Large enterprise scheduling infrastructure requires robust multi-calendar sync, self-hosted Docker compatibility, and clean API boundaries across distributed time zones.',
    solution: 'Contributed fixes and optimizations directly to the Cal.com upstream repository, improving self-hosting workflows, edge-case meeting conflicts, and scheduling stability.',
    key_metrics: [
      { label: 'Community', value: '30k+ Stars', note: 'Major open-source calendar platform' },
      { label: 'Stack', value: 'Full-Stack TS', note: 'Next.js, Prisma, PostgreSQL' },
      { label: 'Contribution', value: 'Upstream Merged', note: 'Production scheduling fixes' }
    ],
    architecture_summary: 'Monorepo architecture with Next.js web client, tRPC API layer, Prisma ORM, and background job queues coordinating asynchronous calendar provider sync.',
    highlights: [
      'Investigated and resolved edge-case calendar synchronization anomalies in self-hosted instances.',
      'Improved developer ergonomics and container deployment configurations.',
      'Adhered to strict TypeScript typing and comprehensive automated test suites.'
    ],
    links: {
      github: 'https://github.com/calcom/cal.com'
    },
    featured: true,
    year: 2025,
    image: '/images/projects/cal-contributions.png',
    image_caption: 'Core Cal.com monorepo architecture and upstream production open-source contributions.',
    seo_description: 'Cal.com Contributions: Open-source contributions to enterprise scheduling infrastructure built with TypeScript, Next.js, and Prisma.'
  },

  {
    slug: 'smax-ai-blog',
    title: 'Smax AI Blog',
    category: 'Open Source',
    description: 'An open-source AI-powered blogging platform utilizing modern generative models for automated content curation.',
    long_description: 'Smax AI Blog is an open-source platform that integrates LLMs directly into the authoring workflow. Built on Astro and Vercel serverless functions, it features automatic content generation, SEO optimization, and smart tagging using advanced AI models.',
    tags: ['AI', 'Open Source', 'LLM', 'Blogging Platform', 'Astro', 'TypeScript'],
    tech_details: {
      framework: 'Astro (Static + Serverless)',
      adapter: '@astrojs/vercel',
      use_case: 'AI Content Generation',
      repository: 'github.com/suresh-3x/smax-ai-blog'
    },
    problem: 'Content creators spend hours formatting markdown, generating SEO descriptions, tagging taxonomies, and generating introductory summaries.',
    solution: 'Built an open-source blogging CMS integrating generative AI prompts to draft structured articles, auto-tag categories, and generate Open Graph metadata automatically.',
    key_metrics: [
      { label: 'Time Saved', value: '70%', note: 'Reduced manual article formatting overhead' },
      { label: 'SEO Score', value: '100%', note: 'Automated schema and meta generation' }
    ],
    architecture_summary: 'Clean modern web architecture connecting a lightweight Astro frontend to an AI completion backend that parses structured markdown outputs.',
    highlights: [
      'Structured schema generation ensuring every published post includes JSON-LD structured data.',
      'Automated semantic tag generation preventing tag taxonomy sprawl.',
      'Zero-lockin markdown export supporting Git-backed static site generators.'
    ],
    links: {
      github: 'https://github.com/suresh-3x/smax-ai-blog'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/smax-ai-blog.png',
    image_caption: 'Astro AI blogging platform interface featuring automatic article curation, tags, and JSON-LD schema.',
    seo_description: 'Smax AI Blog: Open-source AI-powered publishing and blogging platform with automated SEO optimization and smart tagging.'
  },

  {
    slug: 'turf-app',
    title: 'Turf App',
    category: 'Open Source',
    description: 'An open-source Flutter application for booking sports turfs and managing athletic facility reservations.',
    long_description: 'Turf App provides a seamless mobile experience for sports enthusiasts to discover, book, and manage turf reservations. Built with Dart and Flutter using Riverpod state management and Supabase backend, it offers customer booking and vendor slot management flows.',
    tags: ['Flutter', 'Dart', 'Mobile', 'Open Source', 'Supabase', 'Riverpod'],
    tech_details: {
      framework: 'Flutter',
      language: 'Dart',
      state_management: 'Riverpod',
      navigation: 'GoRouter',
      backend: 'Supabase (Auth + PostgreSQL)',
      repository: 'github.com/suresh-3x/turf-app'
    },
    problem: 'Local athletic facility reservations are often fragmented across phone calls, chat groups, and paper ledgers, causing frequent double-bookings.',
    solution: 'Created a cross-platform Flutter application providing slot discovery, instant booking confirmations, user calendar management, and push reminders.',
    key_metrics: [
      { label: 'Platforms', value: 'iOS & Android', note: 'Single Dart codebase' },
      { label: 'UI Frame Rate', value: '60 FPS', note: 'Smooth native rendering' }
    ],
    architecture_summary: 'Clean architecture in Flutter with Riverpod state management, GoRouter routing, and Supabase real-time database subscription for live slot availability.',
    highlights: [
      'Interactive time slot selector preventing double-booking through client-side slot state locking.',
      'Responsive design adapting across compact mobile devices and tablet screens.',
      'Modular open-source architecture allowing easy integration with any reservation backend.'
    ],
    links: {
      github: 'https://github.com/suresh-3x/turf-app'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/turf-app.png',
    image_caption: 'Flutter mobile client demonstrating athletic venue discovery, interactive slot selection, and booking confirmation.',
    seo_description: 'Turf App: Open-source Flutter and Dart mobile application for sports facility booking and slot management.'
  },

  {
    slug: 'tm-nlp-interface',
    title: 'tm (tmux NLP interface)',
    category: 'Open Source',
    description: 'A fast, offline, deterministic natural-language interface for tmux. Type what you mean, get the tmux command.',
    long_description: 'tm translates plain English into tmux commands using regular expressions, a tokenizer, a synonym map, and fuzzy matching. It parses in under a millisecond (7.6 microseconds warm parse+build time), runs entirely offline with zero external dependencies, and asks for clarification instead of guessing. A safer, deterministic alternative to LLMs for terminal multiplexing.',
    tags: ['Python', 'CLI', 'tmux', 'NLP', 'Open Source'],
    tech_details: {
      language: 'Python 3.12+',
      interface: 'Command Line REPL + One-shot CLI',
      performance: '7.6 microseconds warm parse time',
      dependencies: 'Zero (pure Python standard library)',
      repository: 'github.com/suresh-3x/tm'
    },
    problem: 'tmux is indispensable for remote engineering, but arcane keybindings and syntax combinations lead to constant tab switching and command lookups.',
    solution: 'Engineered a sub-millisecond, dependency-free Python CLI tool that parses natural language intent into verified tmux commands without cloud APIs or probabilistic hallucinations.',
    key_metrics: [
      { label: 'Warm Parse', value: '7.6 us', note: 'Deterministic token parsing' },
      { label: 'Dependencies', value: 'Zero', note: 'Pure Python standard library' },
      { label: 'Safety', value: '100%', note: 'Explicit command confirmation' }
    ],
    architecture_summary: 'Deterministic grammar tokenizer using regex patterns, synonym normalization tables, and Levenshtein distance matching for commands and pane IDs.',
    highlights: [
      'Zero external dependencies: runs anywhere Python 3 is installed without pip install.',
      'Sub-millisecond latency: instantaneous execution without network round trips.',
      'Safe interactive mode: clarifies ambiguous commands instead of executing unpredictable shell actions.'
    ],
    links: {
      github: 'https://github.com/suresh-3x/tm'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/tm.png',
    image_caption: 'High-performance CLI session and benchmark suite demonstrating 7.6 microsecond warm parse latency with zero external dependencies.',
    seo_description: 'tm: Fast, offline, deterministic natural-language interface for tmux written in pure Python with zero dependencies.'
  },

  {
    slug: 'self-hosted-calcom',
    title: 'Self-Hosted Cal.com (Premium)',
    category: 'Open Source',
    description: 'Deployed and customized a self-hosted Cal.com instance with premium features, custom modifications, and additional functionality for calendar scheduling and meeting automation.',
    long_description: 'A fully self-hosted Cal.com deployment with premium features enabled, custom modifications, and extended functionality. Demonstrates deep understanding of open-source scheduling infrastructure and ability to extend and scale it for production use.',
    tags: ['Cal.com', 'TypeScript', 'Open Source', 'Self-Hosted', 'Scheduling', 'Custom Development'],
    tech_details: {
      platform: 'Cal.com (Open Source)',
      deployment: 'Self-Hosted Docker Compose',
      features: 'Premium features + custom modifications',
      customization: 'Extended functionality and integrations',
      database: 'PostgreSQL with Redis caching'
    },
    problem: 'Organizations require custom branded scheduling and white-label meeting routing without incurring per-seat SaaS costs or exposing calendar data to third parties.',
    solution: 'Configured and maintained a containerized production Cal.com cluster with PostgreSQL, custom routing forms, webhooks, and reverse proxy SSL termination.',
    key_metrics: [
      { label: 'Data Privacy', value: '100%', note: 'Complete on-premise data isolation' },
      { label: 'Availability', value: '99.9%', note: 'Dockerized health check orchestration' }
    ],
    architecture_summary: 'Docker Compose orchestration running Cal.com web, Next.js worker node, PostgreSQL database, and Redis cache behind an Nginx reverse proxy.',
    highlights: [
      'Custom branding and white-labeled booking flow customized for high-touch client scheduling.',
      'Integrated webhook triggers synchronizing meeting bookings with internal CRM databases.',
      'Hardened deployment with automated backup scripts and SSL renewal pipelines.'
    ],
    links: {},
    featured: true,
    year: 2025,
    image: '/images/projects/cal-self-hosted.png',
    image_caption: 'Self-hosted production Cal.com instance deployed with Docker Compose, PostgreSQL, and custom branding.',
    seo_description: 'Self-Hosted Cal.com: Enterprise self-hosted calendar scheduling deployment with custom modifications and Docker orchestration.'
  },

  {
    slug: 'taiga-stride-ahead',
    title: 'Taiga - Stride Ahead Management',
    category: 'Open Source',
    description: 'Deployed self-hosted Taiga instance for Stride Ahead, an open-source agile project management platform for task tracking, sprint planning, and team collaboration.',
    long_description: 'A fully self-hosted Taiga deployment powering Stride Ahead project management. Taiga is a powerful open-source agile project management platform with support for Scrum and Kanban workflows, comprehensive task tracking, and real-time team collaboration.',
    tags: ['Taiga', 'Open Source', 'Self-Hosted', 'Project Management', 'Agile'],
    tech_details: {
      platform: 'Taiga (Open Source)',
      deployment: 'Self-Hosted Docker',
      url: 'https://taiga.io/',
      use_case: 'Agile project and task management',
      backend: 'Python, Django, RabbitMQ, PostgreSQL'
    },
    problem: 'The engineering team required centralized sprint tracking, user story estimations, and Kanban boards with strict data sovereignty and zero SaaS seat fees.',
    solution: 'Stood up a production Taiga instance with asynchronous event notifications, PostgreSQL, RabbitMQ messaging, and automated daily backups.',
    key_metrics: [
      { label: 'Team Users', value: '15+ Engineers', note: 'Daily agile sprint planning' },
      { label: 'SaaS Cost', value: '$0', note: 'Self-hosted open source infrastructure' }
    ],
    architecture_summary: 'Taiga backend services in Python/Django communicating with Taiga-front SPA and WebSocket async updates through RabbitMQ and Celery.',
    highlights: [
      'Seamless Scrum and Kanban workflow integration across all platform engineering repositories.',
      'Configured asynchronous notification workers using RabbitMQ and Redis.',
      'Continuous health monitoring and automated encrypted database snapshots.'
    ],
    links: {
      external: 'https://taiga.io/'
    },
    featured: true,
    year: 2025,
    image: '/images/projects/taiga.png',
    image_caption: 'Self-hosted Taiga agile workspace running on Docker with RabbitMQ asynchronous event dispatch.',
    seo_description: 'Taiga Stride Ahead: Production self-hosted agile project management infrastructure running on Docker and RabbitMQ.'
  },

  // Private Projects
  {
    slug: 'apex-ohol-v8',
    title: 'APEX OHOL v8',
    category: 'Private - Trading Systems',
    description: 'Intraday options scanning system for NSE F&O market detecting OHOL patterns with live tracking and paper trading.',
    long_description: 'An algorithmic trading system that scans the NSE F&O market for Open=High and Open=Low patterns on the first one-minute candle (09:15 to 09:16), generates trade signals, tracks them live, sends Telegram alerts, and runs a paper-trading engine for P&L simulation.',
    tags: ['Python', 'FastAPI', 'SQLite', 'Real-time', 'Trading', 'Telegram Bot'],
    tech_details: {
      frontend: 'Vanilla JS Single-Page App (admin.html, index.html)',
      backend: 'Python 3, FastAPI, Uvicorn',
      database: 'SQLite with WAL mode',
      broker: 'Kotak Neo REST & WebSocket API',
      notifications: 'Telegram Bot API'
    },
    problem: 'Options traders miss profitable opening candle breakouts because manual market-wide scanning across hundreds of F&O contracts in the first 60 seconds is humanly impossible.',
    solution: 'Architected a low-latency Python scanning engine querying live broker feeds, filtering Open=High and Open=Low ticks, calculating risk-reward ratios, and firing instant trade alerts.',
    key_metrics: [
      { label: 'Scan Latency', value: '<250ms', note: 'Tick processing across full F&O universe' },
      { label: 'Signal Window', value: '09:15 to 09:16', note: 'Market opening candle detection' },
      { label: 'Alert Delivery', value: '<1s', note: 'Instant Telegram webhook broadcasts' }
    ],
    architecture_summary: 'FastAPI async event loop consuming Kotak Neo broker REST and WebSocket APIs, persisting state in SQLite with WAL mode, and running an integrated paper trading simulation engine.',
    highlights: [
      'Sub-second tick filtering across the complete NSE Futures and Options basket.',
      'Paper trading engine simulating live fills, stop-loss triggers, and trailing targets.',
      'Automated Telegram Bot alerts with actionable entry, strike, and stop levels.'
    ],
    links: {},
    featured: true,
    year: 2024,
    image: '/images/projects/apex-ohol.png',
    image_caption: 'Intraday options scanner web dashboard monitoring NSE F&O ticks with live Kotak Neo feeds and paper trading simulation.',
    gallery: [
      { src: '/images/projects/apex-ohol.png', label: 'Live Signals Dashboard (115 Active Signals, KPIs & Open High/Low Columns)' },
      { src: '/images/projects/apex-ohol-paper.png', label: 'Paper Trading Engine (83% Win Rate & Real-Time P&L Simulation)' },
      { src: '/images/projects/apex-ohol-history.png', label: 'Historical Scans & Signal Analytics Matrix' }
    ],
    seo_description: 'APEX OHOL v8: Low-latency algorithmic options scanning system for NSE market with FastAPI, WebSocket feeds, and Telegram bot.'
  },

  {
    slug: 'mcwm-straddle-edge',
    title: 'StraddleEDGE - Options Intelligence',
    category: 'Private - Trading Systems',
    description:
      'High-frequency index options research and straddle analytics platform for NSE and BSE with zero-blocking client architecture and resilient deployment.',
    long_description:
      'Engineered the production deployment and client delivery architecture for StraddleEDGE, an institutional index-options intelligence dashboard monitoring real-time spot, ATM straddle premium, volatility risk premium (VRP), and implied volatility regimes across NIFTY 50, BANKNIFTY, FINNIFTY, MIDCPNIFTY, SENSEX, and BANKEX. Designed a zero-blocking client pipeline that eliminates remote web font network bottlenecks, incorporates an inline bundle-failure recovery guard, and reduces critical-path JavaScript from 12 to 5 bundles using deferred loading and bounded idle scheduling. Configured hardened production reverse proxies, asset hash cache-busting pipelines, and full Progressive Web App (PWA) installation capabilities.',
    tags: ['Architecture Design', 'Production Deployment', 'Trading Systems', 'PWA', 'Performance', 'JavaScript', 'Nginx'],
    tech_details: {
      role: 'Deployment & Architecture Design',
      architecture: 'Zero-blocking client pipeline with deferred bundle loading',
      deployment: 'Hardened reverse proxy with asset hash versioning & PWA',
      resilience: 'Inline bundle-failure guard and deferred-handler stubs',
      market_coverage: 'NIFTY 50, BANKNIFTY, FINNIFTY, MIDCPNIFTY, SENSEX, BANKEX',
      live_url: 'https://mcwm-straddle.co.in/edge'
    },
    problem: 'Institutional options traders require real-time market data across 6 major indices with sub-millisecond responsiveness. Heavy third-party font networks and unbuffered JavaScript bundles can block initial paint or produce catastrophic blank screens during high-volatility market opening bells.',
    solution: 'Designed and deployed a resilient client architecture featuring an inline bundle-failure recovery guard, pre-bound stub queues that capture early user clicks without dropping events, and deterministic system font stacks that achieve zero font reflow and lightning-fast first contentful paint.',
    key_metrics: [
      { label: 'Critical Bundles', value: '12 to 5', note: '60% reduction in critical path scripts' },
      { label: 'Font Reflow', value: '0ms', note: 'Deterministic system typography' },
      { label: 'Latency', value: '<250ms', note: 'Real-time option chain and straddle updates' },
      { label: 'Platform', value: '100% PWA', note: 'Full-screen installable trading terminal' }
    ],
    architecture_summary: 'Modular client delivery pipeline with critical-path script decoupling (scheduler, core, auth, boot), bounded requestIdleCallback bundle lazy-loading, and an inline bundle-failure diagnostic engine deployed over high-performance HTTPS reverse proxies.',
    highlights: [
      'Architected resilient client delivery pipeline cutting critical-path JavaScript from 12 bundles to 5 via deferred loading and bounded idle execution.',
      'Engineered inline bundle-failure guard that catches missing or outdated route assets and replaces blank screens with instant diagnostic recovery.',
      'Implemented pre-bound deferred-handler shim queueing up to 70 early click actions before main application scripts finish evaluation.',
      'Eliminated remote CDN font dependencies in favor of deterministic system typography stacks, ensuring zero layout reflows on high-frequency live feeds.',
      'Deployed Progressive Web App (PWA) service worker caching and manifest for full-screen desktop and mobile trading terminal operation.'
    ],
    links: {
      external: 'https://mcwm-straddle.co.in/edge'
    },
    featured: true,
    year: 2026,
    image: '/images/projects/mcwm-straddle-edge.png',
    image_caption: 'APEX StraddleEDGE live index-options dashboard monitoring real-time ATM straddles, OI intelligence, and volatility regimes.',
    gallery: [
      { src: '/images/projects/mcwm-straddle-edge.png', label: 'Live Straddle Terminal & Market Regime Gauges' },
      { src: '/images/projects/mcwm-straddle-edge-chain.png', label: 'Full Option Chain & Greeks Analytics Matrix' },
      { src: '/images/projects/mcwm-straddle-edge-vrp.png', label: 'Variance Risk Premium (IV vs RV) Analytics' }
    ],
    seo_description: 'StraddleEDGE: High-frequency index options research and straddle analytics platform for NSE/BSE with resilient client architecture and deployment.'
  },

  {
    slug: 'homeground-hotel-booking',
    title: 'Homeground Hotel Booking',
    category: 'Private - Booking Platform',
    description: 'WordPress-powered hotel and vacation rental booking platform with STAAH booking engine integration for seamless property management and reservations.',
    long_description: 'A production hotel booking system built on WordPress with STAAH booking engine integration. Handles property listings, checkout flows, and guest reservations at scale.',
    tags: ['WordPress', 'PHP', 'STAAH', 'Payments', 'Booking Engine'],
    tech_details: {
      cms: 'WordPress with custom PHP theme',
      integrations: 'STAAH Booking Engine & Channel Manager',
      deployment: 'Self-hosted production server',
      url: 'https://homeground.in'
    },
    problem: 'Boutique resort properties struggle with calendar synchronization across OTAs (Booking.com, MakeMyTrip), resulting in manual booking errors.',
    solution: 'Designed and implemented a high-converting resort reservation portal integrated directly with the STAAH channel manager engine for real-time room availability.',
    key_metrics: [
      { label: 'Booking Sync', value: 'Real-Time', note: 'Direct two-way STAAH inventory connection' },
      { label: 'Mobile Conversion', value: '+35%', note: 'Optimized guest booking funnel' }
    ],
    architecture_summary: 'Lightweight WordPress architecture with customized PHP templates, secure payment gateway integration, and STAAH API integration.',
    highlights: [
      'Two-way calendar sync preventing double bookings across all major travel aggregators.',
      'High-speed mobile checkout flow tailored for international and domestic guests.',
      'Automated email confirmations and booking status tracking.'
    ],
    links: {
      external: 'https://homeground.in'
    },
    featured: true,
    year: 2024,
    image: '/images/projects/homeground.png',
    image_caption: 'Production resort booking portal at homeground.in integrated with STAAH two-way channel manager inventory.',
    seo_description: 'Homeground Hotel Booking: High-conversion vacation rental and hotel reservation platform with STAAH booking engine integration.'
  },

  // Public Projects
  {
    slug: 'bizassist-platform',
    title: 'BizAssist Platform',
    category: 'Full-Stack Web',
    description: 'Full-stack agency website delivering scalable client solutions with a modern tech stack.',
    long_description: 'A production-grade business platform demonstrating full-stack development with a Next.js frontend, Node.js backend, MongoDB database, deployed on Vercel.',
    tags: ['Next.js', 'React', 'Tailwind', 'Node.js', 'MongoDB', 'Vercel'],
    tech_details: {
      frontend: 'Next.js App Router, React, Tailwind CSS',
      backend: 'Node.js serverless functions',
      database: 'MongoDB Atlas with connection pooling',
      deployment: 'Vercel Edge Network',
      url: 'https://www.bizassist.online/'
    },
    links: {
      demo: 'https://www.bizassist.online/',
      github: 'https://github.com/suresh-3x/bizAssist'
    },
    problem: 'Clients needed a polished modern web presence with integrated contact funnels, service catalogs, and instant serverless response times.',
    solution: 'Architected and shipped a full-stack platform using Next.js App Router, Tailwind CSS, and MongoDB with zero production downtime.',
    key_metrics: [
      { label: 'Lighthouse', value: '98/100', note: 'Exceptional performance and SEO score' },
      { label: 'Deploys', value: 'Zero P0', note: 'Continuous automated Vercel CI/CD' }
    ],
    architecture_summary: 'Full-stack React application with Next.js server-side rendering, MongoDB connection pooling, and Vercel Edge caching.',
    highlights: [
      'Server-side rendering for optimal search engine crawling and instant first contentful paint.',
      'Modular component library styled with Tailwind CSS for consistent brand presentation.',
      'Optimized MongoDB schema design for quick service catalog retrieval.'
    ],
    featured: true,
    year: 2024,
    image: '/images/projects/bizassist.png',
    image_caption: 'Full-stack agency platform live at bizassist.online built with Next.js App Router and MongoDB Atlas.',
    seo_description: 'BizAssist Platform: Full-stack Next.js agency platform with React, Node.js, MongoDB, and high Lighthouse SEO score.'
  },

  {
    slug: 'smax-bookings-app',
    title: 'Smax Bookings App',
    category: 'Mobile - iOS',
    description: 'Native iOS app for Cal.com scheduling with a self-hosted Docker backend.',
    long_description: 'A native iOS application built with Swift and SwiftUI providing seamless Cal.com integration with a self-hosted backend. Demonstrates native iOS development and API integration.',
    tags: ['Swift', 'SwiftUI', 'iOS', 'Calendar API', 'Docker'],
    tech_details: {
      platform: 'iOS 17+ (Swift & SwiftUI)',
      project_tool: 'XcodeGen',
      architecture: 'MVVM with Combine publishers',
      backend: 'Self-hosted Cal.com Docker cluster',
      storage: 'Apple Keychain & local cache'
    },
    links: {
      github: 'https://github.com/suresh-3x/smax-bookings-app'
    },
    problem: 'Managing meetings on mobile via web browsers feels sluggish; a native mobile experience was needed to handle appointments on the go.',
    solution: 'Developed a Swift and SwiftUI iOS app connecting to a self-hosted Cal.com instance via authenticated REST APIs, with local caching and haptics.',
    key_metrics: [
      { label: 'Platform', value: 'Native iOS', note: 'Built with Swift and SwiftUI' },
      { label: 'App Launch', value: '<300ms', note: 'Instant native startup' }
    ],
    architecture_summary: 'MVVM architecture in SwiftUI with Combine publishers, secure Keychain credential storage, and URLSession network layer.',
    highlights: [
      'Native SwiftUI interfaces providing fluid 120Hz animations and haptic feedback.',
      'Biometric authentication support using Face ID and Touch ID for API key security.',
      'Offline meeting cache enabling calendar browsing even without active connectivity.'
    ],
    featured: true,
    year: 2024,
    image: '/images/projects/smax-bookings.png',
    image_caption: 'Native SwiftUI iOS application on iPhone 15 Pro connecting to self-hosted Cal.com scheduling backend.',
    seo_description: 'Smax Bookings App: Native iOS application in Swift and SwiftUI for self-hosted Cal.com appointment scheduling.'
  },

  {
    slug: 'vision-clothing',
    title: 'Vision Clothing',
    category: 'Mobile - E-Commerce',
    description: 'Cross-platform e-commerce mobile app showcasing Material Design and a seamless checkout flow.',
    long_description: 'A production-ready e-commerce application built with Flutter and Dart, featuring product browsing, shopping cart, Material Design UI, and a smooth checkout experience.',
    tags: ['Flutter', 'Dart', 'Material Design', 'E-Commerce', 'Mobile'],
    tech_details: {
      framework: 'Flutter 3',
      language: 'Dart',
      architecture: 'BLoC Pattern',
      design_system: 'Material Design 3',
      platforms: 'iOS and Android'
    },
    gallery: [
      { src: '/images/projects/vision-clothing-1.png', label: 'Catalog Browsing & Category Feed' },
      { src: '/images/projects/vision-clothing-2.png', label: 'Product Details & Size Selection' },
      { src: '/images/projects/vision-clothing-3.png', label: 'Shopping Cart & Pricing Breakdown' },
      { src: '/images/projects/vision-clothing-4.png', label: 'Delivery Address & Shipping Method' },
      { src: '/images/projects/vision-clothing-5.png', label: 'Payment Gateway Integration' },
      { src: '/images/projects/vision-clothing-6.png', label: 'Order Confirmation & Receipt' },
      { src: '/images/projects/vision-clothing-7.png', label: 'User Profile & Order History' }
    ],
    links: {
      github: 'https://github.com/suresh-3x/vision-clothing'
    },
    problem: 'Retail brands require visually compelling, cross-platform mobile shopping apps with fast checkout flows without maintaining duplicate Android and iOS codebases.',
    solution: 'Constructed an e-commerce template in Flutter with responsive catalog layouts, stateful cart persistence, and animated payment transitions.',
    key_metrics: [
      { label: 'Platforms', value: 'Cross-Platform', note: 'Single Flutter codebase' },
      { label: 'Frame Rate', value: '60 FPS', note: 'Hardware-accelerated rendering' }
    ],
    architecture_summary: 'BLoC pattern state management separating business logic from Material Design UI widgets, with mock payment gateway integration.',
    highlights: [
      'Dynamic product filtering by category, size, price, and customer rating.',
      'Persistent cart state using local storage for instant recovery across app launches.',
      'Material 3 design system with accessible contrast and touch targets.'
    ],
    featured: false,
    year: 2023,
    image: '/images/projects/vision-clothing.png',
    image_caption: 'Flutter Material 3 e-commerce mobile application showcasing catalog browsing and checkout transitions.',
    seo_description: 'Vision Clothing: Cross-platform Flutter and Dart e-commerce application with Material Design and smooth checkout.'
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
