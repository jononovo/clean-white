import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/server/db";
import { services, providers, categories, insertServiceSchema } from "@/shared/schema";
import { eq, desc, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const categorySlug = searchParams.get("categorySlug");
    const providerId = searchParams.get("providerId");

    const conditions = [];
    if (category) conditions.push(eq(services.category, category));
    if (providerId) conditions.push(eq(services.providerId, providerId));
    if (categorySlug) conditions.push(eq(categories.slug, categorySlug));

    const result = await db
      .select({
        id: services.id,
        providerId: services.providerId,
        providerHandle: providers.handle,
        name: services.name,
        description: services.description,
        category: services.category,
        categoryId: services.categoryId,
        categoryName: categories.name,
        categorySlug: categories.slug,
        slug: services.slug,
        url: services.url,
        pricingType: services.pricingType,
        pricingLabel: services.pricingLabel,
        priceMin: services.priceMin,
        priceMax: services.priceMax,
        rating: services.rating,
        popularity: services.popularity,
        isActive: services.isActive,
        createdAt: services.createdAt,
      })
      .from(services)
      .leftJoin(providers, eq(services.providerId, providers.id))
      .leftJoin(categories, eq(services.categoryId, categories.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(services.createdAt));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

    if (provider.length === 0) {
      return NextResponse.json({ error: "Provider profile required" }, { status: 400 });
    }

    const body = await request.json();
    const parsed = insertServiceSchema.parse({
      ...body,
      providerId: provider[0].id,
    });

    const result = await db.insert(services).values(parsed).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
