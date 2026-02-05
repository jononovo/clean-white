import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { db } from "@/lib/db";

const SESSION_COOKIE_NAME = "__session";
const SESSION_EXPIRY = 60 * 60 * 24 * 5 * 1000; // 5 days in ms

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

    let user = await db.getUserByFirebaseUid(decoded.uid);

    if (!user) {
      user = await db.createUserFromFirebase({
        firebaseUid: decoded.uid,
        email: decoded.email || "",
        username: decoded.name || decoded.email?.split("@")[0] || "User",
      });
    }

    return user;
  } catch (error) {
    return null;
  }
}

export async function createSessionCookie(idToken: string) {
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRY,
  });
  return sessionCookie;
}

export { SESSION_COOKIE_NAME, SESSION_EXPIRY };
