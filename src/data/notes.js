export const notes = [
  {
    slug: 'zero-blocking-trading-terminal',
    title: 'Zero-blocking client architecture for live market feeds',
    date: '2026-08',
    readingTime: '6 min read',
    abstract:
      'Cutting critical-path JavaScript from 12 bundles to 5, pre-binding click stubs for unparsed scripts, and ditching web fonts so live option chains render without layout reflow or blank screens during opening bell volatility.',
    tags: ['trading-systems', 'frontend-architecture', 'performance', 'resilience'],
    href: '/notes/zero-blocking-trading-terminal',
    seo_description: 'Designing a zero-blocking client architecture for high-frequency index options terminals: bundle decoupling, click stub queues, and system font performance.',
    sections: [
      {
        heading: 'The Volatility Window: Where Client Performance Fails',
        paragraphs: [
          'When index options markets open at 09:15, spot prices, Greeks, and ATM straddle premiums surge simultaneously across six major indices (NIFTY 50, BANKNIFTY, FINNIFTY, SENSEX, and others). High-frequency market data streams generate tens of tick updates per second.',
          'Under this load, traditional web dashboards fail predictably: heavy JavaScript bundles tie up the main thread during hydration, remote web fonts trigger layout jitter, and early user clicks on critical strike rows or order triggers get silently dropped.'
        ]
      },
      {
        heading: 'Decoupling Critical Path Bundles with Idle Scheduling',
        paragraphs: [
          'When engineering the client delivery architecture for StraddleEDGE, our priority was zero-blocking initial paint. We decoupled analytical modules (volatility risk premium charts and full option chains) from the core market skeleton.',
          'By splitting the bundle structure, initial critical-path scripts dropped from 12 bundles to 5. Analytical charts and historical matrices are loaded asynchronously using requestIdleCallback with strict fallback deadlines, keeping interaction latency under 16 milliseconds even while processing high-throughput WebSocket streams.'
        ]
      },
      {
        heading: 'Pre-Bound Action Stubs: Never Drop Early Clicks',
        paragraphs: [
          'During rapid market breakouts, a dropped or delayed click on an options strike can cost thousands. When users click an element while main execution scripts are still evaluating, the browser normally fails to register the handler.',
          'We installed an ultra-lightweight, 2KB early-action capture shim directly in the document head. The shim listens for early click and keyboard events on interactive action buttons and buffers them in a FIFO queue of up to 70 events. When the primary application controller finishes mounting, it immediately replays and drains the queued actions.'
        ]
      },
      {
        heading: 'Deterministic System Typography: Eliminating Layout Reflow',
        paragraphs: [
          'Options chains display hundreds of numerical values that update 10 to 50 times every second. Relying on remote CDN web fonts introduces font-swapping layout shifts and network overhead during market opening spikes.',
          'We discarded third-party CDN typography entirely in favor of deterministic system monospace font stacks with tabular numerals (font-variant-numeric: tabular-nums). This achieved zero cumulative layout shift (CLS: 0.00) and guaranteed that numerical columns never jitter as numbers fluctuate.'
        ]
      },
      {
        heading: 'Inline Bundle Failure Guards for Continuous Deployments',
        paragraphs: [
          'During active trading sessions, background production deployments update asset hashes on the server. If an open client session attempts to lazy-load a route chunk that has been superseded, the browser throws a dynamic import failure resulting in a white screen.',
          'We built an inline bundle-failure recovery guard that catches route chunk 404 errors, captures transient session state, and initiates a graceful, background cache revalidation. The client restores view continuity seamlessly without manual reloads.'
        ]
      }
    ],
    takeaways: [
      'Reduce critical-path JavaScript to the minimal render skeleton, deferring analytics via requestIdleCallback.',
      'Capture early user interactions with an inline head shim so no clicks are lost during bundle evaluation.',
      'Use deterministic system font stacks with tabular numerals to eliminate font network round trips and layout shifts.',
      'Implement inline chunk-failure handlers to prevent white-screen crashes after rolling production deployments.'
    ]
  },
  {
    slug: 'queue-is-the-spine',
    title: 'The queue is the spine, not the AI',
    date: '2026-05',
    readingTime: '5 min read',
    abstract:
      'Designing Revamp Engine so an LLM outage stalls only q:ai. SQLite as truth, Redis as a rebuildable cache, and a circuit breaker that quarantines AI work while scraping and deploys keep draining.',
    tags: ['agentic-ai', 'distributed-systems', 'resilience'],
    href: '/notes/queue-is-the-spine',
    seo_description: 'Engineering resilient agentic AI systems: why the durable queue, not the LLM, must form the architectural spine of autonomous worker pipelines.',
    sections: [
      {
        heading: 'The Fragile Illusion of Agentic Autonomy',
        paragraphs: [
          'Most developers building AI workflows begin with a linear script: call an LLM, parse its JSON response, scrape a URL, call another LLM, and write to a database. In local demos this looks miraculous. In production over a 72-hour window, it fails completely.',
          'Model APIs experience rate limits, transient 502 Bad Gateways, provider maintenance windows, and unexpected latency spikes. When an autonomous system relies on synchronous in-memory state, a single API hiccup destroys the entire workflow and loses customer data.'
        ]
      },
      {
        heading: 'Decoupling AI from the Execution Spine',
        paragraphs: [
          'When architecting Revamp Engine, the fundamental design rule was simple: the queue is the spine, not the AI model. Work is segregated into discrete, prioritized queue channels in Redis: q:scrape, q:import, q:ai, and q:deploy.',
          'If OpenAI or Anthropic suffers an outage, only worker processes bound to q:ai pause. The scraping workers continue collecting target company data, import workers continue ingesting customer records, and deployment workers continue shipping approved builds. The system degrades in a single isolated dimension rather than halting altogether.'
        ]
      },
      {
        heading: 'SQLite as Truth, Redis as Hot Cache',
        paragraphs: [
          'Redis is fast and ideal for queue orchestration, but treats memory as ephemeral. We chose SQLite with Write-Ahead Logging (WAL mode) as the durable persistence layer. Every state transition is recorded in SQLite first.',
          'On cold boot or node restart, the worker supervisor inspects SQLite and rehydrates Redis queue state. Even if the underlying hardware loses power, zero job definitions or audit trails are discarded.'
        ]
      },
      {
        heading: 'Circuit Breakers and Mandatory Human Gates',
        paragraphs: [
          'When consecutive LLM errors exceed a defined threshold, an automated circuit breaker trips into an OPEN state. Rather than hammering the provider and wasting budget on retries, jobs sit safely in q:ai while alerting the supervisor.',
          'Furthermore, no generated marketing page or code change deploys to a public domain automatically. The pipeline halts at a built state and awaits a human preview and cryptographic sign-off. Reliability is not just about uptime; it is about preventing unintended automated actions.'
        ]
      }
    ],
    takeaways: [
      'Isolate external AI dependencies into dedicated worker queues with independent backoff policies.',
      'Use durable disk persistence (like SQLite WAL) as source of truth and memory brokers (like Redis) as ephemeral hot caches.',
      'Implement circuit breakers to prevent retry cascades during third-party LLM outages.',
      'Keep humans in the loop at critical side-effect boundaries.'
    ]
  },
  {
    slug: 'sub-millisecond-deterministic-nlp',
    title: 'Why your CLI does not need an LLM: 7 microsecond NLP',
    date: '2026-04',
    readingTime: '5 min read',
    abstract:
      'Parsing natural language into verified tmux commands in 7.6 microseconds with zero external dependencies. Why deterministic tokenizers and synonym normalization maps beat 500ms LLM round trips for terminal tooling.',
    tags: ['python', 'cli', 'nlp', 'performance'],
    href: '/notes/sub-millisecond-deterministic-nlp',
    seo_description: 'Building deterministic, dependency-free natural language CLI parsers: why finite grammar tokenizers beat LLMs with 7.6 microsecond warm execution.',
    sections: [
      {
        heading: 'The Probabilistic Trap in Developer Tooling',
        paragraphs: [
          'A pervasive trend in modern developer tools is to wedge an LLM into every command-line utility. For everyday terminal operations, this introduces 300 to 1200 millisecond network latency, requires internet access or huge local weights, and invites unpredictable hallucinations into the shell.',
          'For utilities like tmux, the command space is finite and well-defined: split panes, kill windows, attach sessions, swap layouts. The developer problem is not a lack of artificial intelligence; it is remembering arcane flag combinations and syntax when switching contexts.'
        ]
      },
      {
        heading: 'The Anatomy of a 7.6 Microsecond Parser',
        paragraphs: [
          'When building tm, our design goal was sub-millisecond execution using only the Python standard library with zero third-party dependencies. No PyTorch, no Hugging Face, no pip installs.',
          'The parser runs through a three-stage deterministic pipeline: token normalization with punctuation stripping, intent recognition using exact and Levenshtein distance synonym tables, and structured parameter extraction for pane IDs and percentages. In benchmarks, warm parse and command build executes in 7.6 microseconds: more than 50,000 times faster than a cloud model API call.'
        ]
      },
      {
        heading: 'Explicit Clarification Over Probabilistic Guessing',
        paragraphs: [
          'LLMs are trained to guess an answer even when user input is dangerously ambiguous. In a terminal environment, guessing whether "kill 2" means window 2, pane 2, or session 2 can terminate a production service.',
          'Instead of guessing, tm incorporates an explicit ambiguity detector. If an instruction matches multiple structural targets, the CLI halts execution and prompts the user with verified, safe alternatives. Predictability is the ultimate ergonomic feature in developer tooling.'
        ]
      },
      {
        heading: 'Unbreakable Portability Across Scrappy Hardware',
        paragraphs: [
          'When managing remote jump hosts, air-gapped production servers, or a low-power Raspberry Pi node, installing large Python packages is often restricted or impossible.',
          'By restricting the codebase to pure standard library constructs, the tool runs identically across macOS, Linux, and FreeBSD on any Python 3 installation. It cold-boots instantly and keeps keyboard flow uninterrupted.'
        ]
      }
    ],
    takeaways: [
      'Avoid probabilistic models for closed-domain utilities where syntax grammars are finite.',
      'Deterministic synonym maps and fuzzy tokenizers achieve microsecond execution without GPU dependencies.',
      'Terminal safety requires explicit confirmation on ambiguous inputs rather than probabilistic guessing.',
      'Standard library architectures provide instant cold starts and zero-installation portability across remote servers.'
    ]
  },
  {
    slug: 'zero-fault-wallet',
    title: 'A zero fault wallet engine at 10K req/sec',
    date: '2026-02',
    readingTime: '6 min read',
    abstract:
      'Moving real money under live load with no data loss: idempotency, event flow over RabbitMQ, Redis hot state, and tracing a consistency bug through millions of events in two days.',
    tags: ['distributed-systems', 'reliability', 'payments'],
    href: '/notes/zero-fault-wallet',
    seo_description: 'Architecture of a zero-fault distributed wallet engine processing real-money transactions at 10K requests/sec peak with RabbitMQ and PostgreSQL.',
    sections: [
      {
        heading: 'The Stakes of Real-Money Gaming Infrastructure',
        paragraphs: [
          'In a gaming platform serving 5M to 10M monthly active users with real stakes, user trust hinges entirely on transaction finality. If a user wins a tournament or deposits funds, balance discrepancies cannot be excused by eventual consistency lags.',
          'During peak evening tournament events, transaction volume surged to 10,000 requests per second. At that velocity, database locks cause catastrophic connection pool exhaustion if architecture is not deliberately partitioned.'
        ]
      },
      {
        heading: 'Strict Idempotency Keys and Double-Entry Ledgers',
        paragraphs: [
          'Every transaction dispatched across the network carried a client-generated UUID idempotency key. Before acquiring any balance locks, the transaction coordinator checks an in-memory Redis bloom filter and set.',
          'Duplicate network retries are returned the cached original result without touching the ledger database. Transactions are stored as immutable double-entry journal records: funds are never simply overwritten with an UPDATE balance statement; every movement is an immutable debit-credit pair.'
        ]
      },
      {
        heading: 'RabbitMQ Message Ordering and Dead Letter Routing',
        paragraphs: [
          'To sustain high throughput, balance mutations were piped through consistent-hash exchange topologies in RabbitMQ. All events for a specific user ID routed to the identical queue partition, guaranteeing strict FIFO sequence execution without distributed multi-master locks.',
          'Failed consumer messages were routed to Dead Letter Exchanges (DLX) with exponential retry policies. If an event failed three times, it triggered high-priority PagerDuty alerts for manual triage while permitting adjacent user queues to progress unhindered.'
        ]
      },
      {
        heading: 'Tracking Down a Distributed Race Condition',
        paragraphs: [
          'During a major holiday gaming event, telemetry detected a rare balance verification mismatch occurring in roughly 1 out of 500,000 events. Tracking it required querying distributed trace identifiers across millions of log records.',
          'The root cause was a subtle timing window where a WebSocket disconnect callback overlapped with a webhook acknowledgment. Enforcing Redis optimistic locks with version counters completely eliminated the race condition, maintaining our zero financial loss record.'
        ]
      }
    ],
    takeaways: [
      'Never mutate balances directly; record double-entry immutable ledgers for verifiable auditability.',
      'Enforce idempotency at the edge with unique transaction keys.',
      'Partition event queues by entity ID to preserve FIFO sequencing without global database locking.',
      'Instrument distributed tracing from day one to debug race conditions across high-velocity microservices.'
    ]
  },
  {
    slug: 'rag-over-60-docs',
    title: 'RAG over 60 docs: hours to seconds',
    date: '2025-12',
    readingTime: '5 min read',
    abstract:
      'Building a retrieval augmented chatbot on Google ADK that turned manual lookup into instant grounded answers: chunking, embeddings, retrieval contracts with the data science team, and keeping answers faithful.',
    tags: ['agentic-ai', 'rag', 'llm'],
    href: '/notes/rag-over-60-docs',
    seo_description: 'Building production enterprise RAG and knowledge graph retrieval on Google ADK, reducing engineering search from 40 minutes to under 2 minutes.',
    sections: [
      {
        heading: 'Enterprise Documentation Fragmentation',
        paragraphs: [
          'Inside large organizations like T-Systems and Deutsche Telekom, critical architectural knowledge is scattered across fragmented formats: Confluence wikis, legacy PDF specifications, Excel spreadsheets, and complex architectural diagrams.',
          'Engineers spent upwards of 40 minutes searching through documentation repositories to find exact interface contracts or deployment policies. We were tasked with building an internal AI system capable of returning grounded, verifiable answers in seconds.'
        ]
      },
      {
        heading: 'Hybrid Knowledge Graphs and Vector Retrieval',
        paragraphs: [
          'Pure vector search frequently falls short when answering hierarchical questions, such as which microservice owns a particular authentication token across three dependent subsystems. Vector similarity finds conceptually related text, but misses exact relationship graphs.',
          'We built an extraction pipeline combining vector embeddings for semantic document retrieval with a lightweight knowledge graph. The system extracts entities and relationships during indexing, enabling the agent to traverse relationships before synthesizing answers.'
        ]
      },
      {
        heading: 'Retrieval Contracts and Streaming Token Responses',
        paragraphs: [
          'As the dedicated backend engineer, I established strict API contracts with our European data science counterparts. Rather than returning raw unformatted text, the retrieval layer passes structured candidate chunks with source metadata, page numbers, and confidence scores.',
          'Using HTTP Server-Sent Events (SSE) streaming, the user interface receives the first response token in under 400 milliseconds, accompanied by clickable source citations allowing engineers to verify the underlying documentation immediately.'
        ]
      },
      {
        heading: 'Preventing Hallucinations Through Grounded Prompts',
        paragraphs: [
          'To ensure absolute adherence to enterprise policy, the system prompt strictly instructs the agent to state that information is unavailable if candidate retrieved chunks do not contain the answer.',
          'By measuring groundedness against historical query benchmarks, retrieval lookup times dropped from 40+ minutes to under 2 minutes, saving hundreds of engineering hours every month.'
        ]
      }
    ],
    takeaways: [
      'Combine vector embeddings with knowledge graph relationships for complex enterprise document queries.',
      'Pass structured source metadata with confidence scores rather than unstructured text blobs.',
      'Use Server-Sent Events (SSE) to deliver sub-second time-to-first-token experiences.',
      'Enforce strict fallback guardrails when retrieved context is insufficient.'
    ]
  },
  {
    slug: 'temporal-video-rag',
    title: 'Grounded video RAG: solving temporal drift in audio transcripts',
    date: '2025-11',
    readingTime: '5 min read',
    abstract:
      'Turning hours of conversational vlog audio into verified travel plans: time-indexed caption chunking, ChromaDB vector indexing, and grounding prompts with clickable timestamp citations.',
    tags: ['agentic-ai', 'rag', 'vector-embeddings', 'python'],
    href: '/notes/temporal-video-rag',
    seo_description: 'Architecting video RAG pipelines: time-indexed caption chunking, vector embeddings in ChromaDB, and timestamped citations to prevent LLM hallucinations.',
    sections: [
      {
        heading: 'Why Document RAG Breaks Down on Video Transcripts',
        paragraphs: [
          'Standard Retrieval Augmented Generation (RAG) pipelines are designed for structured text: documentation, markdown files, and articles with distinct headings. Spoken audio transcripts from creator vlogs are fundamentally different: unstructured, conversational, and filled with conversational tangents.',
          'Naive fixed-token chunking (such as cutting every 500 tokens) frequently splits sentences across chunk boundaries and severs the connection between what the creator says and what is shown on screen at that specific minute.'
        ]
      },
      {
        heading: 'Time-Indexed Semantic Chunking',
        paragraphs: [
          'In Nomad Mind, we designed an ingestion pipeline that parses Whisper audio transcripts and SRT caption files with millisecond temporal markers. Chunks are demarcated by natural conversational pauses and topic shifts rather than arbitrary token boundaries.',
          'Each vector payload indexed into ChromaDB includes strict metadata: video identifier, creator channel, start timestamp, end timestamp, and extracted geographical landmarks. This ensures that every semantic vector retains its exact temporal coordinates.'
        ]
      },
      {
        heading: 'Temporal Proximity Re-Ranking',
        paragraphs: [
          'When querying for local recommendations, standard cosine similarity often retrieves isolated fragments filmed months apart across different districts of a city. An LLM synthesizing these fragments will invent nonsensical transit connections.',
          'To solve this, our retrieval pipeline applies temporal proximity re-ranking. Candidate chunks that share close timestamps within the same video are grouped together and scored with higher relevance. This preserves the sequential itinerary context that the creator experienced on the ground.'
        ]
      },
      {
        heading: 'Strict Grounding and Clickable Video Proof',
        paragraphs: [
          'To eliminate travel hallucinations, the system prompt strictly forbids the model from recommending any venue or transit route not explicitly cited in the retrieved transcript context.',
          'Furthermore, every synthesized bullet point renders an embedded, clickable timestamp link directly to the YouTube player. Users can tap the link and immediately hear the creator discuss the location, turning AI suggestions into verifiable reality in seconds.'
        ]
      }
    ],
    takeaways: [
      'Demarcate audio transcripts using natural speech pauses and timestamp boundaries instead of arbitrary token counts.',
      'Attach temporal coordinates and video metadata to every vector payload in the embedding store.',
      'Use temporal proximity re-ranking to keep sequential recommendations contextually coherent.',
      'Enforce strict factual guardrails and provide clickable timestamp citations for immediate verification.'
    ]
  }
];
