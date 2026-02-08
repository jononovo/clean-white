"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Star,
  Download,
  Users,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Flag,
  Github,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  GitCompare,
  History,
  BadgeCheck,
  Globe,
  ExternalLink,
  TrendingUp,
  Package,
  DollarSign,
  ArrowLeft,
  Server,
  Settings,
  GraduationCap,
  Handshake,
  Landmark,
  Wrench,
} from "lucide-react";
import type { Skill } from "@/shared/schema";

type SkillWithTags = Skill & { tags?: string[] };

interface ServiceDetail {
  id: string;
  providerId: string;
  providerHandle: string;
  providerDisplayName: string;
  providerDescription: string | null;
  providerWebsite: string | null;
  providerAvatarUrl: string | null;
  providerIsVerified: boolean;
  providerIsPartner: boolean;
  providerPartnerRole: string | null;
  providerRating: number | null;
  name: string;
  description: string | null;
  category: string;
  slug: string;
  url: string | null;
  pricingType: string;
  pricingLabel: string | null;
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  popularity: number | null;
  isActive: boolean;
  createdAt: string;
}

const CATEGORY_MAP: Record<string, { label: string; icon: typeof Server }> = {
  setup_installation: { label: "Setup & Installation", icon: Wrench },
  managed_hosting: { label: "Managed Hosting", icon: Server },
  consulting: { label: "Consulting", icon: Settings },
  training: { label: "Training", icon: GraduationCap },
  partnerships: { label: "Partnerships", icon: Handshake },
  finance_tax: { label: "Finance & Tax", icon: Landmark },
};

function SecurityBadge({ score, status }: { score: number; status: string }) {
  if (status === "verified" || score >= 80) {
    return (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
        <ShieldCheck className="w-3 h-3" />
        Verified
      </Badge>
    );
  }
  if (status === "audited" || score >= 60) {
    return (
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 gap-1">
        <Shield className="w-3 h-3" />
        Audited
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 gap-1">
        <Clock className="w-3 h-3" />
        Pending Review
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 gap-1">
      <ShieldAlert className="w-3 h-3" />
      Unverified
    </Badge>
  );
}

function SecurityScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#3b82f6" : score >= 40 ? "#eab308" : "#ef4444";

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 -rotate-90">
        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted/20" />
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {score}
        </span>
      </div>
    </div>
  );
}

