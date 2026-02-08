import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { db as serverDb } from "@/server/db";
import { providers } from "@/shared/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const provider = await serverDb
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

    const existing = await serverDb
      .select()
      .from(providers)
      .where(eq(providers.userId, user.id))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ error: "Provider profile already exists" }, { status: 400 });
    }

    const body = await request.json();
    const { handle, displayName, description, location, website, contactEmail, avatarUrl } = body;

    if (!handle || !displayName) {
      return NextResponse.json({ error: "Handle and display name are required" }, { status: 400 });
    }

    const handleLower = handle.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    
    const handleAvailable = await db.isHandleAvailable(handleLower);
    if (!handleAvailable) {
      return NextResponse.json({ error: "Handle is already taken" }, { status: 400 });
    }

    const result = await serverDb.insert(providers).values({
      userId: user.id,
      handle: handleLower,
      displayName,
      description,
      location,
      website,
      contactEmail,
      avatarUrl,
    }).returning();

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
    const { displayName, description, location, website, contactEmail, avatarUrl } = body;

    const result = await serverDb
      .update(providers)
      .set({
        displayName,
        description,
        location,
        website,
        contactEmail,
        avatarUrl,
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
