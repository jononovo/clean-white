# SecureClawHub

## Overview

SecureClawHub is a trust and security registry for OpenClaw autonomous agent components. It provides verified, audited skill packages, SDKs, and services with threat intelligence monitoring, security scoring, and one-click deployment workflows.

**Core Features:**
- Skill/SDK registry with security audits and trust scores
- Real-time threat intelligence feeds and vulnerability tracking
- Community hub with events, news, and developer resources
- Deployment pipelines for agent capabilities

## User Preferences

Preferred communication style: Simple, everyday language.

## Authentication (Added: February 2026)

- **Firebase Authentication** with session cookies for SSR compatibility
- Sign-in methods: Google, GitHub, Email magic link (passwordless)
- Session management via httpOnly cookies (5-day expiry)
- Key files:
  - `lib/firebase/client.ts` - Client SDK init
  - `lib/firebase/admin.ts` - Admin SDK init (server-side)
  - `lib/auth/auth-context.tsx` - React context with useAuth hook
  - `lib/auth/session.ts` - Server-side getCurrentUser()
  - `app/api/auth/session/route.ts` - Session API endpoints
  - `proxy.ts` - Route protection middleware
  - `components/auth-drawer.tsx` - Login UI component

## Providers & Services Marketplace (Added: February 2026)

**Unified Provider Model:**
- Providers are separate from users (supports future team/multi-user management)
- **GitHub login**: Auto-creates provider with GitHub username as handle
- **Google/Email login**: User chooses handle when first publishing skill or listing service
- URL pattern: `/@handle` for provider profile, `/@handle/skill-slug` for skills

**Database Tables:**
- `providers`: id, userId, handle (unique), displayName, description, avatarUrl, location, website, contactEmail, isVerified
- `services`: id, providerId, name, description, category, pricingType (one_time/monthly/contact), priceMin, priceMax, isActive
- `skills.providerId`: Links skills to providers

**Service Categories:**
- setup_installation, managed_hosting, consulting, training, partnerships, finance_tax

**Key Files:**
- `app/api/providers/route.ts` - Provider CRUD
- `app/api/providers/check-handle/route.ts` - Handle availability check
- `app/api/services/route.ts` - Service CRUD
- `components/service-registration-drawer.tsx` - Service listing UI
- `lib/db.ts` - Database helpers for auth/provider management

## Tech Stack & Versions (Updated: February 2026)

### Runtime
- **Node.js**: 20.20.0

### Frontend
- **Next.js**: 16.1.6 (App Router with RSC + client components)
- **React**: 19.2.0
- **React DOM**: 19.2.0
- **shadcn/ui** on Radix UI primitives
- **Tailwind CSS**: v4.1.18 with dual theme support (Slate/Warm × Light/Dark)
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
app/           → Next.js App Router pages
components/    → React components (ui/ for primitives)
lib/           → Utilities, mock data, theme config
server/        → Custom server entry point
shared/        → Database schema (Drizzle)
hooks/         → Custom React hooks
```

## Sitemap Strategy (Planned)

For 10,000+ skill pages, will use Next.js `generateSitemaps()` with:
- Chunked sitemaps (10,000 URLs per file)
- ISR caching with hourly revalidation
- Separate sitemaps for static pages vs dynamic skill pages