import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { featuredItems } from "@/shared/schema";
import { eq, and, asc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let query = db.select().from(featuredItems).where(eq(featuredItems.isActive, true));

    if (type) {
      query = db.select().from(featuredItems).where(
        and(eq(featuredItems.isActive, true), eq(featuredItems.type, type))
      );
    }

    const result = await query.orderBy(asc(featuredItems.sortOrder));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching featured items:", error);
    return NextResponse.json({ error: "Failed to fetch featured items" }, { status: 500 });
  }
}
