"use client";
// 하단 최종 CTA 섹션 — 다크 카드 반전 효과
import {
  useCallback,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const INQUIRY_MESSAGE =
  "한국창업융합연구원 엄수현 원장(010-2327-1730)으로 문의바랍니다.";

function InquiryToast({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur-[2px] sm:items-center sm:pb-8"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-sm animate-[intro-toast-in_0.32s_ease-out] rounded-2xl border border-white/15 bg-zinc-950/95 px-5 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md sm:px-6 sm:py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          id={titleId}
          className="text-xs font-black uppercase tracking-[0.2em] text-amber-400"
        >
          교육 문의
        </p>
        <p className="mt-2 text-center text-base font-bold leading-relaxed text-white sm:text-lg">
          {INQUIRY_MESSAGE}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-[#facc15] px-4 py-3 text-sm font-black text-zinc-900 shadow-lg transition hover:brightness-105 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:text-base"
        >
          확인
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function BottomCTA() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const closeInquiry = useCallback(() => setInquiryOpen(false), []);

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-zinc-900 p-10 text-center shadow-2xl sm:p-14 md:p-16"
      >
        <p className="text-sm font-bold tracking-widest text-amber-400 uppercase">
          준비 완료?
        </p>
        <h2 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
          지금 바로 첫 번째 미션을
          <br />
          시작해 볼까요?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base font-medium text-zinc-400 sm:text-lg">
          10단계를 완주하면 당신만의 창업 스토리가 완성돼요.
          <br />
          망설이지 말고, 지금 출발!
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="rounded-full bg-amber-400 px-10 py-4 text-sm font-extrabold text-zinc-900 shadow-lg transition hover:scale-105 hover:bg-amber-300 active:scale-95 sm:text-base"
          >
            미션 시작하기
          </button>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={inquiryOpen}
            onClick={() => setInquiryOpen(true)}
            className="rounded-full border-2 border-zinc-700 px-10 py-4 text-sm font-bold text-zinc-300 transition hover:border-zinc-500 hover:text-white active:scale-95 sm:text-base"
          >
            교육 문의하기
          </button>
        </div>
      </motion.div>
      <InquiryToast open={inquiryOpen} onClose={closeInquiry} />
    </section>
  );
}
