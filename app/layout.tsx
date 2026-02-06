import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "CreditClaw - Give your bot a card",
  description: "The fun, safe way to give your OpenClaw agent an allowance.",
  openGraph: {
    title: "CreditClaw - Give your bot a card",
    description: "The fun, safe way to give your OpenClaw agent an allowance.",
    type: "website",
    images: ["/images/creditclaw/fun-claw-card.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@creditclaw",
    title: "CreditClaw - Give your bot a card",
    description: "The fun, safe way to give your OpenClaw agent an allowance.",
    images: ["/images/creditclaw/fun-claw-card.png"],
  },
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/images/creditclaw/logo-claw-chip.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300..800&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-ZP35N89HPY" />
    </html>
  );
}
