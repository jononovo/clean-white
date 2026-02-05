# Firebase Authentication for Next.js 16 — Implementation Guide

## Why This Document Exists

You are implementing Firebase Authentication in a Next.js 16 App Router application hosted on Replit. This guide gives you everything you need — architecture, code, and the reasoning behind each decision.

**Do NOT use:** Passport.js, NextAuth/Auth.js (has compatibility issues with Next.js 16), express-session, or any server-side session store. Firebase handles identity; your database stores application data. That's it.

---

## Does Next.js 16 Change Things vs Plain React?

**Yes, significantly.** Next.js 16 introduces three things that affect how you implement auth:

1. **Server Components (default)** — Components render on the server by default. The Firebase client SDK only works in the browser, so auth state must be passed to the server via cookies, not just held in React state.

2. **`proxy.ts` replaces `middleware.ts`** — Next.js 16 renamed middleware to proxy and explicitly discourages doing real auth logic there. Per the official docs and CVE-2025-29927 lessons: proxy.ts should only do lightweight routing (redirect if no cookie exists). Real token verification belongs in Server Components, Server Actions, and Route Handlers.

3. **Route Handlers replace Express** — Next.js has its own API routes (`app/api/*/route.ts`). You don't need Express at all.

**Bottom line:** You need a cookie-based approach so Server Components can read auth state. The Firebase client SDK signs users in on the client, then you store a session cookie (httpOnly) that the server can verify.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  BROWSER (Client Components — "use client")                  │
│                                                              │
│  Firebase Client SDK handles:                                │
│  - Google sign-in (popup/redirect)                           │
│  - Email/password sign-in & registration                     │
│  - Token refresh (automatic)                                 │
│                                                              │
│  After sign-in:                                              │
│  1. Get Firebase ID token                                    │
│  2. POST to /api/auth/session (Route Handler)                │
│  3. Server creates httpOnly session cookie                   │
│  4. Cookie sent automatically on all subsequent requests     │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  proxy.ts (lightweight — runs on Node.js in Next.js 16)      │
│                                                              │
│  ONLY does: check if session cookie exists                   │
│  - No cookie? → redirect to /login                           │
│  - Has cookie? → pass through (NextResponse.next())          │
│  - Does NOT verify the token here                            │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  SERVER (Server Components, Route Handlers, Server Actions)  │
│                                                              │
│  Uses Firebase Admin SDK to:                                 │
│  1. Verify session cookie (admin.auth().verifySessionCookie) │
│  2. Get decoded user claims (email, uid, etc.)               │
│  3. Find/create user in YOUR database                        │
│  4. Return user data to the component                        │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  YOUR DATABASE (PostgreSQL on Replit)                         │
│                                                              │
│  users table:                                                │
│  - id (serial primary key)                                   │
│  - firebase_uid (text, unique, indexed)                      │
│  - email (text, unique)                                      │
│  - username (text)                                           │
│  - created_at (timestamp)                                    │
│  - ...your app-specific fields                               │
└──────────────────────────────────────────────────────────────┘
```

### Why Session Cookies (Not Bearer Tokens)?

In plain React + Express, you can send `Authorization: Bearer <token>` on every API call. In Next.js 16, Server Components make `fetch()` calls internally — you don't control their headers. Cookies are sent automatically by the browser on every request, including navigations that trigger Server Component rendering. This is the standard pattern recommended by Firebase's own documentation for SSR frameworks.

---

## Dependencies

```bash
npm install firebase firebase-admin
```

**That's it.** No additional auth packages needed.

---

## Environment Variables (Replit Secrets)

```env
# Client-side (MUST start with NEXT_PUBLIC_ for Next.js)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=1:xxxx:web:xxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com

# Server-side only (never exposed to browser)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
DATABASE_URL=postgresql://...
```

**Note:** Unlike the plain React guide, Next.js 16 session cookies require `createSessionCookie()` from Firebase Admin, which needs a service account (client_email + private_key). You can generate this from Firebase Console → Project Settings → Service Accounts → Generate New Private Key.

---

## Firebase Console Setup

1. Go to https://console.firebase.google.com
2. Create project (or use existing)
3. Authentication → Sign-in methods → Enable:
   - Email/Password
   - Google
4. Authentication → Settings → Authorized domains → Add your Replit domain (e.g., `your-app.replit.app`)
5. Project Settings → General → Your apps → Add web app → Copy config values
6. Project Settings → Service Accounts → Generate New Private Key → Save the JSON

---

## Implementation

### 1. Firebase Client SDK Init

**`lib/firebase/client.ts`**

```typescript
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent re-initialization during hot reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };
```

### 2. Firebase Admin SDK Init

**`lib/firebase/admin.ts`**

```typescript
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminAuth = getAuth();
```

### 3. Server-Side Auth Helper

This is the core function that Server Components and Route Handlers call to get the current user.

**`lib/auth/session.ts`**

```typescript
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { db } from "@/lib/db"; // Your database connection

