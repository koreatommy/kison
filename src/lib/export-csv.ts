// 학생 결과 데이터를 BOM 포함 CSV로 다운로드
import type { TeamCandidate } from "@/types/result";
import { getCharacter } from "@/lib/character-map";

export function downloadCsv(candidates: TeamCandidate[], filename = "kison-results.csv") {
  const headers = [
    "이름",
    "학교",
    "학년",
    "학령",
    "대표 캐릭터",
    "대표 역할",
    "보조 캐릭터",
    "리더십",
    "기획력",
    "제작력",
    "표현력",
    "운영력",
  ];

  const rows = candidates.map((c) => {
    const primary = getCharacter(c.primaryCharacter);
    const secondary = c.secondaryCharacter
      ? getCharacter(c.secondaryCharacter)
      : null;
    return [
      c.name,
      c.schoolName ?? "",
      c.grade,
      c.schoolLevel ?? "",
      primary.name,
      primary.title,
      secondary?.name ?? "",
      c.scores.leadership,
      c.scores.planning,
      c.scores.making,
      c.scores.expression,
      c.scores.operation,
    ].join(",");
  });

  const BOM = "\uFEFF";
  const csv = BOM + [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
