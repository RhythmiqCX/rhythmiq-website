import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Subdomain routing for the Rhythmiq Dev studio site.
 *
 * When a request arrives on the `dev.` subdomain (e.g. dev.rhythmiqcx.com), we
 * transparently rewrite it to the `/dev` route so the studio landing page is
 * served at the subdomain root. Every other host (rhythmiqcx.com, www, Vercel
 * previews, localhost) is a no-op, so the main restaurant site is untouched.
 *
 * NOTE: this only handles the *rewrite*. The `dev.rhythmiqcx.com` domain must
 * also be added to this project in Vercel (Project → Domains) and pointed at it
 * via DNS for the subdomain to reach this app at all.
 */
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase();
  const isDevSubdomain = host.startsWith("dev.");

  if (!isDevSubdomain) return NextResponse.next();

  const { pathname } = req.nextUrl;
  // Already under /dev (e.g. direct hit) — leave it alone.
  if (pathname === "/dev" || pathname.startsWith("/dev/")) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? "/dev" : `/dev${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, and any file with an extension (static
  // assets in /public like the hero video are served directly, host-agnostic).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