const SESSION_COOKIE_NAME = "__session";
const SESSION_EXPIRY = 60 * 60 * 24 * 5 * 1000; // 5 days in ms

// Get current user from session cookie — call this in Server Components
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

    // Find user in your database
    let user = await db.getUserByFirebaseUid(decoded.uid);

    // Auto-create on first visit (edge case: cookie exists but DB user doesn't)
    if (!user) {
      user = await db.createUser({
        firebaseUid: decoded.uid,
        email: decoded.email || "",
        username: decoded.name || decoded.email?.split("@")[0] || "User",
      });
    }

    return user;
  } catch (error) {
    // Cookie expired or invalid — will be cleared on next login
    return null;
  }
}

// Create session cookie — called from Route Handler after client-side sign-in
export async function createSessionCookie(idToken: string) {
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRY,
  });
  return sessionCookie;
}

export { SESSION_COOKIE_NAME, SESSION_EXPIRY };
```

### 4. Route Handlers (API Routes)

**`app/api/auth/session/route.ts`** — Creates session after sign-in

```typescript
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionCookie, SESSION_COOKIE_NAME, SESSION_EXPIRY } from "@/lib/auth/session";
import { adminAuth } from "@/lib/firebase/admin";
import { db } from "@/lib/db";

// POST: Create session (called after client-side Firebase sign-in)
export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
    }

    // Verify the ID token first to get user info
    const decoded = await adminAuth.verifyIdToken(idToken);

    // Find or create user in your database
    let user = await db.getUserByFirebaseUid(decoded.uid);
    if (!user) {
      user = await db.createUser({
        firebaseUid: decoded.uid,
        email: decoded.email || "",
        username: decoded.name || decoded.email?.split("@")[0] || "User",
      });
      // TODO: Award welcome credits, send welcome email, etc.
    }

    // Create the session cookie
    const sessionCookie = await createSessionCookie(idToken);

    // Set httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
      maxAge: SESSION_EXPIRY / 1000, // cookies() expects seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }
}

// DELETE: Destroy session (logout)
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
```

### 5. `proxy.ts` — Lightweight Route Guard

**`proxy.ts`** (in project root or `src/`)

Next.js 16 renamed `middleware.ts` to `proxy.ts`. Keep this lightweight — no JWT verification here.

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/settings", "/app"];
const publicPaths = ["/", "/login", "/register", "/api/auth"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public paths and static assets
  if (
    publicPaths.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check for session cookie (existence only — NOT verification)
  const session = request.cookies.get("__session");

  if (!session && protectedPaths.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

### 6. Auth Context (Client-Side)

**`lib/auth/auth-context.tsx`**

```tsx
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";

interface AppUser {
  id: number;
  email: string;
  username: string;
  firebaseUid: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, username: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Helper: sync Firebase sign-in with server session
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

  useEffect(() => {
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

  const signInWithEmail = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const appUser = await createServerSession(result.user);
    setUser(appUser);
  };

  const registerWithEmail = async (email: string, password: string, username: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (username) await updateProfile(result.user, { displayName: username });
    const appUser = await createServerSession(result.user);
    setUser(appUser);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const appUser = await createServerSession(result.user);
    setUser(appUser);
  };

  const logout = async () => {
    await signOut(auth);
    await fetch("/api/auth/session", { method: "DELETE" });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithEmail, registerWithEmail, signInWithGoogle, logout }}
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
```

### 7. Layout Setup

**`app/layout.tsx`**

```tsx
import { AuthProvider } from "@/lib/auth/auth-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### 8. Using Auth in Server Components

The whole point of the cookie approach — Server Components can access auth without any client-side JavaScript:

**`app/dashboard/page.tsx`**

```tsx
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      {/* This rendered entirely on the server with verified auth */}
    </div>
  );
}
```

### 9. Using Auth in Client Components

**`app/dashboard/profile-button.tsx`**

```tsx
"use client";

import { useAuth } from "@/lib/auth/auth-context";

export function ProfileButton() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div>
      <span>{user.email}</span>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

### 10. Using Auth in Route Handlers (API Routes)

**`app/api/user/data/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db.getUserData(user.id);
  return NextResponse.json(data);
}
```

### 11. Database Schema

Minimum viable `users` table (PostgreSQL):

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firebase_uid TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX idx_users_email ON users(email);
```

