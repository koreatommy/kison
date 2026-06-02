// trip 히어로 배경 이미지 제공
import { readFile } from "node:fs/promises";
import path from "node:path";

const HERO_IMG_PATH = path.join(
  process.cwd(),
  "docu",
  "ai창업사업계획서",
  "hero_img1.png"
);

export const dynamic = "force-dynamic";

export async function GET() {
  const buffer = await readFile(HERO_IMG_PATH);
  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
