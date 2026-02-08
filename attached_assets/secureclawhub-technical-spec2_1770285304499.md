# SecureClawHub.com — Technical Specification

## What We're Building

A security-focused directory for the OpenClaw ecosystem. We audit, rank, and list skills, services, and providers — giving users trust signals they can't get from the open ClawHub registry.

Beyond the directory, we're a content hub: news aggregation, blogs, guides, and pages for advisors, media contacts, and providers who can manage their own listings.

---

## The OpenClaw Ecosystem (Context)

**OpenClaw** (formerly ClawdBot → MoltBot) is an open-source AI assistant that runs locally and connects to messaging platforms (WhatsApp, Telegram, Slack, etc.). It extends via **Skills** — markdown files that teach the agent new capabilities.

**The problem:** ClawHub.ai hosts 3,000+ skills with no gatekeeping. 341+ malicious skills were recently found distributing malware. Users can't assess trust.

**Our solution:** Audited directory + threat monitoring + trust badges.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Database | Replit PostgreSQL |
| ORM | Prisma |
| Storage | Replit Object Storage |
| Auth | NextAuth.js (GitHub OAuth) |
| Search | PostgreSQL full-text + pg_trgm |

---

## Data Model

Four main content types plus shared infrastructure.

### Listings (Directory)

```
Listing
├── id, slug, name, description, image
├── type: SKILL | SERVICE | SDK | PARTNER | INFRASTRUCTURE
├── website, sourceUrl
├── categoryId → Category
├── tags[] → Tag
├── providerId → Provider (if claimed)
├── stats: { stars, downloads, versions }
├── status: DRAFT | PUBLISHED | ARCHIVED
├── featured, lastScrapedAt
├── createdAt, updatedAt

SecurityAudit (one per Listing)
├── id, listingId
├── riskLevel: LOW | MEDIUM | HIGH | CRITICAL | UNREVIEWED
├── permissionScope: MINIMAL | MODERATE | BROAD | FULL_ACCESS
├── flags[] (issue codes)
├── malwareHistory: CLEAN | PAST_INCIDENT | FLAGGED
├── lastAuditedAt
├── auditedBy: AUTOMATED | MANUAL | COMMUNITY
```

### Content (News, Blogs, Guides)

```
Content
├── id, slug, title, excerpt, body (markdown)
├── type: NEWS | BLOG | GUIDE | CHANGELOG
├── image, sourceUrl, sourceName
├── tags[] → Tag
├── authorId → Person (optional)
├── status, publishedAt
├── createdAt, updatedAt
```

NEWS: `body` is null — just excerpt + link to source.
BLOG/GUIDE: full markdown content.

### People (Advisors, Media, Team)

```
Person
├── id, slug, name, title, bio, image
├── type: ADVISOR | MEDIA | TEAM
├── email, twitter, linkedin, website
├── status, sortOrder
├── createdAt, updatedAt
```

### Providers (Companies with Dashboard Access)

```
Provider
├── id, slug, name, description, logo, website
├── contactEmail
├── userId → User (NextAuth)
├── listings[] → Listing
├── verified, status
├── createdAt, updatedAt
```

### Shared

```
Category
├── id, slug, name, description, icon, image, sortOrder

Tag
├── id, slug, name

ThreatSignature
├── id, name, pattern, severity, description, source
├── createdAt
```

---

## Pages

### Public

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/skills` | Browse skills |
| `/skills/[slug]` | Skill detail + audit |
| `/services` | Browse services |
| `/sdks` | Browse SDKs |
| `/partners` | Browse partners |
| `/categories` | All categories |
| `/categories/[slug]` | Listings in category |
| `/news` | Aggregated news |
| `/news/[slug]` | News item |
| `/blog` | Original content |
| `/blog/[slug]` | Blog post |
| `/guides` | How-to guides |
| `/advisors` | Advisory board |
| `/media` | Media contacts |
| `/providers` | Provider directory |
| `/providers/[slug]` | Provider profile |
| `/about`, `/contact` | Static |

### Provider Dashboard

| Route | Description |
|-------|-------------|
| `/dashboard` | Overview |
| `/dashboard/listings` | Manage listings |
| `/dashboard/settings` | Profile |

### Admin

| Route | Description |
|-------|-------------|
| `/admin/listings` | All listings |
| `/admin/content` | News/blogs |
| `/admin/people` | Advisors/media/team |
| `/admin/threats` | Threat signatures |
| `/admin/providers` | Verify providers |

---

## UI Components

One card pattern for everything:

```
<Card>
  <CardImage />
  <CardBody>
    <CardTitle />
    <CardExcerpt />
    <CardMeta />      # date, category, risk badge
    <CardTags />
  </CardBody>
