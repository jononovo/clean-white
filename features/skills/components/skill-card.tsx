import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Cloud, Download, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuditBadge } from "./audit-badge";
import type { Listing } from "@/lib/mock-data";

type CardColor = "emerald" | "blue" | "indigo";

interface FeaturedCardProps {
  item: Listing;
  color?: CardColor;
}

const colorClasses: Record<CardColor, string> = {
  emerald: "from-emerald-50/50 to-white border-emerald-100/60 dark:from-emerald-950/20 dark:to-card dark:border-emerald-900/40",
  blue: "from-blue-50/50 to-white border-blue-100/60 dark:from-blue-950/20 dark:to-card dark:border-blue-900/40",
  indigo: "from-indigo-50/50 to-white border-indigo-100/60 dark:from-indigo-950/20 dark:to-card dark:border-indigo-900/40",
};

export const FeaturedCard = ({ item, color = "emerald" }: FeaturedCardProps) => (
  <Card className={cn(
    "p-4 bg-gradient-to-br border shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group cursor-pointer dark:bg-card",
    colorClasses[color]
  )}>
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-current opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity" />
    
    <div className="flex justify-between items-start mb-3 relative z-10">
      <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-border/50 flex items-center justify-center">
        {item.category === 'service' ? (
          <Cloud className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Terminal className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <AuditBadge level={item.auditLevel} />
    </div>
    
    <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">
      {item.name}
    </h3>
    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
      {item.description}
    </p>
    
    <div className="flex items-center justify-between text-xs text-muted-foreground relative z-10">
      <span className="flex items-center gap-1 font-medium text-foreground/80">
        <Download className="w-3 h-3" /> {item.downloads}
      </span>
      <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] hover:bg-primary/5 -mr-2">
        View <ChevronRight className="w-3 h-3 ml-1" />
      </Button>
    </div>
  </Card>
);
