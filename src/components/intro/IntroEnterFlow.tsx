"use client";

// 인트로 마우스 클릭 → 미션 토스트 → 시작 시 /dashboard 로 이동
import { useCallback, useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";

const TEAM_START_PATH = "/dashboard";

const MISSION_MESSAGE = "그럼 지금부터 미션을 시작하겠습니다.";

function FloatingMouseButton({ onClick }: { onClick: () => void }) {
  const tooltipClass =
    "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/20 bg-zinc-950/95 px-3 py-2 text-sm font-bold text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100";

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex min-h-12 min-w-12 touch-manipulation animate-float items-center justify-center rounded-xl p-3 outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:min-h-14 sm:min-w-14 md:min-h-[3.5rem] md:min-w-[3.5rem]"
      aria-label="미션 시작하기"
      aria-haspopup="dialog"
    >
      <span className={tooltipClass} role="tooltip">
        시작합니다
      </span>
      <svg
        className="h-12 w-8 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:h-14 sm:w-9 md:h-[4.25rem] md:w-[2.75rem]"
        viewBox="0 0 36 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect
          x="7"
          y="5"
          width="22"
          height="38"
          rx="11"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="18"
          y1="5"
          x2="18"
          y2="17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="24"
          x2="18"
          y2="32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    </button>
  );
}

function MissionToast({
  open,
  titleId,
  onClose,
  onStart,
}: {
  open: boolean;
  titleId: string;
  onClose: () => void;
  onStart: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 p-4 pb-[max(5.5rem,env(safe-area-inset-bottom,0px)+4rem)] backdrop-blur-[2px] sm:items-center sm:pb-8"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md animate-[intro-toast-in_0.32s_ease-out] rounded-2xl border border-white/15 bg-zinc-950/95 px-5 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md sm:px-6 sm:py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          id={titleId}
          className="text-xs font-black uppercase tracking-[0.2em] text-amber-400"
        >
          즐거운 시간 되세요
        </p>
        <p className="mt-2 text-base font-bold leading-relaxed text-white sm:text-lg">
          {MISSION_MESSAGE}
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-5 w-full rounded-xl bg-[#facc15] px-4 py-3.5 text-base font-black text-zinc-900 shadow-lg transition hover:brightness-105 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          시작
        </button>
      </div>
    </div>
  );
}

export default function IntroEnterFlow() {
  const router = useRouter();
  const titleId = useId();
  const [toastOpen, setToastOpen] = useState(false);

  const openToast = useCallback(() => setToastOpen(true), []);
  const closeToast = useCallback(() => setToastOpen(false), []);

  const handleStart = useCallback(() => {
    setToastOpen(false);
    router.push(TEAM_START_PATH);
  }, [router]);

  useEffect(() => {
    if (!toastOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeToast();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toastOpen, closeToast]);

  return (
    <>
      <FloatingMouseButton onClick={openToast} />
      <MissionToast
        open={toastOpen}
        titleId={titleId}
        onClose={closeToast}
        onStart={handleStart}
      />
    </>
  );
}
