// 8단계: 신청서 핵심 문장 생성 + 최종 결과 보고서 미리보기/저장
"use client";

import { RefreshCw, FileText, Download } from "lucide-react";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import { useClaudeTask } from "@/lib/startup-support/useClaudeTask";
import { generateResultHtml, generateResultBodyHtml } from "@/lib/startup-support/htmlExport";
import { downloadHtml } from "@/lib/startup-support/downloadHtml";
import { sanitizeFilename } from "@/lib/startup-support/sanitizeFilename";
import ResultHtmlPreview from "./ResultHtmlPreview";
import type { FinalDocument } from "@/types/startup-support";
import { APPLICATION_FORM_SPEC } from "@/lib/startup-support/applicationFormSpec";
import { buildWorkflowContext } from "@/lib/startup-support/contextBuilder";
import AiStepNotice from "./AiStepNotice";
import { StepHeader, WarningBox } from "./ui";
import styles from "./result-document.module.css";

function ReportSummary() {
  const teamInfo = useStartupSupportStore((s) => s.teamInfo);
  const finalDocument = useStartupSupportStore((s) => s.finalDocument);
  const finalSelection = useStartupSupportStore((s) => s.finalSelection);
  const candidates = useStartupSupportStore((s) => s.candidates);
  const evaluations = useStartupSupportStore((s) => s.evaluations);
  const problemInput = useStartupSupportStore((s) => s.problemInput);

  const finalCandidate = candidates.find((c) => c.id === finalSelection?.candidateId);
  const finalEval = evaluations.find((ev) => ev.candidateId === finalSelection?.candidateId);
  const today = new Date().toLocaleDateString("ko-KR");

  return (
    <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6">
      <p className="text-lg font-extrabold text-zinc-900">
        창업 아이템 선정 결과 보고서
      </p>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
        <SummaryField label="팀명" value={teamInfo.teamName} />
        <SummaryField label="최종 아이템명" value={finalDocument?.selectedItemName ?? finalCandidate?.itemName ?? "-"} />
        <SummaryField label="작성일" value={today} />
        <SummaryField label="문제 분야" value={problemInput.selectedCategories.join(", ")} />
        <SummaryField label="주요 고객" value={finalCandidate?.targetCustomer ?? "-"} />
        <SummaryField label="종합 점수" value={finalEval ? `${finalEval.score.total}점` : "-"} />
      </div>
      {finalDocument?.oneLineItemDescription && (
        <p className="mt-3 text-sm font-medium text-indigo-700">
          {finalDocument.oneLineItemDescription}
        </p>
      )}
    </div>
  );
}

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{label}</p>
      <p className="mt-0.5 font-semibold text-zinc-800">{value || "-"}</p>
    </div>
  );
}

export default function StepFinalDocument() {
  const finalDocument = useStartupSupportStore((s) => s.finalDocument);
  const setFinalDocument = useStartupSupportStore((s) => s.setFinalDocument);
  const apiKey = useStartupSupportStore((s) => s.apiKey);
  const reset = useStartupSupportStore((s) => s.reset);
  const goToStep = useStartupSupportStore((s) => s.goToStep);

  const { run, loading, error, lastElapsedMs } = useClaudeTask<FinalDocument>();

  async function handleGenerate() {
    const snap = useStartupSupportStore.getState();
    const result = await run("generate_final_document", {
      workflowContext: buildWorkflowContext(snap),
      applicationFormSpec: APPLICATION_FORM_SPEC,
    }, apiKey);
    if (result) {
      setFinalDocument(result);
    }
  }

  const storeState = useStartupSupportStore.getState();
  const html = finalDocument ? generateResultHtml(storeState) : null;
  const bodyHtml = finalDocument ? generateResultBodyHtml(storeState) : null;

  function handleDownloadHtml() {
    if (!html) return;
    const snap = useStartupSupportStore.getState();
    const teamName = snap.teamInfo.teamName || "팀";
    const itemName = snap.finalDocument?.selectedItemName || "아이템";
    const filename = sanitizeFilename(`창업아이템선정결과_${teamName}_${itemName}.html`);
    downloadHtml(html, filename);
  }

  function handleRestart() {
    reset();
    goToStep(0);
  }

  return (
    <div className="w-full">
      <StepHeader
        title={finalDocument ? "창업 아이템 선정 결과" : "신청서에 들어갈 문장을 완성합니다"}
        description={
          finalDocument
            ? "결과를 확인하고 HTML 또는 PDF로 저장하세요."
            : "AI가 최종 아이템 정보를 신청서 양식 기준으로 정리합니다."
        }
      />

      {!finalDocument && (
        <div className="mt-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:from-zinc-300 disabled:to-zinc-400 disabled:shadow-none"
          >
            {loading ? (
              <RefreshCw className="size-4 animate-spin" strokeWidth={2} />
            ) : (
              <FileText className="size-4" strokeWidth={2} />
            )}
            {loading ? "생성 중..." : "신청서 문장 생성하기"}
          </button>
          <AiStepNotice
            task="generate_final_document"
            actionLabel="신청서 문장 생성"
            actualElapsedMs={lastElapsedMs}
            isRunning={loading}
          />
        </div>
      )}

      {error && (
        <div className="mt-4"><WarningBox variant="error">{error}</WarningBox></div>
      )}

      {finalDocument && html && bodyHtml && (
        <div className="space-y-6">
          <ReportSummary />

          <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-4 py-2 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} strokeWidth={2} />
              다시 생성
            </button>
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-4 py-2 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50"
            >
              <Download className="size-4" strokeWidth={2} />
              HTML 다운로드
            </button>
            <ResultHtmlPreview html={html} renderPrintButton />
            <div className="flex-1" />
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 px-4 py-2 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50"
            >
              처음으로 돌아가기
            </button>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md sm:p-8">
            <div
              className={styles.resultDocument}
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
