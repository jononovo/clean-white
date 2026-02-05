import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/server/storage";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ username: string; slug: string }> }
) {
  try {
    const { username, slug } = await params;
    const skill = await storage.getSkillByUsernameAndSlug(username, slug);

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    await storage.incrementSkillDownloads(skill.id);

    return NextResponse.json({ success: true, downloads: skill.downloads + 1 });
  } catch (error) {
    console.error("Error incrementing downloads:", error);
    return NextResponse.json({ error: "Failed to increment downloads" }, { status: 500 });
  }
}
