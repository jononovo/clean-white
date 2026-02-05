import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/server/storage";
import { insertSkillSchema } from "@/shared/schema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;

    const skills = await storage.getSkills({ limit, offset, category, search });
    const total = await storage.getSkillCount();

    return NextResponse.json({ skills, total, limit, offset });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = insertSkillSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const skill = await storage.createSkill(parsed.data);
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
