// KISON 시작 화면 (Phase 2에서 본격 구현 — 현재는 placeholder)
export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">KISON 청소년 창업 캐릭터 진단</h1>
      <p className="text-lg text-zinc-600">
        10문항 설문으로 나의 창업 캐릭터를 진단해 보세요!
      </p>
    </div>
  );
}
