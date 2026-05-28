// 창업 아이템 선정 워크플로우 도메인 타입 일원화
import type { CharacterId } from "@/types/result";

export type ProblemCategory =
  | "환경 문제"
  | "교육 문제"
  | "교통 문제"
  | "보건·의료 문제"
  | "주거 문제"
  | "안전·치안 문제"
  | "경제 문제"
  | "문화·여가 문제"
  | "사회복지 문제"
  | "인구감소 문제"
  | "기타";

export interface TeamMember {
  id: string;
  school: string;
  grade: string;
  name: string;
  /** 창업 캐릭터 5종 중 선택 (미선택 시 빈 문자열) */
  characterId: CharacterId | "";
}

export interface TeamInfo {
  teamName: string;
  members: TeamMember[];
}

export interface ProblemInput {
  selectedCategories: ProblemCategory[];
  problemText: string;
}

export interface ProblemAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface ProblemQuestion {
  id: string;
  question: string;
  helpText?: string;
  placeholder?: string;
}

export interface StartupItemCandidate {
  id: string;
  itemName: string;
  oneLineDescription: string;
  problemToSolve: string;
  existingSolutionLimitations?: string;
  creativeSolutionApproach?: string;
  socialValueDetail?: string;
  targetCustomer: string;
  beneficiaries?: string[];
  coreFeatures: string[];
  differentiation: string;
  studentExecutionMethod: string;
  mvpPlan?: string;
  expectedSocialValue: string;
  risks: string[];
  validationNeeds?: string[];
}

export interface EvaluationScore {
  problemClarity: number;
  customerClarity: number;
  solutionFit: number;
  differentiation: number;
  feasibility: number;
  socialValue: number;
  total: number;
}

export interface StartupItemEvaluation {
  candidateId: string;
  score: EvaluationScore;
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
  recommendationRank: number;
  recommendationReason: string;
}

export interface ShortlistedItem {
  rank: 1 | 2 | 3;
  candidateId: string;
  reason: string;
}

export interface FinalSelection {
  candidateId: string;
  finalReason: string;
  checkedItems: {
    problemFit: boolean;
    customerClear: boolean;
    differentiationClear: boolean;
    prototypePossible: boolean;
    planExpandable: boolean;
  };
}

export interface FinalDocument {
  itemNameSuggestions: string[];
  selectedItemName: string;
  oneLineItemDescription: string;
  topic: string;
  localProblemToSolve: string;

  itemIntroduction: string[];
  differentiation: string[];
  targetCustomers: string[];
  salesStrategy: string[];
  promotionStrategy: string[];
  expectedSocialValue: string[];

  prototypeIdea: string;
  imageOrDiagramIdea: string;

  developmentMotivationDraft: string;
  feasibilityDraft: {
    developmentProcess: string[];
    marketAndCustomerAnalysis: string[];
    expectedObstacles: Array<{
      obstacle: string;
      solution: string;
    }>;
  };
  growthStrategyDraft: {
    requiredResources: string[];
    salesPlan: string[];
    promotionPlan: string[];
  };
  teamCompositionDraft: {
    suggestedRoles: Array<{
      memberName: string;
      suggestedRole: string;
      reason: string;
    }>;
    conflictResolutionMethod: string;
  };

  finalSelectionReason: string;
  limitationsAndNextResearch: string[];
}

export type ClaudeTask =
  | "generate_problem_questions"
  | "generate_startup_items"
  | "evaluate_startup_items"
  | "generate_final_document";

export interface ClaudeRequest {
  task: ClaudeTask;
  payload: unknown;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface ClaudeResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  usage?: TokenUsage;
  task?: ClaudeTask;
}

export const STEP_COUNT = 9;

export const STEP_LABELS = [
  "시작",
  "팀 정보",
  "문제 선택",
  "문제 구체화",
  "아이템 생성",
  "아이템 평가",
  "후보 선정",
  "최종 확정",
  "결과 확인",
] as const;

export interface StartupSupportState {
  currentStep: number;
  teamInfo: TeamInfo;
  problemInput: ProblemInput;
  problemAnswers: ProblemAnswer[];
  candidates: StartupItemCandidate[];
  evaluations: StartupItemEvaluation[];
  evaluationSummary: string;
  evaluationKeyRisks: string[];
  recommendedCandidateId: string;
  shortlistedItems: ShortlistedItem[];
  finalSelection: FinalSelection | null;
  finalDocument: FinalDocument | null;
  apiKey: string;
  tokenUsageTotal: TokenUsage;
  tokenUsageLast: (TokenUsage & { task: ClaudeTask }) | null;
  tokenUsageRequestCount: number;
  resumePromptNonce: number;
}
