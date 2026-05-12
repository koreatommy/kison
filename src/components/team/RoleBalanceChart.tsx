// 팀별 역할 분포 - 도넛 차트 (Recharts PieChart)
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { CharacterId } from "@/types/result";
import { characters } from "@/data/characters";

type Props = {
  distribution: Record<CharacterId, number>;
};

export default function RoleBalanceChart({ distribution }: Props) {
  const reduceMotion = useReducedMotion();
  const data = characters
    .map((c) => ({
      name: c.name,
      count: distribution[c.id] ?? 0,
      color: c.color.primary,
    }))
    .filter((d) => d.count > 0);

  const total = data.reduce((sum, d) => sum + d.count, 0);

  if (total === 0) {
    return (
      <div className="flex h-24 items-center justify-center text-xs font-semibold text-zinc-400">
        역할 분포 데이터가 없어요
      </div>
    );
  }

  return (
    <motion.div
      className="flex items-center gap-4"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
      }}
    >
      <div className="relative h-24 w-24 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              cx="50%"
              cy="50%"
              innerRadius={28}
              outerRadius={44}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              isAnimationActive={!reduceMotion}
              animationBegin={reduceMotion ? 0 : 260}
              animationDuration={reduceMotion ? 0 : 1500}
              animationEasing="ease-out"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 22,
            delay: reduceMotion ? 0 : 0.42,
          }}
        >
          <span className="text-lg font-black text-zinc-800">{total}</span>
        </motion.div>
      </div>

      <motion.ul
        className="flex flex-1 flex-col gap-1"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.06,
              delayChildren: reduceMotion ? 0 : 0.15,
            },
          },
        }}
      >
        {data.map((entry) => (
          <motion.li
            key={entry.name}
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="flex items-center justify-between text-xs font-bold"
          >
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-zinc-700">{entry.name}</span>
            </span>
            <span className="text-zinc-500">{entry.count}명</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
