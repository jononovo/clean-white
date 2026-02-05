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
    name: "crypto-wallet-tracker",
    description: "Tracks SOL/ETH balances.",
    category: "skill",
    subcategory: "Finance",
    version: "0.9.0",
    author: "DeFi_Dave",
    auditLevel: "none",
    malwareScan: "pending",
    downloads: "12",
    updated: "10m ago",
    badges: [{ label: "New", type: "neutral" }],
  },
  {
    id: "ls-2",
    name: "obsidian-sync-v2",
    description: "Syncs markdown notes.",
    category: "skill",
    subcategory: "Productivity",
    version: "2.0.0",
    author: "NoteMaster",
    auditLevel: "bronze",
    malwareScan: "clean",
    downloads: "105",
    updated: "45m ago",
    badges: [],
  },
  {
    id: "ls-3",
    name: "weather-agent-eu",
    description: "GDPR compliant weather.",
    category: "service",
    subcategory: "Utility",
    version: "1.1.0",
    author: "WeatherCorp",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "890",
    updated: "1h ago",
    badges: [{ label: "EU Hosted", type: "info", icon: Globe }],
  },
  {
    id: "ls-4",
    name: "gmail-summarizer-secure",
    description: "Local-only processing.",
    category: "skill",
    subcategory: "Productivity",
    version: "1.0.2",
    author: "PrivTech",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "2.3k",
    updated: "2h ago",
    badges: [{ label: "Local", type: "success", icon: Server }],
  },
  {
    id: "ls-5",
    name: "slack-bridge-ent",
    description: "Enterprise Slack bridge.",
    category: "partner",
    subcategory: "Communication",
    version: "4.5.0",
    author: "BridgeSys",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "50k",
    updated: "3h ago",
    badges: [{ label: "Verified", type: "success", icon: CheckCircle }],
  }
];

export const threats: Listing[] = [
  {
    id: "th-1",
    name: "fake-calendar-pro",
    description: "Malicious skill exfiltrating contacts.",
    category: "skill",
    subcategory: "Malware",
    version: "1.0.0",
    author: "Unknown",
    auditLevel: "none",
    malwareScan: "infected",
    downloads: "N/A",
    updated: "Detected 2h ago",
    threatLevel: "critical",
    badges: [{ label: "BANNED", type: "error", icon: AlertTriangle }],
  },
  {
    id: "th-2",
    name: "easy-crypto-bot",
    description: "Contains backdoor in dependency.",
    category: "skill",
    subcategory: "Malware",
    version: "0.5.0",
    author: "BadActor1",
    auditLevel: "none",
    malwareScan: "infected",
    downloads: "N/A",
    updated: "Detected 5h ago",
    threatLevel: "high",
    badges: [{ label: "FLAGGED", type: "error", icon: AlertTriangle }],
  },
  {
    id: "th-3",
    name: "helper-utils-v2",
    description: "Suspicious network activity detected.",
    category: "sdk",
    subcategory: "Suspicious",
    version: "2.1.0",
    author: "AnonDev",
    auditLevel: "none",
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
