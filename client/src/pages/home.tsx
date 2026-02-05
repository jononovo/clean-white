import { Layout } from "@/components/layout";
import { listings, Listing } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, Download, ExternalLink, Calendar, Star, AlertTriangle, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const AuditBadge = ({ level }: { level: Listing["auditLevel"] }) => {
  if (level === "none") return <span className="text-xs text-muted-foreground">Not Audited</span>;
  
  const colors = {
    gold: "bg-amber-100 text-amber-800 border-amber-200",
    silver: "bg-slate-100 text-slate-700 border-slate-200",
    bronze: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide", colors[level])}>
      <Shield className="w-3 h-3" />
      {level} Audit
    </div>
  );
};

const ListingRow = ({ item }: { item: Listing }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 border-border/60 hover:border-primary/20 group bg-white">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
            {item.category === 'service' ? <CloudIcon /> : item.category === 'sdk' ? <TerminalIcon /> : <BoxIcon />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
              <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-mono text-muted-foreground bg-secondary/50">v{item.version}</Badge>
              {item.badges.map((b, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className={cn(
                    "h-5 text-[10px] gap-1 px-1.5 border-transparent",
                    b.type === 'success' && "bg-emerald-50 text-emerald-700",
                    b.type === 'warning' && "bg-amber-50 text-amber-700",
                    b.type === 'neutral' && "bg-slate-50 text-slate-700"
                  )}
                >
                  {b.icon && <b.icon className="w-3 h-3" />}
                  {b.label}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
               <span className="flex items-center gap-1">
                 <span className="font-medium text-foreground">{item.author}</span>
               </span>
               <span className="w-1 h-1 rounded-full bg-border" />
               <span className="flex items-center gap-1">
                 <Download className="w-3 h-3" /> {item.downloads}
               </span>
               <span className="w-1 h-1 rounded-full bg-border" />
               <span className="flex items-center gap-1">
                 <Calendar className="w-3 h-3" /> {item.updated}
               </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2 w-full sm:w-auto mt-2 sm:mt-0 pl-14 sm:pl-0">
          <AuditBadge level={item.auditLevel} />
          
          <div className="flex items-center gap-2">
             <Button size="sm" variant="outline" className="h-8 text-xs font-mono group-hover:border-primary/30">
               npx install {item.name}
             </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Icons helper
const BoxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)
const CloudIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary">
    <path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19" />
    <path d="M20 16.2V19h-2.5" />
    <path d="M4 16.2V19h2.5" />
    <path d="M12 5a3 3 0 1 0-3 3" />
  </svg>
)
const TerminalIcon = () => (
  <Terminal className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
)


export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Hero / Welcome */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/50">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">Secure Directory</h2>
            <p className="text-muted-foreground mt-1 text-lg">
              The audited registry for OpenClaw skills, services, and SDKs.
            </p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="gap-2">
               <ExternalLink className="w-4 h-4" />
               Submit for Audit
             </Button>
             <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-emerald-900/10 shadow-lg">
               <Shield className="w-4 h-4" />
               Get Verified
             </Button>
          </div>
        </div>

        {/* Featured / Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="p-5 bg-gradient-to-br from-emerald-50 to-white border-emerald-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield className="w-24 h-24 text-emerald-600" />
              </div>
              <div className="relative z-10">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Recommended Service
                </div>
                <h3 className="font-display font-bold text-xl mb-1">Managed Claw Cloud</h3>
                <p className="text-sm text-slate-600 mb-4">Enterprise-grade hosting with SOC2 compliance.</p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white border-none w-full">View Service</Button>
              </div>
           </Card>

           <Card className="p-5 bg-white shadow-sm border-border/60">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Top Trending Skill</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center text-white">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="font-bold">research-agent-pro</h3>
                   <div className="text-xs text-muted-foreground">v2.4.0 • 12k installs</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Autonomous web research with citation generation and fact-checking built-in.</p>
              <Button size="sm" variant="outline" className="w-full">Inspect Code</Button>
           </Card>
           
           <Card className="p-5 bg-white shadow-sm border-border/60 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="font-bold mb-1">Safety First</h3>
              <p className="text-sm text-muted-foreground mb-3">We scan every version for malware.</p>
              <a href="#" className="text-xs font-medium text-primary hover:underline">Read our Audit Policy</a>
           </Card>
        </div>

        {/* Main List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg">Latest Listings</h3>
            <div className="flex gap-2">
              <select className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option>Sort by: Recommended</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Downloads</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-3">
            {listings.map((item) => (
              <ListingRow key={item.id} item={item} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
             <Button variant="ghost" className="text-muted-foreground">Load more listings...</Button>
          </div>
        </div>

      </div>
    </Layout>
  );
}
