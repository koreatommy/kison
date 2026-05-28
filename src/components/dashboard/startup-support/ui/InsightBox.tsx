// AI 인사이트/추천/강점/약점 표시 박스
"use client";

type Variant = "indigo" | "emerald" | "amber" | "blue" | "red";

interface InsightBoxProps {
  title: string;
  items?: string[];
  text?: string;
  variant?: Variant;
  className?: string;
}

const styles: Record<Variant, { border: string; bg: string; title: string; text: string }> = {
  indigo: { border: "border-indigo-200", bg: "bg-indigo-50", title: "text-indigo-700", text: "text-indigo-800" },
  emerald: { border: "border-emerald-200", bg: "bg-emerald-50", title: "text-emerald-700", text: "text-emerald-800" },
  amber: { border: "border-amber-200", bg: "bg-amber-50", title: "text-amber-700", text: "text-amber-800" },
  blue: { border: "border-blue-200", bg: "bg-blue-50", title: "text-blue-700", text: "text-blue-800" },
  red: { border: "border-red-200", bg: "bg-red-50", title: "text-red-700", text: "text-red-800" },
};

export default function InsightBox({ title, items, text, variant = "indigo", className = "" }: InsightBoxProps) {
  const s = styles[variant];
  return (
    <div className={`rounded-xl border ${s.border} ${s.bg} px-4 py-3 ${className}`}>
      <p className={`text-xs font-bold ${s.title}`}>{title}</p>
      {text && <p className={`mt-1 text-sm leading-relaxed ${s.text}`}>{text}</p>}
      {items && items.length > 0 && (
        <ul className="mt-1.5 space-y-1">
          {items.map((item, i) => (
            <li key={i} className={`text-xs leading-relaxed ${s.text}`}>• {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
