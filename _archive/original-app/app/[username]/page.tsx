"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BadgeCheck,
  Github,
  Globe,
  MapPin,
  Mail,
  ExternalLink,
  Star,
  Download,
  Package,
  Users,
  Calendar,
  ShieldCheck,
} from "lucide-react";

const FEATURED_PROVIDERS: Record<string, {
  handle: string;
  displayName: string;
  description: string;
  avatarUrl: string;
  location: string;
  website: string;
  github: string;
  isVerified: boolean;
  joinedDate: string;
  stats: { skills: number; downloads: number; stars: number };
  skills: Array<{ slug: string; name: string; description: string; downloads: number; stars: number }>;
  bio: string;
}> = {
  steipete: {
    handle: "steipete",
    displayName: "Peter Steinberger",
    description: "Creator of OpenClaw. Austrian developer who sold PSPDFKit for ~$100M. Building the future of autonomous AI agents.",
    avatarUrl: "https://avatars.githubusercontent.com/u/58493",
    location: "Vienna, Austria",
    website: "https://steipete.com",
    github: "https://github.com/steipete",
    isVerified: true,
    joinedDate: "November 2025",
    stats: { skills: 12, downloads: 890000, stars: 145000 },
    skills: [
      { slug: "browser-automation", name: "Browser Automation", description: "Playwright-based browser control for web scraping and automation", downloads: 125000, stars: 4200 },
      { slug: "email-digest", name: "Email Digest", description: "Daily inbox summarization and smart filtering", downloads: 89000, stars: 2100 },
      { slug: "calendar-sync", name: "Calendar Sync", description: "Intelligent calendar management across platforms", downloads: 67000, stars: 1800 },
    ],
    bio: "Peter Steinberger is an Austrian software developer and entrepreneur. He founded PSPDFKit, a PDF SDK company that was acquired for approximately $100 million. In November 2025, he launched OpenClaw (originally Clawdbot), an open-source AI agent that can control your computer via messaging apps like WhatsApp, Telegram, and Discord. OpenClaw quickly became one of the fastest-growing open-source projects, reaching 145,000+ GitHub stars and spawning a thriving ecosystem of 3,000+ community-built skills on ClawHub.",
  },
};

export default function ProviderProfilePage() {
  const params = useParams();
  const handle = (params.username as string)?.replace("@", "");
  const provider = FEATURED_PROVIDERS[handle];

  if (!provider) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Users className="w-12 h-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Provider not found</h1>
          <p className="text-muted-foreground">The provider you're looking for doesn't exist yet.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
          <CardContent className="p-6 -mt-16">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={provider.avatarUrl}
                  alt={provider.displayName}
                  className="w-32 h-32 rounded-2xl border-4 border-background shadow-xl"
                  data-testid="provider-avatar"
                />
              </div>
              <div className="flex-1 space-y-4 pt-8 md:pt-0">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold" data-testid="provider-name">
                        {provider.displayName}
                      </h1>
                      {provider.isVerified && (
                        <BadgeCheck className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <p className="text-muted-foreground" data-testid="provider-handle">
                      @{provider.handle}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <a href={provider.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <a href={provider.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4" />
                        Website
                      </a>
                    </Button>
                  </div>
                </div>

                <p className="text-foreground/80" data-testid="provider-description">
                  {provider.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {provider.joinedDate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {provider.isVerified && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Provider
                    </Badge>
                  )}
                  <Badge variant="secondary" className="gap-1">
                    <Package className="w-3 h-3" />
                    {provider.stats.skills} Skills
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{provider.stats.stars.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Stars</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center">
              <Download className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{provider.stats.downloads.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{provider.stats.skills}</div>
              <div className="text-sm text-muted-foreground">Published Skills</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card/50">
          <CardHeader className="border-b border-border/50">
            <h2 className="text-lg font-semibold">About</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-foreground/80 leading-relaxed">{provider.bio}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader className="border-b border-border/50">
            <h2 className="text-lg font-semibold">Published Skills</h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {provider.skills.map((skill) => (
                <Link
                  key={skill.slug}
                  href={`/@${provider.handle}/${skill.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group"
                  data-testid={`skill-${skill.slug}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{skill.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground ml-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {skill.stars.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {skill.downloads.toLocaleString()}
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
