// 결과 화면 하단 액션 버튼 - 그라디언트 + 보조 버튼들
"use client";

type Props = {
  onRetake?: () => void;
  onSaveImage?: () => void;
  onSavePdf?: () => void;
};

export default function ResultActionButtons({
  onRetake,
  onSaveImage,
  onSavePdf,
}: Props) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      <button
        type="button"
        onClick={onSaveImage}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-base font-extrabold text-white shadow-xl shadow-indigo-300/40 transition-all hover:shadow-2xl hover:shadow-indigo-400/60 hover:scale-[1.02] active:scale-95"
      >
        <span>📥</span>
        <span>결과 이미지 저장</span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onSavePdf}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-zinc-200 bg-white py-3.5 text-sm font-extrabold text-zinc-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 active:scale-95"
        >
          <span>📄</span>
          <span>PDF 저장</span>
        </button>
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-zinc-200 bg-white py-3.5 text-sm font-extrabold text-zinc-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 active:scale-95"
        >
          <span>🔄</span>
          <span>다시 검사</span>
        </button>
      </div>
    </div>
  );
}
