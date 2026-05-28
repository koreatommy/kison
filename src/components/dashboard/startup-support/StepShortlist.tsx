// 6단계: 최종 후보 3개 선정 — 순위 배지 + 선택 이유 + 요약 패널
"use client";

import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import type { ShortlistedItem } from "@/types/startup-support";
import { StepHeader, ScoreBadge, WarningBox } from "./ui";

const RANK_STYLES = {
  1: { badge: "gold" as const, border: "border-amber-300", bg: "bg-amber-50/50" },
  2: { badge: "silver" as const, border: "border-zinc-300", bg: "bg-zinc-50/50" },
  3: { badge: "bronze" as const, border: "border-orange-300", bg: "bg-orange-50/50" },
};

export default function StepShortlist() {
  const candidates = useStartupSupportStore((s) => s.candidates);
  const evaluations = useStartupSupportStore((s) => s.evaluations);
  const shortlistedItems = useStartupSupportStore((s) => s.shortlistedItems);
  const setShortlistedItems = useStartupSupportStore((s) => s.setShortlistedItems);

  const maxRanks = Math.min(candidates.length, 3) as 1 | 2 | 3;

  function handleRankChange(rank: 1 | 2 | 3, candidateId: string) {
    const next = shortlistedItems.filter((si) => si.rank !== rank);
    if (candidateId) {
      next.push({ rank, candidateId, reason: "" });
    }
    setShortlistedItems(next);
  }

  function handleReasonChange(rank: 1 | 2 | 3, reason: string) {
    setShortlistedItems(
      shortlistedItems.map((si) =>
        si.rank === rank ? { ...si, reason } : si,
      ),
    );
  }

  function autoFillByAI() {
    const sorted = evaluations
      .slice()
      .sort((a, b) => a.recommendationRank - b.recommendationRank);
    const items: ShortlistedItem[] = [];
    for (let i = 0; i < maxRanks && i < sorted.length; i++) {
      const candidate = candidates.find((c) => c.id === sorted[i].candidateId);
      const validationHint = candidate?.validationNeeds?.[0]
        ? `검증 필요: ${candidate.validationNeeds[0]}`
        : "";
      const mvpHint = candidate?.mvpPlan ? `MVP: ${candidate.mvpPlan}` : "";
      const detailHint = [validationHint, mvpHint].filter(Boolean).join(" / ");
      items.push({
        rank: (i + 1) as 1 | 2 | 3,
        candidateId: sorted[i].candidateId,
        reason: detailHint
          ? `${sorted[i].recommendationReason} (${detailHint})`
          : sorted[i].recommendationReason,
      });
    }
    setShortlistedItems(items);
  }

  function getSelected(rank: 1 | 2 | 3) {
    return shortlistedItems.find((si) => si.rank === rank)?.candidateId ?? "";
  }
  function getReason(rank: 1 | 2 | 3) {
    return shortlistedItems.find((si) => si.rank === rank)?.reason ?? "";
  }
  function isAlreadySelected(candidateId: string, currentRank: 1 | 2 | 3) {
    return shortlistedItems.some(
      (si) => si.candidateId === candidateId && si.rank !== currentRank,
    );
  }

  const isExactly3 = candidates.length === 3;
  const selectedCount = shortlistedItems.filter((si) => si.candidateId).length;

  return (
    <div className="w-full">
      <StepHeader
        title={isExactly3 ? "후보의 순위를 정하세요" : "우리 팀의 후보 3개를 선택하세요"}
        description={
          isExactly3
            ? "AI 평가 결과를 참고해 1~3순위를 정하세요."
            : `AI 평가 결과를 참고해 ${candidates.length}개 중 3개를 골라 순위를 정하세요.`
        }
        context="선택 이유가 최종 보고서에 들어갑니다."
      />

      <div className="mb-6 flex items-center gap-3">
        {evaluations.length > 0 && (
          <button
            type="button"
            onClick={autoFillByAI}
            className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100"
          >
            AI 추천순 자동 배치
          </button>
        )}
        <span className="text-xs text-zinc-400">
          {selectedCount}/{maxRanks}개 선택됨
        </span>
      </div>

      <div className="space-y-4">
        {([1, 2, 3] as const).slice(0, maxRanks).map((rank) => {
          const style = RANK_STYLES[rank];
          return (
            <div
              key={rank}
              className={`rounded-xl border ${style.border} ${style.bg} p-5 shadow-sm`}
            >
              <div className="mb-3 flex items-center gap-2">
                <ScoreBadge score={`${rank}순위`} variant={style.badge} size="sm" />
                {getSelected(rank) && (
                  <span className="text-sm font-bold text-zinc-800">
                    {candidates.find((c) => c.id === getSelected(rank))?.itemName}
                  </span>
                )}
              </div>
              <select
                value={getSelected(rank)}
                onChange={(e) => handleRankChange(rank, e.target.value)}
                className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              >
                <option value="">아이템을 선택하세요</option>
                {candidates.map((c) => (
                  <option
                    key={c.id}
                    value={c.id}
                    disabled={isAlreadySelected(c.id, rank)}
                  >
                    {c.itemName}
                    {isAlreadySelected(c.id, rank) ? " (이미 선택됨)" : ""}
                  </option>
                ))}
              </select>

              <textarea
                value={getReason(rank)}
                onChange={(e) => handleReasonChange(rank, e.target.value)}
                placeholder="이 아이템을 선택한 이유를 적어주세요."
                rows={2}
                className="mt-3 w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-sm placeholder:text-zinc-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
              />
            </div>
          );
        })}
      </div>

      {selectedCount === maxRanks && (
        <div className="mt-4">
          <WarningBox variant="success">
            {maxRanks}개 후보 선정이 완료되었습니다. 다음 단계로 이동할 수 있습니다.
          </WarningBox>
        </div>
      )}
    </div>
  );
}