</Card>

<CardGrid />          # Responsive grid
<CardList />          # Vertical list
<FilterBar />         # Filters + search
<Pagination />
```

Same components render listings, content, people, providers, categories.

---

## Complex Features

### 1. Auditing Engine

Analyzes SKILL.md files for security risks.

**Layers:**

| Layer | Checks |
|-------|--------|
| Permission scanner | `requires.bins`, `requires.env`, file/network patterns |
| Pattern matcher | Suspicious strings, obfuscated code, known signatures |
| Dependency checker | URLs, packages against known-bad list |
| Behavioral flags | Crypto wallet, credential harvesting, exfiltration |
| LLM review | Claude API for ambiguous cases (optional) |

**Output:** Risk level + permission scope + flags array.

**Triggers:** New listing scraped, threat signatures updated, manual request.

### 2. Threat Intelligence Scraper

Monitors security sources for OpenClaw threats.

**Sources:** GitHub Security Advisories, BleepingComputer, The Hacker News (RSS), Reddit, awesome-openclaw-skills Issues.

**Process:** Scrape → extract IOCs → create ThreatSignature → re-audit affected listings.

**Runs:** Every 6 hours.

### 3. Skill Scraper

Pulls new skills from ClawHub ecosystem.

**Sources:** `openclaw/skills` GitHub repo (primary), ClawHub CLI (verification).

**Process:** Detect new SKILL.md → parse → create Listing (UNREVIEWED) → trigger audit → infer category.

**Runs:** Hourly.

### 4. Stats Updater

Keeps popularity metrics current.

**Metrics:** Stars, downloads, versions.
**Sources:** GitHub API, ClawHub CLI.
**Scope:** Top 10% by downloads.

**Runs:** Every 4 hours (top 10%), daily (rest).

### 5. News Scraper

Aggregates OpenClaw news.

**Sources:** RSS feeds matching OpenClaw keywords.

**Process:** Pull items → create Content (type: NEWS) → auto-tag.

**Runs:** Every 2 hours.

---

## Cron Jobs

| Job | Frequency | Purpose |
|-----|-----------|---------|
| `scrape-skills` | Hourly | Pull new skills |
| `scrape-news` | Every 2 hours | Aggregate news |
| `scrape-threats` | Every 6 hours | Monitor security sources |
| `update-stats` | Every 4 hours | Refresh metrics |
| `re-audit` | Daily | Re-audit on new threats |

---

## Image Storage

All images in Replit Object Storage:

```
/listings/{id}.jpg
/content/{id}.jpg
/people/{id}.jpg
/providers/{id}.jpg
/categories/{slug}.jpg
```

---

## File Structure

```
/app
  /page.tsx
  /skills/...
  /services/...
  /categories/...
  /news/...
  /blog/...
  /advisors/...
  /providers/...
  /dashboard/...
  /admin/...
  /api/...

/components
  /ui (Card, CardGrid, FilterBar, Pagination)
  /layout (Header, Footer)

/lib
  db.ts
  storage.ts
  /auditing (engine.ts, patterns.ts)
  /scrapers (skills.ts, news.ts, threats.ts, stats.ts)

/prisma
  schema.prisma
```

---

## MVP Phases

### Phase 1: Directory
- Database schema
- Skill scraper
- Basic auditing
- Public pages + search

### Phase 2: Content + People
- Content model + news scraper
- Blog admin
- People pages

### Phase 3: Providers + Threats
- Provider auth + dashboard
- Threat signatures + scraper

### Phase 4: Polish
- Stats updater
- Community reporting
- Badges
- SEO (sitemaps, structured data)

---

## Open Questions

1. ClawHub partnership — API access?
2. LLM costs — Budget for Claude auditing?
3. Badge authority — Manual review process?
4. Provider pricing — Free vs paid?

---

## References

- [ClawHub.ai](https://clawhub.ai)
- [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- [openclaw/skills](https://github.com/openclaw/skills)
- [OpenClaw Docs](https://docs.openclaw.ai/tools/skills)
- [Malicious skills incident](https://www.bleepingcomputer.com/news/security/malicious-moltbot-skills-used-to-push-password-stealing-malware/)
