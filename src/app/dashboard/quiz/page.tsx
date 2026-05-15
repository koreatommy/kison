"use client";

// 1단계 평가 퀴즈 라우트
import dynamic from "next/dynamic";

const QuizGame = dynamic(
  () => import("@/components/dashboard/quiz/QuizGame"),
  { ssr: false },
);

export default function QuizPage() {
  return <QuizGame />;
}
