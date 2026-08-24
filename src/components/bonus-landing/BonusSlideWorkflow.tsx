// /bonus 랜딩 — 슬라이드 제작 6단계 워크플로우 (2열 + 스크롤 등장)
"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  bonusWorkflowSteps,
  type BonusWorkflowStep,
} from "@/data/bonusWorkflow";

const viewport = { once: true, amount: 0.3, margin: "0px 0px -40px 0px" } as const;

function StepCard({
  step,
  delay,
  reduceMotion,
}: {
  step: BonusWorkflowStep;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.45, ease: "easeOut", delay }
      }
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--bonus-ink)]/10 bg-[var(--bonus-card)]"
    >
      <div className="flex flex-wrap items-start gap-3 border-b border-[var(--bonus-ink)]/8 px-4 py-3.5 sm:px-5">
        <span
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--bonus-amber)] text-sm font-black text-white"
          aria-hidden
        >
          {step.id}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-extrabold tracking-[-0.02em] text-[var(--bonus-ink)] sm:text-base">
            {step.title}
          </h3>
          <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--bonus-ink)]/60 sm:text-sm">
            {step.description}
          </p>
        </div>
      </div>
      <figure className="flex-1 bg-[var(--bonus-well)] p-2.5 sm:p-3">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
          <Image
            src={step.image}
            alt={`${step.id}. ${step.title} 화면 예시`}
            fill
            sizes="(max-width: 640px) 100vw, 480px"
            className="object-contain object-top"
          />
        </div>
      </figure>
    </motion.article>
  );
}

function FlowArrow({
  delay,
  reduceMotion,
  variant,
}: {
  delay: number;
  reduceMotion: boolean;
  variant: "row" | "col";
}) {
  return (
    <motion.div
      aria-hidden
      initial={reduceMotion ? false : { opacity: 0, scale: 0.65 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.35, ease: "easeOut", delay }
      }
      className={
        variant === "row"
          ? "flex items-center justify-center self-center py-1"
          : "flex items-center justify-center py-1"
      }
    >
      <span className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--bonus-amber)]/25 bg-[var(--bonus-amber)]/10 text-[var(--bonus-amber)]">
        {variant === "row" ? (
          <>
            <ArrowDown className="size-5 sm:hidden" strokeWidth={2.5} />
            <ArrowRight className="hidden size-5 sm:block" strokeWidth={2.5} />
          </>
        ) : (
          <ArrowDown className="size-5" strokeWidth={2.5} />
        )}
      </span>
    </motion.div>
  );
}

export default function BonusSlideWorkflow() {
  const reduceMotion = useReducedMotion() ?? false;
  const rows = [
    [bonusWorkflowSteps[0], bonusWorkflowSteps[1]],
    [bonusWorkflowSteps[2], bonusWorkflowSteps[3]],
    [bonusWorkflowSteps[4], bonusWorkflowSteps[5]],
  ] as const;

  return (
    <section
      aria-labelledby="bonus-workflow-heading"
      className="border-b border-[var(--bonus-ink)]/8 bg-[var(--bonus-card)]/50"
    >
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
        <p className="mb-2 text-[11px] font-bold tracking-[0.1em] text-[var(--bonus-amber)] uppercase">
          Workflow
        </p>
        <h2
          id="bonus-workflow-heading"
          className="text-xl font-extrabold tracking-[-0.02em] text-[var(--bonus-ink)] sm:text-2xl"
        >
          슬라이드 제작 워크플로우
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-[var(--bonus-ink)]/60">
          노트북LM에서 소스를 넣고 슬라이드를 만들기까지의 6단계입니다. 스크롤하며
          순서를 따라가세요.
        </p>

        <ol className="mt-8 flex list-none flex-col gap-2 p-0">
          {rows.map((pair, rowIndex) => {
            const left = pair[0];
            const right = pair[1];
            // 스크롤로 뷰포트에 들어올 때 좌→화살표→우 순으로 살짝 시차
            const base = reduceMotion ? 0 : 0.05;
            const leftDelay = base;
            const midDelay = reduceMotion ? 0 : base + 0.12;
            const rightDelay = reduceMotion ? 0 : base + 0.24;
            const downDelay = reduceMotion ? 0 : base + 0.32;

            return (
              <li key={left.id} className="flex list-none flex-col gap-2">
                <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-4">
                  <StepCard
                    step={left}
                    delay={leftDelay}
                    reduceMotion={reduceMotion}
                  />
                  <FlowArrow
                    variant="row"
                    delay={midDelay}
                    reduceMotion={reduceMotion}
                  />
                  <StepCard
                    step={right}
                    delay={rightDelay}
                    reduceMotion={reduceMotion}
                  />
                </div>
                {rowIndex < rows.length - 1 ? (
                  <FlowArrow
                    variant="col"
                    delay={downDelay}
                    reduceMotion={reduceMotion}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
