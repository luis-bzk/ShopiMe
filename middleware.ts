import { NextRequest, NextResponse } from "next/server";
import * as jwtJose from "jose";
import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//   const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!session) {
//     const requestedPage = req.nextUrl.pathname;
//     const url = req.nextUrl.clone();
//     url.pathname = `/auth/login`;
//     url.search = `page=${requestedPage}`;

//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

export async function middleware(req: NextRequest) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const validRoles = ["admin"];

  if (!session) {
    const requestedPage = req.nextUrl.pathname;

    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `page=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*", "/api/admin/:path*"],
};
