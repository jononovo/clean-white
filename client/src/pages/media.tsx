import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { mediaExperts, MediaExpert } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Mic, MapPin, Globe, CheckCircle, UserPlus, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ExpertCard = ({ expert }: { expert: MediaExpert }) => (
  <Card className={`p-5 flex flex-col h-full border-border/60 hover:border-primary/50 transition-colors group cursor-pointer ${expert.type === 'recommended' ? 'bg-card' : 'bg-muted/10'}`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border
          ${expert.type === 'recommended' 
            ? 'bg-primary/10 text-primary border-primary/20' 
            : 'bg-muted text-muted-foreground border-border'
          }`}>
          {expert.image ? <img src={expert.image} alt={expert.name} className="w-full h-full rounded-full object-cover" /> : expert.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-base flex items-center gap-1.5">
            {expert.name}
            {expert.type === 'recommended' && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
          </h3>
          <p className="text-xs text-muted-foreground font-medium">{expert.role}, {expert.organization}</p>
        </div>
      </div>
      {expert.type === 'recommended' && (
        <Badge variant="outline" className="text-[10px] h-5 border-primary/20 text-primary bg-primary/5">
          Verified Source
        </Badge>
      )}
    </div>

    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
      {expert.bio}
    </p>

    <div className="space-y-4 mt-auto">
      <div className="flex flex-wrap gap-1.5">
        {expert.expertise.map(skill => (
          <Badge key={skill} variant="secondary" className="text-[10px] h-5 px-1.5 font-normal bg-secondary/50">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {expert.location}
        </div>
        <div className="flex gap-1">
           <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary">
             <Linkedin className="w-3.5 h-3.5" />
           </Button>
           <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary">
             <Twitter className="w-3.5 h-3.5" />
           </Button>
        </div>
      </div>
    </div>
  </Card>
);

export default function Media() {
  const [experts, setExperts] = useState<MediaExpert[]>(mediaExperts);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newExpert: MediaExpert = {
      id: `mv-${Date.now()}`,
      name: formData.get("name") as string,
      role: formData.get("occupation") as string,
      organization: "Community Member", // Simplified for form
      bio: formData.get("fame") as string,
      location: formData.get("location") as string,
      expertise: (formData.get("expertise") as string).split(",").map(s => s.trim()),
      type: "volunteer"
    };

    setExperts([...experts, newExpert]);
    setIsOpen(false);
    toast({
      title: "Profile Submitted",
      description: "You have been added to the Community Volunteers list.",
    });
  };

  return (
    <Layout>
      <PageHeader
        title="Media Resources"
        description="Connect with verified experts, thought leaders, and community voices for interviews and insights on OpenClaw and AI Security."
        height="compact"
        action={
           <Dialog open={isOpen} onOpenChange={setIsOpen}>
             <DialogTrigger asChild>
               <Button size="lg" className="bg-primary text-primary-foreground font-bold shadow-md cursor-pointer">
                 <UserPlus className="w-4 h-4 mr-2" />
                 Join Media List
               </Button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
               <DialogHeader>
                 <DialogTitle>Join the Media Expert List</DialogTitle>
                 <DialogDescription>
                   Are you open to speaking to the media or writing about OpenClaw & AI Agents? Please submit your details below.
                 </DialogDescription>
               </DialogHeader>
               
               <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="name">Full Name</Label>
                     <Input id="name" name="name" placeholder="Jane Doe" required />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="location">City, Country</Label>
                     <Input id="location" name="location" placeholder="New York, USA" required />
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="age">Age</Label>
                     <Input id="age" name="age" placeholder="30" type="number" required />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="language">Language(s)</Label>
                     <Input id="language" name="language" placeholder="English, Spanish" required />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="expertise">Primary Expertise</Label>
                   <Input id="expertise" name="expertise" placeholder="e.g. AI Security, Governance, Technical Implementation" required />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="occupation">Current Occupation</Label>
                   <Input id="occupation" name="occupation" placeholder="Senior Engineer at TechCorp" required />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="education">Education (Optional)</Label>
                   <Input id="education" name="education" placeholder="PhD in Computer Science" />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="fame">Claim to Fame / Bio</Label>
                   <Textarea id="fame" name="fame" placeholder="Tell us something interesting (humorous, early adopter story, etc.)" required />
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="links">LinkedIn / Social Profile</Label>
                   <Input id="links" name="links" placeholder="https://linkedin.com/in/..." required />
                 </div>

                 <DialogFooter className="pt-4">
                   <Button type="submit">Submit Profile</Button>
                 </DialogFooter>
               </form>
             </DialogContent>
           </Dialog>
        }
      />

      <div className="space-y-10">
        
        {/* Recommended Sources */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Recommended Sources</h2>
              <p className="text-sm text-muted-foreground">Vetted industry leaders available for expert commentary.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.filter(e => e.type === 'recommended').map(expert => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </section>

        {/* Community Volunteers */}
        <section className="pt-8 border-t border-border/40">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-muted text-muted-foreground">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">Community Volunteers</h2>
              <p className="text-sm text-muted-foreground">Enthusiasts and developers from the ecosystem (Unvetted).</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experts.filter(e => e.type === 'volunteer').map(expert => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </section>

      </div>
    </Layout>
  );
}
