import { NextResponse, type NextRequest } from "next/server"

const protectedPrefixes = ["/dashboard", "/quotes", "/followups", "/settings"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSessionCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token"))

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix))

  if (!hasSessionCookie && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (hasSessionCookie && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/quotes/:path*", "/followups/:path*", "/settings/:path*", "/login"],
}
