// 관리자 대시보드 필터 영역 (학령/학년/캐릭터)
import { characters } from "@/data/characters";

type Props = {
  schoolFilter: string;
  gradeFilter: string;
  charFilter: string;
  uniqueGrades: string[];
  onSchoolChange: (v: string) => void;
  onGradeChange: (v: string) => void;
  onCharChange: (v: string) => void;
};

const SCHOOL_OPTIONS = [
  { value: "all", label: "전체 학령" },
  { value: "elementary", label: "초등학생" },
  { value: "middle", label: "중학생" },
  { value: "high", label: "고등학생" },
];

export default function AdminFilters({
  schoolFilter,
  gradeFilter,
  charFilter,
  uniqueGrades,
  onSchoolChange,
  onGradeChange,
  onCharChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={schoolFilter}
        onChange={(e) => onSchoolChange(e.target.value)}
        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
      >
        {SCHOOL_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <select
        value={gradeFilter}
        onChange={(e) => onGradeChange(e.target.value)}
        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
      >
        <option value="all">전체 학년</option>
        {uniqueGrades.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        value={charFilter}
        onChange={(e) => onCharChange(e.target.value)}
        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
      >
        <option value="all">전체 캐릭터</option>
        {characters.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
