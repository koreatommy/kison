// 진행 중인 창업 지원 작업 이어하기·새로 시작 선택 모달
"use client";

import { Play, RotateCcw } from "lucide-react";
import { STEP_LABELS } from "@/types/startup-support";

interface ResumeOrRestartModalProps {
  currentStep: number;
  teamName?: string;
  onContinue: () => void;
  onRestart: () => void;
}

export default function ResumeOrRestartModal({
  currentStep,
  teamName,
  onContinue,
  onRestart,
}: ResumeOrRestartModalProps) {
  const stepLabel = STEP_LABELS[currentStep] ?? "진행 중";
  const progressHint = teamName?.trim()
    ? `${teamName.trim()} 팀 · ${stepLabel} 단계`
    : `${stepLabel} 단계`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-restart-title"
        className="relative mx-4 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl"
      >
        <h2 id="resume-restart-title" className="text-lg font-bold text-zinc-900">
          이전 작업이 있습니다
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          진행 중이던 창업 아이템 선정 작업을 이어할까요, 아니면 처음부터 다시 시작할까요?
        </p>

        <div className="mt-4 rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            저장된 진행
          </p>
          <p className="mt-1 text-sm font-semibold text-amber-900">{progressHint}</p>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-bold text-zinc-600 transition hover:bg-zinc-100"
          >
            <RotateCcw className="size-4" strokeWidth={2} aria-hidden />
            새로 시작
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <Play className="size-4" strokeWidth={2} aria-hidden />
            이어하기
          </button>
        </div>
      </div>
    </div>
  );
}
