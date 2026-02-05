import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight, Share2, Bookmark, Link, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { initialNewsArticles } from "./news"; // We will export data from news.tsx or move to mock-data

export default function ReadNews() {
  const [location, setLocation] = useLocation();
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  
  // Parse the query param or hash to find which article to start with
  // In a real app we might use /read-news/:date/:slug
  // For now we just load all articles for "the day"
  
  const scrollToArticle = (id: string) => {
    setActiveArticle(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
     // Auto-scroll to specific article if provided in hash
     // logic here
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
           <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all" onClick={() => setLocation('/news')}>
             <ChevronLeft className="w-4 h-4" /> Back to Newsroom
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Feed - Continuous Reading */}
          <div className="lg:col-span-8 space-y-16">
            {initialNewsArticles.map((article, index) => (
              <article 
                key={article.id} 
                id={article.id}
                className={`scroll-mt-24 transition-opacity duration-500 ${activeArticle && activeArticle !== article.id ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}
                onClick={() => setActiveArticle(article.id)}
              >
                <div className="mb-6 flex items-center gap-3">
                  <Badge variant={article.category === 'Security' ? 'destructive' : 'secondary'} className="text-[10px] h-5 px-1.5 uppercase tracking-wider">
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {article.date}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>
                
                <h2 className="text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                  {article.title}
                </h2>

                {article.image && (
                  <div className="mb-8 rounded-2xl overflow-hidden border border-border/40 shadow-sm aspect-video relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                   <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {article.author.charAt(0)}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-foreground">{article.author}</div>
                        <div className="text-xs text-muted-foreground">Author</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <Button size="sm" variant="ghost" className="h-9 gap-2 cursor-pointer">
                       <Share2 className="w-4 h-4" /> Share
                     </Button>
                     <Button size="sm" variant="ghost" className="h-9 gap-2 cursor-pointer">
                       <Bookmark className="w-4 h-4" /> Save
                     </Button>
                  </div>
                </div>
                
                {/* Visual Divider between articles */}
                {index !== initialNewsArticles.length - 1 && (
                   <div className="flex items-center justify-center py-16">
                      <div className="h-px bg-border/40 w-full max-w-[200px]" />
                      <div className="mx-4 text-xs text-muted-foreground uppercase tracking-widest font-mono">Next Story</div>
                      <div className="h-px bg-border/40 w-full max-w-[200px]" />
                   </div>
                )}
              </article>
            ))}
            
            <div className="py-12 text-center">
               <p className="text-muted-foreground mb-4">You've reached the end of the feed for this week.</p>
               <Button variant="outline">Back to Top</Button>
            </div>
          </div>

          {/* Sidebar - Table of Contents */}
          <div className="hidden lg:block lg:col-span-4 pl-6">
             <div className="sticky top-24 space-y-6">
                <Card className="p-5 border-border shadow-sm">
                  <h3 className="font-bold text-sm mb-4 text-foreground">In this feed</h3>
                  <nav className="space-y-1">
                     {initialNewsArticles.map(article => (
                       <button
                         key={article.id}
                         onClick={() => scrollToArticle(article.id)}
                         className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors line-clamp-1 border-l-2 cursor-pointer
                           ${activeArticle === article.id 
                             ? 'bg-muted border-primary text-foreground font-medium' 
                             : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                           }`}
                       >
                         {article.title}
                       </button>
                     ))}
                  </nav>
                </Card>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
