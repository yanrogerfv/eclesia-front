// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Assume the token is stored in a cookie named 'authToken'
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // If there's no token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Decode the token to check its expiration
  const decodedToken = decodeToken(token) as jsonwebtoken.JwtPayload; // You'll need to implement this function

  if (decodedToken && decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
    // If the token is expired, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the token is valid, continue with the request
  return NextResponse.next();
}

function decodeToken(token: string) {
  // Implement your token decoding logic here
  // This is a simplified example, you might want to use a library like 'jsonwebtoken'
  return jsonwebtoken.decode(token);
  // try {
  //   const base64Url = token.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));

  //   return JSON.parse(jsonPayload);
  // } catch (error) {
  //   console.error('Failed to decode token', error);
  //   return null;
  // }
}

// Specify the paths you want the middleware to run on
export const config = {
  matcher: ['/protected/:path*'], // Adjust this to match the paths you want to protect
};