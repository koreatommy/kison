// 이전/다음 네비게이션 하단 고정 바
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface ActionFooterProps {
  current: number;
  maxStep: number;
  onPrev: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  nextDisabledReason?: string;
  hideNext?: boolean;
}

const btnBase =
  "inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-bold transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2";

export default function ActionFooter({
  current,
  maxStep,
  onPrev,
  onNext,
  nextLabel,
  nextDisabled,
  nextDisabledReason,
  hideNext,
}: ActionFooterProps) {
  return (
    <footer className="shrink-0 border-t border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[960px] grid-cols-3 items-center">
        <div className="flex justify-start">
          {current > 0 ? (
            <button
              type="button"
              onClick={onPrev}
              className={`${btnBase} border border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50`}
              aria-label="이전 단계"
            >
              <ArrowLeft className="size-4" strokeWidth={2.5} aria-hidden />
              <span>이전</span>
            </button>
          ) : (
            <span />
          )}
        </div>
        <div className="px-2 text-center">
          {nextDisabled && nextDisabledReason && (
            <p className="rounded-lg bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
              {nextDisabledReason}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          {!hideNext && current < maxStep && (
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              className={`${btnBase} bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-300/40 hover:shadow-xl hover:shadow-indigo-300/60 hover:scale-[1.02] disabled:cursor-not-allowed disabled:from-zinc-300 disabled:to-zinc-400 disabled:text-zinc-500 disabled:shadow-none disabled:hover:scale-100`}
              aria-label="다음 단계"
            >
              <span>{nextLabel ?? "다음"}</span>
              <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
