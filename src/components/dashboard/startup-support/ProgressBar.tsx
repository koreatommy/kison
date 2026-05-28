// 9단계 워크플로우 진행률 표시 바 — 단계 번호 + 이름 + 완료 체크
"use client";

import { Check } from "lucide-react";
import { STEP_LABELS } from "@/types/startup-support";

interface ProgressBarProps {
  current: number;
}

export default function ProgressBar({ current }: ProgressBarProps) {
  return (
    <div className="shrink-0 border-b border-zinc-200 bg-white/80 px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3">
      <p className="mb-1.5 text-xs font-bold text-zinc-500 sm:hidden">
        {current + 1} / {STEP_LABELS.length} · {STEP_LABELS[current]}
      </p>

      <div className="hidden items-center sm:flex">
        {STEP_LABELS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          const isLast = i === STEP_LABELS.length - 1;

          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
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
              {!isLast && (
                <div className="mx-1 h-0.5 flex-1 rounded-full md:mx-0.5">
                  <div
                    className={`h-full rounded-full transition-colors ${
                      done ? "bg-indigo-400" : "bg-zinc-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-center md:hidden">
        <span className="text-xs font-bold text-indigo-600">
          {current + 1}/{STEP_LABELS.length} {STEP_LABELS[current]}
        </span>
      </div>
    </div>
  );
}
