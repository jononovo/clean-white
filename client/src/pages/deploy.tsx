import { Layout } from "@/components/layout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Sparkles, MessageCircle, Send, Globe, Zap, Server, LifeBuoy, Shield, Lock, Scale, Clock, Terminal, ChevronRight, Loader2, Mail } from "lucide-react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AuthDrawer } from "@/components/auth-drawer";

export default function Deploy() {
  const [selectedModel, setSelectedModel] = useState("claude");
  const [selectedChannel, setSelectedChannel] = useState("telegram");
  const [timeLeft, setTimeLeft] = useState(11); // "11 servers left"
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { toast } = useToast();

  const handleDeploy = () => {
    setIsConnecting(true);
    
    // Simulate connection delay then open auth
    setTimeout(() => {
      setIsConnecting(false);
      setShowAuth(true);
      toast({
        title: "Configuration Saved",
        description: "Please sign in to complete your deployment.",
      });
    }, 1500);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Our support team will contact you shortly.",
    });
    // In a real app, this would close the modal
  };

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

  const features = [
    {
      title: "Bank-Grade Security",
      description: "Every agent runs in an isolated Firecracker microVM enclave.",
      icon: Shield
    },
    {
      title: "Zero Maintenance",
      description: "We handle updates, scaling, and infrastructure patching.",
      icon: Clock
    },
    {
      title: "Instant Scale",
      description: "Deploy one agent or a swarm of thousands in seconds.",
      icon: Scale
    },
    {
      title: "No-Code Required",
      description: "No Docker. No Kubernetes. Just select your model and go.",
      icon: Terminal
    }
  ];

  return (
    <Layout>
      <AuthDrawer open={showAuth} onOpenChange={setShowAuth} defaultTab="register" />
      
      <div className="relative min-h-[calc(100vh-8rem)] flex flex-col items-center py-12 px-4">
         {/* Support Link - Custom positioning for this page */}
         <div className="absolute top-4 right-4 md:top-8 md:right-8 z-40">
            <Dialog>
              <DialogTrigger asChild>
                 <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
                   <LifeBuoy className="w-4 h-4" />
                   Contact support
                 </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact Support</DialogTitle>
                  <DialogDescription>
                    Need help with your deployment? Our team is standing by 24/7.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSupportSubmit} className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="I need help with..." className="min-h-[100px]" required />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </DialogContent>
            </Dialog>
         </div>

         <div className="flex-1 flex flex-col justify-center items-center w-full max-w-5xl">
             <div className="text-center mb-12 space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                   Deploy OpenClaw under 1 minute
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                   Avoid all technical complexity and one click deploy your own 24/7 active OpenClaw instance under 1 minute.
                </p>
             </div>

             {/* Deployment Card */}
             <div className="w-full max-w-2xl bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden mb-24">
                
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
                      <Button 
                        size="lg" 
                        onClick={handleDeploy}
                        disabled={isConnecting}
                        className="w-full h-14 text-base font-bold bg-white text-black hover:bg-white/90 gap-3 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                      >
                         {isConnecting ? (
                           <>
                             <Loader2 className="w-5 h-5 animate-spin" />
                             Configuring Environment...
                           </>
                         ) : (
                           <>
                             <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                             Sign in with Google
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                           </>
                         )}
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

             {/* Why Us Section */}
             <div className="w-full max-w-6xl mb-24">
                 <div className="text-center mb-16">
                     <h2 className="text-3xl font-bold tracking-tight mb-4">Why trusted teams deploy with OpenClaw</h2>
                     <p className="text-muted-foreground max-w-2xl mx-auto">
                        We've optimized the infrastructure so you can focus on building intelligent behaviors, not managing servers.
                     </p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {features.map((feature, i) => (
                        <div key={i} className="bg-card/30 border border-border/50 rounded-xl p-6 hover:bg-card/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                     ))}
                 </div>
             </div>

             {/* Security Deep Dive */}
             <div className="w-full max-w-5xl mb-24">
                 <div className="bg-gradient-to-br from-card to-card/50 border border-border rounded-3xl overflow-hidden shadow-2xl">
                     <div className="grid grid-cols-1 lg:grid-cols-2">
                         <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20 w-fit">
                                 <Shield className="w-3 h-3" />
                                 ENTERPRISE GRADE
                             </div>
                             <h2 className="text-3xl font-bold tracking-tight">Fortress-Level Security for Autonomous Agents</h2>
                             <p className="text-muted-foreground leading-relaxed">
                                 Security isn't an afterthought—it's the core of our platform. Every deployed agent runs in a completely isolated environment with strict network policies.
                             </p>
                             <ul className="space-y-4 pt-2">
                                 {[
                                     "SOC2 Type II Compliant Infrastructure",
                                     "End-to-End Encrypted Memory Storage",
                                     "Real-time Threat Monitoring & Blocking",
                                     "Automated Vulnerability Scanning"
                                 ].map((item, i) => (
                                     <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                         <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                             <Check className="w-3 h-3 text-emerald-500" />
                                         </div>
                                         {item}
                                     </li>
                                 ))}
                             </ul>
                             <div className="pt-4">
                                 <Button variant="outline" className="gap-2">
                                     Read Security Whitepaper <ChevronRight className="w-4 h-4" />
                                 </Button>
                             </div>
                         </div>
                         <div className="relative bg-muted/30 min-h-[300px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-border flex items-center justify-center p-8">
                             {/* Abstract Security Visual */}
                             <div className="relative w-64 h-64">
                                 <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                                 <div className="absolute inset-4 border-2 border-emerald-500/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                 <div className="absolute inset-0 flex items-center justify-center">
                                     <div className="w-24 h-24 bg-emerald-500/10 backdrop-blur-md rounded-2xl border border-emerald-500/30 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]">
                                         <Lock className="w-10 h-10 text-emerald-500" />
                                     </div>
                                 </div>
                                 
                                 {/* Floating badges */}
                                 <div className="absolute -top-4 -right-4 bg-card border border-border shadow-lg rounded-lg px-3 py-1.5 text-xs font-bold flex items-center gap-2 animate-bounce duration-[3000ms]">
                                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                     System Secure
                                 </div>
                                 <div className="absolute -bottom-4 -left-4 bg-card border border-border shadow-lg rounded-lg px-3 py-1.5 text-xs font-bold flex items-center gap-2 animate-bounce duration-[4000ms]">
                                     <span className="w-2 h-2 rounded-full bg-blue-500" />
                                     Encrypted
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Simple FAQ / Trust */}
             <div className="w-full max-w-3xl text-center pb-12">
                 <p className="text-sm text-muted-foreground">
                     Trusted by security teams at <span className="font-semibold text-foreground">TechCorp</span>, <span className="font-semibold text-foreground">CyberGuard</span>, and <span className="font-semibold text-foreground">OpenAI Researchers</span>.
                 </p>
             </div>
         </div>
      </div>
    </Layout>
  );
}