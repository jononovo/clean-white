import { db } from "../server/db";
import { providers, services, featuredItems } from "../shared/schema";

async function seed() {
  console.log("Seeding homepage data...");

  const providerData: Record<string, any> = {};

  const providerRows = [
    { handle: "simpleclaw", displayName: "SimpleClaw", website: "https://simpleclaw.com", tagline: "Simple OpenClaw setup & management", rating: 48 },
    { handle: "setupclaw", displayName: "SetupClaw", website: "https://setupclaw.com", tagline: "Professional installation services", rating: 47 },
    { handle: "tribeclaw", displayName: "TribeClaw", website: "https://tribeclaw.com", tagline: "Community-powered setup", rating: 46 },
    { handle: "boostedhost", displayName: "BoostedHost", website: "https://boostedhost.com", tagline: "Turnkey pre-installed OpenClaw VPS", rating: 49, isPartner: true, partnerRole: "VPS Infrastructure Partner", isVerified: true },
    { handle: "digitalocean", displayName: "DigitalOcean", website: "https://digitalocean.com", tagline: "Official 1-Click Deploy", rating: 47, isPartner: true, partnerRole: "Cloud Platform Partner", isVerified: true },
    { handle: "vultr", displayName: "Vultr", website: "https://vultr.com", tagline: "DIY flexibility, great pricing", rating: 44 },
    { handle: "linode", displayName: "Linode", website: "https://linode.com", tagline: "Best raw performance", rating: 43 },
    { handle: "hostinger", displayName: "Hostinger", website: "https://hostinger.com", tagline: "Best budget option", rating: 45 },
    { handle: "voltagent", displayName: "VoltAgent", website: "https://voltagent.dev", tagline: "Agent framework & consulting", rating: 47 },
    { handle: "clawdbot", displayName: "Clawd.bot", website: "https://clawd.bot", tagline: "Managed automation services", rating: 48 },
    { handle: "seahawkmedia", displayName: "Seahawk Media", website: "https://seahawkmedia.com", tagline: "Digital consulting", rating: 43 },
    { handle: "openclaw-docs", displayName: "OpenClaw Docs", website: "https://docs.openclaw.ai", tagline: "Official documentation & training", rating: 48 },
    { handle: "sendclaw", displayName: "SendClaw", website: "https://sendclaw.com", tagline: "Email & messaging for agents", rating: 47 },
    { handle: "creditclaw", displayName: "CreditClaw", website: "https://creditclaw.com", tagline: "Finance tools for agent businesses", rating: 46 },
    { handle: "chargebee", displayName: "Chargebee", website: "https://www.chargebee.com", tagline: "Subscription billing", rating: 46 },
    { handle: "stripe", displayName: "Stripe", website: "https://stripe.com", tagline: "Payment infrastructure", rating: 49 },
    { handle: "square", displayName: "Square", website: "https://squareup.com", tagline: "Payment processing", rating: 45 },
    { handle: "xcloud", displayName: "xCloud", website: "https://xcloud.host", tagline: "One-click managed OpenClaw hosting", rating: 48, isPartner: true, partnerRole: "Managed Hosting Partner", isVerified: true },
  ];

  for (const prov of providerRows) {
    const result = await db.insert(providers).values({
      handle: prov.handle,
      displayName: prov.displayName,
      website: prov.website,
      tagline: prov.tagline,
      rating: prov.rating,
      isPartner: prov.isPartner || false,
      partnerRole: prov.partnerRole || null,
      isVerified: prov.isVerified || false,
    }).returning();
    providerData[prov.handle] = result[0];
    console.log(`  Provider: ${prov.displayName} (${result[0].id})`);
  }

  const serviceRows = [
    { providerHandle: "simpleclaw", name: "SimpleClaw Setup", description: "Full OpenClaw installation and configuration", category: "setup_installation", slug: "simpleclaw-setup", url: "https://simpleclaw.com", pricingType: "contact", rating: 48, popularity: 9 },
    { providerHandle: "setupclaw", name: "SetupClaw Installation", description: "Professional OpenClaw deployment", category: "setup_installation", slug: "setupclaw-install", url: "https://setupclaw.com", pricingType: "contact", rating: 47, popularity: 8 },
    { providerHandle: "tribeclaw", name: "TribeClaw Setup", description: "Community-backed installation service", category: "setup_installation", slug: "tribeclaw-setup", url: "https://tribeclaw.com", pricingType: "contact", rating: 46, popularity: 7 },

    { providerHandle: "boostedhost", name: "BoostedHost VPS", description: "Turnkey pre-installed OpenClaw VPS. Zero-friction deployment with optimized configs.", category: "managed_hosting", slug: "boostedhost-vps", url: "https://boostedhost.com/openclaw-vps-hosting/", pricingType: "monthly", pricingLabel: "Custom", rating: 49, popularity: 9 },
    { providerHandle: "digitalocean", name: "DigitalOcean Droplet", description: "Official 1-Click Deploy for OpenClaw", category: "managed_hosting", slug: "digitalocean-droplet", url: "https://digitalocean.com", pricingType: "monthly", pricingLabel: "From $6/mo", priceMin: 6, rating: 47, popularity: 9 },
    { providerHandle: "vultr", name: "Vultr Cloud Compute", description: "DIY flexibility, great pricing", category: "managed_hosting", slug: "vultr-cloud", url: "https://vultr.com", pricingType: "monthly", pricingLabel: "From $6/mo", priceMin: 6, rating: 44, popularity: 7 },
    { providerHandle: "linode", name: "Linode VPS", description: "Best raw performance", category: "managed_hosting", slug: "linode-vps", url: "https://linode.com", pricingType: "monthly", pricingLabel: "From $5/mo", priceMin: 5, rating: 43, popularity: 7 },
    { providerHandle: "hostinger", name: "Hostinger VPS", description: "Best budget option", category: "managed_hosting", slug: "hostinger-vps", url: "https://hostinger.com", pricingType: "monthly", pricingLabel: "From $5/mo", priceMin: 5, rating: 45, popularity: 8 },
    { providerHandle: "xcloud", name: "xCloud Managed Hosting", description: "One-click managed OpenClaw hosting with 24/7 support. Founded by M Asif Rahman.", category: "managed_hosting", slug: "xcloud-hosting", url: "https://xcloud.host/openclaw-hosting", pricingType: "monthly", pricingLabel: "Custom", rating: 48, popularity: 8 },

    { providerHandle: "voltagent", name: "VoltAgent Consulting", description: "Agent framework consulting and architecture", category: "consulting", slug: "voltagent-consulting", url: "https://voltagent.dev", pricingType: "contact", rating: 47, popularity: 7 },
    { providerHandle: "clawdbot", name: "Clawd.bot Managed Service", description: "Full managed automation service for businesses", category: "consulting", slug: "clawdbot-managed", url: "https://clawd.bot", pricingType: "contact", rating: 48, popularity: 8 },
    { providerHandle: "seahawkmedia", name: "Seahawk Media Consulting", description: "Digital consulting and OpenClaw integration", category: "consulting", slug: "seahawk-consulting", url: "https://seahawkmedia.com", pricingType: "contact", rating: 43, popularity: 6 },

    { providerHandle: "openclaw-docs", name: "OpenClaw Official Docs", description: "Comprehensive official documentation and tutorials", category: "training", slug: "openclaw-docs", url: "https://docs.openclaw.ai", pricingType: "contact", pricingLabel: "Free", rating: 48, popularity: 10 },
    { providerHandle: "boostedhost", name: "BoostedHost Install Guide", description: "Step-by-step VPS installation guide", category: "training", slug: "boostedhost-guide", url: "https://boostedhost.com/blog/en/how-to-install-openclaw-get-started-guide/", pricingType: "contact", pricingLabel: "Free", rating: 46, popularity: 8 },
    { providerHandle: "voltagent", name: "Awesome OpenClaw Skills", description: "Curated list of community skills and resources", category: "training", slug: "awesome-skills", url: "https://github.com/VoltAgent/awesome-openclaw-skills", pricingType: "contact", pricingLabel: "Free", rating: 47, popularity: 9 },

    { providerHandle: "sendclaw", name: "SendClaw Partnership", description: "Email & messaging integration for agents", category: "partnerships", slug: "sendclaw-partnership", url: "https://sendclaw.com", pricingType: "contact", rating: 47, popularity: 8 },
    { providerHandle: "creditclaw", name: "CreditClaw Partnership", description: "Finance tools for agent-driven businesses", category: "partnerships", slug: "creditclaw-partnership", url: "https://creditclaw.com", pricingType: "contact", rating: 46, popularity: 7 },
    { providerHandle: "voltagent", name: "VoltAgent Open Source", description: "Open-source agent framework", category: "partnerships", slug: "voltagent-oss", url: "https://github.com/VoltAgent/voltagent", pricingType: "contact", pricingLabel: "Free", rating: 45, popularity: 7 },

    { providerHandle: "chargebee", name: "Chargebee Billing", description: "Subscription billing platform", category: "finance_tax", slug: "chargebee-billing", url: "https://www.chargebee.com", pricingType: "contact", rating: 46, popularity: 8 },
    { providerHandle: "stripe", name: "Stripe Payments", description: "Payment infrastructure for the internet", category: "finance_tax", slug: "stripe-payments", url: "https://stripe.com", pricingType: "contact", rating: 49, popularity: 10 },
    { providerHandle: "square", name: "Square Payments", description: "Payment processing and business tools", category: "finance_tax", slug: "square-payments", url: "https://squareup.com", pricingType: "contact", rating: 45, popularity: 8 },
  ];

  for (const svc of serviceRows) {
    const provider = providerData[svc.providerHandle];
    if (!provider) {
      console.error(`  Missing provider: ${svc.providerHandle}`);
      continue;
    }
    await db.insert(services).values({
      providerId: provider.id,
      name: svc.name,
      description: svc.description,
      category: svc.category,
      slug: svc.slug,
      url: svc.url,
      pricingType: svc.pricingType,
      pricingLabel: svc.pricingLabel || null,
      priceMin: svc.priceMin || null,
      rating: svc.rating,
      popularity: svc.popularity,
    });
    console.log(`  Service: ${svc.name}`);
  }

  const featuredRows = [
    { type: "hero", name: "joshp123", description: "Shipped SSRF DNS pinning and system prompt safety guardrails — hardening OpenClaw against injection attacks and request forgery.", imageUrl: "/images/featured/hero-joshp123.png", href: "https://github.com/joshp123", sourceUrl: "https://github.com/joshp123", isVerified: true, sortOrder: 1 },
    { type: "app", name: "Excalidraw Agent", description: "Say 'draw this flow' and get instant diagrams. Natural language to visual flowcharts, architecture maps, and wireframes.", imageUrl: "/images/featured/app-excalidraw-agent.png", href: "https://github.com/swiftlysingh", sourceUrl: "https://github.com/swiftlysingh", subtitle: "by swiftlysingh", author: "swiftlysingh", isVerified: true, sortOrder: 2 },
    { type: "skill", name: "Browser Automation", description: "Playwright-based browser control for web scraping, form filling, and automated navigation. One of the most popular skills.", imageUrl: "/images/featured/skill-browser-automation.png", href: "/@steipete/browser-automation", author: "steipete", isVerified: true, sortOrder: 3 },
    { type: "service", name: "xCloud Managed Hosting", description: "One-click managed OpenClaw hosting. Live in under 5 minutes with 24/7 support.", imageUrl: "/images/featured/service-xcloud.png", href: "https://xcloud.host/openclaw-hosting", sourceUrl: "https://xcloud.host", isVerified: true, sortOrder: 4 },
  ];

  for (const item of featuredRows) {
    await db.insert(featuredItems).values(item);
    console.log(`  Featured: ${item.name}`);
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
