// KISON 미니멀 헤더 (결과/팀 페이지 등 일반 페이지용)
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-white/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-extrabold tracking-tight"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xs font-black shadow-md shadow-indigo-300/40 transition-transform group-hover:scale-105">
            K
          </span>
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            KISON
          </span>
          <span className="hidden sm:inline text-xs font-semibold text-zinc-500 ml-1">
            창업 캐릭터 진단
          </span>
        </Link>
      </div>
    </header>
  );
}
