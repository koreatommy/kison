// /shortform 랜딩 — About 섹션 (핵심 메시지 + 학습 목표 + 타임라인 통합)
"use client";

import { motion } from "framer-motion";
import {
  coreMessage,
  learningGoals,
  schedule,
  curriculumMeta,
} from "@/data/shortformCurriculum";

export default function ShortformAbout() {
  return (
    <section
      id="program"
      className="scroll-mt-20 border-t border-[var(--sf-ink)]/8 bg-white"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        {/* 핵심 메시지 */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
              왜 숏폼 제작인가요?
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-3xl md:text-4xl">
              {coreMessage.headline}
            </h2>
            <p className="mt-5 max-w-prose text-base font-semibold leading-relaxed text-[var(--sf-ink)]/70 sm:text-lg">
              {coreMessage.body}
            </p>
            <ul className="mt-8 space-y-3">
              {coreMessage.pillars.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm font-bold text-[var(--sf-ink)]/85 sm:text-base"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--sf-blue)]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <dl className="flex flex-col justify-center gap-6 border-t border-[var(--sf-ink)]/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            {[
              { label: "대상", value: curriculumMeta.audience },
              { label: "시간", value: curriculumMeta.duration },
              { label: "형태", value: curriculumMeta.format },
              { label: "결과물", value: curriculumMeta.deliverable },
            ].map((row) => (
              <div key={row.label}>
                <dt className="text-[11px] font-bold tracking-[0.1em] text-[var(--sf-ink)]/45 uppercase">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm font-extrabold leading-snug text-[var(--sf-ink)] sm:text-base">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 학습 목표 */}
        <div className="mt-20">
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
            학습 목표
          </p>
          <h3 className="mt-3 text-xl font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-2xl">
            수업이 끝나면 할 수 있는 일
          </h3>

          <ol className="mt-8 space-y-0 divide-y divide-[var(--sf-ink)]/10 border-y border-[var(--sf-ink)]/10">
            {learningGoals.map((goal, i) => (
              <li key={goal} className="flex gap-5 py-5 sm:gap-8 sm:py-6">
                <span className="w-8 shrink-0 text-2xl font-black tracking-[-0.04em] text-[var(--sf-blue)]/50 sm:w-10 sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base font-bold leading-relaxed text-[var(--sf-ink)] sm:text-lg">
                  {goal}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* 100분 타임라인 */}
        <div className="mt-20">
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue)] uppercase">
            100분 운영안
          </p>
          <h3 className="mt-3 text-xl font-black tracking-[-0.025em] text-[var(--sf-ink)] sm:text-2xl">
            분석하고, 발견하고, 직접 만든다
          </h3>
          <p className="mt-3 max-w-prose text-base font-semibold text-[var(--sf-ink)]/65">
            개념 설명은 짧게, 사례 분석과 AI 실습에 시간을 씁니다.
          </p>

          <ol className="relative mt-12 space-y-0">
            <div
              className="absolute top-3 bottom-3 left-[0.55rem] w-px bg-[var(--sf-ink)]/12 sm:left-[0.7rem]"
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
                  className="relative z-10 mt-1.5 size-2.5 rounded-full bg-[var(--sf-blue)] ring-4 ring-white sm:mt-2 sm:size-3"
                  aria-hidden
                />
                <time className="col-start-2 row-start-1 text-xs font-extrabold tracking-[0.04em] text-[var(--sf-blue)] sm:col-start-2 sm:text-sm">
                  {row.time}
                </time>
                <div className="col-start-2 sm:col-start-3">
                  <p className="text-base font-extrabold text-[var(--sf-ink)]">
                    {row.stage}
                    <span className="ml-2 font-bold text-[var(--sf-ink)]/45">
                      · {row.content}
                    </span>
                  </p>
                </div>
                <span className="col-start-2 mt-1 inline-block text-[11px] font-bold tracking-[0.06em] text-[var(--sf-ink)]/40 uppercase sm:col-start-4 sm:mt-0 sm:text-right">
                  {row.mode}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
