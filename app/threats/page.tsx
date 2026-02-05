"use client";

import { Layout } from "@/components/layout";
import { useState } from "react";
import { ExternalLink, AlertTriangle, Search, Filter, Plus, Share2, Globe, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { THREAT_ALERTS, type ThreatAlert } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function Threats() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [threats] = useState<ThreatAlert[]>(THREAT_ALERTS);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [newThreat, setNewThreat] = useState({
    title: "",
    severity: "MEDIUM",
    source: "",
    link: "",
    description: ""
  });

  const filteredThreats = threats.filter(threat => 
    threat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    toast({
      title: "Threat Report Submitted",
      description: "Your threat intelligence has been submitted for verification.",
    });
    setIsSubmitOpen(false);
    setNewThreat({
      title: "",
      severity: "MEDIUM",
      source: "",
      link: "",
      description: ""
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium mb-3 border border-destructive/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
              </span>
              Live Threat Feed
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Threat Intelligence</h1>
            <p className="text-muted-foreground max-w-2xl">
              Real-time monitoring of security vulnerabilities, malware campaigns, and exploits targeting the OpenClaw ecosystem. Verified by our security research team.
            </p>
          </div>
          
          <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-lg hover:shadow-destructive/20 transition-all">
                <Plus className="w-4 h-4" />
                Submit Threat
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit Threat Intelligence</DialogTitle>
                <DialogDescription>
                  Report a new vulnerability or malware campaign. All submissions are verified by our research team before publication.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Threat Title / CVE</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. CVE-2026-1234 or Malicious Skill 'X'" 
                    value={newThreat.title}
                    onChange={(e) => setNewThreat({...newThreat, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="severity">Severity</Label>
                    <Select 
                      value={newThreat.severity}
                      onValueChange={(val) => setNewThreat({...newThreat, severity: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CRITICAL">Critical</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="source">Source</Label>
                    <Input 
                      id="source" 
                      placeholder="e.g. Twitter, GitHub" 
                      value={newThreat.source}
                      onChange={(e) => setNewThreat({...newThreat, source: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="link">Reference URL</Label>
                  <Input 
                    id="link" 
                    placeholder="https://" 
                    value={newThreat.link}
                    onChange={(e) => setNewThreat({...newThreat, link: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description & Impact</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the vulnerability and its potential impact..." 
                    className="h-24"
                    value={newThreat.description}
                    onChange={(e) => setNewThreat({...newThreat, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSubmitOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!newThreat.title}>Submit Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by CVE, malware name, or description..." 
                className="pl-9 bg-muted/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="w-full gap-2 text-muted-foreground">
                <Filter className="w-4 h-4" />
                Filter
             </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredThreats.map((threat) => (
            <div 
              key={threat.id}
              className="group relative rounded-lg border border-border bg-card hover:bg-muted/30 transition-all p-5 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="hidden md:flex flex-col items-center gap-2 pt-1">
                    <div className={cn(
                      "p-2 rounded-full bg-muted/50 border border-border",
                      threat.severity === "CRITICAL" && "bg-destructive/10 border-destructive/20 text-destructive",
                      threat.severity === "HIGH" && "bg-orange-500/10 border-orange-500/20 text-orange-500"
                    )}>
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border", 
                        threat.bgColor, threat.color, threat.borderColor
                      )}>
                        {threat.severity}
                      </div>
                      <span className="text-sm font-medium text-foreground">{threat.label}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {threat.date}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {threat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                        {threat.detail}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      {threat.cvss && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-border/50">
                           <span className="font-bold text-foreground">CVSS</span> {threat.cvss}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Globe className="w-3 h-3" />
                        Source: <span className="font-medium text-foreground">{threat.source}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center justify-end gap-2 md:pl-4 md:border-l md:border-border/50">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2 whitespace-nowrap h-9 text-xs"
                    asChild
                  >
                    <a href={threat.link} target="_blank" rel="noopener noreferrer">
                      View Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground h-9 text-xs">
                    <Share2 className="w-3 h-3" />
                    Share
                  </Button>
                </div>

              </div>
            </div>
          ))}

          {filteredThreats.length === 0 && (
            <div className="text-center py-12 border border-dashed border-border rounded-lg bg-muted/20">
              <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-1">No threats found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}