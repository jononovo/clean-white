"use client";

import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Box, 
  ChevronLeft,
  Shield,
  Star,
  Download,
  ExternalLink,
  Lock,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category, Skill } from "@/shared/schema";

const riskColors: Record<string, { bg: string; text: string; border: string }> = {
  low: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  medium: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800" },
  high: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
  critical: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", border: "border-red-200 dark:border-red-800" },
  unreviewed: { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-600 dark:text-slate-400", border: "border-slate-200 dark:border-slate-700" },
};

function RiskBadge({ level }: { level: string }) {
  const colors = riskColors[level] || riskColors.unreviewed;
  const icons: Record<string, React.ReactNode> = {
    low: <CheckCircle className="w-3 h-3" />,
    medium: <Clock className="w-3 h-3" />,
    high: <AlertTriangle className="w-3 h-3" />,
    critical: <AlertTriangle className="w-3 h-3" />,
    unreviewed: <Clock className="w-3 h-3" />,
  };
  
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase border", colors.bg, colors.text, colors.border)}>
      {icons[level]}
      {level}
    </span>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link href={`/skills/${skill.slug}`} data-testid={`skill-card-${skill.slug}`}>
      <Card className="group p-4 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Box className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                {skill.name}
              </h3>
              {skill.isVerified && (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              )}
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {skill.description}
            </p>
            
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {skill.downloads.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {skill.stars}
              </span>
              <span>v{skill.version}</span>
            </div>
          </div>
          
          <div className="shrink-0">
            <RiskBadge level={skill.riskLevel || "unreviewed"} />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function SkillCardSkeleton() {
  return (
    <Card className="p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
    </Card>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/categories/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setCategory(data.category);
          setSkills(data.skills);
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchData();
    }
  }, [slug]);

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = !searchQuery || 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = !riskFilter || skill.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-12 w-96 bg-muted rounded animate-pulse" />
          <div className="grid gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkillCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="text-center py-16">
          <Box className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The category you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/categories">
            <Button>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/categories" className="hover:text-primary transition-colors">
            Categories
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category.name}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-display font-bold">{category.name}</h1>
            {category.isNew && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">NEW</Badge>
            )}
          </div>
          {category.description && (
            <p className="text-muted-foreground max-w-2xl">{category.description}</p>
          )}
        </div>

        {category.examples && category.examples.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {category.examples.map((example, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {example}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search skills in this category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="search-skills"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["low", "medium", "high", "unreviewed"].map((risk) => (
              <Button
                key={risk}
                variant={riskFilter === risk ? "default" : "outline"}
                size="sm"
                onClick={() => setRiskFilter(riskFilter === risk ? null : risk)}
                className="text-xs capitalize"
                data-testid={`filter-${risk}`}
              >
                {risk}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">
            {filteredSkills.length} skill{filteredSkills.length !== 1 ? "s" : ""} found
          </span>
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <Filter className="w-3 h-3" />
            Sort by downloads
          </Button>
        </div>

        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Box className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No skills found</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {skills.length === 0 
                ? "No skills have been added to this category yet." 
                : "Try adjusting your search or filters."}
            </p>
            {skills.length === 0 && (
              <Button variant="outline" size="sm">
                Submit a Skill
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}

        <div className="pt-6">
          <Link href="/categories">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to All Categories
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
