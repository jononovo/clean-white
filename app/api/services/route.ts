import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/server/db";
import { services, providers, insertServiceSchema } from "@/shared/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const providerId = searchParams.get("providerId");

    let query = db.select().from(services);

    if (category) {
      query = query.where(eq(services.category, category)) as typeof query;
    }

    if (providerId) {
      query = query.where(eq(services.providerId, providerId)) as typeof query;
    }

    const result = await query.orderBy(desc(services.createdAt));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const provider = await db
      .select()
      .from(providers)
      .where(eq(providers.userId, user.id))
      .limit(1);

    if (provider.length === 0) {
      return NextResponse.json({ error: "Provider profile required" }, { status: 400 });
    }

    const body = await request.json();
    const parsed = insertServiceSchema.parse({
      ...body,
      providerId: provider[0].id,
    });

    const result = await db.insert(services).values(parsed).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
