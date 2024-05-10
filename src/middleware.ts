import { type NextRequest, NextResponse } from "next/server";
import { getUserFromToken, refreshToken } from "./lib/actions";

export async function middleware(request: NextRequest) {
  if ((await getUserFromToken()) === null) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return refreshToken();
  }
}

export const config = {
  matcher: ["/((?!login|_next).*)"],
};
