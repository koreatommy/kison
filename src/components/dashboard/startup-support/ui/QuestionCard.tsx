// 번호 + 질문 + 작성 팁 + textarea 워크북형 질문 카드
"use client";

interface QuestionCardProps {
  number: number;
  question: string;
  tip?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  minRows?: number;
}

export default function QuestionCard({
  number,
  question,
  tip,
  placeholder,
  value,
  onChange,
  minRows = 5,
}: QuestionCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
          {number}
        </span>
        <p className="text-sm font-semibold leading-snug text-zinc-800">{question}</p>
      </div>
      {tip && (
        <p className="mb-3 ml-10 rounded-lg bg-zinc-50 px-3 py-2 text-xs text-zinc-400">
          💡 {tip}
        </p>
      )}
      <textarea
        className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 placeholder:text-zinc-300 transition-colors focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
        rows={minRows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
