import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  try {
    let token: any = request.cookies.get("butsapp");
    if (token?.value) {
      let { email }: any = jwtDecode(token?.value);
      if (!email) {
        return NextResponse.redirect(new URL("/auth", request.nextUrl));
      }else if(request.nextUrl.pathname == "/auth") {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
    } else if (request.nextUrl.pathname != "/auth") {
      return NextResponse.redirect(new URL("/auth", request.nextUrl));
    }
  } catch (error) {
    // return NextResponse.redirect(new URL("/auth", request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
