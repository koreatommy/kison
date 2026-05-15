"use client";

// 슬라이드쇼 하단 툴바 — 페이지 네비게이션 + 판서 도구 + 메모/전체화면 토글
import {
  ChevronLeft,
  ChevronRight,
  Eraser,
  Highlighter,
  Maximize,
  MessageSquareText,
  Minimize,
  Pen,
  Trash2,
} from "lucide-react";
import type { DrawingTool } from "./SlideDrawingOverlay";

type Props = {
  currentPage: number;
  totalPages: number;
  activeTool: DrawingTool | null;
  isFullscreen: boolean;
  isMemoOpen: boolean;
  memoPages: Set<number>;
  onPrev: () => void;
  onNext: () => void;
  onToolChange: (tool: DrawingTool | null) => void;
  onClearDrawing: () => void;
  onToggleMemo: () => void;
  onToggleFullscreen: () => void;
};

type ToolButton = {
  id: DrawingTool;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
};

const TOOLS: ToolButton[] = [
  { id: "pen", icon: Pen, label: "펜 (P)" },
  { id: "highlighter", icon: Highlighter, label: "형광펜 (H)" },
  { id: "eraser", icon: Eraser, label: "지우개 (E)" },
];

const btnBase =
  "flex items-center justify-center rounded-lg p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none";

const btnActive = "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 hover:text-amber-200";

export default function SlideToolbar({
  currentPage,
  totalPages,
  activeTool,
  isFullscreen,
  isMemoOpen,
  memoPages,
  onPrev,
  onNext,
  onToolChange,
  onClearDrawing,
  onToggleMemo,
  onToggleFullscreen,
}: Props) {
  return (
    <div className="flex shrink-0 items-center justify-between border-t border-white/10 bg-zinc-900/90 px-2 py-1.5 backdrop-blur-md sm:px-4 sm:py-2">
      {/* 네비게이션 */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className={btnBase}
          disabled={currentPage <= 1}
          onClick={onPrev}
          aria-label="이전 슬라이드"
        >
          <ChevronLeft className="size-5" strokeWidth={2.5} />
        </button>
        <span className="min-w-[4.5rem] text-center text-sm font-medium tabular-nums text-zinc-300">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          className={btnBase}
          disabled={currentPage >= totalPages}
          onClick={onNext}
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="size-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* 판서 도구 */}
      <div className="flex items-center gap-1">
        {TOOLS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            className={`${btnBase} ${activeTool === id ? btnActive : ""}`}
            onClick={() => onToolChange(activeTool === id ? null : id)}
            aria-label={label}
            title={label}
          >
            <Icon className="size-4" strokeWidth={2} />
          </button>
        ))}
        <div className="mx-1 h-5 w-px bg-white/10" />
        <button
          type="button"
          className={btnBase}
          onClick={onClearDrawing}
          aria-label="판서 전체 삭제"
          title="전체 삭제"
        >
          <Trash2 className="size-4" strokeWidth={2} />
        </button>
      </div>

      {/* 메모 + 전체화면 */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className={`${btnBase} relative ${isMemoOpen ? btnActive : ""}`}
          onClick={onToggleMemo}
          aria-label="메모 (M)"
          title="메모 (M)"
        >
          <MessageSquareText className="size-4" strokeWidth={2} />
          {memoPages.has(currentPage) && (
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-amber-400" />
          )}
        </button>
        <button
          type="button"
          className={btnBase}
          onClick={onToggleFullscreen}
          aria-label="전체화면 (F)"
          title="전체화면 (F)"
        >
          {isFullscreen ? (
            <Minimize className="size-4" strokeWidth={2} />
          ) : (
            <Maximize className="size-4" strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
}
