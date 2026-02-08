"use client";

import { Layout } from "@/components/layout";
import { topScorers, latestSubmissions, communitySubmissions } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FullPageModal, ConfirmationModal } from "@/components/modals";
import { AuthDrawer } from "@/components/auth-drawer";
import { useState, useRef, useCallback, useMemo } from "react";
import { Shield, CheckCircle, ExternalLink, Calendar, AlertTriangle, ChevronRight, Zap, Globe, Server, Activity, ArrowUpRight, Mail, Box, Cloud, Search, Newspaper, Sparkles, Star, Terminal, Lock, Handshake, Bot, Phone, FileSearch, CalendarClock, Video, Code, Mic } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { FeaturedOfTheDayCard, FEATURED_OF_THE_DAY } from "@/features/featured";
import { SERVICE_CATEGORIES, ServiceRegistrationDrawer, ServiceCategoryCard } from "@/features/services";
import type { ServiceCategory } from "@/features/services";
import { AuditBadge, FeaturedCard, CompressedListRow } from "@/features/skills";
import { ThreatTicker } from "@/features/threats";
import { useServices, useFeaturedItems, usePartners, useProductivitySkills } from "@/hooks/use-homepage-data";


function ManagedClawBanner() {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowTooltip(true), 1500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 300);
  }, []);

  const handleTooltipEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleTooltipLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 300);
  }, []);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link href="/deploy" className="block py-3.5 px-5 rounded-xl bg-gradient-to-r from-yellow-500/10 via-amber-500/15 to-yellow-500/10 dark:from-yellow-500/5 dark:via-amber-500/10 dark:to-yellow-500/5 border border-yellow-500/30 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-300 group cursor-pointer relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 group-hover:via-yellow-400/10 transition-all duration-500" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="p-1.5 rounded-lg bg-yellow-500/15 dark:bg-yellow-500/10">
                <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
              </div>
              <span className="font-display font-bold text-sm text-foreground group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">High-powered Managed Claw</span>
              <ArrowUpRight className="w-4 h-4 text-yellow-600/60 dark:text-yellow-500/60 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              <span className="text-xs text-muted-foreground/70">Starting at <span className="font-semibold text-foreground/80">$79/month</span> <span className="italic">(Incl. $15 tokens)</span></span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground/70 hidden sm:block shrink-0 text-right leading-relaxed">We set it up and help you run it.<br /><span className="italic font-medium text-foreground/60">Make business simple with Clawd.bot</span></span>
        </div>
      </Link>

      <div
        className={cn(
          "absolute left-0 right-0 top-full mt-2 z-50 transition-all duration-300 origin-top",
          showTooltip ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
        )}
        onMouseEnter={handleTooltipEnter}
        onMouseLeave={handleTooltipLeave}
      >
        <Card className="p-4 shadow-2xl border-yellow-500/30 bg-gradient-to-br from-card via-card to-yellow-500/5 dark:to-yellow-500/3 backdrop-blur-md cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-500/20">
              <Bot className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">Business Automation on Steroids</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-3 relative z-10">
            {[
              { icon: Phone, text: "Handle research calls, texting, and recommended outreach" },
              { icon: Mail, text: "Email outreach and rep replies on your behalf" },
              { icon: FileSearch, text: "Find information, scrape from sites, suggest meeting times" },
              { icon: Sparkles, text: "Learn new skills, create videos, program on the go" },
              { icon: CalendarClock, text: "Manage your schedule and create a schedule for your bot" },
              { icon: Video, text: "Generate content, reports, and presentations automatically" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 py-1">
                <item.icon className="w-3.5 h-3.5 text-yellow-600/60 dark:text-yellow-500/50 mt-0.5 shrink-0" />
                <span className="text-[11px] text-muted-foreground leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-yellow-500/20 flex items-center justify-between relative z-10">
            <span className="text-[11px] text-muted-foreground italic">All with the managed, gold service package.</span>
            <Link href="/deploy">
              <Button size="sm" className="h-8 px-4 text-[11px] font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all">
                Get Started <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
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

  const { data: dbServices } = useServices();
  const { data: dbFeatured } = useFeaturedItems();
  const { data: dbPartners } = usePartners();
  const { data: dbProductivitySkills } = useProductivitySkills();

  const serviceCategories = useMemo(() => {
    if (!dbServices || !Array.isArray(dbServices) || dbServices.length === 0) return SERVICE_CATEGORIES;
    const grouped: Record<string, Array<{ name: string; url: string; handle?: string; slug?: string; rating: number; popularity: number }>> = {};
    for (const svc of dbServices) {
      if (!svc.isActive) continue;
      const catSlug = svc.categorySlug || svc.category;
      if (!grouped[catSlug]) grouped[catSlug] = [];
      grouped[catSlug].push({
        name: svc.name.replace(/ (VPS|Setup|Installation|Droplet|Cloud Compute|Managed Hosting|Consulting|Partnership|Open Source|Billing|Payments|Install Guide|Official Docs)$/i, "").replace(/ (Service|Platform)$/i, ""),
        url: svc.url || "#",
        handle: svc.providerHandle,
        slug: svc.slug || undefined,
        rating: (svc.rating || 40) / 10,
        popularity: svc.popularity || 5,
      });
    }
    return SERVICE_CATEGORIES.map((cat) => ({
      ...cat,
      providers: grouped[cat.categorySlug || cat.id] || cat.providers || [],
    }));
  }, [dbServices]);

  const featuredData = useMemo(() => {
    if (!dbFeatured || !Array.isArray(dbFeatured) || dbFeatured.length === 0) return null;
    const map: Record<string, any> = {};
    for (const item of dbFeatured) {
      map[item.type] = item;
    }
    return map;
  }, [dbFeatured]);

  const vpsServices = useMemo(() => {
    if (!dbServices || !Array.isArray(dbServices)) return null;
    return dbServices
      .filter((s: any) => (s.categorySlug === "devops-cloud" || s.category === "managed_hosting") && s.isActive)
      .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);
  }, [dbServices]);

  const partners = useMemo(() => {
    if (!dbPartners || !Array.isArray(dbPartners) || dbPartners.length === 0) return null;
    return dbPartners;
  }, [dbPartners]);

  const productivitySkills = useMemo(() => {
    if (!dbProductivitySkills || !Array.isArray(dbProductivitySkills) || dbProductivitySkills.length === 0) return null;
    return dbProductivitySkills.sort((a: any, b: any) => (b.downloads || 0) - (a.downloads || 0)).slice(0, 5);
  }, [dbProductivitySkills]);

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
              
            </div>

            <Link href="/deploy" className="hidden lg:block relative cursor-pointer group">
               <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
               <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-xl p-6 shadow-xl shadow-muted/50 dark:shadow-none group-hover:border-amber-500/30 transition-colors" data-testid="hero-vps-pitch">
                  <div className="relative rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-border/40 p-5 cursor-pointer transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 hover:scale-[1.01]">
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08),transparent_70%)]" />
                     <div className="relative flex items-center justify-center gap-4">
                        <img
                           src="/images/openclaw-logo.png"
                           alt="OpenClaw"
                           className="w-14 h-14 object-contain drop-shadow-lg"
                        />
                        <div className="flex flex-col items-center gap-0.5">
                           <span className="text-amber-400 text-lg font-bold">+</span>
                           <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                        </div>
                        <img
                           src="/images/n8n-logo.png"
                           alt="n8n"
                           className="w-14 h-14 object-contain drop-shadow-lg"
                        />
                     </div>
                     <h3 className="text-center text-sm font-bold text-white mt-3 drop-shadow-md">
                        OpenClaw + n8n on VPS
                     </h3>
                  </div>

                  <div className="space-y-4">
                     <p className="text-xs text-muted-foreground leading-relaxed cursor-pointer transition-all duration-300 hover:text-foreground/80">
                        Have Claw setup and manage your workplace automations. Preinstalled, preconfigured, ready to go.
                     </p>

                     <div className="p-3 rounded-lg bg-gradient-to-r from-amber-50/50 to-emerald-50/30 dark:from-amber-950/15 dark:to-emerald-950/10 border border-amber-200/30 dark:border-amber-800/15 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:border-amber-300/40 dark:hover:border-amber-700/25 hover:shadow-sm">
                        <p className="text-[13px] italic text-foreground/90 leading-relaxed mb-1.5">
                           &ldquo;...the ultimate productivity hack&rdquo;
                        </p>
                        <p className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                           &mdash; Jason Goldberg
                        </p>
                     </div>

                     <div className="flex items-center justify-between pt-1 px-0.5 cursor-pointer">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground transition-all duration-300 hover:text-emerald-500">
                           <Cloud className="w-3 h-3 text-emerald-500" />
                           <span>VPS Hosted</span>
                        </div>
                        <div className="h-3 w-px bg-border" />
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground transition-all duration-300 hover:text-amber-500">
                           <Bot className="w-3 h-3 text-amber-500" />
                           <span>OpenClaw + n8n</span>
                        </div>
                        <div className="h-3 w-px bg-border" />
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground transition-all duration-300 hover:text-blue-500">
                           <Zap className="w-3 h-3 text-blue-500" />
                           <span>1-Click</span>
                        </div>
                     </div>
                  </div>
               </div>
            </Link>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories.map((cat) => (
              <ServiceCategoryCard key={cat.id} category={cat} />
            ))}
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
              name={featuredData?.hero?.name || FEATURED_OF_THE_DAY.hero.handle}
              description={featuredData?.hero?.description || FEATURED_OF_THE_DAY.hero.description}
              href={featuredData?.hero?.href || `https://github.com/${FEATURED_OF_THE_DAY.hero.handle}`}
              imageUrl={featuredData?.hero?.imageUrl || FEATURED_OF_THE_DAY.hero.imageUrl}
              sourceUrl={featuredData?.hero?.sourceUrl || FEATURED_OF_THE_DAY.hero.sourceUrl}
              isVerified={featuredData?.hero?.isVerified ?? FEATURED_OF_THE_DAY.hero.isVerified}
            />
            <FeaturedOfTheDayCard
              type="app"
              title="Claw App"
              subtitle="of the Day"
              name={featuredData?.app?.name || FEATURED_OF_THE_DAY.app.name}
              description={featuredData?.app?.description || FEATURED_OF_THE_DAY.app.description}
              href={featuredData?.app?.href || FEATURED_OF_THE_DAY.app.sourceUrl || `/apps/${FEATURED_OF_THE_DAY.app.slug}`}
              imageUrl={featuredData?.app?.imageUrl || FEATURED_OF_THE_DAY.app.imageUrl}
              sourceUrl={featuredData?.app?.sourceUrl || FEATURED_OF_THE_DAY.app.sourceUrl}
              isVerified={featuredData?.app?.isVerified ?? FEATURED_OF_THE_DAY.app.isVerified}
            />
            <FeaturedOfTheDayCard
              type="skill"
              title="Skill"
              subtitle="of the Day"
              name={featuredData?.skill?.name || FEATURED_OF_THE_DAY.skill.name}
              description={featuredData?.skill?.description || FEATURED_OF_THE_DAY.skill.description}
              href={featuredData?.skill?.href || `/${FEATURED_OF_THE_DAY.skill.author}/${FEATURED_OF_THE_DAY.skill.slug}`}
              imageUrl={featuredData?.skill?.imageUrl || FEATURED_OF_THE_DAY.skill.imageUrl}
              isVerified={featuredData?.skill?.isVerified ?? FEATURED_OF_THE_DAY.skill.isVerified}
            />
            <FeaturedOfTheDayCard
              type="service"
              title="Service"
              subtitle="of the Day"
              name={featuredData?.service?.name || FEATURED_OF_THE_DAY.service.name}
              description={featuredData?.service?.description || FEATURED_OF_THE_DAY.service.description}
              href={featuredData?.service?.href || FEATURED_OF_THE_DAY.service.website}
              imageUrl={featuredData?.service?.imageUrl || FEATURED_OF_THE_DAY.service.imageUrl}
              sourceUrl={featuredData?.service?.sourceUrl || FEATURED_OF_THE_DAY.service.sourceUrl}
              isVerified={featuredData?.service?.isVerified ?? FEATURED_OF_THE_DAY.service.isVerified}
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
                    {(vpsServices || [
                      { name: "BoostedHost VPS", description: "Turnkey pre-installed setup", rating: 49, pricingLabel: "Custom", providerHandle: "boostedhost" },
                      { name: "DigitalOcean Droplet", description: "Official 1-Click Deploy", rating: 47, pricingLabel: "From $6/mo", providerHandle: "digitalocean" },
                      { name: "Hostinger VPS", description: "Best budget option", rating: 45, pricingLabel: "From $5/mo", providerHandle: "hostinger" },
                      { name: "Vultr Cloud Compute", description: "DIY flexibility, great pricing", rating: 44, pricingLabel: "From $6/mo", providerHandle: "vultr" },
                      { name: "Linode VPS", description: "Best raw performance", rating: 43, pricingLabel: "From $5/mo", providerHandle: "linode" },
                    ]).map((vps: any, i: number) => (
                      <Link key={vps.name} href={vps.providerHandle && vps.slug ? `/${vps.providerHandle}/${vps.slug}` : vps.providerHandle ? `/${vps.providerHandle}` : "#"} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0 hover:bg-muted/30 px-2 rounded-sm transition-colors group cursor-pointer" data-testid={`vps-row-${i}`}>
                        <span className="w-4 text-xs font-mono text-muted-foreground text-center">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors">{vps.name.replace(/ (VPS|Droplet|Cloud Compute|Managed Hosting)$/i, "")}</span>
                            <span className="text-[10px] text-muted-foreground/70">{vps.pricingLabel || "Custom"}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{vps.description}</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 shrink-0">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {((vps.rating || 40) / 10).toFixed(1)}
                        </div>
                      </Link>
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
                    {(productivitySkills || [
                      { name: "GitHub", authorUsername: "steipete", downloads: 7504, stars: 14, description: "Issues, PRs, CI runs, and advanced queries via gh CLI", slug: "github" },
                      { name: "Home Assistant", authorUsername: "dbhurley", downloads: 4602, stars: 26, description: "Smart plugs, lights, scenes, automations — full smart home control", slug: "home-assistant" },
                      { name: "CalDAV Calendar", authorUsername: "Asleep123", downloads: 3658, stars: 4, description: "Sync iCloud, Google, Fastmail, Nextcloud calendars on Linux", slug: "caldav-calendar" },
                      { name: "Notion", authorUsername: "steipete", downloads: 3430, stars: 11, description: "Create and manage pages, databases, and blocks via Notion API", slug: "notion" },
                      { name: "Email", authorUsername: "0xterrybit", downloads: 3120, stars: 8, description: "Send, read, search, and organize emails across multiple providers", slug: "email" },
                    ]).map((skill: any, i: number) => (
                      <Link key={skill.name} href={`/${skill.authorUsername}/${skill.slug}`} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0 hover:bg-muted/30 px-2 rounded-sm transition-colors group cursor-pointer" data-testid={`productivity-skill-${i}`}>
                        <span className="w-4 text-xs font-mono text-muted-foreground text-center">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
                            <span className="text-[10px] text-muted-foreground/60">{(skill.downloads || 0).toLocaleString()} downloads</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{skill.description}</div>
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
            {(partners || [
              { displayName: "xCloud", partnerRole: "Managed Hosting Partner", description: "One-click managed OpenClaw hosting with 24/7 support. Founded by M Asif Rahman.", website: "https://xcloud.host" },
              { displayName: "BoostedHost", partnerRole: "VPS Infrastructure Partner", description: "Turnkey pre-installed OpenClaw VPS. Zero-friction deployment with optimized configs.", website: "https://boostedhost.com" },
              { displayName: "DigitalOcean", partnerRole: "Cloud Platform Partner", description: "Official 1-Click Deploy for OpenClaw. Enterprise-grade droplets with strong documentation.", website: "https://digitalocean.com" },
            ]).map((partner: any, idx: number) => {
              const colorOptions = ["emerald", "blue", "indigo"] as const;
              const color = colorOptions[idx % colorOptions.length];
              const colorClasses = {
                emerald: "from-emerald-50/50 to-white border-emerald-100/60 dark:from-emerald-950/20 dark:to-card dark:border-emerald-900/40",
                blue: "from-blue-50/50 to-white border-blue-100/60 dark:from-blue-950/20 dark:to-card dark:border-blue-900/40",
                indigo: "from-indigo-50/50 to-white border-indigo-100/60 dark:from-indigo-950/20 dark:to-card dark:border-indigo-900/40",
              };
              return (
                <a key={partner.displayName || partner.handle} href={partner.website || "#"} target="_blank" rel="noopener noreferrer" data-testid={`partner-card-${idx}`}>
                  <Card className={cn("p-4 bg-gradient-to-br border shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group cursor-pointer dark:bg-card h-full", colorClasses[color])}>
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-current opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity" />
                    <div className="flex items-center gap-2 mb-3 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-border/50 flex items-center justify-center dark:bg-card">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{partner.partnerRole || "Partner"}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">{partner.displayName}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{partner.description || partner.tagline}</p>
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
                    <Zap className="w-5 h-5 text-primary" />
                    Top Business Skills
                 </h3>
                 <a href="https://clawhub.ai/skills" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 cursor-pointer" data-testid="link-clawhub-browse">
                      Browse All on ClawHub <ExternalLink className="w-3 h-3" />
                    </Button>
                 </a>
              </div>
              
              <div className="bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">
                 {latestSubmissions.slice(0, 6).map((item) => (
                    <a key={item.id} href={item.url || "https://clawhub.ai/skills"} target="_blank" rel="noopener noreferrer" className="flex items-start md:items-center gap-4 p-4 border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors group cursor-pointer" data-testid={`skill-row-${item.id}`}>
                       <div className="w-12 h-12 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0 border border-border/50">
                          <Box className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                             <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{item.name}</h4>
                             <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-secondary border-border/50 font-mono text-muted-foreground">{item.subcategory}</Badge>
                             {item.badges.map((b, i) => (
                                <Badge key={i} variant="outline" className="text-[9px] h-5 px-1.5 gap-1 bg-white dark:bg-slate-900 dark:border-white/10">
                                  {b.icon && <b.icon className="w-2.5 h-2.5" />} {b.label}
                                </Badge>
                             ))}
                             <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                       </div>
                       <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
                          <AuditBadge level={item.auditLevel} />
                          <div className="text-[10px] text-muted-foreground font-mono">{item.downloads} installs</div>
                       </div>
                    </a>
                 ))}
                 <div className="p-2 bg-muted/20 text-center">
                    <a href="https://clawhub.ai/skills" target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground w-full h-8 gap-1 cursor-pointer" data-testid="link-clawhub-browse-all">
                        Browse 5,700+ Skills on ClawHub <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                 </div>
              </div>
           </div>

           <div>
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
                   <Mic className="w-4 h-4 text-slate-500" />
                   Top Claw Voices
                 </h3>
              </div>
              <div className="bg-card border border-border/60 rounded-xl shadow-sm p-4 space-y-3">
                 {[
                   { handle: "steipete", name: "Peter Steinberger", blurb: "Creator of OpenClaw. Vibe-coding pioneer.", url: "https://x.com/steipete" },
                   { handle: "mitsuhiko", name: "Armin Ronacher", blurb: "Flask creator. Core OpenClaw contributor.", url: "https://x.com/mitsuhiko" },
                   { handle: "shanselman", name: "Scott Hanselman", blurb: "VP Dev Community @ Microsoft. OpenClaw contributor.", url: "https://x.com/shanselman" },
                   { handle: "MattPRD", name: "Matt Schlicht", blurb: "Built Moltbook. AI-only social network creator.", url: "https://x.com/MattPRD" },
                   { handle: "dguido", name: "Dan Guido", blurb: "Trail of Bits CEO. OpenClaw security advisor.", url: "https://x.com/dguido" },
                   { handle: "simecek", name: "Petr Simecek", blurb: "Keboola co-founder. Core contributor.", url: "https://x.com/simecek" },
                 ].map((voice, i) => (
                    <a key={voice.handle} href={voice.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors" data-testid={`voice-${voice.handle}`}>
                       <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-muted-foreground w-3">{i + 1}</span>
                          <div>
                             <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{voice.name}</span>
                             </div>
                             <div className="text-[10px] text-muted-foreground">@{voice.handle} · {voice.blurb}</div>
                          </div>
                       </div>
                       <div className="text-right">
                          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                       </div>
                    </a>
                 ))}
                 <Button variant="outline" size="sm" className="w-full text-xs h-8 mt-2" onClick={() => window.open('https://x.com/openclaw', '_blank')}>Follow @openclaw</Button>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
           <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-amber-600 dark:text-amber-400">
                   <Sparkles className="w-4 h-4" />
                   Community Submitted
                 </h3>
                 <span className="text-[10px] font-mono text-muted-foreground">Latest from the community</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {communitySubmissions.map(item => (
                    <div key={item.id} className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/40 dark:border-amber-800/20 rounded-lg p-3 flex items-start gap-3 hover:bg-amber-100/50 dark:hover:bg-amber-950/20 transition-colors group cursor-pointer" data-testid={`community-submission-${item.id}`}>
                       <div className="shrink-0 pt-0.5">
                          <Box className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                       </div>
                       <div>
                          <div className="flex items-center gap-2 mb-0.5">
                             <h4 className="text-sm font-bold text-foreground">{item.name}</h4>
                             <span className="text-[10px] px-1.5 py-px rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium">{item.subcategory}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1 leading-snug">{item.description}</p>
                          <p className="text-[10px] font-mono text-muted-foreground/70">by {item.author}</p>
                       </div>
                    </div>
                 ))}
                 <div className="bg-muted/30 border border-border border-dashed rounded-lg p-3 flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Submit a service/skill</span>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setShowServiceDrawer(true)} data-testid="submit-service-skill-btn">Submit a service/skill</Button>
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