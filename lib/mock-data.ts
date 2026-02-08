import { Shield, CheckCircle, AlertTriangle, Box, Cloud, Terminal, Users, Search, Filter, Lock, Zap, Server, Globe, Activity } from "lucide-react";

export type Badge = {
  label: string;
  type: "success" | "warning" | "neutral" | "error" | "info";
  icon?: any;
};

export type Listing = {
  id: string;
  name: string;
  description: string;
  category: "skill" | "service" | "sdk" | "partner";
  subcategory: string;
  version: string;
  author: string;
  auditLevel: "gold" | "silver" | "bronze" | "none";
  malwareScan: "clean" | "pending" | "infected";
  region?: string;
  badges: Badge[];
  downloads: string;
  updated: string;
  rating?: number; // 1-5
  threatLevel?: "low" | "medium" | "high" | "critical";
  url?: string;
};

export const categories = [
  {
    title: "Secure Skills",
    icon: Box,
    items: ["Productivity", "Development", "Finance", "Security", "Media"],
  },
  {
    title: "Services",
    icon: Cloud,
    items: ["Hosted Agents", "Managed Infrastructure", "Consulting"],
  },
  {
    title: "SDKs & Tools",
    icon: Terminal,
    items: ["Core SDKs", "Testing Tools", "Security Scanners"],
  },
  {
    title: "Partners",
    icon: Users,
    items: ["Verified Agencies", "Enterprise Support"],
  },
];

export type ThreatAlert = {
  id: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  label: string;
  title: string;
  detail: string;
  source: string;
  date: string;
  cvss: string | null;
  link: string;
  color: string;
  bgColor: string;
  borderColor: string;
};

