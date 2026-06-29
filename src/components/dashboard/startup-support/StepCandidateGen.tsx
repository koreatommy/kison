// 4단계: AI 창업 아이템 후보 생성 — 생성 버튼 + 비교 테이블 + 후보 카드
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Key, Sparkles, RefreshCw } from "lucide-react";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import { useClaudeTask } from "@/lib/startup-support/useClaudeTask";
import type { StartupItemCandidate } from "@/types/startup-support";
import AiStepNotice from "./AiStepNotice";
import ApiKeySettings from "./ApiKeySettings";
import { StepHeader, ComparisonTable, WarningBox } from "./ui";

function CandidateCard({ c, index }: { c: StartupItemCandidate; index: number }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const lines = [
      `[${index}] ${c.itemName}`,
      c.oneLineDescription,
      "",
      `해결 문제: ${c.problemToSolve || "-"}`,
      `주요 고객: ${c.targetCustomer || "-"}`,
      `핵심 기능: ${c.coreFeatures.join(", ") || "-"}`,
      `차별성: ${c.differentiation || "-"}`,
      `사회적 가치: ${c.expectedSocialValue || "-"}`,
      `실행 방법: ${c.studentExecutionMethod || "-"}`,
      `MVP/시제품: ${c.mvpPlan || "-"}`,
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3 p-5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-zinc-900">{c.itemName}</p>
          <p className="mt-0.5 text-sm text-zinc-500">{c.oneLineDescription}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-500 transition hover:bg-zinc-100"
          >
            {copied ? "복사됨" : "복사"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100"
          >
            {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px border-t border-zinc-100 bg-zinc-100 sm:grid-cols-3">
        <FieldCell label="주요 고객" value={c.targetCustomer} />
        <FieldCell label="핵심 기능" value={c.coreFeatures.join(", ")} />
        <FieldCell label="차별성" value={c.differentiation} />
      </div>

      {open && (
        <div className="space-y-3 border-t border-zinc-100 p-5">
          <Field label="해결 문제" value={c.problemToSolve} />
          <Field label="기존 해결 방식의 한계" value={c.existingSolutionLimitations ?? ""} />
          <Field label="창의적 해결 방식" value={c.creativeSolutionApproach ?? ""} />
          <Field label="사회적 가치" value={c.expectedSocialValue} />
          <Field label="사회적 가치 상세" value={c.socialValueDetail ?? ""} />
          <Field label="실행 방법" value={c.studentExecutionMethod} />
          <Field label="MVP/시제품 계획" value={c.mvpPlan ?? ""} />
          <Field label="주요 수혜자" value={c.beneficiaries?.join(", ") ?? ""} />
          <Field label="위험 요소" value={c.risks.join(", ")} />
          <Field label="검증 필요 사항" value={c.validationNeeds?.join(", ") ?? ""} />
        </div>
      )}
    </div>
  );
}

function FieldCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{label}</p>
      <p className="mt-0.5 line-clamp-2 text-xs text-zinc-700">{value || "-"}</p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-bold text-zinc-500">{label}</p>
      <p className="mt-0.5 text-sm text-zinc-700">{value}</p>
    </div>
  );
}

export default function StepCandidateGen() {
  const candidates = useStartupSupportStore((s) => s.candidates);
  const setCandidates = useStartupSupportStore((s) => s.setCandidates);
  const teamInfo = useStartupSupportStore((s) => s.teamInfo);
  const problemInput = useStartupSupportStore((s) => s.problemInput);
  const problemAnswers = useStartupSupportStore((s) => s.problemAnswers);
  const apiKey = useStartupSupportStore((s) => s.apiKey);
  const [showKeyModal, setShowKeyModal] = useState(false);

  const { run, loading, error, lastElapsedMs } = useClaudeTask<{
    candidates: StartupItemCandidate[];
  }>();

  async function handleGenerate() {
    const result = await run("generate_startup_items", {
      teamInfo,
      selectedCategories: problemInput.selectedCategories,
      problemText: problemInput.problemText,
      problemAnswers,
    }, apiKey);
    if (result?.candidates) {
      setCandidates(result.candidates);
    }
  }

  const comparisonRows = candidates.map((c, i) => ({
    순번: String(i + 1),
    아이템명: c.itemName,
    주요고객: c.targetCustomer,
    차별성: c.differentiation.length > 40 ? c.differentiation.slice(0, 40) + "…" : c.differentiation,
  }));

  return (
    <div className="w-full">
      <StepHeader
        title="AI가 창업 아이템을 만들어 드립니다"
        description="입력한 문제 정보를 바탕으로 3~5개 후보를 생성합니다."
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:from-zinc-300 disabled:to-zinc-400 disabled:shadow-none"
        >
          {loading ? (
            <RefreshCw className="size-4 animate-spin" strokeWidth={2} />
          ) : (
            <Sparkles className="size-4" strokeWidth={2} />
          )}
          {loading ? "생성 중..." : candidates.length > 0 ? "다시 생성하기" : "AI 창업 아이템 생성하기"}
        </button>
      </div>

      <AiStepNotice
        task="generate_startup_items"
        actionLabel="아이템 생성"
        actualElapsedMs={lastElapsedMs}
        isRunning={loading}
      />

      {(!apiKey.trim() || error?.includes("AI Key")) && (
        <div className="mt-4">
          <WarningBox
            variant="warning"
            action={
              <button
                type="button"
                onClick={() => setShowKeyModal(true)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-100"
              >
                <Key className="size-3.5" strokeWidth={2} aria-hidden />
                AI Key {apiKey.trim() ? "다시 입력" : "입력"}
              </button>
            }
          >
            {apiKey.trim()
              ? "입력한 AI Key가 거부되었습니다. Anthropic Console에서 키가 활성 상태인지 확인해 주세요."
              : "AI Key가 설정되지 않았습니다. 시작 화면에서 입력했더라도 새로고침하면 사라집니다."}
          </WarningBox>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <WarningBox variant="error">{error}</WarningBox>
        </div>
      )}

      {candidates.length > 0 && (
        <div className="mt-6 space-y-5">
          <ComparisonTable
            columns={[
              { key: "순번", label: "#" },
              { key: "아이템명", label: "아이템명" },
              { key: "주요고객", label: "주요 고객" },
              { key: "차별성", label: "차별성" },
            ]}
            rows={comparisonRows}
          />

          <div className="space-y-4">
            {candidates.map((c, i) => (
              <CandidateCard key={c.id} c={c} index={i + 1} />
            ))}
          </div>
        </div>
      )}

      {showKeyModal && <ApiKeySettings onClose={() => setShowKeyModal(false)} />}
    </div>
  );
}
