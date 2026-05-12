// 학령에 따라 학년 드롭다운에 표시할 라벨 목록을 반환한다
import type { SchoolLevel } from "@/types/result";

export function getGradeLabelsForSchoolLevel(level: SchoolLevel): string[] {
  if (level === "elementary") {
    return ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"];
  }
  return ["1학년", "2학년", "3학년"];
}
