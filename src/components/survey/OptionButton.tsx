// 설문 선택지 버튼 - 큰 pill 카드 (선택 시 체크마크 + 컬러)
type Props = {
  text: string;
  selected: boolean;
  index: number;
  onClick: () => void;
};

const LABELS = ["A", "B", "C", "D", "E"];

export default function OptionButton({
  text,
  selected,
  index,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left transition-all active:scale-[0.98] ${
        selected
          ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-violet-50 shadow-lg shadow-indigo-200/40"
          : "border-zinc-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md"
      }`}
    >
      <span
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-black transition-all ${
          selected
            ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-300/50"
            : "bg-zinc-100 text-zinc-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
        }`}
      >
        {selected ? "✓" : LABELS[index] ?? index + 1}
      </span>
      <span
        className={`flex-1 text-sm sm:text-base font-bold leading-snug ${
          selected ? "text-indigo-900" : "text-zinc-700"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
