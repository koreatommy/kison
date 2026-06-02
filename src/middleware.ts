// /tour → /trip 마이그레이션 + 캐시 무효화
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /tour, /tour/ep1 → /trip/ep1 영구 리다이렉트 (구 URL 마이그레이션)
  if (pathname === "/tour" || pathname === "/tour/" || pathname === "/tour/ep1") {
    const dest = request.nextUrl.clone();
    dest.pathname = "/trip/ep1";
    dest.searchParams.set("_t", String(Date.now()));
    const response = NextResponse.redirect(dest, 308);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    return response;
  }

  // /trip → /trip/ep1 리다이렉트
  if (pathname === "/trip" || pathname === "/trip/") {
    const dest = request.nextUrl.clone();
    dest.pathname = "/trip/ep1";
    dest.searchParams.set("_t", String(Date.now()));
    const response = NextResponse.redirect(dest, 307);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    return response;
  }

  // /trip/ep1 — 캐시 비활성화 헤더 강제
  if (pathname === "/trip/ep1") {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Vary", "*");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tour", "/tour/", "/tour/ep1", "/trip", "/trip/", "/trip/ep1"],
};
