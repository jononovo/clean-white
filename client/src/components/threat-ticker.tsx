import { useState, useEffect } from "react";
import { Shield, ExternalLink, AlertTriangle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const THREAT_ALERTS = [
  {
    id: "cve-2026-25253",
    severity: "CRITICAL",
    label: "CVE-2026-25253",
    title: "1-Click RCE via WebSocket token hijack in OpenClaw Gateway",
    detail: "Cross-site WebSocket hijacking allows full gateway compromise. Visiting a malicious page exfiltrates auth tokens.",
    source: "DepthFirst / The Hacker News",
    date: "Feb 3, 2026",
    cvss: "8.8",
    link: "https://thehackernews.com",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20"
  },
  {
    id: "clawhavoc-341",
    severity: "HIGH",
    label: "ClawHavoc",
    title: "341 malicious skills discovered on ClawHub stealing credentials",
    detail: "Koi Security audit found 335 skills deploying Atomic Stealer (AMOS) malware via fake prerequisites.",
    source: "Koi Security",
    date: "Feb 4, 2026",
    cvss: null,
    link: "https://thehackernews.com",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
  {
    id: "supply-chain-400",
    severity: "HIGH",
    label: "Supply Chain",
    title: "400+ malware packages targeting OpenClaw crypto traders",
    detail: "Coordinated campaign published 386 malicious skills disguised as crypto trading tools sharing C2 infrastructure.",
    source: "OpenSourceMalware",
    date: "Feb 2, 2026",
    cvss: null,
    link: "#",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
  {
    id: "cisco-elon-skill",
    severity: "CRITICAL",
    label: "Skill Exploit",
    title: '"What Would Elon Do?" skill contained 9 vulnerabilities',
    detail: "Cisco AI Defense found the #1-ranked skill was malware: silent data exfiltration + prompt injection.",
    source: "Cisco AI Threat Research",
    date: "Jan 30, 2026",
    cvss: null,
    link: "#",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20"
  },
  {
    id: "cve-2026-21636",
    severity: "HIGH",
    label: "CVE-2026-21636",
    title: "Permission model bypass vulnerability in Node.js runtime",
    detail: "Security patch required: Node.js 22.12.0+ needed to prevent permission model bypass.",
    source: "OpenClaw Security Advisory",
    date: "Jan 2026",
    cvss: null,
    link: "#",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
];

const CYCLE_INTERVAL = 600000; // 10 minutes

export function ThreatTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      cycleNext();
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const cycleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % THREAT_ALERTS.length);
      setIsTransitioning(false);
    }, 400);
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 200);
  };

  const threat = THREAT_ALERTS[currentIndex];

  return (
    <div className="relative rounded-lg border border-border bg-card/30 p-3 transition-colors duration-500 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
           Latest Intercept
        </span>
        
        {/* Dots */}
        <div className="flex items-center gap-1.5">
           {THREAT_ALERTS.map((_, i) => (
             <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === currentIndex ? "w-3 bg-foreground/40" : "w-1 bg-border hover:bg-muted-foreground/30"
                )}
                aria-label={`View threat ${i + 1}`}
             />
           ))}
        </div>
      </div>

      {/* Content */}
      <div 
         className={cn(
           "transition-all duration-500 ease-in-out",
           isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
         )}
      >
        <div className="flex items-start gap-2 mb-2">
           <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground" />
           <div>
             <h4 className="text-xs font-medium text-foreground leading-tight mb-1">
               <span className="font-bold mr-1.5">{threat.label}:</span>
               {threat.title}
             </h4>
             <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-1">
               {threat.detail}
             </p>
           </div>
        </div>

        <div className="flex items-center justify-between pt-2 mt-1 border-t border-border/30">
           <div className="flex items-center gap-2">
              <div className={cn("flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border", threat.bgColor, threat.color, threat.borderColor)}>
                 <div className="w-1 h-1 rounded-full bg-current" />
                 {threat.severity}
              </div>
              {threat.cvss && (
                <span className="text-[9px] text-muted-foreground font-mono">CVSS {threat.cvss}</span>
              )}
           </div>

           <a 
             href={threat.link}
             target="_blank" 
             rel="noopener noreferrer"
             className="text-[9px] font-medium flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
           >
             View Advisory <ExternalLink className="w-2.5 h-2.5" />
           </a>
        </div>
      </div>
    </div>
  );
}
