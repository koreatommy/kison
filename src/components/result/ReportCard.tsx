// 범용 리포트 카드 (강점, 성장 포인트, 추천 활동에 재사용)
type Props = {
  title: string;
  icon: string;
  items: string[];
  accentColor: string;
};

export default function ReportCard({ title, icon, items, accentColor }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-700">
        <span>{icon}</span>
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span
              className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-zinc-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
