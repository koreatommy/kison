// KISON 서비스 공통 헤더
export default function AppHeader() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-4xl items-center px-4">
        <h1 className="text-lg font-bold tracking-tight">
          <span className="text-blue-600">KISON</span>{" "}
          <span className="hidden sm:inline text-zinc-700">
            청소년 창업 캐릭터 진단
          </span>
        </h1>
      </div>
    </header>
  );
}
