import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { providers, providerRoles } from "@/shared/schema";
import { eq, desc, inArray } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const partner = searchParams.get("partner");
    const handle = searchParams.get("handle");
    const role = searchParams.get("role");

    let query = db.select().from(providers);

    if (partner === "true") {
      query = query.where(eq(providers.isPartner, true)) as typeof query;
    }

    if (handle) {
      query = query.where(eq(providers.handle, handle)) as typeof query;
    }

    if (role) {
      const providerIdsWithRole = await db
        .select({ providerId: providerRoles.providerId })
        .from(providerRoles)
        .where(eq(providerRoles.role, role));
      const ids = providerIdsWithRole.map((r) => r.providerId);
      if (ids.length === 0) {
        return NextResponse.json([]);
      }
      query = query.where(inArray(providers.id, ids)) as typeof query;
    }

    const result = await query.orderBy(desc(providers.rating));

    const providerIds = result.map((p) => p.id);
    let rolesMap: Record<string, string[]> = {};

    if (providerIds.length > 0) {
      const allRoles = await db
        .select()
        .from(providerRoles)
        .where(inArray(providerRoles.providerId, providerIds));

      for (const r of allRoles) {
        if (!rolesMap[r.providerId]) rolesMap[r.providerId] = [];
        rolesMap[r.providerId].push(r.role);
      }
    }

    const enriched = result.map((p) => ({
      ...p,
      roles: rolesMap[p.id] || (p.partnerRole ? [p.partnerRole] : []),
    }));

    return NextResponse.json(enriched);
  } catch (error) {
    console.error("Error browsing providers:", error);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}
