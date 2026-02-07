"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Mail, ArrowRight, Github, Shield, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";

interface AuthDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register";
}

export function AuthDrawer({ open, onOpenChange, defaultTab = "login" }: AuthDrawerProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { signInWithGoogle, signInWithGithub, sendMagicLink, error, clearError, magicLinkSent, user } = useAuth();

  const handleGoogleSignIn = async () => {
    setIsLoading("google");
    clearError();
    try {
      await signInWithGoogle();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(null);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading("github");
    clearError();
    try {
      await signInWithGithub();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(null);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading("email");
    clearError();
    try {
      await sendMagicLink(email);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(null);
    }
  };

  if (user) {
    onOpenChange(false);
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 border-l border-neutral-200 bg-[hsl(210_40%_98%)]/95 backdrop-blur-xl">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-neutral-100">
            <SheetHeader className="text-left space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <img src="/images/creditclaw/logo-claw-chip.png" alt="CreditClaw" className="w-10 h-10 object-contain" />
                <SheetTitle className="text-2xl font-extrabold text-neutral-900">Welcome to CreditClaw</SheetTitle>
              </div>
              <SheetDescription className="text-neutral-500 font-medium">
                Sign in to manage your Claw Agent's spending power.
              </SheetDescription>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-full h-12 bg-neutral-100 p-1">
                <TabsTrigger value="login" className="rounded-full font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
                <TabsTrigger value="register" className="rounded-full font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Create Account</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 outline-none">
                {error && (
                  <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                    {error}
                  </div>
                )}

                {magicLinkSent ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-neutral-900">Check your email!</h3>
                      <p className="text-neutral-500 text-sm mt-1 font-medium">
                        We sent a magic link to <strong className="text-neutral-800">{email}</strong>
                      </p>
                      <p className="text-neutral-400 text-xs mt-2 font-medium">
                        Click the link in your email to sign in. You can close this window.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleMagicLink} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-neutral-700 font-bold text-sm">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 h-4 w-4 text-neutral-400" />
                          <Input
                            id="email"
                            placeholder="name@example.com"
                            className="pl-10 h-12 rounded-xl bg-white border-2 border-neutral-100 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-primary focus-visible:border-primary transition-all"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading !== null}
                            data-testid="input-email-login"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 rounded-full bg-primary text-white hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 text-base"
                        disabled={isLoading !== null || !email}
                        data-testid="button-magic-link-login"
                      >
                        {isLoading === "email" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending link...
                          </>
                        ) : (
                          <>
                            Send Magic Link
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-neutral-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[hsl(210_40%_98%)] px-3 text-neutral-400 font-bold tracking-wider">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="w-full gap-2 h-12 rounded-xl border-2 border-neutral-100 bg-white hover:bg-neutral-50 font-bold text-neutral-700"
                        onClick={handleGithubSignIn}
                        disabled={isLoading !== null}
                        data-testid="button-github-signin"
                      >
                        {isLoading === "github" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Github className="h-4 w-4" />
                        )}
                        GitHub
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full gap-2 h-12 rounded-xl border-2 border-neutral-100 bg-white hover:bg-neutral-50 font-bold text-neutral-700"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading !== null}
                        data-testid="button-google-signin"
                      >
                        {isLoading === "google" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                        )}
                        Google
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="register" className="space-y-4 outline-none">
                {error && (
                  <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                    {error}
                  </div>
                )}

                <div className="text-center py-4">
                  <p className="text-neutral-500 text-sm mb-6 font-medium">
                    Create your account instantly. No password required!
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full gap-2 h-12 rounded-xl border-2 border-neutral-100 bg-white hover:bg-neutral-50 font-bold text-neutral-700"
                    onClick={handleGithubSignIn}
                    disabled={isLoading !== null}
                    data-testid="button-github-register"
                  >
                    {isLoading === "github" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Github className="h-5 w-5" />
                    )}
                    Continue with GitHub
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 h-12 rounded-xl border-2 border-neutral-100 bg-white hover:bg-neutral-50 font-bold text-neutral-700"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading !== null}
                    data-testid="button-google-register"
                  >
                    {isLoading === "google" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                    )}
                    Continue with Google
                  </Button>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-neutral-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[hsl(210_40%_98%)] px-3 text-neutral-400 font-bold tracking-wider">
                      Or use email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-register" className="text-neutral-700 font-bold text-sm">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-4 w-4 text-neutral-400" />
                      <Input
                        id="email-register"
                        placeholder="name@example.com"
                        className="pl-10 h-12 rounded-xl bg-white border-2 border-neutral-100 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-primary focus-visible:border-primary transition-all"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading !== null}
                        data-testid="input-email-register"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-full bg-primary text-white hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 text-base"
                    disabled={isLoading !== null || !email}
                    data-testid="button-magic-link-register"
                  >
                    {isLoading === "email" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending link...
                      </>
                    ) : (
                      <>
                        Send Magic Link
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-center text-xs text-neutral-400 mt-4 font-medium">
                  By clicking continue, you agree to our{" "}
                  <a href="#" className="underline hover:text-primary transition-colors">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="underline hover:text-primary transition-colors">Privacy Policy</a>.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-6 border-t border-neutral-100 bg-neutral-50/50">
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 font-bold">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>Secured by Firebase Authentication</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
