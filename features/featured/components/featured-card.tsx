import Link from "next/link";
import { Trophy, ExternalLink } from "lucide-react";

export type FeaturedType = "hero" | "app" | "skill" | "service";

interface FeaturedOfTheDayCardProps {
  type: FeaturedType;
  title: string;
  name: string;
  description: string;
  href: string;
  imageUrl?: string;
  sourceUrl?: string;
  isVerified: boolean;
}

function getSourceLabel(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    return hostname;
  } catch {
    return url;
  }
}

export const FeaturedOfTheDayCard = ({ 
  type, 
  title, 
  name, 
  description, 
  href, 
  imageUrl,
  sourceUrl,
}: FeaturedOfTheDayCardProps) => {
  const isExternal = href.startsWith("http");
  const linkProps = isExternal ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

  return (
    <div>
      <Link href={href} className="group block" {...linkProps}>
        <div className="p-4 rounded-xl bg-gradient-to-b from-card to-card/50 border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200 h-full relative">
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="flex gap-3">
            {imageUrl && (
              <div className="flex-shrink-0">
                <img 
                  src={imageUrl} 
                  alt={name}
                  className="w-12 h-12 rounded-lg object-cover border border-border/50"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Trophy className="w-3 h-3" />
                  {title}
                </div>
              </div>
              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-0.5 truncate">
                {type === "hero" ? `@${name}` : name}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
            </div>
          </div>
        </div>
      </Link>
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-1.5 px-1 text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          Source: {getSourceLabel(sourceUrl)}
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      )}
    </div>
  );
};
