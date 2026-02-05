import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { meetups, communityListings, Meetup, CommunityListing } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink, Plus, MessageSquare, Tag, Clock, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MeetupCard = ({ meetup }: { meetup: Meetup }) => (
  <Card className="p-5 border-border/60 hover:border-primary/50 transition-colors group cursor-pointer">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {meetup.status === "upcoming" ? (
            <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-[10px] h-5 px-1.5">UPCOMING</Badge>
          ) : (
             <Badge variant="secondary" className="text-[10px] h-5 px-1.5">PAST</Badge>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {meetup.date}
          </span>
        </div>
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{meetup.title}</h3>
        <p className="text-sm font-medium text-foreground/80">{meetup.subtitle}</p>
      </div>
      <Button size="sm" variant="outline" className="shrink-0 gap-2">
        {meetup.status === "upcoming" ? "Register Now" : "View Archive"}
        <ExternalLink className="w-3 h-3" />
      </Button>
    </div>
    
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {meetup.description}
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50 mt-3">
        <MapPin className="w-3 h-3" />
        {meetup.location}
      </div>
    </div>
  </Card>
);

const ListingCard = ({ listing }: { listing: CommunityListing }) => (
  <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-card border border-border/60 hover:bg-muted/30 transition-colors group cursor-pointer">
    <div className="shrink-0">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border text-lg font-bold
        ${listing.type === 'offer' 
          ? 'bg-emerald-100/30 text-emerald-700 border-emerald-200/50 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30' 
          : 'bg-blue-100/30 text-blue-700 border-blue-200/50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30'
        }`}>
        {listing.type === 'offer' ? 'O' : 'R'}
      </div>
    </div>
    <div className="flex-1 min-w-0 space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <Badge variant={listing.type === 'offer' ? 'default' : 'secondary'} className={`text-[10px] h-5 px-1.5 uppercase tracking-wider ${listing.type === 'offer' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}>
               {listing.type}
             </Badge>
             <span className="text-xs text-muted-foreground flex items-center gap-1">
               <Clock className="w-3 h-3" /> {listing.date}
             </span>
             {listing.location && (
               <>
                 <span className="text-border text-[10px]">|</span>
                 <span className="text-xs text-muted-foreground flex items-center gap-1">
                   <MapPin className="w-3 h-3" /> {listing.location}
                 </span>
               </>
             )}
           </div>
           <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{listing.title}</h4>
        </div>
        <Button size="sm" variant="ghost" className="h-8 text-xs gap-1 hidden sm:flex">
          Contact <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground line-clamp-2">
        {listing.description}
      </p>
      
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-medium text-foreground mr-1">By {listing.author}</span>
        {listing.tags.map(tag => (
          <Badge key={tag} variant="outline" className="text-[10px] h-5 px-1.5 text-muted-foreground border-border/60 bg-muted/20">
            {tag}
          </Badge>
        ))}
      </div>
       <Button size="sm" variant="outline" className="w-full h-8 text-xs gap-1 sm:hidden mt-2">
          Contact <ArrowRight className="w-3 h-3" />
        </Button>
    </div>
  </div>
);

export default function Community() {
  const [meetupList, setMeetupList] = useState<Meetup[]>(meetups);
  const [listingList, setListingList] = useState<CommunityListing[]>(communityListings);
  const [isMeetupOpen, setIsMeetupOpen] = useState(false);
  const [isListingOpen, setIsListingOpen] = useState(false);
  const { toast } = useToast();

  const handleMeetupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMeetup: Meetup = {
      id: `m-${Date.now()}`,
      title: formData.get("title") as string,
      subtitle: "Community Event",
      date: new Date(formData.get("date") as string).toLocaleDateString(),
      location: formData.get("location") as string,
      status: "upcoming",
      description: formData.get("desc") as string,
      link: formData.get("link") as string
    };
    setMeetupList([newMeetup, ...meetupList]);
    setIsMeetupOpen(false);
    toast({ title: "Meetup Submitted", description: "Your event is now listed as upcoming." });
  };

  const handleListingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newListing: CommunityListing = {
      id: `cl-${Date.now()}`,
      title: formData.get("listing-title") as string,
      type: (formData.get("type") || "request") as "offer" | "request",
      author: "You",
      date: "Just now",
      location: "Remote",
      description: formData.get("listing-desc") as string,
      tags: (formData.get("tags") as string).split(",").map(t => t.trim())
    };
    setListingList([newListing, ...listingList]);
    setIsListingOpen(false);
    toast({ title: "Listing Posted", description: "Your post is now visible to the community." });
  };

  return (
    <Layout>
      <PageHeader
        title="Community Hub"
        description="Join the OpenClaw community to connect, share, and build secure autonomous agents together."
        height="compact"
        action={
           <Button size="lg" className="bg-[#4A154B] hover:bg-[#4A154B]/90 text-white border-none font-bold shadow-md cursor-pointer" onClick={() => window.open('#', '_blank')}>
             <MessageSquare className="w-4 h-4 mr-2" />
             Join B2B Slack Channel
           </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Meetups Section */}
          <section>
             <div className="flex items-center justify-between mb-6">
               <div>
                 <h2 className="text-2xl font-display font-bold text-foreground">Meetups & Events</h2>
                 <p className="text-sm text-muted-foreground">Connect with developers IRL and virtually.</p>
               </div>
               
               <Dialog open={isMeetupOpen} onOpenChange={setIsMeetupOpen}>
                 <DialogTrigger asChild>
                   <Button variant="outline" className="gap-2 cursor-pointer">
                     <Plus className="w-4 h-4" /> Add Meetup
                   </Button>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-[500px]">
                   <DialogHeader>
                     <DialogTitle>Submit a Meetup</DialogTitle>
                     <DialogDescription>
                       Host a meetup for the OpenClaw community.
                     </DialogDescription>
                   </DialogHeader>
                   <form onSubmit={handleMeetupSubmit} className="grid gap-4 py-4">
                     <div className="space-y-2">
                       <Label htmlFor="title">Event Title</Label>
                       <Input id="title" name="title" placeholder="e.g. SF OpenClaw Hack Night" required />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                         <Label htmlFor="date">Date & Time</Label>
                         <Input id="date" name="date" type="datetime-local" required />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="location">Location</Label>
                         <Input id="location" name="location" placeholder="City, Country or URL" required />
                       </div>
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="link">Registration Link / App</Label>
                       <Input id="link" name="link" placeholder="https://lu.ma/..." required />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="desc">Description / Body</Label>
                       <Textarea id="desc" name="desc" placeholder="What will be discussed? Who should attend?" required />
                     </div>
                     <DialogFooter>
                       <Button type="submit">Submit Event</Button>
                     </DialogFooter>
                   </form>
                 </DialogContent>
               </Dialog>
             </div>
             
             <div className="space-y-4">
               {meetupList.map(meetup => (
                 <MeetupCard key={meetup.id} meetup={meetup} />
               ))}
             </div>
          </section>

          {/* Offers & Requests Section */}
          <section>
             <div className="flex items-center justify-between mb-6">
               <div>
                 <h2 className="text-2xl font-display font-bold text-foreground">Offers & Requests</h2>
                 <p className="text-sm text-muted-foreground">The community marketplace for skills, help, and gigs.</p>
               </div>

               <Dialog open={isListingOpen} onOpenChange={setIsListingOpen}>
                 <DialogTrigger asChild>
                   <Button variant="outline" className="gap-2 cursor-pointer">
                     <Plus className="w-4 h-4" /> Post Listing
                   </Button>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-[500px]">
                   <DialogHeader>
                     <DialogTitle>Create a Listing</DialogTitle>
                     <DialogDescription>
                       Post an offer or request. (Registered users only)
                     </DialogDescription>
                   </DialogHeader>
                   <form onSubmit={handleListingSubmit} className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-3 space-y-2">
                           <Label htmlFor="listing-title">Title</Label>
                           <Input id="listing-title" name="listing-title" placeholder="I need help with..." required />
                        </div>
                        <div className="col-span-1 space-y-2">
                           <Label htmlFor="type">Type</Label>
                           <Select name="type" defaultValue="request">
                             <SelectTrigger>
                               <SelectValue placeholder="Select" />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="request">Request</SelectItem>
                               <SelectItem value="offer">Offer</SelectItem>
                             </SelectContent>
                           </Select>
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                       <Label htmlFor="listing-desc">Description</Label>
                       <Textarea id="listing-desc" name="listing-desc" className="h-24" placeholder="Describe what you are offering or looking for..." required />
                     </div>
                     
                     <div className="space-y-2">
                       <Label htmlFor="tags">Tags (comma separated)</Label>
                       <Input id="tags" name="tags" placeholder="React, Rust, Security, Job" required />
                     </div>

                     <div className="space-y-2">
                       <Label htmlFor="contact">Contact Info</Label>
                       <Input id="contact" name="contact" placeholder="Email or Discord Handle" required />
                     </div>
                     <DialogFooter>
                       <Button type="submit">Post Listing</Button>
                     </DialogFooter>
                   </form>
                 </DialogContent>
               </Dialog>
             </div>
             
             <div className="space-y-3">
               {listingList.map(listing => (
                 <ListingCard key={listing.id} listing={listing} />
               ))}
             </div>
             
             <div className="mt-4 text-center">
               <Button variant="ghost" className="text-muted-foreground">View All Listings</Button>
             </div>
          </section>

        </div>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
           {/* Guidelines Card */}
           <Card className="p-5 bg-muted/30 border-border shadow-sm">
             <h3 className="font-bold text-sm mb-3">Community Guidelines</h3>
             <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
               <li>Be respectful and constructive.</li>
               <li>No unsolicited marketing or spam.</li>
               <li>Verify security claims before posting.</li>
               <li>Report suspicious behavior immediately.</li>
             </ul>
             <Button variant="link" className="px-0 text-xs h-auto mt-3">Read Code of Conduct</Button>
           </Card>

           {/* Newsletter Mini */}
           <Card className="p-5 border-border shadow-sm">
              <h3 className="font-bold text-sm mb-2">The Daily Claw</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Join 15,000+ developers receiving the latest OpenClaw news and humor.
              </p>
              <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => window.open('https://clawhub.substack.com/', '_blank')}>
                Subscribe on Substack
              </Button>
           </Card>
        </div>
      </div>
    </Layout>
  );
}
