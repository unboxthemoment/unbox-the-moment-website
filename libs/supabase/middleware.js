import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import config from "@/config";

const isAdminRoute = (pathname) =>
  pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin");

const isAdminEmail = (email) =>
  !!email && (config.adminEmails || []).map((e) => e.toLowerCase()).includes(email.toLowerCase());

// Block non-admins from /admin pages and /api/admin routes.
// Pages redirect to sign-in (or home if signed in with a non-admin account); API routes get a JSON error.
function denyAdminAccess(request, user) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: user ? 403 : 401 });
  }
  const url = request.nextUrl.clone();
  url.pathname = user ? "/" : config.auth.loginUrl;
  url.search = "";
  return NextResponse.redirect(url);
}

export async function updateSession(request) {
  const { pathname } = request.nextUrl;

  // Skip if Supabase is not configured (admin routes stay locked)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (isAdminRoute(pathname)) {
      return denyAdminAccess(request, null);
    }
    return NextResponse.next({
      request,
    });
  }

  // Skip auth refresh for API routes that don't need authentication
  const skipAuthRoutes = ["/api/webhook", "/api/lead"];

  if (skipAuthRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next({
      request,
    });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  // refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminRoute(pathname) && !isAdminEmail(user?.email)) {
    return denyAdminAccess(request, user);
  }

  return supabaseResponse;
}