function SkillDetailView({ skill, username, slug }: { skill: SkillWithTags; username: string; slug: string }) {
  const [currentSkill, setCurrentSkill] = useState(skill);

  const handleDownload = async () => {
    await fetch(`/api/skills/${username}/${slug}/download`, { method: "POST" });
    setCurrentSkill((prev) => ({ ...prev, downloads: prev.downloads + 1 }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold" data-testid="skill-name">
                    {currentSkill.name}
                  </h1>
                  <p className="text-muted-foreground mt-1" data-testid="skill-description">
                    {currentSkill.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span data-testid="skill-stars">{currentSkill.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span data-testid="skill-downloads">{currentSkill.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{currentSkill.currentUsers} current</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{currentSkill.allTimeUsers} all-time</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">by</span>
                <Link href={`/${currentSkill.authorUsername}`} className="text-sm font-medium text-primary hover:underline" data-testid="skill-author">
                  @{currentSkill.authorUsername}
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Star className="w-4 h-4" />
                  Star
                </Button>
                <Button variant="outline" size="sm" className="gap-1 text-yellow-500 hover:text-yellow-400">
                  <Flag className="w-4 h-4" />
                  Report
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">Reports require a reason. Abuse may result in a ban.</p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  latest
                </Badge>
                <Badge variant="secondary" data-testid="skill-version">
                  v{currentSkill.version}
                </Badge>
                <SecurityBadge score={currentSkill.securityScore} status={currentSkill.auditStatus} />
                {currentSkill.isVerified && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Author
                  </Badge>
                )}
              </div>
            </div>

            <div className="lg:w-64 space-y-4">
              <Card className="bg-muted/30 border-border/30">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Security Score</span>
                  </div>
                  <div className="flex justify-center">
                    <SecurityScoreRing score={currentSkill.securityScore} />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Current Version</span>
                    <div className="text-xl font-bold">v{currentSkill.version}</div>
                  </div>
                  <Button className="w-full gap-2" onClick={handleDownload} data-testid="download-button">
                    <Download className="w-4 h-4" />
                    Download zip
                  </Button>
                  {currentSkill.repositoryUrl && (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => window.open(currentSkill.repositoryUrl!, "_blank")}
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="files" className="w-full">
        <TabsList className="bg-muted/30">
          <TabsTrigger value="files" className="gap-2">
            <FileText className="w-4 h-4" />
            Files
          </TabsTrigger>
          <TabsTrigger value="compare" className="gap-2">
            <GitCompare className="w-4 h-4" />
            Compare
          </TabsTrigger>
          <TabsTrigger value="versions" className="gap-2">
            <History className="w-4 h-4" />
            Versions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="mt-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="border-b border-border/50">
              <h3 className="font-semibold">SKILL.md</h3>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-invert max-w-none">
                <h4 className="text-lg font-bold mb-2">{currentSkill.name} Skill</h4>
                <p className="text-primary font-medium">{currentSkill.description}</p>
                {currentSkill.longDescription && <p className="text-muted-foreground mt-4">{currentSkill.longDescription}</p>}

                {currentSkill.features && currentSkill.features.length > 0 && (
                  <>
                    <h5 className="text-base font-semibold mt-6 mb-3 flex items-center gap-2">
                      Features
                    </h5>
                    <ul className="space-y-2">
                      {currentSkill.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {currentSkill.readme && (
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <pre className="text-sm whitespace-pre-wrap">{currentSkill.readme}</pre>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compare" className="mt-4">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 text-center text-muted-foreground">
              <GitCompare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Version comparison coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versions" className="mt-4">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/20 text-primary">latest</Badge>
                    <span className="font-medium">v{currentSkill.version}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(currentSkill.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {currentSkill.tags && currentSkill.tags.length > 0 && (
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {currentSkill.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ServiceDetailView({ service }: { service: ServiceDetail }) {
  const categoryInfo = CATEGORY_MAP[service.category] || { label: service.category, icon: Package };
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/${service.providerHandle}`} className="hover:text-primary transition-colors flex items-center gap-1" data-testid="breadcrumb-provider">
          <ArrowLeft className="w-3.5 h-3.5" />
          {service.providerHandle}
        </Link>
        <span>/</span>
        <span className="text-foreground">{service.slug}</span>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <CardContent className="p-6 -mt-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl border-4 border-background shadow-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center" data-testid="service-icon">
                <CategoryIcon className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex-1 space-y-4 pt-2">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold" data-testid="service-name">
                    {service.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="gap-1 text-xs">
                      <CategoryIcon className="w-3 h-3" />
                      {categoryInfo.label}
                    </Badge>
                    {service.pricingLabel && (
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <DollarSign className="w-3 h-3" />
                        {service.pricingLabel}
                      </Badge>
                    )}
                  </div>
                </div>
                {service.url && (
                  <Button className="gap-2" asChild data-testid="visit-service-button">
                    <a href={service.url.startsWith("http") ? service.url : `https://${service.url}`} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4" />
                      Visit Service
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                )}
              </div>

              {service.description && (
                <p className="text-foreground/80 leading-relaxed" data-testid="service-description">
                  {service.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {service.rating != null && (
                  <div className="flex items-center gap-1" data-testid="service-rating">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium text-foreground">{(service.rating / 10).toFixed(1)}</span>
                    <span>/ 5.0</span>
                  </div>
                )}
                {service.popularity != null && (
                  <div className="flex items-center gap-1" data-testid="service-popularity">
                    <TrendingUp className="w-4 h-4" />
                    <span>{service.popularity}/10 popularity</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="capitalize">{service.pricingType.replace("_", " ")} pricing</span>
                </div>
              </div>

              {(service.priceMin != null || service.priceMax != null) && (
                <div className="text-sm text-muted-foreground">
                  {service.priceMin != null && service.priceMax != null ? (
                    <span>${service.priceMin} - ${service.priceMax}/mo</span>
                  ) : service.priceMin != null ? (
                    <span>From ${service.priceMin}/mo</span>
                  ) : (
                    <span>Up to ${service.priceMax}/mo</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50">
        <CardHeader className="border-b border-border/50">
          <h2 className="text-lg font-semibold">Provided by</h2>
        </CardHeader>
        <CardContent className="p-0">
          <Link
            href={`/${service.providerHandle}`}
            className="flex items-center gap-4 p-6 hover:bg-muted/30 transition-colors group"
            data-testid="provider-link"
          >
            <div className="flex-shrink-0">
              {service.providerAvatarUrl ? (
                <img
                  src={service.providerAvatarUrl}
                  alt={service.providerDisplayName}
                  className="w-14 h-14 rounded-xl border border-border/50"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-border/50">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors" data-testid="provider-name">
                  {service.providerDisplayName}
                </span>
                {service.providerIsVerified && (
                  <BadgeCheck className="w-5 h-5 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{service.providerHandle}</p>
              {service.providerDescription && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.providerDescription}</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {service.providerIsPartner && service.providerPartnerRole && (
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 gap-1 text-xs">
                  <Package className="w-3 h-3" />
                  {service.providerPartnerRole}
                </Badge>
              )}
              <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </CardContent>
      </Card>

      {service.url && (
        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <a
                  href={service.url.startsWith("http") ? service.url : `https://${service.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                  data-testid="service-external-url"
                >
                  {service.url}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function SkillOrServiceDetailPage() {
  const params = useParams();
  const username = (params.username as string)?.replace("@", "");
  const slug = params.slug as string;
  const [skill, setSkill] = useState<SkillWithTags | null>(null);
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const skillRes = await fetch(`/api/skills/${username}/${slug}`);
        if (skillRes.ok) {
          const data = await skillRes.json();
          setSkill(data);
          return;
        }

        const serviceRes = await fetch(`/api/services/${username}/${slug}`);
        if (serviceRes.ok) {
          const data = await serviceRes.json();
          setService(data);
          return;
        }

        setError("Not found");
      } catch {
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [username, slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error || (!skill && !service)) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <h1 className="text-2xl font-bold">{error || "Not found"}</h1>
          <p className="text-muted-foreground">The skill or service you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {skill && <SkillDetailView skill={skill} username={username} slug={slug} />}
      {service && <ServiceDetailView service={service} />}
    </Layout>
  );
}