If using Drizzle ORM (common on Replit):

```typescript
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseUid: text("firebase_uid").unique(),
  email: text("email").unique().notNull(),
  username: text("username").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

---

## How It Works End-to-End

1. **User clicks "Sign in with Google"** → Firebase client SDK opens popup, returns `FirebaseUser`
2. **Client calls `createServerSession()`** → Gets ID token, POSTs to `/api/auth/session`
3. **Route Handler verifies token** → Uses `adminAuth.verifyIdToken()`, finds/creates DB user, calls `adminAuth.createSessionCookie()`, sets httpOnly cookie
4. **All subsequent requests** (page navigations, Server Components, Route Handlers) automatically include the cookie
5. **Server Components call `getCurrentUser()`** → Reads cookie, calls `adminAuth.verifySessionCookie()`, returns your DB user
6. **`proxy.ts`** does a quick cookie-existence check to redirect unauthenticated users before page rendering begins
7. **On logout** → Client calls `signOut(auth)` + `DELETE /api/auth/session` → Cookie deleted

---

## Next.js 16 Specific Considerations

### proxy.ts vs middleware.ts
- Next.js 16 renamed `middleware.ts` → `proxy.ts` and the export from `middleware()` → `proxy()`
- proxy.ts runs on Node.js (not Edge), which is actually better for auth since you have full Node.js APIs
- **Do NOT do JWT verification in proxy.ts** — it should be a quick traffic cop, not an auth server
- Real verification happens in Server Components and Route Handlers via `getCurrentUser()`

### Async params
- Next.js 16 requires `params` and `searchParams` to be awaited: `const { id } = await params`
- This doesn't affect auth directly but be aware when accessing route params in protected pages

### Cache Components
- If you enable `cacheComponents: true`, components are dynamic by default (good for auth)
- Never cache components that depend on auth state unless you scope cache keys by user
- The `getCurrentUser()` function reads cookies, which makes the component dynamic automatically

### Replit-Specific
- Set environment variables in Replit's Secrets tab (padlock icon), not in `.env` files
- Your Replit domain (`*.replit.app`) must be added to Firebase's authorized domains
- Replit uses HTTPS by default, so `secure: true` on cookies works in production

---

## File Structure Summary

```
your-app/
├── proxy.ts                          # Lightweight route guard
├── lib/
│   ├── firebase/
│   │   ├── client.ts                 # Firebase client SDK init
│   │   └── admin.ts                  # Firebase Admin SDK init
│   ├── auth/
│   │   ├── session.ts                # getCurrentUser(), createSessionCookie()
│   │   └── auth-context.tsx          # Client-side AuthProvider + useAuth hook
│   └── db.ts                         # Your database connection
├── app/
│   ├── layout.tsx                    # Wraps app in AuthProvider
│   ├── login/
│   │   └── page.tsx                  # Login page (client component)
│   ├── register/
│   │   └── page.tsx                  # Registration page (client component)
│   ├── dashboard/
│   │   └── page.tsx                  # Protected page (server component)
│   └── api/
│       └── auth/
│           └── session/
│               └── route.ts          # POST: create session, DELETE: destroy
```

---

## Checklist

- [ ] Firebase project created, Email/Password + Google sign-in enabled
- [ ] Replit domain added to Firebase authorized domains
- [ ] Service account key generated from Firebase Console
- [ ] All env vars set in Replit Secrets (both `NEXT_PUBLIC_*` and server-side)
- [ ] `firebase` and `firebase-admin` packages installed
- [ ] `lib/firebase/client.ts` — client SDK init
- [ ] `lib/firebase/admin.ts` — admin SDK init (with service account)
- [ ] `lib/auth/session.ts` — `getCurrentUser()` + `createSessionCookie()`
- [ ] `app/api/auth/session/route.ts` — POST (login) and DELETE (logout) handlers
- [ ] `proxy.ts` — lightweight cookie-existence check, redirects to /login
- [ ] `lib/auth/auth-context.tsx` — AuthProvider + useAuth hook
- [ ] `app/layout.tsx` wraps children in `<AuthProvider>`
- [ ] `users` table has `firebase_uid` column (unique, indexed)
- [ ] Protected Server Components call `getCurrentUser()` and redirect if null
- [ ] Protected Route Handlers call `getCurrentUser()` and return 401 if null
