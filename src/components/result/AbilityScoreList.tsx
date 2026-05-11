// 5개 능력치 점수를 수평 프로그레스 바로 표시하는 카드
import type { AbilityScores } from "@/types/result";

type Props = {
  scores: AbilityScores;
  color: string;
};

const LABELS: { key: keyof AbilityScores; label: string }[] = [
  { key: "leadership", label: "리더십" },
  { key: "planning", label: "기획력" },
  { key: "making", label: "제작력" },
  { key: "expression", label: "표현력" },
  { key: "operation", label: "운영력" },
];

export default function AbilityScoreList({ scores, color }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 text-center text-sm font-semibold text-zinc-700">
        나의 창업 능력치
      </h4>
      <ul className="flex flex-col gap-3">
        {LABELS.map(({ key, label }) => (
          <li key={key} className="flex items-center gap-3">
            <span className="w-14 text-right text-sm font-medium text-zinc-600">
              {label}
            </span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-zinc-100">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                style={{
                  width: `${scores[key]}%`,
                  backgroundColor: color,
                  opacity: 0.8,
                }}
              />
            </div>
            <span className="w-8 text-right text-sm font-bold text-zinc-800">
              {scores[key]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
