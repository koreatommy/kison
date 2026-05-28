// AI 단계별 예상 소요시간과 최근 실행시간을 관리하는 유틸.
import type { ClaudeTask } from "@/types/startup-support";

const STORAGE_PREFIX = "startup-support:last-elapsed:";

const BASELINE_MS: Record<ClaudeTask, number> = {
  generate_problem_questions: 55000,
  generate_startup_items: 68000,
  evaluate_startup_items: 92000,
  generate_final_document: 105000,
};

export function getBaselineMs(task: ClaudeTask): number {
  return BASELINE_MS[task];
}

export function getRecentElapsedMs(task: ClaudeTask): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${task}`);
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

export function saveRecentElapsedMs(task: ClaudeTask, elapsedMs: number): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${STORAGE_PREFIX}${task}`, String(Math.round(elapsedMs)));
}

export function getExpectedMs(task: ClaudeTask, recentElapsedMs?: number | null): number {
  const baseline = getBaselineMs(task);
  if (!recentElapsedMs || recentElapsedMs <= 0) return baseline;
  // 최근 1건과 기준값을 혼합해 급격한 변동을 완화합니다.
  return Math.round(baseline * 0.6 + recentElapsedMs * 0.4);
}

export function formatDuration(ms: number): string {
  const totalSec = Math.max(1, Math.round(ms / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min === 0) return `${sec}초`;
  return `${min}분 ${sec}초`;
}

export function formatEstimatedRange(task: ClaudeTask, expectedMs: number): string {
  const bufferMs = Math.max(10000, Math.round(getBaselineMs(task) * 0.15));
  const lower = Math.max(1000, expectedMs - bufferMs);
  const upper = expectedMs + bufferMs;
  return `약 ${formatDuration(lower)} ~ ${formatDuration(upper)}`;
}
