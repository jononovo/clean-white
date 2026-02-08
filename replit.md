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
- URL pattern: `/{handle}` for provider profile, `/{handle}/{slug}` for skills/services (no @ prefix)

**Database Tables:**
- `providers`: id, userId (nullable), handle (unique), displayName, description, avatarUrl, location, website, contactEmail, isVerified, isPartner, partnerRole (legacy), tagline, rating
- `services`: id, providerId, name, description, category (legacy text), categoryId (legacy FK), slug, url, pricingType, pricingLabel, priceMin, priceMax, rating, popularity, isActive
- `categories`: id, slug (unique), name, description, icon, examples (subcategory keywords array), parentId, sortOrder
- `featured_items`: id, type (hero/app/skill/service), name, description, imageUrl, href, sourceUrl, subtitle, author, isVerified, isActive, sortOrder

**Many-to-Many Junction Tables (Added: February 2026):**
- `service_categories`: serviceId + categoryId (composite PK) — services can belong to multiple categories
- `skill_categories`: skillId + categoryId (composite PK) — skills can belong to multiple categories
- `provider_roles`: providerId + role (composite PK) — providers can have multiple roles (consultant, partner, trainer, sponsor, ambassador, reseller)

**Unified Category System (Updated: February 2026):**
- 38 content categories shared by skills and services via junction tables
- Services mapped: managed_hosting→DevOps & Cloud, setup_installation→Self-Hosted & Automation, finance_tax→Finance, training→Education & Learning
- Consulting/partnerships are provider roles (stored in provider_roles table), services mapped by subject matter
- A service or skill can appear in up to 3-4 categories; a provider can have up to 5-6 roles
- Category pages show skills + services + providers with filter tabs
- `categories.examples` contains subcategory keywords (VPS hosting, tax, DeFi, etc.)

**Homepage Database Integration (Added: February 2026):**
- Sections 3-7 now fetch from database with hardcoded fallbacks
- Service Categories Marketplace: 6 unified categories with 23 services
- Featured of the Day: 4 rotating items (hero, app, skill, service) from featured_items table
- Top VPS Services: Filtered from services where categorySlug=devops-cloud
- Our Partners: Filtered from providers where isPartner=true
- Seed script: `scripts/seed-homepage.ts`

**Key Files:**
- `app/api/providers/route.ts` - Provider CRUD (auth required)
- `app/api/providers/browse/route.ts` - Public provider browsing (supports ?partner=true)
- `app/api/providers/check-handle/route.ts` - Handle availability check
- `app/api/services/route.ts` - Service CRUD (GET is public, POST requires auth)
- `app/api/featured/route.ts` - Featured items (public)
- `hooks/use-homepage-data.ts` - React Query hooks for homepage data fetching
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
features/      → Feature-based modules (modular architecture)
  ├── featured/  → Featured Today cards + data
  ├── services/  → Services Marketplace components + types
  ├── skills/    → Skill cards, audit badges, list rows
  ├── providers/ → Provider-related components
  └── threats/   → Threat intelligence components
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