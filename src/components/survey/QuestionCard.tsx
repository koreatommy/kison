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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id]
  );

  return (
    <div>
      <h2 className="mb-6 text-xl sm:text-2xl font-black text-zinc-900 leading-snug">
        {question.question}
      </h2>
      <div className="flex flex-col gap-3">
        {shuffledOptions.map((option, i) => (
          <OptionButton
            key={option.id}
            index={i}
            text={option.text}
            selected={selectedAnswer?.id === option.id}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}
