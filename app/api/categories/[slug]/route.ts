import { NextResponse } from "next/server";
import { storage } from "@/server/storage";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const category = await storage.getCategoryBySlug(slug);
    
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    
    const skills = await storage.getSkillsByCategory(slug);
    
    return NextResponse.json({
      category,
      skills,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}
