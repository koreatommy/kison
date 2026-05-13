// 팀 구성 결과 화면 (mock 데이터 기반)
import AppHeader from "@/components/layout/AppHeader";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";
import TeamCard from "@/components/team/TeamCard";
import { mockTeamCandidates } from "@/data/mockTeamCandidates";
import { buildTeams } from "@/lib/team-builder";

type TeamPageProps = {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TeamPage({ params, searchParams }: TeamPageProps) {
  await params;
  await searchParams;

  const teams = buildTeams(mockTeamCandidates);

  return (
    <>
      <AppHeader />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-pink-50">
        <BackgroundBlobs variant="pink" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 to-indigo-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-pink-700">
              <span>🤝</span>
              팀 빌더
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 leading-tight">
              <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                {teams.length}개 팀
              </span>{" "}
              완성!
            </h1>
            <p className="mt-2 text-sm font-semibold text-zinc-500">
              {mockTeamCandidates.length}명의 학생을 캐릭터 균형에 맞춰
              구성했어요
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {teams.map((team, i) => (
              <TeamCard key={team.id} team={team} index={i} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
