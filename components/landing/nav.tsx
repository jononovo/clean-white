"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthDrawer } from "@/components/auth-drawer";
import { useAuth } from "@/lib/auth/auth-context";
import { useState } from "react";
import { LogOut, User } from "lucide-react";

export function Nav() {
  const [authOpen, setAuthOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<"login" | "register">("login");
  const { user, logout, loading } = useAuth();

  const openLogin = () => {
    setDefaultTab("login");
    setAuthOpen(true);
  };

  const openSignUp = () => {
    setDefaultTab("register");
    setAuthOpen(true);
  };

  return (
    <>
      <nav className="fixed top-8 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="group cursor-pointer flex items-center gap-2">
            <img src="/images/creditclaw/logo-claw-chip.png" alt="CreditClaw Logo" className="w-10 h-10 object-contain" />
            <span className="font-sans font-bold text-xl tracking-tight text-neutral-900">
              CreditClaw
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-500">
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#allowance" className="hover:text-primary transition-colors">Allowance</a>
            <a href="#safety" className="hover:text-primary transition-colors">Safety</a>
          </div>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-20 h-10 rounded-full bg-neutral-100 animate-pulse" />
            ) : user ? (
              <>
                <div className="hidden md:flex items-center gap-2 text-sm font-bold text-neutral-700">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span>{user.username}</span>
                </div>
                <Button
                  variant="ghost"
                  className="font-bold text-neutral-500 hover:bg-neutral-50 gap-2"
                  onClick={logout}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Log out</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="hidden md:flex font-bold text-neutral-600 hover:bg-neutral-50"
                  onClick={openLogin}
                  data-testid="button-login"
                >
                  Log in
                </Button>
                <Button
                  className="rounded-full h-10 px-6 bg-primary text-white hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"
                  onClick={openSignUp}
                  data-testid="button-signup"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthDrawer open={authOpen} onOpenChange={setAuthOpen} defaultTab={defaultTab} />
    </>
  );
}
