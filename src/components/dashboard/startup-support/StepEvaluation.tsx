// 5단계: AI 아이템 비교·평가 — 점수 시각화 + 비교표 + 인사이트
"use client";

import { useState } from "react";
import { RefreshCw, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import { useClaudeTask } from "@/lib/startup-support/useClaudeTask";
import type { StartupItemEvaluation } from "@/types/startup-support";
import AiStepNotice from "./AiStepNotice";
import { StepHeader, ScoreBadge, ScoreBar, InsightBox, ComparisonTable, WarningBox } from "./ui";

const SCORE_LABELS: { key: keyof StartupItemEvaluation["score"]; label: string; max: number }[] = [
  { key: "problemClarity", label: "문제 명확성", max: 20 },
  { key: "customerClarity", label: "고객 명확성", max: 15 },
  { key: "solutionFit", label: "해결 적합성", max: 20 },
  { key: "differentiation", label: "차별성", max: 15 },
  { key: "feasibility", label: "실행 가능성", max: 20 },
  { key: "socialValue", label: "사회적 가치", max: 10 },
];

function getRankVariant(rank: number): "gold" | "silver" | "bronze" | "default" {
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  return "default";
}

function EvalCard({
  ev,
  candidateName,
  mvpPlan,
  beneficiaries,
  validationNeeds,
  isRecommended,
  copied,
  onCopy,
}: {
  ev: StartupItemEvaluation;
  candidateName: string;
  mvpPlan: string;
  beneficiaries: string;
  validationNeeds: string;
  isRecommended: boolean;
  copied: boolean;
  onCopy: () => void;
}) {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border shadow-sm transition-shadow hover:shadow-md ${
        isRecommended
          ? "border-amber-300 bg-amber-50/50"
          : "border-zinc-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3">
        <ScoreBadge
          score={`${ev.recommendationRank}위`}
          variant={getRankVariant(ev.recommendationRank)}
          size="sm"
        />
        <p className="text-sm font-bold text-zinc-900">{candidateName}</p>
        {isRecommended && (
          <ScoreBadge score="AI 추천" variant="gold" size="sm" />
        )}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-500 transition hover:bg-zinc-100"
          >
            {copied ? "복사됨" : "복사"}
          </button>
          <ScoreBadge score={`${ev.score.total}점`} variant="default" size="md" />
        </div>
      </div>

      <div className="space-y-1.5 px-5 py-4">
        {SCORE_LABELS.map((sl) => (
          <ScoreBar
            key={sl.key}
            label={sl.label}
            score={ev.score[sl.key]}
            max={sl.max}
          />
        ))}
      </div>

      <div className="grid gap-3 border-t border-zinc-100 p-5 sm:grid-cols-3">
        <InsightBox title="강점" items={ev.strengths} variant="emerald" />
        <InsightBox title="약점" items={ev.weaknesses} variant="amber" />
        <InsightBox title="보완 방향" items={ev.improvementSuggestions} variant="blue" />
      </div>

      <div className="border-t border-zinc-100">
        <button
          type="button"
          onClick={() => setDetailOpen(!detailOpen)}
          className="flex w-full items-center justify-between px-5 py-2.5 text-xs font-semibold text-zinc-400 transition hover:bg-zinc-50"
        >
          <span>실행 검토 메모</span>
          {detailOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </button>
        {detailOpen && (
          <div className="grid gap-3 px-5 pb-4 sm:grid-cols-3">
            <MetaField label="MVP 계획" value={mvpPlan} />
            <MetaField label="주요 수혜자" value={beneficiaries} />
            <MetaField label="검증 필요 사항" value={validationNeeds} />
          </div>
        )}
      </div>

      <div className="border-t border-zinc-100 px-5 py-3">
        <p className="text-xs text-zinc-500">{ev.recommendationReason}</p>
      </div>
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-zinc-500">{label}</p>
      <p className="mt-0.5 text-xs text-zinc-700">{value || "-"}</p>
    </div>
  );
}

export default function StepEvaluation() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [criteriaOpen, setCriteriaOpen] = useState(false);
  const candidates = useStartupSupportStore((s) => s.candidates);
  const evaluations = useStartupSupportStore((s) => s.evaluations);
  const evaluationSummary = useStartupSupportStore((s) => s.evaluationSummary);
  const evaluationKeyRisks = useStartupSupportStore((s) => s.evaluationKeyRisks);
  const recommendedCandidateId = useStartupSupportStore((s) => s.recommendedCandidateId);
  const setEvaluations = useStartupSupportStore((s) => s.setEvaluations);
  const problemInput = useStartupSupportStore((s) => s.problemInput);
  const problemAnswers = useStartupSupportStore((s) => s.problemAnswers);
  const apiKey = useStartupSupportStore((s) => s.apiKey);

  const { run, loading, error, lastElapsedMs } = useClaudeTask<{
    evaluations: StartupItemEvaluation[];
    summary: string;
    keyRisks?: string[];
    recommendedCandidateId: string;
  }>();

  async function handleEvaluate() {
    const result = await run("evaluate_startup_items", {
      candidates,
      problemText: problemInput.problemText,
      problemAnswers,
    }, apiKey);
    if (result) {
      setEvaluations(
        result.evaluations,
        result.summary,
        result.keyRisks ?? [],
        result.recommendedCandidateId,
      );
    }
  }

  function getName(id: string) {
    return candidates.find((c) => c.id === id)?.itemName ?? id;
  }
  function getCandidate(id: string) {
    return candidates.find((c) => c.id === id);
  }

  async function handleCopy(ev: StartupItemEvaluation) {
    const c = getCandidate(ev.candidateId);
    const scoreLines = SCORE_LABELS.map((sl) => `- ${sl.label}: ${ev.score[sl.key]}/${sl.max}`);
    const text = [
      `${ev.recommendationRank}위 ${getName(ev.candidateId)} (${ev.score.total}점)`,
      "", "[점수]", ...scoreLines,
      "", "[강점]", ...(ev.strengths.map((s) => `- ${s}`)),
      "", "[약점]", ...(ev.weaknesses.map((s) => `- ${s}`)),
      "", "[보완]", ...(ev.improvementSuggestions.map((s) => `- ${s}`)),
      "", "[실행 검토]",
      `- MVP: ${c?.mvpPlan ?? c?.studentExecutionMethod ?? "-"}`,
      `- 수혜자: ${c?.beneficiaries?.join(", ") ?? "-"}`,
      `- 검증: ${c?.validationNeeds?.join(", ") ?? "-"}`,
      "", `추천 이유: ${ev.recommendationReason || "-"}`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopiedId(ev.candidateId);
    setTimeout(() => setCopiedId((prev) => (prev === ev.candidateId ? null : prev)), 1500);
  }

  const sorted = evaluations.slice().sort((a, b) => a.recommendationRank - b.recommendationRank);

  const comparisonColumns = [
    { key: "순위", label: "순위" },
    { key: "아이템명", label: "아이템명" },
    ...SCORE_LABELS.map((sl) => ({ key: sl.label, label: `${sl.label}(${sl.max})` })),
    { key: "총점", label: "총점" },
  ];
  const comparisonRows = sorted.map((ev) => {
    const row: Record<string, string | number> = {
      순위: `${ev.recommendationRank}위`,
      아이템명: getName(ev.candidateId),
      총점: ev.score.total,
    };
    SCORE_LABELS.forEach((sl) => { row[sl.label] = ev.score[sl.key]; });
    return row;
  });
  const highlightIdx = sorted.findIndex((ev) => ev.candidateId === recommendedCandidateId);

  return (
    <div className="w-full">
      <StepHeader
        title="어떤 아이템이 가장 좋을까요?"
        description="AI가 후보를 6가지 기준으로 평가합니다."
      />

      <div className="mb-4">
        <button
          type="button"
          onClick={() => setCriteriaOpen(!criteriaOpen)}
          className="flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-zinc-700"
        >
          <span>평가 기준 6가지</span>
          {criteriaOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </button>
        {criteriaOpen && (
          <div className="mt-2 grid gap-1 rounded-xl border border-zinc-200 bg-white p-3 sm:grid-cols-2">
            {SCORE_LABELS.map((sl) => (
              <p key={sl.key} className="text-xs text-zinc-600">• {sl.label} ({sl.max}점)</p>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleEvaluate}
        disabled={loading || candidates.length === 0}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:from-zinc-300 disabled:to-zinc-400 disabled:shadow-none"
      >
        {loading ? (
          <RefreshCw className="size-4 animate-spin" strokeWidth={2} />
        ) : (
          <Trophy className="size-4" strokeWidth={2} />
        )}
        {loading ? "평가 중..." : evaluations.length > 0 ? "다시 평가하기" : "AI 평가 시작"}
      </button>

      <AiStepNotice
        task="evaluate_startup_items"
        actionLabel="아이템 평가"
        actualElapsedMs={lastElapsedMs}
        isRunning={loading}
      />

      {error && (
        <div className="mt-4"><WarningBox variant="error">{error}</WarningBox></div>
      )}

      {evaluationSummary && (
        <div className="mt-6 space-y-3">
          <InsightBox title="AI 평가 요약" text={evaluationSummary} variant="indigo" />
          {evaluationKeyRisks.length > 0 && (
            <WarningBox variant="warning">
              <p className="text-xs font-bold">핵심 리스크</p>
              <ul className="mt-1 space-y-0.5">
                {evaluationKeyRisks.map((risk, idx) => (
                  <li key={idx} className="text-xs">• {risk}</li>
                ))}
              </ul>
            </WarningBox>
          )}
        </div>
      )}

      {evaluations.length > 0 && (
        <div className="mt-6 space-y-5">
          <ComparisonTable
            columns={comparisonColumns}
            rows={comparisonRows}
            highlightRowIndex={highlightIdx >= 0 ? highlightIdx : undefined}
          />

          {sorted.map((ev) => {
            const c = getCandidate(ev.candidateId);
            return (
              <EvalCard
                key={ev.candidateId}
                ev={ev}
                candidateName={getName(ev.candidateId)}
                mvpPlan={c?.mvpPlan ?? c?.studentExecutionMethod ?? ""}
                beneficiaries={c?.beneficiaries?.join(", ") ?? ""}
                validationNeeds={c?.validationNeeds?.join(", ") ?? ""}
                isRecommended={ev.candidateId === recommendedCandidateId}
                copied={copiedId === ev.candidateId}
                onCopy={() => handleCopy(ev)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
