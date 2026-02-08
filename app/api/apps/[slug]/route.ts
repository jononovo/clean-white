import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { apps } from "@/shared/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [app] = await db
      .select()
      .from(apps)
      .where(eq(apps.slug, slug))
      .limit(1);

    if (!app) {
      return NextResponse.json({ error: "App not found" }, { status: 404 });
    }

    return NextResponse.json(app);
  } catch (error) {
    console.error("Error fetching app:", error);
    return NextResponse.json({ error: "Failed to fetch app" }, { status: 500 });
  }
}
