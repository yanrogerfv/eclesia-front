// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const publicRoutes = ['/', '/login', '/escalas'];

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some(route => pathname === route);

    // If it's a public route, allow access
    if (isPublicRoute) {
        return NextResponse.next();
    }

    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    // Get the token from cookies
    const token = request.cookies.get('token');

    // If there's no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const response = await fetch(`${baseURL}auth/validate-token`, {
        method: "GET",
        headers: {
            "Authorization": `${token.value}`,
            "Content-Type": "application/json",
        },
    }).catch((error) => {
        if (error instanceof TypeError) {
            console.error("Network error:", error);
        } else {
            console.error("Error validating token:", error);
        }
    });
    if (response?.ok === false) {

        const loginUrl = new URL('/login', request.url);
        const redirectResponse = NextResponse.redirect(loginUrl);
        // Clear the invalid token
        redirectResponse.cookies.delete('token');
        return redirectResponse;
    } else {
        return NextResponse.next();
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
