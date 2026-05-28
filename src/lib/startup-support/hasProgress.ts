// 창업 지원 워크플로우에 저장된 진행 데이터 존재 여부 판별
import type { StartupSupportState } from "@/types/startup-support";

function isFilled(value: string) {
  return value.trim().length > 0;
}

export function hasStartupSupportProgress(state: StartupSupportState): boolean {
  if (state.currentStep > 0) return true;

  if (isFilled(state.teamInfo.teamName)) return true;
  if (
    state.teamInfo.members.some(
      (member) =>
        isFilled(member.name) ||
        isFilled(member.school) ||
        isFilled(member.grade) ||
        isFilled(member.characterId),
    )
  ) {
    return true;
  }
  if (state.problemInput.selectedCategories.length > 0) return true;
  if (isFilled(state.problemInput.problemText)) return true;
  if (state.problemAnswers.some((answer) => isFilled(answer.answer))) return true;
  if (state.candidates.length > 0) return true;
  if (state.evaluations.length > 0) return true;
  if (state.shortlistedItems.length > 0) return true;
  if (state.finalSelection) return true;
  if (state.finalDocument) return true;

  return false;
}
