"use client";

// 팀별 최종사업계획서 PDF 원문 뷰어 — 브라우저 내장 PDF 뷰어로 원문 그대로 표시
import { Download, ExternalLink } from "lucide-react";

type FinalBusinessPlanViewerProps = {
  teamLabel: string;
  title: string;
  pdfUrl: string;
  sourceFile: string;
};

export default function FinalBusinessPlanViewer({
  teamLabel,
  title,
  pdfUrl,
  sourceFile,
}: FinalBusinessPlanViewerProps) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-zinc-100">
      <div className="shrink-0 border-b border-zinc-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{teamLabel}</p>
            <h1 className="mt-1 text-xl font-bold text-zinc-900 sm:text-2xl">{title}</h1>
            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{sourceFile}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              <ExternalLink className="h-4 w-4" />
              새 창에서 열기
            </a>
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              <Download className="h-4 w-4" />
              다운로드
            </a>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 p-3 sm:p-4">
        <div className="mx-auto h-full max-w-6xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <iframe
            title={`${teamLabel} ${title}`}
            src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
