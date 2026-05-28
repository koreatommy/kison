// 7단계: 최종 창업 아이템 확정 — 비교 카드 + 체크리스트 + 선정 이유
"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import type { FinalSelection } from "@/types/startup-support";
import { StepHeader, InsightBox, WarningBox } from "./ui";

const CHECKLIST_ITEMS: { key: keyof FinalSelection["checkedItems"]; label: string }[] = [
  { key: "problemFit", label: "문제와 고객이 명확한가?" },
  { key: "customerClear", label: "청소년 팀이 실행 가능한가?" },
  { key: "differentiationClear", label: "기존 해결 방법보다 나은 점이 있는가?" },
  { key: "prototypePossible", label: "시제품, 설문, 캠페인 등 최소 하나는 만들 수 있는가?" },
  { key: "planExpandable", label: "신청서 항목(문제인식, 실현가능성, 성장전략)으로 확장 가능한가?" },
];

export default function StepFinalSelection() {
  const candidates = useStartupSupportStore((s) => s.candidates);
  const shortlistedItems = useStartupSupportStore((s) => s.shortlistedItems);
  const finalSelection = useStartupSupportStore((s) => s.finalSelection);
  const setFinalSelection = useStartupSupportStore((s) => s.setFinalSelection);
  const evaluations = useStartupSupportStore((s) => s.evaluations);

  const shortCandidates = shortlistedItems
    .sort((a, b) => a.rank - b.rank)
    .map((si) => ({
      ...si,
      candidate: candidates.find((c) => c.id === si.candidateId),
      evaluation: evaluations.find((ev) => ev.candidateId === si.candidateId),
    }))
    .filter((x) => x.candidate);

  const [selectedId, setSelectedId] = useState(finalSelection?.candidateId ?? "");
  const [reason, setReason] = useState(finalSelection?.finalReason ?? "");
  const [checks, setChecks] = useState<FinalSelection["checkedItems"]>(
    finalSelection?.checkedItems ?? {
      problemFit: false,
      customerClear: false,
      differentiationClear: false,
      prototypePossible: false,
      planExpandable: false,
    },
  );
  const selectedCandidate = shortCandidates.find((x) => x.candidate?.id === selectedId)?.candidate ?? null;

  useEffect(() => {
    if (!selectedId) return;
    setFinalSelection({
      candidateId: selectedId,
      finalReason: reason,
      checkedItems: checks,
    });
  }, [selectedId, reason, checks, setFinalSelection]);

  function toggleCheck(key: keyof FinalSelection["checkedItems"]) {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const checkedCount = Object.values(checks).filter(Boolean).length;

  return (
    <div className="w-full">
      <StepHeader
        title="최종 창업 아이템을 확정하세요"
        description="후보 중 1개를 최종 선택합니다."
        context="확정 전 체크리스트를 확인하고, 최종 선정 이유를 작성하세요."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {shortCandidates.map((item) => {
          const c = item.candidate!;
          const active = selectedId === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedId(c.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all active:scale-[0.98] ${
                active
                  ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-200/40"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex size-5 items-center justify-center rounded-full border-2 transition-colors ${
                    active ? "border-indigo-500 bg-indigo-500" : "border-zinc-300"
                  }`}
                >
                  {active && <Check className="size-3 text-white" strokeWidth={3} />}
                </div>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500">
                  {item.rank}순위
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-zinc-900">{c.itemName}</p>
              <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{c.oneLineDescription}</p>
              {item.evaluation && (
                <p className="mt-2 text-xs font-bold text-indigo-600">{item.evaluation.score.total}점</p>
              )}
            </button>
          );
        })}
      </div>

      {selectedId && selectedCandidate && (
        <div className="mt-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <InsightBox
              title="기존 해결 방식의 한계"
              text={selectedCandidate.existingSolutionLimitations || "-"}
              variant="amber"
            />
            <InsightBox
              title="창의적 해결 방식"
              text={selectedCandidate.creativeSolutionApproach || "-"}
              variant="emerald"
            />
            <InsightBox
              title="MVP/시제품 계획"
              text={selectedCandidate.mvpPlan ?? selectedCandidate.studentExecutionMethod}
              variant="blue"
            />
            <InsightBox
              title="검증 필요 사항"
              items={selectedCandidate.validationNeeds ?? []}
              variant="indigo"
            />
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-sm font-bold text-zinc-800">
              확인 체크리스트
              <span className="ml-2 text-xs font-normal text-zinc-400">{checkedCount}/{CHECKLIST_ITEMS.length}</span>
            </p>
            <div className="space-y-2.5">
              {CHECKLIST_ITEMS.map((item) => (
                <label key={item.key} className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={checks[item.key]}
                    onChange={() => toggleCheck(item.key)}
                    className="mt-0.5 size-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className={`text-sm ${checks[item.key] ? "text-zinc-800" : "text-zinc-500"}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-zinc-700">
              최종 선정 이유
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="예: 팀 토론·멘토 피드백 후, 사고 예방 효과·구현 난이도·지속 운영 가능성을 모두 만족한다고 판단했습니다. (최종 보고서·신청서에 들어갈 근거를 구체적으로)"
              rows={3}
              className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm placeholder:text-zinc-300 transition-colors focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 resize-none"
            />
          </div>

          {checkedCount < CHECKLIST_ITEMS.length && (
            <WarningBox variant="warning">
              체크리스트를 모두 확인하면 더 완성도 높은 보고서를 만들 수 있습니다.
            </WarningBox>
          )}
        </div>
      )}
    </div>
  );
}
