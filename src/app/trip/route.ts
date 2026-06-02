// /trip → /trip/ep1 리다이렉트
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/trip/ep1";
  url.searchParams.set("_t", String(Date.now()));
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  return response;
}
