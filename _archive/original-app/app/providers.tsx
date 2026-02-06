"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect, createContext, useContext } from "react";
import { AuthProvider } from "@/lib/auth/auth-context";

const MountedContext = createContext(false);

export function useMounted() {
  return useContext(MountedContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MountedContext.Provider value={mounted}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </MountedContext.Provider>
  );
}