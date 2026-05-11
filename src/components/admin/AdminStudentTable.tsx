// 관리자 학생 결과 목록 테이블
import type { TeamCandidate } from "@/types/result";
import { getCharacter } from "@/lib/character-map";

type Props = {
  candidates: TeamCandidate[];
};

export default function AdminStudentTable({ candidates }: Props) {
  if (candidates.length === 0) {
    return (
      <p className="mt-6 text-center text-sm text-zinc-400">
        필터 조건에 맞는 결과가 없어요
      </p>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">이름</th>
            <th className="px-4 py-3">학년</th>
            <th className="px-4 py-3">대표 캐릭터</th>
            <th className="px-4 py-3">보조 성향</th>
            <th className="px-4 py-3 text-right">리더십</th>
            <th className="px-4 py-3 text-right">기획력</th>
            <th className="px-4 py-3 text-right">제작력</th>
            <th className="px-4 py-3 text-right">표현력</th>
            <th className="px-4 py-3 text-right">운영력</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {candidates.map((c) => {
            const primary = getCharacter(c.primaryCharacter);
            const secondary = c.secondaryCharacter
              ? getCharacter(c.secondaryCharacter)
              : null;
            return (
              <tr key={c.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-800">
                  {c.name}
                </td>
                <td className="px-4 py-3 text-zinc-600">{c.grade}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${primary.color.primary}20`,
                      color: primary.color.primary,
                    }}
                  >
                    {primary.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500">
                  {secondary?.name ?? "-"}
                </td>
                <td className="px-4 py-3 text-right text-zinc-600">
                  {c.scores.leadership}
                </td>
                <td className="px-4 py-3 text-right text-zinc-600">
                  {c.scores.planning}
                </td>
                <td className="px-4 py-3 text-right text-zinc-600">
                  {c.scores.making}
                </td>
                <td className="px-4 py-3 text-right text-zinc-600">
                  {c.scores.expression}
                </td>
                <td className="px-4 py-3 text-right text-zinc-600">
                  {c.scores.operation}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
