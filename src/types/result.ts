// KISON 진단 서비스 전체 도메인 타입 정의

export type CharacterCode = "CEO" | "CPO" | "CTO" | "CMO" | "COO";

export type CharacterId =
  | "captain_lumi"
  | "planner_dodo"
  | "maker_theo"
  | "story_moa"
  | "check_nuri";

export type ResultType = "single" | "mixed" | "balanced";

export type RawScores = Record<CharacterCode, number>;

export type AbilityScores = {
  leadership: number;
  planning: number;
  making: number;
  expression: number;
  operation: number;
};

export type Character = {
  id: CharacterId;
  code: CharacterCode;
  name: string;
  role: string;
  title: string;
  shortDescription: string;
  keywords: string[];
  imageUrl: string;
  quote: string;
  color: {
    primary: string;
    secondary: string;
  };
};

export type ResultTemplate = {
  strengths: string[];
  growthPoints: string[];
  bestMatches: CharacterId[];
  recommendedActivities: string[];
};

export type QuestionOption = {
  id: string;
  text: string;
  type: CharacterCode;
};

export type Question = {
  id: string;
  question: string;
  options: QuestionOption[];
};

export type StudentProfile = {
  name: string;
  grade: string;
  schoolLevel?: "elementary" | "middle" | "high";
  interest?: string;
};

export type StudentResult = {
  student: StudentProfile;
  result: {
    primaryCharacter: CharacterId;
    secondaryCharacter?: CharacterId;
    mixedCharacters?: CharacterId[];
    resultType: ResultType;
    rawScores: RawScores;
    scores: AbilityScores;
  };
};
