import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionCookie, SESSION_COOKIE_NAME, SESSION_EXPIRY } from "@/lib/auth/session";
import { adminAuth } from "@/lib/firebase/admin";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);

    let user = await db.getUserByFirebaseUid(decoded.uid);
    if (!user) {
      user = await db.createUserFromFirebase({
        firebaseUid: decoded.uid,
        email: decoded.email || "",
        username: decoded.name || decoded.email?.split("@")[0] || "User",
      });
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
