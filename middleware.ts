import { NextRequest, NextResponse } from "next/server";
import * as jwtJose from "jose";

export default async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;

  if (previousPage.startsWith("/checkout")) {
    const token = req.cookies.get("token")?.value || "";

    try {
      await jwtJose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL(`/auth/login?page=${previousPage}`, req.url));
    }
  }
}

export const config = {
  matcher: ["/checkout/:path*"],
};
