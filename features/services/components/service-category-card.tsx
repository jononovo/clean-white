"use client";

import { Card } from "@/components/ui/card";
import { ExternalLink, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceCategory } from "../types";

export function ServiceCategoryCard({ category }: { category: ServiceCategory }) {
  const Icon = category.icon;
  const providers = category.providers || [];

  return (
    <Card
      className={cn(
        "group relative p-4 h-full bg-gradient-to-b from-card to-card/50 border border-border transition-all duration-300 hover:shadow-lg overflow-hidden"
      )}
      data-testid={`service-category-card-${category.id}`}
    >
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-current opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity" />

      <div className="flex items-center gap-2.5 mb-3 relative z-10">
        <div className="p-2 rounded-lg bg-muted/50">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <h4 className="font-display font-bold text-sm text-foreground">
          {category.label}
        </h4>
      </div>

      {providers.length > 0 && (
        <div className="flex flex-col gap-1 relative z-10">
          {providers.map((provider) => (
            <a
              key={provider.name}
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-1.5 px-2 -mx-1 rounded-md hover:bg-muted/40 transition-colors group/row cursor-pointer"
              data-testid={`provider-link-${provider.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className="text-xs font-medium text-muted-foreground group-hover/row:text-primary transition-colors flex-1 truncate">
                {provider.name}
              </span>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="flex items-center gap-0.5 text-[10px] font-mono text-amber-600 dark:text-amber-400" title="Rating">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                  {provider.rating.toFixed(1)}
                </span>
                <span className="flex items-center gap-0.5 text-[10px] font-mono text-muted-foreground" title="Popularity">
                  <TrendingUp className="w-2.5 h-2.5" />
                  {provider.popularity}/10
                </span>
                <ExternalLink className="w-2.5 h-2.5 text-muted-foreground/30 group-hover/row:text-primary transition-colors" />
              </div>
            </a>
          ))}
        </div>
      )}
    </Card>
  );
}
