"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  GoogleAuthProvider,
  GithubAuthProvider,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, isConfigured } from "@/lib/firebase/client";

interface AppUser {
  id: string;
  email: string;
  username: string;
  firebaseUid: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  completeMagicLinkSignIn: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
  magicLinkSent: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function createServerSession(firebaseUser: FirebaseUser): Promise<AppUser> {
  const idToken = await firebaseUser.getIdToken();
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) throw new Error("Failed to create session");
  return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  useEffect(() => {
    if (!isConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const appUser = await createServerSession(firebaseUser);
          setUser(appUser);
        } catch (err) {
          console.error("Session sync failed:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isConfigured || !auth) return;
    
    if (isSignInWithEmailLink(auth, window.location.href)) {
      completeMagicLinkSignIn();
    }
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) throw new Error("Firebase not configured");
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const appUser = await createServerSession(result.user);
      setUser(appUser);
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
      throw err;
    }
  };

  const signInWithGithub = async () => {
    if (!auth) throw new Error("Firebase not configured");
    setError(null);
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const appUser = await createServerSession(result.user);
      setUser(appUser);
    } catch (err: any) {
      setError(err.message || "Failed to sign in with GitHub");
      throw err;
    }
  };

  const sendMagicLink = async (email: string) => {
    if (!auth) throw new Error("Firebase not configured");
    setError(null);
    try {
      const actionCodeSettings = {
        url: window.location.origin + "/?finishSignIn=true",
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMagicLinkSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send magic link");
      throw err;
    }
  };

  const completeMagicLinkSignIn = async () => {
    if (!auth) return;
    if (!isSignInWithEmailLink(auth, window.location.href)) return;
    
    setError(null);
    try {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation") || "";
      }
      const result = await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem("emailForSignIn");
      const appUser = await createServerSession(result.user);
      setUser(appUser);
      window.history.replaceState(null, "", window.location.pathname);
    } catch (err: any) {
      setError(err.message || "Failed to complete sign in");
    }
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    await fetch("/api/auth/session", { method: "DELETE" });
    setUser(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured,
        signInWithGoogle,
        signInWithGithub,
        sendMagicLink,
        completeMagicLinkSignIn,
        logout,
        error,
        clearError,
        magicLinkSent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
