import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // Define route configurations with their required roles
  const routeRoles = {
    "/dashboard/admin": ["admin"],
    "/dashboard/user": ["user"],
    "/coupon": ["admin"],
    "/estimate": ["admin,user"],
    "/profile": ["user", "admin"],
    "/sell": ["user", "admin"],
  };

  const currentPath = request.nextUrl.pathname;

  // Check if the current path is protected
  const matchedRoute = Object.entries(routeRoles).find(([route]) =>
    currentPath.startsWith(route)
  );

  if (!matchedRoute) {
    // ✅ Allow public access to routes not explicitly mentioned
    return NextResponse.next();
  }

  // Extract the required roles
  const [, allowedRoles] = matchedRoute;

  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    // Redirect to login page if token is missing
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    // Get the secret from environment variables
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    // Verify token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

    const userRole = payload.role as string;

    // Check if the user has the required role
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
