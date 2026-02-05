import { Shield, CheckCircle, AlertTriangle, Box, Cloud, Terminal, Users, Search, Filter, Lock } from "lucide-react";

export type Badge = {
  label: string;
  type: "success" | "warning" | "neutral" | "error";
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

export const listings: Listing[] = [
  {
    id: "1",
    name: "skill-guard-pro",
    description: "Advanced heuristic analysis for incoming Claw prompts. Prevents injection attacks.",
    category: "skill",
    subcategory: "Security",
    version: "2.1.0",
    author: "OpenClaw Security Team",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "12.5k",
    updated: "2h ago",
    badges: [
      { label: "Official", type: "success", icon: Shield },
      { label: "Audited", type: "success", icon: Lock },
    ],
  },
  {
    id: "2",
    name: "notion-sync-secure",
    description: "Two-way sync with Notion databases. Enforces strict OAuth scopes and encryption at rest.",
    category: "skill",
    subcategory: "Productivity",
    version: "1.0.4",
    author: "ProductiveLobster",
    auditLevel: "silver",
    malwareScan: "clean",
    downloads: "8.2k",
    updated: "1d ago",
    badges: [
      { label: "SOC2 Compliant", type: "success", icon: CheckCircle },
    ],
  },
  {
    id: "3",
    name: "claw-cloud-eu",
    description: "Fully managed OpenClaw hosting in Frankfurt. GDPR compliant infrastructure.",
    category: "service",
    subcategory: "Hosted Agents",
    version: "SaaS",
    author: "EuroClaw",
    auditLevel: "gold",
    malwareScan: "clean",
    region: "EU-West",
    downloads: "500+",
    updated: "Live",
    badges: [
      { label: "GDPR Ready", type: "success", icon: Shield },
      { label: "ISO 27001", type: "success", icon: Lock },
    ],
  },
  {
    id: "4",
    name: "polymarket-trader",
    description: "Automated trading bot for Polymarket. USE AT OWN RISK. Financial implementation.",
    category: "skill",
    subcategory: "Finance",
    version: "0.9.1-beta",
    author: "CryptoCrab",
    auditLevel: "none",
    malwareScan: "clean",
    downloads: "45k",
    updated: "5m ago",
    badges: [
      { label: "High Risk", type: "warning", icon: AlertTriangle },
    ],
  },
  {
    id: "5",
    name: "python-sdk-core",
    description: "Official Python SDK for building OpenClaw skills.",
    category: "sdk",
    subcategory: "Core SDKs",
    version: "3.8.2",
    author: "OpenClaw Foundation",
    auditLevel: "gold",
    malwareScan: "clean",
    downloads: "890k",
    updated: "1w ago",
    badges: [
      { label: "Core", type: "neutral" },
      { label: "Verified", type: "success", icon: CheckCircle },
    ],
  },
];
