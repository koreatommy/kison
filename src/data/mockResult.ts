// 결과 화면 테스트용 Mock 데이터 (캡틴 루미 대표 / 스토리 모아 보조)
import type { StudentResult } from "@/types/result";

export const mockResult: StudentResult = {
  student: {
    name: "김민준",
    grade: "6학년",
    schoolLevel: "elementary",
    interest: "앱 만들기",
  },
  result: {
    primaryCharacter: "captain_lumi",
    secondaryCharacter: "story_moa",
    resultType: "single",
    rawScores: {
      CEO: 4,
      CPO: 1,
      CTO: 1,
      CMO: 3,
      COO: 1,
    },
    scores: {
      leadership: 80,
      planning: 20,
      making: 20,
      expression: 60,
      operation: 20,
    },
  },
};
