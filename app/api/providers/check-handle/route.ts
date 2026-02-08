import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");

    if (!handle) {
      return NextResponse.json({ error: "Handle is required" }, { status: 400 });
    }

    const handleLower = handle.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    const available = await db.isHandleAvailable(handleLower);

    return NextResponse.json({ available, handle: handleLower });
  } catch (error) {
    console.error("Error checking handle:", error);
    return NextResponse.json({ error: "Failed to check handle" }, { status: 500 });
  }
}
