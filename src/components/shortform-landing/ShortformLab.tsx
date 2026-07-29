// /shortform 랜딩 — AI Creator Lab (생성형 AI 플랫폼 스타일 인터랙티브 UI)
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, ChevronRight, Lightbulb } from "lucide-react";
import { labSteps } from "@/data/shortformCurriculum";

type GenerationStatus = "idle" | "analyzing" | "generating" | "complete";

const statusMessages: Record<GenerationStatus, string> = {
  idle: "프롬프트를 입력하고 생성 버튼을 눌러주세요",
  analyzing: "프롬프트를 분석하는 중...",
  generating: "AI가 이미지를 생성하는 중...",
  complete: "생성 완료!",
};

export default function ShortformLab() {
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [improved, setImproved] = useState(false);

  const current = labSteps[activeStep];
  const totalSteps = labSteps.length;

  const handleGenerate = () => {
    setStatus("analyzing");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("complete");
          return 100;
        }
        if (prev >= 60 && status === "analyzing") {
          setStatus("generating");
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleStepChange = (index: number) => {
    setActiveStep(index);
    setStatus("idle");
    setProgress(0);
    setImproved(false);
  };

  useEffect(() => {
    if (progress >= 60 && status === "analyzing") {
      setStatus("generating");
    }
  }, [progress, status]);

  return (
    <section
      id="lab"
      className="scroll-mt-20 border-t border-[var(--sf-ink)]/8 bg-[var(--sf-ink)]"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        {/* 헤더 */}
        <div className="mb-12 text-center">
          <p className="text-xs font-bold tracking-[0.12em] text-[var(--sf-blue-bright)] uppercase">
            AI Creator Lab
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-white sm:text-3xl">
            상상을 현실로 만드는{" "}
            <span className="text-[var(--sf-blue-bright)]">3단계</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base font-semibold text-white/60">
            학생이 먼저 생각하고, AI가 표현을 도와줍니다.
            프롬프트를 작성하고 결과물을 확인해보세요.
          </p>
        </div>

        {/* Step Navigator (수평) */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {labSteps.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <button
                type="button"
                onClick={() => handleStepChange(index)}
                className={`flex flex-col items-center gap-2 rounded-xl px-4 py-3 transition-all duration-200 ${
                  index === activeStep
                    ? "bg-[var(--sf-blue)] text-white"
                    : index < activeStep
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-full text-sm font-bold ${
                    index === activeStep
                      ? "bg-white text-[var(--sf-blue)]"
                      : index < activeStep
                        ? "bg-green-500 text-white"
                        : "bg-white/20"
                  }`}
                >
                  {index < activeStep ? (
                    <Check className="size-4" strokeWidth={3} />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="text-xs font-bold tracking-wide">
                  {step.label}
                </span>
              </button>
              {index < totalSteps - 1 && (
                <ChevronRight
                  className={`mx-1 size-5 ${
                    index < activeStep ? "text-green-400" : "text-white/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* 2컬럼 레이아웃 */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* 좌측: 프롬프트 입력 */}
          <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.1em] text-[var(--sf-blue-bright)] uppercase">
                {current.step}
              </span>
              <span className="text-xs font-bold text-white/40">
                {activeStep + 1} / {totalSteps}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-black tracking-[-0.02em] text-white sm:text-2xl">
                  {current.title}
                </h3>
                {current.subtitle && (
                  <p className="mt-2 text-sm font-semibold text-white/60">
                    {current.subtitle}
                  </p>
                )}

                {current.prompt && (
                  <div className="mt-6">
                    <div className="mb-3 rounded-lg bg-[var(--sf-blue)]/20 px-4 py-3">
                      <p className="text-sm font-bold text-[var(--sf-blue-bright)]">
                        프롬프트 구조
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white/80">
                        {current.prompt}
                      </p>
                    </div>

                    <div className="relative">
                      <div className="min-h-[120px] rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-sm text-white/70">
                        {improved ? (
                          <span className="text-[var(--sf-cyan)]">
                            {current.placeholder?.replace("예: ", "")}
                            <span className="text-white/40">
                              {" "}
                              — 화면 가득 채우는 클로즈업, 부드러운 자연광,
                              따뜻한 색감
                            </span>
                          </span>
                        ) : (
                          current.placeholder
                        )}
                      </div>
                      {current.placeholder && (
                        <span className="absolute bottom-3 right-3 text-xs text-white/30">
                          {current.placeholder.length}/200
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {current.tip && (
                  <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                    <Lightbulb
                      className="mt-0.5 size-4 shrink-0 text-amber-400"
                      strokeWidth={2.5}
                    />
                    <p className="text-sm font-semibold text-amber-200/80">
                      {current.tip}
                    </p>
                  </div>
                )}

                {/* 버튼 영역 */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {current.prompt && (
                    <button
                      type="button"
                      onClick={() => setImproved(!improved)}
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-150 active:scale-[0.98] ${
                        improved
                          ? "bg-[var(--sf-cyan)] text-[var(--sf-ink)]"
                          : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      <Sparkles className="size-4" />
                      {improved ? "다듬기 완료 ✓" : "AI가 프롬프트 다듬기"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={status !== "idle" && status !== "complete"}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--sf-blue)] px-5 py-2.5 text-sm font-bold text-white transition-all duration-150 hover:bg-[var(--sf-blue-soft)] active:scale-[0.98] disabled:opacity-50"
                  >
                    {status === "complete" ? "다시 생성하기" : "생성하기 →"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 우측: Preview Panel */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] p-6 sm:p-8">
            {/* 9:16 폰 프레임 */}
            <div className="relative aspect-[9/16] w-40 overflow-hidden rounded-3xl border-4 border-white/20 bg-gradient-to-br from-[var(--sf-ink-soft)] to-[var(--sf-ink)] shadow-2xl sm:w-48">
              <div className="absolute top-3 left-3 right-3 flex justify-between text-[9px] font-bold text-white/50">
                <span>9:16</span>
                <span>● LIVE</span>
              </div>

              <AnimatePresence mode="wait">
                {status === "complete" ? (
                  <motion.img
                    key="result"
                    src={current.image}
                    alt="AI 생성 이미지"
                    className="size-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                ) : status !== "idle" ? (
                  <motion.div
                    key="loading"
                    className="sf-shimmer absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    className="flex size-full items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Sparkles className="size-8 text-white/20" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-3 left-3 right-3">
                <div className="mb-2 h-px bg-white/20" />
                <p className="text-center text-[9px] font-bold text-white/50">
                  {activeStep === 0
                    ? "AI IMAGE"
                    : activeStep === 1
                      ? "AI VIDEO"
                      : "FINAL RESULT"}
                </p>
              </div>
            </div>

            {/* 상태 표시 */}
            <div className="mt-6 w-full max-w-[200px]">
              {status !== "idle" && (
                <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--sf-blue)] to-[var(--sf-cyan)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              )}
              <p className="text-center text-xs font-semibold text-white/50">
                {statusMessages[status]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
