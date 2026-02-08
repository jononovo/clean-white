import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionCookie, SESSION_COOKIE_NAME, SESSION_EXPIRY } from "@/lib/auth/session";
import { adminAuth } from "@/lib/firebase/admin";
import { db } from "@/lib/db";

function extractGitHubUsername(firebaseUser: { providerData?: Array<{ providerId: string; uid?: string }> }): string | null {
  const githubProvider = firebaseUser.providerData?.find(p => p.providerId === "github.com");
  return githubProvider?.uid || null;
}

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    const firebaseUser = await adminAuth.getUser(decoded.uid);

    const isGitHubLogin = firebaseUser.providerData?.some(p => p.providerId === "github.com");
    const githubUsername = extractGitHubUsername(firebaseUser);
    const photoUrl = firebaseUser.photoURL;

    let isNewUser = false;
    let user = await db.getUserByFirebaseUid(decoded.uid);
    if (!user) {
      isNewUser = true;
      const username = githubUsername || decoded.name || decoded.email?.split("@")[0] || "User";
      user = await db.createUserFromFirebase({
        firebaseUid: decoded.uid,
        email: decoded.email || "",
        username,
        avatarUrl: photoUrl,
      });
    }

    if (isGitHubLogin && githubUsername) {
      const existingProvider = await db.getProviderByUserId(user.id);
      if (!existingProvider) {
        const handleAvailable = await db.isHandleAvailable(githubUsername);
        if (handleAvailable) {
          await db.createProvider({
            userId: user.id,
            handle: githubUsername.toLowerCase(),
            displayName: decoded.name || githubUsername,
            avatarUrl: photoUrl,
            contactEmail: decoded.email,
          });
        }
      }
    }

    const sessionCookie = await createSessionCookie(idToken);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
      maxAge: SESSION_EXPIRY / 1000,
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

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
