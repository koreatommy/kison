// 창업 지원 단계별 다음 진행 가능 여부를 검증하는 규칙.
import type { StartupSupportState } from "@/types/startup-support";

export interface StepValidationResult {
  canProceed: boolean;
  message?: string;
}

function isFilled(value: string) {
  return value.trim().length > 0;
}

export function getStepValidation(state: StartupSupportState): StepValidationResult {
  const { currentStep } = state;

  if (currentStep === 1) {
    if (!isFilled(state.teamInfo.teamName)) {
      return { canProceed: false, message: "팀명을 입력해야 다음 단계로 이동할 수 있어요." };
    }
    const hasAtLeastOneCompleteMember = state.teamInfo.members.some(
      (member) => isFilled(member.school) && isFilled(member.grade) && isFilled(member.name),
    );
    if (!hasAtLeastOneCompleteMember) {
      return { canProceed: false, message: "구성원 1명 이상(학교, 학년, 이름)을 입력해 주세요." };
    }
  }

  if (currentStep === 2) {
    if (state.problemInput.selectedCategories.length === 0) {
      return { canProceed: false, message: "문제 분야를 최소 1개 선택해 주세요." };
    }
    if (!isFilled(state.problemInput.problemText)) {
      return { canProceed: false, message: "우리 주변의 불편 상황을 입력해 주세요." };
    }
  }

  if (currentStep === 3) {
    if (state.problemAnswers.length === 0) {
      return { canProceed: false, message: "문제 구체화 질문 답변을 모두 입력해 주세요." };
    }
    const hasEmptyAnswer = state.problemAnswers.some((answer) => !isFilled(answer.answer));
    if (hasEmptyAnswer) {
      return { canProceed: false, message: "문제 구체화 질문 답변을 모두 입력해 주세요." };
    }
  }

  if (currentStep === 4 && state.candidates.length === 0) {
    return { canProceed: false, message: "AI 아이템 생성을 완료해야 다음 단계로 이동할 수 있어요." };
  }

  if (currentStep === 5 && state.evaluations.length === 0) {
    return { canProceed: false, message: "AI 아이템 평가를 완료해야 다음 단계로 이동할 수 있어요." };
  }

  if (currentStep === 6) {
    const rankCount = Math.min(state.candidates.length, 3);
    if (rankCount === 0) {
      return { canProceed: false, message: "후보가 없어 다음 단계로 이동할 수 없어요." };
    }
    const selectedRanks = new Set(state.shortlistedItems.map((item) => item.rank));
    const hasAllRankSelected = Array.from({ length: rankCount }).every((_, index) =>
      selectedRanks.has((index + 1) as 1 | 2 | 3),
    );
    if (!hasAllRankSelected) {
      return { canProceed: false, message: "후보 순위를 모두 선택해 주세요." };
    }
    const hasEmptyReason = state.shortlistedItems
      .filter((item) => item.rank <= rankCount)
      .some((item) => !isFilled(item.reason));
    if (hasEmptyReason) {
      return { canProceed: false, message: "각 후보를 선택한 이유를 모두 입력해 주세요." };
    }
  }

  if (currentStep === 7) {
    if (!state.finalSelection || !isFilled(state.finalSelection.candidateId)) {
      return { canProceed: false, message: "최종 창업 아이템 1개를 선택해 주세요." };
    }
    const checks = Object.values(state.finalSelection.checkedItems);
    if (checks.some((checked) => !checked)) {
      return { canProceed: false, message: "확인 체크리스트를 모두 체크해 주세요." };
    }
    if (!isFilled(state.finalSelection.finalReason)) {
      return { canProceed: false, message: "최종 선정 이유를 입력해 주세요." };
    }
  }

  return { canProceed: true };
}
