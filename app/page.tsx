"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { LiveMetrics } from "@/components/landing/live-metrics";
import { Features } from "@/components/landing/features";
import { WaitlistForm } from "@/components/landing/waitlist-form";

function AnnouncementBar({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="bg-neutral-800 text-white text-xs font-medium py-2 text-center fixed top-0 w-full z-[60]">
      <span>Get ready for the launch party on 11 February, 2026</span>
      <button
        onClick={onDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss"
        data-testid="button-dismiss-announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <div className="min-h-screen bg-background text-neutral-900 font-sans selection:bg-[hsl(var(--accent))] selection:text-black">
      {showAnnouncement && <AnnouncementBar onDismiss={() => setShowAnnouncement(false)} />}
      <Nav topOffset={showAnnouncement} />
      <main>
        <Hero />
        <LiveMetrics />
        <Features />
        <WaitlistForm />
      </main>
    </div>
  );
}
