// 10문항 설문 진행 화면 - 슬라이드 애니메이션 + 자동 진행
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";
import StepIndicator from "@/components/layout/StepIndicator";
import SurveyProgress from "@/components/survey/SurveyProgress";
import QuestionCard from "@/components/survey/QuestionCard";
import { questions, QUESTION_COUNT } from "@/data/questions";
import { useSurveyStore } from "@/store/useSurveyStore";
import type { QuestionOption } from "@/types/result";

const STEPS = ["기본 정보", "설문", "결과"];
const AUTO_ADVANCE_MS = 420;

export default function SurveyPage() {
  const router = useRouter();
  const [surveyHydrated, setSurveyHydrated] = useState(false);
  const {
    studentProfile,
    currentIndex,
    answers,
    selectAnswer,
    goNext,
    goPrev,
    goToIndex,
    finishSurvey,
  } = useSurveyStore();

  useEffect(() => {
    const api = useSurveyStore.persist;
    if (!api) {
      setSurveyHydrated(true);
      return;
    }
    if (api.hasHydrated()) {
      setSurveyHydrated(true);
      return;
    }
    return api.onFinishHydration(() => setSurveyHydrated(true));
  }, []);

  useEffect(() => {
    if (!surveyHydrated) return;
    if (!studentProfile) {
      router.replace("/profile");
    }
  }, [surveyHydrated, studentProfile, router]);

  if (!surveyHydrated || !studentProfile) return null;

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleSelect(option: QuestionOption) {
    const answeredIndex = currentIndex;
    selectAnswer(answeredIndex, option);

    setTimeout(() => {
      if (useSurveyStore.getState().currentIndex !== answeredIndex) return;

      if (answeredIndex !== QUESTION_COUNT - 1) {
        goNext();
        return;
      }
      if (useSurveyStore.getState().finishSurvey()) {
        router.push("/loading-result");
      }
    }, AUTO_ADVANCE_MS);
  }

  function handleManualNext() {
    if (!isLast) {
      goNext();
      return;
    }

    if (finishSurvey()) {
      router.push("/loading-result");
      return;
    }

    const latest = useSurveyStore.getState().answers;
    for (let i = 0; i < QUESTION_COUNT; i++) {
      if (latest[i] === null || latest[i] === undefined) {
        goToIndex(i);
        return;
      }
    }
  }

  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-violet-50 via-white to-indigo-50">
      <BackgroundBlobs variant="indigo" />

      <div className="relative z-10 mx-auto w-full max-w-xl px-5 py-6 sm:py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors"
          >
            <span>←</span>
            <span>뒤로</span>
          </Link>
          <div className="hidden sm:block">
            <StepIndicator steps={STEPS} current={1} />
          </div>
        </div>

        <SurveyProgress current={currentIndex} total={questions.length} />

        <div className="rounded-3xl border border-white bg-white/85 backdrop-blur-sm p-5 sm:p-7 shadow-xl shadow-indigo-200/40 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={currentAnswer}
                onSelect={handleSelect}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex-1 rounded-full border-2 border-zinc-200 bg-white py-3 text-sm font-extrabold text-zinc-600 transition-all hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            이전
          </button>
          <button
            type="button"
            onClick={handleManualNext}
            disabled={!currentAnswer}
            className="flex-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:from-zinc-300 disabled:to-zinc-300 disabled:shadow-none"
          >
            {isLast ? "결과 보기 →" : "다음"}
          </button>
        </div>
      </div>
    </main>
  );
}
