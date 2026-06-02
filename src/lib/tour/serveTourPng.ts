// docu/ai창업사업계획서 PNG 에셋을 trip 라우트에서 제공
import { readFile } from "node:fs/promises";
import path from "node:path";

const TOUR_ASSET_DIR = path.join(process.cwd(), "docu", "ai창업사업계획서");

export async function serveTourPng(filename: string): Promise<Response> {
  const buffer = await readFile(path.join(TOUR_ASSET_DIR, filename));
  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
