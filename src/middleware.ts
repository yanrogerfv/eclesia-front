// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = ['/', '/login', '/escalas'];

export async function middleware(request: NextRequest) {
  // NextResponse.next();
  console.log('🔒 Middleware triggered for path:', request.nextUrl.pathname);

  const { pathname } = request.nextUrl;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.match(route));

  // If it's a public route, allow access
  if (isPublicRoute) {
    console.log('✅ Public route, allowing access');
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // If there's no token, redirect to login
  if (!token) {
    console.log('❌ No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Validate the token via API
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    console.log('🔍 Validating token with API:', `${baseURL}/auth/validate`);

    const response = await fetch(`${baseURL}auth/validate`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('🔄 Token validation response status:', response.status);
    console.log('🔄 Token validation response status text:', await response.text());


    // If token is invalid, redirect to login
    if (!response.ok) {
      console.log('❌ Token validation failed, redirecting to login');
      const loginUrl = new URL('/login', request.url);
      const redirectResponse = NextResponse.redirect(loginUrl);
      // Clear the invalid token
      redirectResponse.cookies.delete('token');
      return redirectResponse;
    }

    console.log('✅ Token validated successfully');
    // Token is valid, continue with the request
    return NextResponse.next();
  } catch (error) {
    console.error('💥 Error validating token:', error);
    // On error, redirect to login for safety
    const loginUrl = new URL('/login', request.url);
    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.cookies.delete('token');
    return redirectResponse;
  }
}

// Specify the paths you want the middleware to run on
// Run on all routes except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
