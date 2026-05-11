// 10문항 설문 진행 화면
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppHeader from "@/components/layout/AppHeader";
import PageContainer from "@/components/layout/PageContainer";
import SurveyProgress from "@/components/survey/SurveyProgress";
import QuestionCard from "@/components/survey/QuestionCard";
import { questions } from "@/data/questions";
import { useSurveyStore } from "@/store/useSurveyStore";
import type { QuestionOption } from "@/types/result";

export default function SurveyPage() {
  const router = useRouter();
  const {
    studentProfile,
    currentIndex,
    answers,
    selectAnswer,
    goNext,
    goPrev,
    complete,
  } = useSurveyStore();

  useEffect(() => {
    if (!studentProfile) {
      router.replace("/profile");
    }
  }, [studentProfile, router]);

  if (!studentProfile) return null;

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const allAnswered = answers.every((a) => a !== null);

  function handleSelect(option: QuestionOption) {
    selectAnswer(currentIndex, option);
  }

  function handleNext() {
    if (isLast && allAnswered) {
      complete();
      router.push("/loading-result");
    } else {
      goNext();
    }
  }

  return (
    <>
      <AppHeader />
      <PageContainer>
        <div className="mx-auto max-w-lg">
          <SurveyProgress current={currentIndex} total={questions.length} />
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={currentAnswer}
            onSelect={handleSelect}
          />

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex-1 rounded-full border border-zinc-300 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              이전
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!currentAnswer}
              className="flex-1 rounded-full bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              {isLast ? "결과 보기" : "다음"}
            </button>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
