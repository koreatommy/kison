"use client";

// 1단계 평가 퀴즈 게임 — 랜덤 출제, 마지막 문항 축포, 결과 정오답 노트
import { SsgoiTransition } from "@ssgoi/react";
import { useCallback, useState } from "react";
import confetti from "canvas-confetti";
import { ArrowRight, Check, X } from "lucide-react";
import StepIndicator from "@/components/layout/StepIndicator";
import SurveyProgress from "@/components/survey/SurveyProgress";
import {
  type QuizQuestion,
  QUIZ_QUESTIONS,
  shuffleQuestions,
} from "@/lib/quiz-data";
import QuizResultScreen, { type AnswerRecord } from "./QuizResult";

const MISSION_STEPS = ["강의", "참여", "평가"];

type Phase = "start" | "playing" | "feedback" | "result";

function QuizStartForm({
  name,
  onNameChange,
  onStart,
}: {
  name: string;
  onNameChange: (value: string) => void;
  onStart: () => void;
}) {
  const isValid = name.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onStart();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-white bg-white/80 p-6 shadow-xl shadow-indigo-200/40 backdrop-blur-sm"
    >
      <div>
        <label
          htmlFor="quiz-player-name"
          className="mb-2 block text-xs font-black uppercase tracking-wider text-zinc-500"
        >
          이름 <span className="text-pink-500">*</span>
        </label>
        <input
          id="quiz-player-name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="이름을 입력하세요"
          className="w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm font-semibold placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:from-zinc-300 disabled:to-zinc-300 disabled:shadow-none disabled:hover:scale-100"
      >
        <span>퀴즈 시작하기</span>
        <ArrowRight className="size-5" strokeWidth={2.5} aria-hidden />
      </button>
    </form>
  );
}

const PART_LABELS = ["Part 1  OX 퀴즈", "Part 2  4지선다형"] as const;

function partLabelFor(question: QuizQuestion) {
  return question.type === "ox" ? PART_LABELS[0] : PART_LABELS[1];
}

function fireConfetti() {
  const defaults = { disableForReducedMotion: true };
  confetti({ ...defaults, particleCount: 120, spread: 80, origin: { y: 0.55 } });
  setTimeout(
    () => confetti({ ...defaults, particleCount: 80, spread: 140, origin: { y: 0.4 } }),
    250,
  );
  setTimeout(
    () => confetti({ ...defaults, particleCount: 60, spread: 100, origin: { x: 0.3, y: 0.5 } }),
    500,
  );
  setTimeout(
    () => confetti({ ...defaults, particleCount: 60, spread: 100, origin: { x: 0.7, y: 0.5 } }),
    500,
  );
}

function OXButtons({
  disabled,
  onAnswer,
}: {
  disabled: boolean;
  onAnswer: (value: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onAnswer(true)}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-300 bg-emerald-50 py-5 text-2xl font-black text-emerald-600 transition hover:border-emerald-400 hover:bg-emerald-100 active:scale-[0.98] disabled:opacity-50 sm:py-6 sm:text-3xl"
      >
        O
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onAnswer(false)}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-300 bg-red-50 py-5 text-2xl font-black text-red-600 transition hover:border-red-400 hover:bg-red-100 active:scale-[0.98] disabled:opacity-50 sm:py-6 sm:text-3xl"
      >
        X
      </button>
    </div>
  );
}

function MCOptions({
  question,
  disabled,
  onAnswer,
}: {
  question: Extract<QuizQuestion, { type: "mc" }>;
  disabled: boolean;
  onAnswer: (index: number) => void;
}) {
  const labels = ["①", "②", "③", "④"];

  return (
    <div className="space-y-2.5 sm:space-y-3">
      {question.options.map((option, i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          onClick={() => onAnswer(i)}
          className="flex w-full items-start gap-3 rounded-xl border-2 border-zinc-200 bg-white px-4 py-3.5 text-left text-sm font-semibold text-zinc-800 transition hover:border-indigo-300 hover:bg-indigo-50/50 active:scale-[0.99] disabled:opacity-50 sm:px-5 sm:py-4 sm:text-base"
        >
          <span className="shrink-0 font-black text-indigo-600">{labels[i]}</span>
          <span className="leading-snug">{option}</span>
        </button>
      ))}
    </div>
  );
}

