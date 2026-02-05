import type { MetadataRoute } from "next";
import { db } from "@/server/db";
import { skills } from "@/shared/schema";
import { count, asc } from "drizzle-orm";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://secureclawhub.com";
const URLS_PER_SITEMAP = 10000;

export async function generateSitemaps() {
  const result = await db.select({ count: count() }).from(skills);
  const totalSkills = result[0]?.count || 0;
  const numSitemaps = Math.max(1, Math.ceil(totalSkills / URLS_PER_SITEMAP));

  return Array.from({ length: numSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const offset = id * URLS_PER_SITEMAP;

  const skillList = await db
    .select({
      slug: skills.slug,
      updatedAt: skills.updatedAt,
    })
    .from(skills)
    .orderBy(asc(skills.id))
    .limit(URLS_PER_SITEMAP)
    .offset(offset);

  return skillList.map((skill) => ({
    url: `${BASE_URL}/skills/${skill.slug}`,
    lastModified: skill.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
}

export const revalidate = 3600;
