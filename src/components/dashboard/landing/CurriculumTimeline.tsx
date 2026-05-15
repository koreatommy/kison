"use client";
// 10단계 창업 커리큘럼 수직 타임라인
import { motion } from "framer-motion";
import { MISSION_STEPS } from "@/lib/mission-steps";

export default function CurriculumTimeline() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-sm font-bold tracking-widest text-amber-800/60 uppercase">
          커리큘럼
        </p>
        <h2 className="mt-2 text-2xl font-black text-zinc-900 sm:text-3xl md:text-4xl">
          10단계 창업 로드맵
        </h2>
        <p className="mt-3 text-base font-semibold text-zinc-700/80 sm:text-lg">
          문제 발견부터 피칭까지, 한 단계씩 레벨업!
        </p>
      </motion.div>

      <div className="relative mx-auto mt-14 max-w-2xl">
        {/* 중앙 라인 */}
        <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-zinc-900/10 sm:left-1/2 sm:-translate-x-px" />

        {MISSION_STEPS.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`relative mb-8 flex items-start gap-4 pl-12 sm:mb-10 sm:pl-0 ${
                isLeft
                  ? "sm:flex-row sm:pr-[calc(50%+2rem)] sm:text-right"
                  : "sm:flex-row-reverse sm:pl-[calc(50%+2rem)] sm:text-left"
              }`}
            >
              {/* 도트 */}
              <span
                className="absolute left-3.5 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full border-[3px] border-white shadow-md sm:left-1/2 sm:-translate-x-1/2"
                style={{ backgroundColor: step.dotColor }}
              />

              {/* 카드 */}
              <div className="flex-1 rounded-xl bg-white/70 p-4 shadow-md backdrop-blur-sm">
                <span
                  className="text-xs font-black"
                  style={{ color: step.dotColor }}
                >
                  STEP {String(step.id).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-extrabold text-zinc-900 sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">
                  {step.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
