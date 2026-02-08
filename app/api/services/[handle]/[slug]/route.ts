import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { services, providers, categories, serviceCategories, providerRoles } from "@/shared/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ handle: string; slug: string }> }
) {
  try {
    const { handle, slug } = await params;

    const result = await db
      .select({
        id: services.id,
        providerId: services.providerId,
        providerHandle: providers.handle,
        providerDisplayName: providers.displayName,
        providerDescription: providers.description,
        providerWebsite: providers.website,
        providerAvatarUrl: providers.avatarUrl,
        providerIsVerified: providers.isVerified,
        providerIsPartner: providers.isPartner,
        providerPartnerRole: providers.partnerRole,
        providerRating: providers.rating,
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
      .innerJoin(providers, eq(services.providerId, providers.id))
      .where(
        and(
          eq(providers.handle, handle),
          eq(services.slug, slug)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const service = result[0];

    const [cats, roles] = await Promise.all([
      db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        })
        .from(serviceCategories)
        .innerJoin(categories, eq(serviceCategories.categoryId, categories.id))
        .where(eq(serviceCategories.serviceId, service.id)),
      db
        .select({ role: providerRoles.role })
        .from(providerRoles)
        .where(eq(providerRoles.providerId, service.providerId)),
    ]);

    return NextResponse.json({
      ...service,
      categories: cats,
      categoryName: cats[0]?.name || null,
      categorySlug: cats[0]?.slug || null,
      providerRoles: roles.map((r) => r.role),
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}
