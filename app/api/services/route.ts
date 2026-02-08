import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/server/db";
import { services, providers, categories, serviceCategories, insertServiceSchema } from "@/shared/schema";
import { eq, desc, and, inArray, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const categorySlug = searchParams.get("categorySlug");
    const providerId = searchParams.get("providerId");

    let serviceIds: string[] | null = null;

    if (categorySlug) {
      const catRows = await db
        .select({ serviceId: serviceCategories.serviceId })
        .from(serviceCategories)
        .innerJoin(categories, eq(serviceCategories.categoryId, categories.id))
        .where(eq(categories.slug, categorySlug));
      serviceIds = catRows.map((r) => r.serviceId);
      if (serviceIds.length === 0) {
        return NextResponse.json([]);
      }
    }

    const conditions = [];
    if (category) conditions.push(eq(services.category, category));
    if (providerId) conditions.push(eq(services.providerId, providerId));
    if (serviceIds) conditions.push(inArray(services.id, serviceIds));

    const rows = await db
      .select({
        id: services.id,
        providerId: services.providerId,
        providerHandle: providers.handle,
        name: services.name,
        description: services.description,
        category: services.category,
        categoryId: services.categoryId,
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
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(services.createdAt));

    const allServiceIds = rows.map((r) => r.id);
    let categoriesMap: Record<string, Array<{ id: string; name: string; slug: string }>> = {};

    if (allServiceIds.length > 0) {
      const catJoins = await db
        .select({
          serviceId: serviceCategories.serviceId,
          categoryId: categories.id,
          categoryName: categories.name,
          categorySlug: categories.slug,
        })
        .from(serviceCategories)
        .innerJoin(categories, eq(serviceCategories.categoryId, categories.id))
        .where(inArray(serviceCategories.serviceId, allServiceIds));

      for (const row of catJoins) {
        if (!categoriesMap[row.serviceId]) categoriesMap[row.serviceId] = [];
        categoriesMap[row.serviceId].push({
          id: row.categoryId,
          name: row.categoryName,
          slug: row.categorySlug,
        });
      }
    }

    const result = rows.map((r) => ({
      ...r,
      categories: categoriesMap[r.id] || [],
      categoryName: categoriesMap[r.id]?.[0]?.name || null,
      categorySlug: categoriesMap[r.id]?.[0]?.slug || null,
    }));

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
    const { categoryIds, ...serviceData } = body;

    const parsed = insertServiceSchema.parse({
      ...serviceData,
      providerId: provider[0].id,
    });

    const result = await db.insert(services).values(parsed).returning();
    const newService = result[0];

    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
      await db.insert(serviceCategories).values(
        categoryIds.map((catId: string) => ({
          serviceId: newService.id,
          categoryId: catId,
        }))
      );
    }

    return NextResponse.json(newService);
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