export const THREAT_ALERTS: ThreatAlert[] = [
  {
    id: "cve-2026-25253",
    severity: "CRITICAL",
    label: "CVE-2026-25253",
    title: "1-Click RCE via WebSocket token hijack in OpenClaw Gateway",
    detail: "Cross-site WebSocket hijacking allows full gateway compromise. Visiting a malicious page exfiltrates auth tokens.",
    source: "DepthFirst / The Hacker News",
    date: "Feb 3, 2026",
    cvss: "8.8",
    link: "https://thehackernews.com",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20"
  },
  {
    id: "clawhavoc-341",
    severity: "HIGH",
    label: "ClawHavoc",
    title: "341 malicious skills discovered on ClawHub stealing credentials",
    detail: "Koi Security audit found 335 skills deploying Atomic Stealer (AMOS) malware via fake prerequisites.",
    source: "Koi Security",
    date: "Feb 4, 2026",
    cvss: null,
    link: "https://thehackernews.com",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
  {
    id: "supply-chain-400",
    severity: "HIGH",
    label: "Supply Chain",
    title: "400+ malware packages targeting OpenClaw crypto traders",
    detail: "Coordinated campaign published 386 malicious skills disguised as crypto trading tools sharing C2 infrastructure.",
    source: "OpenSourceMalware",
    date: "Feb 2, 2026",
    cvss: null,
    link: "#",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
  {
    id: "cisco-elon-skill",
    severity: "CRITICAL",
    label: "Skill Exploit",
    title: '"What Would Elon Do?" skill contained 9 vulnerabilities',
    detail: "Cisco AI Defense found the #1-ranked skill was malware: silent data exfiltration + prompt injection.",
    source: "Cisco AI Threat Research",
    date: "Jan 30, 2026",
    cvss: null,
    link: "#",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20"
  },
  {
    id: "cve-2026-21636",
    severity: "HIGH",
    label: "CVE-2026-21636",
    title: "Permission model bypass vulnerability in Node.js runtime",
    detail: "Security patch required: Node.js 22.12.0+ needed to prevent permission model bypass.",
    source: "OpenClaw Security Advisory",
    date: "Jan 2026",
    cvss: null,
    link: "#",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  }
];

export const topScorers: Listing[] = [
  {
    id: "ts-1",
    name: "skill-guard-pro",
    description: "Heuristic prompt analysis.",
    category: "skill",
    subcategory: "Security",
    version: "2.1.0",
    author: "OpenClaw Sec",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "12.5k",
    updated: "2h ago",
    badges: [{ label: "Official", type: "success", icon: Shield }],
    rating: 4.9
  },
  {
    id: "ts-2",
    name: "claw-net-auditor",
    description: "Network traffic inspector.",
    category: "sdk",
    subcategory: "Security",
    version: "1.0.4",
    author: "NetSec Inc",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "8.2k",
    updated: "1d ago",
    badges: [{ label: "Audited", type: "success", icon: Lock }],
    rating: 4.8
  },
  {
    id: "ts-3",
    name: "secure-mem-store",
    description: "Encrypted memory storage.",
    category: "skill",
    subcategory: "Core",
    version: "3.2.1",
    author: "CoreTeam",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "50k",
    updated: "5h ago",
    badges: [{ label: "Encryption", type: "info", icon: Lock }],
    rating: 4.8
  }
];

export const latestSubmissions: Listing[] = [
  {
    id: "ls-1",
    name: "Microsoft Excel",
    description: "Read and write Excel workbooks, worksheets, ranges, tables, and charts stored in OneDrive.",
    category: "skill",
    subcategory: "Productivity",
    version: "2.0.0",
    author: "byungkyu",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "394",
    updated: "1d ago",
    badges: [{ label: "OAuth", type: "info" }],
    url: "https://clawhub.ai/byungkyu/microsoft-excel",
  },
  {
    id: "ls-2",
    name: "Todoist",
    description: "Manage tasks, projects, sections, labels, and comments. Full CRUD for task management.",
    category: "skill",
    subcategory: "Task Mgmt",
    version: "1.0.0",
    author: "byungkyu",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "388",
    updated: "2d ago",
    badges: [{ label: "OAuth", type: "info" }],
    url: "https://clawhub.ai/byungkyu/todoist-api",
  },
  {
    id: "ls-3",
    name: "Kit (ConvertKit)",
    description: "Manage email subscribers, forms, tags, sequences, broadcasts, and custom fields.",
    category: "skill",
    subcategory: "Email Mktg",
    version: "1.0.0",
    author: "byungkyu",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "350",
    updated: "3d ago",
    badges: [{ label: "OAuth", type: "info" }],
    url: "https://clawhub.ai/byungkyu/kit",
  },
  {
    id: "ls-4",
    name: "Data Analyst",
    description: "Data visualization, report generation, SQL queries, and spreadsheet automation.",
    category: "skill",
    subcategory: "Analytics",
    version: "1.0.0",
    author: "oyi77",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "165",
    updated: "5d ago",
    badges: [{ label: "Verified", type: "success", icon: CheckCircle }],
    url: "https://clawhub.ai/oyi77/data-analyst",
  },
  {
    id: "ls-5",
    name: "LinkedIn",
    description: "Share posts, manage profile, run ads, and access LinkedIn platform features.",
    category: "skill",
    subcategory: "Marketing",
    version: "1.0.0",
    author: "byungkyu",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "113",
    updated: "1w ago",
    badges: [{ label: "OAuth", type: "info" }],
    url: "https://clawhub.ai/byungkyu/linkedin-api",
  },
  {
    id: "ls-6",
    name: "Square",
    description: "Process payments, manage customers, orders, catalog, inventory, and invoices.",
    category: "skill",
    subcategory: "Payments",
    version: "1.0.0",
    author: "byungkyu",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "113",
    updated: "1w ago",
    badges: [{ label: "OAuth", type: "info" }],
    url: "https://clawhub.ai/byungkyu/squareup",
  },
  {
    id: "ls-7",
    name: "Constant Contact",
    description: "Manage contacts, email campaigns, lists, segments, and marketing automation.",
    category: "skill",
    subcategory: "Email Mktg",
    version: "2.0.0",
    author: "byungkyu",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "113",
    updated: "1w ago",
    badges: [{ label: "OAuth", type: "info" }],
    url: "https://clawhub.ai/byungkyu/constant-contact",
  },
  {
    id: "ls-8",
    name: "Calendly",
    description: "Access event types, scheduled events, invitees, availability, and manage webhooks.",
    category: "skill",
    subcategory: "Scheduling",
    version: "1.0.0",
    author: "byungkyu",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "110",
    updated: "1w ago",
    badges: [{ label: "OAuth", type: "info" }],
    url: "https://clawhub.ai/byungkyu/calendly",
  },
  {
    id: "ls-9",
    name: "PowerPoint Creator",
    description: "Create professional presentations from outlines, data, or AI-generated content.",
    category: "skill",
    subcategory: "Productivity",
    version: "1.0.0",
    author: "thiagoruss0",
    auditLevel: "bronze",
    malwareScan: "clean",
    downloads: "111",
    updated: "2w ago",
    badges: [],
    url: "https://clawhub.ai/thiagoruss0/pptx-creatord",
  },
  {
    id: "ls-10",
    name: "Clawpify (Shopify)",
    description: "Query and manage Shopify stores via GraphQL — products, orders, customers, inventory.",
    category: "skill",
    subcategory: "E-commerce",
    version: "1.0.0",
    author: "Alhwyn",
    auditLevel: "bronze",
    malwareScan: "clean",
    downloads: "31",
    updated: "2w ago",
    badges: [],
    url: "https://clawhub.ai/Alhwyn/clawpify",
  },
];

export const communitySubmissions: Listing[] = [
  {
    id: "cs-1",
    name: "invoice-automate",
    description: "Auto-generates and sends invoices from your CRM data.",
    category: "skill",
    subcategory: "Finance",
    version: "1.2.0",
    author: "SimpleClaw",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "1,200+",
    updated: "Submitted 3h ago",
    badges: [{ label: "NEW", type: "info", icon: AlertTriangle }],
  },
  {
    id: "cs-2",
    name: "lead-scraper-lite",
    description: "Collects public business leads from directories.",
    category: "skill",
    subcategory: "Marketing",
    version: "0.9.0",
    author: "TribeClaw",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "840+",
    updated: "Submitted 6h ago",
    badges: [{ label: "POPULAR", type: "info", icon: AlertTriangle }],
  },
  {
    id: "cs-3",
    name: "calendar-sync-pro",
    description: "Syncs multiple calendar providers into one view.",
    category: "skill",
    subcategory: "Productivity",
    version: "2.0.1",
    author: "SetupClaw",
    auditLevel: "bronze",
    malwareScan: "pending",
    downloads: "N/A",
    updated: "Under Review",
    threatLevel: "medium",
    badges: [{ label: "UNDER REVIEW", type: "warning", icon: Activity }],
  }
];

export const infrastructureProviders: Listing[] = [
  {
    id: "inf-1",
    name: "ClawCloud EU",
    description: "Frankfurt",
    category: "service",
    subcategory: "Hosting",
    version: "Tier 1",
    author: "EuroClaw",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "99.99%",
    updated: "Up",
    rating: 5.0,
    badges: [{ label: "SOC2", type: "success" }],
  },
  {
    id: "inf-2",
    name: "SecureHost US",
    description: "Virginia",
    category: "service",
    subcategory: "Hosting",
    version: "Tier 1",
    author: "US-Safe",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "99.95%",
    updated: "Up",
    rating: 4.9,
    badges: [{ label: "HIPAA", type: "success" }],
  },
  {
    id: "inf-3",
    name: "Asia-Edge",
    description: "Singapore",
    category: "service",
    subcategory: "Hosting",
    version: "Tier 2",
    author: "EdgeNet",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "99.9%",
    updated: "Up",
    rating: 4.7,
    badges: [],
  },
  {
    id: "inf-4",
    name: "PrivBox",
    description: "Swiss",
    category: "service",
    subcategory: "Hosting",
    version: "Tier 1",
    author: "PrivCorp",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "100%",
    updated: "Up",
    rating: 4.9,
    badges: [{ label: "Privacy+", type: "info" }],
  },
  {
    id: "inf-5",
    name: "OpenMetal",
    description: "Bare Metal",
    category: "service",
    subcategory: "Hosting",
    version: "Beta",
    author: "MetalOps",
    auditLevel: "bronze",
    malwareScan: "clean",
    downloads: "99.0%",
    updated: "Maint",
    rating: 4.5,
    badges: [],
  }
];

export type Meetup = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  status: "upcoming" | "past";
  description?: string;
  link?: string;
};

export const meetups: Meetup[] = [
  {
    id: "m-1",
    title: "OpenClaw Security Summit",
    subtitle: "Enterprise Security Patterns for Autonomous Agents",
    date: "Oct 24, 2024",
    location: "San Francisco, CA & Virtual",
    status: "upcoming",
    description: "Join us for a deep dive into securing OpenClaw deployments in enterprise environments. Featuring speakers from major security firms.",
    link: "#"
  },
  {
    id: "m-2",
    title: "London Developer Meetup",
    subtitle: "Building Resilient Skills",
    date: "Nov 12, 2024",
    location: "London, UK",
    status: "upcoming",
    description: "Monthly developer gathering focusing on skill resilience and error handling patterns.",
    link: "#"
  },
  {
    id: "m-3",
    title: "Asian Pacific ClawConf",
    subtitle: "The Future of AI Agents",
    date: "Sep 15, 2024",
    location: "Singapore",
    status: "past",
    description: "Keynotes from OpenClaw founders and community showcases.",
    link: "#"
  }
];

export type CommunityListing = {
  id: string;
  title: string;
  type: "offer" | "request";
  author: string;
  date: string;
  location?: string;
  description: string;
  tags: string[];
};

export const communityListings: CommunityListing[] = [
  {
    id: "cl-1",
    title: "Looking for Senior OpenClaw Engineer",
    type: "request",
    author: "TechCorp Inc.",
    date: "2d ago",
    location: "Remote",
    description: "We are building a large scale agent swarm and need an experienced engineer to lead the security implementation.",
    tags: ["Job", "Remote", "Engineering"]
  },
  {
    id: "cl-2",
    title: "Offering Free Security Audit for Open Source Skills",
    type: "offer",
    author: "SecureClaw Team",
    date: "1d ago",
    location: "Global",
    description: "To support the ecosystem, we are offering free Level 1 security audits for any open source skill published this month.",
    tags: ["Audit", "Free", "Open Source"]
  },
  {
    id: "cl-3",
    title: "Need help with Multi-Agent Orchestration",
    type: "request",
    author: "IndieDev_99",
    date: "4h ago",
    description: "Struggling to get my agents to communicate securely. Willing to trade custom UI work for backend help.",
    tags: ["Help Wanted", "Barter"]
  }
];

export type MediaExpert = {
  id: string;
  name: string;
  role: string;
  organization: string;
  bio: string;
  expertise: string[];
  location: string;
  image?: string;
  type: "recommended" | "volunteer";
};

export const mediaExperts: MediaExpert[] = [
  {
    id: "me-1",
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    organization: "SecureClawHub",
    bio: "Former CISO at TechGiant. Pioneer in autonomous agent security frameworks. Ph.D. in AI Safety.",
    expertise: ["AI Security", "Enterprise Risk", "Agent Governance"],
    location: "San Francisco, CA",
    type: "recommended"
  },
  {
    id: "me-2",
    name: "Alex Rivera",
    role: "Creator",
    organization: "OpenClaw",
    bio: "The original architect of the OpenClaw protocol. Advocates for open, secure, and decentralized agent networks.",
    expertise: ["OpenClaw Protocol", "Decentralized Systems", "Open Source"],
    location: "Berlin, Germany",
    type: "recommended"
  },
  {
    id: "me-3",
    name: "James T. Kirk",
    role: "Head of Threat Research",
    organization: "SecureClawHub",
    bio: "Leads the team responsible for the OpenClaw Threat Index. Specialized in adversarial agent attacks.",
    expertise: ["Threat Intelligence", "Malware Analysis", "Red Teaming"],
    location: "London, UK",
    type: "recommended"
  },
  {
    id: "me-4",
    name: "Priya Patel",
    role: "VP of Engineering",
    organization: "AgentScale",
    bio: "Built the largest hosted OpenClaw infrastructure. Expert in scaling agent swarms securely.",
    expertise: ["Infrastructure", "Scalability", "Cloud Security"],
    location: "New York, NY",
    type: "recommended"
  },
  {
    id: "me-5",
    name: "Marcus Johnson",
    role: "Director of Policy",
    organization: "AI Safety Institute",
    bio: "Bridging the gap between technical reality and regulatory policy for autonomous systems.",
    expertise: ["AI Regulation", "Policy", "Ethics"],
    location: "Washington, DC",
    type: "recommended"
  },
  {
    id: "mv-1",
    name: "Davide Russo",
    role: "Senior Developer",
    organization: "Freelance",
    bio: "I build trading bots and love talking about DeFi agents.",
    expertise: ["DeFi", "Rust", "Trading"],
    location: "Milan, Italy",
    type: "volunteer"
  },
  {
    id: "mv-2",
    name: "Jenny Wu",
    role: "Student Researcher",
    organization: "MIT",
    bio: "Researching multi-agent collaboration patterns.",
    expertise: ["Academic Research", "Multi-Agent Systems"],
    location: "Boston, MA",
    type: "volunteer"
  },
  {
    id: "mv-3",
    name: "Lars Jensen",
    role: "CTO",
    organization: "NordicAI",
    bio: "Early adopter of OpenClaw for enterprise automation.",
    expertise: ["Enterprise Automation", "GDPR"],
    location: "Copenhagen, Denmark",
    type: "volunteer"
  }
];
