// 점수 계산 로직 단위 테스트
import { describe, it, expect } from "vitest";
import {
  createInitialRawScores,
  calculateRawScores,
  convertRawScoresToAbilityScores,
  getPrimaryCharacter,
  getSecondaryCharacter,
  getResultType,
  calculateResult,
} from "@/lib/scoring";
import type { CharacterCode, QuestionOption } from "@/types/result";

function makeAnswer(type: CharacterCode): QuestionOption {
  return { id: `test_${type}`, text: "test", type };
}

describe("scoring", () => {
  describe("createInitialRawScores", () => {
    it("모든 캐릭터 코드를 0으로 초기화한다", () => {
      const scores = createInitialRawScores();
      expect(scores).toEqual({ CEO: 0, CPO: 0, CTO: 0, CMO: 0, COO: 0 });
    });
  });

  describe("calculateRawScores", () => {
    it("각 응답의 캐릭터 코드별로 +1 한다", () => {
      const answers = [makeAnswer("CEO"), makeAnswer("CEO"), makeAnswer("CTO")];
      const scores = calculateRawScores(answers);
      expect(scores.CEO).toBe(2);
      expect(scores.CTO).toBe(1);
      expect(scores.CPO).toBe(0);
    });

    it("빈 배열이면 모두 0", () => {
      const scores = calculateRawScores([]);
      expect(scores).toEqual({ CEO: 0, CPO: 0, CTO: 0, CMO: 0, COO: 0 });
    });
  });

  describe("convertRawScoresToAbilityScores", () => {
    it("원점수 * 20, 최대 100", () => {
      const ability = convertRawScoresToAbilityScores({
        CEO: 4, CPO: 2, CTO: 1, CMO: 3, COO: 0,
      });
      expect(ability).toEqual({
        leadership: 80, planning: 40, making: 20, expression: 60, operation: 0,
      });
    });

    it("5 이상이면 100으로 클램프", () => {
      const ability = convertRawScoresToAbilityScores({
        CEO: 6, CPO: 0, CTO: 0, CMO: 0, COO: 0,
      });
      expect(ability.leadership).toBe(100);
    });
  });

  describe("getPrimaryCharacter", () => {
    it("최고 점수 캐릭터를 반환한다", () => {
      const primary = getPrimaryCharacter({
        CEO: 1, CPO: 4, CTO: 2, CMO: 1, COO: 2,
      });
      expect(primary).toBe("planner_dodo");
    });
  });

  describe("getSecondaryCharacter", () => {
    it("두 번째 높은 점수 캐릭터를 반환한다", () => {
      const secondary = getSecondaryCharacter({
        CEO: 1, CPO: 4, CTO: 3, CMO: 1, COO: 1,
      });
      expect(secondary).toBe("maker_theo");
    });
  });

  describe("getResultType", () => {
    it("단독 1위면 single", () => {
      const type = getResultType({
        CEO: 4, CPO: 2, CTO: 2, CMO: 1, COO: 1,
      });
      expect(type).toBe("single");
    });

    it("1위 동점이면 mixed", () => {
      const type = getResultType({
        CEO: 3, CPO: 3, CTO: 2, CMO: 1, COO: 1,
      });
      expect(type).toBe("mixed");
    });

    it("max - min <= 1이면 balanced", () => {
      const type = getResultType({
        CEO: 2, CPO: 2, CTO: 2, CMO: 2, COO: 2,
      });
      expect(type).toBe("balanced");
    });

    it("모두 같으면 balanced", () => {
      const type = getResultType({
        CEO: 0, CPO: 0, CTO: 0, CMO: 0, COO: 0,
      });
      expect(type).toBe("balanced");
    });

    it("한 개만 다르고 차이 1이면 balanced", () => {
      const type = getResultType({
        CEO: 2, CPO: 2, CTO: 2, CMO: 2, COO: 1,
      });
      expect(type).toBe("balanced");
    });
  });

  describe("calculateResult", () => {
    it("10문항 전체 응답 결과를 StudentResult로 조합한다", () => {
      const student = { name: "테스트", grade: "3학년", schoolLevel: "middle" as const };
      const answers = [
        makeAnswer("CEO"), makeAnswer("CEO"), makeAnswer("CEO"),
        makeAnswer("CEO"), makeAnswer("CMO"), makeAnswer("CMO"),
        makeAnswer("CMO"), makeAnswer("CTO"), makeAnswer("CTO"),
        makeAnswer("CPO"),
      ];
      const result = calculateResult(student, answers);
      expect(result.result.primaryCharacter).toBe("captain_lumi");
      expect(result.result.resultType).toBe("single");
      expect(result.result.scores.leadership).toBe(80);
      expect(result.student.name).toBe("테스트");
    });
  });
});
