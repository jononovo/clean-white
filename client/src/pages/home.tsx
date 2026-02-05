import { Layout } from "@/components/layout";
import { topScorers, latestSubmissions, threats, infrastructureProviders, Listing } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, Download, ExternalLink, Calendar, Star, AlertTriangle, Terminal, Lock, ChevronRight, Zap, Globe, Server, Activity, ArrowUpRight, Mail, Box, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const AuditBadge = ({ level }: { level: Listing["auditLevel"] }) => {
  if (level === "none") return <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Unverified</span>;
  
  const colors = {
    gold: "bg-amber-100/50 text-amber-800 border-amber-200/60 shadow-[0_0_10px_-3px_rgba(251,191,36,0.4)]",
    silver: "bg-slate-100/50 text-slate-700 border-slate-200/60",
    bronze: "bg-orange-50/50 text-orange-700 border-orange-200/60",
  };

  return (
    <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider", colors[level])}>
      {level === 'gold' && <Lock className="w-2.5 h-2.5" />}
      {level}
    </div>
  );
};

// Compact List Row
const CompressedListRow = ({ item, rank }: { item: Listing, rank?: number }) => (
  <div className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0 hover:bg-muted/30 px-2 rounded-sm transition-colors group cursor-pointer">
    {rank && (
      <span className="w-4 text-xs font-mono text-muted-foreground text-center">{rank}</span>
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors">{item.name}</span>
        <AuditBadge level={item.auditLevel} />
      </div>
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
         <span>v{item.version}</span>
         <span className="w-0.5 h-0.5 rounded-full bg-border" />
         <span>{item.author}</span>
      </div>
    </div>
    <div className="text-right shrink-0">
      {item.rating ? (
         <div className="flex items-center justify-end gap-1 text-xs font-medium text-emerald-700">
            <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
            {item.rating}
         </div>
      ) : (
        <div className="text-[10px] font-mono text-muted-foreground">{item.updated}</div>
      )}
    </div>
  </div>
);

// Featured Card for Row 1
const FeaturedCard = ({ item, color = "emerald" }: { item: Listing, color?: "emerald" | "blue" | "indigo" }) => {
  const colors = {
    emerald: "from-emerald-50/50 to-white border-emerald-100/60",
    blue: "from-blue-50/50 to-white border-blue-100/60",
    indigo: "from-indigo-50/50 to-white border-indigo-100/60",
  };

  return (
    <Card className={cn("p-4 bg-gradient-to-br border shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group", colors[color])}>
       <div className="absolute -right-6 -top-6 w-24 h-24 bg-current opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity" />
       
       <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-border/50 flex items-center justify-center">
             {item.category === 'service' ? <Cloud className="w-5 h-5 text-muted-foreground" /> : <Terminal className="w-5 h-5 text-muted-foreground" />}
          </div>
          <AuditBadge level={item.auditLevel} />
       </div>
       
       <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
       <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
       
       <div className="flex items-center justify-between text-xs text-muted-foreground relative z-10">
          <span className="flex items-center gap-1 font-medium text-foreground/80">
            <Download className="w-3 h-3" /> {item.downloads}
          </span>
          <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] hover:bg-primary/5 -mr-2">
            View <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
       </div>
    </Card>
  )
}


export default function Home() {
  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Area: Compact Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-border/40">
           {/* Left: Latest Submissions */}
           <div>
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   Live Feed
                 </h3>
                 <span className="text-[10px] font-mono text-muted-foreground">Real-time</span>
              </div>
              <div className="bg-white/50 border border-border/60 rounded-lg p-3 shadow-sm backdrop-blur-sm">
                 <div className="max-h-[180px] overflow-y-auto pr-2 space-y-0.5 custom-scrollbar">
                    {latestSubmissions.map(item => (
                       <CompressedListRow key={item.id} item={item} />
                    ))}
                 </div>
              </div>
           </div>

           {/* Right: Top Scorers */}
           <div>
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
                   <Star className="w-3.5 h-3.5 text-amber-500" />
                   Highest Rated
                 </h3>
                 <a href="#" className="text-[10px] font-medium text-primary hover:underline">View All</a>
              </div>
              <div className="bg-white/50 border border-border/60 rounded-lg p-3 shadow-sm backdrop-blur-sm">
                 <div className="max-h-[180px] overflow-y-auto pr-2 space-y-0.5 custom-scrollbar">
                    {topScorers.map((item, i) => (
                       <CompressedListRow key={item.id} item={item} rank={i + 1} />
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Row 1: 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <FeaturedCard item={topScorers[0]} color="emerald" />
           <FeaturedCard item={topScorers[1]} color="blue" />
           <FeaturedCard item={topScorers[2]} color="indigo" />
        </div>

        {/* Row 2: 2/3 Detail List & 1/3 Badges/Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* 2/3 Detail List */}
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
                 {latestSubmissions.slice(0, 4).map((item, i) => (
                    <div key={item.id} className="flex items-start md:items-center gap-4 p-4 border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors group">
                       <div className="w-12 h-12 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0 border border-border/50">
                          {item.category === 'skill' ? <Box className="w-6 h-6 text-slate-600" /> : <Globe className="w-6 h-6 text-slate-600" />}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                             <h4 className="font-bold text-sm text-foreground group-hover:text-primary">{item.name}</h4>
                             <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-secondary border-border/50 font-mono text-muted-foreground">{item.subcategory}</Badge>
                             {item.badges.map((b, i) => (
                                <Badge key={i} variant="outline" className="text-[9px] h-5 px-1.5 gap-1 bg-white">
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

           {/* 1/3 Badges & Newsletter */}
           <div className="space-y-6">
              {/* Badge Legend */}
              <Card className="p-5 border-primary/10 shadow-sm bg-gradient-to-b from-white to-slate-50/50">
                 <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    Security Badges
                 </h4>
                 <div className="space-y-3">
                    <div className="flex items-start gap-3">
                       <div className="p-1.5 rounded-md bg-emerald-100/50 text-emerald-700 mt-0.5">
                          <Shield className="w-3.5 h-3.5" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-foreground">Gold Audit</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">Manual code review by OpenClaw Security Team.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="p-1.5 rounded-md bg-amber-100/50 text-amber-700 mt-0.5">
                          <Lock className="w-3.5 h-3.5" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-foreground">SOC2 Compliant</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">Infrastructure meets SOC2 Type II standards.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="p-1.5 rounded-md bg-slate-100/50 text-slate-700 mt-0.5">
                          <CheckCircle className="w-3.5 h-3.5" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-foreground">Verified ID</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">Developer identity confirmed via GitHub/KYC.</p>
                       </div>
                    </div>
                 </div>
              </Card>

              {/* Newsletter */}
              <Card className="p-5 border-border shadow-sm bg-primary text-primary-foreground relative overflow-hidden">
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
                    <Button size="sm" className="w-full h-8 bg-white text-primary hover:bg-white/90 text-xs font-bold">
                       Subscribe
                    </Button>
                 </div>
              </Card>
           </div>
        </div>

        {/* Row 3: Threats & Infrastructure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
           
           {/* 2/3 Latest Threats */}
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
                    <div key={item.id} className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 flex items-start gap-3 hover:bg-destructive/10 transition-colors cursor-default">
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

           {/* 1/3 Infrastructure */}
           <div>
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-foreground/80">
                   <Server className="w-4 h-4 text-slate-500" />
                   Top Providers
                 </h3>
              </div>
              <div className="bg-card border border-border/60 rounded-xl shadow-sm p-4 space-y-4">
                 {infrastructureProviders.map((prov, i) => (
                    <div key={prov.id} className="flex items-center justify-between group">
                       <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-muted-foreground w-3">{i + 1}</span>
                          <div>
                             <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{prov.name}</span>
                                {prov.badges[0] && (
                                   <span className="text-[8px] px-1 py-px rounded bg-emerald-100 text-emerald-800 font-bold">{prov.badges[0].label}</span>
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

      </div>
    </Layout>
  );
}
