// KISON 시작 화면 — 풀스크린 그라디언트 히어로 + 캐릭터 오빗
import Link from "next/link";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";
import CharacterOrbit from "@/components/landing/CharacterOrbit";
import { characters } from "@/data/characters";

type HomeProps = {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ params, searchParams }: HomeProps) {
  await params;
  await searchParams;

  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-violet-50">
      <BackgroundBlobs variant="indigo" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          청소년 창업 캐릭터 진단
        </div>

        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 leading-[1.05]">
            나의{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
              창업 캐릭터
            </span>
            를 <br className="sm:hidden" />
            찾아보자!
          </h1>
          <p className="text-base sm:text-lg font-semibold text-zinc-500">
            10개의 질문으로 나만의 캐릭터를 발견하고
            <br />팀에서 어떤 역할이 어울리는지 확인해 보세요
          </p>
        </div>

        <CharacterOrbit />

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/profile"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-10 py-4 text-lg font-extrabold text-white shadow-xl shadow-indigo-400/40 transition-all hover:shadow-2xl hover:shadow-indigo-400/60 hover:scale-105 active:scale-95"
          >
            <span>시작하기</span>
            <span className="text-xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <span>⏱</span>
            <span>약 2-3분 소요</span>
            <span className="mx-1">·</span>
            <span>📱</span>
            <span>모바일 최적화</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm">
          {characters.map((c) => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${c.color.primary}, ${c.color.secondary})`,
                }}
              />
              <span className="font-bold text-zinc-700">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
