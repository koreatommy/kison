// 설문 진행률 표시 - 그라디언트 프로그레스 바
type Props = {
  current: number;
  total: number;
};

export default function SurveyProgress({ current, total }: Props) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-indigo-700">
          질문 {current + 1} / {total}
        </span>
        <span className="text-xs font-black text-zinc-500">
          {Math.round(percent)}%
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white shadow-inner border border-zinc-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
