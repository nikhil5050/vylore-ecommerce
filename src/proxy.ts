import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isComingSoon } from "@/config/launch";

// Next.js 16 renamed the middleware.ts convention to proxy.ts (same
// NextRequest/NextResponse API, function just needs to be named `proxy` —
// see node_modules/next/dist/docs/.../file-conventions/proxy.md).

// Stays reachable while the storefront is gated: the admin panel (has its
// own login-based auth in RequireAdmin) and /login, which is exactly where
// RequireAdmin sends an unauthenticated admin. "/" is never redirected — it
// already renders ComingSoon directly (see src/app/page.tsx) when the gate
// is on.
const ALLOWED_PREFIXES = ["/admin", "/login"];

function isAllowedPath(pathname: string) {
  if (pathname === "/") return true;
  if (ALLOWED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return true;
  // Anything with a file extension is a static asset (images, fonts, the
  // manifest, etc.) — the matcher below already excludes _next/static,
  // _next/image, favicon.ico, robots.txt and sitemap.xml, but public/
  // assets like /logo/logo.png or /images/about/*.jpg still flow through
  // here and must not get redirected.
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

export function proxy(request: NextRequest) {
  if (!isComingSoon) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (isAllowedPath(pathname)) return NextResponse.next();

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
