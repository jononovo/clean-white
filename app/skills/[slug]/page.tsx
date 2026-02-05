"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Download,
  Users,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Flag,
  ExternalLink,
  Github,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  GitCompare,
  History,
} from "lucide-react";
import type { Skill } from "@/shared/schema";

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

export default function SkillDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkill() {
      try {
        const res = await fetch(`/api/skills/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Skill not found");
          } else {
            setError("Failed to load skill");
          }
          return;
        }
        const data = await res.json();
        setSkill(data);
      } catch (err) {
        setError("Failed to load skill");
      } finally {
        setLoading(false);
      }
    }
    fetchSkill();
  }, [slug]);

  const handleDownload = async () => {
    if (!skill) return;
    await fetch(`/api/skills/${slug}/download`, { method: "POST" });
    setSkill((prev) => (prev ? { ...prev, downloads: prev.downloads + 1 } : prev));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading skill...</div>
        </div>
      </Layout>
    );
  }

  if (error || !skill) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <h1 className="text-2xl font-bold">{error || "Skill not found"}</h1>
          <p className="text-muted-foreground">The skill you're looking for doesn't exist or has been removed.</p>
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
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold" data-testid="skill-name">
                      {skill.name}
                    </h1>
                    <p className="text-muted-foreground mt-1" data-testid="skill-description">
                      {skill.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span data-testid="skill-stars">{skill.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span data-testid="skill-downloads">{skill.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{skill.currentUsers} current</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{skill.allTimeUsers} all-time</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">by</span>
                  <span className="text-sm font-medium text-primary" data-testid="skill-author">
                    @{skill.authorUsername}
                  </span>
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
                    v{skill.version}
                  </Badge>
                  <SecurityBadge score={skill.securityScore} status={skill.auditStatus} />
                  {skill.isVerified && (
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
                      <SecurityScoreRing score={skill.securityScore} />
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Current Version</span>
                      <div className="text-xl font-bold">v{skill.version}</div>
                    </div>
                    <Button className="w-full gap-2" onClick={handleDownload} data-testid="download-button">
                      <Download className="w-4 h-4" />
                      Download zip
                    </Button>
                    {skill.repositoryUrl && (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => window.open(skill.repositoryUrl!, "_blank")}
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
                  <h4 className="text-lg font-bold mb-2">{skill.name} Skill</h4>
                  <p className="text-primary font-medium">{skill.description}</p>
                  {skill.longDescription && <p className="text-muted-foreground mt-4">{skill.longDescription}</p>}

                  {skill.features && skill.features.length > 0 && (
                    <>
                      <h5 className="text-base font-semibold mt-6 mb-3 flex items-center gap-2">
                        <span className="text-lg">🎯</span> Features
                      </h5>
                      <ul className="space-y-2">
                        {skill.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {skill.readme && (
                    <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                      <pre className="text-sm whitespace-pre-wrap">{skill.readme}</pre>
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
                      <span className="font-medium">v{skill.version}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(skill.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {skill.tags && skill.tags.length > 0 && (
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
