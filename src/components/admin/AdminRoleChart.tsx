// 관리자 대시보드 역할 분포 차트
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
import type { TeamCandidate, CharacterId } from "@/types/result";
import { characters } from "@/data/characters";

type Props = {
  candidates: TeamCandidate[];
};

export default function AdminRoleChart({ candidates }: Props) {
  const counts = new Map<CharacterId, number>();
  for (const c of characters) counts.set(c.id, 0);
  for (const c of candidates) {
    counts.set(c.primaryCharacter, (counts.get(c.primaryCharacter) ?? 0) + 1);
  }

  const data = characters.map((c) => ({
    name: c.name,
    count: counts.get(c.id) ?? 0,
    color: c.color.primary,
  }));

  return (
    <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-zinc-700">역할 분포</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
