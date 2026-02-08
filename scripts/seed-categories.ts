import { db } from "../server/db";
import { categories } from "../shared/schema";
import { sql } from "drizzle-orm";

const categoryData = [
  { name: "Agent Services & Networks", slug: "agent-services-networks", description: "Bot social platforms, agent-to-agent communication, claw bot services", isNew: true, examples: ["MoltBook", "SendClaw", "agent messaging", "bot identity", "agent directories"] },
  { name: "Web & Frontend Development", slug: "web-frontend-development", description: "Web development tools and frontend frameworks", isNew: false, examples: ["React", "UI/UX audit", "Slack/Discord integration", "Vercel", "Remotion"] },
  { name: "Coding Agents & IDEs", slug: "coding-agents-ides", description: "Code editors and AI coding assistants", isNew: false, examples: ["Claude Code", "Codex", "Cursor", "OpenCode", "orchestration"] },
  { name: "Git & GitHub", slug: "git-github", description: "Version control and repository management", isNew: false, examples: ["PRs", "commits", "repo management", "conventional commits"] },
  { name: "DevOps & Cloud", slug: "devops-cloud", description: "Cloud infrastructure and deployment tools", isNew: false, examples: ["Kubernetes", "Docker", "Cloudflare", "Vercel", "Tailscale", "Proxmox", "Hetzner", "Fly.io"] },
  { name: "Browser & Automation", slug: "browser-automation", description: "Browser automation and web scraping", isNew: false, examples: ["Playwright", "headless browsers", "scraping", "Chrome DevTools Protocol"] },
  { name: "Image & Video Generation", slug: "image-video-generation", description: "AI image and video generation tools", isNew: false, examples: ["AI image gen", "video rendering", "Figma", "ComfyUI", "Excalidraw"] },
  { name: "Apple Apps & Services", slug: "apple-apps-services", description: "Apple ecosystem integrations", isNew: false, examples: ["Mail", "Photos", "Music", "Contacts", "Shortcuts", "Homebrew"] },
  { name: "Search & Research", slug: "search-research", description: "Web search and research tools", isNew: false, examples: ["Web search", "Brave", "Kagi", "Tavily", "academic", "news", "SEO"] },
  { name: "Clawdbot Tools", slug: "clawdbot-tools", description: "Core OpenClaw utilities and tools", isNew: false, examples: ["Core utilities", "memory", "skill management", "ClawHub CLI"] },
  { name: "CLI Utilities", slug: "cli-utilities", description: "Command-line tools and utilities", isNew: false, examples: ["Shell tools", "file ops", "jq", "tldr", "tmux", "package tracking"] },
  { name: "Marketing & Sales", slug: "marketing-sales", description: "Marketing automation and sales tools", isNew: false, examples: ["Email sequences", "social media", "analytics", "SEO audit", "copywriting"] },
  { name: "CRM & Customer Support", slug: "crm-customer-support", description: "Customer relationship management and support tools", isNew: true, examples: ["HubSpot", "Zendesk", "Intercom", "Freshdesk", "help desk", "ticketing"] },
  { name: "Productivity & Tasks", slug: "productivity-tasks", description: "Task management and productivity tools", isNew: false, examples: ["Todoist", "Linear", "Jira", "Things", "TickTick", "Asana", "Trello"] },
  { name: "AI & LLMs", slug: "ai-llms", description: "AI models and language model integrations", isNew: false, examples: ["Model routing", "multi-agent", "Gemini", "Perplexity", "OpenAI", "xAI/Grok"] },
  { name: "Finance", slug: "finance", description: "Banking, trading, and financial tools", isNew: false, examples: ["Banking", "trading", "YNAB", "budgeting", "stock analysis"] },
  { name: "Crypto & Web3", slug: "crypto-web3", description: "Blockchain, cryptocurrency, DeFi, and Web3 integrations", isNew: true, examples: ["Wallet management", "DeFi", "NFTs", "token tracking", "DEX", "Solana", "Ethereum"] },
  { name: "Media & Streaming", slug: "media-streaming", description: "Media playback and streaming services", isNew: false, examples: ["Spotify", "Plex", "Sonos", "YouTube", "podcasts", "Chromecast"] },
  { name: "Notes & PKM", slug: "notes-pkm", description: "Note-taking and personal knowledge management", isNew: false, examples: ["Obsidian", "Notion", "Apple Notes", "Bear", "Craft", "Reflect"] },
  { name: "iOS & macOS Development", slug: "ios-macos-development", description: "Apple platform development tools", isNew: false, examples: ["SwiftUI", "Xcode", "Apple docs", "Swift Concurrency", "SF Symbols"] },
  { name: "Transportation", slug: "transportation", description: "Travel and transportation tracking", isNew: false, examples: ["Flights", "EV charging", "delivery tracking", "package tracking"] },
  { name: "Personal Development", slug: "personal-development", description: "Self-improvement and habit tracking", isNew: false, examples: ["Journaling", "habits", "goals", "gratitude", "deep work"] },
  { name: "Health & Fitness", slug: "health-fitness", description: "Health monitoring and fitness tracking", isNew: false, examples: ["Wearables", "Dexcom CGM", "sleep tracking", "workouts", "nutrition"] },
  { name: "Communication", slug: "communication", description: "Email and messaging tools", isNew: false, examples: ["Email", "Gmail", "IMAP", "messaging", "SMS"] },
  { name: "Speech & Transcription", slug: "speech-transcription", description: "Text-to-speech and transcription services", isNew: false, examples: ["TTS", "STT", "ElevenLabs", "meeting transcription", "voice notes"] },
  { name: "Voice & Telephony", slug: "voice-telephony", description: "Phone calls, IVR, voicemail, and real-time voice communication", isNew: true, examples: ["Twilio", "phone calls", "IVR", "voicemail", "SIP", "VoIP", "call recording"] },
  { name: "Smart Home & IoT", slug: "smart-home-iot", description: "Home automation and IoT devices", isNew: false, examples: ["Home Assistant", "Philips Hue", "sensors", "Samsung SmartThings"] },
  { name: "Shopping & E-commerce", slug: "shopping-ecommerce", description: "Shopping and e-commerce tools", isNew: false, examples: ["Price tracking", "orders", "carts", "Amazon", "WooCommerce"] },
  { name: "Calendar & Scheduling", slug: "calendar-scheduling", description: "Calendar and appointment scheduling", isNew: false, examples: ["Apple Calendar", "Google Calendar", "CalDAV", "booking", "reminders"] },
  { name: "PDF & Documents", slug: "pdf-documents", description: "Document processing and PDF tools", isNew: false, examples: ["PDF generation", "OCR", "document processing", "summarization"] },
  { name: "Self-Hosted & Automation", slug: "self-hosted-automation", description: "Self-hosted automation tools", isNew: false, examples: ["n8n", "cron jobs", "webhooks", "Coolify", "Dokploy"] },
  { name: "Security & Passwords", slug: "security-passwords", description: "Security tools and password management", isNew: false, examples: ["Credentials", "encryption", "OpenSSL", "audit", "API key hygiene", "1Password"] },
  { name: "Gaming & Entertainment", slug: "gaming-entertainment", description: "Video games, game platforms, and entertainment integrations", isNew: true, examples: ["Steam", "Discord gaming", "game libraries", "achievements", "streaming", "Twitch"] },
  { name: "Education & Learning", slug: "education-learning", description: "Learning management, courses, and educational tools", isNew: true, examples: ["Canvas LMS", "flashcards", "language learning", "courses", "quizzes", "Anki"] },
  { name: "Legal & Compliance", slug: "legal-compliance", description: "Contracts, regulatory compliance, and legal document management", isNew: true, examples: ["Contracts", "GDPR", "audit trails", "terms of service", "e-signatures", "compliance checks"] },
  { name: "Localization & Translation", slug: "localization-translation", description: "Multi-language support and translation services", isNew: true, examples: ["Translation APIs", "i18n", "multi-language content", "regional adaptation", "DeepL", "Google Translate"] },
  { name: "Databases & Storage", slug: "databases-storage", description: "Database management, queries, and cloud storage", isNew: true, examples: ["DuckDB", "Supabase", "PostgreSQL", "SQLite", "S3", "R2", "vector databases"] },
];

async function seed() {
  console.log("Seeding categories...");
  
  for (let i = 0; i < categoryData.length; i++) {
    const cat = categoryData[i];
    try {
      await db.insert(categories).values({
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        isNew: cat.isNew,
        examples: cat.examples,
        sortOrder: i,
        skillCount: 0,
      }).onConflictDoNothing();
      console.log(`  ✓ ${cat.name}`);
    } catch (error) {
      console.log(`  ✗ ${cat.name} - already exists or error`);
    }
  }
  
  console.log("\nDone! Seeded", categoryData.length, "categories.");
  process.exit(0);
}

seed().catch(console.error);
