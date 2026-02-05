import { Layout } from "@/components/layout";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Upload, FileCode, CheckCircle, AlertCircle, Loader2, Folder, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface ValidationState {
  slug: boolean;
  displayName: boolean;
  files: boolean;
  skillMd: boolean;
}

export default function Publish() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    slug: "",
    displayName: "",
    version: "1.0.0",
    tags: "",
    changelog: ""
  });

  const [validation, setValidation] = useState<ValidationState>({
    slug: false,
    displayName: false,
    files: false,
    skillMd: false
  });

  // Auto-generate slug from display name
  useEffect(() => {
    if (formData.displayName && !formData.slug) {
      const generatedSlug = formData.displayName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.displayName]);

  // Update validation
  useEffect(() => {
    setValidation({
      slug: formData.slug.length > 0,
      displayName: formData.displayName.length > 0,
      files: files.length > 0,
      skillMd: files.includes("SKILL.md")
    });
  }, [formData, files]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Simulate finding files
    simulateFileDetection();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateFileDetection();
    }
  };

  const simulateFileDetection = () => {
    // Mock files found in a "folder"
    const mockFiles = [
      "SKILL.md",
      "package.json",
      "index.ts",
      "README.md"
    ];
    setFiles(mockFiles);
    toast({
      title: "Files Detected",
      description: "Successfully scanned skill package.",
    });
  };

  const handlePublish = () => {
    setIsPublishing(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsPublishing(false);
      toast({
        title: "Skill Published!",
        description: `${formData.displayName} v${formData.version} is now live.`,
      });
      setLocation("/");
    }, 2000);
  };

  const isValid = Object.values(validation).every(Boolean);

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Publish a skill</h1>
          <p className="text-muted-foreground">
            Drop a folder with SKILL.md and text files. We will handle the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Top Left: Metadata */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-xs font-mono uppercase text-muted-foreground">Slug</Label>
              <Input 
                id="slug" 
                placeholder="skill-name" 
                className="font-mono bg-background/50"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-mono uppercase text-muted-foreground">Display name</Label>
              <Input 
                id="name" 
                placeholder="My Skill" 
                className="bg-background/50"
                value={formData.displayName}
                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="version" className="text-xs font-mono uppercase text-muted-foreground">Version</Label>
                <Input 
                  id="version" 
                  placeholder="1.0.0" 
                  className="font-mono bg-background/50"
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-xs font-mono uppercase text-muted-foreground">Tags</Label>
                <Input 
                  id="tags" 
                  placeholder="latest, beta" 
                  className="font-mono bg-background/50"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Top Right: File Drop */}
          <div 
            className={cn(
              "relative bg-card/50 backdrop-blur-sm border-2 border-dashed rounded-xl p-6 shadow-sm flex flex-col transition-all duration-300",
              isDragging ? "border-primary bg-primary/5" : "border-border/50 hover:border-border",
              files.length > 0 ? "justify-start" : "justify-center items-center"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileSelect}
              // webkitdirectory="" // Note: webkitdirectory is not standard React prop, but works in some browsers. We'll stick to simple simulation.
            />
            
            {files.length === 0 ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Drop a folder</h3>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose folder
                </Button>
              </div>
            ) : (
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Folder className="w-4 h-4 text-primary" />
                    {formData.slug || "skill-package"}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => setFiles([])}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto custom-scrollbar">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground py-1 px-2 rounded hover:bg-muted/50">
                      <FileCode className="w-3.5 h-3.5" />
                      {file}
                      {file === "SKILL.md" && <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 rounded">Required</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Left: Validation */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium mb-4">Validation</h3>
            <div className="space-y-3">
              <ValidationItem isValid={validation.slug} label="Slug is required" />
              <ValidationItem isValid={validation.displayName} label="Display name is required" />
              <ValidationItem isValid={validation.files} label="Add at least one file" />
              <ValidationItem isValid={validation.skillMd} label="SKILL.md is required" />
            </div>
          </div>

          {/* Bottom Right: Changelog */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm flex flex-col">
            <Label htmlFor="changelog" className="text-sm font-medium mb-2">Changelog</Label>
            <Textarea 
              id="changelog" 
              placeholder="Describe what changed in this skill..." 
              className="flex-1 bg-background/50 resize-none min-h-[120px]"
              value={formData.changelog}
              onChange={(e) => setFormData({...formData, changelog: e.target.value})}
            />
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          disabled={!isValid || isPublishing}
          onClick={handlePublish}
        >
          {isPublishing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            "Publish Skill"
          )}
        </Button>
      </div>
    </Layout>
  );
}

function ValidationItem({ isValid, label }: { isValid: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={cn(
        "w-4 h-4 rounded-full flex items-center justify-center shrink-0 border",
        isValid ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-500" : "bg-muted border-border text-muted-foreground"
      )}>
        {isValid && <CheckCircle className="w-3 h-3" />}
      </div>
      <span className={cn(
        "transition-colors",
        isValid ? "text-foreground" : "text-muted-foreground"
      )}>{label}</span>
    </div>
  );
}