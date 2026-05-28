// 3단계: 문제 상황 구체화 — 고정 6질문 워크북형 카드
"use client";

import { useEffect } from "react";
import { useStartupSupportStore } from "@/store/useStartupSupportStore";
import { DEFAULT_PROBLEM_QUESTIONS } from "@/lib/startup-support/problemQuestionsDefault";
import { StepHeader, QuestionCard } from "./ui";

const TIPS: Record<string, string> = {
  q1: "구체적인 장소나 상황을 적으면 AI가 더 현실적인 아이템을 제안합니다.",
  q2: "대상 고객이 명확할수록 아이템의 차별성이 높아집니다.",
  q3: "시간, 날씨, 상황 등 구체적인 조건을 적어보세요.",
  q4: "현재 사용 중인 앱, 서비스, 제도 등을 떠올려 보세요.",
  q5: "기존 방법의 한계를 알면 차별화 포인트를 찾을 수 있습니다.",
  q6: "사회적 가치와 연결되는 변화를 적어보세요.",
};

export default function StepProblemDetail() {
  const problemAnswers = useStartupSupportStore((s) => s.problemAnswers);
  const setProblemAnswers = useStartupSupportStore((s) => s.setProblemAnswers);
  const updateProblemAnswer = useStartupSupportStore((s) => s.updateProblemAnswer);

  useEffect(() => {
    if (problemAnswers.length === 0) {
      setProblemAnswers(
        DEFAULT_PROBLEM_QUESTIONS.map((q) => ({
          questionId: q.id,
          question: q.question,
          answer: "",
        })),
      );
    }
  }, [problemAnswers.length, setProblemAnswers]);

  return (
    <div className="w-full">
      <StepHeader
        title="문제를 조금 더 자세히 알려주세요"
        description="아래 질문에 답하면 AI가 더 좋은 아이템을 만들 수 있어요."
        context="구체적으로 답할수록 AI가 더 좋은 아이템을 제안합니다."
      />

      <div className="space-y-4">
        {DEFAULT_PROBLEM_QUESTIONS.map((q, idx) => {
          const answer =
            problemAnswers.find((a) => a.questionId === q.id)?.answer ?? "";
          return (
            <QuestionCard
              key={q.id}
              number={idx + 1}
              question={q.question}
              tip={TIPS[q.id]}
              placeholder={q.placeholder}
              value={answer}
              onChange={(val) => updateProblemAnswer(q.id, val)}
            />
          );
        })}
      </div>
    </div>
  );
}
