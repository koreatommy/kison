// trip 모닝 산책 카드 목업 이미지 제공
import { serveTourPng } from "@/lib/tour/serveTourPng";

export const dynamic = "force-dynamic";

export async function GET() {
  return serveTourPng("morning_walk_mock.png");
}
