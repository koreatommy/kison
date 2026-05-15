// 범용 리포트 카드 (강점, 성장 포인트, 추천 활동)
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  icon: LucideIcon;
  items: string[];
  accentColor: string;
};

export default function ReportCard({
  title,
  icon: Icon,
  items,
  accentColor,
}: Props) {
  return (
    <div className="rounded-3xl border border-white bg-white/90 backdrop-blur-sm p-5 shadow-xl shadow-indigo-100/60">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${accentColor}1A`,
            color: accentColor,
          }}
        >
          <Icon className="size-5" strokeWidth={2.25} aria-hidden />
        </span>
        <h4 className="text-base font-black text-zinc-900">{title}</h4>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm">
            <span
              className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-semibold text-zinc-600 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
