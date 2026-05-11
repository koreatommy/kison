// KISON 시작 화면 — "시작하기" CTA → /profile
import Link from "next/link";
import AppHeader from "@/components/layout/AppHeader";

export default function Home() {
  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8 text-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900">
            나의 창업 캐릭터는?
          </h2>
          <p className="text-lg text-zinc-500">
            10문항 설문으로 나에게 맞는 창업 역할을 찾아보세요!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-2xl">
          <span>🌟</span>
          <span>📋</span>
          <span>🔧</span>
          <span>📣</span>
          <span>✅</span>
        </div>

        <Link
          href="/profile"
          className="rounded-full bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          시작하기
        </Link>

        <p className="text-xs text-zinc-400">
          캡틴 루미 · 플래너 도도 · 메이커 테오 · 스토리 모아 · 체크 누리
        </p>
      </div>
    </>
  );
}
