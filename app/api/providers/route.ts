import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/server/db";
import { providers, insertProviderSchema } from "@/shared/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
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

    return NextResponse.json(provider[0] || null);
  } catch (error) {
    console.error("Error fetching provider:", error);
    return NextResponse.json({ error: "Failed to fetch provider" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await db
      .select()
      .from(providers)
      .where(eq(providers.userId, user.id))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ error: "Provider profile already exists" }, { status: 400 });
    }

    const body = await request.json();
    const parsed = insertProviderSchema.parse({
      ...body,
      userId: user.id,
    });

    const result = await db.insert(providers).values(parsed).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating provider:", error);
    return NextResponse.json({ error: "Failed to create provider" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const result = await db
      .update(providers)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(providers.userId, user.id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating provider:", error);
    return NextResponse.json({ error: "Failed to update provider" }, { status: 500 });
  }
}
