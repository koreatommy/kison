// 9단계 워크플로우 진행률 표시 바 — 단계 번호 + 이름 + 완료 체크
"use client";

import { Check } from "lucide-react";
import { STEP_LABELS } from "@/types/startup-support";

interface ProgressBarProps {
  current: number;
}

export default function ProgressBar({ current }: ProgressBarProps) {
  const progressPct = (current / (STEP_LABELS.length - 1)) * 100;

  return (
    <div className="shrink-0 border-b border-zinc-200 bg-white/80 px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3">
      <p className="mb-1.5 text-xs font-bold text-zinc-500 sm:hidden">
        {current + 1} / {STEP_LABELS.length} · {STEP_LABELS[current]}
      </p>

      <div className="relative mx-auto hidden w-full max-w-[960px] sm:block">
        <div
          className="absolute top-3 right-3 left-3 h-0.5 -translate-y-1/2"
          aria-hidden
        >
          <div className="h-full rounded-full bg-zinc-200">
            <div
              className="h-full rounded-full bg-indigo-400 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="relative flex justify-between">
          {STEP_LABELS.map((label, i) => {
            const done = i < current;
            const active = i === current;

            return (
              <div key={label} className="flex flex-col items-center gap-1">
                <div
                  className={`relative z-10 flex size-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                    done
                      ? "bg-indigo-500 text-white"
                      : active
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-300/50"
                        : "bg-zinc-200 text-zinc-400"
                  }`}
                >
                  {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                </div>
                <span
                  className={`hidden text-center text-[10px] font-semibold leading-tight md:block ${
                    active ? "text-indigo-600" : done ? "text-indigo-400" : "text-zinc-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-center md:hidden">
        <span className="text-xs font-bold text-indigo-600">
          {current + 1}/{STEP_LABELS.length} {STEP_LABELS[current]}
        </span>
      </div>
    </div>
  );
}
