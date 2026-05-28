// AI 생성 단계의 예상 시간, 진행 상태, 최근 실행 시간을 보여주는 안내 박스.
"use client";

import { useEffect, useMemo, useState } from "react";
import type { ClaudeTask } from "@/types/startup-support";
import {
  formatDuration,
  formatEstimatedRange,
  getExpectedMs,
  getRecentElapsedMs,
} from "@/lib/startup-support/taskTiming";

type AiStepNoticeProps = {
  task: ClaudeTask;
  actionLabel: string;
  actualElapsedMs?: number | null;
  isRunning?: boolean;
};

export default function AiStepNotice({
  task,
  actionLabel,
  actualElapsedMs,
  isRunning = false,
}: AiStepNoticeProps) {
  const [tickMs, setTickMs] = useState(0);
  const [storedElapsedMs, setStoredElapsedMs] = useState<number | null>(null);

  useEffect(() => {
    setStoredElapsedMs(getRecentElapsedMs(task));
  }, [task, actualElapsedMs]);

  useEffect(() => {
    if (!isRunning) {
      setTickMs(0);
      return;
    }
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      setTickMs(Date.now() - startedAt);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  const recentElapsed = actualElapsedMs ?? storedElapsedMs;
  const expectedMs = useMemo(
    () => getExpectedMs(task, recentElapsed),
    [task, recentElapsed],
  );
  const progress = Math.min(1, tickMs / expectedMs);
  const remainMs = Math.max(0, expectedMs - tickMs);

  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <p className="font-bold">예상 소요시간: {formatEstimatedRange(task, expectedMs)}</p>
      {recentElapsed ? (
        <p className="mt-1 font-semibold">최근 실제 소요시간: {formatDuration(recentElapsed)}</p>
      ) : null}
      {isRunning ? (
        <>
          <p className="mt-1 font-semibold">
            {remainMs > 0
              ? `예상 완료까지 약 ${formatDuration(remainMs)} 남았어요.`
              : `예상 시간을 지나 AI가 마무리 중이에요.`}
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-amber-100">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-1000 ease-linear"
              style={{ width: `${Math.max(8, Math.round(progress * 100))}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-amber-700">
            진행 시간 {formatDuration(tickMs)} · 단계 {actionLabel}
          </p>
        </>
      ) : null}
      <p className="mt-1">
        {actionLabel} 중에는 브라우저를 닫거나 새로고침하지 마세요.
      </p>
    </div>
  );
}
