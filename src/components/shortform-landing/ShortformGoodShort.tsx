// /shortform 랜딩 — GoodShort 섹션 (좋은 숏폼의 3가지 질문)
"use client";

import { motion } from "framer-motion";
import { goodShortQuestions } from "@/data/shortformCurriculum";

const toneStyles: Record<string, string> = {
  default: "bg-[#8fb9ff]",
  purple: "bg-[#b6a1ff]",
  yellow: "bg-[#ffda53] text-[var(--sf-ink)]",
};

export default function ShortformGoodShort() {
  return (
    <section className="scroll-mt-20 border-t border-[var(--sf-ink)]/8 bg-[#edf4ff]">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
          Good Short-form
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-3xl">
          좋은 숏폼을 만드는{" "}
          <span className="text-[var(--sf-blue)]">3가지 질문</span>
        </h2>
        <p className="mt-3 max-w-prose text-base font-semibold text-[var(--sf-ink)]/65">
          모든 숏폼은 이 세 가지 질문에 답할 수 있어야 합니다. 학생들은 사례 분석을 통해 스스로 발견합니다.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {goodShortQuestions.map((question, i) => (
            <motion.article
              key={question.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className={`relative flex min-h-[240px] flex-col justify-between rounded-2xl p-6 ${toneStyles[question.tone] ?? toneStyles.default}`}
            >
              <span className="text-xs font-bold tracking-[0.1em] text-[var(--sf-ink)]/60 uppercase">
                {question.tag}
              </span>
              <div>
                <h3 className="whitespace-pre-line text-xl font-black leading-snug tracking-[-0.025em] sm:text-2xl">
                  {question.title}
                </h3>
              </div>
              <span className="absolute right-5 bottom-5 text-4xl" aria-hidden>
                {question.symbol}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
