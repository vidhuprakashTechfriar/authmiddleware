import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const IntersectionCookie: string = process.env.INTERSECTION_COOKIE
  ? process.env.INTERSECTION_COOKIE
  : "project_intersection";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.cookies.has(IntersectionCookie)
  ) {
    // If the user is not logged in and trying to access a page other than the login page, redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    request.nextUrl.pathname.startsWith("/login") &&
    request.cookies.has(IntersectionCookie)
  ) {
    // If the user is logged in and trying to access the login page, redirect to the home page
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    // Continue to the requested page if the conditions are not met
    return NextResponse.next();
  }
}

export const config = {
  // Define the matcher to apply the middleware to all paths except specific ones
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (static files)
     * - favicon.png (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.png|manifest.json|pwa|logo).*)",
  ],
};