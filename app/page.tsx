"use client";

import { Layout } from "@/components/layout";
import { topScorers, latestSubmissions, threats, infrastructureProviders } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FullPageModal, ConfirmationModal } from "@/components/modals";
import { AuthDrawer } from "@/components/auth-drawer";
import { useState, useRef, useCallback } from "react";
import { Shield, CheckCircle, ExternalLink, Calendar, AlertTriangle, ChevronRight, Zap, Globe, Server, Activity, ArrowUpRight, Mail, Box, Cloud, Search, Newspaper, Sparkles, Star, Terminal, Lock, Handshake, Bot, Phone, FileSearch, CalendarClock, Video, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { FeaturedOfTheDayCard, FEATURED_OF_THE_DAY } from "@/features/featured";
import { SERVICE_CATEGORIES, ServiceRegistrationDrawer } from "@/features/services";
import { AuditBadge, FeaturedCard, CompressedListRow } from "@/features/skills";
import { ThreatTicker } from "@/features/threats";


function ManagedClawBanner() {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => setShowTooltip(true), 1500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  }, []);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <a href="https://xcloud.host/managed-vs-self-hosting-openclaw" target="_blank" rel="noopener noreferrer" className="block py-3 px-4 rounded-lg bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-200 group cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-display font-bold text-sm text-foreground">High-powered Managed Claw</span>
              <ArrowUpRight className="w-4 h-4 text-primary group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              <span className="text-xs text-muted-foreground/70">Starting at <span className="font-semibold text-foreground/80">$79/month</span> <span className="italic">(Incl. $15 tokens)</span></span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground/70 hidden sm:block shrink-0">We set it up and help you run it. <span className="italic font-medium text-foreground/60">Make business simple with Clawd.bot</span></span>
        </div>
      </a>

      <div className={cn(
        "absolute left-0 right-0 top-full mt-2 z-50 transition-all duration-300 origin-top",
        showTooltip ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
      )}>
        <Card className="p-5 shadow-xl border-primary/20 bg-card/98 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-md bg-amber-500/10">
              <Bot className="w-4 h-4 text-amber-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Business Automation Offer</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-4">
            {[
              { icon: Phone, text: "Handle research calls, texting, and recommended outreach" },
              { icon: Mail, text: "Email outreach and rep replies on your behalf" },
              { icon: FileSearch, text: "Find information, scrape from sites, suggest meeting times" },
              { icon: Sparkles, text: "Learn new skills, create videos, program on the go" },
              { icon: CalendarClock, text: "Manage your schedule and create a schedule for your bot" },
              { icon: Video, text: "Generate content, reports, and presentations automatically" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5">
                <item.icon className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-xs text-muted-foreground leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-border/40 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground italic">All with the managed, gold service package.</span>
            <span className="text-[10px] font-semibold text-primary flex items-center gap-1">
              Learn more <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function Home() {
  const [showFullModal, setShowFullModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAuthDrawer, setShowAuthDrawer] = useState(false);
  const [showServiceDrawer, setShowServiceDrawer] = useState(false);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string | undefined>();

  const handleServiceCategoryClick = (categoryId: string) => {
    setSelectedServiceCategory(categoryId);
    setShowServiceDrawer(true);
  };

  return (
    <Layout>
      <FullPageModal 
        open={showFullModal} 
        onOpenChange={setShowFullModal}
        title="Security Audit Details"
      >
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-xl bg-muted/30 border border-border">
            <h3 className="text-xl font-bold mb-4">Audit Report: skill-guard-pro</h3>
            <p className="text-muted-foreground mb-4">
              This skill has undergone a rigorous Level 3 security audit. The following checks were performed:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Static Code Analysis</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Dependency Vulnerability Scan</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Runtime Behavior Monitoring</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Manual Peer Review</li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="h-64 rounded-xl bg-card border border-border p-6 flex items-center justify-center text-muted-foreground">
               Chart Placeholder
             </div>
             <div className="h-64 rounded-xl bg-card border border-border p-6 flex items-center justify-center text-muted-foreground">
               Logs Placeholder
             </div>
          </div>
        </div>
      </FullPageModal>

      <ConfirmationModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        title="Report Malicious Skill?"
        description="Are you sure you want to flag 'crypto-wallet-tracker' as malicious? This will trigger an immediate automated review and may suspend the listing."
        confirmLabel="Yes, Report Threat"
        variant="destructive"
        onConfirm={() => console.log("Reported!")}
      />

      <AuthDrawer open={showAuthDrawer} onOpenChange={setShowAuthDrawer} />
      <ServiceRegistrationDrawer
        open={showServiceDrawer}
        onOpenChange={setShowServiceDrawer}
        defaultCategory={selectedServiceCategory}
        onLoginRequired={() => setShowAuthDrawer(true)}
      />

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-background via-muted to-accent/20 border border-border ring-1 ring-white/10 dark:ring-white/5 transition-colors duration-300 p-8 md:p-12 shadow-xl shadow-muted/60 dark:shadow-none">
          <div className="absolute inset-0 bg-[linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03] text-foreground pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs font-medium text-foreground shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Network Secure • 12,402 Audits Verified
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
                  The Business Hub for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">OpenClaw</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                  The OpenClaw Hub for Business: Community, jobs, news and secure, enterprise-ready OpenClaw Bots.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/publish">
                  <Button size="lg" className="h-12 px-5 bg-primary text-primary-foreground hover:bg-primary/90 border-none font-semibold shadow-lg shadow-primary/10 transition-all cursor-pointer">
                    <Shield className="w-4 h-4 mr-1.5" />
                    Publish a Skill
                  </Button>
                </Link>
                <Link href="/deploy">
                  <Button size="lg" variant="outline" className="h-12 px-5 bg-card border-border text-foreground hover:bg-muted shadow-sm cursor-pointer">
                    <Zap className="w-4 h-4 mr-1.5" />
                    1-Click-Setup
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-xs text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                  <span>OpenClaw Threat Monitor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                  <span>Manual Code Review</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl blur-xl opacity-60" />
               <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-xl p-6 shadow-xl shadow-muted/50 dark:shadow-none">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                       <Activity className="w-5 h-5 text-muted-foreground" />
                       <span className="font-mono font-bold text-sm text-foreground">LIVE SECURITY FEED</span>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="p-2 rounded bg-muted text-muted-foreground border border-border">
                             <AlertTriangle className="w-4 h-4" />
                           </div>
                           <div>
                             <div className="text-2xl font-bold font-mono text-foreground">342</div>
                             <div className="text-xs text-muted-foreground font-medium">Threats Blocked (24h)</div>
                           </div>
                        </div>
                        <div className="h-8 w-px bg-border" />
                        <div className="flex items-center gap-3">
                           <div className="p-2 rounded bg-muted text-muted-foreground border border-border">
                             <Terminal className="w-4 h-4" />
                           </div>
                           <div>
                             <div className="text-2xl font-bold font-mono text-foreground">14.2M</div>
                             <div className="text-xs text-muted-foreground font-medium">Lines Audited</div>
                           </div>
                        </div>
                     </div>
                     
                     <div className="pt-3 space-y-3">
                        <div className="p-3 rounded bg-muted/50 border border-border shadow-inner">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                    <Globe className="w-3 h-3 text-muted-foreground" />
                                    OpenClaw Threat Index
                                </span>
                                <span className="text-[10px] font-mono text-destructive font-bold">HIGH RISK</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                               <div className="h-full w-[75%] bg-destructive rounded-full" />
                            </div>
                        </div>
                        <ThreatTicker />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <ManagedClawBanner />

        <div className="py-6 border-b border-border/40">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
              <Handshake className="w-3.5 h-3.5 text-muted-foreground" />
              Claw/Agent Services Marketplace
            </h3>
            <span className="text-[10px] font-medium text-primary hover:underline cursor-pointer">
              Browse All Services
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {SERVICE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleServiceCategoryClick(cat.id)}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-b from-card to-card/50 border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer"
                  data-testid={`service-category-${cat.id}`}
                >
                  <div className="p-2.5 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-center text-foreground/80 group-hover:text-foreground transition-colors">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="py-6 border-b border-border/40">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
              <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              Claw Eco-System - Featured Today
              <span className="text-[11px] font-medium normal-case tracking-normal text-muted-foreground/60">
                | {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/New_York" })}
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeaturedOfTheDayCard
              type="hero"
              title="Hero"
              subtitle="of the Day"
              name={FEATURED_OF_THE_DAY.hero.handle}
              description={FEATURED_OF_THE_DAY.hero.description}
              href={`https://github.com/${FEATURED_OF_THE_DAY.hero.handle}`}
              imageUrl={FEATURED_OF_THE_DAY.hero.imageUrl}
              sourceUrl={FEATURED_OF_THE_DAY.hero.sourceUrl}
              isVerified={FEATURED_OF_THE_DAY.hero.isVerified}
            />
            <FeaturedOfTheDayCard
              type="app"
              title="Claw App"
              subtitle="of the Day"
              name={FEATURED_OF_THE_DAY.app.name}
              description={FEATURED_OF_THE_DAY.app.description}
              href={FEATURED_OF_THE_DAY.app.sourceUrl || `/apps/${FEATURED_OF_THE_DAY.app.slug}`}
              imageUrl={FEATURED_OF_THE_DAY.app.imageUrl}
              sourceUrl={FEATURED_OF_THE_DAY.app.sourceUrl}
              isVerified={FEATURED_OF_THE_DAY.app.isVerified}
            />
            <FeaturedOfTheDayCard
              type="skill"
              title="Skill"
              subtitle="of the Day"
              name={FEATURED_OF_THE_DAY.skill.name}
              description={FEATURED_OF_THE_DAY.skill.description}
              href={`/@${FEATURED_OF_THE_DAY.skill.author}/${FEATURED_OF_THE_DAY.skill.slug}`}
              imageUrl={FEATURED_OF_THE_DAY.skill.imageUrl}
              isVerified={FEATURED_OF_THE_DAY.skill.isVerified}
            />
            <FeaturedOfTheDayCard
              type="service"
              title="Service"
              subtitle="of the Day"
              name={FEATURED_OF_THE_DAY.service.name}
              description={FEATURED_OF_THE_DAY.service.description}
              href={FEATURED_OF_THE_DAY.service.website}
              imageUrl={FEATURED_OF_THE_DAY.service.imageUrl}
              sourceUrl={FEATURED_OF_THE_DAY.service.sourceUrl}
              isVerified={FEATURED_OF_THE_DAY.service.isVerified}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-border/40">
           <div>
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
                   <Server className="w-3.5 h-3.5 text-muted-foreground" />
                   Top Claw VPS Services
                 </h3>
              </div>
              <div className="bg-white/50 dark:bg-card/50 border border-border/60 rounded-lg p-3 shadow-sm backdrop-blur-sm">
                 <div className="space-y-0.5">
                    {[
                      { name: "BoostedHost", desc: "Turnkey pre-installed setup", rating: 4.9, price: "Custom", url: "https://boostedhost.com" },
                      { name: "DigitalOcean", desc: "Official 1-Click Deploy", rating: 4.7, price: "From $6/mo", url: "https://digitalocean.com" },
                      { name: "Hostinger", desc: "Best budget option", rating: 4.5, price: "From $5/mo", url: "https://hostinger.com" },
                      { name: "Vultr", desc: "DIY flexibility, great pricing", rating: 4.4, price: "From $6/mo", url: "https://vultr.com" },
                      { name: "Linode", desc: "Best raw performance", rating: 4.3, price: "From $5/mo", url: "https://linode.com" },
                    ].map((vps, i) => (
                      <a key={vps.name} href={vps.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0 hover:bg-muted/30 px-2 rounded-sm transition-colors group cursor-pointer">
                        <span className="w-4 text-xs font-mono text-muted-foreground text-center">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors">{vps.name}</span>
                            <span className="text-[10px] text-muted-foreground/70">{vps.price}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{vps.desc}</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 shrink-0">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {vps.rating}
                        </div>
                      </a>
                    ))}
                 </div>
                 <a href="https://boostedhost.com/blog/en/how-to-install-openclaw-get-started-guide/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/40 text-[11px] font-medium text-primary hover:underline">
                   <ExternalLink className="w-3 h-3" />
                   Guide: Installing Claw on a VPS
                 </a>
              </div>
           </div>

           <div>
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
                   <Star className="w-3.5 h-3.5 text-muted-foreground" />
                   Highest Productivity Skills
                 </h3>
              </div>
              <div className="bg-white/50 dark:bg-card/50 border border-border/60 rounded-lg p-3 shadow-sm backdrop-blur-sm">
                 <div className="space-y-0.5">
                    {[
                      { name: "GitHub", author: "@steipete", downloads: 7504, stars: 14, desc: "Issues, PRs, CI runs, and advanced queries via gh CLI", slug: "github", hubUrl: "https://clawhub.ai/steipete/github" },
                      { name: "Home Assistant", author: "@dbhurley", downloads: 4602, stars: 26, desc: "Smart plugs, lights, scenes, automations — full smart home control", slug: "home-assistant", hubUrl: "https://clawhub.ai/dbhurley/homeassistant" },
                      { name: "CalDAV Calendar", author: "@Asleep123", downloads: 3658, stars: 4, desc: "Sync iCloud, Google, Fastmail, Nextcloud calendars on Linux", slug: "caldav-calendar", hubUrl: "https://clawhub.ai/Asleep123/caldav-calendar" },
                      { name: "Notion", author: "@steipete", downloads: 3430, stars: 11, desc: "Create and manage pages, databases, and blocks via Notion API", slug: "notion", hubUrl: "https://clawhub.ai/steipete/notion" },
                      { name: "Email", author: "@0xterrybit", downloads: 3120, stars: 8, desc: "Send, read, search, and organize emails across multiple providers", slug: "email", hubUrl: "https://clawhub.ai/0xterrybit/email" },
                    ].map((skill, i) => (
                      <Link key={skill.name} href={`/categories/productivity`} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0 hover:bg-muted/30 px-2 rounded-sm transition-colors group cursor-pointer">
                        <span className="w-4 text-xs font-mono text-muted-foreground text-center">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
                            <span className="text-[10px] text-muted-foreground/60">{skill.downloads.toLocaleString()} downloads</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{skill.desc}</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 shrink-0">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {skill.stars}
                        </div>
                      </Link>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
              <Handshake className="w-3.5 h-3.5 text-muted-foreground" />
              Our Partners
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "xCloud",
                role: "Managed Hosting Partner",
                description: "One-click managed OpenClaw hosting with 24/7 support. Founded by M Asif Rahman.",
                url: "https://xcloud.host",
                color: "emerald" as const,
              },
              {
                name: "BoostedHost",
                role: "VPS Infrastructure Partner",
                description: "Turnkey pre-installed OpenClaw VPS. Zero-friction deployment with optimized configs.",
                url: "https://boostedhost.com",
                color: "blue" as const,
              },
              {
                name: "DigitalOcean",
                role: "Cloud Platform Partner",
                description: "Official 1-Click Deploy for OpenClaw. Enterprise-grade droplets with strong documentation.",
                url: "https://digitalocean.com",
                color: "indigo" as const,
              },
            ].map((partner) => {
              const colorClasses = {
                emerald: "from-emerald-50/50 to-white border-emerald-100/60 dark:from-emerald-950/20 dark:to-card dark:border-emerald-900/40",
                blue: "from-blue-50/50 to-white border-blue-100/60 dark:from-blue-950/20 dark:to-card dark:border-blue-900/40",
                indigo: "from-indigo-50/50 to-white border-indigo-100/60 dark:from-indigo-950/20 dark:to-card dark:border-indigo-900/40",
              };
              return (
                <a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer">
                  <Card className={cn("p-4 bg-gradient-to-br border shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group cursor-pointer dark:bg-card h-full", colorClasses[partner.color])}>
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-current opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity" />
                    <div className="flex items-center gap-2 mb-3 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-border/50 flex items-center justify-center dark:bg-card">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{partner.role}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">{partner.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{partner.description}</p>
                    <div className="flex items-center justify-end text-xs text-muted-foreground relative z-10">
                      <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] hover:bg-primary/5 -mr-2">
                        Visit <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Verified Directory
                 </h3>
                 <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">Skills</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Services</Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs">View All</Button>
                 </div>
              </div>
              
              <div className="bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">
                 {latestSubmissions.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-start md:items-center gap-4 p-4 border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors group cursor-pointer">
                       <div className="w-12 h-12 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0 border border-border/50">
                          {item.category === 'skill' ? <Box className="w-6 h-6 text-slate-600 dark:text-slate-400" /> : <Globe className="w-6 h-6 text-slate-600 dark:text-slate-400" />}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                             <h4 className="font-bold text-sm text-foreground group-hover:text-primary">{item.name}</h4>
                             <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-secondary border-border/50 font-mono text-muted-foreground">{item.subcategory}</Badge>
                             {item.badges.map((b, i) => (
                                <Badge key={i} variant="outline" className="text-[9px] h-5 px-1.5 gap-1 bg-white dark:bg-slate-900 dark:border-white/10">
                                  {b.icon && <b.icon className="w-2.5 h-2.5" />} {b.label}
                                </Badge>
                             ))}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                       </div>
                       <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
                          <AuditBadge level={item.auditLevel} />
                          <div className="text-[10px] text-muted-foreground font-mono">{item.downloads} installs</div>
                       </div>
                    </div>
                 ))}
                 <div className="p-2 bg-muted/20 text-center">
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground w-full h-8">Browse 400+ Verified Listings</Button>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <Card className="p-5 border-primary/10 shadow-sm bg-gradient-to-b from-white to-slate-50/50 dark:from-card dark:to-card/50 dark:border-border">
                 <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                    Security Badges
                 </h4>
                 <div className="space-y-3">
                    <div className="flex items-start gap-3">
                       <div className="p-1.5 rounded-md bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mt-0.5">
                          <Shield className="w-3.5 h-3.5" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-foreground">Gold Audit</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">Manual code review by OpenClaw Security Team.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="p-1.5 rounded-md bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 mt-0.5">
                          <Lock className="w-3.5 h-3.5" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-foreground">SOC2 Compliant</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">Infrastructure meets SOC2 Type II standards.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="p-1.5 rounded-md bg-slate-100/50 text-slate-700 dark:bg-slate-800 dark:text-slate-400 mt-0.5">
                          <CheckCircle className="w-3.5 h-3.5" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-foreground">Verified ID</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">Developer identity confirmed via GitHub/KYC.</p>
                       </div>
                    </div>
                 </div>
              </Card>

              <Card className="p-5 border-border shadow-sm bg-primary text-primary-foreground relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none" />
                 <h4 className="font-bold text-sm mb-2 flex items-center gap-2 relative z-10">
                    <Mail className="w-4 h-4" />
                    Security Alerts
                 </h4>
                 <p className="text-xs text-primary-foreground/80 mb-4 relative z-10">
                    Get weekly reports on new malicious skills and vulnerabilities.
                 </p>
                 <div className="space-y-2 relative z-10">
                    <Input placeholder="email@domain.com" className="h-8 text-xs bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30" />
                    <Button size="sm" className="w-full h-8 bg-white text-primary hover:bg-white/90 text-xs font-bold dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
                       Subscribe
                    </Button>
                 </div>
              </Card>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
           <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-destructive">
                   <AlertTriangle className="w-4 h-4" />
                   Active Threats
                 </h3>
                 <span className="text-[10px] font-mono text-muted-foreground">Updated hourly</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {threats.map(item => (
                    <div key={item.id} className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 flex items-start gap-3 hover:bg-destructive/10 transition-colors group cursor-pointer">
                       <div className="shrink-0 pt-0.5">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                       </div>
                       <div>
                          <div className="flex items-center gap-2 mb-0.5">
                             <h4 className="text-sm font-bold text-foreground">{item.name}</h4>
                             {item.threatLevel === 'critical' && <Badge variant="destructive" className="h-4 px-1 text-[9px]">CRITICAL</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1 leading-snug">{item.description}</p>
                          <p className="text-[10px] font-mono text-destructive/80 uppercase">Status: {item.malwareScan}</p>
                       </div>
                    </div>
                 ))}
                 <div className="bg-muted/30 border border-border border-dashed rounded-lg p-3 flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Report a suspicious skill</span>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Submit Report</Button>
                 </div>
              </div>
           </div>

           <div>
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
                   <Server className="w-4 h-4 text-slate-500" />
                   Top Providers
                 </h3>
              </div>
              <div className="bg-card border border-border/60 rounded-xl shadow-sm p-4 space-y-4">
                 {infrastructureProviders.map((prov, i) => (
                    <div key={prov.id} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors">
                       <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-muted-foreground w-3">{i + 1}</span>
                          <div>
                             <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{prov.name}</span>
                                {prov.badges[0] && (
                                   <span className="text-[8px] px-1 py-px rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold">{prov.badges[0].label}</span>
                                )}
                             </div>
                             <div className="text-[10px] text-muted-foreground">{prov.description} • {prov.downloads} Uptime</div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="flex items-center gap-0.5 text-xs font-medium text-foreground">
                             {prov.rating} <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          </div>
                       </div>
                    </div>
                 ))}
                 <Button variant="outline" size="sm" className="w-full text-xs h-8 mt-2">View Full Rankings</Button>
              </div>
           </div>

        </div>
        
        <div className="grid grid-cols-1 gap-6 pb-8">
           <Card className="p-6 border-border shadow-sm bg-primary text-primary-foreground relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                 <div className="space-y-2">
                    <h4 className="font-bold text-lg flex items-center justify-center md:justify-start gap-2">
                       <Newspaper className="w-5 h-5" />
                       Join our Clawful & Humorous Substack - The Daily Claw
                    </h4>
                    <p className="text-sm text-primary-foreground/80 max-w-xl">
                       Hilarious briefings including, the top 5 things <i>not</i> to do with your bot, and essential tips on how to look amazing with your claw (in public).
                    </p>
                 </div>
                 <Button 
                     size="lg" 
                     className="bg-white text-primary hover:bg-white/90 font-bold dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 shrink-0 px-8"
                     onClick={() => window.open('https://clawhub.substack.com/', '_blank')}
                 >
                    Read Now
                 </Button>
              </div>
           </Card>
        </div>

      </div>
    </Layout>
  );
}