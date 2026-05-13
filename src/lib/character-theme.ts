// 캐릭터별 그라디언트/테마 매핑 (UI 전반에서 재사용)
import type { CharacterId } from "@/types/result";

export type CharacterTheme = {
  from: string;
  to: string;
  bgClass: string;
  textClass: string;
  glow: string;
};

export const characterThemes: Record<CharacterId, CharacterTheme> = {
  captain_lumi: {
    from: "#F59E0B",
    to: "#38BDF8",
    bgClass: "bg-gradient-to-br from-amber-400 to-sky-400",
    textClass: "text-amber-600",
    glow: "shadow-amber-300/50",
  },
  planner_dodo: {
    from: "#8B5CF6",
    to: "#34D399",
    bgClass: "bg-gradient-to-br from-violet-500 to-emerald-400",
    textClass: "text-violet-600",
    glow: "shadow-violet-300/50",
  },
  maker_theo: {
    from: "#F97316",
    to: "#14B8A6",
    bgClass: "bg-gradient-to-br from-orange-500 to-teal-500",
    textClass: "text-orange-600",
    glow: "shadow-orange-300/50",
  },
  story_moa: {
    from: "#EC4899",
    to: "#FB7185",
    bgClass: "bg-gradient-to-br from-pink-500 to-rose-400",
    textClass: "text-pink-600",
    glow: "shadow-pink-300/50",
  },
  check_nuri: {
    from: "#22C55E",
    to: "#1E40AF",
    bgClass: "bg-gradient-to-br from-green-500 to-blue-800",
    textClass: "text-green-600",
    glow: "shadow-green-300/50",
  },
};

export function getCharacterTheme(id: CharacterId): CharacterTheme {
  return characterThemes[id];
}

export function buildGradient(from: string, to: string): string {
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
}
