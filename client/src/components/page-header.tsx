import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  height?: "default" | "compact";
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ 
  title, 
  description, 
  action, 
  height = "default", 
  className,
  children
}: PageHeaderProps) {
  return (
    <div className={cn(
      "relative rounded-2xl overflow-hidden bg-gradient-to-br from-background via-muted to-accent/20 border border-border ring-1 ring-white/10 dark:ring-white/5 transition-colors duration-300 shadow-xl shadow-muted/60 dark:shadow-none mb-8",
      height === "default" ? "p-8 md:p-12" : "p-6 md:p-8",
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03] text-foreground pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
        
        {action && (
          <div className="flex-shrink-0 pt-1">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
