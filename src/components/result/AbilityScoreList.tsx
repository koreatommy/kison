// 5개 능력치 점수 - 그라디언트 프로그레스 바 + 큰 점수 표시
"use client";

import type { AbilityScores } from "@/types/result";

type Props = {
  scores: AbilityScores;
  color: string;
  secondaryColor?: string;
};

const LABELS: { key: keyof AbilityScores; label: string; emoji: string }[] = [
  { key: "leadership", label: "리더십", emoji: "👑" },
  { key: "planning", label: "기획력", emoji: "💡" },
  { key: "making", label: "제작력", emoji: "🔧" },
  { key: "expression", label: "표현력", emoji: "📣" },
  { key: "operation", label: "운영력", emoji: "📋" },
];

export default function AbilityScoreList({
  scores,
  color,
  secondaryColor,
}: Props) {
  const gradient = secondaryColor
    ? `linear-gradient(90deg, ${color} 0%, ${secondaryColor} 100%)`
    : color;

  return (
    <div className="rounded-3xl border border-white bg-white/90 backdrop-blur-sm p-5 shadow-xl shadow-indigo-100/60">
      <h3 className="mb-4 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-700">
        <span>⚡</span>
        나의 창업 능력치
      </h3>
      <ul className="flex flex-col gap-3.5">
        {LABELS.map(({ key, label, emoji }) => {
          const value = scores[key];
          return (
            <li key={key}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-extrabold text-zinc-700">
                  <span>{emoji}</span>
                  {label}
                </span>
                <span className="text-base font-black text-zinc-900 tabular-nums">
                  {value}
                </span>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${value}%`,
                    background: gradient,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
