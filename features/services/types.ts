import { Wrench, Database, Users, GraduationCap, Handshake, Receipt, LucideIcon, Cloud, Bot, MessageSquare, Code } from "lucide-react";

export interface ServiceProvider {
  name: string;
  url: string;
  handle?: string;
  slug?: string;
  rating: number;
  popularity: number;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  categorySlug?: string;
  providers?: ServiceProvider[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "self-hosted-automation",
    label: "Setup & Install",
    icon: Wrench,
    categorySlug: "self-hosted-automation",
    providers: [
      { name: "SimpleClaw", url: "https://simpleclaw.com", rating: 4.8, popularity: 9 },
      { name: "SetupClaw", url: "https://setupclaw.com", rating: 4.7, popularity: 8 },
      { name: "TribeClaw", url: "https://tribeclaw.com", rating: 4.6, popularity: 7 },
    ],
  },
  {
    id: "devops-cloud",
    label: "DevOps & Cloud",
    icon: Cloud,
    categorySlug: "devops-cloud",
    providers: [
      { name: "BoostedHost", url: "https://boostedhost.com/openclaw-vps-hosting/", rating: 4.9, popularity: 9 },
      { name: "DigitalOcean", url: "https://digitalocean.com", rating: 4.7, popularity: 9 },
      { name: "Vultr", url: "https://vultr.com", rating: 4.4, popularity: 7 },
      { name: "Linode", url: "https://linode.com", rating: 4.3, popularity: 7 },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: Receipt,
    categorySlug: "finance",
    providers: [
      { name: "Bankr", url: "https://bankr.dev", rating: 4.6, popularity: 8 },
      { name: "CreditClaw", url: "https://creditclaw.com", rating: 4.5, popularity: 7 },
      { name: "Proxy", url: "https://useproxy.com", rating: 4.4, popularity: 7 },
    ],
  },
  {
    id: "education-learning",
    label: "Education & Learning",
    icon: GraduationCap,
    categorySlug: "education-learning",
    providers: [
      { name: "OpenClaw Docs", url: "https://docs.openclaw.ai", rating: 4.8, popularity: 10 },
      { name: "BoostedHost Guide", url: "https://boostedhost.com/blog/en/how-to-install-openclaw-get-started-guide/", rating: 4.6, popularity: 8 },
      { name: "Awesome Skills", url: "https://github.com/VoltAgent/awesome-openclaw-skills", rating: 4.7, popularity: 9 },
    ],
  },
  {
    id: "coding-agents-ides",
    label: "Coding Agents",
    icon: Code,
    categorySlug: "coding-agents-ides",
    providers: [
      { name: "VoltAgent", url: "https://github.com/VoltAgent/voltagent", rating: 4.7, popularity: 7 },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icon: MessageSquare,
    categorySlug: "communication",
    providers: [
      { name: "SendClaw", url: "https://sendclaw.com", rating: 4.7, popularity: 8 },
    ],
  },
];
