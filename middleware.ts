import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const INTERNAL_QUOTES_PREFIXES = ["/quotes/create", "/quotes/history"]

function isInternalQuoteRoute(pathname: string) {
  if (INTERNAL_QUOTES_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return true
  }

  const quoteDetailMatch = pathname.match(/^\/quotes\/[^/]+$/)
  return Boolean(quoteDetailMatch)
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request })
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options)),
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const protectedRoute = pathname.startsWith("/dashboard") || isInternalQuoteRoute(pathname) || pathname.startsWith("/followups") || pathname.startsWith("/settings")

  if (!user && protectedRoute) return NextResponse.redirect(new URL("/login", request.url))
  if (user && pathname === "/login") return NextResponse.redirect(new URL("/dashboard", request.url))

  return response
}

export const config = {
  matcher: ["/dashboard/:path*", "/quotes/create/:path*", "/quotes/history/:path*", "/quotes/:path*", "/followups/:path*", "/settings/:path*", "/login"],
}
