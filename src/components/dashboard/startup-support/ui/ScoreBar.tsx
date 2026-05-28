// 점수 항목별 가로 막대 차트 컴포넌트
"use client";

interface ScoreBarProps {
  label: string;
  score: number;
  max: number;
}

export default function ScoreBar({ label, score, max }: ScoreBarProps) {
  const pct = max > 0 ? Math.round((score / max) * 100) : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="w-20 shrink-0 text-right text-[11px] font-semibold text-zinc-500">{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${Math.max(4, pct)}%` }}
        />
      </div>
      <span className="w-12 shrink-0 text-right text-xs font-bold tabular-nums text-zinc-700">
        {score}/{max}
      </span>
    </div>
  );
}
