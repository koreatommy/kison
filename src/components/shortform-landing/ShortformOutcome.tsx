// /shortform 랜딩 — Outcome 섹션 (학습 성과 + 운영 팁 + 마무리 CTA)
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  learningOutcomes,
  operatingTips,
  values,
  finalSection,
  references,
} from "@/data/shortformCurriculum";

export default function ShortformOutcome() {
  return (
    <>
      {/* 학습 성과 */}
      <section
        id="outcome"
        className="scroll-mt-20 border-t border-white/10 bg-[var(--sf-ink)] text-white"
      >
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue-bright)] uppercase">
            Learning Outcome
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] sm:text-3xl">
            100분 후, 학생들은 이렇게 달라집니다
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {learningOutcomes.map((outcome, i) => (
              <motion.div
                key={outcome.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="border-t-2 border-[var(--sf-blue-bright)] pt-4"
              >
                <span className="text-xs font-bold tracking-[0.1em] text-white/40">
                  {outcome.tag}
                </span>
                <h3 className="mt-6 text-3xl font-black tracking-[-0.03em] text-white">
                  {outcome.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-white/60">
                  {outcome.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 핵심 가치 태그 */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {values.map((value) => (
              <span
                key={value}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-bold text-white/80"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 운영 팁 */}
      <section className="scroll-mt-20 border-t border-[var(--sf-ink)]/8 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
            운영 팁
          </p>
          <h2 className="mt-3 text-xl font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-2xl">
            수업을 더 효과적으로 진행하려면
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {operatingTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-xl border border-[var(--sf-ink)]/10 bg-[var(--sf-bg)] p-6"
              >
                <h3 className="text-base font-extrabold text-[var(--sf-ink)]">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--sf-ink)]/60">
                  {tip.body}
                </p>
              </div>
            ))}
          </div>

          {/* 참고자료 */}
          <div className="mt-12 border-t border-[var(--sf-ink)]/10 pt-8">
            <h3 className="text-sm font-bold text-[var(--sf-ink)]/50">
              참고자료
            </h3>
            <ul className="mt-4 space-y-2">
              {references.map((ref) => (
                <li
                  key={ref}
                  className="text-sm font-semibold text-[var(--sf-ink)]/60"
                >
                  • {ref}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 마무리 CTA */}
      <section
        id="apply"
        className="scroll-mt-20 bg-gradient-to-br from-[#dfeaff] to-[#f5f0ff]"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
            {finalSection.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[var(--sf-ink)] sm:text-4xl md:text-5xl">
            {finalSection.headline[0]}
            <br />
            <span className="text-[var(--sf-blue)]">
              {finalSection.headline[1]}
            </span>
          </h2>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-bold text-[var(--sf-blue)]">
            {finalSection.flow.map((step, index) => (
              <span key={step} className="flex items-center gap-2">
                {step}
                {index < finalSection.flow.length - 1 && (
                  <span className="text-[var(--sf-ink)]/30">→</span>
                )}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-md text-base font-semibold leading-relaxed text-[var(--sf-ink)]/65">
            {finalSection.copy[0]}
            <br />
            <strong className="text-[var(--sf-ink)]">
              {finalSection.copy[1]}
            </strong>
          </p>

          <a
            href={finalSection.cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--sf-ink)] px-6 py-3.5 text-sm font-bold text-white transition-transform duration-[90ms] hover:bg-[var(--sf-ink-soft)] active:scale-[0.98]"
          >
            {finalSection.cta.label}
            <ArrowUpRight className="size-4" strokeWidth={2.5} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--sf-ink)]/10 bg-[var(--sf-ink)] px-5 py-8 text-center sm:px-8">
        <p className="text-xs font-bold tracking-[0.04em] text-white/40">
          AI 숏폼 크리에이터 클래스 · 초등학교 4~6학년 미디어 리터러시 체험 프로그램
        </p>
      </footer>
    </>
  );
}
