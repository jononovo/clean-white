import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { providers, services } from "@/shared/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const partner = searchParams.get("partner");
    const handle = searchParams.get("handle");

    let query = db.select().from(providers);

    if (partner === "true") {
      query = query.where(eq(providers.isPartner, true)) as typeof query;
    }

    if (handle) {
      query = query.where(eq(providers.handle, handle)) as typeof query;
    }

    const result = await query.orderBy(desc(providers.rating));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error browsing providers:", error);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}
