// /trip/ep1 — 캐시 없는 canonical URL
import { serveTourHtml } from "@/lib/tour/serveTourHtml";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return serveTourHtml(request);
}
