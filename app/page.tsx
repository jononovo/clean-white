"use client";

import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { LiveMetrics } from "@/components/landing/live-metrics";
import { Features } from "@/components/landing/features";
import { WaitlistForm } from "@/components/landing/waitlist-form";

function AnnouncementBar() {
  return (
    <div className="bg-neutral-800 text-white text-xs font-medium py-2 text-center fixed top-0 w-full z-[60]">
      <span>Get ready for the launch party on 11 February, 2026</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-neutral-900 font-sans selection:bg-[hsl(var(--accent))] selection:text-black">
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <LiveMetrics />
        <Features />
        <WaitlistForm />
      </main>
    </div>
  );
}
