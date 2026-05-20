import { NextResponse, type NextRequest } from "next/server"

const protectedPaths = ["/dashboard", "/quotes", "/followups", "/settings"]

export function middleware(req: NextRequest) {
  const hasSession = req.cookies.has("sb-access-token") || req.cookies.has("sb:token")
  const isProtected = protectedPaths.some((p) => req.nextUrl.pathname === p || req.nextUrl.pathname.startsWith(`${p}/`))
  if (isProtected && !hasSession) return NextResponse.redirect(new URL('/login', req.url))
  if (req.nextUrl.pathname === '/login' && hasSession) return NextResponse.redirect(new URL('/dashboard', req.url))
  return NextResponse.next()
}

export const config = { matcher: ["/login", "/dashboard/:path*", "/quotes/:path*", "/followups/:path*", "/settings/:path*"] }
