// 구성원 캐릭터 역할 표시·보고서 행 생성 유틸
import { getCharacterById } from "@/data/characters";
import type { FinalDocument, TeamMember } from "@/types/startup-support";
import type { CharacterId } from "@/types/result";

export function formatMemberRoleLabel(characterId: CharacterId | ""): string {
  if (!characterId) return "";
  const char = getCharacterById(characterId);
  if (!char) return "";
  return `${char.name} · ${char.title}`;
}

export function formatMemberRoleShort(characterId: CharacterId | ""): string {
  if (!characterId) return "-";
  const char = getCharacterById(characterId);
  if (!char) return "-";
  return `${char.name} (${char.role})`;
}

export type TeamRoleReportRow = {
  memberName: string;
  suggestedRole: string;
  reason: string;
};

/** 최종 보고서 팀 역할 표: 사용자 선택 캐릭터 우선, AI 초안은 이유 보완용 */
export function buildTeamRoleReportRows(
  members: TeamMember[],
  aiDraft?: FinalDocument["teamCompositionDraft"],
): TeamRoleReportRow[] {
  const filled = members.filter((m) => m.name.trim() && m.characterId);
  if (filled.length > 0) {
    return filled.map((m) => {
      const char = getCharacterById(m.characterId as CharacterId)!;
      const aiRow = aiDraft?.suggestedRoles.find(
        (r) => r.memberName.trim() === m.name.trim(),
      );
      return {
        memberName: m.name.trim(),
        suggestedRole: `${char.name} · ${char.title}`,
        reason: aiRow?.reason?.trim() || char.shortDescription,
      };
    });
  }
  return aiDraft?.suggestedRoles ?? [];
}
