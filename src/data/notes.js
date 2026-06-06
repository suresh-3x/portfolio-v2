export const notes = [
  {
    slug: 'queue-is-the-spine',
    title: 'The queue is the spine, not the AI',
    date: '2026-05',
    abstract:
      'Designing Revamp Engine so an LLM outage stalls only q:ai. SQLite as truth, Redis as a rebuildable cache, and a circuit breaker that quarantines AI work while scraping and deploys keep draining.',
    tags: ['agentic-ai', 'distributed-systems', 'resilience'],
    href: '',
  },
  {
    slug: 'zero-fault-wallet',
    title: 'A zero fault wallet engine at 10K req/sec',
    date: '2026-02',
    abstract:
      'Moving real money under live load with no data loss: idempotency, event flow over RabbitMQ, Redis hot state, and tracing a consistency bug through millions of events in two days.',
    tags: ['distributed-systems', 'reliability', 'payments'],
    href: '',
  },
  {
    slug: 'rag-over-60-docs',
    title: 'RAG over 60 docs: hours to seconds',
    date: '2025-12',
    abstract:
      'Building a retrieval augmented chatbot on Google ADK that turned manual lookup into instant grounded answers: chunking, embeddings, retrieval contracts with the data science team, and keeping answers faithful.',
    tags: ['agentic-ai', 'rag', 'llm'],
    href: '',
  },
];
