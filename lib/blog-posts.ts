export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  /** Full body — array of paragraphs rendered on the post page. */
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "How I Built an AI WhatsApp Chatbot for Local Businesses",
    slug: "ai-whatsapp-chatbot",
    date: "2025-06-01",
    readTime: "5 min read",
    tags: ["AI", "Python", "FastAPI", "WhatsApp"],
    excerpt:
      "A step-by-step breakdown of building a WhatsApp chatbot using Python, FastAPI, and Groq API — deployed on Hugging Face Spaces.",
    content: [
      "Most local businesses miss inquiries simply because there's no one to reply after hours. I wanted to fix that with a chatbot that lives on WhatsApp — the one app every customer already has open — and answers instantly, around the clock. The stack ended up being surprisingly lean: Python and FastAPI on the backend, Groq's blazing-fast LLMs for the actual reasoning, SQLite for lightweight chat memory, and UltraMsg as the bridge to the WhatsApp network.",
      "The core loop is a single webhook. UltraMsg forwards every incoming message to a FastAPI endpoint, I look up (or create) that contact's conversation history in SQLite, and then I send the full context to Groq. Because Groq's inference is so fast, replies feel genuinely real-time — there's no awkward 'the business is typing…' pause that kills a conversation. The model's response goes straight back out through UltraMsg to the customer.",
      "Memory is what makes it feel like a real assistant rather than a stateless FAQ bot. By persisting each turn keyed to the customer's phone number, the bot remembers what someone asked five messages ago — 'is that available in blue?' resolves correctly because it still knows we were talking about a specific product. I keep a rolling window of recent turns so prompts stay small and cheap while preserving the thread of the conversation.",
      "Deployment was the easy part: the whole thing runs on a free Hugging Face Space with the webhook URL pointed at it. If you're building your own, my advice is to start with the webhook and a hardcoded reply, confirm the WhatsApp round-trip works end to end, and only then layer in the LLM and memory. Getting the plumbing right first saves hours of debugging later.",
    ],
  },
  {
    title: "Getting Started with RAG: Retrieval-Augmented Generation Explained",
    slug: "rag-explained",
    date: "2025-06-15",
    readTime: "4 min read",
    tags: ["AI", "RAG", "LLM", "Python"],
    excerpt:
      "RAG lets AI models answer questions from your own documents. Here's how it works and how to build one with Python.",
    content: [
      "Large language models are brilliant generalists, but they don't know anything about your business — your internal docs, your product catalog, your policies. Retrieval-Augmented Generation, or RAG, closes that gap. Instead of fine-tuning a model (expensive and slow to update), you keep your knowledge in a searchable store and hand the relevant pieces to the model at question time.",
      "The pipeline has two phases. First, indexing: you split your documents into chunks, convert each chunk into an embedding — a vector that captures its meaning — and store those vectors in a vector database. Second, retrieval: when a user asks a question, you embed the question the same way, find the chunks whose vectors are closest to it, and paste those chunks into the prompt as context. The model then answers grounded in your actual content rather than its training data.",
      "In Python this is refreshingly approachable. A sentence-transformer model handles embeddings, a store like FAISS or Chroma handles similarity search, and any LLM handles the final generation. The single biggest lever on quality is chunking: too large and you drown the model in irrelevant text, too small and you fragment the meaning. Overlapping chunks of a few hundred tokens is a sane starting point you can tune from there.",
      "RAG's real superpower is freshness. Update a document, re-index that one chunk, and the assistant's answers change immediately — no retraining, no redeployment. That's why it has become the default architecture for chatbots that need to speak accurately about a specific, evolving body of knowledge.",
    ],
  },
  {
    title: "Why Every Local Business Needs an AI Chatbot in 2025",
    slug: "ai-chatbot-for-business",
    date: "2025-07-01",
    readTime: "3 min read",
    tags: ["AI", "Business", "Chatbot", "Freelance"],
    excerpt:
      "AI chatbots save time, reduce missed inquiries, and work 24/7. Here's why small businesses should get one now.",
    content: [
      "The math for a small business is simple: every unanswered message is a potential customer walking to a competitor. You can't staff a phone or an inbox 24 hours a day, but an AI chatbot can. It greets every visitor instantly, answers the same 20 questions you're tired of typing, and books or qualifies leads while you sleep.",
      "What's changed in 2025 is that this is no longer enterprise-only technology. Fast, affordable LLM APIs and no-code messaging integrations mean a capable chatbot can be stood up in days, not months, and run for a few dollars a month. The barrier used to be cost and complexity; now it's mostly just awareness that the option exists.",
      "The wins compound quickly. Response times drop from hours to seconds, which measurably improves conversion. Your team stops drowning in repetitive questions and focuses on the conversations that actually need a human. And because the bot logs every interaction, you get a free stream of data about what customers keep asking — insight you can feed back into your website, pricing, and product.",
      "If you run a local business and you've been waiting for the 'right time,' this is it. Start narrow: pick your single most common customer question and automate a great answer to it. Expand from there. The businesses that adopt now will feel responsive and modern; the ones that wait will spend 2026 catching up.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Format an ISO date (YYYY-MM-DD) as e.g. "June 1, 2025". */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
