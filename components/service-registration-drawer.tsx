"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2, Building2, Package, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";

const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  setup_installation: "Setup & Installation",
  managed_hosting: "Managed Hosting",
  consulting: "Consulting",
  training: "Training",
  partnerships: "Partnerships",
  finance_tax: "Finance & Tax",
};

const PRICING_TYPE_LABELS: Record<string, string> = {
  one_time: "One-time",
  monthly: "Monthly",
  contact: "Contact for Quote",
};

interface ServiceRegistrationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCategory?: string;
  onLoginRequired: () => void;
}

export function ServiceRegistrationDrawer({
  open,
  onOpenChange,
  defaultCategory,
  onLoginRequired,
}: ServiceRegistrationDrawerProps) {
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState<"provider" | "service" | "success">("provider");
  const [isLoading, setIsLoading] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [providerForm, setProviderForm] = useState({
    businessName: "",
    description: "",
    location: "",
    website: "",
    contactEmail: "",
  });

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    category: defaultCategory || "consulting",
    pricingType: "contact",
    priceMin: "",
    priceMax: "",
  });

  useEffect(() => {
    if (defaultCategory) {
      setServiceForm((prev) => ({ ...prev, category: defaultCategory }));
    }
  }, [defaultCategory]);

  useEffect(() => {
    if (open && user) {
      checkProvider();
    }
  }, [open, user]);

  const checkProvider = async () => {
    try {
      const res = await fetch("/api/providers");
      if (res.ok) {
        const provider = await res.json();
        if (provider) {
          setHasProvider(true);
          setStep("service");
          setProviderForm({
            businessName: provider.businessName || "",
            description: provider.description || "",
            location: provider.location || "",
            website: provider.website || "",
            contactEmail: provider.contactEmail || "",
          });
        }
      }
    } catch (err) {
      console.error("Error checking provider:", err);
    }
  };

  const handleProviderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/providers", {
        method: hasProvider ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(providerForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save provider");
      }

      setHasProvider(true);
      setStep("service");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...serviceForm,
          priceMin: serviceForm.priceMin ? parseInt(serviceForm.priceMin) * 100 : null,
          priceMax: serviceForm.priceMax ? parseInt(serviceForm.priceMax) * 100 : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create service");
      }

      setStep("success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(hasProvider ? "service" : "provider");
      setError(null);
      setServiceForm({
        name: "",
        description: "",
        category: defaultCategory || "consulting",
        pricingType: "contact",
        priceMin: "",
        priceMax: "",
      });
    }, 300);
  };

  if (!authLoading && !user) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Sign In Required</SheetTitle>
            <SheetDescription>
              You need to sign in to register your services.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-8">
            <Button onClick={() => { onOpenChange(false); onLoginRequired(); }} className="w-full">
              Sign In to Continue
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        {step === "success" ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Service Listed!</h2>
              <p className="text-muted-foreground">
                Your service has been submitted and will be visible in the directory.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setStep("service");
                  setServiceForm({
                    name: "",
                    description: "",
                    category: defaultCategory || "consulting",
                    pricingType: "contact",
                    priceMin: "",
                    priceMax: "",
                  });
                }}
              >
                Add Another Service
              </Button>
              <Button onClick={handleClose}>Done</Button>
            </div>
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {step === "provider" ? (
                  <>
                    <Building2 className="w-5 h-5" />
                    Business Profile
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5" />
                    Add Service
                  </>
                )}
              </SheetTitle>
              <SheetDescription>
                {step === "provider"
                  ? "First, set up your business profile. This is shown on all your service listings."
                  : "Describe your service offering for the OpenClaw ecosystem."}
              </SheetDescription>
            </SheetHeader>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {step === "provider" && (
              <form onSubmit={handleProviderSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    placeholder="Your company or freelance name"
                    value={providerForm.businessName}
                    onChange={(e) => setProviderForm({ ...providerForm, businessName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">About Your Business</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your expertise and services"
                    value={providerForm.description}
                    onChange={(e) => setProviderForm({ ...providerForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={providerForm.location}
                      onChange={(e) => setProviderForm({ ...providerForm, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://"
                      value={providerForm.website}
                      onChange={(e) => setProviderForm({ ...providerForm, website: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="business@example.com"
                    value={providerForm.contactEmail}
                    onChange={(e) => setProviderForm({ ...providerForm, contactEmail: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Continue to Add Service
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}

            {step === "service" && (
              <form onSubmit={handleServiceSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name *</Label>
                  <Input
                    id="serviceName"
                    placeholder="e.g., OpenClaw Bot Setup & Configuration"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Description *</Label>
                  <Textarea
                    id="serviceDescription"
                    placeholder="Describe what you offer, what's included, and who it's for..."
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={serviceForm.category}
                    onValueChange={(v) => setServiceForm({ ...serviceForm, category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SERVICE_CATEGORY_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pricing Type *</Label>
                  <Select
                    value={serviceForm.pricingType}
                    onValueChange={(v) => setServiceForm({ ...serviceForm, pricingType: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PRICING_TYPE_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {serviceForm.pricingType !== "contact" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceMin">
                        {serviceForm.pricingType === "monthly" ? "Price ($/mo)" : "Price ($)"}
                      </Label>
                      <Input
                        id="priceMin"
                        type="number"
                        placeholder="0"
                        value={serviceForm.priceMin}
                        onChange={(e) => setServiceForm({ ...serviceForm, priceMin: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priceMax">Max Price (optional)</Label>
                      <Input
                        id="priceMax"
                        type="number"
                        placeholder="For ranges"
                        value={serviceForm.priceMax}
                        onChange={(e) => setServiceForm({ ...serviceForm, priceMax: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  {hasProvider && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("provider")}
                    >
                      Edit Profile
                    </Button>
                  )}
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Submit Service
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
