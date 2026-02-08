import type { MetadataRoute } from "next";
import { db } from "@/server/db";
import { skills } from "@/shared/schema";
import { asc } from "drizzle-orm";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://secureclawhub.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/community`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/publish`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/skills`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const skillList = await db
    .select({
      slug: skills.slug,
      authorUsername: skills.authorUsername,
      updatedAt: skills.updatedAt,
    })
    .from(skills)
    .orderBy(asc(skills.id));

  const skillPages: MetadataRoute.Sitemap = skillList.map((skill) => ({
    url: `${BASE_URL}/${skill.authorUsername}/${skill.slug}`,
    lastModified: skill.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...skillPages];
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;
