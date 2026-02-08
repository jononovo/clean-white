"use client";

import { useEffect, useState } from "react";
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
  Download,
  Star,
  Users,
  Shield,
  ExternalLink,
  MessageCircle,
  Terminal,
  Smartphone,
  Monitor,
  CheckCircle2,
  Zap,
  AlertTriangle,
} from "lucide-react";
import type { App } from "@/shared/schema";

export default function AppDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApp() {
      try {
        const res = await fetch(`/api/apps/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("App not found");
          } else {
            setError("Failed to load app");
          }
          return;
        }
        const data = await res.json();
        setApp(data);
      } catch {
        setError("Failed to load app");
      } finally {
        setLoading(false);
      }
    }
    fetchApp();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading app...</div>
        </div>
      </Layout>
    );
  }

  if (error || !app) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <h1 className="text-2xl font-bold">{error || "App not found"}</h1>
          <p className="text-muted-foreground">The app you're looking for doesn't exist yet.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
                  <Terminal className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-bold" data-testid="app-name">
                        {app.name}
                      </h1>
                      {app.isVerified && (
                        <BadgeCheck className="w-7 h-7 text-primary" />
                      )}
                    </div>
                    {app.tagline && (
                      <p className="text-lg text-muted-foreground mt-1" data-testid="app-tagline">
                        {app.tagline}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {app.website && (
                      <Button className="gap-2" asChild>
                        <a href={app.website} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4" />
                          Install
                        </a>
                      </Button>
                    )}
                    {app.github && (
                      <Button variant="outline" className="gap-2" asChild>
                        <a href={app.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                          Source
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">by</span>
                  <Link href={`/${app.authorHandle}`} className="text-sm font-medium text-primary hover:underline" data-testid="app-author">
                    @{app.authorHandle}
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">{app.stars.toLocaleString()}</span>
                    <span className="text-muted-foreground">stars</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>{app.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{app.users.toLocaleString()} active users</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {app.isVerified && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                      <Shield className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                  {app.isOpenSource && (
                    <Badge variant="secondary" className="gap-1">
                      <Zap className="w-3 h-3" />
                      Open Source
                    </Badge>
                  )}
                  {app.platforms?.map((platform) => (
                    <Badge key={platform} variant="outline" className="gap-1">
                      {platform === "macOS" || platform.includes("Windows") ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{app.stars.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center">
              <Download className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{app.downloads.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{app.users.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card/50">
          <CardHeader className="border-b border-border/50">
            <h2 className="text-lg font-semibold">About</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-foreground/80 leading-relaxed" data-testid="app-description">
              {app.description}
            </p>
          </CardContent>
        </Card>

        {app.features && app.features.length > 0 && (
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="border-b border-border/50">
              <h2 className="text-lg font-semibold">Features</h2>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="grid md:grid-cols-2 gap-3">
                {app.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {app.integrations && app.integrations.length > 0 && (
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="border-b border-border/50">
              <h2 className="text-lg font-semibold">Integrations</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {app.integrations.map((integration) => (
                  <Badge key={integration} variant="secondary" className="gap-1 py-1.5 px-3">
                    <MessageCircle className="w-3 h-3" />
                    {integration}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {app.website && (
                <div className="flex items-center gap-4">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                    {app.website}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
              {app.github && (
                <div className="flex items-center gap-4">
                  <Github className="w-5 h-5 text-muted-foreground" />
                  <a href={app.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
