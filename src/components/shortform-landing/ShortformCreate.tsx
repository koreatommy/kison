// /shortform 랜딩 — Create 섹션 (제작 흐름 + 결과물 통합)
"use client";

import { motion } from "framer-motion";
import { createFlow, resultCards } from "@/data/shortformCurriculum";

export default function ShortformCreate() {
  return (
    <section className="scroll-mt-20 border-t border-[var(--sf-ink)]/8 bg-[var(--sf-bg)]">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        {/* 제작 흐름 */}
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
            Creation Flow
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-3xl">
            상상에서 <span className="text-[var(--sf-blue)]">영상</span>까지
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base font-semibold text-[var(--sf-ink)]/65">
            학생들은 이 네 단계를 거쳐 나만의 AI 숏폼을 완성합니다.
          </p>
        </div>

        {/* 플로우 스텝 */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {createFlow.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <div
                className={`flex flex-col items-center gap-2 rounded-2xl px-6 py-4 ${
                  step.done
                    ? "bg-[var(--sf-blue)] text-white"
                    : "bg-white text-[var(--sf-ink)] shadow-sm"
                }`}
              >
                <span
                  className={`text-2xl font-black ${
                    step.done ? "text-white/80" : "text-[var(--sf-blue)]"
                  }`}
                >
                  {step.step}
                </span>
                <span className="text-sm font-bold">{step.label}</span>
              </div>
              {index < createFlow.length - 1 && (
                <span className="mx-2 text-2xl text-[var(--sf-ink)]/20">→</span>
              )}
            </div>
          ))}
        </div>

        {/* 결과물 카드 */}
        <div className="mt-20">
          <p className="text-center text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
            My Result
          </p>
          <h3 className="mt-3 text-center text-xl font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-2xl">
            학생별 개별 결과물
          </h3>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {resultCards.map((card, i) => (
              <motion.article
                key={card.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.15, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-[var(--sf-ink)]/10 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-[var(--sf-ink)]/5 px-5 py-3">
                  <span className="text-xs font-bold tracking-[0.1em] text-[var(--sf-ink)]/40 uppercase">
                    {card.meta}
                  </span>
                  <span className="text-lg font-black text-[var(--sf-blue)]/30">
                    {card.number}
                  </span>
                </div>
                <div className="aspect-[4/3] bg-gradient-to-br from-[var(--sf-ink)]/5 to-[var(--sf-ink)]/10">
                  <img
                    src={card.image}
                    alt={card.highlight}
                    className="size-full object-cover"
                  />
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold text-[var(--sf-ink)]/60">
                    {card.title}
                  </p>
                  <p className="mt-1 text-lg font-black tracking-[-0.02em] text-[var(--sf-blue)]">
                    {card.highlight}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
