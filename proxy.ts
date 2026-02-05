import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/settings", "/submissions"];
const publicPaths = ["/", "/login", "/register", "/api/auth", "/skills", "/categories", "/news", "/jobs", "/community", "/deploy"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get("__session");

  if (!session && protectedPaths.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("login", "true");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
