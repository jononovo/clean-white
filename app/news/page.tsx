"use client";

import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const initialNewsArticles = [
  {
    id: "n-1",
    title: "OpenClaw v2.0 Release: Enhanced Security Primitives",
    summary: "The latest core update introduces zero-trust skill execution by default and a new permission model for filesystem access.",
    date: "Feb 05, 2026",
    readTime: "5 min read",
    author: "Alex Rivera",
    category: "Release",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
    content: `<p>Today we are proud to announce the release of OpenClaw v2.0...</p>`
  },
  {
    id: "n-2",
    title: "Security Advisory: Malicious npm Package 'agent-utils-helper'",
    summary: "A supply chain attack has been detected in a popular utility library. Immediate action required for all developers using version 1.2.x.",
    date: "Feb 04, 2026",
    readTime: "2 min read",
    author: "Threat Research Team",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563206767-5b1d972b9fb1?auto=format&fit=crop&q=80&w=2071",
    content: `<p><strong>Severity: Critical</strong></p>...`
  },
  {
    id: "n-3",
    title: "Community Spotlight: Building a DeFi Agent Swarm",
    summary: "How a team of three developers built a resilient arbitrage system using OpenClaw and Rust.",
    date: "Feb 03, 2026",
    readTime: "8 min read",
    author: "Sarah Jenkins",
    category: "Community",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2070",
    content: `<p>In the high-speed world of decentralized finance...</p>`
  },
  {
    id: "n-4",
    title: "The State of Agent Autonomy 2026",
    summary: "Our annual report on the growth, challenges, and future of the autonomous agent ecosystem.",
    date: "Feb 01, 2026",
    readTime: "12 min read",
    author: "Editorial Team",
    category: "Report",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070",
    content: `<p>2025 was the year of the prototype...</p>`
  }
];

export default function News() {
  const [newsArticles, setNewsArticles] = useState(initialNewsArticles);
  const router = useRouter();
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmitArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    
    const newArticle = {
      id: `n-${Date.now()}`,
      title: "Community Submission: New Analysis",
      summary: `Analysis of OpenClaw trends from ${new URL(url).hostname}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      readTime: "3 min read",
      author: "Community Contributor",
      category: "Community",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070",
      content: `<p>This article was submitted by a community member.</p>`
    };

    setNewsArticles([newArticle, ...newsArticles]);
    setIsSubmitOpen(false);
    toast({
      title: "Article Submitted",
      description: "Thanks for sharing! Your link has been added to the feed.",
    });
  };

  return (
    <Layout>
      <PageHeader
        title="Newsroom"
        description="Latest updates, security advisories, and community stories from the OpenClaw ecosystem."
        height="compact"
        action={
          <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="gap-2 cursor-pointer border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                <LinkIcon className="w-4 h-4" /> Submit Link
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit a News Link</DialogTitle>
                <DialogDescription>
                  Found an interesting article about OpenClaw? Share the URL and we will add it to the daily feed.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitArticle} className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Article URL</Label>
                  <Input id="url" name="url" placeholder="https://techcrunch.com/..." type="url" required />
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Link</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          {newsArticles.map((article) => (
            <article 
              key={article.id} 
              id={article.id}
              className="group cursor-pointer bg-card border border-border/60 hover:border-primary/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => router.push(`/news/${article.id}`)}
            >
              <div className="flex flex-col md:flex-row h-full">
                {article.image && (
                  <div className="w-full md:w-64 shrink-0 aspect-[16/9] md:aspect-auto overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <Badge variant={article.category === 'Security' ? 'destructive' : 'secondary'} className="text-[10px] h-5 px-1.5 uppercase tracking-wider">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {article.date}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-display font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                       {article.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                      By {article.author}
                    </div>
                    <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                       Read Story <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
          
          <div className="py-8 text-center">
             <Button variant="outline" className="cursor-pointer">Load Older Articles</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}