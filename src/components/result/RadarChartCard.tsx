// 5개 성향 레이더 차트 - 그라디언트 채우기 + glow 효과
"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  gradientId?: string;
};

const AXIS_LABELS: Record<keyof AbilityScores, string> = {
  leadership: "리더십",
  planning: "기획력",
  making: "제작력",
  expression: "표현력",
  operation: "운영력",
};

export default function RadarChartCard({
  scores,
  color,
  gradientId = "radarGradient",
}: Props) {
  const reduceMotion = useReducedMotion();
  const data = Object.entries(AXIS_LABELS).map(([key, label]) => ({
    subject: label,
    value: scores[key as keyof AbilityScores],
    fullMark: 100,
  }));

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-white bg-white/90 backdrop-blur-sm p-5 shadow-xl shadow-indigo-100/60"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        aria-hidden
        className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: color }}
      />
      <h3 className="relative mb-3 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-700">
        <span>📊</span>
        나의 창업 성향
      </h3>
      <div className="relative min-h-[280px]">
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
            <defs>
              <radialGradient id={gradientId}>
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0.15} />
              </radialGradient>
            </defs>
            <PolarGrid stroke="#e4e4e7" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#3f3f46", fontSize: 13, fontWeight: 800 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#a1a1aa" }}
              tickCount={6}
              axisLine={false}
            />
            <Radar
              dataKey="value"
              stroke={color}
              fill={`url(#${gradientId})`}
              strokeWidth={2.5}
              dot={{ fill: color, strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={!reduceMotion}
              animationBegin={reduceMotion ? 0 : 380}
              animationDuration={reduceMotion ? 0 : 1750}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
