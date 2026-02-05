# SecureClawHub

## Overview

SecureClawHub is a security-focused registry and community hub for OpenClaw skills, services, and SDKs. The platform provides audited, ranked, and verified components for autonomous agents, featuring threat monitoring, community events, news, and deployment tools. It serves as a trusted directory where developers can discover, publish, and deploy secure agent capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js with App Router (primary) alongside a Vite-powered React SPA (legacy/alternative client)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS v4 with CSS variables for theming, supporting dual themes (Slate/Warm) and light/dark modes
- **State Management**: TanStack React Query for server state, React useState for local UI state
- **Routing**: Next.js App Router for the main app, Wouter for the Vite client
- **Typography**: Plus Jakarta Sans (headings), Inter (UI), JetBrains Mono (code)

### Backend Architecture
- **Server**: Next.js custom server with Node.js HTTP server wrapper
- **API Pattern**: Express-style routes prepared for future API endpoints (currently minimal)
- **Build System**: Custom build script using esbuild for server bundling, Vite for client assets

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines database tables using Drizzle's pgTable
- **Migrations**: Drizzle Kit for schema migrations (`drizzle-kit push`)
- **Session Storage**: In-memory storage (`MemStorage` class) with interface for future database backing

### Design Patterns
- **Shared Schema**: Database schema and types are shared between client and server via `@shared` alias
- **Component Organization**: UI primitives in `components/ui/`, feature components in `components/`
- **Theme System**: CSS custom properties with data attributes for theme switching, persisted to localStorage
- **Mock Data**: Extensive mock data in `lib/mock-data.ts` for development and demonstration

## External Dependencies

### Database
- **PostgreSQL**: Primary database, configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with Zod schema validation

### UI Framework
- **Radix UI**: Comprehensive set of accessible, unstyled primitives (Dialog, Dropdown, Tabs, Toast, etc.)
- **shadcn/ui**: Pre-configured component library using Radix + Tailwind

### Data Fetching
- **TanStack React Query**: Server state management with caching and background updates

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework
- **tw-animate-css**: Animation utilities for Tailwind
- **class-variance-authority**: Component variant management

### Development Tools
- **Vite**: Development server and build tool for client assets
- **esbuild**: Fast JavaScript bundler for server code
- **TypeScript**: Full type safety across the codebase

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator