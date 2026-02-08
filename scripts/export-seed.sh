#!/bin/bash
# ============================================================
# Export development database seed data for production import
# 
# Usage: ./scripts/export-seed.sh
# Output: scripts/production-seed.sql
# ============================================================

set -e

OUTPUT="scripts/production-seed.sql"
TABLES="categories providers apps skills services featured_items"

echo "Exporting development database..."
echo "Tables: $TABLES"
echo ""

# Header
cat > "$OUTPUT" << 'HEADER'
-- ============================================================
-- SecureClawHub Production Database Seed
-- 
-- Safe to re-run: uses ON CONFLICT DO NOTHING
-- Wrapped in a transaction: all-or-nothing import
--
-- USAGE:
--   psql $DATABASE_URL -f scripts/production-seed.sql
--
-- NOTE: Schema must already exist. Run `npm run db:push` first.
-- ============================================================

BEGIN;

HEADER

# Export each table
for TABLE in $TABLES; do
  COUNT=$(PGPASSWORD=$PGPASSWORD psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" \
    -t -A -c "SELECT count(*) FROM $TABLE;" 2>/dev/null)
  
  echo "  $TABLE: $COUNT rows"
  
  echo "" >> "$OUTPUT"
  echo "-- $TABLE ($COUNT rows)" >> "$OUTPUT"
  
  PGPASSWORD=$PGPASSWORD pg_dump -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" \
    --data-only --inserts --no-owner --no-privileges \
    -t "$TABLE" 2>/dev/null | \
    grep '^INSERT' | \
    sed 's/);$/) ON CONFLICT DO NOTHING;/' >> "$OUTPUT"
done

# Footer
echo "" >> "$OUTPUT"
echo "COMMIT;" >> "$OUTPUT"

TOTAL=$(grep -c '^INSERT' "$OUTPUT")
echo ""
echo "Done! Exported $TOTAL rows total to $OUTPUT"
