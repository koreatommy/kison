"use client";

// 슬라이드별 텍스트 메모 — 우측 슬라이드인 패널, localStorage 자동 저장
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "lecture-memo";
const DEBOUNCE_MS = 500;

type Props = {
  currentPage: number;
  totalPages: number;
  isOpen: boolean;
  onClose: () => void;
};

type Memos = Record<number, string>;

function loadMemos(): Memos {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveMemos(memos: Memos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
}

export function getPageHasMemo(): Set<number> {
  const memos = loadMemos();
  return new Set(
    Object.entries(memos)
      .filter(([, v]) => v.trim().length > 0)
      .map(([k]) => Number(k)),
  );
}

export default function SlideMemoPanel({ currentPage, totalPages, isOpen, onClose }: Props) {
  const [memos, setMemos] = useState<Memos>({});
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setMemos(loadMemos());
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setMemos((prev) => {
        const next = { ...prev, [currentPage]: value };
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => saveMemos(next), DEBOUNCE_MS);
        return next;
      });
    },
    [currentPage],
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (!isOpen) return null;

  return (
    <aside className="absolute inset-y-0 right-0 z-20 flex w-72 flex-col border-l border-white/10 bg-zinc-900/95 backdrop-blur-md sm:w-80">
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="text-sm font-semibold text-zinc-200">
          메모 — 슬라이드 {currentPage}/{totalPages}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
          aria-label="메모 닫기"
        >
          <X className="size-4" strokeWidth={2.5} />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <textarea
          className="h-full w-full resize-none rounded-lg border border-white/10 bg-zinc-800/80 p-3 text-sm leading-relaxed text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/50 focus:outline-none"
          placeholder="이 슬라이드에 대한 메모를 작성하세요…"
          value={memos[currentPage] ?? ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </aside>
  );
}
