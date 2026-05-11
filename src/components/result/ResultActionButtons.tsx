// 결과 화면 하단 액션 버튼 (Phase 3에서 실제 기능 연결)
"use client";

export default function ResultActionButtons() {
  return (
    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <button
        className="w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 sm:w-auto"
        onClick={() => {
          /* Phase 3: 이미지 저장 */
        }}
      >
        결과 이미지 저장
      </button>
      <button
        className="w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 sm:w-auto"
        onClick={() => {
          /* Phase 3: PDF 저장 */
        }}
      >
        PDF 저장
      </button>
      <button
        className="w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 sm:w-auto"
        onClick={() => {
          /* Phase 2: 다시 검사 */
        }}
      >
        다시 검사하기
      </button>
    </div>
  );
}
