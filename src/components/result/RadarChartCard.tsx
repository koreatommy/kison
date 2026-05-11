// 5개 성향 레이더 차트 (Recharts RadarChart, 모바일 최소 280px)
"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { AbilityScores } from "@/types/result";

type Props = {
  scores: AbilityScores;
  color: string;
};

const AXIS_LABELS: Record<keyof AbilityScores, string> = {
  leadership: "리더십",
  planning: "기획력",
  making: "제작력",
  expression: "표현력",
  operation: "운영력",
};

export default function RadarChartCard({ scores, color }: Props) {
  const data = Object.entries(AXIS_LABELS).map(([key, label]) => ({
    subject: label,
    value: scores[key as keyof AbilityScores],
    fullMark: 100,
  }));

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h4 className="mb-2 text-center text-sm font-semibold text-zinc-700">
        나의 창업 성향
      </h4>
      <div className="min-h-[280px]">
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="#e4e4e7" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#52525b", fontSize: 13, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
              tickCount={6}
            />
            <Radar
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