function FeedbackPanel({
  correct,
  explanation,
  isLast,
  onNext,
}: {
  correct: boolean;
  explanation: string;
  isLast: boolean;
  onNext: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border-2 p-5 sm:p-6 ${
        correct
          ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50"
          : "border-red-200 bg-gradient-to-br from-red-50 to-orange-50"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        {correct ? (
          <Check className="size-6 text-emerald-600" aria-hidden />
        ) : (
          <X className="size-6 text-red-500" aria-hidden />
        )}
        <span
          className={`text-lg font-black ${correct ? "text-emerald-700" : "text-red-600"}`}
        >
          {correct ? "정답이에요!" : "아쉬워요!"}
        </span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-zinc-600 sm:text-base">{explanation}</p>
      <button
        type="button"
        onClick={onNext}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:shadow-indigo-300/60 hover:scale-[1.02] active:scale-95"
      >
        <span>{isLast ? "결과 보기" : "다음 문제"}</span>
        <ArrowRight className="size-5" strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
}

export default function QuizGame() {
  const [questions, setQuestions] = useState(() => shuffleQuestions(QUIZ_QUESTIONS));
  const [playerName, setPlayerName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("start");
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);

  const total = questions.length;
  const question = questions[currentIndex];
  const prevQuestion = currentIndex > 0 ? questions[currentIndex - 1] : null;
  const showPartBanner =
    currentIndex === 0 || (prevQuestion && prevQuestion.type !== question.type);

  const handleRestart = useCallback(() => {
    setQuestions(shuffleQuestions(QUIZ_QUESTIONS));
    setPlayerName("");
    setCurrentIndex(0);
    setPhase("start");
    setIsCorrect(false);
    setScore(0);
    setRecords([]);
  }, []);

  const handleStart = useCallback(() => {
    if (playerName.trim().length === 0) return;
    setQuestions(shuffleQuestions(QUIZ_QUESTIONS));
    setCurrentIndex(0);
    setScore(0);
    setRecords([]);
    setPhase("playing");
  }, [playerName]);

  const submitAnswer = useCallback(
    (userAnswer: boolean | number) => {
      const correct =
        question.type === "ox"
          ? userAnswer === question.answer
          : userAnswer === question.answerIndex;

      const record: AnswerRecord = { question, userAnswer, correct };
      setRecords((prev) => [...prev, record]);
      if (correct) setScore((s) => s + 1);
      setIsCorrect(correct);
      setPhase("feedback");

      if (currentIndex === total - 1) {
        fireConfetti();
      }
    },
    [question, currentIndex, total],
  );

  const handleNext = useCallback(() => {
    if (currentIndex >= total - 1) {
      setPhase("result");
      return;
    }
    setCurrentIndex((i) => i + 1);
    setPhase("playing");
  }, [currentIndex, total]);

  if (phase === "result") {
    return (
      <SsgoiTransition id="/dashboard/quiz" className="h-full">
        <QuizResultScreen
          playerName={playerName.trim()}
          score={score}
          total={total}
          records={records}
          onRestart={handleRestart}
        />
      </SsgoiTransition>
    );
  }

  if (phase === "start") {
    return (
      <SsgoiTransition id="/dashboard/quiz" className="h-full">
        <main className="flex h-full flex-col items-center justify-center px-5 py-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <StepIndicator steps={MISSION_STEPS} current={2} />
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-2xl font-black text-zinc-900 sm:text-3xl">창업 퀴즈</h1>
              <p className="mt-2 text-sm font-semibold text-zinc-500">
                이름을 입력하고 퀴즈를 시작해 보세요
              </p>
            </div>

            <QuizStartForm
              name={playerName}
              onNameChange={setPlayerName}
              onStart={handleStart}
            />
          </div>
        </main>
      </SsgoiTransition>
    );
  }

  const answered = phase === "feedback";

  return (
    <SsgoiTransition id="/dashboard/quiz" className="h-full">
      <main className="flex h-full flex-col items-center justify-center px-5 py-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <StepIndicator steps={MISSION_STEPS} current={2} />
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-black text-zinc-900 sm:text-3xl">창업 퀴즈</h1>
            <p className="mt-2 text-sm font-semibold text-zinc-500">
              <span className="text-indigo-600">{playerName.trim()}</span>님, 화이팅!
            </p>
            <p className="mt-1 text-xs font-bold text-indigo-600">점수 {score}</p>
          </div>

          <SurveyProgress current={currentIndex} total={total} />

          {showPartBanner && (
            <div className="mb-4 rounded-full bg-indigo-100 px-4 py-2 text-center text-xs font-black uppercase tracking-wider text-indigo-700">
              {partLabelFor(question)}
            </div>
          )}

          <div className="flex flex-col gap-5 rounded-3xl border border-white bg-white/80 p-6 shadow-xl shadow-indigo-200/40 backdrop-blur-sm">
            {!answered ? (
              <>
                <p className="text-base font-bold leading-relaxed text-zinc-800 sm:text-lg">
                  {question.question}
                </p>
                {question.type === "ox" ? (
                  <OXButtons disabled={answered} onAnswer={submitAnswer} />
                ) : (
                  <MCOptions question={question} disabled={answered} onAnswer={submitAnswer} />
                )}
              </>
            ) : (
              <FeedbackPanel
                correct={isCorrect}
                explanation={question.explanation}
                isLast={currentIndex >= total - 1}
                onNext={handleNext}
              />
            )}
          </div>
        </div>
      </main>
    </SsgoiTransition>
  );
}
