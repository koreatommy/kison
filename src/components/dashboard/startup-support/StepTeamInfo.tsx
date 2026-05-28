// 1단계: 팀 기본정보 입력 — 팀명 + 구성원 동적 행
"use client";

import { Plus, Trash2 } from "lucide-react";
import { characters } from "@/data/characters";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import type { CharacterId } from "@/types/result";
import CharacterRoleGallery from "./CharacterRoleGallery";
import { StepHeader, InputGroup, WarningBox } from "./ui";

const inputClass =
  "w-full rounded-xl border-2 border-zinc-200 bg-white px-3 py-2.5 text-sm font-semibold placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all";

const selectClass =
  "w-full rounded-xl border-2 border-zinc-200 bg-white px-3 py-2.5 text-sm font-semibold text-zinc-800 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all";

export default function StepTeamInfo() {
  const teamInfo = useStartupSupportStore((s) => s.teamInfo);
  const setTeamName = useStartupSupportStore((s) => s.setTeamName);
  const addMember = useStartupSupportStore((s) => s.addMember);
  const removeMember = useStartupSupportStore((s) => s.removeMember);
  const updateMember = useStartupSupportStore((s) => s.updateMember);

  const selectedCharacterIds = teamInfo.members
    .map((m) => m.characterId)
    .filter((id): id is CharacterId => Boolean(id));

  return (
    <div className="w-full">
      <StepHeader
        title="우리 팀 정보 입력"
        description="최종 결과물에 표시될 팀 정보를 입력하세요."
        context="이 정보가 최종 보고서와 신청서에 표시됩니다."
      />

      <div className="space-y-5">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <InputGroup label="팀명" required error={teamInfo.teamName.trim().length === 0 ? "팀명은 필수입니다." : undefined}>
            <input
              type="text"
              value={teamInfo.teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="예: ○○중 안전지킴이 창업팀 (보고서·신청서에 그대로 표시됩니다)"
              className={inputClass}
            />
          </InputGroup>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-700">구성원 정보</p>
              <p className="text-xs text-zinc-400">최소 1명 이상 입력이 필요합니다.</p>
            </div>
            <button
              type="button"
              onClick={addMember}
              className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100"
            >
              <Plus className="size-3.5" strokeWidth={2.5} aria-hidden />
              추가
            </button>
          </div>

          <div className="mb-2 hidden grid-cols-[2rem_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1.5fr)_2rem] items-center gap-2 px-3 sm:grid">
            <span />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">학교</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">학년</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">이름</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">담당 역할</span>
            <span />
          </div>

          <div className="space-y-2">
            {teamInfo.members.map((m, idx) => (
              <div
                key={m.id}
                className="grid grid-cols-[2rem_1fr_2rem] items-start gap-2 rounded-xl border border-zinc-100 bg-zinc-50/60 p-3 sm:grid-cols-[2rem_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1.5fr)_2rem]"
              >
                <span className="mt-2.5 text-center text-xs font-bold text-zinc-400">
                  {idx + 1}
                </span>
                <div className="grid grid-cols-1 gap-2 sm:contents">
                  <input
                    type="text"
                    value={m.school}
                    onChange={(e) => updateMember(m.id, "school", e.target.value)}
                    placeholder="예: ○○중학교"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={m.grade}
                    onChange={(e) => updateMember(m.id, "grade", e.target.value)}
                    placeholder="예: 2학년"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={m.name}
                    onChange={(e) => updateMember(m.id, "name", e.target.value)}
                    placeholder="예: 홍길동"
                    className={inputClass}
                  />
                  <select
                    value={m.characterId}
                    onChange={(e) => updateMember(m.id, "characterId", e.target.value)}
                    className={`${selectClass} ${!m.characterId ? "text-zinc-400" : ""}`}
                    aria-label={`구성원 ${idx + 1} 담당 역할`}
                  >
                    <option value="">역할 선택</option>
                    {characters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.role})
                      </option>
                    ))}
                  </select>
                </div>
                {teamInfo.members.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeMember(m.id)}
                    className="mt-2 rounded-lg p-1.5 text-zinc-300 transition hover:bg-red-50 hover:text-red-500"
                    aria-label={`구성원 ${idx + 1} 삭제`}
                  >
                    <Trash2 className="size-4" strokeWidth={2} />
                  </button>
                ) : (
                  <span />
                )}
              </div>
            ))}
          </div>

          <CharacterRoleGallery selectedCharacterIds={selectedCharacterIds} />
        </div>

        <WarningBox variant="info">
          신청서 양식의 &quot;동아리 현황&quot; 표에 사용됩니다. 담당 역할은 창업 캐릭터 5종 중에서 선택하며 최종 보고서에 반영됩니다.
        </WarningBox>
      </div>
    </div>
  );
}
