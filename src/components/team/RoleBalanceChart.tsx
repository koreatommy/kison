// 팀별 역할 분포 차트 (Recharts BarChart)
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { CharacterId } from "@/types/result";
import { characters } from "@/data/characters";

type Props = {
  distribution: Record<CharacterId, number>;
};

export default function RoleBalanceChart({ distribution }: Props) {
  const data = characters.map((c) => ({
    name: c.name,
    count: distribution[c.id] ?? 0,
    color: c.color.primary,
  }));

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
