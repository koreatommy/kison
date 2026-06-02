// 강원도 1박2일 여행 일정 HTML(docu)을 /tour 경로로 제공
import { readFile } from "node:fs/promises";
import path from "node:path";

const TOUR_HTML_PATH = path.join(
  process.cwd(),
  "docu",
  "ai창업사업계획서",
  "tour20260602.html"
);

export async function GET() {
  const html = await readFile(TOUR_HTML_PATH, "utf-8");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
