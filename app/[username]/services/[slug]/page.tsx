"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BadgeCheck,
  Globe,
  ExternalLink,
  Star,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  ArrowLeft,
  AlertTriangle,
  Server,
  Settings,
  GraduationCap,
  Handshake,
  Landmark,
  Wrench,
} from "lucide-react";

const CATEGORY_MAP: Record<string, { label: string; icon: typeof Server }> = {
  setup_installation: { label: "Setup & Installation", icon: Wrench },
  managed_hosting: { label: "Managed Hosting", icon: Server },
  consulting: { label: "Consulting", icon: Settings },
  training: { label: "Training", icon: GraduationCap },
  partnerships: { label: "Partnerships", icon: Handshake },
  finance_tax: { label: "Finance & Tax", icon: Landmark },
};

interface ServiceDetail {
  id: string;
  providerId: string;
  providerHandle: string;
  providerDisplayName: string;
  providerDescription: string | null;
  providerWebsite: string | null;
  providerAvatarUrl: string | null;
  providerIsVerified: boolean;
  providerIsPartner: boolean;
  providerPartnerRole: string | null;
  providerRating: number | null;
  name: string;
  description: string | null;
  category: string;
  slug: string;
  url: string | null;
  pricingType: string;
  pricingLabel: string | null;
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  popularity: number | null;
  isActive: boolean;
  createdAt: string;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const handle = (params.username as string)?.replace("@", "");
  const slug = params.slug as string;
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${handle}/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Service not found");
          } else {
            setError("Failed to load service");
          }
          return;
        }
        const data = await res.json();
        setService(data);
      } catch {
        setError("Failed to load service");
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [handle, slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading service...</div>
        </div>
      </Layout>
    );
  }

  if (error || !service) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
          <h1 className="text-2xl font-bold">{error || "Service not found"}</h1>
          <p className="text-muted-foreground">The service you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  const categoryInfo = CATEGORY_MAP[service.category] || { label: service.category, icon: Package };
  const CategoryIcon = categoryInfo.icon;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/@${service.providerHandle}`} className="hover:text-primary transition-colors flex items-center gap-1" data-testid="breadcrumb-provider">
            <ArrowLeft className="w-3.5 h-3.5" />
            @{service.providerHandle}
          </Link>
          <span>/</span>
          <span className="text-foreground">services</span>
          <span>/</span>
          <span className="text-foreground">{service.slug}</span>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
          <CardContent className="p-6 -mt-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl border-4 border-background shadow-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center" data-testid="service-icon">
                  <CategoryIcon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="flex-1 space-y-4 pt-2">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl font-bold" data-testid="service-name">
                      {service.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="gap-1 text-xs">
                        <CategoryIcon className="w-3 h-3" />
                        {categoryInfo.label}
                      </Badge>
                      {service.pricingLabel && (
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <DollarSign className="w-3 h-3" />
                          {service.pricingLabel}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {service.url && (
                    <Button className="gap-2" asChild data-testid="visit-service-button">
                      <a href={service.url.startsWith("http") ? service.url : `https://${service.url}`} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4" />
                        Visit Service
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  )}
                </div>

                {service.description && (
                  <p className="text-foreground/80 leading-relaxed" data-testid="service-description">
                    {service.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {service.rating != null && (
                    <div className="flex items-center gap-1" data-testid="service-rating">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-medium text-foreground">{(service.rating / 10).toFixed(1)}</span>
                      <span>/ 5.0</span>
                    </div>
                  )}
                  {service.popularity != null && (
                    <div className="flex items-center gap-1" data-testid="service-popularity">
                      <TrendingUp className="w-4 h-4" />
                      <span>{service.popularity}/10 popularity</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="capitalize">{service.pricingType.replace("_", " ")} pricing</span>
                  </div>
                </div>

                {(service.priceMin != null || service.priceMax != null) && (
                  <div className="text-sm text-muted-foreground">
                    {service.priceMin != null && service.priceMax != null ? (
                      <span>${service.priceMin} – ${service.priceMax}/mo</span>
                    ) : service.priceMin != null ? (
                      <span>From ${service.priceMin}/mo</span>
                    ) : (
                      <span>Up to ${service.priceMax}/mo</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader className="border-b border-border/50">
            <h2 className="text-lg font-semibold">Provided by</h2>
          </CardHeader>
          <CardContent className="p-0">
            <Link
              href={`/@${service.providerHandle}`}
              className="flex items-center gap-4 p-6 hover:bg-muted/30 transition-colors group"
              data-testid="provider-link"
            >
              <div className="flex-shrink-0">
                {service.providerAvatarUrl ? (
                  <img
                    src={service.providerAvatarUrl}
                    alt={service.providerDisplayName}
                    className="w-14 h-14 rounded-xl border border-border/50"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-border/50">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors" data-testid="provider-name">
                    {service.providerDisplayName}
                  </span>
                  {service.providerIsVerified && (
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">@{service.providerHandle}</p>
                {service.providerDescription && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.providerDescription}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {service.providerIsPartner && service.providerPartnerRole && (
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 gap-1 text-xs">
                    <Package className="w-3 h-3" />
                    {service.providerPartnerRole}
                  </Badge>
                )}
                <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </CardContent>
        </Card>

        {service.url && (
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <a
                    href={service.url.startsWith("http") ? service.url : `https://${service.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                    data-testid="service-external-url"
                  >
                    {service.url}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
