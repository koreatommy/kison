// 단일 문항 표시 카드 (선택지 셔플 포함)
"use client";

import { useMemo } from "react";
import type { Question, QuestionOption } from "@/types/result";
import { shuffleArray } from "@/lib/shuffle";
import OptionButton from "./OptionButton";

type Props = {
  question: Question;
  selectedAnswer: QuestionOption | null;
  onSelect: (option: QuestionOption) => void;
};

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}: Props) {
  const shuffledOptions = useMemo(
    () => shuffleArray(question.options),
    [question.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div>
      <h3 className="mb-5 text-lg font-bold text-zinc-900">
        {question.question}
      </h3>
      <div className="flex flex-col gap-3">
        {shuffledOptions.map((option) => (
          <OptionButton
            key={option.id}
            text={option.text}
            selected={selectedAnswer?.id === option.id}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}
