import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Subdomain routing for Rhythmiq's marketing surfaces.
 *
 *  - `dev.rhythmiqcx.com`  → rewritten to `/dev` (the studio landing page).
 *  - `try.rhythmiqcx.com`  → rewritten to `/try` (per-prospect prototype sites,
 *                            e.g. try.rhythmiqcx.com/bella-bistro → /try/bella-bistro).
 *
 * On every other host (rhythmiqcx.com, www, Vercel previews, localhost) only the
 * root path is rewritten: `/` now serves the same studio landing page as
 * `dev.rhythmiqcx.com`. The original D2C home page is untouched in the codebase
 * at `src/app/(marketing)/page.tsx` — delete the SERVE_DEV_AT_ROOT block below to
 * put it back. Every other marketing route (/pricing, /blog, /voice-ai, ...) is
 * a no-op and keeps rendering as before.
 *
 * NOTE: this only handles the *rewrite*. Each subdomain (`dev.`, `try.`) must
 * also be added to this project in Vercel (Project → Domains) and pointed at it
 * via DNS for the subdomain to reach this app at all.
 */
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase();

  if (host.startsWith("dev.")) {
    const { pathname } = req.nextUrl;
    // Already under /dev (e.g. direct hit) — leave it alone.
    if (pathname === "/dev" || pathname.startsWith("/dev/")) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/dev" : `/dev${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (host.startsWith("try.")) {
    const { pathname } = req.nextUrl;
    if (pathname === "/try" || pathname.startsWith("/try/")) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/try" : `/try${pathname}`;
    return NextResponse.rewrite(url);
  }

  // SERVE_DEV_AT_ROOT — main site landing page shows the Rhythmiq Dev page.
  // Root path only; the rest of the marketing site is untouched.
  if (req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/dev";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals, API routes, and any file with an extension (static
  // assets in /public like the hero video are served directly, host-agnostic).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
