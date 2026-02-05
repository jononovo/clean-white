import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight, Share2, Bookmark, Link, Plus } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
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

// Mock News Data (Exported for use in ReadNews)
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
    content: `
      <p>Today we are proud to announce the release of OpenClaw v2.0, a major milestone in our journey to build the most secure autonomous agent runtime.</p>
      <h3>Key Features</h3>
      <ul>
        <li><strong>Zero-Trust Execution:</strong> All skills now run in isolated sandboxes by default, with no network access unless explicitly granted.</li>
        <li><strong>Granular Permissions:</strong> Users can now define per-skill filesystem allow-lists, preventing unauthorized data access.</li>
        <li><strong>Signed Modules:</strong> The runtime now enforces cryptographic signature verification for all core modules.</li>
      </ul>
      <p>This release is a direct response to the increasing sophistication of agent-based attacks we've observed in the wild. By shifting to a secure-by-default posture, we aim to eliminate entire classes of vulnerabilities.</p>
      <p>Upgrade your agents today by running <code>claw update --core</code>.</p>
    `
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
    content: `
      <p><strong>Severity: Critical</strong></p>
      <p>Our threat intelligence monitoring has detected malicious code in the npm package <code>agent-utils-helper</code> versions 1.2.0 through 1.2.4. The malicious payload attempts to exfiltrate environment variables containing API keys to a remote command-and-control server.</p>
      <h3>Remediation</h3>
      <p>If you are using this package, please take the following steps immediately:</p>
      <ol>
        <li>Remove the dependency: <code>npm uninstall agent-utils-helper</code></li>
        <li>Rotate all API keys exposed in your environment variables.</li>
        <li>Run a full audit of your agent logs for suspicious network activity.</li>
      </ol>
      <p>We have worked with the npm security team to remove the compromised versions from the registry.</p>
    `
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
    content: `
      <p>In the high-speed world of decentralized finance, milliseconds matter. But so does security. We sat down with the team behind "AlphaSwarm" to discuss how they leverage OpenClaw's security features without sacrificing performance.</p>
      <p>"The biggest challenge wasn't the trading logic," says lead developer Mike Chen. "It was ensuring that our agents didn't accidentally sign malicious transactions if one of the data feeds was compromised."</p>
      <p>By using OpenClaw's <code>PolicyGuard</code> middleware, AlphaSwarm enforces strict transaction limits and requires multi-agent consensus for any trade over 10 ETH.</p>
    `
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
    content: `
      <p>2025 was the year of the prototype. 2026 is the year of production. Across every industry, we are seeing a shift from chat-based assistants to fully autonomous agents capable of executing complex workflows.</p>
      <p>However, this growth comes with risks. Our data shows a 300% increase in agent-targeted attacks, primarily focusing on prompt injection and supply chain vulnerabilities.</p>
    `
  }
];

export default function News() {
  const [newsArticles, setNewsArticles] = useState(initialNewsArticles);
  const [location, setLocation] = useLocation();
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmitArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    
    // Simulate fetching metadata from URL
    const newArticle = {
      id: `n-${Date.now()}`,
      title: "Community Submission: New Analysis",
      summary: `Analysis of OpenClaw trends from ${new URL(url).hostname}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      readTime: "3 min read",
      author: "Community Contributor",
      category: "Community",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070",
      content: `
        <p>This article was submitted by a community member. Read the full story at:</p>
        <p><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${url}</a></p>
        <p>Our automated agent is currently indexing the full content for archival.</p>
      `
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
                <Link className="w-4 h-4" /> Submit Link
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit a News Link</DialogTitle>
                <DialogDescription>
                  Found an interesting article about OpenClaw? Share the URL and we'll add it to the daily feed.
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
        {/* Main Feed - List View */}
        <div className="space-y-6">
          {newsArticles.map((article) => (
            <article 
              key={article.id} 
              id={article.id}
              className="group cursor-pointer bg-card border border-border/60 hover:border-primary/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => setLocation(`/read-news`)} // In a real app we'd pass the ID, but for mockup we just load the reading page
            >
              <div className="flex flex-col md:flex-row h-full">
                
                {/* Image - Left Side */}
                {article.image && (
                  <div className="w-full md:w-64 shrink-0 aspect-[16/9] md:aspect-auto overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content - Right Side */}
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
