"use client";

import { useState, useEffect } from "react";
import { Shield, ExternalLink, AlertTriangle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { THREAT_ALERTS } from "@/lib/mock-data";

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
        <div className="flex items-center gap-0.5">
           {THREAT_ALERTS.map((_, i) => (
             <button
                key={i}
                onClick={() => handleDotClick(i)}
                className="p-1.5 cursor-pointer group"
                aria-label={`View threat ${i + 1}`}
             >
                <div className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentIndex ? "w-4 bg-foreground/60" : "w-1.5 bg-border group-hover:bg-muted-foreground/50"
                )} />
             </button>
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
