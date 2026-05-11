// 설문 선택지 버튼
type Props = {
  text: string;
  selected: boolean;
  onClick: () => void;
};

export default function OptionButton({ text, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
        selected
          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
          : "border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
      }`}
    >
      {text}
    </button>
  );
}
