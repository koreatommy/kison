// 워크플로우 상태를 Claude AI 호출 payload로 변환하는 빌더
import type { StartupSupportState } from "@/types/startup-support";

export interface WorkflowContext {
  purpose: string;
  currentStep: number;
  teamInfo: StartupSupportState["teamInfo"];
  problemInput: StartupSupportState["problemInput"];
  problemAnswers: StartupSupportState["problemAnswers"];
  candidates: StartupSupportState["candidates"];
  evaluations: StartupSupportState["evaluations"];
  evaluationSummary: string;
  recommendedCandidateId: string;
  shortlistedItems: StartupSupportState["shortlistedItems"];
  finalSelection: StartupSupportState["finalSelection"];
}

export function buildWorkflowContext(
  state: StartupSupportState,
): WorkflowContext {
  return {
    purpose:
      "청소년 창업경진대회 사업계획서 작성을 돕는 AI 워크플로우. 사용자가 문제를 선택하고 AI가 창업 아이템을 도출·평가·확정한다.",
    currentStep: state.currentStep,
    teamInfo: state.teamInfo,
    problemInput: state.problemInput,
    problemAnswers: state.problemAnswers,
    candidates: state.candidates,
    evaluations: state.evaluations,
    evaluationSummary: state.evaluationSummary,
    recommendedCandidateId: state.recommendedCandidateId,
    shortlistedItems: state.shortlistedItems,
    finalSelection: state.finalSelection,
  };
}
