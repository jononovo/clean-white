import { useQuery } from "@tanstack/react-query";

export function useServices() {
  return useQuery({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      return res.json();
    },
  });
}

export function useFeaturedItems() {
  return useQuery({
    queryKey: ["/api/featured"],
    queryFn: async () => {
      const res = await fetch("/api/featured");
      if (!res.ok) throw new Error("Failed to fetch featured");
      return res.json();
    },
  });
}

export function usePartners() {
  return useQuery({
    queryKey: ["/api/providers/browse", "partner=true"],
    queryFn: async () => {
      const res = await fetch("/api/providers/browse?partner=true");
      if (!res.ok) throw new Error("Failed to fetch partners");
      return res.json();
    },
  });
}

export function useProductivitySkills() {
  return useQuery({
    queryKey: ["/api/skills", "productivity"],
    queryFn: async () => {
      const res = await fetch("/api/skills?category=productivity&limit=5");
      if (!res.ok) throw new Error("Failed to fetch productivity skills");
      const data = await res.json();
      return data.skills || [];
    },
  });
}
