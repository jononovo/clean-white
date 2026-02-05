import { Layout } from "@/components/layout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Sparkles, MessageCircle, Send, Globe, Zap, Server, LifeBuoy } from "lucide-react";
import { Link } from "wouter";

export default function Deploy() {
  const [selectedModel, setSelectedModel] = useState("claude");
  const [selectedChannel, setSelectedChannel] = useState("telegram");
  const [timeLeft, setTimeLeft] = useState(11); // "11 servers left"

  // Fake scarcity counter
  useEffect(() => {
    // Reduce count occasionally to simulate activity
    const interval = setInterval(() => {
       if (Math.random() > 0.7 && timeLeft > 3) {
           setTimeLeft(prev => prev - 1);
       }
    }, 15000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const models = [
    { 
      id: "claude", 
      name: "Claude Opus 4.5", 
      icon: Sparkles,
      color: "text-orange-400" 
    },
    { 
      id: "gpt", 
      name: "GPT-5.2", 
      icon: Zap,
      color: "text-green-400" 
    },
    { 
      id: "gemini", 
      name: "Gemini 3 Flash", 
      icon: Globe,
      color: "text-blue-400" 
    }
  ];

  const channels = [
    { id: "telegram", name: "Telegram", icon: Send, active: true },
    { id: "discord", name: "Discord", icon: MessageCircle, active: false, badge: "Coming soon" },
    { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, active: false, badge: "Coming soon" }
  ];

  return (
    <Layout>
      <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center py-12 px-4">
         {/* Support Link - Custom positioning for this page */}
         <div className="absolute top-4 right-4 md:top-0 md:right-8">
            <Link href="#">
               <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
                 <LifeBuoy className="w-4 h-4" />
                 Contact support
               </Button>
            </Link>
         </div>

         <div className="text-center mb-12 space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
               Deploy OpenClaw under 1 minute
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Avoid all technical complexity and one click deploy your own 24/7 active OpenClaw instance under 1 minute.
            </p>
         </div>

         {/* Deployment Card */}
         <div className="w-full max-w-2xl bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Subtle glow effect */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-10 relative z-10">
               
               {/* Model Selection */}
               <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Which model do you want as default?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                     {models.map((model) => (
                        <div 
                           key={model.id}
                           onClick={() => setSelectedModel(model.id)}
                           className={cn(
                             "relative cursor-pointer rounded-xl border p-4 flex items-center justify-center gap-2 transition-all duration-200",
                             selectedModel === model.id 
                               ? "bg-muted border-foreground/30 shadow-sm" 
                               : "bg-transparent border-border hover:bg-muted/50 hover:border-border/80"
                           )}
                        >
                           <model.icon className={cn("w-4 h-4", model.color)} />
                           <span className="font-medium text-sm">{model.name}</span>
                           
                           {selectedModel === model.id && (
                             <div className="absolute -right-2 -top-2 bg-foreground text-background rounded-full p-0.5">
                               <Check className="w-3 h-3" />
                             </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>

               {/* Channel Selection */}
               <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Which channel do you want to use for sending messages?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                     {channels.map((channel) => (
                        <div 
                           key={channel.id}
                           onClick={() => channel.active && setSelectedChannel(channel.id)}
                           className={cn(
                             "relative rounded-xl border p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200",
                             !channel.active ? "opacity-60 cursor-not-allowed border-dashed bg-muted/20" : 
                             selectedChannel === channel.id 
                               ? "bg-muted border-foreground/30 shadow-sm cursor-pointer" 
                               : "bg-transparent border-border hover:bg-muted/50 hover:border-border/80 cursor-pointer"
                           )}
                        >
                           <div className="flex items-center gap-2">
                              <channel.icon className={cn("w-4 h-4", channel.id === 'telegram' ? "text-blue-400" : "text-muted-foreground")} />
                              <span className="font-medium text-sm">{channel.name}</span>
                           </div>
                           
                           {channel.badge && (
                              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{channel.badge}</span>
                           )}

                           {selectedChannel === channel.id && channel.active && (
                             <div className="absolute -right-2 -top-2 bg-foreground text-background rounded-full p-0.5">
                               <Check className="w-3 h-3" />
                             </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>

               {/* Auth / Action */}
               <div className="pt-4 space-y-4">
                  <Button size="lg" className="w-full h-14 text-base font-bold bg-white text-black hover:bg-white/90 gap-3 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
                     <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                     Sign in with Google
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Button>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground px-1">
                     <span>Sign in to deploy your AI assistant and connect your channels.</span>
                     <span className="text-blue-400 font-medium flex items-center gap-1.5">
                        <Server className="w-3 h-3" />
                        Limited cloud servers — only {timeLeft} left
                     </span>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </Layout>
  );
}