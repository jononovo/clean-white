import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "CreditClaw — Secure OpenClaw for Business",
  description: "Verified skills, managed bots, and enterprise-grade security for the OpenClaw ecosystem.",
  openGraph: {
    title: "CreditClaw — Secure OpenClaw for Business",
    description: "Verified skills, managed bots, and enterprise-grade security for the OpenClaw ecosystem.",
    type: "website",
    images: ["/social/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@openclaw",
    title: "CreditClaw — Secure OpenClaw for Business",
    description: "Verified skills, managed bots, and enterprise-grade security for the OpenClaw ecosystem.",
    images: ["/social/og-image.png"],
  },
};

function ThemeScript() {
  const script = `
    try {
      const saved = localStorage.getItem('theme-preference');
      if (saved) {
        const theme = JSON.parse(saved);
        if (theme.mode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        document.documentElement.setAttribute('data-theme', theme.style);
      }
    } catch (e) {
      console.error("Error setting initial theme", e);
    }
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-theme="warm" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/logo_v2.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <ThemeScript />
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