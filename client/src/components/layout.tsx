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
        <img src="/logo.png" alt="SecureClaw" className="w-8 h-8 object-contain" />
        <div>
          <h1 className="font-display font-bold text-lg leading-none">SecureClaw</h1>
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
             <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
               Sign in with GitHub
             </Button>
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
