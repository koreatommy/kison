// 점수 배지 컴포넌트 (총점, 순위 등)
"use client";

interface ScoreBadgeProps {
  score: number | string;
  label?: string;
  variant?: "default" | "gold" | "silver" | "bronze";
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-indigo-100 text-indigo-700",
  gold: "bg-amber-100 text-amber-800",
  silver: "bg-zinc-200 text-zinc-700",
  bronze: "bg-orange-100 text-orange-800",
} as const;

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
} as const;

export default function ScoreBadge({ score, label, variant = "default", size = "md" }: ScoreBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-bold ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {label && <span className="font-semibold opacity-70">{label}</span>}
      <span className="tabular-nums">{score}</span>
    </span>
  );
}
