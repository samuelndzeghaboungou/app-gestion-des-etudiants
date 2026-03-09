import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// Must match the secret used in src/lib/auth.ts
const AUTH_SECRET = process.env.NEXTAUTH_SECRET?.trim();

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check for valid session token
  const token = await getToken({
    req,
    secret: AUTH_SECRET!,
  });

  // If user is authenticated and tries to access login/register, redirect to home
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow access to login and register pages without auth
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return NextResponse.next();
  }

  // Redirect to login if no token
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
