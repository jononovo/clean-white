# Exporting Development Database for Production

This guide explains how to export all seeded data (skills, services, providers, categories, featured items, and apps) from the development database into a SQL file that can be imported into production.

## Quick Export (One Command)

Run this from the project root to generate a fresh `scripts/production-seed.sql`:

```bash
./scripts/export-seed.sh
```

That's it. The script handles everything — connecting to the dev database, exporting all 6 tables, wrapping inserts in a transaction, and adding `ON CONFLICT DO NOTHING` so it's safe to run multiple times.

## What Gets Exported

| Table            | Description                                      |
|------------------|--------------------------------------------------|
| `categories`     | Skill categories (e.g. "Browser & Automation")   |
| `providers`      | Provider profiles (handles, descriptions, etc.)  |
| `skills`         | Published skills with author/category links      |
| `services`       | Service listings tied to providers                |
| `featured_items` | "Featured of the Day" cards on homepage           |
| `apps`           | App listings (e.g. OpenClaw Desktop)              |

## Export Order

Tables are exported in dependency order:

1. **categories** — no dependencies
2. **providers** — no dependencies
3. **apps** — references providers by handle
4. **skills** — references providers (via `provider_id`) and categories (via `category_id`)
5. **services** — references providers (via `provider_id`)
6. **featured_items** — standalone, references providers/skills by URL

## Importing Into Production

Once you're happy with the data in development:

```bash
# Option A: Use the DATABASE_URL directly
psql $PRODUCTION_DATABASE_URL -f scripts/production-seed.sql

# Option B: Specify connection details
psql -h <host> -p <port> -U <user> -d <database> -f scripts/production-seed.sql
```

**Important:** The production database tables must already exist (schema must be pushed first). This file only contains data — no table creation statements.

To push the schema first:

```bash
npm run db:push
```

## Re-Exporting After Changes

After making changes to the development data (adding skills, updating providers, etc.), just re-run the export script:

```bash
./scripts/export-seed.sh
```

This overwrites the previous `scripts/production-seed.sql` with a fresh export.

## Manual Export (If Needed)

If you need to export manually or customize the export:

```bash
PGPASSWORD=$PGPASSWORD pg_dump -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE \
  --data-only --inserts --no-owner --no-privileges \
  -t categories -t providers -t skills -t services -t featured_items -t apps \
  | grep -v '^\\\|^SET \|^SELECT pg_catalog' \
  | sed 's/);$/) ON CONFLICT DO NOTHING;/' \
  | sed '/^$/d' > scripts/production-seed.sql
```

Then wrap it in a transaction by adding `BEGIN;` at the top and `COMMIT;` at the bottom.

## Safety Notes

- **ON CONFLICT DO NOTHING**: Every INSERT uses this clause, so re-running the import won't create duplicate rows.
- **Transaction wrapped**: The entire import runs inside `BEGIN/COMMIT`, so if anything fails, nothing gets partially inserted.
- **No destructive operations**: The file contains only INSERTs — no DROP, DELETE, or UPDATE statements.
- **User accounts are NOT exported**: Provider records exist independently of user auth. Users claim providers by logging in and linking their account.
