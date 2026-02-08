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
  MapPin,
  Download,
  ExternalLink,
  Star,
  Package,
  Users,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

interface ProviderData {
  id: string;
  handle: string;
  displayName: string;
  description: string | null;
  avatarUrl: string | null;
  location: string | null;
  website: string | null;
  contactEmail: string | null;
  isVerified: boolean;
  isPartner: boolean;
  partnerRole: string | null;
  tagline: string | null;
  rating: number;
}

interface SkillData {
  id: string;
  slug: string;
  name: string;
  description: string;
  downloads: number;
  stars: number;
  authorUsername: string;
}

interface ServiceData {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  pricingType: string;
  pricingLabel: string | null;
}

export default function ProviderProfilePage() {
  const params = useParams();
  const handle = (params.username as string)?.replace("@", "");
  const [provider, setProvider] = useState<ProviderData | null>(null);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProvider() {
      try {
        const res = await fetch(`/api/providers/browse?handle=${handle}`);
        if (!res.ok) {
          setError("Failed to load provider");
          return;
        }
        const data = await res.json();
        if (!data || data.length === 0) {
          setError("Provider not found");
          return;
        }
        setProvider(data[0]);

        const providerId = data[0].id;
        const [skillsRes, servicesRes] = await Promise.all([
          fetch(`/api/skills?author=${handle}`),
          fetch(`/api/services?providerId=${providerId}`),
        ]);

        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();
          const skillsList = skillsData?.skills || skillsData;
          setSkills(Array.isArray(skillsList) ? skillsList : []);
        }
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(Array.isArray(servicesData) ? servicesData : []);
        }
      } catch {
        setError("Failed to load provider");
      } finally {
        setLoading(false);
      }
    }
    fetchProvider();
  }, [handle]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  if (error || !provider) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <h1 className="text-2xl font-bold">{error || "Provider not found"}</h1>
          <p className="text-muted-foreground">The provider you're looking for doesn't exist yet.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  const totalDownloads = skills.reduce((sum, s) => sum + s.downloads, 0);
  const totalStars = skills.reduce((sum, s) => sum + s.stars, 0);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
          <CardContent className="p-6 -mt-16">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                {provider.avatarUrl ? (
                  <img
                    src={provider.avatarUrl}
                    alt={provider.displayName}
                    className="w-32 h-32 rounded-2xl border-4 border-background shadow-xl"
                    data-testid="provider-avatar"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl border-4 border-background shadow-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center" data-testid="provider-avatar">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                )}
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
                    {provider.website && (
                      <Button variant="outline" size="sm" className="gap-1" asChild>
                        <a href={provider.website.startsWith("http") ? provider.website : `https://${provider.website}`} target="_blank" rel="noopener noreferrer">
                          {provider.website.includes("github.com") ? <Github className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          {provider.website.includes("github.com") ? "GitHub" : "Website"}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {provider.description && (
                  <p className="text-foreground/80" data-testid="provider-description">
                    {provider.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {provider.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.location}</span>
                    </div>
                  )}
                  {provider.tagline && (
                    <div className="text-xs text-muted-foreground/70 italic">
                      {provider.tagline}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {provider.isVerified && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Provider
                    </Badge>
                  )}
                  {provider.isPartner && provider.partnerRole && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 gap-1">
                      <Package className="w-3 h-3" />
                      {provider.partnerRole}
                    </Badge>
                  )}
                  {skills.length > 0 && (
                    <Badge variant="secondary" className="gap-1">
                      <Package className="w-3 h-3" />
                      {skills.length} Skill{skills.length !== 1 ? "s" : ""}
                    </Badge>
                  )}
                  {services.length > 0 && (
                    <Badge variant="secondary" className="gap-1">
                      <Globe className="w-3 h-3" />
                      {services.length} Service{services.length !== 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {(skills.length > 0 || totalStars > 0) && (
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{totalStars.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Stars</div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <Download className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{totalDownloads.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{skills.length}</div>
                <div className="text-sm text-muted-foreground">Published Skills</div>
              </CardContent>
            </Card>
          </div>
        )}

        {skills.length > 0 && (
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="border-b border-border/50">
              <h2 className="text-lg font-semibold">Published Skills</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {skills.map((skill) => (
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
        )}

        {services.length > 0 && (
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="border-b border-border/50">
              <h2 className="text-lg font-semibold">Services</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {services.map((service) => (
                  <div
                    key={service.slug}
                    className="flex items-center justify-between p-4"
                    data-testid={`service-${service.slug}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">
                        {service.name}
                      </div>
                      {service.description && (
                        <p className="text-sm text-muted-foreground truncate">{service.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {service.pricingLabel && (
                        <Badge variant="outline" className="text-xs">{service.pricingLabel}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
