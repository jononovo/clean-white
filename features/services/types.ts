import { Wrench, Database, Users, GraduationCap, Handshake, Receipt, LucideIcon } from "lucide-react";

export interface ServiceProvider {
  name: string;
  url: string;
  rating: number;
  popularity: number;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  providers?: ServiceProvider[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "setup_installation",
    label: "Setup & Install",
    icon: Wrench,
    providers: [
      { name: "SimpleClaw", url: "https://simpleclaw.com", rating: 4.8, popularity: 9 },
      { name: "SetupClaw", url: "https://setupclaw.com", rating: 4.7, popularity: 8 },
      { name: "TribeClaw", url: "https://tribeclaw.com", rating: 4.6, popularity: 7 },
    ],
  },
  {
    id: "managed_hosting",
    label: "Managed Hosting",
    icon: Database,
    providers: [
      { name: "BoostedHost", url: "https://boostedhost.com/openclaw-vps-hosting/", rating: 4.9, popularity: 9 },
      { name: "DigitalOcean", url: "https://digitalocean.com", rating: 4.7, popularity: 9 },
      { name: "Vultr", url: "https://vultr.com", rating: 4.4, popularity: 7 },
      { name: "Linode", url: "https://linode.com", rating: 4.3, popularity: 7 },
    ],
  },
  {
    id: "consulting",
    label: "Consulting",
    icon: Users,
    providers: [
      { name: "VoltAgent", url: "https://voltagent.dev", rating: 4.7, popularity: 7 },
      { name: "Clawd.bot", url: "https://clawd.bot", rating: 4.8, popularity: 8 },
      { name: "Seahawk Media", url: "https://seahawkmedia.com", rating: 4.3, popularity: 6 },
    ],
  },
  {
    id: "training",
    label: "Training",
    icon: GraduationCap,
    providers: [
      { name: "OpenClaw Docs", url: "https://docs.openclaw.ai", rating: 4.8, popularity: 10 },
      { name: "BoostedHost Guide", url: "https://boostedhost.com/blog/en/how-to-install-openclaw-get-started-guide/", rating: 4.6, popularity: 8 },
      { name: "Awesome Skills", url: "https://github.com/VoltAgent/awesome-openclaw-skills", rating: 4.7, popularity: 9 },
    ],
  },
  {
    id: "partnerships",
    label: "Partnerships",
    icon: Handshake,
    providers: [
      { name: "SendClaw", url: "https://sendclaw.com", rating: 4.7, popularity: 8 },
      { name: "CreditClaw", url: "https://creditclaw.com", rating: 4.6, popularity: 7 },
      { name: "VoltAgent", url: "https://github.com/VoltAgent/voltagent", rating: 4.5, popularity: 7 },
    ],
  },
  {
    id: "finance_tax",
    label: "Finance & Tax",
    icon: Receipt,
    providers: [
      { name: "Chargebee", url: "https://www.chargebee.com", rating: 4.6, popularity: 8 },
      { name: "Stripe", url: "https://stripe.com", rating: 4.9, popularity: 10 },
      { name: "Square", url: "https://squareup.com", rating: 4.5, popularity: 8 },
    ],
  },
];
