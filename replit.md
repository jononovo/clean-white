# CreditClaw

## Overview

CreditClaw is a fun, consumer-facing financial platform that lets users give their OpenClaw AI agents a credit card with a weekly allowance. Features waitlist sign-up, live metrics, transaction tracking, and a playful lobster-themed brand identity.

**Current State:** Landing page with waitlist sign-up (frontend-only). Backend infrastructure (auth, database, API routes) in place for future functionality.

**Core Features (Planned):**
- Virtual credit cards for AI agents with weekly allowance limits
- Real-time transaction tracking and categorization
- Waitlist and invitation system
- Agent spending controls and merchant restrictions

## User Preferences

Preferred communication style: Simple, everyday language.

## Brand Identity

- **Theme:** "Fun Consumer" - playful, friendly, approachable fintech
- **Mascot:** Lobster (the "Claw" in CreditClaw)
- **Color Scheme:**
  - Primary (Lobster Orange): hsl(10 85% 55%)
  - Secondary (Ocean Blue): hsl(200 95% 60%)
  - Accent (Fun Purple): hsl(260 90% 65%)
  - Background: Very light blue-white hsl(210 40% 98%)
- **Typography:** Plus Jakarta Sans (display), JetBrains Mono (mono)
- **Design:** Very rounded corners (1rem radius), playful animations, gradient blobs

## Landing Page Components

- `components/landing/nav.tsx` - Fixed navigation with logo, links, sign-up button
- `components/landing/hero.tsx` - Main hero with email waitlist, lobster card image, floating badges
- `components/landing/live-metrics.tsx` - Animated counters (waitlist count, approved agents, credit issued)
- `components/landing/features.tsx` - 4 feature cards (Allowance, Safety, Instant Setup, Smart Shopping)
- `components/landing/transaction-ledger.tsx` - Floating mini transaction list
- `components/landing/waitlist-form.tsx` - Bottom CTA section with waitlist form and footer

## Authentication (Available, from prior build)

- **Firebase Authentication** with session cookies for SSR compatibility
- Sign-in methods: Google, GitHub, Email magic link (passwordless)
- Key files:
  - `lib/firebase/client.ts` - Client SDK init
  - `lib/firebase/admin.ts` - Admin SDK init (server-side)
  - `lib/auth/auth-context.tsx` - React context with useAuth hook
  - `lib/auth/session.ts` - Server-side getCurrentUser()
  - `app/api/auth/session/route.ts` - Session API endpoints

## Archive

Original SecureClawHub application is archived in `_archive/original-app/` (safe to delete).
Import source files are in `landing-import/` (safe to delete after integration confirmed).

## Tech Stack & Versions (Updated: February 2026)

### Runtime
- **Node.js**: 20.20.0

### Frontend
- **Next.js**: 16.1.6 (App Router with RSC + client components)
- **React**: 19.2.0
- **React DOM**: 19.2.0
- **shadcn/ui** on Radix UI primitives
- **Tailwind CSS**: v4.1.18 with "Fun Consumer" single theme (light only)
- **TanStack React Query**: 5.60.5

### Backend
- **Next.js custom server** via `server/index.ts`
- **Express**: 5.0.1
- **PostgreSQL + Drizzle ORM**: 0.39.3
- **Zod** for runtime validation

### Analytics & SEO
- **Google Analytics**: @next/third-parties 16.1.6 (GA4 ID: G-ZP35N89HPY)

### Key Dependencies
- **UI**: Radix UI components, Lucide React 0.545.0, class-variance-authority 0.7.1
- **Forms**: React Hook Form with @hookform/resolvers 3.10.0
- **Data**: Drizzle ORM 0.39.3, drizzle-zod 0.7.0, TanStack React Query 5.60.5
- **Utilities**: date-fns 3.6.0, clsx 2.1.1, cmdk 1.1.1

### Key Directories
```
app/                → Next.js App Router pages
components/         → React components
  ├── landing/      → Landing page sections (nav, hero, features, etc.)
  └── ui/           → shadcn/ui primitives
lib/                → Utilities, Firebase config, auth helpers
server/             → Custom server entry point
shared/             → Database schema (Drizzle)
hooks/              → Custom React hooks
public/images/creditclaw/ → Landing page images (cards, avatars, logo)
_archive/           → Archived original SecureClawHub app
landing-import/     → Import source (can be deleted)
```
