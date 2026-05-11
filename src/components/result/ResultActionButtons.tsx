// 결과 화면 하단 액션 버튼
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
    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <button
        className="w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 sm:w-auto"
        onClick={onSaveImage}
      >
        결과 이미지 저장
      </button>
      <button
        className="w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 sm:w-auto"
        onClick={onSavePdf}
      >
        PDF 저장
      </button>
      <button
        className="w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 sm:w-auto"
        onClick={onRetake}
      >
        다시 검사하기
      </button>
    </div>
  );
}
