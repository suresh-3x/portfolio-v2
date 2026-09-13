export const notes = [
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
  }
];
