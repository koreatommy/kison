"use client";
// 하단 최종 CTA 섹션 — 다크 카드 반전 효과
import { motion } from "framer-motion";

export default function BottomCTA() {
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
            className="rounded-full border-2 border-zinc-700 px-10 py-4 text-sm font-bold text-zinc-300 transition hover:border-zinc-500 hover:text-white active:scale-95 sm:text-base"
          >
            교육 문의하기
          </button>
        </div>
      </motion.div>
    </section>
  );
}
