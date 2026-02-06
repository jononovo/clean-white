import { Star } from "lucide-react";
import { AuditBadge } from "./audit-badge";
import type { Listing } from "@/lib/mock-data";

interface CompressedListRowProps {
  item: Listing;
  rank?: number;
}

export const CompressedListRow = ({ item, rank }: CompressedListRowProps) => (
  <div className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0 hover:bg-muted/30 px-2 rounded-sm transition-colors group cursor-pointer">
    {rank && (
      <span className="w-4 text-xs font-mono text-muted-foreground text-center">
        {rank}
      </span>
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors">
          {item.name}
        </span>
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
        <div className="text-[10px] font-mono text-muted-foreground">
          {item.updated}
        </div>
      )}
    </div>
  </div>
);
