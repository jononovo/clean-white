import { Link, useLocation } from "wouter";
import { categories } from "@/lib/mock-data";
import { Search, Shield, Bell, Menu, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-6 flex items-center gap-3 border-b border-border/50">
        <img src="/logo_v2.png" alt="SecureClawHub" className="w-10 h-10 object-contain" />
        <div>
          <h1 className="font-display font-bold text-xl leading-none tracking-tight">SecureClawHub</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Verified Registry</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {categories.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
              <section.icon className="w-3.5 h-3.5" />
              {section.title}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  className="w-full justify-start text-sm font-medium h-8 px-2 text-foreground/80 hover:text-foreground hover:bg-muted"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        ))}
        
        <div>
           <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
              Filters
            </h3>
            <div className="space-y-2 px-2">
              <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer">
                <input type="checkbox" className="rounded border-input text-accent-foreground focus:ring-accent" />
                <span>Audited Only</span>
              </label>
               <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer">
                <input type="checkbox" className="rounded border-input text-accent-foreground focus:ring-accent" />
                <span>Verified Author</span>
              </label>
               <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer">
                <input type="checkbox" className="rounded border-input text-accent-foreground focus:ring-accent" />
                <span>Official Partner</span>
              </label>
            </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-border/50 bg-muted/30">
        <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
             <Shield className="w-4 h-4 text-emerald-600" />
             <span className="text-xs font-bold text-emerald-900">System Secure</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Last scan: 12m ago. <br/>
            341 malicious skills blocked.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex-1 max-w-xl relative mx-4 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search skills, services, and SDKs..." 
              className="pl-9 bg-secondary/50 border-transparent focus:bg-card focus:border-input transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="text-muted-foreground">
               <Bell className="w-4 h-4" />
             </Button>
             <div className="h-6 w-px bg-border hidden sm:block"></div>
             
             <div className="flex items-center gap-2">
               <Button className="bg-[#24292e] hover:bg-[#24292e]/90 text-white shadow-sm gap-2">
                 <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.293 0 .319.22.694.825.576C20.566 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                 GitHub
               </Button>
               <Button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm gap-2">
                 <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                 Google
               </Button>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
