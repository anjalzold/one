// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value

  if (!accessToken && request.nextUrl.pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (accessToken && request.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL('/user/profile', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile', '/signin', '/user/profile'],
}