// /ai 랜딩 — 60분 운영 타임라인
"use client";

import { motion } from "framer-motion";
import { schedule } from "@/data/aiCareerCurriculum";

export default function AiLandingSchedule() {
  return (
    <section
      id="schedule"
      className="scroll-mt-20 border-t border-[var(--ai-ink)]/8 bg-white"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-bold tracking-[0.12em] text-[var(--ai-teal)] uppercase">
          1시간 운영안
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[var(--ai-ink)] sm:text-3xl">
          60분, 설명보다 실습
        </h2>
        <p className="mt-3 max-w-prose text-base font-semibold text-[var(--ai-ink)]/65">
          도입과 개념은 짧게, Lovable 실습과 자녀 데이터 반영에 시간을 씁니다.
        </p>

        <ol className="relative mt-12 space-y-0">
          <div
            className="absolute top-3 bottom-3 left-[0.55rem] w-px bg-[var(--ai-ink)]/12 sm:left-[0.7rem]"
            aria-hidden
          />
          {schedule.map((row, i) => (
            <motion.li
              key={row.time}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
              className="relative grid grid-cols-[1.5rem_1fr] gap-4 py-4 sm:grid-cols-[1.75rem_7rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span
                className="relative z-10 mt-1.5 size-2.5 rounded-full bg-[var(--ai-teal)] ring-4 ring-white sm:mt-2 sm:size-3"
                aria-hidden
              />
              <time className="col-start-2 row-start-1 text-xs font-extrabold tracking-[0.04em] text-[var(--ai-teal)] sm:col-start-2 sm:text-sm">
                {row.time}
              </time>
              <div className="col-start-2 sm:col-start-3">
                <p className="text-base font-extrabold text-[var(--ai-ink)]">
                  {row.stage}
                  <span className="ml-2 font-bold text-[var(--ai-ink)]/45">
                    · {row.content}
                  </span>
                </p>
              </div>
              <span className="col-start-2 mt-1 inline-block text-[11px] font-bold tracking-[0.06em] text-[var(--ai-ink)]/40 uppercase sm:col-start-4 sm:mt-0 sm:text-right">
                {row.mode}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
