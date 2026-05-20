import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request })
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { getAll: () => request.cookies.getAll(), setAll: (c) => c.forEach(({name,value,options}) => response.cookies.set(name, value, options)) } })
  const { data: { user } } = await supabase.auth.getUser()
  const p = request.nextUrl.pathname
  const protectedRoute = p.startsWith('/dashboard') || p.startsWith('/quotes') || p.startsWith('/followups') || p.startsWith('/settings')
  if (!user && protectedRoute) return NextResponse.redirect(new URL('/login', request.url))
  if (user && p === '/login') return NextResponse.redirect(new URL('/dashboard', request.url))
  return response
}
export const config = { matcher: ['/dashboard/:path*', '/quotes/:path*', '/followups/:path*', '/settings/:path*', '/login'] }
