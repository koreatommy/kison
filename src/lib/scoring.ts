// 설문 응답 → 점수 계산 → 결과 산출 로직
import type {
  CharacterCode,
  CharacterId,
  RawScores,
  AbilityScores,
  QuestionOption,
  ResultType,
  StudentProfile,
  StudentResult,
} from "@/types/result";

const CODE_TO_ID: Record<CharacterCode, CharacterId> = {
  CEO: "captain_lumi",
  CPO: "planner_dodo",
  CTO: "maker_theo",
  CMO: "story_moa",
  COO: "check_nuri",
};

const CODE_TO_ABILITY: Record<CharacterCode, keyof AbilityScores> = {
  CEO: "leadership",
  CPO: "planning",
  CTO: "making",
  CMO: "expression",
  COO: "operation",
};

export function createInitialRawScores(): RawScores {
  return { CEO: 0, CPO: 0, CTO: 0, CMO: 0, COO: 0 };
}

export function calculateRawScores(answers: QuestionOption[]): RawScores {
  const scores = createInitialRawScores();
  for (const answer of answers) {
    scores[answer.type] += 1;
  }
  return scores;
}

export function convertRawScoresToAbilityScores(
  rawScores: RawScores
): AbilityScores {
  const result = {} as AbilityScores;
  for (const [code, abilityKey] of Object.entries(CODE_TO_ABILITY)) {
    result[abilityKey] = Math.min(rawScores[code as CharacterCode] * 20, 100);
  }
  return result;
}

function sortedEntries(rawScores: RawScores): [CharacterCode, number][] {
  return (Object.entries(rawScores) as [CharacterCode, number][]).sort(
    (a, b) => b[1] - a[1]
  );
}

export function getPrimaryCharacter(rawScores: RawScores): CharacterId {
  const sorted = sortedEntries(rawScores);
  return CODE_TO_ID[sorted[0][0]];
}

export function getSecondaryCharacter(rawScores: RawScores): CharacterId {
  const sorted = sortedEntries(rawScores);
  return CODE_TO_ID[sorted[1][0]];
}

export function getResultType(rawScores: RawScores): ResultType {
  const values = Object.values(rawScores);
  const max = Math.max(...values);
  const min = Math.min(...values);

  if (max - min <= 1) return "balanced";

  const topCount = values.filter((v) => v === max).length;
  if (topCount >= 2) return "mixed";

  return "single";
}

export function getMixedCharacters(rawScores: RawScores): CharacterId[] {
  const sorted = sortedEntries(rawScores);
  const topScore = sorted[0][1];
  return sorted
    .filter(([, score]) => score === topScore)
    .map(([code]) => CODE_TO_ID[code]);
}

export function calculateResult(
  student: StudentProfile,
  answers: QuestionOption[]
): StudentResult {
  const rawScores = calculateRawScores(answers);
  const resultType = getResultType(rawScores);
  const primaryCharacter = getPrimaryCharacter(rawScores);
  const scores = convertRawScoresToAbilityScores(rawScores);

  const base: StudentResult = {
    student,
    result: {
      primaryCharacter,
      resultType,
      rawScores,
      scores,
    },
  };

  if (resultType === "mixed") {
    base.result.mixedCharacters = getMixedCharacters(rawScores);
  } else {
    base.result.secondaryCharacter = getSecondaryCharacter(rawScores);
  }

  return base;
}
