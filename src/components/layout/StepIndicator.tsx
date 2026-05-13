// 진행 단계 인디케이터 (예: 1 ─ 2 ─ 3)
type Props = {
  steps: string[];
  current: number;
};

export default function StepIndicator({ steps, current }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {steps.map((label, i) => {
        const isActive = i === current;
        const isDone = i < current;

        return (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-300/50 scale-110"
                    : isDone
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-zinc-100 text-zinc-400"
                }`}
              >
                {isDone ? "✓" : i + 1}
              </span>
              <span
                className={`hidden sm:inline text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? "text-indigo-600"
                    : isDone
                      ? "text-zinc-500"
                      : "text-zinc-300"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 w-6 sm:w-12 rounded-full ${
                  isDone ? "bg-indigo-300" : "bg-zinc-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
