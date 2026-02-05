import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Listing } from "@/lib/mock-data";

interface AuditBadgeProps {
  level: Listing["auditLevel"];
}

export const AuditBadge = ({ level }: AuditBadgeProps) => {
  if (level === "none") {
    return (
      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
        Unverified
      </span>
    );
  }
  
  const colors = {
    gold: "bg-amber-100/50 text-amber-800 border-amber-200/60 shadow-[0_0_10px_-3px_rgba(251,191,36,0.4)]",
    silver: "bg-slate-100/50 text-slate-700 border-slate-200/60",
    bronze: "bg-orange-50/50 text-orange-700 border-orange-200/60",
  };

  return (
    <div className={cn(
      "flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider",
      colors[level]
    )}>
      {level === 'gold' && <Lock className="w-2.5 h-2.5" />}
      {level}
    </div>
  );
};
