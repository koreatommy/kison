// Claude API 호출 클라이언트 훅 — loading/error/retry 관리
"use client";

import { useState, useRef, useCallback } from "react";
import type { ClaudeTask, ClaudeResponse } from "@/types/startup-support";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import { saveRecentElapsedMs } from "@/lib/startup-support/taskTiming";

export function useClaudeTask<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastElapsedMs, setLastElapsedMs] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const runIdRef = useRef(0);
  const addTokenUsage = useStartupSupportStore((s) => s.addTokenUsage);

  const run = useCallback(
    async (
      task: ClaudeTask,
      payload: unknown,
      apiKey?: string,
    ): Promise<T | null> => {
      const runId = ++runIdRef.current;
      const startedAt = Date.now();
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);
      let isSuccess = false;

      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (apiKey) {
          headers["x-user-anthropic-key"] = apiKey;
        }

        const res = await fetch("/api/ai/claude", {
          method: "POST",
          headers,
          body: JSON.stringify({ task, payload }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const fallback =
            res.status === 429
              ? "요청이 많아 지연되고 있어요. 잠시 후 다시 시도해 주세요."
              : `AI 요청 실패 (${res.status})`;
          if (runIdRef.current === runId) {
            setError(fallback);
          }
          return null;
        }

        const json: ClaudeResponse<T> = await res.json();

        if (!json.success || !json.data) {
          if (runIdRef.current === runId) {
            setError(json.error ?? "AI 응답 처리 중 오류가 발생했습니다.");
          }
          return null;
        }
        if (json.usage) {
          addTokenUsage(task, json.usage);
        }

        isSuccess = true;
        return json.data;
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return null;
        if (runIdRef.current === runId) {
          setError("AI 응답 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
        return null;
      } finally {
        if (runIdRef.current === runId) {
          const elapsedMs = Date.now() - startedAt;
          setLastElapsedMs(elapsedMs);
          if (isSuccess) {
            saveRecentElapsedMs(task, elapsedMs);
          }
          setLoading(false);
        }
      }
    },
    [addTokenUsage],
  );

  const retry = useCallback(
    (task: ClaudeTask, payload: unknown, apiKey?: string) => run(task, payload, apiKey),
    [run],
  );

  return { run, loading, error, retry, lastElapsedMs };
}
