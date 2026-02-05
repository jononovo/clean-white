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

## Tech Stack

### Frontend
- **Next.js 15** with App Router (RSC + client components)
- **shadcn/ui** on Radix UI primitives
- **Tailwind CSS v4** with dual theme support (Slate/Warm × Light/Dark)
- **TanStack Query** for server state

### Backend
- **Next.js custom server** via `server/index.ts`
- **PostgreSQL + Drizzle ORM** for persistence
- **Zod** for runtime validation

### Key Directories
```
app/           → Next.js App Router pages
components/    → React components (ui/ for primitives)
lib/           → Utilities, mock data, theme config
server/        → Custom server entry point
shared/        → Database schema (Drizzle)
hooks/         → Custom React hooks
```

## Dependencies

- **UI**: Radix UI, Lucide icons, class-variance-authority
- **Data**: Drizzle ORM, TanStack React Query
- **Build**: TypeScript, PostCSS, Tailwind v4