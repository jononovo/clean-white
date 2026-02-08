"use client";

import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Box, 
  Code, 
  Cloud, 
  Shield, 
  Zap, 
  Globe, 
  Terminal, 
  Music, 
  Camera, 
  Home, 
  ShoppingCart,
  BookOpen,
  Briefcase,
  Heart,
  MessageSquare,
  Mic,
  Calendar,
  FileText,
  Lock,
  Gamepad2,
  GraduationCap,
  Scale,
  Languages,
  Database,
  Sparkles,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/shared/schema";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "agent-services-networks": Sparkles,
  "web-frontend-development": Globe,
  "coding-agents-ides": Code,
  "git-github": Terminal,
  "devops-cloud": Cloud,
  "browser-automation": Globe,
  "image-video-generation": Camera,
  "apple-apps-services": Box,
  "search-research": Search,
  "clawdbot-tools": Zap,
  "cli-utilities": Terminal,
  "marketing-sales": Briefcase,
  "crm-customer-support": MessageSquare,
  "productivity-tasks": Box,
  "ai-llms": Sparkles,
  "finance": Briefcase,
  "crypto-web3": Shield,
  "media-streaming": Music,
  "notes-pkm": BookOpen,
  "ios-macos-development": Box,
  "transportation": Box,
  "personal-development": Heart,
  "health-fitness": Heart,
  "communication": MessageSquare,
  "speech-transcription": Mic,
  "voice-telephony": Mic,
  "smart-home-iot": Home,
  "shopping-ecommerce": ShoppingCart,
  "calendar-scheduling": Calendar,
  "pdf-documents": FileText,
  "self-hosted-automation": Cloud,
  "security-passwords": Lock,
  "gaming-entertainment": Gamepad2,
  "education-learning": GraduationCap,
  "legal-compliance": Scale,
  "localization-translation": Languages,
  "databases-storage": Database,
};

const categoryAccents: Record<string, string> = {
  "agent-services-networks": "border-purple-500/30",
  "ai-llms": "border-violet-500/30",
  "crypto-web3": "border-amber-500/30",
  "security-passwords": "border-red-500/30",
  "devops-cloud": "border-blue-500/30",
};

function CategoryCard({ category }: { category: Category }) {
  const accentClass = categoryAccents[category.slug] || "";
  const examples = category.examples || [];
  const useMultiColumn = examples.length > 4;
  
  return (
    <Card className={cn(
      "group relative p-4 h-full bg-gradient-to-b from-card to-card/50 border border-border transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden",
      accentClass
    )} data-testid={`category-card-${category.slug}`}>
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-current opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity" />
      
      <div className="flex items-center justify-between mb-3 relative z-10">
        <Link href={`/categories/${category.slug}`}>
          <h4 className="group-hover:text-primary transition-colors">
            {category.name}
          </h4>
        </Link>
        <div className="flex items-center gap-2">
          {category.isNew && (
            <Badge variant="secondary" className="text-[9px] bg-primary/10 text-primary border-0 px-1.5 py-0">
              NEW
            </Badge>
          )}
          <h6 className="text-muted-foreground">
            {category.skillCount || 0}
          </h6>
        </div>
      </div>
      
      {examples.length > 0 && (
        <div className={cn(
          "relative z-10",
          useMultiColumn ? "grid grid-cols-2 gap-x-3 gap-y-1" : "flex flex-col gap-1"
        )}>
          {examples.map((example, i) => (
            <Link 
              key={i} 
              href={`/categories/${category.slug}?q=${encodeURIComponent(example)}`}
              className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors truncate"
            >
              {example}
            </Link>
          ))}
        </div>
      )}
      
      <Link 
        href={`/categories/${category.slug}`}
        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
      </Link>
    </Card>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = !searchQuery || 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.examples?.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesNew = !showNew || cat.isNew;
    return matchesSearch && matchesNew;
  });

  const newCategories = categories.filter(c => c.isNew);

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-display font-bold">Skill Categories</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Browse {categories.length} categories of OpenClaw skills. Each skill is security-audited and ranked for trust.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="search-categories"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={showNew ? "default" : "outline"}
              size="sm"
              onClick={() => setShowNew(!showNew)}
              className="gap-1.5"
              data-testid="filter-new"
            >
              <Sparkles className="w-3.5 h-3.5" />
              New ({newCategories.length})
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="p-5 h-44 animate-pulse bg-muted/30" />
            ))}
          </div>
        ) : (
          <>
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <Box className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="pt-8 border-t border-border">
          <div className="bg-muted/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-1">Missing a category?</h3>
              <p className="text-sm text-muted-foreground">Suggest a new category or request skills in a specific area.</p>
            </div>
            <Button variant="outline" className="gap-2">
              Request Category <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
