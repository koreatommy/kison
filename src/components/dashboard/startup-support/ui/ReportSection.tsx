// 보고서 섹션 래퍼 — 번호 + 제목 + 본문 구성
"use client";

interface ReportSectionProps {
  number?: number | string;
  title: string;
  formLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ReportSection({ number, title, formLabel, children, className = "" }: ReportSectionProps) {
  return (
    <section className={`border-l-4 border-indigo-400 pl-5 py-1 ${className}`}>
      <div className="mb-3 flex items-baseline gap-2">
        {number && (
          <span className="text-lg font-extrabold tabular-nums text-indigo-500">{number}.</span>
        )}
        <h3 className="text-base font-bold text-zinc-900">{title}</h3>
        {formLabel && (
          <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-500">
            {formLabel}
          </span>
        )}
      </div>
      <div className="text-sm leading-relaxed text-zinc-700">{children}</div>
    </section>
  );
}
