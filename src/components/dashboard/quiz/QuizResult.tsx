"use client";

// 퀴즈 결과 화면 — 점수 게이지, 정오답 노트, 이미지·PDF 저장
import { useCallback, useRef } from "react";
import StepIndicator from "@/components/layout/StepIndicator";
import ResultActionButtons from "@/components/result/ResultActionButtons";
import { saveAsImage } from "@/lib/export-image";
import { saveAsPdf } from "@/lib/export-pdf";
import {
  type QuizQuestion,
  formatOXAnswer,
  formatMCAnswer,
} from "@/lib/quiz-data";

const MISSION_STEPS = ["강의", "참여", "평가"];

export type AnswerRecord = {
  question: QuizQuestion;
  userAnswer: boolean | number;
  correct: boolean;
};

function gradeMessage(score: number, total: number) {
  const pct = score / total;
  if (pct === 1) return "완벽해요! 창업 천재!";
  if (pct >= 0.8) return "훌륭해요! 거의 다 맞혔어요!";
  if (pct >= 0.6) return "좋아요! 조금만 더 복습하면 완벽!";
  if (pct >= 0.4) return "괜찮아요! 다시 한번 도전해 보세요!";
  return "아쉬워요! 강의를 다시 보고 도전해 보세요!";
}

function getCorrectAnswerText(question: QuizQuestion) {
  if (question.type === "ox") return formatOXAnswer(question.answer);
  return formatMCAnswer(question, question.answerIndex);
}

function getUserAnswerText(question: QuizQuestion, userAnswer: boolean | number) {
  if (question.type === "ox") return formatOXAnswer(userAnswer as boolean);
  return formatMCAnswer(question, userAnswer as number);
}

function ScoreGauge({ score, total }: { score: number; total: number }) {
  const pct = score / total;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference * (1 - pct);

  return (
    <div className="relative mx-auto size-36 sm:size-44">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#e4e4e7" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="url(#quizGaugeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="quizGaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-zinc-800 sm:text-4xl">{score}</span>
        <span className="text-xs font-semibold text-zinc-400 sm:text-sm">/ {total}</span>
      </div>
    </div>
  );
}

function ReviewCard({ record, index }: { record: AnswerRecord; index: number }) {
  const { question, userAnswer, correct } = record;

  return (
    <div
      className={`rounded-xl border-2 p-4 sm:p-5 ${
        correct
          ? "border-emerald-200 bg-emerald-50/50"
          : "border-red-200 bg-red-50/50"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`flex size-7 items-center justify-center rounded-full text-xs font-black text-white ${
            correct ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {index + 1}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
            correct ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
          }`}
        >
          {correct ? "정답" : "오답"}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
          {question.type === "ox" ? "OX" : "4지선다"}
        </span>
      </div>

      <p className="mb-3 text-sm font-bold leading-snug text-zinc-800 sm:text-base">
        {question.question}
      </p>

      <div className="space-y-1.5 text-sm">
        <p className="text-zinc-600">
          <span className="font-semibold text-zinc-500">내 답변</span>
          {" · "}
          <span className={correct ? "font-bold text-emerald-700" : "font-bold text-red-600"}>
            {getUserAnswerText(question, userAnswer)}
          </span>
        </p>
        {!correct && (
          <p className="text-zinc-600">
            <span className="font-semibold text-zinc-500">정답</span>
            {" · "}
            <span className="font-bold text-emerald-700">{getCorrectAnswerText(question)}</span>
          </p>
        )}
        <p className="mt-2 rounded-xl border-2 border-zinc-100 bg-white px-3 py-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
          {question.explanation}
        </p>
      </div>
    </div>
  );
}

type QuizResultScreenProps = {
  playerName: string;
  score: number;
  total: number;
  records: AnswerRecord[];
  onRestart: () => void;
};

export default function QuizResultScreen({
  playerName,
  score,
  total,
  records,
  onRestart,
}: QuizResultScreenProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const exportBasename = `kison-quiz-${playerName || "result"}`;

  const handleSaveImage = useCallback(() => {
    if (reportRef.current) saveAsImage(reportRef.current, `${exportBasename}.png`);
  }, [exportBasename]);

  const handleSavePdf = useCallback(() => {
    if (reportRef.current) saveAsPdf(reportRef.current, `${exportBasename}.pdf`);
  }, [exportBasename]);

  return (
    <main className="flex h-full flex-col overflow-y-auto px-5 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-xl">
        <div ref={reportRef} className="rounded-3xl bg-zinc-50/80 p-4 sm:p-5">
          <div className="mb-8">
            <StepIndicator steps={MISSION_STEPS} current={2} />
          </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-black text-zinc-900 sm:text-3xl">
            {playerName}님의 퀴즈 결과
          </h1>
          <p className="mt-2 text-sm font-semibold text-zinc-500">
            {gradeMessage(score, total)}
          </p>
        </div>

        <div className="mb-6 rounded-3xl border border-white bg-white/80 p-6 shadow-xl shadow-indigo-200/40 backdrop-blur-sm">
          <ScoreGauge score={score} total={total} />
          <p className="mt-4 text-center text-sm font-semibold text-zinc-500">
            {score}문제 정답 · 총 {total}문제
          </p>

          <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-2.5">
            {records.map((record, i) => (
              <span
                key={i}
                className={`flex size-9 items-center justify-center rounded-xl text-xs font-black text-white sm:size-10 sm:text-sm ${
                  record.correct ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-black uppercase tracking-wider text-zinc-500">
            정오답 노트
          </h2>
          <div className="space-y-3">
            {records.map((record, i) => (
              <ReviewCard key={i} record={record} index={i} />
            ))}
          </div>
        </div>

        </div>

        <ResultActionButtons
          onRetake={onRestart}
          onSaveImage={handleSaveImage}
          onSavePdf={handleSavePdf}
          retakeLabel="다시 풀기"
        />
      </div>
    </main>
  );
}
