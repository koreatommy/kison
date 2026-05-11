// 설문 진행률 표시 (현재 문항 / 전체 + 프로그레스 바)
type Props = {
  current: number;
  total: number;
};

export default function SurveyProgress({ current, total }: Props) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-600">
          {current + 1} / {total}
        </span>
        <span className="text-zinc-400">{Math.round(percent)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
